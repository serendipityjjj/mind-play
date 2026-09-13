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
  HelpCircle,
  Check,
} from "lucide-react";

interface Lesson13ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson13Module: React.FC<Lesson13ModuleProps> = ({
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
      text: `안녕, ${nickname}! 초등학교 때와 달리 요즘 스스로 선택하고 결정해야 하는 일(공부 계획, 용돈 쓰기, 친구와의 약속 등) 중에 가장 고민되는 것은 뭐야?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Dilemma Q1 & Q2, Hashtags)
  const [dilemmaAnswers, setDilemmaAnswers] = useState({
    q1: initialData?.interactiveData?.customData?.dilemmaQ1 || "유혹을 이기지 못하고 수행평가를 팽개친 채 밤새 게임만 하기",
    q2: initialData?.interactiveData?.customData?.dilemmaQ2 || "수행평가 점수를 망치고, 다음 날 수업 시간에 졸려 집중하지 못하며 후회와 자책감이 든다.",
  });
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#선택의_결과를_생각하기", "#후회_없는_선택", "#내_결정에_책임지기"]
  );

  // Step 3 State (Scale of Choice Simulator)
  const [optionA, setOptionA] = useState({
    title: "지금 밤새 게임하고 내일 아침 대충 하기",
    result: "지각 및 낮은 수행평가 점수, 자책감",
  });
  const [optionB, setOptionB] = useState({
    title: "수행평가를 1시간 집중해서 끝낸 뒤 친구에게 양해 구하고 30분만 게임하기",
    result: "과제 완수 후 홀가분함과 당당한 만족감",
  });
  const [finalChoice, setFinalChoice] = useState<"A" | "B">("B");
  const [isChoiceStamped, setIsChoiceStamped] = useState(false);

  // Step 4 State (Evaluation & Diary)
  const [evalStars, setEvalStars] = useState({
    q1: initialData?.evalStars?.q1 || 5,
    q2: initialData?.evalStars?.q2 || 5,
  });
  const [selectedEmotionId, setSelectedEmotionId] = useState<string>(
    initialData?.emotionId || "proud_happy"
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
          lessonNo: 13,
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
          text: `선택의 기로에 섰을 땐 결과를 미리 상상해보는 저울질이 큰 힘이 돼! 함께 현명한 선택을 내려보자 ⚖️`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
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
      id: initialData?.id || `entry-13-${Date.now()}`,
      lessonNo: 13,
      lessonTitle: "13. 현명한 선택을 하려면",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "13차시 양팔 저울 시뮬레이터를 통해 충동적인 유혹 대신 책임 있는 최선의 결정을 내렸다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          dilemmaQ1: dilemmaAnswers.q1,
          dilemmaQ2: dilemmaAnswers.q2,
          finalChoice: finalChoice === "A" ? optionA.title : optionB.title,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 13차시 딥 틸/청록 블루 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#00657C]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#E8F5F8] via-white to-cyan-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#00657C] text-white text-xs font-badge rounded-md font-bold">
                13차시 • 영역 ➏ 책임감 있게 결정하기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 13차시</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              13. 현명한 선택을 하려면 (책임감 있는 결정하기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              자신의 선택에 따른 결과를 예측하여 최선의 해결 방안을 선택하고 책임지는 태도를 기릅니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "결과 예측" },
              { num: 3, label: "선택 저울" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#00657C] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#E8F5F8] to-[#D0EDF2] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#00657C]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#00657C] text-white text-xs font-badge font-bold rounded-full">
                  [오늘의 마음 편지] 오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="중학생이 되고 난 후 직접 고민하고 결정해야 하는 일이 많아졌지? 오늘부터 너의 선택이 최고의 선택이 될 거야!"
                themeColor="#00657C"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#00657C]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5F8] text-[#00657C] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  ⚖️
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 너의 선택이 최고의 선택이 될 거야
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;중학생이 되고 난 후 직접 고민하고 결정해야 하는 일이 많아졌지? 오늘부터 너의 선택이 최고의 선택이 될 거야!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#00657C]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#00657C]" />
                <span className="font-title text-sm font-bold text-[#00657C]">
                  마음이와의 13차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#00657C] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#00657C] text-white rounded-tr-none"
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
                  placeholder="예: 시험 기간에 스마트폰을 끊는 게 너무 어려워."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00657C] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#00657C] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#004C5E] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00657C] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#004C5E] transition active:scale-95"
              >
                <span>책임감 만나러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#00657C]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🤔</span>
              <span>[마음 만나기] 책임감 없이 결정하고 행동한다면?</span>
            </h3>

            {/* Dilemma Case */}
            <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-200 text-xs font-hand text-cyan-950 leading-relaxed">
              <strong>📖 중학생 공감 딜레마 상황:</strong> &ldquo;내일이 수행평가 제출일인데, 친구가 새로 나온 온라인 게임을 오늘 밤새워 같이 하자고 유혹한다!&rdquo;
            </div>

            {/* 2 Reflection Questions */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-badge font-bold text-gray-700 mb-1">
                  Q1. 이 상황에서 나타날 수 있는 &lsquo;책임감 없는 행동&rsquo;은 무엇일까요?
                </label>
                <input
                  type="text"
                  value={dilemmaAnswers.q1}
                  onChange={(e) => setDilemmaAnswers({ ...dilemmaAnswers, q1: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-hand"
                />
              </div>

              <div>
                <label className="block text-xs font-badge font-bold text-gray-700 mb-1">
                  Q2. 책임감 없는 행동을 했을 때 나중에 어떤 결과가 나타날까요?
                </label>
                <input
                  type="text"
                  value={dilemmaAnswers.q2}
                  onChange={(e) => setDilemmaAnswers({ ...dilemmaAnswers, q2: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-hand"
                />
              </div>
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#선택의_결과를_생각하기", "#내_주위_도움_자원_생각해보기", "#후회_없는_선택", "#내_결정에_책임지기"]}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00657C] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#004C5E] active:scale-95"
            >
              <span>선택 저울질 시뮬레이터 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (선택 저울질 시뮬레이터) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#00657C]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#00657C] text-white text-xs font-badge font-bold rounded-full">
                  ⚖️ 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  나의 선택 저울질 시뮬레이터
                </h3>
              </div>
              <Scale className="w-6 h-6 text-[#00657C]" />
            </div>

            {/* 4 Steps Guide Summary */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-badge text-gray-700 space-y-1">
              <span className="font-bold text-[#00657C] block mb-1">💡 책임 있는 의사결정 4단계:</span>
              <p>1단계: 문제 확인 ➔ 2단계: 선택지 나열 ➔ 3단계: 결과 예측 ➔ 4단계: 최선의 선택 실행 및 책임지기</p>
            </div>

            {/* Scale Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A (Short-term) */}
              <div
                onClick={() => setFinalChoice("A")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  finalChoice === "A"
                    ? "bg-rose-50 border-rose-400 ring-2 ring-rose-300"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xs font-badge text-rose-700 font-bold block mb-1">
                  선택지 A (단기적 쾌락/편한 선택)
                </span>
                <input
                  type="text"
                  value={optionA.title}
                  onChange={(e) => setOptionA({ ...optionA, title: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-hand font-bold mb-2"
                />
                <span className="text-[11px] font-badge text-gray-500 block mb-0.5">예상 결과:</span>
                <p className="font-hand text-xs text-rose-900">{optionA.result}</p>
              </div>

              {/* Option B (Long-term value) */}
              <div
                onClick={() => setFinalChoice("B")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  finalChoice === "B"
                    ? "bg-[#E8F5F8] border-[#00657C] ring-2 ring-[#00657C]/20"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xs font-badge text-[#00657C] font-bold block mb-1">
                  선택지 B (장기적 가치/책임 있는 선택 ✨ 추천)
                </span>
                <input
                  type="text"
                  value={optionB.title}
                  onChange={(e) => setOptionB({ ...optionB, title: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-hand font-bold mb-2"
                />
                <span className="text-[11px] font-badge text-gray-500 block mb-0.5">예상 결과:</span>
                <p className="font-hand text-xs text-cyan-950 font-bold">{optionB.result}</p>
              </div>
            </div>

            {/* Stamp Decision */}
            <div className="p-6 bg-gradient-to-b from-[#E8F5F8] to-[#D0EDF2] rounded-3xl border-2 border-dashed border-[#00657C]/40 text-center space-y-3">
              <span className="text-xs font-badge text-[#00657C] font-bold block">
                {nickname}의 최종 선택 저울 카드
              </span>
              <p className="font-hand text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                &ldquo;나의 최종 선택은 <span className="text-[#00657C]">[{finalChoice === "A" ? optionA.title : optionB.title}]</span>입니다! 이 선택에 따르는 결과는 내가 기쁘게 책임집니다.&rdquo;
              </p>

              <button
                type="button"
                onClick={() => setIsChoiceStamped(true)}
                className="px-5 py-2 bg-[#00657C] hover:bg-[#004C5E] text-white text-xs font-badge font-bold rounded-full shadow-md transition inline-flex items-center gap-1.5"
              >
                <Stamp className="w-4 h-4" />
                <span>최종 결정 도장 쾅 찍기</span>
              </button>

              {isChoiceStamped && (
                <p className="text-xs font-badge text-[#00657C] animate-bounce">
                  ✨ 현명하고 책임 있는 결정이 성공적으로 확정되었습니다!
                </p>
              )}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00657C] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#004C5E] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#00657C]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 충동적으로 결정하지 않고 선택의 결과를 먼저 깊이 생각해보았나요?
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
                  Q2. 혼자 결정하기 어려울 땐 주변 사람들에게 지혜롭게 도움을 청할 수 있나요?
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

          <div className="bg-gradient-to-r from-[#E8F5F8] to-[#D0EDF2] rounded-2xl p-5 border border-[#00657C]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#00657C] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#00657C]">
              [결정 전 5초 일시정지(Pause) & 결과 상상 챌린지]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 한 주 동안 중요한 선택의 순간이 오면, 딱 5초간 멈추고 '이 선택을 한 1시간 뒤, 내일의 나는 만족할까?' 스스로에게 질문해 보기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#00657C]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>13차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="선택의 저울질을 통해 책임감 있게 결정을 내린 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00657C] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#00657C]" />
                <span>오늘 완성한 선택 저울 카드나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#00657C]">
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
                <span>13차시 감정일기와 책임 있는 결정 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 14차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00657C] to-cyan-800 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-cyan-800/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>13차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
