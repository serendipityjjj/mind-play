"use client";

import React, { useState } from "react";
import { LessonMetadata } from "@/lib/curriculum";
import { EmotionCloudPicker } from "@/components/common/EmotionCloudPicker";
import { TicketPunchCard } from "@/components/common/TicketPunchCard";
import { TTSPlayer } from "@/components/common/TTSPlayer";
import { DiaryEntry } from "@/lib/storage";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle2,
  Image as ImageIcon,
  Bot,
  Send,
  Scale,
  Stamp,
  Users,
  Check,
} from "lucide-react";

interface Lesson9ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson9Module: React.FC<Lesson9ModuleProps> = ({
  lesson,
  nickname,
  initialData,
  onSave,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: `안녕, ${nickname}! 친구와 취향이나 생각이 너무 달라서 '어? 왜 저러지?' 하고 놀랐거나 의견이 부딪혔던 경험이 있니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Difference Observation Chips & Hashtags)
  const diffCategories = [
    {
      category: "취향의 다름",
      items: ["음악 / 아이돌 취향", "게임 장르", "좋아하는 음식 / 맵기 정도", "패션 / 옷 스타일"],
    },
    {
      category: "성향의 다름",
      items: ["약속 잡을 때 (즉흥형 vs 계획형)", "스트레스 풀 때 (혼자 있기 vs 수다 떨기)", "카톡 답장 속도 (칼답 vs 느긋)"],
    },
  ];
  const [selectedDiffs, setSelectedDiffs] = useState<string[]>(
    initialData?.interactiveData?.customData?.selectedDiffs || [
      "음악 / 아이돌 취향",
      "약속 잡을 때 (즉흥형 vs 계획형)",
    ]
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#다름을_존중하기", "#세상에_이런_사람도", "#틀린_게_아니라_다른_것"]
  );

  // Step 3 State (Balance Game Questions)
  const balanceQuestions = [
    {
      id: "q1",
      topic: "위로받을 때",
      optionA: "폭풍 공감과 리액션",
      optionB: "냉철하고 현실적인 해결책",
      percentA: 58,
      percentB: 42,
    },
    {
      id: "q2",
      topic: "주말 휴식",
      optionA: "하루 종일 침대에서 넷플릭스/유튜브 보기",
      optionB: "밖으로 나가 친구들과 신나게 놀기",
      percentA: 64,
      percentB: 36,
    },
    {
      id: "q3",
      topic: "시험공부",
      optionA: "벼락치기로 전날 밤새우기",
      optionB: "2주 전부터 계획표 세워 공부하기",
      percentA: 45,
      percentB: 55,
    },
    {
      id: "q4",
      topic: "친구와의 갈등",
      optionA: "그 자리에서 바로 대화로 풀기",
      optionB: "하루 정도 감정을 식힌 뒤 이야기하기",
      percentA: 51,
      percentB: 49,
    },
  ];

  const [balanceChoices, setBalanceChoices] = useState<Record<string, "A" | "B">>({
    q1: "A",
    q2: "A",
    q3: "B",
    q4: "B",
  });
  const [stampedQuestions, setStampedQuestions] = useState<Record<string, boolean>>({
    q1: true,
  });
  const [diversityReflect, setDiversityReflect] = useState<string>(
    initialData?.interactiveData?.customData?.diversityReflect ||
      "나와 다른 선택을 한 친구들을 보며 '틀린 게 아니라 서로 다른 기준이 있구나'를 깨달았다."
  );

  // Step 4 State (Evaluation & Diary)
  const [evalStars, setEvalStars] = useState({
    q1: initialData?.evalStars?.q1 || 5,
    q2: initialData?.evalStars?.q2 || 5,
  });
  const [selectedEmotionId, setSelectedEmotionId] = useState<string>(
    initialData?.emotionId || "peace"
  );
  const [diaryText, setDiaryText] = useState<string>(
    initialData?.diaryText || ""
  );
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    initialData?.imageUrl
  );
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonNo: 9,
          lessonTitle: lesson.topic,
          message: userText,
          nickname,
          history: chatMessages,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `우리는 저마다 다른 색깔의 안경을 쓰고 세상을 봐. '틀린 게 아니라 다른 것'이라는 걸 인정하면 마음이 한결 편안해진단다 🌿`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleDiff = (diff: string) => {
    if (selectedDiffs.includes(diff)) {
      setSelectedDiffs(selectedDiffs.filter((d) => d !== diff));
    } else {
      setSelectedDiffs([...selectedDiffs, diff]);
    }
  };

  const handleChooseBalance = (qId: string, choice: "A" | "B") => {
    setBalanceChoices({ ...balanceChoices, [qId]: choice });
  };

  const handleStamp = (qId: string) => {
    setStampedQuestions({ ...stampedQuestions, [qId]: true });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    const entry: DiaryEntry = {
      id: initialData?.id || `entry-9-${Date.now()}`,
      lessonNo: 9,
      lessonTitle: "09. 당연히 다를 수 있어",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "9차시 학급 밸런스 게임을 통해 친구들과의 다름을 존중하는 태도를 배웠다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          selectedDiffs,
          balanceChoices,
          diversityReflect,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 9차시 포레스트 딥그린 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#1B6336]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#EBF5EE] via-white to-green-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#1B6336] text-white text-xs font-badge rounded-md font-bold">
                9차시 • 영역 ➎ 건강한 관계 맺기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 64~70쪽</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              09. 당연히 다를 수 있어 (다양성 인정하기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              나와 다른 관점을 수용하고 친구들과 나의 공통점과 차이점을 확인하며 다양성을 인정합니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "다름 관찰" },
              { num: 3, label: "밸런스 게임" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#1B6336] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {s.num}. {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: 오늘의 마음 편지 */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#EBF5EE] to-[#D5EEDB] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#1B6336]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#1B6336] text-white text-xs font-badge font-bold rounded-full">
                  [오늘의 마음 편지] 오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="우리는 모두 다른 얼굴과 성격, 그리고 생각을 가지고 태어났어. 내가 좋아하는 음식이 친구에게는 싫어하는 음식일 수 있고, 내가 옳다고 생각한 것이 친구에게는 다르게 보일 수 있지. '틀린 것'이 아니라 '서로 다른 것'이라는 걸 인정할 때, 우리 사이는 훨씬 더 편안하고 따뜻해질 수 있어. 오늘 서로의 다름을 활짝 열린 마음으로 마주해 볼까?"
                themeColor="#1B6336"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1B6336]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#1B6336] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🌿
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 우리는 모두 다른 꽃으로 피어나
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;우리는 모두 다른 얼굴과 성격, 그리고 생각을 가지고 태어났어. &lsquo;틀린 것&rsquo;이 아니라 &lsquo;서로 다른 것&rsquo;이라는 걸 인정할 때 우리 사이는 훨씬 더 편안하고 따뜻해질 수 있어. 오늘 서로의 다름을 활짝 열린 마음으로 마주해 볼까?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#1B6336]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#1B6336]" />
                <span className="font-title text-sm font-bold text-[#1B6336]">
                  마음이와의 9차시 인터뷰
                </span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 mb-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-[#1B6336] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#1B6336] text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200/80"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-hand animate-pulse">
                    <span>마음이가 생각 중이에요...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="예: 친구는 약속을 즉흥적으로 잡는 걸 좋아하는데 나는 계획이 없으면 불안해."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B6336] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#1B6336] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#124525] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1B6336] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#124525] transition active:scale-95"
              >
                <span>다름의 세상 탐험하러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#1B6336]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1B6336]" />
              <span>활동 A: 친구와 나의 &lsquo;다름&rsquo; 관찰 픽커</span>
            </h3>
            <p className="font-sans text-xs text-gray-500">
              친구들과 지내며 가장 다르게 느껴지는 부분은 무엇인가요? (복수 선택)
            </p>

            <div className="space-y-3">
              {diffCategories.map((cat, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-xs font-badge font-bold text-[#1B6336] block mb-2">
                    ✦ {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => {
                      const isSelected = selectedDiffs.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleDiff(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-badge font-bold transition ${
                            isSelected
                              ? "bg-[#1B6336] text-white shadow-xs scale-102"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#다름을_존중하기", "#세상에_이런_사람도", "#다른_사람의_입장_생각하기", "#틀린_게_아니라_다른_것"]}
            onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
            onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
            guideText="오늘 수업을 통해서 변화하고 싶은 나의 모습이 있나요? 이번 시간 나만의 수업 목표를 해시태그로 작성해 봅시다."
          />

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-badge text-xs hover:bg-gray-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전 단계</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1B6336] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#124525] active:scale-95"
            >
              <span>학급 밸런스 게임 하러 가기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (학급 밸런스 게임) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1B6336]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#1B6336] text-white text-xs font-badge font-bold rounded-full">
                  ⚖️ 마음 꾸러미 ⑨ 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  학급 밸런스 게임: 우리 사이의 균형을 맞춰봐!
                </h3>
              </div>
              <Scale className="w-6 h-6 text-[#1B6336]" />
            </div>

            {/* 4 Balance Questions */}
            <div className="space-y-4">
              {balanceQuestions.map((q) => {
                const choice = balanceChoices[q.id];
                const isStamped = stampedQuestions[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-title text-sm font-bold text-gray-900">
                        ✦ [{q.topic}]
                      </span>
                      {isStamped && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-badge text-[#1B6336] bg-[#EBF5EE] px-2.5 py-0.5 rounded-full border border-[#1B6336]/30 animate-scale-in">
                          <Stamp className="w-3 h-3" />
                          <span>다름 인정 완료!</span>
                        </span>
                      )}
                    </div>

                    {/* A vs B Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleChooseBalance(q.id, "A")}
                        className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                          choice === "A"
                            ? "bg-[#EBF5EE] border-[#1B6336] ring-2 ring-[#1B6336]/20 shadow-xs font-bold text-[#1B6336]"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-xs font-badge">[A] {q.optionA}</span>
                        <span className="text-xs font-sans text-gray-400">{q.percentA}%</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChooseBalance(q.id, "B")}
                        className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                          choice === "B"
                            ? "bg-[#EBF5EE] border-[#1B6336] ring-2 ring-[#1B6336]/20 shadow-xs font-bold text-[#1B6336]"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-xs font-badge">[B] {q.optionB}</span>
                        <span className="text-xs font-sans text-gray-400">{q.percentB}%</span>
                      </button>
                    </div>

                    {/* Progress Percentage Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-[#1B6336] h-full transition-all duration-500"
                        style={{ width: `${q.percentA}%` }}
                      />
                      <div
                        className="bg-amber-500 h-full transition-all duration-500"
                        style={{ width: `${q.percentB}%` }}
                      />
                    </div>

                    {/* Stamp Action Button */}
                    {!isStamped && (
                      <button
                        type="button"
                        onClick={() => handleStamp(q.id)}
                        className="w-full py-1.5 bg-white border border-[#1B6336]/40 hover:bg-[#EBF5EE] text-[#1B6336] text-xs font-badge font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <Stamp className="w-3.5 h-3.5" />
                        <span>&ldquo;아~ 너는 그렇게 생각할 수도 있구나!&rdquo; 도장 쾅 찍기</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 1-Line Reflection */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                상대방의 선택 이유를 보며 느낀 점 한 줄 나눔
              </label>
              <input
                type="text"
                value={diversityReflect}
                onChange={(e) => setDiversityReflect(e.target.value)}
                placeholder="예: 친구와 선택이 달라도 서로의 이유를 들으니 납득이 가고 존중하게 되었다."
                className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B6336] font-hand"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-badge text-xs hover:bg-gray-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전 단계</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1B6336] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#124525] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#1B6336]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 나와 다른 의견을 가진 친구를 틀렸다고 단정하지 않고 다름을 인정했나요?
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEvalStars({ ...evalStars, q1: star })}
                      className="p-1 text-xl transition hover:scale-125"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= evalStars.q1
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q2. 다름을 존중하는 것이 건강한 관계의 시작임을 이해했나요?
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEvalStars({ ...evalStars, q2: star })}
                      className="p-1 text-xl transition hover:scale-125"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= evalStars.q2
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#EBF5EE] to-[#D5EEDB] rounded-2xl p-5 border border-[#1B6336]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#1B6336] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#1B6336]">
              [&ldquo;그럴 수도 있겠구나&rdquo; 마법 문장 실천 챌린지]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 한 주 동안 나와 생각이 다른 친구나 가족을 만났을 때, 마음속으로 또는 입 밖으로 '아, 너는 그렇게 생각할 수도 있겠구나'라고 먼저 인정해 주기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#1B6336]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>9차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="친구들과 밸런스 게임을 하며 다름을 인정하고 수용한 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B6336] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#1B6336]" />
                <span>오늘 완성한 밸런스 결과나 감정 사진 첨부 (선택)</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-badge rounded-xl border border-gray-300 flex items-center gap-1.5 transition">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>사진 선택 / 변경</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {uploadedImage && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#1B6336]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {isSavedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs sm:text-sm font-badge flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>9차시 감정일기와 다양성 밸런스 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 10차시로 이동 ➔
                </button>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-badge text-xs hover:bg-gray-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전 단계</span>
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B6336] to-green-800 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-green-800/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>9차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
