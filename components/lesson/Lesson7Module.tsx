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
  ShieldCheck,
  Check,
  Zap,
} from "lucide-react";

interface Lesson7ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson7Module: React.FC<Lesson7ModuleProps> = ({
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
      text: `안녕, ${nickname}! 요즘 학업이나 친구, 가족 관계에서 너를 가장 지치고 답답하게 만드는 스트레스는 무엇이니? 그때 몸이나 마음에 어떤 신호가 왔어?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Stress Alarm Chips & Hashtags)
  const stressSignals = [
    "두통 / 머리 띵함",
    "소화 불량 / 배 아픔",
    "어깨 결림",
    "가슴 답답함",
    "만성 피로",
    "작은 일에도 짜증",
    "폭식 또는 입맛 없음",
    "스마트폰만 계속 붙잡음",
    "자꾸 미루기",
  ];
  const [selectedSignals, setSelectedSignals] = useState<string[]>(
    initialData?.interactiveData?.customData?.stressReactions || ["두통 / 머리 띵함", "작은 일에도 짜증"]
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#단단해질_내_마음", "#바꿀_수_있는_것에_집중", "#지나간_시험은_안녕"]
  );

  // Step 3 State (Control Sorting Basket)
  const initialItems = [
    { id: "item1", title: "지난 시험의 성적", target: "unchangeable" },
    { id: "item2", title: "부모님의 잔소리", target: "unchangeable" },
    { id: "item3", title: "공부하는 시간과 마음가짐", target: "changeable" },
    { id: "item4", title: "부모님과 친구들에게 하는 말과 행동", target: "changeable" },
    { id: "item5", title: "속상한 마음, 공부하기 싫은 마음", target: "changeable" },
    { id: "item6", title: "앞으로의 성적", target: "changeable" },
  ];

  const [sortingState, setSortingState] = useState<Record<string, "unchangeable" | "changeable">>({
    item1: "unchangeable",
    item2: "unchangeable",
    item3: "changeable",
    item4: "changeable",
    item5: "changeable",
    item6: "changeable",
  });

  const [actionPlan, setActionPlan] = useState<string>(
    initialData?.interactiveData?.customData?.actionPlan ||
      "부모님의 잔소리는 내가 바꿀 수 없지만, 잔소리를 들었을 때 욱하지 않고 '알겠어요'라고 답하는 내 말투는 바꿀 수 있어!"
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
          lessonNo: 7,
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
          text: `정말 힘들었겠다. 하지만 스트레스는 네가 성장하고 있다는 신호야! 바꿀 수 있는 것에 집중해 보자 💡`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleSignal = (sig: string) => {
    if (selectedSignals.includes(sig)) {
      setSelectedSignals(selectedSignals.filter((s) => s !== sig));
    } else {
      setSelectedSignals([...selectedSignals, sig]);
    }
  };

  const handleItemSort = (id: string, basket: "unchangeable" | "changeable") => {
    setSortingState({ ...sortingState, [id]: basket });
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
      id: initialData?.id || `entry-7-${Date.now()}`,
      lessonNo: 7,
      lessonTitle: "07. 단단해질 내 마음",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "7차시 통제 분리 활동을 통해 바꿀 수 없는 것을 수용하고 바꿀 수 있는 행동에 집중했다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          stressReactions: selectedSignals,
          actionPlan,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 7차시 웜 오렌지 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D86B27]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFF3EB] via-white to-orange-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#D86B27] text-white text-xs font-badge rounded-md font-bold">
                7차시 • 영역 ❸ 정서 조절하기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 55~62쪽</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              07. 단단해질 내 마음 (스트레스 대처하기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              스트레스 상황에서 바꿀 수 있는 것과 없는 것을 구별하고, 내가 바꿀 수 있는 것에 집중합니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "스트레스 경보" },
              { num: 3, label: "통제 분리 바구니" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#D86B27] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#FFF3EB] to-[#FDE8DB] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#D86B27]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#D86B27] text-white text-xs font-badge font-bold rounded-full">
                  #오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="우리는 살아가면서 시험, 친구 관계, 부모님의 기대 등 수많은 스트레스를 마주하게 돼. 스트레스는 나를 괴롭히는 적이 아니라, 내 마음을 더 단단하게 만들어주는 디딤돌이 될 수 있어. 내가 바꿀 수 없는 것에 매달려 힘들어하기보다, 지금 내가 바꿀 수 있는 것에 집중해보자!"
                themeColor="#D86B27"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D86B27]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3EB] text-[#D86B27] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  💪
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 스트레스는 마음을 단단하게 하는 디딤돌이야
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;우리는 살아가면서 시험, 친구 관계, 부모님의 기대 등 수많은 스트레스를 마주하게 돼. 스트레스는 나를 괴롭히는 적이 아니라, 내 마음을 더 단단하게 만들어주는 디딤돌이 될 수 있어. 내가 바꿀 수 없는 것에 매달려 힘들어하기보다, 지금 내가 바꿀 수 있는 것에 집중해보자!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#D86B27]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#D86B27]" />
                <span className="font-title text-sm font-bold text-[#D86B27]">
                  마음이와의 7차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#D86B27] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#D86B27] text-white rounded-tr-none"
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
                  placeholder="예: 시험 기간만 되면 두통이 오고 자꾸 예민해져."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D86B27] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#D86B27] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#B8571C] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#D86B27] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#B8571C] transition active:scale-95"
              >
                <span>스트레스 마주하러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#D86B27]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-[#D86B27]" />
              <span>활동 A: 내 몸과 마음의 스트레스 경보등</span>
            </h3>
            <p className="font-sans text-xs text-gray-500 mb-4">
              스트레스를 받을 때 나에게 주로 나타나는 반응은 무엇인가요? (복수 선택)
            </p>

            <div className="flex flex-wrap gap-2">
              {stressSignals.map((sig) => {
                const isSelected = selectedSignals.includes(sig);
                return (
                  <button
                    key={sig}
                    type="button"
                    onClick={() => toggleSignal(sig)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-badge font-bold transition ${
                      isSelected
                        ? "bg-[#D86B27] text-white shadow-xs scale-102"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {sig}
                  </button>
                );
              })}
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#단단해질_내_마음", "#바꿀_수_있는_것에_집중", "#지나간_시험은_안녕", "#내_마음의_주인공은_나"]}
            onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
            onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
            guideText="스트레스를 지혜롭게 마주하는 나만의 수업 목표를 해시태그로 적어보세요."
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#D86B27] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#B8571C] active:scale-95"
            >
              <span>통제 분리 활동 하러 가기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (통제 분리 바구니 챌린지) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D86B27]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#D86B27] text-white text-xs font-badge font-bold rounded-full">
                  💡 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  스트레스! 무섭지 않아 (통제 분리 바구니)
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#D86B27]" />
            </div>

            {/* Comic Illustration View */}
            <div className="p-4 bg-[#FFF8F3] rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-orange-300 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                📝
              </div>
              <div className="space-y-1">
                <span className="text-xs font-badge font-bold text-[#D86B27]">
                  교재 슬라이드 삽화 속 지혜:
                </span>
                <p className="font-hand text-sm text-gray-800 leading-relaxed">
                  &ldquo;이번에도 70점이구나. 그래도 이번 시험을 통해서 나는 나에게 맞는 공부 방법을 찾았어. 다음에는 더 잘할 수 있을 거야!&rdquo;
                </p>
                <p className="text-[11px] font-sans text-gray-500 italic">
                  - 바꿀 수 없는 것을 받아들이는 평온함과, 바꿀 수 있는 것을 바꾸는 용기 -
                </p>
              </div>
            </div>

            {/* 6 Items Classification Grid */}
            <div className="space-y-3">
              <span className="text-xs font-badge font-bold text-gray-800 block">
                ✦ 6가지 스트레스 항목을 올바른 바구니로 분류해 보세요:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {initialItems.map((item) => {
                  const currentBasket = sortingState[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-2"
                    >
                      <span className="font-title text-xs sm:text-sm font-bold text-gray-900">
                        {item.title}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleItemSort(item.id, "unchangeable")}
                          className={`px-2 py-1 rounded-lg text-[11px] font-badge font-bold transition ${
                            currentBasket === "unchangeable"
                              ? "bg-stone-700 text-white"
                              : "bg-white text-gray-500 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          📦 바꿀 수 없음
                        </button>
                        <button
                          type="button"
                          onClick={() => handleItemSort(item.id, "changeable")}
                          className={`px-2 py-1 rounded-lg text-[11px] font-badge font-bold transition ${
                            currentBasket === "changeable"
                              ? "bg-[#D86B27] text-white shadow-xs"
                              : "bg-white text-gray-500 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          💡 바꿀 수 있음
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Plan Text */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                &lsquo;내가 바꿀 수 있는 것&rsquo; 1줄 실천 다짐 작성
              </label>
              <textarea
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
                placeholder="예: 부모님의 잔소리는 내가 바꿀 수 없지만, 잔소리를 들었을 때 욱하지 않고 '알겠어요'라고 답하는 내 말투는 바꿀 수 있어!"
                rows={2}
                className="w-full p-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D86B27] font-hand leading-relaxed"
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#D86B27] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#B8571C] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#D86B27]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 스트레스 상황에서 바꿀 수 있는 것과 없는 것을 구별할 수 있게 되었나요?
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
                  Q2. 바꿀 수 없는 것에 얽매이지 않고 내가 할 수 있는 행동에 집중할 용기가 생겼나요?
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

          <div className="bg-gradient-to-r from-[#FFF3EB] to-[#FDE8DB] rounded-2xl p-5 border border-[#D86B27]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#D86B27] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#D86B27]">
              [스트레스 분리수거 챌린지]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 한 주 동안 스트레스를 받을 때, 노트나 폰에 '내가 바꿀 수 있는 것인가?'를 먼저 적어보고 바꿀 수 있는 행동 딱 1가지만 실행해 보기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#D86B27]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>7차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="바꿀 수 없는 것에 대한 집착을 내려놓고, 내가 바꿀 수 있는 것에 집중하며 느낀 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D86B27] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#D86B27]" />
                <span>오늘 완성한 다짐 카드나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#D86B27]">
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
                <span>7차시 감정일기와 스트레스 통제 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 8차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D86B27] to-orange-700 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-orange-700/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>7차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
