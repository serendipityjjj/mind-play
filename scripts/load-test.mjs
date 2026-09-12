import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const teacherClient = createClient(supabaseUrl, supabaseAnonKey);
const studentClients = Array.from({ length: 30 }, () => createClient(supabaseUrl, supabaseAnonKey));

const ROOM = "TEST";
const sessionTs = Date.now();

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runLoadTest() {
  console.log("==================================================");
  console.log("⚡ MINDPLAY 30 CONCURRENT STUDENTS LOAD TEST");
  console.log("📡 Supabase: " + supabaseUrl);
  console.log("🏫 Room: " + ROOM + " | Session TS: " + sessionTs);
  console.log("==================================================\n");

  const receivedStories = new Set();
  const receivedStrengths = new Set();

  // 1. Teacher listens via Realtime
  const channel = teacherClient
    .channel("load-test-teacher-" + sessionTs)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "mindplay_live_entries",
        filter: "room_code=eq." + ROOM,
      },
      (payload) => {
        if (payload.new) {
          if (payload.new.activity === "radio_stories_load_" + sessionTs) {
            receivedStories.add(payload.new.student_id);
          }
          if (payload.new.activity === "johari_step_a_load_" + sessionTs) {
            receivedStrengths.add(payload.new.student_id);
          }
        }
      }
    )
    .subscribe();

  await delay(1500);

  console.log("▶ Phase 1: 30 Students (99901~99930) Concurrent Save Test...");
  const p1Start = Date.now();
  const savePromises = [];

  for (let i = 1; i <= 30; i++) {
    const stId = "999" + String(i).padStart(2, "0");
    const stName = "테스트학생" + String(i).padStart(2, "0");
    const client = studentClients[i - 1];

    // Radio story save
    savePromises.push(
      client.from("mindplay_live_entries").upsert({
        room_code: ROOM,
        activity: "radio_stories_load_" + sessionTs,
        entry_key: stId,
        student_id: stId,
        student_name: stName,
        payload: { text: stName + "의 고민 사연입니다.", category: "성적/학업" }
      }, { onConflict: "room_code,activity,entry_key" })
    );

    // Johari Step A save
    savePromises.push(
      client.from("mindplay_live_entries").upsert({
        room_code: ROOM,
        activity: "johari_step_a_load_" + sessionTs,
        entry_key: stId,
        student_id: stId,
        student_name: stName,
        payload: {
          mine: ["창의성", "호기심", "판단력", "학습열의", "통찰력"],
          hope: ["용기", "끈기"]
        }
      }, { onConflict: "room_code,activity,entry_key" })
    );
  }

  const results = await Promise.all(savePromises);
  const p1Elapsed = Date.now() - p1Start;
  const errors = results.filter(r => r.error);

  console.log("  ⏱️ 60 total upsert operations finished in " + p1Elapsed + "ms (Errors: " + errors.length + ")");

  // 2. Wait up to 5s for teacher to receive all realtime events
  for (let t = 0; t < 50; t++) {
    if (receivedStories.size === 30 && receivedStrengths.size === 30) break;
    await delay(100);
  }

  // 3. Direct DB count verification
  const { data: dbStories } = await teacherClient
    .from("mindplay_live_entries")
    .select("student_id")
    .eq("room_code", ROOM)
    .eq("activity", "radio_stories_load_" + sessionTs);

  const { data: dbStrengths } = await teacherClient
    .from("mindplay_live_entries")
    .select("student_id")
    .eq("room_code", ROOM)
    .eq("activity", "johari_step_a_load_" + sessionTs);

  console.log("  📊 DB Row Count Check:");
  console.log("    - Radio Stories in DB:   " + (dbStories?.length || 0) + "/30");
  console.log("    - Johari Strengths in DB: " + (dbStrengths?.length || 0) + "/30");
  console.log("  📡 Teacher Realtime Received Count:");
  console.log("    - Radio Stories received:   " + receivedStories.size + "/30");
  console.log("    - Johari Strengths received: " + receivedStrengths.size + "/30");

  console.log("\n▶ Phase 2: Sustained Load (10-second continuous updates by 30 students)...");
  const p2Start = Date.now();
  let continuousTotalSaves = 0;
  let continuousErrors = 0;

  while (Date.now() - p2Start < 10000) {
    const loopPromises = [];
    for (let i = 1; i <= 30; i++) {
      const stId = "999" + String(i).padStart(2, "0");
      const stName = "테스트학생" + String(i).padStart(2, "0");
      const client = studentClients[i - 1];
      loopPromises.push(
        client.from("mindplay_live_entries").upsert({
          room_code: ROOM,
          activity: "load_continuous_" + sessionTs,
          entry_key: stId,
          student_id: stId,
          student_name: stName,
          payload: { timestamp: Date.now(), counter: continuousTotalSaves }
        }, { onConflict: "room_code,activity,entry_key" })
      );
    }
    const loopRes = await Promise.all(loopPromises);
    continuousTotalSaves += 30;
    continuousErrors += loopRes.filter(r => r.error).length;
    await delay(500); // 30 requests every 500ms for 10s
  }

  const { data: dbContinuous } = await teacherClient
    .from("mindplay_live_entries")
    .select("student_id")
    .eq("room_code", ROOM)
    .eq("activity", "load_continuous_" + sessionTs);

  console.log("  ⏱️ 10s Sustained Load finished!");
  console.log("    - Total save calls: " + continuousTotalSaves);
  console.log("    - Errors: " + continuousErrors);
  console.log("    - Final 30 unique student rows preserved in DB: " + (dbContinuous?.length || 0) + "/30");

  teacherClient.removeChannel(channel);

  const isSuccess = (dbStories?.length === 30) && (dbStrengths?.length === 30) && (dbContinuous?.length === 30) && (continuousErrors === 0);

  console.log("\n==================================================");
  if (isSuccess) {
    console.log("🎉 LOAD TEST PASSED: Zero data loss under 30 concurrent students!");
    process.exit(0);
  } else {
    console.error("❌ LOAD TEST FAILED: Data loss or errors detected.");
    process.exit(1);
  }
}

runLoadTest();
