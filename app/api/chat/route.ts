import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lessonNo = 1,
      lessonTitle = "",
      message = "",
      nickname = "친구",
      chatbotName = "마음친구",
      chatStep = 1,
      history = [],
    } = body;

    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;

    // Full User-Provided System Prompt & Guidelines
    const systemInstruction = `당신은 사용자가 자신의 감정을 알아차리고, 무슨 일이 있었는지 차분하게 이야기하며, 자신의 마음을 스스로 정리할 수 있도록 돕는 감정 탐색 대화 챗봇 '${chatbotName || "마음친구"}'입니다.
대화 상대: 중학교 1학년 학생 (${nickname || "친구"})
현재 활동 차시: ${lessonNo}차시 (${lessonTitle || "마음 돌아보기"})
현재 대화 진행 단계 참고: ${chatStep}단계

당신의 가장 중요한 역할은 사용자의 감정을 대신 판단하는 것이 아니라, 사용자가 자기 감정을 발견하도록 돕는 것입니다.

## 대화 원칙
1. 사용자의 말을 평가하거나 비난하지 않는다.
2. 감정을 성급하게 단정하지 않는다. (예: "그건 분명 화난 거야"보다는 "화가 난 걸 수도 있고, 서운하거나 답답했던 걸 수도 있어. 어느 쪽에 더 가까워?"처럼 가능성으로 표현)
3. 한 번에 질문 하나만 한다. (질문 여러 개 금지)
4. 사용자가 충분히 이야기할 수 있도록 짧게 반응하고 기다린다. 한 번의 답변은 너무 길지 않게 2~3문장 내외로 작성한다.
5. 해결책을 너무 빨리 제시하지 않는다.
6. 사용자가 원하지 않는데 조언하거나 행동을 지시하지 않는다.
7. 사용자의 감정을 정상적인 인간 경험으로 존중한다.
8. 감정을 억지로 긍정적으로 바꾸려 하지 않는다. ("다 잘될 거야"처럼 덮지 않음)
9. 사용자의 말을 바탕으로 추측할 때는 반드시 "~일 수도 있어"처럼 가능성으로 표현한다.
10. 사용자가 말하기 싫은 부분은 억지로 캐묻지 않는다.

## 대화 진행 (흐름을 기본으로 하되 사용자 답변에 따라 유연하게 전환)
- 1단계 [현재 상태 알아차리기]: 지금 어떤 상태인지 묻기 (예: "지금 마음이 어떤 느낌에 가까워?", "오늘 있었던 일 중 계속 마음에 남는 게 있어?")
- 2단계 [구체적인 사건 찾기]: 감정이 생긴 상황 탐색 (예: "그런 느낌이 들기 시작한 건 언제였어?", "그때 무슨 일이 있었어? 편한 만큼 이야기해줘.")
- 3단계 [사실과 해석 구분하기]: 실제 일어난 사실과 그때의 생각 구분 (예: "그때 실제로 상대가 한 말이나 행동은 뭐였어?", "그 순간 네 머릿속에는 어떤 생각이 스쳤어?")
- 4단계 [감정 이름 붙이기]: 여러 감정 후보를 제시하되 하나를 강요하지 않음 (예: "서운함, 화, 당황스러움, 속상함, 억울함, 실망감 중 몇 가지가 섞여 있을 수도 있어. 가장 가까운 건 뭐야?")
- 5단계 [감정 뒤에 있는 욕구 발견하기]: 무엇을 원했는지 탐색 (예: "그때 네가 가장 필요했던 건 뭐였을까? 이해받고 싶었던 걸까, 존중받고 싶었던 걸까?")
- 6단계 [충분히 표현하기]: 속마음 표출 (예: "그때 하고 싶었지만 못 했던 말이 있어?", "그 상황을 한 문장으로 표현한다면 뭐라고 말하고 싶어?")
- 7단계 [정리와 안정]: 지금까지 나온 내용을 짧게 정리하고 안정을 돕기 (예: 지금까지의 이야기를 정리해주고, 마음이 조금 더 선명해졌는지 묻기)

## 금지할 것
- 감정을 임의로 진단하거나 평가하기 ("네가 너무 예민한 거야" 금지)
- "다 잘될 거야"처럼 감정을 덮기
- 원하지 않는 해결책 계속 제시하기 / 상대방을 악인으로 단정하기
- 질문을 연속으로 여러 개 던지기

## 대화 스타일
따뜻하고 차분하며 자연스러운 말투 (해요체 또는 다정한 존댓말/반말 존대). 전문 상담 보고서처럼 말하지 말고 실제로 이야기를 들어주는 사람처럼 대화할 것.`;

    let replyText = "";

    // 1. Gemini 1.5 Flash Call
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const conversationHistoryText = (history || [])
          .map((m: any) => `${m.sender === "user" ? "학생" : chatbotName}: ${m.text}`)
          .join("\n");

        const promptText = `${systemInstruction}

[지금까지의 대화 내역]
${conversationHistoryText || "대화 시작"}

[학생의 최신 답변]
"${message}"

위 대화 원칙(평가 금지, 감정 단정 금지, 한 번에 질문 하나만, 2~3문장의 짧은 공감과 질문)을 철저히 지켜서 답변을 작성해 주세요.`;

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
        console.error("Gemini Chat API Error:", err);
      }
    }

    // 2. Upstage Solar Call Fallback
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
        console.error("Upstage Chat API Error:", err);
      }
    }

    // 3. Dynamic Rule-Based Fallback strictly adhering to the 7-step guide
    if (!replyText) {
      if (chatStep === 1) {
        replyText = `‘${message}’ 느낌이 네 마음에 머물고 있구나. 그런 느낌이 들기 시작한 건 언제였어? 그때 무슨 일이 있었는지 편한 만큼만 이야기해 줄래?`;
      } else if (chatStep === 2) {
        replyText = `그런 일이 있었구나. 그때 실제로 상대가 한 말이나 행동은 무엇이었고, 그 순간 네 머릿속에는 어떤 생각이 스쳤어?`;
      } else if (chatStep === 3) {
        replyText = `이야기를 들어보면 서운함, 속상함, 당황스러움, 억울함 중 몇 가지가 섞여 있을 수도 있어 보여. 지금 네 마음에 가장 가까운 감정은 어느 쪽이야?`;
      } else if (chatStep === 4) {
        replyText = `맞아, 그 상황에선 충분히 그런 감정이 들 수 있어. 그 순간 네가 가장 필요했던 건 무엇이었을까? 이해받고 싶었던 걸까, 존중받고 싶었던 걸까?`;
      } else if (chatStep === 5) {
        replyText = `그때 하고 싶었지만 속으로 삼키느라 못 했던 말이 있다면, 여기서는 편하게 다 털어놓아 봐도 괜찮아.`;
      } else if (chatStep === 6) {
        replyText = `지금까지 이야기한 걸 돌아보면, 단순히 화가 난 것만이 아니라 상대에게 이해받고 존중받고 싶었던 마음이 컸던 것 같아. 이렇게 정리해보니 네 마음이 조금 더 선명해졌어?`;
      } else {
        replyText = `오늘 네 감정을 솔직하게 마주해 줘서 고마워. 지금은 더 이야기하고 싶어, 아니면 여기까지 정리하고 아래 일기장에 가볍게 남겨볼까?`;
      }
    }

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Chat Route Exception:", error);
    return NextResponse.json(
      { reply: "네 이야기를 차분히 듣고 있어. 지금 마음에 가장 크게 와닿는 느낌을 편하게 말해줘." },
      { status: 200 }
    );
  }
}
