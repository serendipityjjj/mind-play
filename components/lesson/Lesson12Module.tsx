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
  Dices,
  Check,
  RotateCw,
  BookOpen,
} from "lucide-react";

interface Lesson12ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson12Module: React.FC<Lesson12ModuleProps> = ({
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
      text: `안녕, ${nickname}! 친구에게 잘못했을 때 자존심 때문에 사과를 망설였거나, 곤란한 부탁을 거절하지 못해 끙끙 앓았던 경험이 있니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (4 Animals Conflict Style & Hashtags)
  const conflictAnimals = [
    { id: "turtle", name: "🐢 거북이형 (회피)", desc: '"말 섞기 싫어... 그냥 피하고 방에 틀어박히기"', hint: "회피는 해결책이 아니에요!" },
    { id: "bear", name: "🐻 곰형 (순응)", desc: '"내가 다 미안해... 싸우기 싫으니 무조건 참기"', hint: "속마음이 곪을 수 있어요" },
    { id: "shark", name: "🦈 상어형 (공격)", desc: '"너가 잘못했잖아! 끝까지 따져서 이기기"', hint: "상처만 남아요" },
    { id: "owl", name: "🦉 부엉이형 (통합·해결)", desc: '"서로의 마음을 듣고 지혜롭게 사과/거절하며 해결책 찾기"', hint: "목표 스타일 ✨" },
  ];
  const [selectedAnimal, setSelectedAnimal] = useState<string>(
    initialData?.interactiveData?.customData?.conflictStyle || "owl"
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#올바르게_사과하기", "#상처_주지_않는_거절", "#진심이_담긴_인사약"]
  );

  // Step 3 State (16-Grid Conflict Boardgame)
  const boardTiles = [
    { no: 1, title: "출발! START", type: "info" },
    { no: 2, title: "친구 우산 빌렸다가 망가뜨림", type: "apology", recipe: "인사약" },
    { no: 3, title: "늦잠 자서 친구와의 약속 취소", type: "apology", recipe: "인사약" },
    { no: 4, title: "수학여행 가서 술 마시자는 부탁", type: "refusal", recipe: "공마다" },
    { no: 5, title: "이미 본 영화인데 또 보러 가자는 친구", type: "refusal", recipe: "공마다" },
    { no: 6, title: "친구 험담한 걸 친구가 알게 됨", type: "apology", recipe: "인사약" },
    { no: 7, title: "외모 놀리는 말로 친구 울린 상황", type: "apology", recipe: "인사약" },
    { no: 8, title: "배부른데 떡볶이 먹으러 가자는 친구", type: "refusal", recipe: "공마다" },
    { no: 9, title: "동의 없이 초등 졸업사진 유출", type: "apology", recipe: "인사약" },
    { no: 10, title: "친구들이 담배 피워보자는 유혹", type: "refusal", recipe: "공마다" },
    { no: 11, title: "장난으로 발 걸어 친구 넘어뜨림", type: "apology", recipe: "인사약" },
    { no: 12, title: "특정 친구 욕하는 단톡방 초대", type: "refusal", recipe: "공마다" },
    { no: 13, title: "시험에서 커닝 같이 하자는 유혹", type: "refusal", recipe: "공마다" },
    { no: 14, title: "나도 숙제 안 했는데 도와달라는 친구", type: "refusal", recipe: "공마다" },
    { no: 15, title: "시험 전날 PC방 게임 유혹", type: "refusal", recipe: "공마다" },
    { no: 16, title: "무인가게 물건 훔치는데 망 봐달라는 유혹", type: "refusal", recipe: "공마다" },
  ];

  const [currentTileIndex, setCurrentTileIndex] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [resolvedMessage, setResolvedMessage] = useState<string>(
    initialData?.interactiveData?.customData?.resolvedMessage ||
      "친구가 제안해 준 건 고맙지만(공감), 지금은 시험 기간이라 게임할 수 없어(마음). 시험 끝나고 주말에 같이 하자(대안)!"
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
          lessonNo: 12,
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
          text: `갈등은 피하는 것보다 지혜롭게 사과(인사약)하고 거절(공마다)하는 게 진짜 용기야! 보드게임으로 함께 연습해 보자 🎲`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    const rolled = Math.floor(Math.random() * 6) + 1;
    setDiceValue(rolled);

    setTimeout(() => {
      const nextPos = (currentTileIndex + rolled) % boardTiles.length;
      setCurrentTileIndex(nextPos === 0 ? 1 : nextPos);
      setIsRolling(false);
    }, 600);
  };

  const currentTile = boardTiles[currentTileIndex] || boardTiles[1];

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
      id: initialData?.id || `entry-12-${Date.now()}`,
      lessonNo: 12,
      lessonTitle: "12. 갈등을 키우지 않으려면",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "12차시 갈등 보드게임을 통해 '인사약' 사과와 '공마다' 거절법을 확실히 익혔다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          conflictStyle: selectedAnimal,
          boardgameMission: currentTile.title,
          resolvedMessage,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 12차시 웜 오렌지 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D47A22]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFF5ED] via-white to-amber-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#D47A22] text-white text-xs font-badge rounded-md font-bold">
                12차시 • 영역 ➎ 건강한 관계 맺기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 12차시</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              12. 갈등을 키우지 않으려면 (올바르게 사과하고 거절하기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              갈등 상황에서 올바른 사과하기(인사약)와 거절하기(공마다)를 통해 원만하게 관계를 관리합니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "동물 유형" },
              { num: 3, label: "갈등 보드게임" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#D47A22] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#FFF5ED] to-[#FCE6D2] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#D47A22]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#D47A22] text-white text-xs font-badge font-bold rounded-full">
                  #오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="우리는 매일 친구들과 지내며 크고 작은 의견 차이와 갈등을 겪곤 해. 갈등이 생겼을 때 무조건 참거나 화를 내며 피한다고 해결될까? 내 실수를 솔직하게 인정하는 멋진 사과와 내 한계를 부드럽고 분명하게 전하는 용기 있는 거절이 있다면 우리는 갈등을 넘어 더 깊고 단단한 친구 사이가 될 수 있어!"
                themeColor="#D47A22"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D47A22]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5ED] text-[#D47A22] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🤝
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 사과와 거절이 관계를 단단하게 만들어줘
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;내 실수를 솔직하게 인정하는 멋진 &lsquo;사과&rsquo;와, 내 한계를 부드럽고 분명하게 전하는 용기 있는 &lsquo;거절&rsquo;이 있다면 우리는 갈등을 넘어 더 깊고 단단한 친구 사이가 될 수 있어!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#D47A22]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#D47A22]" />
                <span className="font-title text-sm font-bold text-[#D47A22]">
                  마음이와의 12차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#D47A22] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#D47A22] text-white rounded-tr-none"
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
                  placeholder="예: 친구가 숙제를 보여달라고 했을 때 거절하기 어려워서 빌려주고 후회했어."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D47A22] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#D47A22] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#B36214] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#D47A22] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#B36214] transition active:scale-95"
              >
                <span>갈등 대처법 보러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#D47A22]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🐢🐻🦈🦉</span>
              <span>활동 A: 갈등 대처 4가지 동물 유형 퀴즈</span>
            </h3>
            <p className="font-sans text-xs text-gray-500">
              친구와 심하게 부딪혔을 때, 나의 평소 행동 스타일은?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conflictAnimals.map((animal) => {
                const isSelected = selectedAnimal === animal.id;
                return (
                  <button
                    key={animal.id}
                    type="button"
                    onClick={() => setSelectedAnimal(animal.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                      isSelected
                        ? "border-[#D47A22] bg-[#FFF5ED] shadow-xs ring-2 ring-[#D47A22]/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-badge text-[#D47A22] font-bold block mb-1">
                        {animal.hint}
                      </span>
                      <h4 className="font-title text-sm font-bold text-gray-900">
                        {animal.name}
                      </h4>
                      <p className="font-hand text-xs text-gray-600 mt-1">
                        {animal.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#올바르게_사과하기", "#상처_주지_않는_거절", "#갈등을_키우지_않으려면", "#진심이_담긴_인사약"]}
            onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
            onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
            guideText="갈등을 지혜롭게 다루는 나만의 수업 목표를 해시태그로 작성해 봅시다."
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#D47A22] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#B36214] active:scale-95"
            >
              <span>16칸 갈등 보드게임 하러 가기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (16칸 디지털 갈등 보드게임) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D47A22]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#D47A22] text-white text-xs font-badge font-bold rounded-full">
                  🎲 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  16칸 디지털 갈등 해결 보드게임
                </h3>
              </div>

              {/* Dice Roll Button */}
              <button
                type="button"
                onClick={handleRollDice}
                disabled={isRolling}
                className="flex items-center gap-2 px-4 py-2 bg-[#D47A22] text-white rounded-2xl font-badge font-bold text-xs sm:text-sm shadow-md hover:bg-[#B36214] transition active:scale-95"
              >
                <Dices className={`w-5 h-5 ${isRolling ? "animate-spin" : ""}`} />
                <span>주사위 굴리기 ({diceValue})</span>
              </button>
            </div>

            {/* 2 Recipes Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-badge">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-800">🍏 진심 사과 레시피 [인·사·약]</span>
                <p className="font-hand text-emerald-950">
                  <strong>[인]</strong>정(잘못 인정) ➔ <strong>[사]</strong>과(&ldquo;미안해&rdquo;) ➔ <strong>[약]</strong>속(재발 방지)
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-800">🍎 지혜로운 거절 레시피 [공·마·대]</span>
                <p className="font-hand text-amber-950">
                  <strong>[공]</strong>감(부탁에 공감) ➔ <strong>[마]</strong>음 표현(거절 이유) ➔ <strong>[대]</strong>안(다른 대안 제시)
                </p>
              </div>
            </div>

            {/* Board Tiles Carousel Mini Display */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-badge">
                <span className="text-[#D47A22] font-bold">
                  📍 현재 위치: {currentTile.no}번 칸
                </span>
                <span className="text-gray-500">
                  필요 레시피: <strong className="text-gray-900">{currentTile.recipe || "출발"}</strong>
                </span>
              </div>
              <p className="font-title text-base font-bold text-gray-900">
                &ldquo;{currentTile.title}&rdquo;
              </p>
            </div>

            {/* Solution Input Card */}
            <div className="p-5 bg-gradient-to-b from-[#FFF5ED] to-[#FCE6D2] rounded-2xl border border-[#D47A22]/30 space-y-2">
              <label className="block text-xs font-badge font-bold text-[#D47A22]">
                위 상황에 맞는 인사약 사과 또는 공마다 거절 문장 작성하기
              </label>
              <textarea
                value={resolvedMessage}
                onChange={(e) => setResolvedMessage(e.target.value)}
                placeholder="예: 친구가 우산을 빌려달라고 했을 때: 우산이 필요해서 물어봐 준 건 고맙지만(공감), 나도 비를 맞고 갈 수 없어서 빌려주긴 어려워(마음). 같이 쓰고 가자(대안)!"
                rows={3}
                className="w-full p-3 text-xs sm:text-sm bg-white border border-orange-200 rounded-xl font-hand leading-relaxed"
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#D47A22] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#B36214] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#D47A22]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 갈등 상황에서 회피하거나 맹목적으로 참지 않고 솔직히 소통할 준비가 되었나요?
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
                  Q2. 실수했을 땐 &lsquo;인사약&rsquo;으로 사과하고 곤란할 땐 &lsquo;공마다&rsquo;로 거절할 수 있나요?
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

          <div className="bg-gradient-to-r from-[#FFF5ED] to-[#FCE6D2] rounded-2xl p-5 border border-[#D47A22]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#D47A22] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#D47A22]">
              [갈등 예방! 3초 숨 고르고 인사약·공마다 실천하기]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 한 주 동안 친구에게 작은 실수라도 했다면 핑계 대지 않고 먼저 '미안해'라고 말하거나, 곤란한 부탁은 미안해하며 대안을 말해보기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#D47A22]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>12차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="갈등 보드게임을 통해 올바른 사과와 지혜로운 거절을 연습해 본 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D47A22] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#D47A22]" />
                <span>오늘 보드게임 해결 카드나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#D47A22]">
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
                <span>12차시 감정일기와 갈등 해결 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 13차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D47A22] to-amber-700 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-700/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>12차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
