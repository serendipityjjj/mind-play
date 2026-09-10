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
  Gem,
  Smile,
  Palette,
  Check,
} from "lucide-react";

interface Lesson2ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson2Module: React.FC<Lesson2ModuleProps> = ({
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
      text: `안녕, ${nickname}! 2차시에서는 나만의 숨은 멋진 강점 보석을 찾아볼 거야. 남들은 잘 모르는 너만의 특별한 매력이나 강점은 무엇이니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Strength Gems & Hashtags)
  const strengthCategories = [
    {
      category: "관계 / 소통",
      items: ["경청왕", "먼저 인사하기", "약속 지킴이", "분위기 메이커", "공감 요정"],
    },
    {
      category: "성실 / 자기관리",
      items: ["포기 안 함", "시간 엄수", "꼼꼼함", "정리정돈", "솔직 담백"],
    },
    {
      category: "호기심 / 재능",
      items: ["호기심 천국", "상상력 풍부", "손재주 좋음", "유머 감각", "열정 만수르"],
    },
  ];
  const [selectedGems, setSelectedGems] = useState<string[]>(
    initialData?.interactiveData?.gems || ["경청왕", "약속 지킴이", "솔직 담백"]
  );
  const [customGem, setCustomGem] = useState("");
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#나의_강점_찾아봐야지", "#있는_그대로_나를_사랑할_거야"]
  );

  // Step 3 State (Custom Mask Builder)
  const maskColors = [
    { name: "차분한 블루", hex: "#3B82F6", light: "#EFF6FF", border: "#93C5FD" },
    { name: "따뜻한 옐로우", hex: "#F59E0B", light: "#FFFBEB", border: "#FDE68A" },
    { name: "열정의 오렌지", hex: "#F97316", light: "#FFF7ED", border: "#FDBA74" },
    { name: "편안한 그린", hex: "#10B981", light: "#ECFDF5", border: "#A7F3D0" },
    { name: "신비로운 퍼플", hex: "#8B5CF6", light: "#F5F3FF", border: "#C4B5FD" },
    { name: "사랑스런 핑크", hex: "#EC4899", light: "#FDF2F8", border: "#FBCFE8" },
  ];
  const [maskColor, setMaskColor] = useState<string>(
    initialData?.interactiveData?.mask?.color || "#10B981"
  );
  const [maskSentence, setMaskSentence] = useState<string>(
    initialData?.interactiveData?.mask?.sentence ||
      "친구 이야기에 귀 기울이고 마음을 편안하게 해주는"
  );

  // Step 4 State (Evaluation & Diary)
  const [evalStars, setEvalStars] = useState({
    q1: initialData?.evalStars?.q1 || 5,
    q2: initialData?.evalStars?.q2 || 5,
  });
  const [selectedEmotionId, setSelectedEmotionId] = useState<string>(
    initialData?.emotionId || "joy"
  );
  const [diaryText, setDiaryText] = useState<string>(
    initialData?.diaryText || ""
  );
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    initialData?.imageUrl
  );
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Chat send handler
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
          lessonNo: 2,
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
          text: `정말 멋진 강점이네! 다른 사람과 비교하지 않고 너만의 보석을 잘 간직하자 ✨`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleGem = (gem: string) => {
    if (selectedGems.includes(gem)) {
      setSelectedGems(selectedGems.filter((g) => g !== gem));
    } else {
      if (selectedGems.length >= 3) {
        alert("강점 보석은 최대 3개까지 선택할 수 있어요!");
        return;
      }
      setSelectedGems([...selectedGems, gem]);
    }
  };

  const handleAddCustomGem = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGem.trim() && !selectedGems.includes(customGem.trim())) {
      if (selectedGems.length >= 3) {
        alert("강점 보석은 최대 3개까지 선택할 수 있어요!");
        return;
      }
      setSelectedGems([...selectedGems, customGem.trim()]);
      setCustomGem("");
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
      id: initialData?.id || `entry-2-${Date.now()}`,
      lessonNo: 2,
      lessonTitle: lesson.topic,
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "2차시 수업을 통해 나만의 소중한 강점 보석과 나다움 가면을 완성했다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        gems: selectedGems,
        mask: {
          color: maskColor,
          stickers: selectedGems,
          sentence: maskSentence,
        },
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
                2차시 • {lesson.area}
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
              { num: 2, label: "강점 보석" },
              { num: 3, label: "나다움 가면" },
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rosepink/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rosepink-light text-rosepink flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  💎
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 숨겨진 나만의 보석을 찾아볼까?
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;{lesson.letterContent}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong Interview */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-deepgreen/20 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-deepgreen" />
                <span className="font-title text-sm font-bold text-deepgreen">
                  마음이와의 2차시 인터뷰
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

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="예: 친구들 고민을 잘 들어주고 약속 시간을 꼭 지켜!"
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

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-deepgreen text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-deepgreen-hover transition active:scale-95"
              >
                <span>내 강점 찾으러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: 마음 만나기 (강점 보석함 & 해시태그)
         ========================================================================= */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Strength Gem Picker */}
          <div className="bg-white rounded-2xl p-6 border border-deepgreen/20 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Gem className="w-5 h-5 text-deepgreen" />
                  <span>활동 A: 나를 빛나게 하는 강점 보석함</span>
                </h3>
                <p className="font-sans text-xs text-gray-500 mt-0.5">
                  다음 중 나를 가장 잘 설명하는 강점 보석을 3가지 골라보세요.
                </p>
              </div>
              <span className="text-xs font-badge text-deepgreen bg-deepgreen-light px-2.5 py-1 rounded-full border border-deepgreen/20">
                선택됨: {selectedGems.length}/3
              </span>
            </div>

            {/* Categorized Strength Chips */}
            <div className="space-y-4 my-4">
              {strengthCategories.map((cat, idx) => (
                <div key={idx} className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-badge font-bold text-gray-700 block mb-2">
                    ✦ {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((gem) => {
                      const isSelected = selectedGems.includes(gem);
                      return (
                        <button
                          key={gem}
                          type="button"
                          onClick={() => toggleGem(gem)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-badge font-bold transition-all ${
                            isSelected
                              ? "bg-deepgreen text-white scale-105 shadow-sm border border-deepgreen"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {gem}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Gem Input */}
            <form onSubmit={handleAddCustomGem} className="flex gap-2 max-w-sm mt-3">
              <input
                type="text"
                value={customGem}
                onChange={(e) => setCustomGem(e.target.value)}
                placeholder="나만의 특별한 강점 직접 적기"
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
              <span>나다움 가면 만들러 가기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 3: 마음 키우기 (핵심활동: 디지털 '나다움 가면' 만들기)
         ========================================================================= */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-deepgreen/20 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-deepgreen text-white text-xs font-badge font-bold rounded-full">
                  🎭 워크북 핵심 활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  나만의 &lsquo;나다움 가면&rsquo; 만들기
                </h3>
              </div>
              <Palette className="w-6 h-6 text-deepgreen" />
            </div>

            <p className="font-hand text-sm text-gray-600 mb-6">
              내가 고른 강점 보석들을 가면 위에 장식하고, 나를 가장 멋지게 표현하는 한 문장을 완성해 보세요!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Customizer Controls */}
              <div className="md:col-span-6 space-y-4">
                {/* ① Color Tone Selection */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-2">
                    ① 가면 베이스 색상 선택
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {maskColors.map((color) => (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => setMaskColor(color.hex)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          maskColor === color.hex
                            ? "scale-110 ring-2 ring-offset-2 ring-gray-600 border-white"
                            : "border-transparent opacity-85 hover:opacity-100"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* ② Stickers display */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-2">
                    ② 부착된 나의 강점 보석 스티커 (2단계 연동)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedGems.length === 0 ? (
                      <span className="text-xs text-gray-400 font-hand">
                        선택된 강점이 없습니다. 2단계에서 골라주세요.
                      </span>
                    ) : (
                      selectedGems.map((gem, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-deepgreen-light text-deepgreen text-xs font-badge font-bold rounded-lg border border-deepgreen/30 shadow-2xs"
                        >
                          💎 {gem}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* ③ Sentence completion */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                    ③ 나를 표현하는 한 문장 완성하기
                  </label>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-xs font-badge text-gray-500 block mb-1">
                      &ldquo;나는 [ ... ]하는 멋진 사람이다!&rdquo;
                    </span>
                    <textarea
                      value={maskSentence}
                      onChange={(e) => setMaskSentence(e.target.value)}
                      placeholder="예: 친구가 우울할 때 곁에서 조용히 빵을 건넬 줄 아는 다정한 사람이다."
                      rows={2}
                      className="w-full p-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-deepgreen font-hand"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Interactive Mask Card Preview */}
              <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F9FBF9] to-[#EEF6F0] rounded-2xl border-2 border-dashed border-deepgreen/30 shadow-inner">
                {/* Visual Mask Graphic SVG */}
                <div
                  style={{ borderColor: maskColor }}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center p-4 border-4 shadow-md bg-white transition-all duration-300"
                >
                  {/* Decorative Eyes and Smile */}
                  <div className="flex items-center justify-center gap-8 mb-2">
                    <div
                      style={{ backgroundColor: maskColor }}
                      className="w-5 h-5 rounded-full animate-bounce shadow-xs"
                    />
                    <div
                      style={{ backgroundColor: maskColor }}
                      className="w-5 h-5 rounded-full animate-bounce shadow-xs"
                    />
                  </div>
                  <Smile className="w-10 h-10 text-gray-700 opacity-80" />

                  {/* Gem Stickers Floating */}
                  <div className="absolute inset-x-2 bottom-4 flex flex-wrap justify-center gap-1">
                    {selectedGems.map((gem, idx) => (
                      <span
                        key={idx}
                        style={{ backgroundColor: maskColor }}
                        className="text-[10px] text-white font-badge font-bold px-2 py-0.5 rounded-full shadow-xs"
                      >
                        {gem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mask Banner Sentence */}
                <div className="mt-4 text-center px-2">
                  <p className="font-badge text-xs text-deepgreen font-bold">
                    &lt;{nickname}의 나다움 가면&gt;
                  </p>
                  <p className="font-hand text-sm text-gray-800 mt-1 font-bold">
                    &ldquo;나는 {maskSentence || "..."} 멋진 사람이다!&rdquo;
                  </p>
                </div>
              </div>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-deepgreen text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-deepgreen-hover active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 4: 마음 다지기 (자기평가 & 미션 & 감정일기 출석)
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
                  Q2. {lesson.selfEvaluation.q2}
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

          {/* Section 3: 8 Emotion Clouds */}
          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          {/* Section 4: 3-Line Diary */}
          <div className="bg-white rounded-2xl p-5 border border-deepgreen/20 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>2차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="나만의 강점을 발견하고 나다움 가면을 만들며 느낀 점을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-deepgreen" />
                <span>오늘 완성한 활동이나 감정 사진 첨부 (선택)</span>
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

          {isSavedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs sm:text-sm font-badge flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>2차시 감정일기와 강점 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  3차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-deepgreen to-[#358B58] text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-deepgreen/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>2차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
