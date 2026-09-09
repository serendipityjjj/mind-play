import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName = "학생",
      sessionNo = 1,
      cloudEmotion = "평온이",
      chatSummary = "",
      diaryText = "",
      imageDescriptionOrPrompt = "",
    } = body;

    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const systemPrompt = `You are a warm, thoughtful literary editor helping a Korean middle school student compile an omnibus reflective essay book titled '마음플레이: 내 마음의 15가지 조각'.

[Source Data for This Chapter]
- Student Name: ${studentName}
- Session Number: ${sessionNo}회차
- Emotion Cloud: ${cloudEmotion} (예: 행복이, 화남이, 평온이 등)
- Chatbot Dialogue Highlights: ${chatSummary} (챗봇과 나눈 사실/욕구 대화)
- Original Diary Text: ${diaryText} (학생이 직접 작성한 글 칸 내용)
- Drawing/Image Context: ${imageDescriptionOrPrompt}

[Writing Guidelines - Strict Rules]
1. Perspective & Tone:
   - 1인칭 나('나')의 시점으로 작성하며, 차분하고 솔직한 '일기 에세이체(~했다, ~했다는 생각이 든다, ~인 걸까)'를 사용하세요.
   - 절대 '어린이용 훈화 말씀'이나 '어른 흉내를 내는 거창한 문학적 비유'를 쓰지 마세요.
   - 학생이 원문에 적은 구체적인 사실(예: 단톡방 눈치, 급식실, 시험 성적, 친구와의 대화)을 왜곡하거나 부풀리지 말고 그대로 중심 소재로 삼으세요.
2. Structure (200~300자 내외의 담백한 1~2개 문단):
   - 문단 1 (그때의 상황과 진짜 감정): 겉으로 드러난 표정과 속마음의 차이, 그 순간 느꼈던 감정을 과장 없이 담담하게 서술.
   - 문단 2 (작은 알아차림): 거창한 다짐이 아니라, "그래도 나만 그런 건 아니구나", "다음엔 내 마음을 이렇게 표현해봐야겠다" 수준의 소박하고 솔직한 깨달음.
3. Chapter Title:
   - 이 회차의 핵심 감정과 사건을 아우르는 감성적인 소제목 1줄 생성 (예: "01화. 겉돌지 않으려 애썼던 첫 교실의 공기").

[Output Format (JSON)]
반드시 아래 JSON 형식으로만 응답해야 합니다 (마크다운 코드블록이나 불필요한 설명 없이 순수 JSON만 출력):
{
  "chapterNo": ${sessionNo},
  "chapterTitle": "소제목",
  "essayDraft": "변환된 진솔한 에세이 본문 (200~300자 1~2문단)"
}
`;

    let generatedJson = "";

    // 1. Try Gemini API
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: systemPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json",
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          generatedJson = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (err) {
        console.error("Gemini Essay API error:", err);
      }
    }

    // 2. Try Upstage API if Gemini failed or missing
    if (!generatedJson && upstageKey) {
      try {
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
              { role: "user", content: "위 가이드라인에 맞춰 순수 JSON으로 에세이를 작성해줘." },
            ],
            temperature: 0.7,
          }),
        });

        if (upstageRes.ok) {
          const data = await upstageRes.json();
          generatedJson = data.choices?.[0]?.message?.content || "";
        }
      } catch (err) {
        console.error("Upstage Essay API error:", err);
      }
    }

    let parsedResult: any = null;
    if (generatedJson) {
      try {
        const cleaned = generatedJson.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    }

    // Fallback response if no API keys or generation failed
    if (!parsedResult || !parsedResult.essayDraft) {
      const defaultSnippet = diaryText || (chatSummary ? chatSummary.slice(0, 100) : "오늘 하루를 돌아보며 내 마음의 소리에 가만히 귀 기울였다.");
      parsedResult = {
        chapterNo: sessionNo,
        chapterTitle: `${sessionNo < 10 ? '0' + sessionNo : sessionNo}화. ${cloudEmotion}과 마주한 나의 하루`,
        essayDraft: `${defaultSnippet}\n\n겉으로는 아무렇지 않은 척 지나쳤지만, 가만히 들여다보니 내 안에는 위로와 이해를 바라는 마음이 머물러 있었다. 거창하게 무언가를 바꾸려 애쓰기보다, 흔들리는 내 마음을 있는 그대로 인정해 주는 것부터 시작하고 싶다.`,
      };
    }

    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error("Essay Route Error:", error);
    return NextResponse.json(
      { error: error.message || "에세이 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
