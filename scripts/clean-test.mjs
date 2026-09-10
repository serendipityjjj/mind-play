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

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanTestRoom() {
  console.log("🧹 Cleaning ONLY room_code='TEST' in public.mindplay_live_entries...");
  const { data, error } = await supabase
    .from("mindplay_live_entries")
    .delete()
    .eq("room_code", "TEST");

  if (error) {
    console.log("⚠️ Delete query response:", error.message);
    const nowIso = new Date().toISOString();
    await supabase.from("mindplay_live_entries").upsert({
      room_code: "TEST",
      activity: "radio_stories",
      entry_key: "__teacher__",
      student_id: "__teacher__",
      student_name: "Teacher",
      payload: { reset_at: nowIso, phase: "writing", assignMap: {} }
    }, { onConflict: "room_code,activity,entry_key" });

    await supabase.from("mindplay_live_entries").upsert({
      room_code: "TEST",
      activity: "johari_control",
      entry_key: "__teacher__",
      student_id: "__teacher__",
      student_name: "Teacher",
      payload: { reset_at: nowIso, isPartnerAssigned: false, isUnlocked: false, pairs: {} }
    }, { onConflict: "room_code,activity,entry_key" });
    console.log("✅ Applied virtual reset for room TEST.");
  } else {
    console.log("✅ Successfully cleaned all TEST room rows from DB.");
  }
}

cleanTestRoom();
