"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { LessonMetadata } from "@/lib/curriculum";
import { EmotionCloudPicker } from "@/components/common/EmotionCloudPicker";
import { TicketPunchCard } from "@/components/common/TicketPunchCard";
import { TTSPlayer } from "@/components/common/TTSPlayer";
import { DiaryEntry, TimeCapsuleData } from "@/lib/storage";
import { EMOTION_CLOUDS } from "@/lib/emotions";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle2,
  Image as ImageIcon,
  Bot,
  Send,
  Unlock,
  BookOpen,
  Award,
  Calendar,
  Heart,
  Check,
  Printer,
  PartyPopper,
} from "lucide-react";

interface Lesson15ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  diaries?: DiaryEntry[];
  timeCapsuleFromLesson1?: TimeCapsuleData;
  onSave: (entry: DiaryEntry) => void;
  onOpenNovelModal?: () => void;
}

export const Lesson15Module: React.FC<Lesson15ModuleProps> = ({
  lesson,
  nickname,
  initialData,
  diaries = [],
  timeCapsuleFromLesson1,
  onSave,
  onOpenNovelModal,
}) => {
  const [step, setStep] = useState<number>(1);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: `축하해, ${nickname}! 드디어 15차시 대장정의 마지막 수료식 날이야. 15주 전의 너와 지금의 너를 비교했을 때, 어떤 마음 근육이 가장 크게 자란 것 같니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State: Time Capsule & Reflection
  const [isCapsuleUnlocked, setIsCapsuleUnlocked] = useState(false);
  const [growthReflection, setGrowthReflection] = useState(
    initialData?.interactiveData?.customData?.growthReflection ||
      "예전에는 작은 실수에도 나 자신을 탓하고 불안해했는데, 이제는 4-7-8 호흡과 '오히려 좋아' 생각으로 마음을 다정하게 다독일 수 있게 되었어."
  );
  const [futurePromise, setFuturePromise] = useState(
    initialData?.interactiveData?.customData?.futurePromise ||
      "앞으로 어떤 거센 바람이 불어와도 내 안의 8가지 감정을 소중히 인정하며 당당하게 걸어갈 거야!"
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#단단해진_내_마음", "#성장한_나에게_박수", "#15주_완주_성공", "#미래를_향해_출발"]
  );

  // Step 4 State: Evaluation & Diary
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

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2A784B", "#C44D62", "#1E88E5", "#F59E0B", "#8B5CF6"],
      });
    } catch (e) {
      console.log("Confetti trigger", e);
    }
  };

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
          lessonNo: lesson.lessonNo,
          lessonTitle: lesson.topic,
          message: userText,
          nickname,
          history: chatMessages,
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "15주 동안 한 걸음씩 성장한 네 모습이 눈부시게 아름다워!" },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "정말 대단해! 스스로를 돌보고 가꾸어 온 15주의 시간은 평생 너의 든든한 힘이 될 거야." },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSaveAll = () => {
    const entry: DiaryEntry = {
      lessonNo: 15,
      lessonTopic: lesson.topic,
      lessonArea: lesson.area,
      date: initialData?.date || new Date().toISOString().slice(0, 10),
      emotionId: selectedEmotionId,
      hashtags,
      evalStars,
      diaryText,
      imageUrl: uploadedImage,
      interactiveData: {
        customData: {
          isCapsuleUnlocked: true,
          growthReflection,
          futurePromise,
        },
      },
      completed: true,
      updatedAt: new Date().toISOString(),
    };

    onSave(entry);
    setIsSavedSuccess(true);
    fireConfetti();
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-deepgreen/20 shadow-xl overflow-hidden animate-fadeIn">
      {/* Top Lesson Header Banner */}
      <div className="bg-gradient-to-r from-[#2A784B] via-[#C44D62] to-[#7A1B43] p-6 sm:p-8 text-white relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-badge font-bold tracking-wide">
                {lesson.area}
              </span>
              <span className="text-xs text-white/80 font-mono">
                {lesson.workbookPages}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-title font-bold drop-shadow-sm">
              {lesson.topic}
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-hand max-w-2xl">
              {lesson.goal}
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/25 text-center">
            <span className="block text-[11px] uppercase tracking-wider text-white/80 font-sans">
              마음학기제 종합 수료식
            </span>
            <span className="text-xl font-bold font-title text-yellow-300">
              15주 여정 완주 🎓
            </span>
          </div>
        </div>

        {/* 4-Step Navigation Tab Bar */}
        <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4 max-w-2xl">
          {[
            { num: 1, label: "1. 마음이와 대화 & 편지" },
            { num: 2, label: "2. 1차시 타임캡슐 개봉" },
            { num: 3, label: "3. 수료식 & 소설집 발간" },
            { num: 4, label: "4. 자가진단 & 졸업 일기" },
          ].map((tab) => (
            <button
              key={tab.num}
              type="button"
              onClick={() => setStep(tab.num)}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs sm:text-sm font-badge transition ${
                step === tab.num
                  ? "bg-white text-rosepink font-bold shadow-md scale-105"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <span>{tab.num}단계</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* ================= STEP 1: CHATBOT & HEART LETTER ================= */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Heart Letter & TTS */}
            <div className="bg-[#FDEDF1] border border-[#F5B8C4] rounded-3xl p-6 relative shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-[#F5B8C4] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  <h3 className="font-title text-lg font-bold text-rosepink">
                    마음이의 15차시 최종 축하 편지
                  </h3>
                </div>
                <TTSPlayer text={lesson.letterContent} label="마음이 목소리로 듣기" />
              </div>
              <p className="font-hand text-base sm:text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                {lesson.letterContent}
              </p>
            </div>

            {/* Interactive Chatbot */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-deepgreen font-title font-bold text-base">
                <Bot className="w-5 h-5 text-deepgreen" />
                <span>마음이와의 15차시 졸업 인터뷰 (Gemini AI)</span>
              </div>

              <div className="h-64 overflow-y-auto space-y-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-inner">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.sender === "user"
                          ? "bg-rosepink text-white rounded-br-none font-sans"
                          : "bg-gray-100 text-gray-800 rounded-bl-none font-hand text-base"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl text-xs flex items-center gap-2 font-sans">
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-rosepink" />
                      마음이가 졸업 축하 메시지를 작성하고 있어요...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="15주 동안 나에게 일어난 가장 큰 마음의 변화를 이야기해 주세요..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rosepink text-sm font-hand text-base"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-5 py-3 bg-rosepink text-white rounded-xl text-sm font-badge font-bold hover:bg-rosepink/90 disabled:opacity-50 transition flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>전송</span>
                </button>
              </form>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-rosepink text-white rounded-2xl font-badge font-bold shadow-md hover:opacity-95 flex items-center gap-2 transition"
              >
                <span>2단계: 1차시 타임캡슐 자물쇠 개봉하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: TIME CAPSULE UNLOCK & COMPARISON ================= */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Time Capsule Unlock Box */}
            <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow">
                    🏺
                  </div>
                  <div>
                    <h3 className="font-title text-xl font-bold text-amber-950">
                      1차시 마음에 봉인했던 타임캡슐 개봉식
                    </h3>
                    <p className="text-xs text-amber-800 font-sans">
                      15주 전, 마음학기제를 처음 시작할 때 작성했던 소중한 다짐을 확인해 보세요!
                    </p>
                  </div>
                </div>

                {!isCapsuleUnlocked ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCapsuleUnlocked(true);
                      fireConfetti();
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-badge font-bold shadow-md hover:opacity-95 active:scale-95 transition flex items-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>자물쇠 열기 (Open)</span>
                  </button>
                ) : (
                  <span className="px-4 py-1.5 bg-green-100 text-green-800 border border-green-300 rounded-full text-xs font-badge font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 타임캡슐 개봉 완료
                  </span>
                )}
              </div>

              {/* Time Capsule Content */}
              {isCapsuleUnlocked ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  {/* Past Me */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-amber-800 font-title font-bold text-sm">
                      <span>🌱 15주 전 1차시의 나</span>
                    </div>
                    <div className="space-y-2 text-xs font-sans text-gray-700 bg-amber-50/50 p-3.5 rounded-xl">
                      <div>
                        <strong className="text-amber-900 block mb-0.5">내게 붙였던 첫 별명:</strong>
                        <p className="font-hand text-sm text-gray-800">
                          {timeCapsuleFromLesson1?.nickname || nickname}
                        </p>
                      </div>
                      <div>
                        <strong className="text-amber-900 block mb-0.5">15주 뒤 나에게 보낸 편지:</strong>
                        <p className="font-hand text-sm text-gray-800 italic">
                          &quot;{timeCapsuleFromLesson1?.letterToFuture || "친구들과 사이좋게 지내고 내 감정을 잘 조절하는 멋진 내가 되어 있길 바라!"}&quot;
                        </p>
                      </div>
                      <div>
                        <strong className="text-amber-900 block mb-0.5">그때의 고민거리:</strong>
                        <p className="font-hand text-sm text-gray-800">
                          {timeCapsuleFromLesson1?.secretWorry || "친구들에게 내 솔직한 생각을 똑 부러지게 말하지 못하는 것"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Present Me */}
                  <div className="bg-white p-5 rounded-2xl border border-rosepink/30 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-rosepink font-title font-bold text-sm">
                      <span>🌳 15주 후 지금 단단해진 나</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-badge font-bold text-gray-700 block mb-1">
                          과거의 나와 비교했을 때 나의 성장점
                        </label>
                        <textarea
                          rows={2}
                          value={growthReflection}
                          onChange={(e) => setGrowthReflection(e.target.value)}
                          className="w-full p-2.5 bg-rosepink-light/30 rounded-xl border border-rosepink/20 text-xs sm:text-sm font-hand"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-badge font-bold text-gray-700 block mb-1">
                          미래를 향한 나의 굳은 약속
                        </label>
                        <input
                          type="text"
                          value={futurePromise}
                          onChange={(e) => setFuturePromise(e.target.value)}
                          className="w-full px-3 py-2 bg-rosepink-light/30 rounded-xl border border-rosepink/20 text-xs sm:text-sm font-hand"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 font-sans text-sm space-y-2">
                  <span className="text-3xl block">🔒</span>
                  <p>우측 상단의 &apos;자물쇠 열기&apos; 버튼을 눌러 15주 전 타임캡슐을 개봉해 보세요!</p>
                </div>
              )}
            </div>

            {/* Ticket Punch Card */}
            <TicketPunchCard
              hashtags={hashtags}
              suggestedTags={lesson.hashtags}
              onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
              onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
            />

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-badge text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>1단계로</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-rosepink text-white rounded-2xl font-badge font-bold shadow-md hover:opacity-95 flex items-center gap-2 transition"
              >
                <span>3단계: 수료식 상장 & 소설집 E-Book으로 이동</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CERTIFICATE & NOVEL PUBLISHING ================= */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            {/* 15-Week Emotion Timeline View */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-deepgreen" />
                  <h3 className="font-title text-base font-bold text-gray-900">
                    15주간의 8대 감정 구름 여정 타임라인
                  </h3>
                </div>
                <span className="text-xs font-mono text-gray-500">
                  총 {diaries.length}회차 일기 기록됨
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-2">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((no) => {
                  const entry = diaries.find((d) => d.lessonNo === no);
                  const emotion = entry
                    ? EMOTION_CLOUDS.find((c) => c.id === entry.emotionId)
                    : null;
                  return (
                    <div
                      key={no}
                      className={`p-2 rounded-xl border text-center flex flex-col items-center justify-between min-h-[70px] ${
                        entry
                          ? "bg-gradient-to-b from-white to-green-50 border-green-300"
                          : "bg-gray-50 border-gray-200 opacity-50"
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold text-gray-500">
                        {no}주
                      </span>
                      <span className="text-xl my-0.5">
                        {emotion ? emotion.emoji : "☁️"}
                      </span>
                      <span className="text-[9px] font-badge text-gray-600 truncate w-full">
                        {emotion ? emotion.name.split("·")[0] : "-"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gold Certificate Award Component */}
            <div className="bg-gradient-to-b from-[#FFFDF0] via-[#FFF9DB] to-[#FFFDF0] border-4 border-[#D4AF37] rounded-3xl p-8 sm:p-12 relative shadow-xl text-center space-y-6">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 text-2xl text-[#D4AF37]">⚜️</div>
              <div className="absolute top-3 right-3 text-2xl text-[#D4AF37]">⚜️</div>
              <div className="absolute bottom-3 left-3 text-2xl text-[#D4AF37]">⚜️</div>
              <div className="absolute bottom-3 right-3 text-2xl text-[#D4AF37]">⚜️</div>

              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-amber-800 uppercase font-bold">
                  Certificate of Emotional Growth
                </span>
                <h3 className="text-3xl sm:text-4xl font-title font-bold text-amber-950 drop-shadow">
                  마음 성장 대상 (수료 상장)
                </h3>
              </div>

              <div className="max-w-xl mx-auto space-y-4 py-2 border-y border-amber-300/80">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm font-sans text-amber-900">성명:</span>
                  <span className="text-xl sm:text-2xl font-title font-bold text-amber-950 underline decoration-amber-400 decoration-2 underline-offset-4">
                    {nickname}
                  </span>
                </div>

                <p className="font-hand text-base sm:text-lg text-gray-800 leading-relaxed px-4">
                  위 학생은 대구광역시교육청 중학교 마음학기제 「마음플레이_감정일기」
                  15차시 전 과정을 훌륭히 이수하고, 8대 감정 구름과 진솔하게 대화하며
                  자신과 타인을 사랑하는 단단하고 따뜻한 마음 근육을 길렀기에 이 상장을 수여합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-md mx-auto pt-2 text-xs font-sans text-amber-900">
                <span>수여일: {new Date().toLocaleDateString("ko-KR")}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">대구광역시교육감</span>
                  <div className="w-10 h-10 rounded-full border-2 border-red-600 bg-red-50 text-red-700 flex items-center justify-center text-[10px] font-bold font-title shadow-inner rotate-[-6deg]">
                    대구
                    <br />
                    직인
                  </div>
                </div>
              </div>

              {/* Certificate Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={fireConfetti}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-xs font-badge font-bold shadow-md hover:opacity-95 flex items-center gap-1.5"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>축하 폭죽 터뜨리기</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-white border border-amber-300 text-amber-900 rounded-xl text-xs font-badge font-bold hover:bg-amber-50 flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>상장 인쇄하기</span>
                </button>
              </div>
            </div>

            {/* Upstage Solar Novelizer Call-to-Action Banner */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-rosepink p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-xs font-badge font-bold text-yellow-300 uppercase tracking-wide">
                    Upstage Solar AI 문집 발간
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-title font-bold">
                  나의 15주 감정일기를 단편 성장 소설로 완성하기
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-hand max-w-xl">
                  내가 기록한 15회차의 일기와 8대 감정 구름 데이터가 유기적으로 엮여
                  세상에 단 하나뿐인 서정적 E-Book 문집으로 출간됩니다.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenNovelModal}
                className="px-6 py-4 bg-white text-purple-950 hover:bg-yellow-100 rounded-2xl text-sm font-badge font-bold shadow-lg transform hover:scale-105 active:scale-95 transition flex items-center gap-2 whitespace-nowrap"
              >
                <BookOpen className="w-5 h-5 text-purple-900" />
                <span>성장 소설집 즉시 집필 및 발간</span>
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-badge text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>2단계로</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-rosepink text-white rounded-2xl font-badge font-bold shadow-md hover:opacity-95 flex items-center gap-2 transition"
              >
                <span>4단계: 최종 졸업 일기 작성으로 이동</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: EVALUATION & GRADUATION DIARY ================= */}
        {step === 4 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Self Evaluation */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
              <h3 className="font-title text-base font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>15차시 최종 여정 자가진단</span>
              </h3>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm font-sans text-gray-700">
                    1. {lesson.selfEvaluation.q1}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setEvalStars({ ...evalStars, q1: s })}
                        className={`p-1 text-lg transition ${
                          s <= evalStars.q1 ? "text-amber-500 scale-110" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm font-sans text-gray-700">
                    2. {lesson.selfEvaluation.q2}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setEvalStars({ ...evalStars, q2: s })}
                        className={`p-1 text-lg transition ${
                          s <= evalStars.q2 ? "text-amber-500 scale-110" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Emotion Cloud Picker */}
            <div className="space-y-3">
              <h3 className="font-title text-base font-bold text-gray-900">
                15주 여정을 마친 오늘, 나의 마음을 채운 8대 감정 구름
              </h3>
              <EmotionCloudPicker
                selectedId={selectedEmotionId}
                onSelect={(c) => setSelectedEmotionId(c.id)}
              />
            </div>

            {/* Diary Input & Photo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-title text-base font-bold text-gray-900">
                  15차시 최종 졸업 감정 일기
                </h3>
                <span className="text-xs text-gray-400 font-sans">
                  {diaryText.length}자 작성 중
                </span>
              </div>

              <textarea
                rows={6}
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                placeholder="15주 동안 열심히 마음을 돌보고 자라난 나 자신에게 건네는 따뜻한 축하와 졸업 일기를 적어주세요..."
                className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rosepink font-hand text-base leading-relaxed bg-rosepink-light/10"
              />

              {/* Photo Upload Simulation */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h5 className="text-xs font-badge font-bold text-gray-800">
                      15주 수료 기념사진 또는 활동 그림 첨부
                    </h5>
                    <p className="text-[11px] text-gray-500 font-sans">
                      수료증 인증샷이나 나만의 기념 그림을 올려보세요
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="lesson15-photo"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setUploadedImage(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="lesson15-photo"
                  className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-badge font-bold text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                >
                  {uploadedImage ? "사진 변경" : "사진 선택하기"}
                </label>
              </div>

              {uploadedImage && (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage}
                    alt="Uploaded Activity"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setUploadedImage(undefined)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Save Buttons & Celebration */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-badge text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>3단계로</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-deepgreen via-rosepink to-[#7A1B43] text-white rounded-2xl font-badge font-bold text-base shadow-xl hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5 text-yellow-300" />
                <span>15차시 마음일기 저장 &amp; 15주 여정 완주하기 🎓</span>
              </button>
            </div>

            {isSavedSuccess && (
              <div className="p-4 bg-rosepink-light border border-rosepink/30 text-rosepink rounded-2xl text-center text-sm font-badge font-bold flex items-center justify-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-rosepink" />
                <span>🎉 15주 전 과정 수료 및 최종 일기가 성공적으로 저장되었습니다! 축하합니다!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
