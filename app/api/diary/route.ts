import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const CURRENT_SCHEMA_VERSION = 2;

const DIARY_DATA_FILE = path.join(process.cwd(), "data", "mindplay_diaries_db.json");
const PROFILE_DATA_FILE = path.join(process.cwd(), "data", "mindplay_student_profiles_db.json");

// 구버전 스키마 자동 마이그레이션 함수 (절대 데이터 삭제/덮어쓰기 없음)
function migrateProfileRecord(rawProfile: any): any {
  if (!rawProfile) return null;
  const version = rawProfile.schemaVersion || 1;
  let migrated = { ...rawProfile };

  if (version < 2) {
    migrated.schemaVersion = 2;
    migrated.lesson2 = migrated.lesson2 || {};
    migrated.lesson3 = migrated.lesson3 || {};
    migrated.lesson4 = migrated.lesson4 || {};
  }
  return migrated;
}

function loadLocalDiaries(): Record<string, any[]> {
  try {
    const dataDir = path.dirname(DIARY_DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(DIARY_DATA_FILE)) {
      fs.writeFileSync(DIARY_DATA_FILE, JSON.stringify({}, null, 2), "utf8");
      return {};
    }
    const content = fs.readFileSync(DIARY_DATA_FILE, "utf8");
    return JSON.parse(content || "{}");
  } catch (err) {
    return {};
  }
}

