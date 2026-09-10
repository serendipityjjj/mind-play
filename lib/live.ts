import { supabase } from "./supabase";

export interface LiveEntry<T = any> {
  id?: number;
  room_code: string;
  activity: string;
  entry_key: string;
  student_id?: string;
  student_name?: string;
  payload: T;
  created_at?: string;
  updated_at?: string;
}

export interface TeacherState {
  reset_at?: string;
  phase?: string;
  assignMap?: Record<string, string>;
  [key: string]: any;
}

/**
 * 1. 학생/교사 단일 엔트리 저장 (Row 단위 Upsert)
 * API 라우트를 거치지 않고 브라우저에서 Supabase로 직접 upsert 실행
 */
export async function saveLiveEntry<T = any>(
  roomCode: string,
  activity: string,
  entryKey: string,
  payload: T,
  studentId?: string,
  studentName?: string
): Promise<{ success: boolean; data?: LiveEntry<T>; error?: string }> {
  try {
    const cleanRoom = (roomCode || "CLASS1").toUpperCase().trim();
    const cleanActivity = activity.trim();
    const cleanKey = entryKey.trim();

    const row = {
      room_code: cleanRoom,
      activity: cleanActivity,
      entry_key: cleanKey,
      student_id: studentId || null,
      student_name: studentName || null,
      payload: payload || {}
    };

    const { data, error } = await supabase
      .from("mindplay_live_entries")
      .upsert(row, { onConflict: "room_code,activity,entry_key" })
      .select()
      .single();

    if (error) {
      console.error("[live.ts saveLiveEntry error]", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as LiveEntry<T> };
  } catch (err: any) {
    console.error("[live.ts saveLiveEntry exception]", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

/**
 * 2. 활동별 엔트리 목록 불러오기 (reset_at 이후 데이터만 필터링)
 */
export async function loadLiveEntries<T = any>(
  roomCode: string,
  activity: string,
  filterResetAt?: string | null
): Promise<{ success: boolean; entries: LiveEntry<T>[]; error?: string }> {
  try {
    const cleanRoom = (roomCode || "CLASS1").toUpperCase().trim();
    const cleanActivity = activity.trim();

    let query = supabase
      .from("mindplay_live_entries")
      .select("*")
      .eq("room_code", cleanRoom)
      .eq("activity", cleanActivity)
      .order("created_at", { ascending: false });

    if (filterResetAt) {
      query = query.gte("created_at", filterResetAt);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[live.ts loadLiveEntries error]", error);
      return { success: false, entries: [], error: error.message };
    }

    return { success: true, entries: (data || []) as LiveEntry<T>[] };
  } catch (err: any) {
    console.error("[live.ts loadLiveEntries exception]", err);
    return { success: false, entries: [], error: err.message || "Unknown error" };
  }
}

/**
 * 3. 교사 상태(state) 조회
 */
export async function getTeacherState(
  roomCode: string,
  activity: string
): Promise<{ success: boolean; state: TeacherState; error?: string }> {
  try {
    const cleanRoom = (roomCode || "CLASS1").toUpperCase().trim();
    const teacherActivity = `${activity.trim()}__teacher`;

    const { data, error } = await supabase
      .from("mindplay_live_entries")
      .select("payload")
      .eq("room_code", cleanRoom)
      .eq("activity", teacherActivity)
      .eq("entry_key", "state")
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116: no rows found
      console.warn("[live.ts getTeacherState notice]", error.message);
    }

    return { success: true, state: (data?.payload || {}) as TeacherState };
  } catch (err: any) {
    return { success: false, state: {}, error: err.message || "Unknown error" };
  }
}

/**
 * 4. 교사 상태(state) 저장 (배정표, 단계 변경, reset_at 시각 기록)
 * 절대 데이터를 삭제하지 않고 reset_at 시각을 업데이트하여 가상 초기화
 */
export async function setTeacherState(
  roomCode: string,
  activity: string,
  state: Partial<TeacherState>
): Promise<{ success: boolean; state?: TeacherState; error?: string }> {
  try {
    const cleanRoom = (roomCode || "CLASS1").toUpperCase().trim();
    const teacherActivity = `${activity.trim()}__teacher`;

    const { state: currentState } = await getTeacherState(cleanRoom, activity);
    const mergedState: TeacherState = {
      ...currentState,
      ...state,
      updated_at: new Date().toISOString()
    };

    const res = await saveLiveEntry(cleanRoom, teacherActivity, "state", mergedState, "teacher", "선생님");
    if (!res.success) {
      return { success: false, error: res.error };
    }

    return { success: true, state: mergedState };
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error" };
  }
}

/**
 * 5. 방 실시간 웹소켓 구독 (mindplay_live_entries 테이블의 room_code 변경 감지)
 * 반환값: cleanup 구독 해제 함수 () => void
 */
export function subscribeLiveRoom(
  roomCode: string,
  onEvent: (payload: any) => void
): () => void {
  const cleanRoom = (roomCode || "CLASS1").toUpperCase().trim();
  const channelName = `live_room_${cleanRoom}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "mindplay_live_entries",
        filter: `room_code=eq.${cleanRoom}`
      },
      (payload) => {
        try {
          onEvent(payload);
        } catch (e) {
          console.error("[live.ts subscriber callback error]", e);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
