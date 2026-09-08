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
  MessageSquareQuote,
  Sun,
  X,
  HelpCircle,
} from "lucide-react";

interface Lesson11ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson11Module: React.FC<Lesson11ModuleProps> = ({
  lesson,
  nickname,
  initialData,
  onSave,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [showFableModal, setShowFableModal] = useState(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: `안녕, ${nickname}! 화가 나거나 서운해서 내 진짜 속마음과는 달리 뾰족한 말이 툭 튀어나와 친구와 오해가 생겼던 적이 있니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Comic Reflection 3 Questions & Hashtags)
  const [comicAnswers, setComicAnswers] = useState({
    q1: initialData?.interactiveData?.customData?.q1Answer || "미안했지만 심한 공격을 받아 억울하고 기분이 상했을 것 같다.",
    q2: initialData?.interactiveData?.customData?.q2Answer || "화를 내긴 했지만 말이 너무 심했나 싶어 후회되고 찝찝했을 것 같다.",
    q3: initialData?.interactiveData?.customData?.q3Answer || "오래 기다려서 지쳤고, 네가 안 와서 무슨 일 있나 걱정됐어.",
  });
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#화가_난다고_함부로_말하지_않기", "#상대방을_존중하면서_대화하기", "#말도_상처가_될_수_있어"]
  );

  // Step 3 State ('나사감바' 4-Block Builder)
  const [nasagamba, setNasagamba] = useState({
    na: "나는",
    sa: initialData?.interactiveData?.customData?.sa || "약속 시간보다 30분 늦게 왔을 때",
    gam: initialData?.interactiveData?.customData?.gam || "오래 기다리며 답답했고 네가 다친 건 아닌지 걱정됐어.",
    ba: initialData?.interactiveData?.customData?.ba || "다음엔 늦을 것 같으면 출발할 때 미리 톡 하나만 남겨줘.",
  });

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
          lessonNo: 11,
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
          text: `뾰족한 가시 대신 따뜻한 진심을 전하는 '나사감바' 대화법으로 마음을 전해 보자 🌸`,
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
      id: initialData?.id || `entry-11-${Date.now()}`,
      lessonNo: 11,
      lessonTitle: "11. 진짜 마음을 전할래요",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "11차시 '나사감바' 대화법을 연습하며 상처 주지 않고 진심을 전하는 법을 익혔다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          q1Answer: comicAnswers.q1,
          q2Answer: comicAnswers.q2,
          q3Answer: comicAnswers.q3,
          nasagambaText: `${nasagamba.na} 네가 ${nasagamba.sa}, 나는 ${nasagamba.gam} 그러니 ${nasagamba.ba}`,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 11차시 딥 포레스트 그린 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#1F6B38]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#EEF6F0] via-white to-emerald-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#1F6B38] text-white text-xs font-badge rounded-md font-bold">
                11차시 • 영역 ➎ 건강한 관계 맺기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 11차시</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              11. 진짜 마음을 전할래요 (올바르게 대화하기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              상대방에게 상처를 주지 않으면서 나의 생각과 감정을 솔직하게 표현하고 실천해 봅니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "만화 성찰" },
              { num: 3, label: "나사감바 대화법" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#1F6B38] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#EEF6F0] to-[#DCF0E2] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#1F6B38]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#1F6B38] text-white text-xs font-badge font-bold rounded-full">
                  [오늘의 마음 편지] 오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="가끔 내 마음과 다른 말이 나와 버려서 친구와 오해가 생긴 적이 있지? 그럴 땐 너의 마음의 소리를 있는 그대로 전해 봐. 분명 친구도 너의 진심을 알아줄 거야!"
                themeColor="#1F6B38"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1F6B38]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF6F0] text-[#1F6B38] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  💌
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 내 마음의 소리를 있는 그대로 전해볼까?
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;가끔 내 마음과 다른 말이 나와 버려서 친구와 오해가 생긴 적이 있지? 그럴 땐 너의 마음의 소리를 있는 그대로 전해 봐. 분명 친구도 너의 진심을 알아줄 거야!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#1F6B38]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#1F6B38]" />
                <span className="font-title text-sm font-bold text-[#1F6B38]">
                  마음이와의 11차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#1F6B38] text-white rounded-tr-none"
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
                  placeholder="예: 친구가 장난을 쳐서 순간 '너 진짜 짜증나!'라고 쏘아붙였어."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1F6B38] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#1F6B38] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#154E28] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1F6B38] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#154E28] transition active:scale-95"
              >
                <span>어떻게 대화하고 있는지 보러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 (만화 상황 뷰 & 3대 질문) */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#1F6B38]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-[#1F6B38]" />
              <span>[마음 만나기] 여러분은 어떻게 대화하고 있나요?</span>
            </h3>

            {/* Comic Scenario Box */}
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-badge text-rose-700 font-bold">
                <span>📖 슬라이드 만화 속 A의 뾰족한 말:</span>
                <span>(너-전달법 You-Message)</span>
              </div>
              <p className="font-hand text-sm sm:text-base text-rose-950 leading-relaxed font-bold bg-white p-3 rounded-xl border border-rose-200">
                &ldquo;너 왜 이렇게 늦었어? 지금 날 무시하는 거야? 너 때문에 시간 낭비했잖아! 너 진짜 나쁜 애구나. 다음에도 약속 안 지키면 거짓말쟁이라고 소문낼 거다!&rdquo;
              </p>
            </div>

            {/* 3 Reflection Questions */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-badge font-bold text-gray-700 mb-1">
                  Q1. A의 말을 듣고 있는 B는 어떤 마음이 들었을까요?
                </label>
                <input
                  type="text"
                  value={comicAnswers.q1}
                  onChange={(e) => setComicAnswers({ ...comicAnswers, q1: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-hand"
                />
              </div>

              <div>
                <label className="block text-xs font-badge font-bold text-gray-700 mb-1">
                  Q2. A는 말을 하고 나서 어떤 마음이 들었을까요?
                </label>
                <input
                  type="text"
                  value={comicAnswers.q2}
                  onChange={(e) => setComicAnswers({ ...comicAnswers, q2: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-hand"
                />
              </div>

              <div>
                <label className="block text-xs font-badge font-bold text-gray-700 mb-1">
                  Q3. A가 B에게 정말로 하고 싶었던 진짜 속마음은 무엇이었을까요?
                </label>
                <input
                  type="text"
                  value={comicAnswers.q3}
                  onChange={(e) => setComicAnswers({ ...comicAnswers, q3: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-hand"
                />
              </div>
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#화가_난다고_함부로_말하지_않기", "#상대방을_존중하면서_대화하기", "#말도_상처가_될_수_있어", "#대화도_연습이_필요해"]}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1F6B38] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#154E28] active:scale-95"
            >
              <span>나사감바 대화법 연습하기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 ('나사감바' 대화법 빌더) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F6B38]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#1F6B38] text-white text-xs font-badge font-bold rounded-full">
                  💬 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  너-전달법 ➔ &lsquo;나사감바&rsquo; 대화법 변환 훈련기
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFableModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#EEF6F0] text-[#1F6B38] rounded-xl text-xs font-badge font-bold hover:bg-[#1F6B38] hover:text-white transition"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>해님과 바람 이야기</span>
              </button>
            </div>

            {/* 4 Nasagamba Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-hand">
              {/* [나] */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1F6B38] block">
                  1. [나] 주어를 &lsquo;너&rsquo;가 아닌 &lsquo;나는&rsquo;으로 시작하기
                </span>
                <input
                  type="text"
                  value={nasagamba.na}
                  disabled
                  className="w-full p-2 bg-gray-100 border border-gray-200 rounded-xl font-bold text-[#1F6B38]"
                />
              </div>

              {/* [사(사실)] */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1F6B38] block">
                  2. [사(사실)] 비난 없이 객관적 사실만 말하기
                </span>
                <input
                  type="text"
                  value={nasagamba.sa}
                  onChange={(e) => setNasagamba({ ...nasagamba, sa: e.target.value })}
                  placeholder="예: 약속 시간보다 30분 늦게 왔을 때"
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>

              {/* [감(감정)] */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1F6B38] block">
                  3. [감(감정)] 솔직한 내 감정 표현하기
                </span>
                <input
                  type="text"
                  value={nasagamba.gam}
                  onChange={(e) => setNasagamba({ ...nasagamba, gam: e.target.value })}
                  placeholder="예: 오래 기다리며 답답했고 네가 다친 건 아닌지 걱정됐어."
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>

              {/* [바(바람)] */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1F6B38] block">
                  4. [바(바람)] 구체적인 요청 및 바람 전달하기
                </span>
                <input
                  type="text"
                  value={nasagamba.ba}
                  onChange={(e) => setNasagamba({ ...nasagamba, ba: e.target.value })}
                  placeholder="예: 다음엔 늦을 것 같으면 출발할 때 미리 톡 하나만 남겨줘."
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* Clean Converted Speech Bubble Card */}
            <div className="p-6 bg-gradient-to-b from-[#EEF6F0] to-[#DCF0E2] rounded-3xl border-2 border-dashed border-[#1F6B38]/40 text-center space-y-3">
              <span className="text-xs font-badge text-[#1F6B38] font-bold block">
                🌱 따뜻하게 완성된 &lsquo;나사감바&rsquo; 진심 대화 카드
              </span>
              <p className="font-hand text-base sm:text-lg text-gray-800 font-bold leading-relaxed max-w-lg mx-auto">
                &ldquo;{nasagamba.na} 네가 <span className="text-[#1F6B38]">{nasagamba.sa}</span>, 나는 <span className="text-rosepink">{nasagamba.gam}</span> 그러니 <span className="text-blue-700">{nasagamba.ba}</span>&rdquo;
              </p>
              <span className="inline-block text-xs font-badge text-[#1F6B38] bg-white px-3 py-1 rounded-full shadow-2xs">
                ✨ 상대방을 공격하지 않고도 내 진심이 가장 정확하게 전해집니다!
              </span>
            </div>
          </div>

          {/* Fable Modal */}
          {showFableModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl animate-scale-in border-4 border-[#1F6B38]/30">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="font-title text-lg font-bold text-[#1F6B38]">
                    ☀️ 해님과 바람 이야기
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowFableModal(false)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="font-hand text-xs sm:text-sm text-gray-700 leading-relaxed">
                  나그네의 외투를 벗긴 것은 매섭고 차가운 바람(비난과 공격적인 너-전달법)이 아니었어요. 온화하고 부드럽게 내리쬔 따스한 햇살(존중과 솔직한 나-전달법)이 나그네의 마음을 열고 외투를 스스로 벗게 만들었답니다!
                </p>
                <button
                  type="button"
                  onClick={() => setShowFableModal(false)}
                  className="w-full py-2 bg-[#1F6B38] text-white rounded-xl font-badge font-bold text-sm hover:bg-[#154E28] transition"
                >
                  확인했어요 ➔
                </button>
              </div>
            </div>
          )}

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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1F6B38] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#154E28] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#1F6B38]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 감정적으로 쏘아붙이지 않고 나의 진짜 속마음을 올바르게 전달할 수 있나요?
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
                  Q2. 대화할 때 상대방을 존중하는 태도의 중요성을 깨달았나요?
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

          <div className="bg-gradient-to-r from-[#EEF6F0] to-[#DCF0E2] rounded-2xl p-5 border border-[#1F6B38]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#1F6B38] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#1F6B38]">
              [하루 한 번 &lsquo;나-전달법(나사감바)&rsquo; 실천 챌린지]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 한 주 동안 친구나 가족에게 서운한 마음이 들 때, '너 왜 그래?' 대신 '나는 ~해서 속상했어, 다음엔 ~해줄래?'라고 말해보기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#1F6B38]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>11차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="나사감바 대화법을 배우고 나의 솔직한 진심을 예쁘게 전해본 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1F6B38] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#1F6B38]" />
                <span>오늘 완성한 나사감바 카드나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#1F6B38]">
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
                <span>11차시 감정일기와 나사감바 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 12차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1F6B38] to-emerald-800 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-800/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>11차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
