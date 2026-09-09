import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lessonNo, lessonTitle, message, nickname, history } = body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Prompt definition for '마음이'
    const systemInstruction = `
당신은 대구광역시교육청 마음학기제 워크북 기반 중학생 마음성장 챗봇 '마음이'입니다.
대상 학생: 중학생 (${nickname || "학생"})
현재 차시: ${lessonNo}차시 (${lessonTitle})

역할 및 대화 원칙:
1. 중학생의 눈높이에 맞춰 따뜻하고 다정하며 친근한 반말 존대(부드러운 해요체 or 다정한 반말체)를 사용합니다.
2. 학생의 감정에 먼저 100% 깊이 공감하고 경청해 줍니다.
3. 2~3문장 이내로 간결하고 부담 없게 답변하며, 끝에 그날의 감정이나 활동을 격려하는 따뜻한 질문을 하나 건넵니다.
4. 이모지(🌸, 🍃, ✨, 💌 등)를 적절히 섞어 몽글몽글한 느낌을 줍니다.
`;

    if (!apiKey) {
      // Friendly offline smart fallback response
      const fallbackReplies = [
        `그런 마음이었구나, ${nickname}! 솔직하게 마음을 털어놓아 줘서 정말 고마워. 오늘 수업을 통해 그 감정을 예쁘게 정리해 보자 🌸`,
        `네 이야기를 들으니 마음이가 곁에서 꼭 안아주고 싶어졌어. ${lessonNo}차시 활동을 하면서 마음의 구름을 찬찬히 들여다볼까? ✨`,
        `맞아, 그런 순간엔 누구나 마음이 흔들릴 수 있어. 하지만 넌 이미 충분히 멋지게 잘 해내고 있단다! 오늘 일기에 그 순간을 기록해 볼래? 💌`,
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      return NextResponse.json({ reply: randomReply });
    }

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const formattedContents = [
      {
        role: "user",
        parts: [{ text: `${systemInstruction}\n\n이전 대화:\n${JSON.stringify(history || [])}\n\n학생의 새 메시지: ${message}` }],
      },
    ];

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      `솔직한 마음을 나눠줘서 고마워, ${nickname}! 오늘 수업을 통해 더 단단해진 너를 만나보자 🌸`;

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: `네 마음을 진심으로 응원해! 오늘 차시의 감정일기에서 더 깊은 이야기를 펼쳐보자 🌸`,
      },
      { status: 200 }
    );
  }
}
