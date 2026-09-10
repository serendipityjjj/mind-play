import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "mindplay_rooms_db.json");

function loadDatabase(): Record<string, any> {
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
    console.error("Failed to load room database:", err);
    return {};
  }
}

function saveDatabase(db: Record<string, any>) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to save room database:", err);
    return false;
  }
}

function getOrCreateRoom(db: Record<string, any>, roomCode: string) {
  const code = (roomCode || "CLASS1").toUpperCase().trim();
  if (!db[code]) {
    db[code] = {
      code,
      phase: "writing",
      stories: [],
      assign: {},
      postcards: [],
      hearts: { 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 },
      // 2단계 조하리의 창 활동 전용 공용 네임스페이스
      johariPhase: "stepA", // "stepA" | "assigned" | "done"
      strengths: {},        // { [studentId]: { name, mine: [5], hope: [2], savedAt } }
      pairs: {},            // { [observerStudentId]: targetStudentId }
      feedback: {},         // { [observerId_targetId]: { observerId, targetId, picks: [5], reason, sentAt } }
      stepA: {},
      stepB: {},
      controls: {
        isJohariPartnerAssigned: false,
        isJohariUnlocked: false,
        isBalanceResultBroadcasted: false,
        isLesson3GalleryUnlocked: false,
        isEssayUnlocked: true,
        unlockedStages: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true, 13: true, 14: true, 15: true }
      },
      lastUpdated: new Date().toISOString()
    };
  }
  return db[code];
}

