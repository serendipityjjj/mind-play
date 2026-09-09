import { NextRequest, NextResponse } from "next/server";
import { DiaryEntry } from "@/lib/storage";

// In-memory store fallback for demo sessions (can be synced with Google Sheets or Supabase)
let mockDiaryDatabase: DiaryEntry[] = [];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lessonNo = searchParams.get("lessonNo");

  if (lessonNo) {
    const entry = mockDiaryDatabase.find((d) => d.lessonNo === Number(lessonNo));
    return NextResponse.json({ success: true, entry: entry || null });
  }

  return NextResponse.json({ success: true, entries: mockDiaryDatabase });
}

export async function POST(req: NextRequest) {
  try {
    const entry: DiaryEntry = await req.json();

    if (!entry.lessonNo || !entry.nickname) {
      return NextResponse.json(
        { success: false, error: "lessonNo and nickname are required" },
        { status: 400 }
      );
    }

    // Google Sheets Apps Script Webhook Sync if env exists
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetWebhookUrl) {
      try {
        await fetch(googleSheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "appendOrUpdateDiary",
            data: {
              lessonNo: entry.lessonNo,
              lessonTitle: entry.lessonTitle,
              nickname: entry.nickname,
              createdAt: entry.createdAt,
              emotion: entry.emotionId,
              hashtags: entry.hashtags.join(", "),
              diaryText: entry.diaryText,
              evalQ1: entry.evalStars.q1,
              evalQ2: entry.evalStars.q2,
              interactiveData: JSON.stringify(entry.interactiveData || {}),
            },
          }),
        });
      } catch (sheetErr) {
        console.warn("Failed to sync to Google Sheet webhook:", sheetErr);
      }
    }

    // Update in-memory DB
    const index = mockDiaryDatabase.findIndex((d) => d.lessonNo === entry.lessonNo);
    if (index >= 0) {
      mockDiaryDatabase[index] = entry;
    } else {
      mockDiaryDatabase.push(entry);
    }

    return NextResponse.json({ success: true, savedEntry: entry });
  } catch (error: any) {
    console.error("Diary save error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
