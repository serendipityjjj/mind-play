"use client";

import React, { useState } from "react";
import { LessonMetadata } from "@/lib/curriculum";
import { EmotionCloudPicker } from "@/components/common/EmotionCloudPicker";
import { TicketPunchCard } from "@/components/common/TicketPunchCard";
import { TTSPlayer } from "@/components/common/TTSPlayer";
import { DiaryEntry, TimeCapsuleData } from "@/lib/storage";
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
} from "lucide-react";

interface GenericLessonModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  timeCapsuleFromLesson1?: TimeCapsuleData;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
  onOpenNovelModal?: () => void;
}

export const GenericLessonModule: React.FC<GenericLessonModuleProps> = ({
  lesson,
  nickname,
  initialData,
  timeCapsuleFromLesson1,
  onSave,
  onNextLesson,
  onOpenNovelModal,
}) => {
  const [step, setStep] = useState<number>(1);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: `안녕, ${nickname}! ${lesson.initialPrompt}`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Hashtags & Notes)
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || [...lesson.hashtags.slice(0, 2)]
  );

  // Step 3 State (Custom Lesson Reflection Note)
  const [reflectionNote, setReflectionNote] = useState<string>(
    initialData?.interactiveData?.customData?.reflectionNote || ""
  );

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
          lessonNo: lesson.lessonNo,
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
          text: `정말 깊이 있는 생각이야, ${nickname}! 이번 ${lesson.lessonNo}차시 활동을 통해 한 뼘 더 성장해 보자 🌸`,
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
      id: initialData?.id || `entry-${lesson.lessonNo}-${Date.now()}`,
      lessonNo: lesson.lessonNo,
      lessonTitle: lesson.topic,
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || `${lesson.lessonNo}차시 활동을 성실히 이수하고 소감을 기록했다.`,
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          reflectionNote,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  const isFinalLesson = lesson.lessonNo === 15;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Banner Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-deepgreen/20 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-deepgreen-light via-white to-rosepink-light flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-deepgreen text-white text-xs font-badge rounded-md font-bold">
                {lesson.lessonNo}차시 • {lesson.area}
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
              { num: 2, label: "마음 만나기" },
              { num: 3, label: isFinalLesson ? "타임캡슐 개봉" : "마음 키우기" },
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
                    안녕, {nickname}! 마음이가 전하는 {lesson.lessonNo}차시 이야기야
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
                  마음이와의 {lesson.lessonNo}차시 인터뷰
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
                  placeholder="마음이에게 답장하기..."
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
                <span>마음 만나러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Ticket Punch Card */}
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
              <span>{isFinalLesson ? "타임캡슐 개봉식 가기" : "마음 키우기 활동 ➔"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (15차시인 경우 타임캡슐 개봉식) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          {isFinalLesson ? (
            /* 15th Lesson Time Capsule Unlocking Ceremony */
            <div className="bg-gradient-to-br from-[#FEFAF6] to-[#FFF5F7] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-rosepink/40 shadow-soft space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-rosepink text-white text-xs font-badge font-bold rounded-full">
                    🎉 15차시 수료 기념
                  </span>
                  <h3 className="font-title text-xl font-bold text-gray-900 mt-2">
                    1차시 타임캡슐 개봉 & 성장 비교식
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-rosepink-light text-rosepink flex items-center justify-center text-2xl shadow-md">
                  <Unlock className="w-6 h-6 animate-bounce" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1st Lesson past self */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="text-xs font-badge font-bold text-gray-500 block">
                    🌱 15주 전, 1차시의 내가 썼던 타임캡슐 편지
                  </span>
                  <div className="p-3 bg-gray-50 rounded-xl text-xs font-hand text-gray-700 space-y-1">
                    <p>
                      <strong>고민:</strong>{" "}
                      {timeCapsuleFromLesson1?.currentWorry || "새로운 반에서 어색한 친구들과 잘 지낼 수 있을까?"}
                    </p>
                    <p>
                      <strong>바람:</strong>{" "}
                      {timeCapsuleFromLesson1?.wish || "사소한 말에 상처받지 않고 단단한 마음을 갖고 싶어."}
                    </p>
                    <p className="border-t border-gray-200 pt-1 text-rosepink font-bold">
                      <strong>미래의 나에게:</strong>{" "}
                      {timeCapsuleFromLesson1?.futureLetter || "15주 뒤의 나야, 감정을 마주한 네가 참 자랑스러워!"}
                    </p>
                  </div>
                </div>

                {/* 15th Lesson Grown Self */}
                <div className="bg-gradient-to-b from-deepgreen-light to-white p-4 rounded-2xl border border-deepgreen/30 shadow-sm space-y-2">
                  <span className="text-xs font-badge font-bold text-deepgreen block">
                    🌳 15차시를 완주한 지금, 단단해진 나의 답장
                  </span>
                  <textarea
                    value={reflectionNote}
                    onChange={(e) => setReflectionNote(e.target.value)}
                    placeholder="15주 전의 나에게 답장을 써주세요 (예: 그때의 걱정은 다 지나갔고 나는 훨씬 용기 있는 사람이 되었어!)"
                    rows={4}
                    className="w-full p-2.5 text-xs sm:text-sm bg-white border border-deepgreen/20 rounded-xl focus:outline-none focus:border-deepgreen font-hand leading-relaxed"
                  />
                </div>
              </div>

              {onOpenNovelModal && (
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={onOpenNovelModal}
                    className="px-6 py-3 bg-gradient-to-r from-rosepink to-deepgreen text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:opacity-95 active:scale-95 transition"
                  >
                    📖 15차시 누적 데이터로 나만의 성장 소설책 집필하기
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Generic Lesson 6~14 Reflection Activity */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-deepgreen/20 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-deepgreen text-white text-xs font-badge font-bold rounded-full">
                    💡 핵심 탐색 활동
                  </span>
                  <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                    {lesson.topic} - 실천 생각 노트
                  </h3>
                </div>
                <Award className="w-6 h-6 text-deepgreen" />
              </div>

              <p className="font-hand text-sm text-gray-600">
                이번 차시 학습 목표(&ldquo;{lesson.goal}&rdquo;)를 마음에 새기며, 나만의 실천 다짐이나 생각을 기록해 보세요.
              </p>

              <textarea
                value={reflectionNote}
                onChange={(e) => setReflectionNote(e.target.value)}
                placeholder="이번 차시 활동을 통해 깨달은 점이나 앞으로 실천해보고 싶은 나의 다짐을 적어보세요..."
                rows={4}
                className="w-full p-3.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand leading-relaxed"
              />
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
              <span>{lesson.lessonNo}차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder={`${lesson.lessonNo}차시 수업을 마치며 느낀 감정과 생각을 3줄로 적어보세요...`}
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deepgreen font-hand leading-relaxed"
            />

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

          {isSavedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs sm:text-sm font-badge flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{lesson.lessonNo}차시 감정일기 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 차시로 이동 ➔
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
              <span>{lesson.lessonNo}차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
