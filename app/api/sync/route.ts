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
    controls: {
      isWorryDispatched: false,
      isJohariPartnerAssigned: false,
      isJohariUnlocked: false,
      isBalanceResultBroadcasted: false,
      isLesson3GalleryUnlocked: false,
      isEssayUnlocked: false
    },
    johariPhase: "stepA",
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
  const studentId = searchParams.get("studentId");

  let room = await getRoomFromSupabase(roomCode);
  if (!room) {
    room = createDefaultRoom(roomCode);
    await saveRoomToSupabase(roomCode, room);
  }

  // Calculate myAssignedStory & myReceivedPostcards for specific student
  let myAssignedStory = null;
  let myReceivedPostcards: any[] = [];

  if (studentId && studentId !== "guest" && studentId !== "00000") {
    if (room.assign && room.assign[studentId]) {
      const targetStudentId = room.assign[studentId];
      const found = (room.stories || []).find((s: any) => s.studentId === targetStudentId);
      if (found) {
        myAssignedStory = {
          id: found.id || `story_${targetStudentId}`,
          studentId: targetStudentId,
          category: found.category || "또래/교우",
          content: found.content || found.text,
          text: found.content || found.text,
          submittedAt: found.submittedAt || found.createdAt
        };
      }
    }
    if (room.postcards && room.postcards[studentId]) {
      myReceivedPostcards = room.postcards[studentId];
    }
  }

  const responseData = {
    ...room,
    myAssignedStory,
    myReceivedPostcards
  };

  return NextResponse.json({
    success: true,
    data: responseData,
    room: responseData
  }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, roomCode = "CLASS1", room = "CLASS1", payload = {} } = body;
    const code = (roomCode || room || "CLASS1").toUpperCase().trim();

    let roomObj = await getRoomFromSupabase(code);
    if (!roomObj) {
      roomObj = createDefaultRoom(code);
    }

    if (!roomObj.stories) roomObj.stories = [];
    if (!roomObj.assign) roomObj.assign = {};
    if (!roomObj.postcards) roomObj.postcards = {};
    if (!roomObj.hearts) roomObj.hearts = {};
    if (!roomObj.controls) roomObj.controls = {};
    if (!roomObj.johariStrengths) roomObj.johariStrengths = {};
    if (!roomObj.johariPairs) roomObj.johariPairs = {};
    if (!roomObj.johariFeedback) roomObj.johariFeedback = {};
    if (!roomObj.johariUnlocks) roomObj.johariUnlocks = {};
    if (!roomObj.balanceAnswers) roomObj.balanceAnswers = {};
    if (!roomObj.balanceSync) roomObj.balanceSync = {};
    if (!roomObj.balanceStats) roomObj.balanceStats = {};
    if (!roomObj.brandingCards) roomObj.brandingCards = {};
    if (!roomObj.cardLikes) roomObj.cardLikes = {};

    switch (action) {
      case "SUBMIT_STORY": {
        const { studentId, studentName, content, text, category } = payload;
        const storyText = content || text || "";
        const storyCat = category || "또래/교우";
        const existsIdx = roomObj.stories.findIndex((s: any) => s.studentId === studentId);
        const storyObj = {
          id: `story_${studentId}_${Date.now()}`,
          studentId,
          studentName: studentName || "익명 친구",
          content: storyText,
          text: storyText,
          category: storyCat,
          submittedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          createdAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        if (existsIdx >= 0) {
          roomObj.stories[existsIdx] = storyObj;
        } else {
          roomObj.stories.push(storyObj);
        }
        break;
      }
      case "ASSIGN_STORIES":
      case "DISPATCH_ASSIGN": {
        const studentIds = (roomObj.stories || []).map((s: any) => s.studentId);
        if (studentIds.length < 2) {
          // If only 1 story submitted, support dispatch with full class student list
          const allStudentIds = payload.allStudentIds || studentIds;
          if (allStudentIds.length >= 2) {
            const shuffled = [...allStudentIds].sort(() => Math.random() - 0.5);
            const newAssign: Record<string, string> = {};
            for (let i = 0; i < allStudentIds.length; i++) {
              const giver = allStudentIds[i];
              let receiver = shuffled[i];
              if (receiver === giver) {
                const swapIdx = (i + 1) % allStudentIds.length;
                const temp = shuffled[i];
                shuffled[i] = shuffled[swapIdx];
                shuffled[swapIdx] = temp;
                receiver = shuffled[i];
              }
              newAssign[giver] = receiver;
            }
            roomObj.assign = newAssign;
          }
        } else {
          const n = studentIds.length;
          const shift = 1 + Math.floor(Math.random() * (n - 1));
          const newAssign: Record<string, string> = {};
          for (let i = 0; i < n; i++) {
            newAssign[studentIds[i]] = studentIds[(i + shift) % n];
          }
          roomObj.assign = newAssign;
        }
        roomObj.phase = "assigned";
        roomObj.controls.isWorryDispatched = true;
        break;
      }
      case "SEND_POSTCARD": {
        const { fromId, fromStudentId, toId, toStudentId, postcardData, step1, step2, step3, stickers } = payload;
        const sender = fromId || fromStudentId;
        const recipient = toId || toStudentId;
        if (!roomObj.postcards[recipient]) roomObj.postcards[recipient] = [];
        roomObj.postcards[recipient].push({
          fromId: sender,
          fromName: "익명 친구",
          postcardData: postcardData || { step1, step2, step3, stickers },
          step1,
          step2,
          step3,
          stickers,
          sentAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        });
        roomObj.hearts[recipient] = (roomObj.hearts[recipient] || 0) + 1;
        break;
      }
      case "SEND_HEART": {
        const { toId } = payload;
        roomObj.hearts[toId] = (roomObj.hearts[toId] || 0) + 1;
        break;
      }
      case "SET_PHASE": {
        roomObj.phase = payload.phase;
        break;
      }
      case "RESET_ROOM":
      case "RESET_STORIES": {
        roomObj.stories = [];
        roomObj.assign = {};
        roomObj.postcards = {};
        roomObj.phase = "writing";
        roomObj.controls.isWorryDispatched = false;
        break;
      }
      case "SUBMIT_JOHARI_MINE": {
        const { studentId, studentName, mine, hope } = payload;
        roomObj.johariStrengths[studentId] = {
          studentId,
          studentName,
          mine: mine || [],
          hope: hope || [],
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "ASSIGN_JOHARI_PAIRS": {
        const studentIds = Object.keys(roomObj.johariStrengths || {});
        if (studentIds.length >= 2) {
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
          roomObj.johariPairs = newPairs;
          roomObj.johariPhase = "assigned";
          roomObj.controls.isJohariPartnerAssigned = true;
        }
        break;
      }
      case "SUBMIT_JOHARI_FEEDBACK": {
        const { observerId, targetId, feedbackList, message } = payload;
        const key = `${observerId}_${targetId}`;
        roomObj.johariFeedback[key] = {
          observerId,
          targetId,
          feedbackList: feedbackList || [],
          message: message || "",
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "UNLOCK_JOHARI_RESULTS": {
        roomObj.johariPhase = "done";
        roomObj.controls.isJohariUnlocked = true;
        break;
      }
      case "SUBMIT_BALANCE_ANSWERS": {
        const { studentId, studentName, answers } = payload;
        roomObj.balanceAnswers[studentId] = {
          studentId,
          studentName,
          answers: answers || [],
          done: true,
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "BROADCAST_BALANCE_RESULTS": {
        const studentIds = Object.keys(roomObj.balanceAnswers || {});
        if (studentIds.length > 0) {
          const stats: Record<number, { A: number; B: number }> = {};
          for (let q = 0; q < 11; q++) stats[q] = { A: 0, B: 0 };
          studentIds.forEach((sId) => {
            const ans = roomObj.balanceAnswers[sId]?.answers || [];
            ans.forEach((choice: string, qIdx: number) => {
              if (stats[qIdx]) {
                if (choice === "A") stats[qIdx].A++;
                else if (choice === "B") stats[qIdx].B++;
              }
            });
          });
          roomObj.balanceStats = stats;

          const newSync: Record<string, any> = {};
          studentIds.forEach((myId) => {
            const myAns = roomObj.balanceAnswers[myId]?.answers || [];
            const myName = roomObj.balanceAnswers[myId]?.studentName || myId;

            const scores = studentIds
              .filter((otherId) => otherId !== myId)
              .map((otherId) => {
                const otherAns = roomObj.balanceAnswers[otherId]?.answers || [];
                const otherName = roomObj.balanceAnswers[otherId]?.studentName || otherId;
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

          roomObj.balanceSync = newSync;
          roomObj.balancePhase = "result";
          roomObj.controls.isBalanceResultBroadcasted = true;
        }
        break;
      }
      case "SUBMIT_BRANDING_CARD": {
        const { studentId, studentName, cardData } = payload;
        roomObj.brandingCards[studentId] = {
          studentId,
          studentName,
          cardData,
          savedAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        break;
      }
      case "UNLOCK_GALLERY": {
        roomObj.galleryUnlocked = true;
        roomObj.controls.isLesson3GalleryUnlocked = true;
        break;
      }
      default:
        break;
    }

    roomObj.updatedAt = new Date().toISOString();
    await saveRoomToSupabase(code, roomObj);

    return NextResponse.json({
      success: true,
      data: roomObj,
      room: roomObj
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  } catch (err: any) {
    console.error("POST /api/sync error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
