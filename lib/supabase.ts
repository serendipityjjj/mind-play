import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://azhabcqyizoheaeozilr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aGFiY3F5aXpvaGVhZW96aWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjcyNjcsImV4cCI6MjEwNDQ0MzI2N30.wZxTkHq6XjUGLXcuMCEcWl50t6QY4jiv3HzzRyDDpgo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
