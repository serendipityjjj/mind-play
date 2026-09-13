import { NextRequest, NextResponse } from "next/server";

const STAGE_GOALS: Record<number, string> = {
  1: "오늘의 전반적인 기분을 묻는다.",
  2: "그 감정이 나온 구체적 상황(언제/어디서/누구와)을 묻는다.",
  3: "그 상황에서 든 생각이나 마음을 묻는다.",
  4: "그때 진짜 원했던 것이 무엇인지 묻는다.",
  5: "비슷한 감정을 전에도 느낀 적 있는지 묻는다.",
  6: "지금 그 일을 돌아보면 어떤지 묻는다.",
  7: "오늘 대화를 학생 스스로 한 문장으로 정리하게 한다."
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lessonNo = 1,
      lessonTitle = "",
      message = "",
      nickname = "친구",
      chatbotName = "행운이",
      chatStep = 1,
      history = [],
    } = body;

    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;

    const botName = chatbotName || "행운이";
    const currentGoal = STAGE_GOALS[chatStep] || "학생의 감정을 깊이 경청하고 자연스럽게 질문을 이어간다.";

    const systemInstruction = `너는 초·중등 학생의 감정일기 작성을 돕는 대화 상대 '${botName}'다.
학생이 오늘 하루를 돌아보며 자기 감정을 스스로 말로 꺼내도록 돕는 것이 유일한 역할이다.

현재 단계: ${chatStep}/7. 이번 턴의 목표: ${currentGoal}

[대화 방식]
- 한 번에 한 가지만 묻는다. 답변은 2~3문장 이내로 작성한다.
- 학생이 쓴 문장을 그대로 되풀이하지 않는다. 되돌려줄 때는 반드시 다른 표현으로 바꿔 짧게 요약한다.
- 학생이 말하지 않은 감정을 대신 이름 붙이지 않는다. 확신이 없으면 "혹시 ~에 가까울까?"처럼 확인하듯 묻는다.
- 조언, 해결책, 격려성 마무리("힘내", "잘하고 있어")를 먼저 꺼내지 않는다.
- "정말 소중했던 거야", "그런 일이 있었구나" 같은 정해진 판에 박힌 문구를 반복하지 않는다. 매 턴 표현을 상황에 맞게 새로 만든다.

[질문 방향]
학생의 마지막 발화에서 아직 구체화되지 않은 부분 하나를 골라 파고든다.
- 상황이 흐릿하면 → 언제/어디서/누구와였는지
- 감정 단어만 있으면 → 몸의 느낌이나 그때 든 생각
- 사건만 있으면 → 그때 마음이 어땠는지
- 감정 원인이 안 나왔으면 → 무엇이 그렇게 만들었는지
- 충분히 나왔으면 → 그때 진짜 원했던 것

[금지]
- 진단, 병명 언급 금지
- 학생 경험에 대한 평가나 훈계 금지
- 4문장 이상의 긴 답변 금지

[대화 예시]
[나쁜 예]
학생: 그냥 체력이 받쳐주면 좋겠어 지금 방전상태야
${botName}: 맞아, 너에게는 '그냥 체력이 받쳐주면 좋겠어'라는 마음이 정말 소중했던 거야.
→ 학생 말을 그대로 반복했고, 대화가 더 나아가지 않음.

[좋은 예]
학생: 그냥 체력이 받쳐주면 좋겠어 지금 방전상태야
${botName}: 몸이 완전히 바닥난 느낌이구나. 오늘 하루 중에 특히 '아, 이제 못 버티겠다' 싶었던 순간이 있었어?`;

    let replyText = "";

    // 1. Gemini 1.5 Flash Call with full multi-turn conversation contents
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        
        // Build multi-turn format for Gemini
        const contents: any[] = [];
        
        // System instruction & first context
        contents.push({
          role: "user",
          parts: [{ text: `[시스템 지침]\n${systemInstruction}\n\n대화를 시작합니다.` }]
        });
        contents.push({
          role: "model",
          parts: [{ text: `안녕! 오늘 하루 마음속에 남았던 이야기를 편하게 들려줘.` }]
        });

        // Add full conversation history
        if (Array.isArray(history) && history.length > 0) {
          history.forEach((m: any) => {
            if (m.text && m.text.trim()) {
              contents.push({
                role: m.sender === "user" ? "user" : "model",
                parts: [{ text: m.text }]
              });
            }
          });
        }

        // Add current user message with stage prompt
        contents.push({
          role: "user",
          parts: [{ text: `[현재 단계: ${chatStep}/7, 목표: ${currentGoal}]\n학생 발화: "${message}"` }]
        });

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.75,
              maxOutputTokens: 220,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        } else {
          console.error("Gemini API Error Status:", response.status);
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
          { role: "user", content: `[현재 단계: ${chatStep}/7, 목표: ${currentGoal}] ${message}` },
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
            temperature: 0.75,
            max_tokens: 220,
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

    // 3. Dynamic smart fallback strictly following rules
    if (!replyText) {
      if (chatStep === 1) {
        replyText = `'${message}' 같은 기분이 머물고 있구나. 오늘 하루 중에 특히 그 느낌이 크게 올라왔던 순간이 있었어?`;
      } else if (chatStep === 2) {
        replyText = `그런 상황이었구나. 그때 상대방이 구체적으로 어떤 행동이나 말을 했는지 기억나?`;
      } else if (chatStep === 3) {
        replyText = `그 순간 머릿속에 가장 먼저 스쳐 지나간 생각은 뭐였을까?`;
      } else if (chatStep === 4) {
        replyText = `그때 속으로는 상대방이나 그 상황에 대해 어떤 걸 가장 바라고 있었어?`;
      } else if (chatStep === 5) {
        replyText = `예전에도 비슷한 상황에서 이렇게 마음이 쓰였던 적이 있었는지 궁금해.`;
      } else if (chatStep === 6) {
        replyText = `지금 차분히 그때를 돌아보니까, 마음에 남아 있는 감정이 조금 달라지거나 정리되는 게 있어?`;
      } else {
        replyText = `오늘 나눈 마음을 학생 스스로 한 문장으로 정리해 본다면 뭐라고 쓰고 싶어?`;
      }
    }

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Chat API Route Exception:", error);
    return NextResponse.json(
      { reply: "이야기를 차분히 듣고 있어. 마음에 가장 와닿는 느낌을 편하게 말해줘." },
      { status: 200 }
    );
  }
}
