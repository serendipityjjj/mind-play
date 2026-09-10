import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "mindplay_rooms_db.json");

function loadLocalDatabase(): Record<string, any> {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), "utf8");
      return {};
    }
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content || "{}");
  } catch (err) {
    return {};
  }
}

function saveLocalDatabase(db: Record<string, any>) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    return false;
  }
}

async function getRoomFromSupabase(roomCode: string) {
  const code = (roomCode || "CLASS1").toUpperCase().trim();
  try {
    const { data, error } = await supabase
      .from("mindplay_rooms")
      .select("data")
      .eq("code", code)
      .single();

    if (!error && data?.data) {
      return data.data;
    }
  } catch (e) {
    console.error("Supabase getRoom error:", e);
  }

  const localDb = loadLocalDatabase();
  return localDb[code] || null;
}

async function saveRoomToSupabase(roomCode: string, roomData: any) {
  const code = (roomCode || "CLASS1").toUpperCase().trim();
  
  const localDb = loadLocalDatabase();
  localDb[code] = roomData;
  saveLocalDatabase(localDb);

  try {
    const { error } = await supabase
      .from("mindplay_rooms")
      .upsert({
        code: code,
        data: roomData,
        updated_at: new Date().toISOString()
      }, { onConflict: "code" });

    if (error) {
      console.error("Supabase saveRoom error:", error);
    }
  } catch (e) {
    console.error("Supabase upsert exception:", e);
  }
}

