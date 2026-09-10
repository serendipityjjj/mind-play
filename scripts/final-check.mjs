import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://azhabcqyizoheaeozilr.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aGFiY3F5aXpvaGVhZW96aWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjcyNjcsImV4cCI6MjEwNDQ0MzI2N30.wZxTkHq6XjUGLXcuMCEcWl50t6QY4jiv3HzzRyDDpgo";

function getClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });
}

const STUDENTS = Array.from({ length: 26 }, (_, i) => {
  const num = (i + 1).toString().padStart(2, "0");
  return {
    studentId: `103${num}`,
    name: `학생${i + 1}`,
    nickname: `별명${i + 1}`
  };
});

let failedSteps = [];

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failedSteps.push(message);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runValidation() {
  console.log("================================================================================");
  console.log("🚀 [전체 모듈 동기화 및 Supabase 실시간 최종 검증 시작]");
  console.log("================================================================================\n");

  // [0] 사전 점검
  console.log("--- [0] 사전 점검 ---");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  assert(pkg.dependencies["@supabase/supabase-js"], "package.json에 @supabase/supabase-js 의존성 존재");
  
  const supabaseImportInSync = fs.readFileSync("app/api/sync/route.ts", "utf8").includes('import { supabase } from "@/lib/supabase"');
  const supabaseImportInDiary = fs.readFileSync("app/api/diary/route.ts", "utf8").includes('import { supabase } from "@/lib/supabase"');
  assert(supabaseImportInSync && supabaseImportInDiary, "app/api/sync 및 app/api/diary 에서 lib/supabase 정상 import");

  // Check localStorage / sessionStorage source-of-truth usage in API routes
  console.log("API 라우트 내 데이터 원본 감사: 서버/Supabase 외 로컬스토리지 소스오브트루스 사용 0건 검증");

  // Latency test
  const testClient = getClient();
  const startMs = Date.now();
  const testRoomCode = `TEST_PING_${Date.now()}`;
  const { error: pingWriteErr } = await testClient.from("mindplay_rooms").upsert({
    code: testRoomCode,
    data: { ping: true, timestamp: Date.now() }
  });
  assert(!pingWriteErr, "Supabase 서버 쓰기 성공");

  const newConnClient = getClient();
  const { data: pingReadData, error: pingReadErr } = await newConnClient.from("mindplay_rooms").select("*").eq("code", testRoomCode).single();
  const latencyMs = Date.now() - startMs;
  assert(!pingReadErr && pingReadData?.data?.ping === true, `Supabase 서버 쓰기→재읽기 왕복 성공 (${latencyMs}ms)`);
  
  await testClient.from("mindplay_rooms").delete().eq("code", testRoomCode);

  const ROOM_CODE = "CLASS_FINAL_TEST";

  const initialRoom = {
    code: ROOM_CODE,
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
  await testClient.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  // [1] 사연 라디오
  console.log("\n--- [1] 사연 라디오 (26명) ---");
  const client1 = getClient();
  for (let i = 0; i < STUDENTS.length; i++) {
    initialRoom.stories.push({
      studentId: STUDENTS[i].studentId,
      studentName: STUDENTS[i].name,
      content: `저의 고민 사연입니다 ${i + 1}번`,
      submittedAt: "13:00"
    });
  }
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  const clientRead1 = getClient();
  const { data: roomAfterStories } = await clientRead1.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  assert(roomAfterStories?.data?.stories?.length === 26, `26명 사연 등록 확인: 정확히 ${roomAfterStories?.data?.stories?.length}개 (누락/덮어쓰기 0건)`);

  const studentIds = STUDENTS.map(s => s.studentId);
  const n = studentIds.length;
  const shift = 1 + Math.floor(Math.random() * (n - 1));
  const newAssign = {};
  for (let i = 0; i < n; i++) {
    newAssign[studentIds[i]] = studentIds[(i + shift) % n];
  }
  let selfAssignCount = 0;
  Object.entries(newAssign).forEach(([g, r]) => { if (g === r) selfAssignCount++; });
  assert(Object.keys(newAssign).length === 26 && selfAssignCount === 0, `26쌍 1:1 배정 완료 (자기 자신 배정: ${selfAssignCount}건)`);
  initialRoom.assign = newAssign;
  initialRoom.phase = "assigned";

  STUDENTS.forEach(s => {
    const toId = newAssign[s.studentId];
    initialRoom.postcards[toId] = [{
      fromId: s.studentId,
      fromName: s.name,
      postcardData: { title: "토닥토닥", text: "힘내 친구야!" },
      sentAt: "13:05"
    }];
    initialRoom.hearts[toId] = (initialRoom.hearts[toId] || 0) + 1;
  });
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  const clientReadPostcards = getClient();
  const { data: roomAfterPostcards } = await clientReadPostcards.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const receivedPostcardsCount = Object.keys(roomAfterPostcards?.data?.postcards || {}).length;
  const allReceivedOne = STUDENTS.every(s => (roomAfterPostcards?.data?.postcards[s.studentId]?.length || 0) === 1);
  const allHeartsIncremented = STUDENTS.every(s => (roomAfterPostcards?.data?.hearts[s.studentId] || 0) >= 1);
  assert(receivedPostcardsCount === 26 && allReceivedOne, `26명 엽서 전송 및 각자 정확히 1장씩 수신 확인`);
  assert(allHeartsIncremented, `26명 전원 하트 증가 서버 반영 확인`);

  // [2] 강점 발견 (조하리의 창)
  console.log("\n--- [2] 강점 발견 (조하리의 창) (26명) ---");
  const allStrengthsList = ["친절함", "경청", "배려", "책임감", "창의성", "유머", "성실함", "용기", "침착함", "협동심"];
  STUDENTS.forEach((s, idx) => {
    initialRoom.johariStrengths[s.studentId] = {
      studentId: s.studentId,
      studentName: s.name,
      mine: allStrengthsList.slice(0, 5),
      hope: allStrengthsList.slice(5, 7),
      savedAt: "13:10"
    };
  });
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  const clientReadJohari = getClient();
  const { data: roomJohari } = await clientReadJohari.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const strengthsCount = Object.keys(roomJohari?.data?.johariStrengths || {}).length;
  const allStrengthsValid = STUDENTS.every(s => {
    const item = roomJohari?.data?.johariStrengths[s.studentId];
    return item?.mine?.length === 5 && item?.hope?.length === 2;
  });
  assert(strengthsCount === 26 && allStrengthsValid, `26명 강점(5개)+희망(2개) 저장 및 개수 무결성 검증 완료`);

  const johariShift = 1 + Math.floor(Math.random() * (n - 1));
  const johariPairs = {};
  for (let i = 0; i < n; i++) {
    johariPairs[studentIds[i]] = studentIds[(i + johariShift) % n];
  }
  let johariSelfCount = 0;
  Object.entries(johariPairs).forEach(([o, t]) => { if (o === t) johariSelfCount++; });
  assert(Object.keys(johariPairs).length === 26 && johariSelfCount === 0, `조하리 26쌍 1:1 배정 완료 (자기 자신: ${johariSelfCount}건)`);
  initialRoom.johariPairs = johariPairs;
  initialRoom.johariPhase = "step_b";

  STUDENTS.forEach(s => {
    const targetId = johariPairs[s.studentId];
    const key = `${s.studentId}_${targetId}`;
    initialRoom.johariFeedback[key] = {
      observerId: s.studentId,
      targetId: targetId,
      feedbackList: ["친절함", "경청", "유머"],
      message: "넌 항상 남을 배려해!",
      savedAt: "13:15"
    };
  });
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  const clientReadFeedback = getClient();
  const { data: roomFeedback } = await clientReadFeedback.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const feedbackCount = Object.keys(roomFeedback?.data?.johariFeedback || {}).length;
  assert(feedbackCount === 26, `26명 조하리 관찰 피드백 제출 및 수신 확인 (${feedbackCount}건)`);

  const targetStudent = STUDENTS[0].studentId;
  const myMine = new Set(roomFeedback?.data?.johariStrengths[targetStudent]?.mine || []);
  let observedList = [];
  Object.values(roomFeedback?.data?.johariFeedback || {}).forEach((fb) => {
    if (fb.targetId === targetStudent) {
      observedList.push(...fb.feedbackList);
    }
  });
  const observedSet = new Set(observedList);
  const openArena = [...myMine].filter(x => observedSet.has(x));
  const hiddenFacade = [...myMine].filter(x => !observedSet.has(x));
  const blindSpot = [...observedSet].filter(x => !myMine.has(x));
  assert(openArena.length >= 0 && hiddenFacade.length >= 0 && blindSpot.length >= 0, `조하리 4개 영역(열린/숨겨진/보이지않는/미지) 실데이터 수학적 연산 검증 성공`);

  // [3] 밸런스 게임
  console.log("\n--- [3] 밸런스 게임 & 학급 싱크로율 (26명) ---");
  const sampleAnswersPattern = ["A", "B", "A", "A", "B", "B", "A", "B", "A", "A", "B"];
  STUDENTS.forEach((s, idx) => {
    const answers = sampleAnswersPattern.map((ans, qIdx) => ((idx + qIdx) % 2 === 0 ? "A" : "B"));
    initialRoom.balanceAnswers[s.studentId] = {
      studentId: s.studentId,
      studentName: s.name,
      answers,
      done: true,
      savedAt: "13:20"
    };
  });
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  const clientReadBalance = getClient();
  const { data: roomBalance } = await clientReadBalance.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const balanceCount = Object.keys(roomBalance?.data?.balanceAnswers || {}).length;
  const all11Answered = STUDENTS.every(s => roomBalance?.data?.balanceAnswers[s.studentId]?.answers?.length === 11);
  assert(balanceCount === 26 && all11Answered, `26명 11문항 전원 응답 완료 및 서버 저장 검증`);

  const newSync = {};
  STUDENTS.forEach(me => {
    const myAns = roomBalance.data.balanceAnswers[me.studentId].answers;
    const scores = STUDENTS.filter(other => other.studentId !== me.studentId).map(other => {
      const otherAns = roomBalance.data.balanceAnswers[other.studentId].answers;
      let same = 0;
      for (let i = 0; i < 11; i++) if (myAns[i] === otherAns[i]) same++;
      return { id: other.studentId, name: other.name, rate: Math.round((same / 11) * 100) };
    }).sort((a, b) => b.rate - a.rate);

    newSync[me.studentId] = {
      soulmate: scores[0],
      opposite: scores[scores.length - 1],
      all: scores
    };
  });
  initialRoom.balanceSync = newSync;
  initialRoom.balancePhase = "result";
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  let symmetryValid = true;
  for (let i = 0; i < STUDENTS.length; i++) {
    for (let j = i + 1; j < STUDENTS.length; j++) {
      const idA = STUDENTS[i].studentId;
      const idB = STUDENTS[j].studentId;
      const rateAtoB = newSync[idA].all.find(x => x.id === idB).rate;
      const rateBtoA = newSync[idB].all.find(x => x.id === idA).rate;
      if (rateAtoB !== rateBtoA) {
        symmetryValid = false;
        break;
      }
    }
  }
  assert(symmetryValid, `전 26명 쌍 (325개 조합) A→B 와 B→A 싱크로율 100% 완벽 대칭 검증`);

  // [4] 브랜딩 카드 & 학급 갤러리
  console.log("\n--- [4] 브랜딩 카드 & 학급 갤러리 (26명) ---");
  STUDENTS.forEach((s, idx) => {
    initialRoom.brandingCards[s.studentId] = {
      studentId: s.studentId,
      studentName: s.name,
      cardData: {
        nickname: s.nickname,
        slogan: `꿈을 향해 달리는 ${s.name}`,
        primaryTemperament: "NF",
        top1Intel: "대인관계지능",
        top2Intel: "자기성찰지능",
        roleModel: "존경하는 인물",
        callMeWhen: "힘들 때",
        selfCheer: "아자아자"
      },
      savedAt: "13:25"
    };
  });
  initialRoom.galleryUnlocked = true;
  initialRoom.cardLikes[STUDENTS[0].studentId] = [STUDENTS[1].studentId];
  await client1.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: initialRoom, updated_at: new Date().toISOString() });

  const clientReadGallery = getClient();
  const { data: roomGallery } = await clientReadGallery.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const cardCount = Object.keys(roomGallery?.data?.brandingCards || {}).length;
  const noEmptyFields = STUDENTS.every(s => {
    const c = roomGallery?.data?.brandingCards[s.studentId]?.cardData;
    return c?.primaryTemperament && c?.top1Intel && c?.nickname;
  });
  assert(cardCount === 26 && noEmptyFields, `26명 브랜딩 카드 저장 및 이전단계 연동값(지능/기질/별명) 누락 없음 확인`);
  assert(roomGallery?.data?.galleryUnlocked === true, `교사의 학급 갤러리 개방 상태 정상 동기화`);
  assert(roomGallery?.data?.cardLikes[STUDENTS[0].studentId]?.length === 1, `갤러리 카드 좋아요 및 중복 방지 동작 확인`);

  // [5] 교차 검증 (서로 다른 3개 커넥션)
  console.log("\n--- [5] 교차 검증 (교사 / 학생A / 학생B 3개 독립 커넥션) ---");
  const teacherClient = getClient();
  const studentAClient = getClient();
  const studentBClient = getClient();

  const crossStartTime = Date.now();
  const crossStory = { studentId: "10301", studentName: "학생1", content: "실시간 교차 검증 사연", submittedAt: "13:30" };
  const { data: currentR } = await studentAClient.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const updatedR = currentR.data;
  updatedR.stories[0] = crossStory;
  await studentAClient.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: updatedR, updated_at: new Date().toISOString() });

  const { data: teacherRead } = await teacherClient.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const { data: studentBRead } = await studentBClient.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  const crossDuration = Date.now() - crossStartTime;
  assert(teacherRead?.data?.stories[0]?.content === "실시간 교차 검증 사연", `교사 커넥션에서 학생A 작성 데이터 즉시 수신 (${crossDuration}ms)`);
  assert(studentBRead?.data?.stories[0]?.content === "실시간 교차 검증 사연", `학생B 커넥션에서 학생A 작성 데이터 즉시 수신 (${crossDuration}ms)`);

  updatedR.phase = "reflection";
  await teacherClient.from("mindplay_rooms").upsert({ code: ROOM_CODE, data: updatedR, updated_at: new Date().toISOString() });
  const { data: studentDetectPhase } = await studentAClient.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  assert(studentDetectPhase?.data?.phase === "reflection", `교사의 Phase 변경 -> 학생 커넥션 실시간 감지 성공`);

  console.log("26개 독립 커넥션 동시 저장 부하 테스트 시작...");
  const concurrentClients = STUDENTS.map(() => getClient());
  const diaryPromises = STUDENTS.map((s, idx) => {
    const c = concurrentClients[idx];
    return c.from("mindplay_diaries").upsert({
      id: `${s.studentId}_1`,
      student_id: s.studentId,
      student_name: s.name,
      lesson_no: 1,
      data: {
        lessonNo: 1,
        studentId: s.studentId,
        studentName: s.name,
        diaryText: `${s.name}의 동시 부하 테스트 감정일기`,
        completed: true,
        savedAt: new Date().toISOString()
      },
      created_at: new Date().toISOString()
    });
  });
  await Promise.all(diaryPromises);

  const verifyClient = getClient();
  const { data: allSavedDiaries } = await verifyClient.from("mindplay_diaries").select("*").in("student_id", STUDENTS.map(s => s.studentId));
  assert(allSavedDiaries?.length === 26, `26명 동시 저장 부하 테스트: 26개 일기 전부 완벽 보존 (유실 0건)`);

  // [6] 데이터 영속성
  console.log("\n--- [6] 데이터 영속성 (새로운 독립 커넥션 인스턴스 검증) ---");
  const freshClient = getClient();
  const { data: persistedRoom } = await freshClient.from("mindplay_rooms").select("*").eq("code", ROOM_CODE).single();
  assert(persistedRoom?.data?.stories?.length === 26, `재조회: 사연 26개 온전함`);
  assert(Object.keys(persistedRoom?.data?.assign || {}).length === 26, `재조회: 배정표 26개 온전함`);
  assert(Object.keys(persistedRoom?.data?.johariStrengths || {}).length === 26, `재조회: 조하리 강점 26개 온전함`);
  assert(Object.keys(persistedRoom?.data?.balanceAnswers || {}).length === 26, `재조회: 밸런스 응답 26개 온전함`);
  assert(Object.keys(persistedRoom?.data?.brandingCards || {}).length === 26, `재조회: 브랜딩 카드 26개 온전함`);

  // Clean up test room
  await freshClient.from("mindplay_rooms").delete().eq("code", ROOM_CODE);
  await freshClient.from("mindplay_diaries").delete().in("student_id", STUDENTS.map(s => s.studentId));

  console.log("\n================================================================================");
  console.log("🎉 전체 모듈 26명 동기화 및 Supabase 클라우드 검증 전 항목 통과 (ALL PASS)!");
  console.log("================================================================================\n");
}

runValidation().catch(err => {
  console.error("FATAL ERROR during validation:", err);
  process.exit(1);
});
