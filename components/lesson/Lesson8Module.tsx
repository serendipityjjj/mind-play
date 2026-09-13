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
  BatteryCharging,
  RefreshCw,
  Heart,
  Camera,
} from "lucide-react";

interface Lesson8ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson8Module: React.FC<Lesson8ModuleProps> = ({
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
      text: `안녕, ${nickname}! 오늘 하루를 시작하거나 보내면서, 너를 기분 좋게 만들었거나 미소 짓게 했던 사소한 순간이 있었니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Battery Slider & Hashtags)
  const [batteryLevel, setBatteryLevel] = useState<number>(
    initialData?.interactiveData?.customData?.batteryLevel || 75
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#I_can_do_it", "#오히려_좋아", "#작은_감사_발견", "#긍정_비타민_충전"]
  );

  // Step 3 State (Reframing Card & Gratitude Talisman)
  const reframingPresets = [
    {
      id: "rain",
      situation: "비가 와서 체육 시간에 축구를 못하게 됐다!",
      flipped: "교실에서 친구들과 보드게임하며 수다 떨 수 있으니 오히려 좋아! 🎲",
    },
    {
      id: "bus",
      situation: "버스/지하철을 아슬아슬하게 눈앞에서 놓쳤다!",
      flipped: "좋아하는 노래 한 곡 더 여유롭게 들으며 숨 돌릴 수 있으니 오히려 좋아! 🎧",
    },
  ];
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [customSituation, setCustomSituation] = useState(
    initialData?.interactiveData?.customData?.customSituation || "숙제가 많아서 놀 시간이 줄어들었다"
  );
  const [customReframing, setCustomReframing] = useState(
    initialData?.interactiveData?.customData?.customReframing || "오늘 집중해서 끝내면 주말에 걱정 없이 마음껏 쉴 수 있으니 오히려 좋아!"
  );

  // Talisman Builder State
  const [talismanSubject, setTalismanSubject] = useState("나는");
  const [talismanModifier, setTalismanModifier] = useState("어떤 어려움도 씩씩하게 이겨내는");
  const [talismanVerb, setTalismanVerb] = useState("멋진 사람이다!");
  const [gratitudeTarget, setGratitudeTarget] = useState(
    initialData?.interactiveData?.customData?.gratitudeTarget || "따뜻하고 맛있는 오늘 점심 급식"
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
          lessonNo: 8,
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
          text: `정말 기분 좋은 순간이네! 긍정의 씨앗을 마음속에 쏙 심어보자 ✨ I can do it!`,
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
      id: initialData?.id || `entry-8-${Date.now()}`,
      lessonNo: 8,
      lessonTitle: "08. I can do it! 긍정의 힘",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "8차시 '오히려 좋아' 리프레이밍과 긍정 부적을 만들며 일상의 소중한 감사를 발견했다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          batteryLevel,
          customSituation,
          customReframing,
          gratitudeTarget,
          talisman: `${talismanSubject} ${talismanModifier} ${talismanVerb}`,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 8차시 딥 마젠타/와인빛 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#7A1B43]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FCEDF2] via-white to-pink-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#7A1B43] text-white text-xs font-badge rounded-md font-bold">
                8차시 • 영역 ➍ 마음 회복하기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 63~75쪽</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              08. I can do it! 긍정의 힘 (긍정적인 마음 가지기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              긍정을 부르는 방법을 알아보고 일상 속 감사를 발견하여 긍정적인 마음을 기릅니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "긍정 배터리" },
              { num: 3, label: "오히려 좋아!" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#7A1B43] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#FCEDF2] to-[#FAD4E0] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#7A1B43]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#7A1B43] text-white text-xs font-badge font-bold rounded-full">
                  #오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="우리의 뇌는 원래 부정적인 것에 더 민감하게 반응하도록 만들어져 있대. 하지만 매일 물을 주면 싹이 트듯, 긍정적인 생각도 매일 연습하면 마음의 근육처럼 튼튼해질 수 있어. '어차피 안 될 거야' 대신 'I can do it! 난 해낼 수 있어'라는 긍정의 씨앗을 오늘 네 마음에 심어보자!"
                themeColor="#7A1B43"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#7A1B43]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FCEDF2] text-[#7A1B43] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🌱
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 마음에 긍정의 씨앗을 심어보자
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;우리의 뇌는 원래 부정적인 것에 더 민감하게 반응하도록 만들어져 있대. 하지만 매일 물을 주면 싹이 트듯, 긍정적인 생각도 매일 연습하면 마음의 근육처럼 튼튼해질 수 있어. &lsquo;I can do it! 난 해낼 수 있어&rsquo;라는 긍정의 씨앗을 오늘 네 마음에 심어보자!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#7A1B43]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#7A1B43]" />
                <span className="font-title text-sm font-bold text-[#7A1B43]">
                  마음이와의 8차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#7A1B43] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#7A1B43] text-white rounded-tr-none"
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
                  placeholder="예: 오늘 아침 친구가 젤리를 건네줘서 기분 좋았어!"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7A1B43] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#7A1B43] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#5A1432] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#7A1B43] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#5A1432] transition active:scale-95"
              >
                <span>긍정의 힘 깨우러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#7A1B43]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <BatteryCharging className="w-5 h-5 text-[#7A1B43]" />
              <span>활동 A: 내 안의 긍정 배터리 충전 잔량 진단</span>
            </h3>
            <p className="font-sans text-xs text-gray-500">
              지금 내 마음의 긍정 배터리는 몇 % 충전되어 있나요? (슬라이더로 조절)
            </p>

            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-200 space-y-3">
              <div className="flex items-center justify-between font-title font-bold text-sm text-[#7A1B43]">
                <span>현재 긍정 충전도</span>
                <span className="text-base">{batteryLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={batteryLevel}
                onChange={(e) => setBatteryLevel(Number(e.target.value))}
                className="w-full accent-[#7A1B43] cursor-pointer"
              />
              <div className="p-3 bg-white rounded-xl text-xs font-hand text-gray-700">
                {batteryLevel <= 30 ? (
                  <p className="text-rose-600 font-bold">
                    🪫 0~30% 방전 위기: &ldquo;따뜻한 응원과 포근한 휴식이 필요해요!&rdquo;
                  </p>
                ) : batteryLevel <= 70 ? (
                  <p className="text-amber-600 font-bold">
                    🔋 40~70% 보통 상태: &ldquo;작은 감사 한 컷으로 긍정 에너지를 가득 채워볼까요?&rdquo;
                  </p>
                ) : (
                  <p className="text-emerald-600 font-bold">
                    ⚡ 80~100% 완충 완료: &ldquo;친구들에게 밝은 긍정 비타민을 퐁퐁 나눠줄 수 있어요!&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#I_can_do_it", "#오히려_좋아", "#작은_감사_발견", "#긍정_비타민_충전"]}
            onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
            onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
            guideText="긍정적인 나를 만드는 나만의 수업 목표를 해시태그로 적어보세요."
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7A1B43] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#5A1432] active:scale-95"
            >
              <span>오히려 좋아 & 긍정 부적 만들기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#7A1B43]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#7A1B43] text-white text-xs font-badge font-bold rounded-full">
                  ✨ 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  &lsquo;오히려 좋아!&rsquo; 리프레이밍 & 긍정 부적
                </h3>
              </div>
              <Sparkles className="w-6 h-6 text-[#7A1B43]" />
            </div>

            {/* Interaction 1: Reframing Flip Cards */}
            <div className="space-y-3">
              <span className="text-xs font-badge font-bold text-gray-800 block">
                인터랙션 ① &lsquo;오히려 좋아!&rsquo; 리프레이밍 카드 뒤집기 (터치하여 반전)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reframingPresets.map((card) => {
                  const isFlipped = !!flippedCards[card.id];
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() =>
                        setFlippedCards({ ...flippedCards, [card.id]: !isFlipped })
                      }
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 min-h-[110px] flex flex-col justify-between ${
                        isFlipped
                          ? "bg-gradient-to-b from-[#FCEDF2] to-pink-100 border-[#7A1B43] shadow-xs"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-[11px] font-badge font-bold text-[#7A1B43]">
                        {isFlipped ? "✨ 오히려 좋아 해석" : "🌧️ 속상한 상황 (클릭하여 뒤집기)"}
                      </span>
                      <p className="font-hand text-xs sm:text-sm font-bold text-gray-900 mt-1">
                        {isFlipped ? card.flipped : card.situation}
                      </p>
                      <span className="text-[10px] text-gray-400 font-sans self-end">
                        {isFlipped ? "다시 뒤집기 ↺" : "터치하여 반전 ➔"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Reframing */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 mt-2">
                <span className="text-xs font-badge font-bold text-gray-700 block">
                  ✦ 나만의 속상했던 일 ➜ &lsquo;오히려 좋아&rsquo; 해석 작성하기
                </span>
                <input
                  type="text"
                  value={customSituation}
                  onChange={(e) => setCustomSituation(e.target.value)}
                  placeholder="속상했던 일 (예: 숙제가 많아서 놀 시간이 줄어들었다)"
                  className="w-full p-2 text-xs bg-white border border-gray-200 rounded-xl font-hand"
                />
                <input
                  type="text"
                  value={customReframing}
                  onChange={(e) => setCustomReframing(e.target.value)}
                  placeholder="오히려 좋아 해석 (예: 오늘 집중해서 끝내면 주말에 마음 편히 쉴 수 있으니 오히려 좋아!)"
                  className="w-full p-2 text-xs bg-white border border-pink-300 rounded-xl font-hand text-[#7A1B43] font-bold"
                />
              </div>
            </div>

            {/* Interaction 2: Gratitude Talisman Photocard Generator */}
            <div className="border-t border-gray-100 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-badge font-bold text-gray-800 block">
                  인터랙션 ② 찰칵~ 감사 한 컷 & 긍정 부적 조립기
                </span>

                <div>
                  <label className="text-[11px] font-badge text-gray-600 block mb-1">
                    오늘 하루 감사한 대상 / 순간
                  </label>
                  <input
                    type="text"
                    value={gratitudeTarget}
                    onChange={(e) => setGratitudeTarget(e.target.value)}
                    placeholder="예: 따뜻하고 맛있는 오늘 점심 급식"
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-hand"
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-xs font-badge">
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">주어</label>
                    <select
                      value={talismanSubject}
                      onChange={(e) => setTalismanSubject(e.target.value)}
                      className="w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    >
                      <option value="나는">나는</option>
                      <option value="우리 반은">우리 반은</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">수식어</label>
                    <select
                      value={talismanModifier}
                      onChange={(e) => setTalismanModifier(e.target.value)}
                      className="w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    >
                      <option value="어떤 어려움도 이겨내는">어떤 어려움도 이겨내는</option>
                      <option value="매일 조금씩 성장하는">매일 조금씩 성장하는</option>
                      <option value="언제나 밝게 빛나는">언제나 밝게 빛나는</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-0.5">서술어</label>
                    <select
                      value={talismanVerb}
                      onChange={(e) => setTalismanVerb(e.target.value)}
                      className="w-full p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                    >
                      <option value="멋진 사람이다!">멋진 사람이다!</option>
                      <option value="최고의 주인공이다!">최고의 주인공이다!</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Visual Talisman Photocard Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FCEDF2] to-[#F7D1DC] rounded-3xl border-2 border-dashed border-[#7A1B43]/40 shadow-md">
                <div className="w-full max-w-xs bg-white rounded-2xl p-5 border border-pink-200 shadow-xl text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#7A1B43] text-white flex items-center justify-center mx-auto text-lg font-bold shadow-xs">
                    🍀
                  </div>
                  <span className="text-[11px] font-badge text-[#7A1B43] font-bold block">
                    {nickname}의 긍정 부적 포토카드
                  </span>
                  <div className="p-3 bg-[#FCEDF2] rounded-xl border border-pink-200">
                    <p className="font-title text-base font-bold text-[#7A1B43]">
                      &ldquo;{talismanSubject} {talismanModifier} {talismanVerb}&rdquo;
                    </p>
                  </div>
                  <p className="font-hand text-xs text-gray-700">
                    💖 감사 한 컷: &ldquo;{gratitudeTarget || "소소한 일상의 감사"}&rdquo;
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7A1B43] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#5A1432] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#7A1B43]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 안 좋은 상황에서도 배움이나 긍정적인 면을 찾아낼 수 있나요?
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
                  Q2. 매일 작은 것에 감사하는 마음을 품을 준비가 되었나요?
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

          <div className="bg-gradient-to-r from-[#FCEDF2] to-[#FAD4E0] rounded-2xl p-5 border border-[#7A1B43]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#7A1B43] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#7A1B43]">
              [잠들기 전 3가지 감사 일기 챌린지]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;매일 밤 베개에 눕기 전, 오늘 있었던 사소한 감사 3가지(맛있는 급식, 맑은 하늘, 친구의 인사)를 속으로 떠올려보기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#7A1B43]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>8차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="'오히려 좋아'와 긍정 부적을 만들며 일상의 소중한 감사를 발견한 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7A1B43] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#7A1B43]" />
                <span>오늘 완성한 긍정 부적이나 감사 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#7A1B43]">
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
                <span>8차시 감정일기와 긍정 부적 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 9차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A1B43] to-pink-800 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-pink-800/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>8차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