function createDefaultRoom(code: string) {
  return {
    code,
    phase: "writing",
    stories: [],
    assign: {},
    postcards: {},
    hearts: {},
    johariPhase: "step_a",
    johariStrengths: {},
    johariPairs: {},
    johariFeedback: {},
    johariUnlocks: {},
    balancePhase: "answering",
    balanceAnswers: {},
    balanceSync: {},
    balanceStats: {},
    brandingCards: {},
    galleryUnlocked: false,
    cardLikes: {},
    updatedAt: new Date().toISOString()
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomCode = (searchParams.get("room") || "CLASS1").toUpperCase().trim();

  let room = await getRoomFromSupabase(roomCode);
  if (!room) {
    room = createDefaultRoom(roomCode);
    await saveRoomToSupabase(roomCode, room);
  }

  return NextResponse.json({ success: true, room }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, roomCode = "CLASS1", payload } = body;
    const code = roomCode.toUpperCase().trim();

    let room = await getRoomFromSupabase(code);
    if (!room) {
      room = createDefaultRoom(code);
    }

    if (!room.johariStrengths) room.johariStrengths = {};
    if (!room.johariPairs) room.johariPairs = {};
    if (!room.johariFeedback) room.johariFeedback = {};
    if (!room.johariUnlocks) room.johariUnlocks = {};
    if (!room.balanceAnswers) room.balanceAnswers = {};
    if (!room.balanceSync) room.balanceSync = {};
    if (!room.balanceStats) room.balanceStats = {};
    if (!room.brandingCards) room.brandingCards = {};
    if (!room.cardLikes) room.cardLikes = {};
    if (room.galleryUnlocked === undefined) room.galleryUnlocked = false;

    switch (action) {
      case "SUBMIT_STORY": {
        const { studentId, studentName, content } = payload;
        const existsIdx = room.stories.findIndex((s: any) => s.studentId === studentId);
        const storyObj = {
          studentId,
          studentName,
          content,
          submittedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        if (existsIdx >= 0) {
          room.stories[existsIdx] = storyObj;
        } else {
          room.stories.push(storyObj);
        }
        break;
      }
      case "ASSIGN_STORIES": {
        const studentIds = room.stories.map((s: any) => s.studentId);
        if (studentIds.length < 2) {
          return NextResponse.json({ success: false, message: "사연이 최소 2개 이상이어야 배정할 수 있습니다." });
        }
        const shuffled = [...studentIds].sort(() => Math.random() - 0.5);
        const newAssign: Record<string, string> = {};
        for (let i = 0; i < studentIds.length; i++) {
          const giver = studentIds[i];
          let receiver = shuffled[i];
          if (receiver === giver) {
            const swapIdx = (i + 1) % studentIds.length;
            const temp = shuffled[i];
            shuffled[i] = shuffled[swapIdx];
            shuffled[swapIdx] = temp;
            receiver = shuffled[i];
          }
          newAssign[giver] = receiver;
        }
        room.assign = newAssign;
        room.phase = "assigned";
        break;
      }
      case "SEND_POSTCARD": {
        const { fromId, fromName, toId, postcardData } = payload;
        if (!room.postcards[toId]) room.postcards[toId] = [];
        room.postcards[toId].push({
          fromId,
          fromName,
          postcardData,
          sentAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        });
        break;
      }
      case "SEND_HEART": {
        const { toId } = payload;
        room.hearts[toId] = (room.hearts[toId] || 0) + 1;
        break;
      }
      case "SET_PHASE": {
        room.phase = payload.phase;
        break;
      }
      case "RESET_ROOM": {
        room = createDefaultRoom(code);
        break;
      }
      case "SUBMIT_JOHARI_MINE": {
        const { studentId, studentName, mine, hope } = payload;
        room.johariStrengths[studentId] = {
          studentId,
          studentName,
          mine: mine || [],
          hope: hope || [],
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "ASSIGN_JOHARI_PAIRS": {
        const studentIds = Object.keys(room.johariStrengths || {});
        if (studentIds.length < 2) {
          return NextResponse.json({ success: false, message: "강점을 제출한 학생이 최소 2명 이상이어야 배정할 수 있습니다." });
        }
        const shuffled = [...studentIds].sort(() => Math.random() - 0.5);
        const newPairs: Record<string, string> = {};
        for (let i = 0; i < studentIds.length; i++) {
          const observerId = studentIds[i];
          let targetId = shuffled[i];
          if (targetId === observerId) {
            const swapIdx = (i + 1) % studentIds.length;
            const temp = shuffled[i];
            shuffled[i] = shuffled[swapIdx];
            shuffled[swapIdx] = temp;
            targetId = shuffled[i];
          }
          newPairs[observerId] = targetId;
        }
        room.johariPairs = newPairs;
        room.johariPhase = "step_b";
        break;
      }
      case "SUBMIT_JOHARI_FEEDBACK": {
        const { observerId, targetId, feedbackList, message } = payload;
        const key = `${observerId}_${targetId}`;
        room.johariFeedback[key] = {
          observerId,
          targetId,
          feedbackList: feedbackList || [],
          message: message || "",
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "UNLOCK_JOHARI_STEP_C": {
        const { studentId } = payload;
        room.johariUnlocks[studentId] = true;
        break;
      }
      case "SUBMIT_BALANCE_ANSWERS": {
        const { studentId, studentName, answers } = payload;
        room.balanceAnswers[studentId] = {
          studentId,
          studentName,
          answers: answers || [],
          done: true,
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "BROADCAST_BALANCE_RESULTS": {
        const studentIds = Object.keys(room.balanceAnswers || {});
        if (studentIds.length === 0) {
          return NextResponse.json({ success: false, message: "제출된 밸런스 응답이 없습니다." });
        }
        const stats: Record<number, { A: number; B: number }> = {};
        for (let q = 0; q < 11; q++) {
          stats[q] = { A: 0, B: 0 };
        }
        studentIds.forEach((sId) => {
          const ans = room.balanceAnswers[sId]?.answers || [];
          ans.forEach((choice: string, qIdx: number) => {
            if (stats[qIdx]) {
              if (choice === "A") stats[qIdx].A++;
              else if (choice === "B") stats[qIdx].B++;
            }
          });
        });
        room.balanceStats = stats;

        const newSync: Record<string, any> = {};
        studentIds.forEach((myId) => {
          const myAns = room.balanceAnswers[myId]?.answers || [];
          const myName = room.balanceAnswers[myId]?.studentName || myId;

          const scores = studentIds
            .filter((otherId) => otherId !== myId)
            .map((otherId) => {
              const otherAns = room.balanceAnswers[otherId]?.answers || [];
              const otherName = room.balanceAnswers[otherId]?.studentName || otherId;
              let sameCount = 0;
              for (let i = 0; i < 11; i++) {
                if (myAns[i] && otherAns[i] && myAns[i] === otherAns[i]) {
                  sameCount++;
                }
              }
              const rate = Math.round((sameCount / 11) * 100);
              return { id: otherId, name: otherName, rate };
            })
            .sort((a, b) => b.rate - a.rate);

          newSync[myId] = {
            soulmate: scores.length > 0 ? scores[0] : null,
            opposite: scores.length > 0 ? scores[scores.length - 1] : null,
            all: scores
          };
        });

        room.balanceSync = newSync;
        room.balancePhase = "result";
        break;
      }
      case "SUBMIT_BRANDING_CARD": {
        const { studentId, studentName, cardData } = payload;
        room.brandingCards[studentId] = {
          studentId,
          studentName,
          cardData,
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "UNLOCK_GALLERY": {
        room.galleryUnlocked = true;
        break;
      }
      case "TOGGLE_CARD_LIKE": {
        const { targetStudentId, fromStudentId } = payload;
        if (!room.cardLikes[targetStudentId]) room.cardLikes[targetStudentId] = [];
        const likes = room.cardLikes[targetStudentId];
        const idx = likes.indexOf(fromStudentId);
        if (idx >= 0) {
          likes.splice(idx, 1);
        } else {
          likes.push(fromStudentId);
        }
        break;
      }
      default:
        return NextResponse.json({ success: false, message: `Unknown action: ${action}` }, { status: 400 });
    }

    room.updatedAt = new Date().toISOString();
    await saveRoomToSupabase(code, room);

    return NextResponse.json({ success: true, room }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  } catch (err: any) {
    console.error("POST /api/sync error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