// 1:1 무작위 순열 배정 (Derangement: 자기 자신 배제)
function computeDerangementAssignment(items: any[], studentIds: string[]) {
  if (!items || items.length === 0 || !studentIds || studentIds.length === 0) {
    return {};
  }
  const assignment: Record<string, string> = {};
  if (items.length === 1) {
    const soleItem = items[0];
    const soleId = typeof soleItem === "string" ? soleItem : soleItem.studentId || soleItem.id;
    studentIds.forEach(stId => {
      if (stId !== soleId) {
        assignment[stId] = soleId;
      }
    });
    return assignment;
  }
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  studentIds.forEach((stId, idx) => {
    const candidates = shuffled.filter(s => {
      const targetId = typeof s === "string" ? s : s.studentId || s.id;
      return targetId !== stId;
    });
    if (candidates.length > 0) {
      const chosen = candidates[idx % candidates.length];
      assignment[stId] = typeof chosen === "string" ? chosen : chosen.studentId || chosen.id;
    } else {
      const chosen = shuffled[0];
      assignment[stId] = typeof chosen === "string" ? chosen : chosen.studentId || chosen.id;
    }
  });
  return assignment;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomCode = searchParams.get("room") || "CLASS1";
  const studentId = searchParams.get("studentId");
  const db = loadDatabase();
  const room = getOrCreateRoom(db, roomCode);

  // 1단계 내 배정 사연
  let myAssignedStory = null;
  if (studentId && room.assign && room.assign[studentId]) {
    const assignedStoryId = room.assign[studentId];
    myAssignedStory = room.stories.find((s: any) => s.id === assignedStoryId) || null;
  }

  // 1단계 내게 온 엽서
  let myReceivedPostcards: any[] = [];
  if (studentId && Array.isArray(room.postcards)) {
    myReceivedPostcards = room.postcards.filter((p: any) => p.toStudentId === studentId);
  }

  // 2단계 조하리 내 파트너 (내가 강점을 찾아줄 친구 ID)
  let myJohariTargetPartnerId = null;
  if (studentId && room.pairs && room.pairs[studentId]) {
    myJohariTargetPartnerId = room.pairs[studentId];
  }

  // 2단계 내게 도착한 친구의 강점 피드백
  let myReceivedFeedback = null;
  if (studentId && room.feedback) {
    // 누군가 나(targetId === studentId)에게 보낸 피드백 검색
    for (const key of Object.keys(room.feedback)) {
      const fb = room.feedback[key];
      if (fb && fb.targetId === studentId) {
        myReceivedFeedback = fb;
        break;
      }
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      ...room,
      myAssignedStory,
      myReceivedPostcards,
      myJohariTargetPartnerId,
      myReceivedFeedback
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room: inputRoomCode, action, payload } = body;
    const roomCode = inputRoomCode || "CLASS1";
    const db = loadDatabase();
    const room = getOrCreateRoom(db, roomCode);

    switch (action) {
      // --- 1단계 액션 ---
      case "SUBMIT_STORY": {
        const newStory = {
          id: "story_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
          studentId: payload.studentId,
          category: payload.category || "또래/교우",
          text: payload.text || payload.content || "",
          createdAt: payload.createdAt || new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          likes: 0
        };
        const existIdx = room.stories.findIndex((s: any) => s.studentId === payload.studentId);
        if (existIdx >= 0) {
          room.stories[existIdx] = { ...room.stories[existIdx], ...newStory, id: room.stories[existIdx].id };
        } else {
          room.stories.unshift(newStory);
        }
        break;
      }
      case "LIKE_STORY": {
        const targetStory = room.stories.find((s: any) => s.id === payload.storyId);
        if (targetStory) {
          targetStory.likes = (targetStory.likes || 0) + (payload.isIncrement ? 1 : -1);
          if (targetStory.likes < 0) targetStory.likes = 0;
        }
        break;
      }
      case "DISPATCH_ASSIGN": {
        const studentList: string[] = payload.allStudentIds || room.stories.map((s: any) => s.studentId);
        const newAssign = computeDerangementAssignment(room.stories, studentList);
        room.assign = newAssign;
        room.phase = "assigned";
        break;
      }
      case "SEND_POSTCARD": {
        const newPostcard = {
          id: "postcard_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
          storyId: payload.storyId,
          fromStudentId: payload.fromStudentId,
          toStudentId: payload.toStudentId,
          step1: payload.step1,
          step2: payload.step2,
          step3: payload.step3,
          stickers: payload.stickers || [],
          createdAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        };
        if (!Array.isArray(room.postcards)) room.postcards = [];
        room.postcards.push(newPostcard);
        break;
      }
      case "RESET_STORIES": {
        room.stories = [];
        room.assign = {};
        room.postcards = [];
        room.phase = "writing";
        break;
      }
      case "RESET_HEARTS": {
        room.hearts = { 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 };
        break;
      }
      case "INCREMENT_RADIO_HEART": {
        const freq = payload.freq;
        if (room.hearts && typeof room.hearts[freq] === "number") {
          room.hearts[freq] += 1;
        } else {
          room.hearts[freq] = 1;
        }
        break;
      }

      // --- 2단계 조하리의 창 액션 ---
      // 1) Step A 나의 강점 5 + 희망 강점 2 저장
      case "SAVE_STRENGTHS": {
        if (!room.strengths) room.strengths = {};
        room.strengths[payload.studentId] = {
          studentId: payload.studentId,
          name: payload.name || payload.studentName || payload.studentId,
          mine: payload.mine || payload.mySelfStrengths || [],
          hope: payload.hope || payload.myAspirationalStrengths || [],
          savedAt: new Date().toISOString()
        };
        break;
      }

      // 2) 교사 2단계 학생 1:1 무작위 배정 (Derangement)
      case "DISPATCH_JOHARI_PAIRS": {
        const candidateIds = payload.studentIds || Object.keys(room.strengths || {});
        const newPairs = computeDerangementAssignment(candidateIds, candidateIds);
        room.pairs = newPairs;
        room.johariPhase = "assigned";
        if (!room.controls) room.controls = {};
        room.controls.isJohariPartnerAssigned = true;
        break;
      }

      // 3) Step B 친구 강점 5개 선물 (Feedback)
      case "SEND_STRENGTH_FEEDBACK": {
        if (!room.feedback) room.feedback = {};
        const key = payload.observerId + "_" + payload.targetId;
        room.feedback[key] = {
          observerId: payload.observerId,
          targetId: payload.targetId,
          picks: payload.picks || payload.partnerGiftStrengths || [],
          reason: payload.reason || "",
          sentAt: new Date().toISOString()
        };
        break;
      }

      // 4) 교사 Step C/D 개방 (결과 전송)
      case "UNLOCK_JOHARI_RESULTS": {
        room.johariPhase = "done";
        if (!room.controls) room.controls = {};
        room.controls.isJohariUnlocked = true;
        break;
      }

      case "RESET_JOHARI": {
        room.strengths = {};
        room.pairs = {};
        room.feedback = {};
        room.johariPhase = "stepA";
        if (!room.controls) room.controls = {};
        room.controls.isJohariPartnerAssigned = false;
        room.controls.isJohariUnlocked = false;
        break;
      }

      case "SET_ROOM_CONTROLS": {
        room.controls = { ...room.controls, ...payload };
        break;
      }

      default:
        break;
    }

    room.lastUpdated = new Date().toISOString();
    saveDatabase(db);
    return NextResponse.json({ success: true, data: room });
  } catch (error: any) {
    console.error("Room Sync Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}