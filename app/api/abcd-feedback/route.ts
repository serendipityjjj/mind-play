import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ABCD_TEACHER_PROBLEMS } from "@/lib/abcdProblems";
import { ACTIVITIES } from "@/lib/activities";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      roomCode = "TEST",
      studentId = "99901",
      studentName = "학생",
      problemNo = 1,
      answers = {},
      attempt = 1,
    } = body;

    const {
      beliefB = "",
      emotionC = "",
      actionC = "",
      disputeD1 = "",
      disputeD2 = "",
      disputeD3 = "",
      rationalBeliefNewD = "",
    } = answers;

    const teacherProblem = ABCD_TEACHER_PROBLEMS[Number(problemNo)] || ABCD_TEACHER_PROBLEMS[1];
    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // 1. 고위험 키워드 안전 검사
    const fullText = `${beliefB} ${emotionC} ${actionC} ${disputeD1} ${disputeD2} ${disputeD3} ${rationalBeliefNewD}`;
    const riskKeywords = ["자해", "죽고 싶", "자살", "맞았", "학대", "폭력", "살기 싫", "피 피", "칼로"];
    const isHighRisk = riskKeywords.some((k) => fullText.includes(k));

    if (isHighRisk) {
      try {
        await supabase.from("mindplay_live_entries").upsert({
          room_code: (roomCode || "TEST").toUpperCase(),
          activity: ACTIVITIES.MINDI_RISK_ALERT,
          entry_key: `risk_abcd_${problemNo}_${studentId}_${Date.now()}`,
          student_id: studentId,
          student_name: studentName,
          payload: {
            studentId,
            studentName,
            lessonNo: 6,
            problemNo,
            answers,
            flaggedAt: new Date().toISOString(),
            riskType: "ABCD_HIGH_RISK_KEYWORD",
          },
        });
      } catch (e) {
        console.error("[abcd-feedback risk log error]", e);
      }
    }

    // 2. 시스템 프롬프트 및 컨텍스트 구성
    const systemPrompt = `너는 중학교 1학년 학생의 마음 성장을 돕는 따뜻한 인지치료(CBT) 상담 멘토 'AI 마음이'다.
학생이 작성한 6차시 [ABCD 생각 뒤집기 연습 문제] 답안을 읽고 친절하고 용기를 북돋워주는 피드백을 제공한다.

[문제 상황 정보]
- 문제 제목: ${teacherProblem.title}
- 선행 사건 (A): "${teacherProblem.situationA}"
- 교사용 분석 기준 (참고용, 학생에게 정답을 그대로 읊지 말 것):
  * 비합리적 신념 분석: ${teacherProblem.modelAnswer.beliefB_analysis}
  * 합리적 신념 예시: "${teacherProblem.modelAnswer.rationalBeliefNewD}"

[학생 정보 및 작성 답안]
- 학생 이름: ${studentName}
- 비합리적 신념 (B): "${beliefB}"
- 결과 - 감정 및 행동 (C): 감정="${emotionC}", 행동="${actionC}"
- 3대 논박 (D):
  * 근거 확인 (D1): "${disputeD1}"
  * 다른 각도/시각 (D2): "${disputeD2}"
  * 최악의 확률 (D3): "${disputeD3}"
- 새로운 합리적 신념 (New D): "${rationalBeliefNewD}"

[절대 작성 원칙]
1. 정답/오답, 점수, 등급 판정은 절대 하지 마라.
2. 중학교 1학년 눈높이에 맞춘 다정하고 부드러운 존댓말(해요체)로 작성하라.
3. 칭찬을 가장 먼저 작성하되, 학생이 쓴 실제 단어나 문장("${beliefB.slice(0, 15)}" 또는 "${rationalBeliefNewD.slice(0, 15)}")을 반드시 직접 인용하며 솔직하게 자신의 생각을 마주한 용기를 칭찬하라.
4. 논박(D)과 새로운 신념(New D)을 발전시킬 수 있는 따뜻한 생각 질문을 1~2개 제안하라.
5. 반드시 아래 순수 JSON 형식으로만 응답하라. 마크다운이나 코드블록(\`\`\`json) 없이 오직 JSON 객체만 반환하라:
{
  "칭찬": "학생이 쓴 단어를 직접 인용하며 시작하는 2~3문장의 따뜻한 격려",
  "항목별코멘트": [
    { "항목": "비합리적 신념 (B)", "내용": "왜곡된 생각을 스스로 알아차린 점에 대한 코멘트 (1~2문장)" },
    { "항목": "3대 논박 (D)", "내용": "생각의 오류에 물음표를 던진 시도에 대한 코멘트 (1~2문장)" },
    { "항목": "새로운 합리적 신념 (New D)", "내용": "유연하게 바꾼 생각에 대한 코멘트 (1~2문장)" }
  ],
  "다시생각해볼점": [
    "생각을 더 넓혀볼 수 있는 따뜻한 질문 1",
    "생각을 더 넓혀볼 수 있는 따뜻한 질문 2"
  ]
}`;

    let feedbackJson: any = null;

    // 3. Upstage Solar API 호출 (Primary)
    if (upstageKey) {
      try {
        const res = await fetch("https://api.upstage.ai/v1/solar/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${upstageKey}`,
          },
          body: JSON.stringify({
            model: "solar-1-mini-chat",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: "내 답안에 대해 따뜻한 피드백 JSON을 작성해줘." },
            ],
            temperature: 0.7,
            max_tokens: 650,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const rawContent = data.choices?.[0]?.message?.content?.trim() || "";
          try {
            const cleanStr = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
            feedbackJson = JSON.parse(cleanStr);
          } catch (pe) {
            console.warn("[Upstage json parse fail, rawContent:]", rawContent);
          }
        }
      } catch (err) {
        console.error("[Upstage Solar abcd-feedback error]", err);
      }
    }

    // 4. Gemini Fallback
    if (!feedbackJson && geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\n내 답안에 대해 JSON 형식으로 피드백을 줘.` }],
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
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
          feedbackJson = JSON.parse(rawText);
        }
      } catch (gErr) {
        console.error("[Gemini abcd-feedback fallback error]", gErr);
      }
    }

    // 5. Smart Deterministic Fallback
    if (!feedbackJson || !feedbackJson.칭찬) {
      const bSnippet = beliefB ? `"${beliefB.slice(0, 18)}..."` : "답답했던 마음";
      const newDSnippet = rationalBeliefNewD ? `"${rationalBeliefNewD.slice(0, 20)}..."` : "새로운 생각";

      feedbackJson = {
        칭찬: `${studentName}아, ${bSnippet}라고 느꼈던 순간을 솔직하게 마주하고 ${newDSnippet}라는 멋진 생각으로 뒤집어낸 용기가 정말 대단해! 스스로 생각의 렌즈를 바꾸어 본 경험은 앞으로 너에게 큰 힘이 될 거야 🌿`,
        항목별코멘트: [
          {
            항목: "비합리적 신념 (B)",
            내용: beliefB
              ? `불안할 때 스쳐 지나가는 왜곡된 생각을 회피하지 않고 명확하게 포착해냈어요.`
              : `마음속에 일어난 부정적인 생각을 솔직하게 적어보는 것만으로도 큰 첫걸음이에요.`,
          },
          {
            항목: "3대 논박 (D)",
            내용: disputeD1 || disputeD2 || disputeD3
              ? `다양한 각도에서 근거를 따져보고 다른 가능성을 열어둔 반박이 아주 훌륭해요.`
              : `상황을 객관적으로 바라보는 연습을 통해 마음의 여유를 찾을 수 있어요.`,
          },
          {
            항목: "새로운 합리적 신념 (New D)",
            내용: rationalBeliefNewD
              ? `자신을 옭아매지 않고 한층 더 편안하고 긍정적인 다짐으로 잘 마무리했어요.`
              : `자신을 다독여주는 따뜻한 문장 하나를 완성해보면 마음이 훨씬 든든해질 거예요.`,
          },
        ],
        다시생각해볼점: [
          "친한 친구가 나와 똑같은 상황에 처했다면, 어떤 다정한 말을 건네주었을까요?",
          "이 새로운 생각을 마음속에 떠올렸을 때, 신체와 기분에 어떤 긍정적인 변화가 느껴지나요?",
        ],
      };
    }

    // 고위험 안내 문구
    const hotlineNotice = isHighRisk
      ? "🌿 마음이 너무 무겁고 힘들 땐 혼자 고민하지 말고 선생님이나 청소년 상담전화(☎ 1388, 24시간 무료)에 마음을 나눠보세요."
      : undefined;

    // 6. DB에 피드백 이력 저장
    try {
      await supabase.from("mindplay_live_entries").upsert({
        room_code: (roomCode || "TEST").toUpperCase(),
        activity: ACTIVITIES.ABCD_FEEDBACK,
        entry_key: `${problemNo}_${studentId}_${Date.now()}`,
        student_id: studentId,
        student_name: studentName,
        payload: {
          problemNo,
          studentId,
          studentName,
          attempt,
          feedback: feedbackJson,
          isHighRisk,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (saveErr) {
      console.warn("[abcd feedback db save error]", saveErr);
    }

    return NextResponse.json({
      success: true,
      feedback: feedbackJson,
      isHighRisk,
      hotlineNotice,
    });
  } catch (error: any) {
    console.error("[/api/abcd-feedback route error]", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to generate feedback",
    });
  }
}
