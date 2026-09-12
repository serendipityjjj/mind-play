import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually without external dotenv dependency
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
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const clientA = createClient(supabaseUrl, supabaseAnonKey);
const clientB = createClient(supabaseUrl, supabaseAnonKey);

const ROOM = "TEST";
const testTimestamp = Date.now();

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ----------------------------------------------------
// Helper matching lib/live.ts logic
// ----------------------------------------------------
async function saveLiveEntry(client, roomCode, activity, entryKey, studentId, studentName, payload) {
  const { data, error } = await client
    .from("mindplay_live_entries")
    .upsert(
      {
        room_code: roomCode,
        activity,
        entry_key: entryKey,
        student_id: studentId,
        student_name: studentName,
        payload,
      },
      { onConflict: "room_code,activity,entry_key" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function loadLiveEntries(client, roomCode, activity) {
  const { data, error } = await client
    .from("mindplay_live_entries")
    .select("*")
    .eq("room_code", roomCode)
    .eq("activity", activity)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

async function setTeacherState(client, roomCode, activity, state) {
  const existing = await client
    .from("mindplay_live_entries")
    .select("payload")
    .eq("room_code", roomCode)
    .eq("activity", activity)
    .eq("entry_key", "__teacher__")
    .maybeSingle();

  const prevPayload = existing.data?.payload || {};
  const mergedPayload = { ...prevPayload, ...state };

  return saveLiveEntry(client, roomCode, activity, "__teacher__", "__teacher__", "Teacher", mergedPayload);
}

async function getTeacherState(client, roomCode, activity) {
  const { data } = await client
    .from("mindplay_live_entries")
    .select("payload")
    .eq("room_code", roomCode)
    .eq("activity", activity)
    .eq("entry_key", "__teacher__")
    .maybeSingle();

  return data?.payload || null;
}

// ----------------------------------------------------
// Run the 8 Tests (Radio 4 + Johari 4)
// ----------------------------------------------------
async function runTests() {
  console.log("==================================================");
  console.log("🚀 Running MindPlay Live Synchronization Tests");
  console.log("📡 Supabase: " + supabaseUrl);
  console.log("🏫 Room: " + ROOM + " | Session TS: " + testTimestamp);
  console.log("==================================================\n");

  const results = {
    test1: false,
    test2: false,
    test3: false,
    test4: false,
    test5: false,
    test6: false,
    test7: false,
    test8: false,
  };

  // ----------------------------------------------------
  // Test 1: Realtime broadcast (A saves -> B receives in <3s)
  // ----------------------------------------------------
  console.log("▶ [Test 1] (Radio) Realtime Broadcast Latency Check (< 3s)...");
  try {
    let receivedPayload = null;
    const channel = clientB
      .channel("test-realtime-radio-" + testTimestamp)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "mindplay_live_entries",
          filter: "room_code=eq." + ROOM,
        },
        (payload) => {
          if (payload.new && payload.new.entry_key === "test1_" + testTimestamp) {
            receivedPayload = payload.new;
          }
        }
      )
      .subscribe();

    await delay(1000);

    const startTime = Date.now();
    await saveLiveEntry(
      clientA,
      ROOM,
      "radio_stories",
      "test1_" + testTimestamp,
      "10101",
      "학생A",
      { text: "실시간 전송 테스트 사연", category: "학업/진로" }
    );

    for (let i = 0; i < 30; i++) {
      if (receivedPayload) break;
      await delay(100);
    }
    const elapsed = Date.now() - startTime;
    clientB.removeChannel(channel);

    if (receivedPayload && elapsed < 3000) {
      console.log("  ✅ [PASS] Client B received story in " + elapsed + "ms via Realtime");
      results.test1 = true;
    } else {
      console.log("  ❌ [FAIL] Realtime event not received in < 3s");
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 1 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 2: 30 students concurrent save
  // ----------------------------------------------------
  console.log("\n▶ [Test 2] (Radio) 30 Concurrent Student Saves (Zero Data Loss)...");
  const act2 = "radio_stories_concurrency_" + testTimestamp;
  try {
    const promises = [];
    for (let i = 1; i <= 30; i++) {
      const studentId = "101" + String(i).padStart(2, "0");
      const name = "학생" + i;
      promises.push(
        saveLiveEntry(
          clientA,
          ROOM,
          act2,
          studentId,
          studentId,
          name,
          { text: name + "의 동시저장 고민 사연 내용입니다.", category: "친구/대인관계" }
        )
      );
    }

    await Promise.all(promises);
    const savedEntries = await loadLiveEntries(clientA, ROOM, act2);
    if (savedEntries.length === 30) {
      console.log("  ✅ [PASS] All 30 concurrent entries successfully saved without data loss (Count: 30/30)");
      results.test2 = true;
    } else {
      console.log("  ❌ [FAIL] Expected 30 entries, but found " + savedEntries.length);
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 2 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 3: Virtual Reset (reset_at in Teacher State, no DELETE)
  // ----------------------------------------------------
  console.log("\n▶ [Test 3] (Radio) Teacher Virtual Reset (Preserve DB rows, filter in memory)...");
  const act3 = "radio_stories_reset_" + testTimestamp;
  try {
    await saveLiveEntry(clientA, ROOM, act3, "st1", "10101", "학생1", { text: "사연 1" });
    await saveLiveEntry(clientA, ROOM, act3, "st2", "10102", "학생2", { text: "사연 2" });
    await saveLiveEntry(clientA, ROOM, act3, "st3", "10103", "학생3", { text: "사연 3" });

    await delay(1000);
    const teacherRow = await setTeacherState(clientA, ROOM, act3, { reset_at: new Date().toISOString() });
    const resetTime = teacherRow.created_at || teacherRow.updated_at || new Date().toISOString();
    await setTeacherState(clientA, ROOM, act3, { reset_at: resetTime });

    const rawRows = await loadLiveEntries(clientA, ROOM, act3);
    const teacherState = await getTeacherState(clientA, ROOM, act3);

    const visibleStories = rawRows.filter((row) => {
      if (row.entry_key.startsWith("__")) return false;
      if (teacherState?.reset_at && new Date(row.created_at).getTime() <= new Date(teacherState.reset_at).getTime()) {
        return false;
      }
      return true;
    });

    if (rawRows.length === 4 && visibleStories.length === 0 && teacherState?.reset_at) {
      console.log("  ✅ [PASS] Virtual reset confirmed: 0 visible stories displayed, all 4 DB rows preserved intact without DELETE query.");
      results.test3 = true;
    } else {
      console.log("  ❌ [FAIL] Raw DB count: " + rawRows.length + " (expected 4), Visible count: " + visibleStories.length + " (expected 0)");
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 3 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 4: Heart Deduplication
  // ----------------------------------------------------
  console.log("\n▶ [Test 4] (Radio) Heart/Reaction Deduplication (1 heart per student)...");
  const act4 = "radio_hearts_" + testTimestamp;
  const targetStoryKey = "story_999";
  const studentWhoLikes = "10105";
  const entryKey = targetStoryKey + "_" + studentWhoLikes;

  try {
    await saveLiveEntry(clientA, ROOM, act4, entryKey, studentWhoLikes, "학생5", { liked: true });
    await saveLiveEntry(clientA, ROOM, act4, entryKey, studentWhoLikes, "학생5", { liked: true });

    const heartRows = await loadLiveEntries(clientA, ROOM, act4);
    const specificLikes = heartRows.filter((r) => r.entry_key === entryKey);

    if (specificLikes.length === 1 && heartRows.length === 1) {
      console.log("  ✅ [PASS] Duplicate like prevented by unique key (" + entryKey + "). Count is exactly 1.");
      results.test4 = true;
    } else {
      console.log("  ❌ [FAIL] Found " + specificLikes.length + " heart records for key " + entryKey);
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 4 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 5: Step A - 30 Students Concurrent Save (My Strengths 5 + Hope 2)
  // ----------------------------------------------------
  console.log("\n▶ [Test 5] (Johari Step A) 30 Students Concurrent Strengths Save (Zero Loss)...");
  const act5 = "johari_step_a_" + testTimestamp;
  try {
    const promises = [];
    for (let i = 1; i <= 30; i++) {
      const studentId = "101" + String(i).padStart(2, "0");
      const name = "학생" + i;
      promises.push(
        saveLiveEntry(
          clientA,
          ROOM,
          act5,
          studentId,
          studentId,
          name,
          {
            mine: ["창의성", "호기심", "판단력", "학습열의", "통찰력"],
            hope: ["용기", "끈기"],
            submittedAt: new Date().toISOString()
          }
        )
      );
    }

    await Promise.all(promises);
    const savedStepA = await loadLiveEntries(clientA, ROOM, act5);

    if (savedStepA.length === 30) {
      console.log("  ✅ [PASS] All 30 students' Step A strengths saved simultaneously (Count: " + savedStepA.length + "/30)");
      results.test5 = true;
    } else {
      console.log("  ❌ [FAIL] Expected 30 Step A entries, found " + savedStepA.length);
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 5 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 6: Teacher Dispatches 1:1 Pairs -> Student B receives in < 3s
  // ----------------------------------------------------
  console.log("\n▶ [Test 6] (Johari Partner Dispatch) Teacher assigns pairs -> Student receives in < 3s...");
  const act6 = "johari_control_" + testTimestamp;
  try {
    let receivedControl = null;
    const channel = clientB
      .channel("test-johari-control-" + testTimestamp)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "mindplay_live_entries",
          filter: "room_code=eq." + ROOM,
        },
        (payload) => {
          if (payload.new && payload.new.activity === act6 && payload.new.entry_key === "__teacher__") {
            receivedControl = payload.new.payload;
          }
        }
      )
      .subscribe();

    await delay(1000);

    const startTime = Date.now();
    const pairs = { "10101": "10102", "10102": "10101" };
    await setTeacherState(clientA, ROOM, act6, {
      isPartnerAssigned: true,
      pairs,
      dispatchedAt: new Date().toISOString()
    });

    for (let i = 0; i < 30; i++) {
      if (receivedControl && receivedControl.isPartnerAssigned) break;
      await delay(100);
    }
    const elapsed = Date.now() - startTime;
    clientB.removeChannel(channel);

    if (receivedControl && receivedControl.isPartnerAssigned && receivedControl.pairs["10102"] === "10101" && elapsed < 3000) {
      console.log("  ✅ [PASS] Student B received assigned partner (10101) in " + elapsed + "ms via Realtime");
      results.test6 = true;
    } else {
      console.log("  ❌ [FAIL] Partner assignment not received in < 3s or pair mismatch");
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 6 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 7: Step B - Peer Gift Strengths Cross-Delivery in < 3s
  // ----------------------------------------------------
  console.log("\n▶ [Test 7] (Johari Step B) Student A gifts 5 strengths to Student B -> Delivered in < 3s...");
  const act7 = "johari_step_b_" + testTimestamp;
  const observerId = "10101";
  const targetId = "10102";
  const entryKey7 = observerId + "_" + targetId;

  try {
    let receivedGift = null;
    let isSubscribed = false;
    const channel = clientB
      .channel("test-johari-gift-" + testTimestamp)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "mindplay_live_entries",
          filter: "room_code=eq." + ROOM,
        },
        (payload) => {
          if (payload.new && payload.new.activity === act7 && payload.new.payload?.targetId === targetId) {
            receivedGift = payload.new.payload;
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") isSubscribed = true;
      });

    for (let i = 0; i < 20 && !isSubscribed; i++) {
      await delay(100);
    }
    await delay(300);

    const startTime = Date.now();
    const giftPicks = ["친절/이타성", "끈기", "유머", "감사", "진실성"];
    await saveLiveEntry(
      clientA,
      ROOM,
      act7,
      entryKey7,
      observerId,
      "학생1",
      {
        observerId,
        observerName: "학생1",
        targetId,
        targetName: "학생2",
        picks: giftPicks,
        submittedAt: new Date().toISOString()
      }
    );

    for (let i = 0; i < 40; i++) {
      if (receivedGift) break;
      await delay(100);
    }
    const elapsed = Date.now() - startTime;
    clientB.removeChannel(channel);

    if (receivedGift && receivedGift.targetId === targetId && receivedGift.picks.length === 5 && elapsed < 3000) {
      console.log("  ✅ [PASS] Student B received 5 gift strengths from Student A in " + elapsed + "ms via Realtime");
      results.test7 = true;
    } else {
      console.log("  ❌ [FAIL] Step B gift cross-delivery failed or exceeded 3s");
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 7 Error:", err.message);
  }

  // ----------------------------------------------------
  // Test 8: Teacher Unlocks Step C/D -> Student Client receives in < 3s
  // ----------------------------------------------------
  console.log("\n▶ [Test 8] (Johari Step C/D Unlock) Teacher unlocks results -> Student receives in < 3s...");
  const act8 = "johari_control_unlock_" + testTimestamp;
  try {
    let receivedUnlock = null;
    const channel = clientB
      .channel("test-johari-unlock-" + testTimestamp)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "mindplay_live_entries",
          filter: "room_code=eq." + ROOM,
        },
        (payload) => {
          if (payload.new && payload.new.activity === act8 && payload.new.entry_key === "__teacher__") {
            receivedUnlock = payload.new.payload;
          }
        }
      )
      .subscribe();

    await delay(1000);

    const startTime = Date.now();
    await setTeacherState(clientA, ROOM, act8, {
      isUnlocked: true,
      unlockedAt: new Date().toISOString()
    });

    for (let i = 0; i < 30; i++) {
      if (receivedUnlock && receivedUnlock.isUnlocked) break;
      await delay(100);
    }
    const elapsed = Date.now() - startTime;
    clientB.removeChannel(channel);

    if (receivedUnlock && receivedUnlock.isUnlocked === true && elapsed < 3000) {
      console.log("  ✅ [PASS] Student client received Step C/D unlock signal in " + elapsed + "ms via Realtime");
      results.test8 = true;
    } else {
      console.log("  ❌ [FAIL] Step C/D unlock signal not received in < 3s");
    }
  } catch (err) {
    console.error("  ❌ [FAIL] Test 8 Error:", err.message);
  }

  // ----------------------------------------------------
  // Summary
  // ----------------------------------------------------
  console.log("\n==================================================");
  console.log("📊 ALL TEST SUITE SUMMARY (8 TESTS)");
  console.log("--------------------------------------------------");
  console.log("1. (Radio) Realtime Latency < 3s:            " + (results.test1 ? "PASS ✅" : "FAIL ❌"));
  console.log("2. (Radio) 30 Concurrent Saves:               " + (results.test2 ? "PASS ✅" : "FAIL ❌"));
  console.log("3. (Radio) Virtual Reset without Delete:      " + (results.test3 ? "PASS ✅" : "FAIL ❌"));
  console.log("4. (Radio) Heart Deduplication (1 per st):    " + (results.test4 ? "PASS ✅" : "FAIL ❌"));
  console.log("5. (Johari) Step A 30 Concurrent Saves:       " + (results.test5 ? "PASS ✅" : "FAIL ❌"));
  console.log("6. (Johari) Teacher Dispatch Realtime < 3s:   " + (results.test6 ? "PASS ✅" : "FAIL ❌"));
  console.log("7. (Johari) Step B Cross-Delivery < 3s:       " + (results.test7 ? "PASS ✅" : "FAIL ❌"));
  console.log("8. (Johari) Step C/D Unlock Realtime < 3s:    " + (results.test8 ? "PASS ✅" : "FAIL ❌"));
  console.log("==================================================");

  const allPassed = Object.values(results).every(Boolean);
  if (allPassed) {
    console.log("🎉 ALL 8 TESTS PASSED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.error("❌ Some tests failed.");
    process.exit(1);
  }
}

runTests();
