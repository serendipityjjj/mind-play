import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "mindplay_db.json");

function getDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial = {
        controls: {
          isWorryDispatched: false,
          isJohariPartnerAssigned: false,
          isJohariUnlocked: false,
          isBalanceResultBroadcasted: false,
          isLesson3GalleryUnlocked: false,
          isEssayUnlocked: true,
          unlockedStages: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true, 13: true, 14: true, 15: true }
        },
        studentRealWorries: [],
        radioHearts: { 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 },
        comfortLetters: {},
        johariStepA: {},
        johariStepB: {},
        johariSentences: {},
        completedStages: {},
        diaries: {},
        lastUpdated: new Date().toISOString()
      };
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to read database:", err);
    return {};
  }
}

function saveDatabase(db: any) {
  try {
    db.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to write database:", err);
    return false;
  }
}

export async function GET(req: NextRequest) {
  const db = getDatabase();
  return NextResponse.json({ success: true, data: db });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const db = getDatabase();

    if (!db.controls) db.controls = {};
    if (!db.studentRealWorries) db.studentRealWorries = [];
    if (!db.radioHearts) db.radioHearts = {};
    if (!db.comfortLetters) db.comfortLetters = {};
    if (!db.johariStepA) db.johariStepA = {};
    if (!db.johariStepB) db.johariStepB = {};
    if (!db.completedStages) db.completedStages = {};
    if (!db.diaries) db.diaries = {};

    switch (action) {
      case "SET_CONTROLS": {
        db.controls = { ...db.controls, ...payload };
        break;
      }
      
      case "SUBMIT_WORRY": {
        const existingIdx = db.studentRealWorries.findIndex((w: any) => w.studentId === payload.studentId);
        if (existingIdx >= 0) {
          db.studentRealWorries[existingIdx] = payload;
        } else {
          db.studentRealWorries.unshift(payload);
        }
        break;
      }

      case "TOGGLE_LIKE_WORRY": {
        db.studentRealWorries = db.studentRealWorries.map((w: any) => {
          if (w.id === payload.id) {
            const currentLikes = w.likes || 0;
            const hasLiked = w.hasLiked || false;
            return {
              ...w,
              likes: hasLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1,
              hasLiked: !hasLiked
            };
          }
          return w;
        });
        break;
      }

      case "RESET_WORRIES": {
        db.studentRealWorries = [];
        db.controls.isWorryDispatched = false;
        break;
      }

      case "SET_RADIO_HEARTS": {
        db.radioHearts = { ...db.radioHearts, ...payload };
        break;
      }

      case "SEND_COMFORT_LETTER": {
        const targetId = payload.toStudentId || payload.targetStudentId;
        if (targetId) db.comfortLetters[targetId] = payload;
        break;
      }

      case "SAVE_JOHARI_STEP_A": {
        if (payload.studentId) db.johariStepA[payload.studentId] = payload;
        break;
      }

      case "SAVE_JOHARI_STEP_B": {
        if (payload.studentId) db.johariStepB[payload.studentId] = payload;
        break;
      }

      case "SET_COMPLETED_STAGE": {
        const stStages = db.completedStages[payload.studentId] || [];
        if (!stStages.includes(payload.stageNo)) {
          db.completedStages[payload.studentId] = [...stStages, payload.stageNo];
        }
        break;
      }

      case "SAVE_DIARY": {
        if (!db.diaries[payload.studentId]) db.diaries[payload.studentId] = {};
        db.diaries[payload.studentId][payload.stageNo] = payload.entry;
        break;
      }

      case "SYNC_ALL": {
        if (payload.controls) db.controls = { ...db.controls, ...payload.controls };
        if (payload.studentRealWorries) db.studentRealWorries = payload.studentRealWorries;
        if (payload.radioHearts) db.radioHearts = { ...db.radioHearts, ...payload.radioHearts };
        if (payload.johariStepA) db.johariStepA = { ...db.johariStepA, ...payload.johariStepA };
        if (payload.johariStepB) db.johariStepB = { ...db.johariStepB, ...payload.johariStepB };
        break;
      }

      default:
        break;
    }

    saveDatabase(db);
    return NextResponse.json({ success: true, data: db });
  } catch (error: any) {
    console.error("Database POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
