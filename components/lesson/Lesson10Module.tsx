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
  Heart,
  MessageCircle,
  Smartphone,
  Share2,
} from "lucide-react";

interface Lesson10ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson10Module: React.FC<Lesson10ModuleProps> = ({
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
      text: `안녕, ${nickname}! 친구가 힘들어하거나 속상해할 때 어떻게 다가가야 할지 몰라 서툴렀던 경험이 있니? 반대로 네가 친구에게 큰 위로를 받았던 순간은 언제야?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Empathy Styles & Hashtags)
  const empathyStyles = [
    {
      id: "judge",
      title: "판단·훈계형",
      desc: '"너가 그러니까 그렇지, 다음엔 그렇게 하지 마."',
      badge: "판단 금지!",
      color: "border-rose-200 bg-rose-50",
    },
    {
      id: "solver",
      title: "해결사형",
      desc: '"울지 말고 이렇게 저렇게 해결해 봐."',
      badge: "감정 수용 부족",
      color: "border-amber-200 bg-amber-50",
    },
    {
      id: "empathy",
      title: "마음 헤아림형 (목표)",
      desc: '"정말 속상했겠다. 내가 곁에 있어 줄게."',
      badge: "진정한 공감 💖",
      color: "border-[#1E4E8C] bg-[#EBF2FA]",
    },
  ];
  const [selectedStyle, setSelectedStyle] = useState<string>(
    initialData?.interactiveData?.customData?.empathyChoice || "empathy"
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#마음_헤아리기", "#공감하기", "#격려하기", "#표현하지_않으면_몰라요"]
  );

  // Step 3 State (4-Step Empathy Simulator)
  const [empathySteps, setEmpathySteps] = useState({
    fact: "발표 준비 진짜 열심히 했는데 실수가 나와서...",
    emotion: "많이 당황스럽고 속상했겠구나.",
    need: "완벽하게 잘해내고 싶었던 마음이 컸던 것 같아.",
    support: "하지만 끝까지 최선을 다한 넌 정말 멋졌어. 내가 네 편인 거 알지?",
  });
  const [isSentHeart, setIsSentHeart] = useState(false);

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
          lessonNo: 10,
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
          text: `조언보다 앞서는 건 따뜻한 공감이야! 친구의 마음에 포근한 위로를 전하는 법을 함께 연습해 보자 💖`,
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
      id: initialData?.id || `entry-10-${Date.now()}`,
      lessonNo: 10,
      lessonTitle: "10. 관계를 이어가고 싶다면 꼭!",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "10차시 공감 4단계 시뮬레이터를 통해 상대방의 마음을 깊이 헤아리고 따스한 격려를 건넸다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          empathyChoice: selectedStyle,
          assembledMessage: `${empathySteps.fact} ${empathySteps.emotion} ${empathySteps.need} ${empathySteps.support}`,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 10차시 딥블루 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#1E4E8C]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#EBF2FA] via-white to-blue-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#1E4E8C] text-white text-xs font-badge rounded-md font-bold">
                10차시 • 영역 ➎ 건강한 관계 맺기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 71~77쪽</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              10. 관계를 이어가고 싶다면 꼭! (공감하고 격려하기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              나의 마음만큼 타인의 마음도 소중함을 알고 상대방의 마음을 헤아려 공감과 격려를 전달합니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "공감 자가진단" },
              { num: 3, label: "공감 시뮬레이터" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#1E4E8C] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#EBF2FA] to-[#D7E6F7] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#1E4E8C]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#1E4E8C] text-white text-xs font-badge font-bold rounded-full">
                  [오늘의 마음 편지] 오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="나의 마음만 소중한 게 아니라 다른 사람의 마음도 소중해요. 그래서 관계를 이어가기 위해서는 반드시 서로의 마음을 이해하고 공감해 주는 것이 필요해요. 이번 시간에는 다른 사람의 마음을 헤아려보고, 공감과 격려를 전달하는 방법을 알아보아요."
                themeColor="#1E4E8C"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1E4E8C]/20 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2FA] text-[#1E4E8C] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🤝
                </div>
                <div className="space-y-2">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 서로의 마음을 잇는 따뜻한 공감의 다리
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;나의 마음만 소중한 게 아니라 다른 사람의 마음도 소중해요. 그래서 관계를 이어가기 위해서는 반드시 서로의 마음을 이해하고 공감해 주는 것이 필요해요. 이번 시간에 공감과 격려를 전달하는 방법을 알아보아요!&rdquo;
                  </p>
                </div>
              </div>

              {/* Smartphone Instagram Feed Graphic: YOU ∩ ME = WE */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E4E8C] text-white flex items-center justify-center text-xl shadow-xs">
                    💖
                  </div>
                  <div>
                    <span className="text-xs font-badge font-bold text-[#1E4E8C]">
                      @maeumee 인스타그램 피드
                    </span>
                    <p className="font-title text-sm font-bold text-gray-900 mt-0.5">
                      YOU ∩ ME = WE (너와 내가 만나 우리가 되는 공감)
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px] font-badge text-gray-600">
                  <span className="bg-white px-2 py-0.5 rounded-full border">#관계유지</span>
                  <span className="bg-white px-2 py-0.5 rounded-full border">#핵심기술</span>
                  <span className="bg-white px-2 py-0.5 rounded-full border text-[#1E4E8C] font-bold">#공감_헤아림</span>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#1E4E8C]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#1E4E8C]" />
                <span className="font-title text-sm font-bold text-[#1E4E8C]">
                  마음이와의 10차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#1E4E8C] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#1E4E8C] text-white rounded-tr-none"
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
                  placeholder="예: 친구가 울 때 무슨 말을 해야 할지 몰라 가만히 서 있기만 했어."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4E8C] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#1E4E8C] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#153A6A] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1E4E8C] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#153A6A] transition active:scale-95"
              >
                <span>상대방 마음 만나러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#1E4E8C]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#1E4E8C]" />
              <span>활동 A: 나의 공감 지수 자가진단</span>
            </h3>
            <p className="font-sans text-xs text-gray-500">
              힘들어하는 친구를 볼 때 나의 반응은 주로 어디에 가까운가요?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {empathyStyles.map((style) => {
                const isSelected = selectedStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                      isSelected
                        ? "border-[#1E4E8C] bg-[#EBF2FA] shadow-xs scale-102 ring-2 ring-[#1E4E8C]/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-badge text-gray-400 block mb-1">
                        {style.badge}
                      </span>
                      <h4 className="font-title text-sm font-bold text-gray-900">
                        {style.title}
                      </h4>
                      <p className="font-hand text-xs text-gray-600 mt-1">
                        {style.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#마음_헤아리기", "#공감하기", "#격려하기", "#표현하지_않으면_몰라요"]}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E4E8C] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#153A6A] active:scale-95"
            >
              <span>공감 4단계 시뮬레이터 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (공감 4단계 시뮬레이터) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1E4E8C]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#1E4E8C] text-white text-xs font-badge font-bold rounded-full">
                  💖 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  공감 4단계 시뮬레이터 (마음 반영 문장 빌더)
                </h3>
              </div>
              <Heart className="w-6 h-6 text-rosepink fill-rosepink" />
            </div>

            {/* Scenario Callout */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs font-hand text-blue-900 leading-relaxed">
              <strong>📖 워크북 슬라이드 상황:</strong> &ldquo;열심히 준비한 동아리 발표회에서 큰 실수를 하고 풀이 죽어있는 친구 민지&rdquo;
            </div>

            {/* 4-Step Sentence Builder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-hand">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1E4E8C] block">
                  1단계 [사실 반영]:
                </span>
                <input
                  type="text"
                  value={empathySteps.fact}
                  onChange={(e) => setEmpathySteps({ ...empathySteps, fact: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1E4E8C] block">
                  2단계 [감정 반영]:
                </span>
                <input
                  type="text"
                  value={empathySteps.emotion}
                  onChange={(e) => setEmpathySteps({ ...empathySteps, emotion: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1E4E8C] block">
                  3단계 [욕구 반영]:
                </span>
                <input
                  type="text"
                  value={empathySteps.need}
                  onChange={(e) => setEmpathySteps({ ...empathySteps, need: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-badge font-bold text-[#1E4E8C] block">
                  4단계 [지지와 격려]:
                </span>
                <input
                  type="text"
                  value={empathySteps.support}
                  onChange={(e) => setEmpathySteps({ ...empathySteps, support: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* Assembled Empathy Letter Card */}
            <div className="p-6 bg-gradient-to-b from-[#EBF2FA] to-[#D7E6F7] rounded-3xl border-2 border-dashed border-[#1E4E8C]/40 text-center space-y-3">
              <span className="text-xs font-badge text-[#1E4E8C] font-bold block">
                💌 민지에게 건네는 {nickname}의 다정한 공감 편지
              </span>
              <p className="font-hand text-base sm:text-lg text-gray-800 font-bold leading-relaxed max-w-lg mx-auto">
                &ldquo;{empathySteps.fact} {empathySteps.emotion} {empathySteps.need} {empathySteps.support}&rdquo;
              </p>

              <button
                type="button"
                onClick={() => setIsSentHeart(true)}
                className="px-5 py-2 bg-rosepink hover:bg-rosepink-hover text-white text-xs font-badge font-bold rounded-full shadow-md transition inline-flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>친구에게 마음 전송하기</span>
              </button>

              {isSentHeart && (
                <p className="text-xs font-badge text-rosepink animate-bounce">
                  💖 따뜻한 공감과 격려의 마음이 친구에게 전달되었습니다!
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E4E8C] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#153A6A] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#1E4E8C]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 내 생각만 고집하지 않고 상대방의 상황과 감정을 깊이 헤아려 보았나요?
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
                  Q2. 주변 사람들에게 따뜻한 공감과 격려의 말을 표현할 자신감이 생겼나요?
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

          <div className="bg-gradient-to-r from-[#EBF2FA] to-[#D7E6F7] rounded-2xl p-5 border border-[#1E4E8C]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#1E4E8C] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#1E4E8C]">
              [1일 1공감 &lsquo;그랬구나&rsquo; 실천 챌린지]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 한 주 동안 친구나 가족의 이야기를 들었을 때 섣불리 조언하지 말고, '아, 그런 일이 있어서 정말 속상했겠구나'라고 감정을 먼저 짚어주기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#1E4E8C]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>10차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="상대방의 마음에 귀 기울이고 따스한 공감과 격려를 전해본 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4E8C] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#1E4E8C]" />
                <span>오늘 완성한 공감 편지나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#1E4E8C]">
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
                <span>10차시 감정일기와 공감 편지 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 11차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1E4E8C] to-blue-800 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-blue-800/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>10차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
