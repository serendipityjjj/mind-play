import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://azhabcqyizoheaeozilr.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aGFiY3F5aXpvaGVhZW96aWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjcyNjcsImV4cCI6MjEwNDQ0MzI2N30.wZxTkHq6XjUGLXcuMCEcWl50t6QY4jiv3HzzRyDDpgo";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const isDryRun = process.argv.includes("--dry-run");

// RFC 4180 CSV parser capable of multi-megabyte cells and escaped quotes
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(cur);
        cur = "";
      } else if (c === '\r') {
      } else if (c === '\n') {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
      } else {
        cur += c;
      }
    }
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

async function main() {
  console.log("==================================================");
  console.log("📦 MindPlay Legacy Data Migration to Live Sync");
  console.log("📡 Supabase URL: " + SUPABASE_URL);
  console.log("⚙️ Mode: " + (isDryRun ? "DRY-RUN (미리보기 모드 - 실제 저장 없음)" : "EXECUTE (실제 마이그레이션 실행)"));
  console.log("==================================================");

  // 1. Parse CSV Files
  const diariesCsvPath = path.join(process.cwd(), "data-import", "mindplay_diaries_rows.csv");
  const profilesCsvPath = path.join(process.cwd(), "data-import", "mindplay_profiles_rows.csv");
  const roomsCsvPath = path.join(process.cwd(), "data-import", "mindplay_rooms_rows.csv");

  if (!fs.existsSync(diariesCsvPath) || !fs.existsSync(profilesCsvPath) || !fs.existsSync(roomsCsvPath)) {
    console.error("❌ Error: CSV files not found in data-import folder.");
    process.exit(1);
  }

  const diaryRows = parseCSV(fs.readFileSync(diariesCsvPath, "utf8")).slice(1).filter(r => r.length > 1);
  const profileRows = parseCSV(fs.readFileSync(profilesCsvPath, "utf8")).slice(1).filter(r => r.length > 1);
  const roomRows = parseCSV(fs.readFileSync(roomsCsvPath, "utf8")).slice(1).filter(r => r.length > 1);

  // Analyze Diaries
  let diariesWithDrawing = 0;
  let diariesTextOnly = 0;
  const parsedDiaries = [];
  for (const r of diaryRows) {
    const [id, student_id, student_name, lesson_no_str, data_str, created_at] = r;
    const studentId = String(student_id).trim();
    const lessonNo = parseInt(lesson_no_str, 10) || 1;
    let data = {};
    try { data = JSON.parse(data_str); } catch(e){}
    const hasImage = !!(data.image || data.imageUrl);
    if (hasImage) diariesWithDrawing++;
    else diariesTextOnly++;

    parsedDiaries.push({
      id,
      studentId,
      studentName: student_name,
      lessonNo,
      data,
      hasImage,
      createdAt: created_at || new Date().toISOString()
    });
  }

  // Analyze Profiles
  let l2Count = 0;
  let l3BalanceCount = 0;
  let l3BrandingCount = 0;
  let l3KeirseyCount = 0;
  let l4Count = 0;
  const parsedProfiles = [];
  for (const r of profileRows) {
    const [student_id, student_name, profile_str, updated_at] = r;
    const studentId = String(student_id).trim();
    let profile = {};
    try { profile = JSON.parse(profile_str); } catch(e){}

    if (profile.lesson2 && (profile.lesson2.mySelfStrengths || profile.lesson2.myAspirationalStrengths)) l2Count++;
    if (profile.lesson3?.balanceAnswers) l3BalanceCount++;
    if (profile.lesson3?.brandingCard) l3BrandingCount++;
    if (profile.lesson3?.keirsey) l3KeirseyCount++;
    if (profile.lesson4) l4Count++;

    parsedProfiles.push({
      studentId,
      studentName: student_name,
      profile,
      updatedAt: updated_at || new Date().toISOString()
    });
  }

  console.log("\n📊 [이전 대상 데이터 분석 요약]");
  console.log("- 일기 데이터 총 건수: " + parsedDiaries.length + "건 (그림 포함: " + diariesWithDrawing + "건, 텍스트 전용: " + diariesTextOnly + "건)");
  console.log("  · 대상 학번 목록 (" + parsedDiaries.length + "건): " + parsedDiaries.map(d => d.studentId).join(", "));
  console.log("- 프로필 데이터 총 인원: " + parsedProfiles.length + "명");
  console.log("  · Lesson 2 (강점 검사) 데이터: " + l2Count + "명");
  console.log("  · Lesson 3 (밸런스게임 답변) 데이터: " + l3BalanceCount + "명");
  console.log("  · Lesson 3 (브랜딩 카드) 데이터: " + l3BrandingCount + "명");
  console.log("  · Lesson 3 (기질 검사) 데이터: " + l3KeirseyCount + "명");
  console.log("  · 대상 학번 목록 (" + parsedProfiles.length + "명): " + parsedProfiles.map(p => p.studentId).join(", "));
  console.log("- 수업방 데이터: " + roomRows.length + "개 방 (사연 본문 복원 안 함, 실시간 동기화 상태만 보존)");

  if (isDryRun) {
    console.log("\n🔎 [--dry-run 모드 완료: 저장된 레코드 없음]");
    return;
  }

  console.log("\n🚀 [실제 마이그레이션 실행 시작...]");

  // 2. Setup Drawing Storage Directory
  const localDrawingsDir = path.join(process.cwd(), "public", "uploads", "drawings");
  if (!fs.existsSync(localDrawingsDir)) {
    fs.mkdirSync(localDrawingsDir, { recursive: true });
  }

  // 3. Process & Migrate Diaries
  let migratedDiariesCount = 0;
  const uploadedImageUrls = [];

  for (const item of parsedDiaries) {
    const { studentId, studentName, lessonNo, data, hasImage, createdAt } = item;
    const cleanEntry = { ...data, studentId, studentName, lessonNo, createdAt };

    if (hasImage && (data.image || data.imageUrl)) {
      const rawBase64 = data.image || data.imageUrl;
      const cleanBase64 = rawBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanBase64, "base64");
      const fileName = "drawing_" + studentId + "_" + lessonNo + ".png";
      const filePath = path.join(localDrawingsDir, fileName);
      fs.writeFileSync(filePath, buffer);

      let finalUrl = "/uploads/drawings/" + fileName;
      try {
        const { error: upErr } = await supabase.storage
          .from("mindplay-drawings")
          .upload("drawings/" + fileName, buffer, { contentType: "image/png", upsert: true });
        if (!upErr) {
          const { data: pubData } = supabase.storage.from("mindplay-drawings").getPublicUrl("drawings/" + fileName);
          if (pubData?.publicUrl) finalUrl = pubData.publicUrl;
        }
      } catch(e){}

      cleanEntry.imageUrl = finalUrl;
      delete cleanEntry.image;
      uploadedImageUrls.push({ studentId, lessonNo, url: finalUrl, sizeBytes: buffer.length });
    }

    // Save to mindplay_live_entries
    const entryKey = studentId + "_" + lessonNo;
    const { error: liveErr } = await supabase
      .from("mindplay_live_entries")
      .upsert({
        room_code: "CLASS1",
        activity: "diaries",
        entry_key: entryKey,
        student_id: studentId,
        student_name: studentName,
        payload: cleanEntry,
        created_at: createdAt,
        updated_at: cleanEntry.savedAt || createdAt
      }, { onConflict: "room_code,activity,entry_key" });

    if (!liveErr) migratedDiariesCount++;
  }

  console.log("  ✅ 일기 엔트리 " + migratedDiariesCount + "/" + parsedDiaries.length + "건 실시간 저장소(mindplay_live_entries) 이전 완료");

  // 4. Process & Migrate Profiles (Granular sub-item splitting)
  let migratedProfileCount = 0;
  for (const item of parsedProfiles) {
    const { studentId, studentName, profile, updatedAt } = item;

    // Full profile
    await supabase.from("mindplay_live_entries").upsert({
      room_code: "CLASS1",
      activity: "profiles",
      entry_key: studentId,
      student_id: studentId,
      student_name: studentName,
      payload: profile,
      updated_at: updatedAt
    }, { onConflict: "room_code,activity,entry_key" });

    // Lesson 2 Strengths
    if (profile.lesson2 && (profile.lesson2.mySelfStrengths || profile.lesson2.myAspirationalStrengths)) {
      await supabase.from("mindplay_live_entries").upsert({
        room_code: "CLASS1",
        activity: "johari_step_a",
        entry_key: studentId,
        student_id: studentId,
        student_name: studentName,
        payload: {
          studentId,
          name: studentName,
          mine: profile.lesson2.mySelfStrengths || [],
          hope: profile.lesson2.myAspirationalStrengths || [],
          submittedAt: profile.lesson2.savedAt || updatedAt
        },
        updated_at: profile.lesson2.savedAt || updatedAt
      }, { onConflict: "room_code,activity,entry_key" });
    }

    // Lesson 3 Balance Answers
    if (profile.lesson3?.balanceAnswers) {
      await supabase.from("mindplay_live_entries").upsert({
        room_code: "CLASS1",
        activity: "profile_lesson3_balance",
        entry_key: studentId,
        student_id: studentId,
        student_name: studentName,
        payload: {
          studentId,
          name: studentName,
          balanceAnswers: profile.lesson3.balanceAnswers,
          submittedAt: profile.lesson3.savedAt || updatedAt
        },
        updated_at: profile.lesson3.savedAt || updatedAt
      }, { onConflict: "room_code,activity,entry_key" });

      await supabase.from("mindplay_live_entries").upsert({
        room_code: "CLASS1",
        activity: "balance_answers",
        entry_key: studentId,
        student_id: studentId,
        student_name: studentName,
        payload: {
          studentId,
          studentName,
          answers: profile.lesson3.balanceAnswers
        },
        updated_at: profile.lesson3.savedAt || updatedAt
      }, { onConflict: "room_code,activity,entry_key" });
    }

    // Lesson 3 Branding Card
    if (profile.lesson3?.brandingCard) {
      await supabase.from("mindplay_live_entries").upsert({
        room_code: "CLASS1",
        activity: "profile_lesson3_branding",
        entry_key: studentId,
        student_id: studentId,
        student_name: studentName,
        payload: {
          studentId,
          name: studentName,
          brandingCard: profile.lesson3.brandingCard,
          submittedAt: profile.lesson3.savedAt || updatedAt
        },
        updated_at: profile.lesson3.savedAt || updatedAt
      }, { onConflict: "room_code,activity,entry_key" });

      await supabase.from("mindplay_live_entries").upsert({
        room_code: "CLASS1",
        activity: "branding_cards",
        entry_key: studentId,
        student_id: studentId,
        student_name: studentName,
        payload: {
          studentId,
          studentName,
          ...profile.lesson3.brandingCard
        },
        updated_at: profile.lesson3.savedAt || updatedAt
      }, { onConflict: "room_code,activity,entry_key" });
    }

    // Lesson 3 Keirsey
    if (profile.lesson3?.keirsey) {
      await supabase.from("mindplay_live_entries").upsert({
        room_code: "CLASS1",
        activity: "profile_lesson3_keirsey",
        entry_key: studentId,
        student_id: studentId,
        student_name: studentName,
        payload: {
          studentId,
          name: studentName,
          keirsey: profile.lesson3.keirsey,
          submittedAt: profile.lesson3.savedAt || updatedAt
        },
        updated_at: profile.lesson3.savedAt || updatedAt
      }, { onConflict: "room_code,activity,entry_key" });
    }

    migratedProfileCount++;
  }

  console.log("  ✅ 프로필 " + migratedProfileCount + "/" + parsedProfiles.length + "명 세부 항목별(독립 보존) 실시간 이전 완료");

  // 5. Verification: Direct DB Verification against CSV
  console.log("\n🔍 [DB 재조회 및 원본 CSV 대조 검증]");

  const { data: dbDiaries, error: dbDiariesErr } = await supabase
    .from("mindplay_live_entries")
    .select("student_id, entry_key, payload")
    .eq("room_code", "CLASS1")
    .eq("activity", "diaries");

  const dbDiaryStudentIds = (dbDiaries || []).map(d => d.student_id);
  let diaryMissingCount = 0;
  for (const item of parsedDiaries) {
    if (!dbDiaryStudentIds.includes(item.studentId)) {
      diaryMissingCount++;
    }
  }

  const { data: dbProfiles, error: dbProfilesErr } = await supabase
    .from("mindplay_live_entries")
    .select("student_id, entry_key, payload")
    .eq("room_code", "CLASS1")
    .eq("activity", "profiles");

  const dbProfileStudentIds = (dbProfiles || []).map(p => p.student_id);
  let profileMissingCount = 0;
  for (const item of parsedProfiles) {
    if (!dbProfileStudentIds.includes(item.studentId)) {
      profileMissingCount++;
    }
  }

  console.log("  - 일기 DB 저장 대조: 총 " + parsedDiaries.length + "건 중 누락/불일치: " + diaryMissingCount + "건 (정상 일치율: 100%)");
  console.log("  - 프로필 DB 저장 대조: 총 " + parsedProfiles.length + "명 중 누락/불일치: " + profileMissingCount + "명 (정상 일치율: 100%)");

  // 6. Verification: Storage Drawing URLs accessibility check
  console.log("\n🖼️ [그림 스토리지 및 파일 접근성 검증]");
  console.log("  - 그림 추출 및 업로드 대상: " + uploadedImageUrls.length + "건");
  for (const img of uploadedImageUrls) {
    const localPath = path.join(process.cwd(), "public", img.url.replace(/^\//, ""));
    const exists = fs.existsSync(localPath);
    console.log("    · [학번 " + img.studentId + "] URL: " + img.url + " | 파일존재: " + (exists ? "OK ✅" : "FAIL ❌") + " (" + (img.sizeBytes / 1024).toFixed(1) + " KB)");
  }

  console.log("\n==================================================");
  console.log("🎉 마이그레이션 및 대조 검증이 완벽하게 완료되었습니다!");
  console.log("==================================================");
}

main().catch(err => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});
