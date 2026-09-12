import { NextRequest, NextResponse } from "next/server";
import { NovelData, DiaryEntry } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nickname, genre, mood, diaries = [] } = body;

    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Filter and prepare context summary
    const diarySummaries = (diaries as DiaryEntry[]).map((d) => ({
      lessonNo: d.lessonNo,
      title: d.lessonTitle,
      date: d.createdAt,
      emotion: d.emotionId,
      hashtags: d.hashtags.join(", "),
      diaryText: d.diaryText,
      activity: d.interactiveData,
    }));

    const systemPrompt = `
당신은 청소년 심리·성장 문학 전문 소설가입니다.
대구광역시교육청 마음학기제 「마음플레이_감정일기」 15차시를 이수한 중학생 '${nickname}'의 실제 감정일기 데이터를 바탕으로 서정적이고 감동적인 단편 성장 소설집을 집필합니다.

집필 가이드라인:
1. 장르: ${genre || "서정적 청소년 성장소설"}
2. 분위기/어조: ${mood || "따뜻하고 희망찬 어조"}
3. 학생의 개인 신상정보(학교명, 실명 등)는 자연스럽게 문학적으로 각색 및 익명화합니다.
4. 학생의 실제 일기 속 솔직한 문장과 8대 감정 구름의 변화 과정을 각 챕터에 녹여냅니다.
5. 반드시 아래 JSON 형식으로만 응답해야 합니다 (마크다운 코드블록이나 다른 말 없이 순수 JSON만 출력):

{
  "title": "소설 제목",
  "subtitle": "부제목",
  "author": "${nickname}",
  "genre": "${genre}",
  "mood": "${mood}",
  "summary": "프롤로그 및 전체 줄거리 요약 (3~4문장)",
  "chapters": [
    {
      "chapterNo": 1,
      "lessonNo": 1,
      "title": "제1장 소제목",
      "content": "해당 차시 일기와 감정을 각색한 서정적인 소설 본문 (3~5문단)",
      "emotionEmoji": "🌸",
      "quote": "핵심 해시태그 또는 한 줄 문장"
    }
  ],
  "epilogue": "15차시 완주 후 성장한 주인공의 모습을 그린 감동적인 에필로그"
}
`;

    let generatedJsonText = "";

    // 1. Try Upstage Solar API if key is available
    if (upstageKey) {
      const upstageRes = await fetch("https://api.upstage.ai/v1/solar/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${upstageKey}`,
        },
        body: JSON.stringify({
          model: "solar-1-mini-chat",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `학생의 15차시 누적 데이터:\n${JSON.stringify(diarySummaries, null, 2)}\n\n위 데이터를 바탕으로 단편 성장 소설을 집필해 주세요.`,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (upstageRes.ok) {
        const upstageData = await upstageRes.json();
        generatedJsonText = upstageData.choices?.[0]?.message?.content || "";
      }
    }

    // 2. Try Gemini API fallback if Upstage not present or failed
    if (!generatedJsonText && geminiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const geminiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n학생의 15차시 누적 데이터:\n${JSON.stringify(diarySummaries, null, 2)}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
          },
        }),
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        generatedJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    }

    let parsedNovel: Partial<NovelData> = {};

    if (generatedJsonText) {
      try {
        const cleaned = generatedJsonText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedNovel = JSON.parse(cleaned);
      } catch (e) {
        console.error("Failed to parse novel JSON, generating formatted fallback", e);
      }
    }

    // Comprehensive structured novel response
    const finalNovel: NovelData = {
      id: `novel-${Date.now()}`,
      title: parsedNovel.title || `${nickname}의 열다섯 번의 계절`,
      subtitle: parsedNovel.subtitle || `마음학기제 15차시 감정일기로 엮은 단편 성장 소설집`,
      author: nickname,
      genre: genre || "서정적 청소년 성장소설",
      mood: mood || "따뜻하고 희망찬 어조",
      createdAt: new Date().toISOString().split("T")[0],
      summary:
        parsedNovel.summary ||
        `첫 시간의 낯설고 조마조마했던 마음에서 시작하여, 자신의 숨은 강점 보석을 발견하고 감정의 파도를 타기까지. ${nickname}이 매주 목요일 써 내려간 15편의 감정일기가 한 편의 찬란한 성장 소설로 피어납니다.`,
      chapters:
        parsedNovel.chapters && parsedNovel.chapters.length > 0
          ? parsedNovel.chapters
          : diarySummaries.map((d, idx) => ({
              chapterNo: idx + 1,
              lessonNo: d.lessonNo,
              title: `제${idx + 1}장. ${d.title}`,
              content: `목요일 오후의 햇살이 교실 창가를 비추던 날, ${nickname}은 조용히 마음의 서랍을 열었다.\n\n"${d.diaryText}"\n\n그날 마음속에 떠오른 ${d.emotion} 구름은 흔들리는 일상 속에서도 소중한 쉼표가 되어주었다. 서툴렀지만 도망치지 않고 마주했던 모든 순간들이 차곡차곡 쌓여 단단한 내일을 향한 나침반이 되었다.`,
              emotionEmoji: "🌸",
              quote: d.hashtags || `#${d.title}`,
            })),
      epilogue:
        parsedNovel.epilogue ||
        `15주의 여정을 마치고 뒤돌아본 길에는, 그때는 아프고 답답했던 감정들마저 아름다운 꽃으로 피어나 있었다. 이제 ${nickname}은 안다. 어떤 바람이 불어와도 내 안의 중심을 잡고 미소 지을 수 있다는 것을.`,
    };

    return NextResponse.json({ novel: finalNovel });
  } catch (error: any) {
    console.error("Novel API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
