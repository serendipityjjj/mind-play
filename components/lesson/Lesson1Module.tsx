"use client";

import React, { useState } from "react";
import { LessonMetadata } from "@/lib/curriculum";
import { EmotionCloudPicker } from "@/components/common/EmotionCloudPicker";
import { TicketPunchCard } from "@/components/common/TicketPunchCard";
import { TTSPlayer } from "@/components/common/TTSPlayer";
import { getEmotionById, EmotionCloud } from "@/lib/emotions";
import { DiaryEntry } from "@/lib/storage";
import {
  Mail,
  Send,
  Lock,
  Unlock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle2,
  Image as ImageIcon,
  Heart,
  Bot,
  MessageCircle,
} from "lucide-react";

interface Lesson1ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson1Module: React.FC<Lesson1ModuleProps> = ({
  lesson,
  nickname,
  initialData,
  onSave,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(true);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    { sender: "bot", text: `안녕, ${nickname}! 오늘 첫 시간이야! 미래의 나에게 보내는 편지에 어떤 다짐을 적고 싶니?` },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Residents & Hashtags)
  const defaultResidentOptions = [
    "설렘",
    "피곤해",
    "답답함",
    "두근거림",
    "평온함",
    "짜증",
    "조마조마",
    "급식 메뉴",
    "친구 눈치",
    "시험 걱정",
    "단톡방",
    "체육 시간",
    "게임 랭크",
  ];
  const [selectedResidents, setSelectedResidents] = useState<string[]>(
    initialData?.interactiveData?.residents || ["설렘", "새로운 시작"]
  );
  const [customResident, setCustomResident] = useState("");
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#새로운_시작", "#마음아_반가워"]
  );

  // Step 3 State (Time Capsule)
  const [timeCapsule, setTimeCapsule] = useState({
    currentWorry: initialData?.interactiveData?.timeCapsule?.currentWorry || "",
    wish: initialData?.interactiveData?.timeCapsule?.wish || "",
    futureLetter: initialData?.interactiveData?.timeCapsule?.futureLetter || "",
    isSealed: initialData?.interactiveData?.timeCapsule?.isSealed || false,
  });
  const [showSealedModal, setShowSealedModal] = useState(false);

  // Step 4 State (Self Evaluation & Diary)
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

  // Chatbot submission handler
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
          lessonNo: 1,
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
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `멋진 다짐이야, ${nickname}! 우리 함께 15주 동안 마음을 튼튼하게 키워보자 🌸`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Tag selection helper
  const toggleResident = (tag: string) => {
    if (selectedResidents.includes(tag)) {
      setSelectedResidents(selectedResidents.filter((t) => t !== tag));
    } else {
      if (selectedResidents.length >= 5) {
        alert("입주민 단어는 최대 5개까지 선택할 수 있어요!");
        return;
      }
      setSelectedResidents([...selectedResidents, tag]);
    }
  };

  const handleAddCustomResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (customResident.trim() && !selectedResidents.includes(customResident.trim())) {
      setSelectedResidents([...selectedResidents, customResident.trim()]);
      setCustomResident("");
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Final Save Handler
  const handleSaveAll = () => {
    const entry: DiaryEntry = {
      id: initialData?.id || `entry-1-${Date.now()}`,
      lessonNo: 1,
      lessonTitle: lesson.topic,
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "1차시 마음교육을 시작하며 내 마음의 감정들을 돌아보았다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        residents: selectedResidents,
        timeCapsule,
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Spring Note Banner Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-deepgreen/20 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-deepgreen-light via-white to-rosepink-light flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-deepgreen text-white text-xs font-badge rounded-md font-bold">
                1차시 • {lesson.area}
              </span>
              <span className="text-xs text-gray-500 font-sans">{lesson.workbookPages}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              {lesson.topic}
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">{lesson.goal}</p>
          </div>

          {/* 4 Steps Indicator Tabs */}
          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "마음 만나기" },
              { num: 3, label: "타임캡슐" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-deepgreen text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {s.num}. {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          STEP 1: 오늘의 마음 편지 (열기) & 챗봇 인터뷰
         ========================================================================= */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Post Mailbox & Envelope */}
          <div className="bg-gradient-to-br from-[#FEFAF6] to-[#FFF5F7] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#E5A8B5] shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-rosepink text-white text-xs font-badge font-bold rounded-full">
                  #편지 다시 읽기
                </span>
              </div>
              <TTSPlayer text={lesson.letterContent} themeColor="#C44D62" />
            </div>

            {/* Letter Paper Body */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-sm border border-rosepink/20 transition-all duration-300 ${
                isLetterOpen ? "opacity-100" : "opacity-80 scale-98"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rosepink-light text-rosepink flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  💌
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 마음이가 보내는 첫 번째 편지야
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;{lesson.letterContent}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong Interview ('마음이') */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-deepgreen/20 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-deepgreen" />
                <span className="font-title text-sm font-bold text-deepgreen">
                  마음이와의 1차시 인터뷰
                </span>
                <span className="text-[11px] text-gray-400 font-sans">
                  (2~3회 편안하게 대화해 보세요)
                </span>
              </div>

              {/* Chat messages log */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 mb-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-deepgreen text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-deepgreen text-white rounded-tr-none"
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

              {/* Chat Input Form */}
              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="마음이에게 답장하기 (예: 15주 동안 나를 더 사랑하고 싶어!)"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-deepgreen text-white rounded-xl text-xs font-badge font-bold hover:bg-deepgreen-hover disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Next Step Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-deepgreen text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-deepgreen-hover transition active:scale-95"
              >
                <span>내 마음 들여다보러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: 마음 만나기 (입주민 태그 & 해시태그)
         ========================================================================= */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Activity A: Residents Tag Picker */}
          <div className="bg-white rounded-2xl p-6 border border-deepgreen/20 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>🏠</span>
                  <span>활동 A: 내 마음에 살고 있는 입주민 찾기</span>
                </h3>
                <p className="font-sans text-xs text-gray-500 mt-0.5">
                  지금 내 머릿속과 마음을 맴도는 단어는 무엇인가요? (최대 5개 선택)
                </p>
              </div>
              <span className="text-xs font-badge text-deepgreen bg-deepgreen-light px-2.5 py-1 rounded-full">
                선택됨: {selectedResidents.length}/5
              </span>
            </div>

            {/* Chips Container */}
            <div className="flex flex-wrap gap-2 my-4">
              {defaultResidentOptions.map((tag) => {
                const isSelected = selectedResidents.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleResident(tag)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-badge font-bold transition-all ${
                      isSelected
                        ? "bg-deepgreen text-white scale-105 shadow-sm border border-deepgreen"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Custom Resident Add Form */}
            <form onSubmit={handleAddCustomResident} className="flex gap-2 max-w-sm mt-3">
              <input
                type="text"
                value={customResident}
                onChange={(e) => setCustomResident(e.target.value)}
                placeholder="직접 단어 추가하기 (예: 동아리 축제)"
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-gray-700 text-white text-xs font-badge rounded-xl hover:bg-gray-800"
              >
                추가
              </button>
            </form>
          </div>

          {/* Activity B: Ticket Punch Hashtags */}
          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={lesson.hashtags}
            onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
            onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
          />

          {/* Navigation Controls */}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-deepgreen text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-deepgreen-hover active:scale-95"
            >
              <span>디지털 타임캡슐 쓰러 가기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 3: 마음 키우기 (디지털 타임캡슐 편지 쓰기 & 자물쇠 봉인)
         ========================================================================= */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#FAF8F5] to-[#FFF9F5] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#E3BFA0] shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-[#8B5E3C] text-white text-xs font-badge font-bold rounded-full">
                  ⏳ 15차시 종강 연동 디지털 타임캡슐
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  미래의 나에게 보내는 편지
                </h3>
              </div>
              <div className="text-3xl">🔒</div>
            </div>

            <p className="font-hand text-sm text-gray-600 mb-6">
              오늘 작성한 이 편지는 안전하게 보관되어, 15차시 마지막 수업 날 개봉됩니다. 솔직한 속마음을 담아보세요.
            </p>

            {/* 3-Step Letter Form */}
            <div className="space-y-4 bg-white/90 p-5 rounded-2xl border border-[#E3BFA0]/50 shadow-inner">
              {/* ① Current Worry */}
              <div>
                <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                  ① [현재의 나] 요즘 나를 가장 고민스럽게 하거나 신경 쓰이게 하는 일은?
                </label>
                <textarea
                  value={timeCapsule.currentWorry}
                  onChange={(e) => setTimeCapsule({ ...timeCapsule, currentWorry: e.target.value })}
                  placeholder="예: 새로운 반에서 어색한 친구들과 어떻게 친해져야 할지 막막해."
                  rows={2}
                  className="w-full p-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B5E3C] font-hand leading-relaxed"
                />
              </div>

              {/* ② Wish */}
              <div>
                <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                  ② [바라는 점] 마음플레이 수업을 통해 어떤 감정을 털어내거나 배우고 싶니?
                </label>
                <textarea
                  value={timeCapsule.wish}
                  onChange={(e) => setTimeCapsule({ ...timeCapsule, wish: e.target.value })}
                  placeholder="예: 사소한 말에 상처받지 않고 쿨하게 넘길 수 있는 단단한 마음을 갖고 싶어."
                  rows={2}
                  className="w-full p-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B5E3C] font-hand leading-relaxed"
                />
              </div>

              {/* ③ Letter to Future Self */}
              <div>
                <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                  ③ [미래의 나에게] 15주 뒤, 15차시를 마친 나에게 건네는 응원의 한마디!
                </label>
                <textarea
                  value={timeCapsule.futureLetter}
                  onChange={(e) => setTimeCapsule({ ...timeCapsule, futureLetter: e.target.value })}
                  placeholder="예: 포기하지 않고 감정을 마주한 네가 정말 자랑스러워! 15주 동안 수고 많았어."
                  rows={3}
                  className="w-full p-3 text-xs sm:text-sm bg-[#FAF6F0] border border-[#8B5E3C]/30 rounded-xl focus:outline-none focus:border-[#8B5E3C] font-hand leading-relaxed"
                />
              </div>
            </div>

            {/* Seal Capsule Button */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setTimeCapsule({ ...timeCapsule, isSealed: true });
                  setShowSealedModal(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#8B5E3C] text-white rounded-2xl font-badge font-bold text-sm shadow-md hover:bg-[#724C2F] transition active:scale-95"
              >
                <Lock className="w-4 h-4" />
                <span>타임캡슐 봉인하기</span>
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Sealed Modal Popup */}
          {showSealedModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl animate-scale-in border-4 border-[#8B5E3C]/20">
                <div className="w-16 h-16 rounded-full bg-[#FAF0E6] text-[#8B5E3C] flex items-center justify-center mx-auto text-3xl animate-bounce">
                  🔒
                </div>
                <h3 className="font-title text-xl font-bold text-gray-900">
                  타임캡슐이 안전하게 봉인되었습니다!
                </h3>
                <p className="font-hand text-sm text-gray-600 leading-relaxed">
                  &ldquo;이 편지는 15차시 수료일에 자동으로 잠금 해제됩니다. 그때까지 너의 마음이 얼마나 자라날지 함께 지켜보자!&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowSealedModal(false);
                    setStep(4);
                  }}
                  className="w-full py-2.5 bg-[#8B5E3C] text-white rounded-xl font-badge font-bold text-sm hover:bg-[#724C2F] transition"
                >
                  확인하고 감정일기 작성하러 가기 ➔
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-deepgreen text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-deepgreen-hover active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 4: 마음 다지기 (자기평가 & 미션 & 8대 감정일기 출석)
         ========================================================================= */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Section 1: Self-Evaluation Stars */}
          <div className="bg-white rounded-2xl p-5 border border-deepgreen/20 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              {/* Question 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. {lesson.selfEvaluation.q1}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEvalStars({ ...evalStars, q1: star })}
                      className="p-1 text-xl transition transform hover:scale-125"
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

              {/* Question 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q2. {lesson.selfEvaluation.q2}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEvalStars({ ...evalStars, q2: star })}
                      className="p-1 text-xl transition transform hover:scale-125"
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

          {/* Section 2: Weekly Mission Card */}
          <div className="bg-gradient-to-r from-deepgreen-light to-[#E8F4EC] rounded-2xl p-5 border border-deepgreen/30 shadow-xs">
            <div className="flex items-center gap-2 text-deepgreen font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-deepgreen">
              {lesson.weeklyMission.title}
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;{lesson.weeklyMission.tip}&rdquo;
            </p>
          </div>

          {/* Section 3: 8 Emotion Cloud Character Picker */}
          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          {/* Section 4: 3-Line Diary & Image Upload */}
          <div className="bg-white rounded-2xl p-5 border border-deepgreen/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📝</span>
                <span>1차시 3줄 마음일기 & 사진 기록</span>
              </h3>
              <span className="text-xs font-badge text-gray-400">
                8대 감정과 함께 기록하기
              </span>
            </div>

            {/* 3-line diary text area */}
            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="오늘 1차시 수업을 마치며 느낀 솔직한 감정과 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand leading-relaxed"
            />

            {/* Image upload UI */}
            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-deepgreen" />
                <span>오늘의 감정을 잘 표현하는 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-deepgreen">
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

          {/* Success Banner */}
          {isSavedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs sm:text-sm font-badge flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>1차시 감정일기와 활동 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  2차시로 이동 ➔
                </button>
              )}
            </div>
          )}

          {/* Bottom Actions */}
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-deepgreen to-[#358B58] text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-deepgreen/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>1차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
