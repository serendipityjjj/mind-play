import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentId = "99901",
      studentName = "학생",
      roomCode = "TEST",
      step = 1, // 1: 1차 사건/감정 발문, 2: 2차 욕구/바람 핑퐁
      emotions = [], // [{ word: "분노", percent: 50 }, ...]
      eventInput = "",
      desireInput = "",
      history = [] // 이전 대화 기록 [{ role: "user" | "assistant", content: "..." }]
    } = body;

    const upstageKey = process.env.UPSTAGE_API_KEY || process.env.NEXT_PUBLIC_UPSTAGE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // 감정 분석 (긍정/부정/혼재 및 대표 감정 텍스트 생성)
    const posEmotions = ["기쁨", "설렘", "뿌듯함", "감동", "안도감", "편안함", "홀가분함", "신남", "감사", "자부심"];
    const negEmotions = ["분노", "외로움", "슬픔", "답답함", "짜증", "서운함", "속상함", "불안", "억울함", "조급함", "초조함", "두려움"];

    let posSum = 0;
    let negSum = 0;
    const emotionSummary = (emotions || []).map((e: any) => {
      const word = e.word || e.name || "";
      const percent = e.percent || e.value || 0;
      if (posEmotions.some(p => word.includes(p))) posSum += percent;
      if (negEmotions.some(n => word.includes(n))) negSum += percent;
      return `${word} ${percent}%`;
    }).join(", ");

    let toneGuide = "학생의 감정을 다정하게 읽어주세요.";
    if (posSum > 60) {
      toneGuide = "긍정 감정이 우세합니다. 함께 진심으로 기뻐해주고, 그 좋은 감정이 어디서 시작되었는지 기분 좋게 음미하도록 돕는 따뜻하고 축하하는 어조로 반응하세요.";
    } else if (negSum > 60) {
      toneGuide = "부정 감정이 우세합니다. 학생의 힘든 마음을 깊이 공감하고 위로한 뒤, 그 마음속에 숨어있던 진짜 소중한 바람(욕구)을 찾아보도록 다정하게 질문하세요.";
    } else if (emotions.length > 0) {
      toneGuide = "복합/양가 감정입니다. 기쁨과 슬픔, 혹은 기대와 걱정이 동시에 드는 학생의 복잡한 마음을 있는 그대로 인정하고 존중해주세요.";
    }

    // 위험 신호 감지 (자해, 자살, 학대, 심각한 폭력)
    const checkText = `${eventInput} ${desireInput}`;
    const riskKeywords = ["자해", "죽고 싶", "자살", "맞았", "학대", "폭력", "살기 싫", "피 피", "칼로"];
    const isHighRisk = riskKeywords.some(k => checkText.includes(k));

    if (isHighRisk) {
      // 위험 신호 발생 시 Supabase DB에 플래그 기록
      try {
        await supabase.from("mindplay_live_entries").upsert({
          room_code: (roomCode || "TEST").toUpperCase(),
          activity: "mindi_risk_alert",
          entry_key: `risk_${studentId}_${Date.now()}`,
          student_id: studentId,
          payload: {
            studentId,
            studentName,
            eventInput,
            desireInput,
            emotions: emotionSummary,
            flaggedAt: new Date().toISOString(),
            riskType: "HIGH_RISK_KEYWORD"
          }
        });
      } catch (dbErr) {
        console.error("[mindi risk flag db error]", dbErr);
      }
    }

    // 시스템 프롬프트 구성
    const systemPrompt = `너는 중학교 1학년 학생의 마음을 100% 알아채주는 다정한 공감 챗봇 '마음이'다.

[학생 정보]
- 이름: ${studentName} (학생을 부를 때는 '${studentName}아' 또는 '${studentName} 학생'으로 친근하게 언급)
- 감정 칵테일 조합: ${emotionSummary || "다양한 마음"}
- 감정 어조 지침: ${toneGuide}

[대화 지침]
1. 대상은 중학교 1학년이다. 이해하기 쉬운 예쁜 말로 2~3문장(최대 4문장) 이내로 작성하라.
2. 학생이 쓴 사건과 표현("${eventInput}")의 핵심 단어를 직접 인용하며 공감하라.
3. [중요] 특정 대상(친구 등)을 함부로 단정하지 마라.
   - 학생이 "엄마", "선생님", "나 자신", "동생" 등을 언급했으면 해당 대상을 정확히 언급하라.
   - 대상이 불명확하면 "친구들에게"라고 단정하지 말고, "그 상황에서 속으로 진짜 원했던 바람은 무엇이었니?"처럼 열린 질문으로 물어라.
4. 판단, 훈계, 섣부른 해결책 제시를 금지한다.
5. ${isHighRisk ? '반드시 답변 마지막에 "혼자 견디기 힘들 땐 선생님이나 청소년 전화(1388)에 언제든 마음을 털어놓을 수 있어 🌿"라는 구절을 포함하라.' : ''}
6. 긍정 감정일 때는 절대 억지로 '힘들었겠다' 같은 위로조를 쓰지 말고, 함께 신나고 기뻐하라!`;

    let replyText = "";
    const maxTokens = 220;

    // 1. Upstage Solar API Call (Primary)
    if (upstageKey) {
      try {
        const messages: any[] = [{ role: "system", content: systemPrompt }];

        if (Array.isArray(history) && history.length > 0) {
          history.forEach((h: any) => {
            messages.push({
              role: h.role === "user" ? "user" : "assistant",
              content: h.content || h.text || ""
            });
          });
        }

        if (step === 1) {
          messages.push({
            role: "user",
            content: `내가 겪은 사건/상황이야: "${eventInput.trim()}"`
          });
        } else {
          messages.push({
            role: "user",
            content: `그때 속으로 원했던 나의 진짜 마음과 바람이야: "${desireInput.trim()}"`
          });
        }

        const res = await fetch("https://api.upstage.ai/v1/solar/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${upstageKey}`
          },
          body: JSON.stringify({
            model: "solar-1-mini-chat",
            messages,
            temperature: 0.7,
            max_tokens: maxTokens
          })
        });

        if (res.ok) {
          const data = await res.json();
          replyText = data.choices?.[0]?.message?.content?.trim() || "";
        } else {
          console.warn("[Upstage Solar API Error status]", res.status);
        }
      } catch (err) {
        console.error("[Upstage Solar Call Catch]", err);
      }
    }

    // 2. Gemini 1.5 Flash Call (Fallback)
    if (!replyText && geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const contents: any[] = [
          { role: "user", parts: [{ text: `[시스템 프롬프트]\n${systemPrompt}` }] },
          { role: "model", parts: [{ text: `안녕 ${studentName}아! 마음이야. 편하게 이야기해줘.` }] }
        ];

        if (step === 1) {
          contents.push({ role: "user", parts: [{ text: `사건: "${eventInput.trim()}"` }] });
        } else {
          contents.push({ role: "user", parts: [{ text: `바람/욕구: "${desireInput.trim()}"` }] });
        }

        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: maxTokens }
          })
        });

        if (res.ok) {
          const data = await res.json();
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        }
      } catch (err) {
        console.error("[Gemini Call Catch]", err);
      }
    }

    // 3. Smart Dynamic Fallback (API 실패 시 감정 분기 템플릿)
    if (!replyText) {
      if (posSum > 60) {
        replyText = step === 1
          ? `${studentName}아, "${eventInput}"(이)라는 멋진 일이 있었구나! 마음이까지 온통 기분 좋아져 🎉 그때의 기쁜 마음을 음미하며, 속으로 어떤 점이 가장 만족스러웠는지 들려줄래?`
          : `${studentName}아, 진짜 마음을 솔직하게 알아차렸구나! 그 마음 덕분에 오늘의 기쁨이 한층 더 커진 것 같아 ✨`;
      } else if (eventInput.includes("엄마") || eventInput.includes("부모") || eventInput.includes("아빠")) {
        replyText = step === 1
          ? `${studentName}아, 가족과 대화하며 속상한 마음이 컸겠어 🥺 그때 속으로 부모님께 바랐던 진짜 마음은 뭐였을까?`
          : `${studentName}아, 부모님께 전하고 싶었던 솔직한 마음을 잘 찾아냈구나. 너의 소중한 진심을 응원해 🌿`;
      } else {
        replyText = step === 1
          ? `${studentName}아, "${eventInput.slice(0, 25)}" 일로 마음이 복잡했겠어. 그 상황에서 속으로 진짜 바랐던 모습은 무엇이었니?`
          : `${studentName}아, 내 안의 진실한 마음을 알아채준 네 모습이 참 멋져. 그 마음을 소중히 간직하길 바랄게 ✨`;
      }
    }

    // 4. DB 대화 기록 저장 (Supabase Realtime / Persistent storage)
    try {
      await supabase.from("mindplay_live_entries").upsert({
        room_code: (roomCode || "TEST").toUpperCase(),
        activity: "mindi_chat_history",
        entry_key: `chat_${studentId}_step${step}_${Date.now()}`,
        student_id: studentId,
        payload: {
          studentId,
          studentName,
          step,
          emotions: emotionSummary,
          eventInput,
          desireInput,
          replyText,
          isHighRisk,
          createdAt: new Date().toISOString()
        }
      });
    } catch (saveErr) {
      console.warn("[mindi chat db save error]", saveErr);
    }

    return NextResponse.json({
      success: true,
      reply: replyText,
      isHighRisk,
      provider: upstageKey ? "upstage" : geminiKey ? "gemini" : "fallback"
    });
  } catch (error: any) {
    console.error("[app/api/mindi/route.ts Exception]", error);
    return NextResponse.json({
      success: false,
      reply: "이야기를 차분히 듣고 있어. 마음에 가장 와닿는 느낌을 편하게 말해줘.",
      provider: "fallback"
    });
  }
}
