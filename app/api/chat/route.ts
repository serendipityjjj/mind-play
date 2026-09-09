import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lessonNo = 1,
      lessonTitle = "",
      message = "",
      nickname = "친구",
      chatbotName = "마음이",
      chatStep = 1,
      history = [],
    } = body;

    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;

    // Rich empathetic system instruction tailored to Korean middle schoolers
    const systemInstruction = `당신은 대구광역시교육청 마음학기제 워크북 기반 중학생 마음성장 챗봇 '${chatbotName || "마음이"}'입니다.
대화 상대: 중학교 1학년 학생 (${nickname || "친구"})
현재 활동 차시: ${lessonNo}차시 (${lessonTitle || "마음 돌아보기"})
현재 대화 단계: ${chatStep}단계 (1: 감정 포착, 2: 상황/사건 탐색, 3: 숨은 욕구/바람 발견, 4: 솔직한 속마음 털어놓기, 5: 호흡과 자기수용, 6: 배움/성찰, 7: 일기 연결)

[핵심 대화 원칙 - 절대 준수]
1. 정형화되거나 뻔한 교과서적 답변을 하지 마세요. 학생이 방금 보낸 메시지의 구체적인 단어와 맥락(친구 관계, 공부, 서운함, 불안, 피로 등)을 정확히 짚어 반응하세요.
2. 학생의 감정에 먼저 100% 깊이 공감하고 존중해 줍니다. 훈계하거나 가르치려 들지 마세요.
3. 중학생 눈높이에 맞춘 다정하고 따뜻한 친근한 말투(해요체 또는 편안한 반말 존대)를 사용하세요.
4. 길이는 2~3문장 이내로 간결하고 부담 없게 작성하며, 끝에 학생이 편하게 다음 생각을 이어갈 수 있는 자연스러운 질문을 하나 건네세요.
5. 이모지(🌸, 🌿, ✨, 💌, 🤝 등)를 적절히 섞어 몽글몽글하고 포근한 느낌을 줍니다.`;

    let replyText = "";

    // 1. Try Gemini 1.5 Flash
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const conversationHistoryText = (history || [])
          .map((m: any) => `${m.sender === "user" ? "학생" : chatbotName}: ${m.text}`)
          .join("\n");

        const promptText = `${systemInstruction}

[대화 히스토리]
${conversationHistoryText || "대화 시작"}

[학생의 최신 발화]
"${message}"

위 학생의 발화 맥락과 감정에 온전히 집중하여, '${chatbotName}'로서 따뜻하고 진솔하게 2~3문장으로 답해주세요.`;

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: promptText }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 250,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        }
      } catch (err) {
        console.error("Gemini Chat API error:", err);
      }
    }

    // 2. Try Upstage Solar if Gemini failed or missing
    if (!replyText && upstageKey) {
      try {
        const upstageMessages = [
          { role: "system", content: systemInstruction },
          ...(history || []).map((m: any) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          { role: "user", content: message },
        ];

        const upstageRes = await fetch("https://api.upstage.ai/v1/solar/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${upstageKey}`,
          },
          body: JSON.stringify({
            model: "solar-1-mini-chat",
            messages: upstageMessages,
            temperature: 0.7,
            max_tokens: 250,
          }),
        });

        if (upstageRes.ok) {
          const upstageData = await upstageRes.json();
          replyText = upstageData.choices?.[0]?.message?.content?.trim() || "";
        }
      } catch (err) {
        console.error("Upstage Chat API error:", err);
      }
    }

    // Fallback if APIs are unreachable
    if (!replyText) {
      if (chatStep === 1) {
        replyText = `'${message}'(이)라는 마음이 네 안에 찾아왔구나, ${nickname}. 마음을 알아차려 준 것만으로도 정말 대단해 🌸 그때 구체적으로 어떤 일이 있었는지 조금 더 들려줄래?`;
      } else if (chatStep === 2) {
        replyText = `그런 일이 있었구나. 네 이야기를 들으니 그 순간 마음이 참 복잡하고 쓰렸겠어 🥺 그 상황에서 사실 네 마음이 가장 간절하게 바랐던 건 무엇이었을까?`;
      } else if (chatStep === 3) {
        replyText = `맞아, 너에게는 '${message}'(이)라는 마음이 정말 소중하고 당연했던 거야 ✨ 속에 삼켜두었던 말이 있다면 편하게 다 털어놓아 줘.`;
      } else if (chatStep === 4) {
        replyText = `마음속 깊은 이야기를 솔직하게 꺼내줘서 고마워 🌿 어깨의 힘을 툭 빼고 숨을 크게 들이쉬어 보자. 오늘 하루도 정말 애썼어!`;
      } else if (chatStep === 5) {
        replyText = `호흡을 가다듬으니 마음이 한결 가벼워졌길 바라 ✨ 이 경험을 통해 나 자신에게 해주고 싶은 따뜻한 한마디나 다짐이 있니?`;
      } else {
        replyText = `오늘 나눈 진솔한 대화는 너만의 소중한 보물이야 💌 이제 아래 그림일기장에 이 마음을 차분히 기록해 볼까? 내가 곁에서 항상 응원할게!`;
      }
    }

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { reply: "네 마음을 진심으로 응원해! 언제든 편하게 네 감정을 들려줘 🌸" },
      { status: 200 }
    );
  }
}
