import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "mindplay_rooms_db.json");

function loadDatabase(): Record<string, any> {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content || "{}");
  } catch (err) {
    return {};
  }
}

function computeDerangementAssignment(items: any[], studentIds: string[]) {
  if (!items || items.length === 0 || !studentIds || studentIds.length === 0) return {};
  const assignment: Record<string, string> = {};
  if (items.length === 1) {
    const soleItem = items[0];
    const soleId = typeof soleItem === "string" ? soleItem : soleItem.studentId || soleItem.id;
    studentIds.forEach(stId => {
      if (stId !== soleId) assignment[stId] = soleId;
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

function auditCodebaseStorage() {
  const issues: Array<{ file: string; line: number; type: string; snippet: string; isSourceOfTruth: boolean }> = [];
  const projectRoot = process.cwd();
  const scanDirs = ["app", "components", "lib"];

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".next") {
          scanDir(fullPath);
        }
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        try {
          const content = fs.readFileSync(fullPath, "utf8");
          const lines = content.split("\n");
          lines.forEach((lineText, idx) => {
            const lineNum = idx + 1;
            const relPath = path.relative(projectRoot, fullPath).replace(/\\/g, "/");

            if (lineText.includes("localStorage.setItem") || lineText.includes("sessionStorage.setItem")) {
              if (
                lineText.includes("mindplay_real_worries") ||
                lineText.includes("mindplay_worry_dispatched") ||
                lineText.includes("mindplay_johari_step_b") ||
                lineText.includes("mindplay_balance_answers") ||
                lineText.includes("mindplay_balance_broadcasted") ||
                lineText.includes("mindplay_cards")
              ) {
                issues.push({
                  file: relPath,
                  line: lineNum,
                  type: "localStorage (Class Activity State)",
                  snippet: lineText.trim().substring(0, 120),
                  isSourceOfTruth: true
                });
              }
            }
          });
        } catch (e) {}
      }
    }
  }

  scanDirs.forEach(d => scanDir(path.join(projectRoot, d)));
  return issues;
}

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const { searchParams } = new URL(req.url);
  const roomCode = searchParams.get("room") || "CLASS1";

  let backendStatus = {
    hasCloudBackend: false,
    hasLocalServerDb: false,
    dbPath: DATA_FILE,
    dbExists: false,
    dbWritable: false,
    error: null as string | null
  };

  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    backendStatus.hasLocalServerDb = true;
    backendStatus.dbExists = fs.existsSync(DATA_FILE);

    const testFile = path.join(dataDir, ".test_rw_" + Date.now() + ".tmp");
    fs.writeFileSync(testFile, "OK", "utf8");
    const readVal = fs.readFileSync(testFile, "utf8");
    fs.unlinkSync(testFile);
    backendStatus.dbWritable = readVal === "OK";
  } catch (err: any) {
    backendStatus.error = err.message;
  }

  const envStatus = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL.substring(0, 4) + "••••"
      : null,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.substring(0, 4) + "••••"
      : (process.env.NEXT_PUBLIC_GEMINI_API_KEY ? process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(0, 4) + "••••" : null),
    FIREBASE_CONFIG: process.env.FIREBASE_PROJECT_ID ? "Configured" : null,
    NODE_ENV: process.env.NODE_ENV || "development"
  };

  const latencyMs = Date.now() - startTime;
  const codeAuditIssues = auditCodebaseStorage();
  const db = loadDatabase();
  const code = roomCode.toUpperCase().trim();
  const room = db[code] || null;

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    latencyMs,
    backendStatus,
    envStatus,
    codeAuditIssues,
    roomData: room
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, roomCode = "CLASS1" } = body;
    const db = loadDatabase();
    const code = (roomCode || "CLASS1").toUpperCase().trim();

    if (!db[code]) {
      db[code] = {
        code,
        phase: "writing",
        stories: [],
        assign: {},
        postcards: [],
        hearts: { 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 },
        johariPhase: "stepA",
        strengths: {},
        pairs: {},
        feedback: {},
        balance: {},
        sync: {},
        stats: {},
        cards: {},
        likes: {},
        phase4: "playing",
        phase6: "writing",
        controls: {
          isJohariPartnerAssigned: false,
          isJohariUnlocked: false,
          isBalanceResultBroadcasted: false,
          isLesson3GalleryUnlocked: false
        },
        lastUpdated: new Date().toISOString()
      };
    }
    const room = db[code];

    if (action === "GENERATE_26_MOCK_STUDENTS") {
      const studentNames = [
        "김민준", "이서연", "박도윤", "정시우", "최하은", "한승우", "윤지호", "장서아", "임은우", "오지유",
        "강민서", "신유준", "조예은", "황건우", "배수아", "안준서", "송시아", "홍도현", "유채원", "백시윤",
        "허가은", "노이준", "남아린", "심지우", "문서진", "곽태양"
      ];
      const categories = ["또래/교우", "학업/성적", "가족/부모", "진로/미래", "외모/자신감", "성격/감정"];
      const strengthsPool = ["책임감", "배려심", "유머감각", "끈기", "창의성", "경청", "친화력", "솔직함", "도전정신", "신중함", "리더십", "적응력"];
      const balanceOptions = ["A", "B"];

      room.stories = studentNames.map((name, i) => ({
        id: "story_mock_" + (10101 + i),
        studentId: String(10101 + i),
        category: categories[i % categories.length],
        text: `안녕하세요, 저는 요즘 ${categories[i % categories.length]} 문제로 고민이 많아요. 친구들과 더 잘 지내고 싶고 마음이 복잡합니다.`,
        createdAt: "오전 09:30",
        likes: Math.floor(Math.random() * 5)
      }));

      room.strengths = {};
      studentNames.forEach((name, i) => {
        const stId = String(10101 + i);
        room.strengths[stId] = {
          studentId: stId,
          name,
          mine: strengthsPool.slice(i % 6, (i % 6) + 5),
          hope: strengthsPool.slice((i + 5) % 10, ((i + 5) % 10) + 2),
          savedAt: new Date().toISOString()
        };
      });

      room.balance = {};
      studentNames.forEach((name, i) => {
        const stId = String(10101 + i);
        const ans: Record<number, string> = {};
        for (let q = 1; q <= 11; q++) {
          ans[q] = balanceOptions[(i + q) % 2];
        }
        room.balance[stId] = {
          name,
          answers: ans,
          done: true,
          savedAt: new Date().toISOString()
        };
      });

      room.cards = {};
      const temperaments = [
        { type: "NF", label: "따뜻한 공감의 NF 힐러" },
        { type: "SJ", label: "책임감 있는 SJ 수호자" },
        { type: "NT", label: "논리적인 NT 탐구자" },
        { type: "SP", label: "자유로운 SP 모험가" }
      ];
      studentNames.forEach((name, i) => {
        const stId = String(10101 + i);
        const temp = temperaments[i % 4];
        room.cards[stId] = {
          studentId: stId,
          name,
          nickname: temp.label,
          catchphrase: `나다운 따뜻함과 개성으로 반짝이는 ${name}`,
          whenCall: "고민이 있거나 힘든 일이 생겼을 때",
          selfCheer: "남과 비교하지 말고 나만의 속도로 당당하게!",
          topMI: ["대인관계", "음악", "자기이해"],
          keirsey: temp,
          strengths: room.strengths[stId].mine,
          balanceTags: ["#즉흥여행", "#솔직대화", "#이어폰필수"],
          color: "emerald",
          emoji: "🌟",
          done: true,
          savedAt: new Date().toISOString()
        };
      });

      room.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");

      return NextResponse.json({
        success: true,
        message: "가짜 학생 26명 데이터(사연/강점/밸런스/브랜딩)가 서버에 성공적으로 생성되었습니다!",
        room
      });
    }

    if (action === "DISPATCH_DERANGEMENT_TEST") {
      const studentIds = room.stories.map((s: any) => s.studentId);
      const assignment = computeDerangementAssignment(room.stories, studentIds);
      room.assign = assignment;
      room.phase = "assigned";

      room.pairs = computeDerangementAssignment(studentIds, studentIds);
      room.johariPhase = "assigned";

      room.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");

      const selfAssigned: Array<{ studentId: string; targetId: string }> = [];
      for (const [sId, tId] of Object.entries(assignment)) {
        if (sId === tId) selfAssigned.push({ studentId: sId, targetId: tId });
      }

      return NextResponse.json({
        success: true,
        assignment,
        pairs: room.pairs,
        selfAssignedCount: selfAssigned.length,
        selfAssignedList: selfAssigned,
        room
      });
    }

    if (action === "RESET_ROOM_DATA") {
      delete db[code];
      fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
      return NextResponse.json({
        success: true,
        message: `수업방 [${code}] 데이터가 완전히 초기화되었습니다.`
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
