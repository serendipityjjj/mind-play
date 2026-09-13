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
  UserCheck,
  Award,
  Download,
  Share2,
} from "lucide-react";

interface Lesson3ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson3Module: React.FC<Lesson3ModuleProps> = ({
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
      text: `안녕, ${nickname}! 친구들에게 너를 한 단어나 별명으로 소개한다면 어떻게 표현하고 싶니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Expression Types & Hashtags)
  const expressionTypes = [
    {
      id: "passive",
      title: "소극형",
      desc: "속마음은 굴뚝같지만 쑥스러워서 남들이 시킬 때까지 조용히 있는 편",
      icon: "🤐",
      color: "border-gray-300 bg-gray-50",
    },
    {
      id: "aggressive",
      title: "공격 / 충동형",
      desc: "내 생각만 앞서서 남의 말을 끊거나 강하게 내 의견만 주장하는 편",
      icon: "⚡",
      color: "border-amber-300 bg-amber-50",
    },
    {
      id: "assertive",
      title: "똑똑한 당당형 (목표)",
      desc: "상대방의 기분을 존중하면서도 내 솔직한 생각과 강점을 차분히 말하는 편",
      icon: "🎯",
      color: "border-deepgreen bg-deepgreen-light",
    },
  ];
  const [selectedType, setSelectedType] = useState<string>(
    initialData?.interactiveData?.expressionType || "assertive"
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#나다운_당당함", "#솔직하게_나를_표현하기"]
  );

  // Step 3 State (Profile Card Form)
  const [profileCard, setProfileCard] = useState({
    maskTitle:
      initialData?.interactiveData?.profileCard?.maskTitle || "은은하지만 단단한 민들레",
    hashtags:
      initialData?.interactiveData?.profileCard?.hashtags || [
        "#친구_이야기_잘_들어줌",
        "#약속_시간_10분_전_도착",
      ],
    callMeWhen:
      initialData?.interactiveData?.profileCard?.callMeWhen ||
      "점심시간에 같이 밥 먹을 친구가 없거나 속상한 일로 위로받고 싶을 때",
    selfCheer:
      initialData?.interactiveData?.profileCard?.selfCheer ||
      "남의 눈치 보느라 주눅 들지 않고 내 생각을 당당하게 말할 줄 아는",
  });
  const [customTagInput, setCustomTagInput] = useState("");

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

  // Chat send
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
          lessonNo: 3,
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
          text: `정말 멋진 별명이네! 친구들에게 당당하고 다정하게 너를 소개해 보자 ✨`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleAddSignatureTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customTagInput.trim().replace(/^#+/, "");
    if (clean) {
      setProfileCard({
        ...profileCard,
        hashtags: [...profileCard.hashtags, `#${clean}`],
      });
      setCustomTagInput("");
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
      id: initialData?.id || `entry-3-${Date.now()}`,
      lessonNo: 3,
      lessonTitle: lesson.topic,
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "3차시 수업을 통해 나다움 소개서를 작성하고 나를 당당히 표현했다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        expressionType: selectedType,
        profileCard,
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
                3차시 • {lesson.area}
              </span>
              <span className="text-xs text-gray-500 font-sans">{lesson.workbookPages}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              {lesson.topic}
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">{lesson.goal}</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "표현 스타일" },
              { num: 3, label: "소개서 카드" },
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

      {/* STEP 1: 오늘의 마음 편지 */}
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

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rosepink/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rosepink-light text-rosepink flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  💌
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 세상에 멋진 너를 소개해 볼까?
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
                  마음이와의 3차시 인터뷰
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
                  placeholder="예: 나는 친구들의 웃음 충전기야!"
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
                <span>나를 표현하러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Activity A: Expression Types */}
          <div className="bg-white rounded-2xl p-6 border border-deepgreen/20 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
              <UserCheck className="w-5 h-5 text-deepgreen" />
              <span>활동 A: 똑똑한 자기표현 밸런스 체크</span>
            </h3>
            <p className="font-sans text-xs text-gray-500 mb-4">
              새로운 모둠 활동이나 친구들 앞에서 나는 주로 어떻게 나를 표현하나요?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {expressionTypes.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "border-deepgreen bg-deepgreen-light shadow-md scale-102 ring-2 ring-deepgreen/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{type.icon}</span>
                        {isSelected && (
                          <span className="text-[11px] font-badge text-white bg-deepgreen px-2 py-0.5 rounded-full font-bold">
                            선택됨
                          </span>
                        )}
                      </div>
                      <h4 className="font-title font-bold text-sm text-gray-900">
                        {type.title}
                      </h4>
                      <p className="font-hand text-xs text-gray-600 mt-1 leading-relaxed">
                        {type.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity B: Ticket Punch */}
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
              <span>소개서 프로필 카드 만들기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (디지털 '나다움 가면 소개서' 프로필 카드) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-deepgreen/20 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-deepgreen text-white text-xs font-badge font-bold rounded-full">
                  🌟 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  디지털 &lsquo;나다움 가면 소개서&rsquo; 프로필 카드
                </h3>
              </div>
              <Award className="w-6 h-6 text-deepgreen" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: 4-Step Input Form */}
              <div className="lg:col-span-6 space-y-4">
                {/* ① Mask Title / Nickname */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                    ① 내 가면의 이름 / 별명
                  </label>
                  <input
                    type="text"
                    value={profileCard.maskTitle}
                    onChange={(e) =>
                      setProfileCard({ ...profileCard, maskTitle: e.target.value })
                    }
                    placeholder="예: 은은하지만 단단한 민들레, 친구들의 웃음 충전기"
                    className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand"
                  />
                </div>

                {/* ② Signature Hashtags */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                    ② 나를 한눈에 보여주는 시그니처 해시태그
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {profileCard.hashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-rosepink-light text-rosepink text-xs font-badge font-bold rounded-lg border border-rosepink/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <form onSubmit={handleAddSignatureTag} className="flex gap-2">
                    <input
                      type="text"
                      value={customTagInput}
                      onChange={(e) => setCustomTagInput(e.target.value)}
                      placeholder="해시태그 추가 (예: 약속시간_엄수)"
                      className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-hand"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-gray-700 text-white text-xs font-badge rounded-xl"
                    >
                      추가
                    </button>
                  </form>
                </div>

                {/* ③ Call Me When */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                    ③ 이런 순간에 나를 불러줘! (나의 쓸모와 강점)
                  </label>
                  <textarea
                    value={profileCard.callMeWhen}
                    onChange={(e) =>
                      setProfileCard({ ...profileCard, callMeWhen: e.target.value })
                    }
                    placeholder="친구들아, 너희가 [ ... ]할 때 나를 찾아오면 큰 힘이 되어줄 수 있어!"
                    rows={2}
                    className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand"
                  />
                </div>

                {/* ④ Self Cheer */}
                <div>
                  <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
                    ④ 스스로에게 전하는 응원 한마디
                  </label>
                  <textarea
                    value={profileCard.selfCheer}
                    onChange={(e) =>
                      setProfileCard({ ...profileCard, selfCheer: e.target.value })
                    }
                    placeholder="누가 뭐래도 나는 [ ... ]한 나 자신을 응원해!"
                    rows={2}
                    className="w-full p-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand"
                  />
                </div>
              </div>

              {/* Right: Instagram Style Profile Card Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-sm bg-gradient-to-b from-white to-[#FAF6F0] rounded-3xl p-5 border-2 border-deepgreen/40 shadow-xl relative overflow-hidden">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-deepgreen text-white flex items-center justify-center font-bold text-xs">
                        나
                      </div>
                      <div>
                        <span className="text-xs font-title font-bold text-gray-800 block">
                          {nickname}의 나다움 카드
                        </span>
                        <span className="text-[10px] text-gray-400 font-sans">
                          대구마음학기제 공식 인증
                        </span>
                      </div>
                    </div>
                    <span className="text-xl">✨</span>
                  </div>

                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-deepgreen-light to-rosepink-light p-3.5 rounded-2xl text-center mb-3">
                    <h4 className="font-title text-base font-bold text-deepgreen">
                      &ldquo;{profileCard.maskTitle || "나만의 멋진 별명"}&rdquo;
                    </h4>
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {profileCard.hashtags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-badge text-gray-700 bg-white/80 px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Clauses */}
                  <div className="space-y-2 text-xs font-hand leading-relaxed text-gray-700 bg-white/70 p-3 rounded-2xl border border-gray-100">
                    <p>
                      <strong className="font-badge text-deepgreen">💌 이런 순간에 불러줘:</strong>
                      <br />
                      &ldquo;너희가 <span className="font-bold text-gray-900">{profileCard.callMeWhen || "..."}</span>할 때 찾아와줘!&rdquo;
                    </p>
                    <p className="border-t border-gray-100 pt-2">
                      <strong className="font-badge text-rosepink">💪 나에게 보내는 응원:</strong>
                      <br />
                      &ldquo;누가 뭐래도 나는 <span className="font-bold text-gray-900">{profileCard.selfCheer || "..."}</span>한 나 자신을 사랑해!&rdquo;
                    </p>
                  </div>
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

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
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

          {/* Weekly Mission Card */}
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

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-deepgreen/20 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>3차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="나다움 가면 소개서를 작성하며 나를 표현해 본 소감을 3줄로 적어보세요..."
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
                <span>3차시 감정일기와 소개서 카드가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  4차시로 이동 ➔
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
              <span>3차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