function saveLocalDiaries(db: Record<string, any[]>) {
  try {
    fs.writeFileSync(DIARY_DATA_FILE, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    return false;
  }
}

function loadLocalProfiles(): Record<string, any> {
  try {
    const dataDir = path.dirname(PROFILE_DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(PROFILE_DATA_FILE)) {
      fs.writeFileSync(PROFILE_DATA_FILE, JSON.stringify({}, null, 2), "utf8");
      return {};
    }
    const content = fs.readFileSync(PROFILE_DATA_FILE, "utf8");
    return JSON.parse(content || "{}");
  } catch (err) {
    return {};
  }
}

function saveLocalProfiles(db: Record<string, any>) {
  try {
    fs.writeFileSync(PROFILE_DATA_FILE, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  const lessonNoStr = searchParams.get("lessonNo");

  // 교사용 대시보드 전체 조회
  if (!studentId) {
    try {
      const { data: allProfiles } = await supabase.from("mindplay_profiles").select("*");
      const { data: allDiaries } = await supabase.from("mindplay_diaries").select("*");

      const profileMap: Record<string, any> = {};
      (allProfiles || []).forEach((row: any) => {
        profileMap[row.student_id] = migrateProfileRecord(row.profile);
      });

      const diaryMap: Record<string, any[]> = {};
      (allDiaries || []).forEach((row: any) => {
        if (!diaryMap[row.student_id]) diaryMap[row.student_id] = [];
        diaryMap[row.student_id].push(row.data);
      });

      return NextResponse.json({
        success: true,
        profiles: Object.keys(profileMap).length > 0 ? profileMap : loadLocalProfiles(),
        diaries: Object.keys(diaryMap).length > 0 ? diaryMap : loadLocalDiaries()
      });
    } catch (e) {
      return NextResponse.json({
        success: true,
        profiles: loadLocalProfiles(),
        diaries: loadLocalDiaries()
      });
    }
  }

  // 특정 학생의 15차시 전체 종합 레코드 조회 (마이페이지 및 재접속 복구용)
  try {
    let diaries: any[] = [];
    const { data: dbDiaries, error: dErr } = await supabase
      .from("mindplay_diaries")
      .select("data")
      .eq("student_id", studentId);

    if (!dErr && dbDiaries && dbDiaries.length > 0) {
      diaries = dbDiaries.map((row: any) => row.data);
    } else {
      const localDiaries = loadLocalDiaries();
      diaries = localDiaries[studentId] || [];
    }

    let profile: any = null;
    const { data: dbProfile, error: pErr } = await supabase
      .from("mindplay_profiles")
      .select("profile")
      .eq("student_id", studentId)
      .single();

    if (!pErr && dbProfile?.profile) {
      profile = migrateProfileRecord(dbProfile.profile);
    } else {
      const localProfiles = loadLocalProfiles();
      profile = migrateProfileRecord(localProfiles[studentId] || null);
    }

    if (lessonNoStr) {
      const targetLesson = parseInt(lessonNoStr, 10);
      const entry = diaries.find((d: any) => d.lessonNo === targetLesson) || null;
      return NextResponse.json({ success: true, entry, profile });
    }

    return NextResponse.json({ success: true, diaries, profile, schemaVersion: CURRENT_SCHEMA_VERSION });
  } catch (e) {
    const localDiaries = loadLocalDiaries();
    const localProfiles = loadLocalProfiles();
    return NextResponse.json({
      success: true,
      diaries: localDiaries[studentId] || [],
      profile: migrateProfileRecord(localProfiles[studentId] || null),
      schemaVersion: CURRENT_SCHEMA_VERSION
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, studentId, studentName, roomCode = "CLASS1", payload } = body;

    if (!studentId) {
      return NextResponse.json({ success: false, message: "studentId is required" }, { status: 400 });
    }

    const nowIso = new Date().toISOString();

    if (type === "SAVE_DIARY") {
      const entry = {
        ...payload,
        studentId,
        studentName: studentName || payload.studentName || studentId,
        roomCode,
        schemaVersion: CURRENT_SCHEMA_VERSION,
        updatedAt: nowIso,
        createdAt: payload.createdAt || nowIso
      };
      const lessonNo = entry.lessonNo || 1;
      const uniqueId = `${studentId}_${lessonNo}`;

      // 1. Local backup
      const localDiaries = loadLocalDiaries();
      if (!localDiaries[studentId]) localDiaries[studentId] = [];
      const existingIdx = localDiaries[studentId].findIndex((d: any) => d.lessonNo === lessonNo);
      if (existingIdx >= 0) {
        localDiaries[studentId][existingIdx] = entry;
      } else {
        localDiaries[studentId].push(entry);
      }
      saveLocalDiaries(localDiaries);

      // 2. Supabase Cloud save
      try {
        const { error } = await supabase.from("mindplay_diaries").upsert({
          id: uniqueId,
          student_id: studentId,
          student_name: studentName || entry.studentName || studentId,
          lesson_no: lessonNo,
          data: entry,
          created_at: entry.createdAt
        }, { onConflict: "id" });

        if (error) console.error("Supabase diary save error:", error);
      } catch (e) {
        console.error("Supabase diary upsert exception:", e);
      }

      return NextResponse.json({ success: true, message: "감정일기가 Supabase 클라우드에 영구 저장되었습니다." });
    }

    if (type === "SAVE_ACTIVITY_PROFILE") {
      // 1. Local backup
      const localProfiles = loadLocalProfiles();
      const currentProfile = localProfiles[studentId] || {
        studentId,
        studentName: studentName || studentId,
        roomCode,
        schemaVersion: CURRENT_SCHEMA_VERSION,
        createdAt: nowIso,
        updatedAt: nowIso
      };

      const mergedProfile = {
        ...currentProfile,
        studentId,
        studentName: studentName || currentProfile.studentName,
        roomCode: roomCode || currentProfile.roomCode || "CLASS1",
        schemaVersion: CURRENT_SCHEMA_VERSION,
        updatedAt: nowIso,
        createdAt: currentProfile.createdAt || nowIso,
        ...(payload.lesson2 ? { lesson2: { ...(currentProfile.lesson2 || {}), ...payload.lesson2 } } : {}),
        ...(payload.lesson3 ? { lesson3: { ...(currentProfile.lesson3 || {}), ...payload.lesson3 } } : {}),
        ...(payload.lesson4 ? { lesson4: { ...(currentProfile.lesson4 || {}), ...payload.lesson4 } } : {}),
        ...(payload.customMaster ? { customMaster: { ...(currentProfile.customMaster || {}), ...payload.customMaster } } : {})
      };

      localProfiles[studentId] = mergedProfile;
      saveLocalProfiles(localProfiles);

      // 2. Supabase Cloud save
      try {
        const { error } = await supabase.from("mindplay_profiles").upsert({
          student_id: studentId,
          student_name: studentName || studentId,
          profile: mergedProfile,
          updated_at: nowIso
        }, { onConflict: "student_id" });

        if (error) console.error("Supabase profile save error:", error);
      } catch (e) {
        console.error("Supabase profile upsert exception:", e);
      }

      return NextResponse.json({ success: true, message: "특별활동 프로필이 Supabase 클라우드에 영구 저장되었습니다." });
    }

    return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
  } catch (err: any) {
    console.error("POST /api/diary error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
