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
  HelpCircle,
  X,
  Palette,
  Eye,
  Smile,
  Info,
} from "lucide-react";

interface Lesson4ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson4Module: React.FC<Lesson4ModuleProps> = ({
  lesson,
  nickname,
  initialData,
  onSave,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [showImportanceModal, setShowImportanceModal] = useState(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: `안녕, ${nickname}! 오늘 아침 눈을 떠서 지금까지, 네 마음속을 스쳐 지나간 감정 구름 중에 가장 짙게 느껴진 감정은 무엇이니?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Hashtags)
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#감정_알아차리기", "#내_마음의_날씨", "#나는_다양한_감정을_느낄_수_있어"]
  );

  // Step 3 State (Emotion Word Palette & Monster Builder)
  const emotionPalette = [
    {
      family: "기쁨 / 긍정 계열",
      color: "text-amber-600 bg-amber-50 border-amber-200",
      words: ["벅참", "홀가분함", "뿌듯함", "설렘", "든든함"],
    },
    {
      family: "슬픔 / 공허 계열",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      words: ["먹먹함", "서운함", "공허함", "울적함", "외로움"],
    },
    {
      family: "분노 / 답답 계열",
      color: "text-rose-600 bg-rose-50 border-rose-200",
      words: ["억울함", "답답함", "약오름", "얄미움", "부글부글"],
    },
    {
      family: "불안 / 긴장 계열",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      words: ["조마조마함", "초조함", "어안이 벙벙함", "머쓱함", "긴장됨"],
    },
  ];

  const [selectedWords, setSelectedWords] = useState<string[]>(
    initialData?.interactiveData?.emotionWords || ["벅참", "서운함", "조마조마함"]
  );

  // Monster Builder State
  const monsterColors = [
    { name: "썬더 옐로우", hex: "#FBBF24" },
    { name: "스카이 블루", hex: "#60A5FA" },
    { name: "민트 그린", hex: "#34D399" },
    { name: "베리 핑크", hex: "#F472B6" },
    { name: "미스틱 퍼플", hex: "#A78BFA" },
    { name: "파이어 레드", hex: "#F87171" },
  ];

  const eyeOptions = ["👀", "✨", "🥺", "🧐", "😴", "🔥"];
  const mouthOptions = ["😊", "😮", "😬", "😭", "😤", "😋"];

  const [monsterState, setMonsterState] = useState({
    name: initialData?.interactiveData?.emotionMonster?.name || "몽글이",
    state: initialData?.interactiveData?.emotionMonster?.state || "따뜻하지만 살짝 조마조마한 상태",
    color: initialData?.interactiveData?.emotionMonster?.color || "#60A5FA",
    eye: initialData?.interactiveData?.emotionMonster?.eye || "👀",
    mouth: initialData?.interactiveData?.emotionMonster?.mouth || "😊",
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
          lessonNo: 4,
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
          text: `그런 감정을 느꼈구나! 감정은 나쁜 게 아니라 내 마음의 다정한 신호등이야 🚦`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleWord = (w: string) => {
    if (selectedWords.includes(w)) {
      setSelectedWords(selectedWords.filter((item) => item !== w));
    } else {
      if (selectedWords.length >= 3) {
        alert("감정 단어는 최대 3개까지 선택할 수 있어요!");
        return;
      }
      setSelectedWords([...selectedWords, w]);
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
      id: initialData?.id || `entry-4-${Date.now()}`,
      lessonNo: 4,
      lessonTitle: lesson.topic,
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "4차시 수업을 통해 다양한 감정 단어를 배우고 내 마음속 감정 몬스터를 만들었다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        emotionWords: selectedWords,
        emotionMonster: {
          ...monsterState,
          words: selectedWords,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Sky Blue Themed Banner Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-skyblue/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-skyblue-light via-white to-blue-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-skyblue text-white text-xs font-badge rounded-md font-bold">
                4차시 • {lesson.area}
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
              { num: 2, label: "학습목표 & 티켓" },
              { num: 3, label: "감정 캐릭터" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-skyblue text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#F0F8FF] to-[#EBF5FC] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-skyblue/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-skyblue text-white text-xs font-badge font-bold rounded-full">
                  [오늘의 마음 편지] 오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer text={lesson.letterContent} themeColor="#1E88E5" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-skyblue/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-skyblue-light text-skyblue flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🚦
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 내 마음속 감정 신호등을 켜볼까?
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;{lesson.letterContent}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong Interview */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-skyblue/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-skyblue" />
                <span className="font-title text-sm font-bold text-skyblue">
                  마음이와의 4차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-skyblue text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-skyblue text-white rounded-tr-none"
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
                  placeholder="예: 오늘은 친구와 장난치며 벅차고 신나는 기쁨이 가장 짙었어!"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-skyblue font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-skyblue text-white rounded-xl text-xs font-badge font-bold hover:bg-blue-600 disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-skyblue text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-blue-600 transition active:scale-95"
              >
                <span>내 감정 만나러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 (학습목표 확인 & 해시태그 티켓) */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-skyblue to-[#1565C0] text-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-badge opacity-90 mb-1">
              <span>학습목표 확인하기</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full">[이번 시간에는]</span>
            </div>
            <h3 className="font-title text-base sm:text-lg font-bold">
              &ldquo;일상생활 속에서 자신이 느끼는 다양한 감정에 대해 알아봅시다.&rdquo;
            </h3>
          </div>

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
              className="flex items-center gap-2 px-5 py-2.5 bg-skyblue text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-blue-600 active:scale-95"
            >
              <span>감정 캐릭터 만들러 가기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (다양한 감정 알아차리기 & 몬스터 빌더) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-skyblue/30 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-skyblue text-white text-xs font-badge font-bold rounded-full">
                  [마음 키우기] 다양한 감정을 어떻게 알아차릴 수 있을까?
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  내 마음속 감정 캐릭터 표현하기
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImportanceModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-skyblue-light text-skyblue border border-skyblue/30 rounded-xl text-xs font-badge font-bold hover:bg-skyblue hover:text-white transition"
              >
                <Info className="w-3.5 h-3.5" />
                <span>더 읽어보기: 감정 인식의 중요성</span>
              </button>
            </div>

            {/* Interaction 1: 4 Emotion Families Word Palette */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-badge font-bold text-gray-800">
                  인터랙션 ① 세분화된 감정 단어 팔레트 (최대 3개 선택)
                </span>
                <span className="text-xs font-badge text-skyblue bg-skyblue-light px-2.5 py-0.5 rounded-full">
                  선택됨: {selectedWords.length}/3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {emotionPalette.map((fam, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="text-[11px] font-badge font-bold text-gray-600 block mb-2">
                      ✦ {fam.family}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {fam.words.map((w) => {
                        const isSelected = selectedWords.includes(w);
                        return (
                          <button
                            key={w}
                            type="button"
                            onClick={() => toggleWord(w)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-badge font-bold transition ${
                              isSelected
                                ? "bg-skyblue text-white scale-105 shadow-2xs"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                          >
                            {w}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interaction 2: Custom Emotion Monster Builder */}
            <div className="border-t border-gray-100 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-badge font-bold text-gray-800 block">
                  인터랙션 ② 나만의 감정 몬스터 커스텀
                </span>

                {/* Color */}
                <div>
                  <label className="text-[11px] font-badge text-gray-600 block mb-1">
                    캐릭터 색상 선택
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {monsterColors.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setMonsterState({ ...monsterState, color: c.hex })}
                        style={{ backgroundColor: c.hex }}
                        className={`w-7 h-7 rounded-full border transition ${
                          monsterState.color === c.hex
                            ? "scale-110 ring-2 ring-offset-2 ring-gray-600 border-white"
                            : "border-transparent opacity-85"
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Eyes & Mouth */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-badge text-gray-600 block mb-1">
                      눈 표정 스티커
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {eyeOptions.map((eye) => (
                        <button
                          key={eye}
                          type="button"
                          onClick={() => setMonsterState({ ...monsterState, eye })}
                          className={`p-1.5 text-base rounded-lg border ${
                            monsterState.eye === eye
                              ? "bg-skyblue-light border-skyblue"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          {eye}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-badge text-gray-600 block mb-1">
                      입 모양 스티커
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {mouthOptions.map((mouth) => (
                        <button
                          key={mouth}
                          type="button"
                          onClick={() => setMonsterState({ ...monsterState, mouth })}
                          className={`p-1.5 text-base rounded-lg border ${
                            monsterState.mouth === mouth
                              ? "bg-skyblue-light border-skyblue"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          {mouth}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Monster Naming & State Description */}
                <div>
                  <label className="text-[11px] font-badge text-gray-600 block mb-1">
                    캐릭터 이름과 상태 명명하기
                  </label>
                  <input
                    type="text"
                    value={monsterState.name}
                    onChange={(e) =>
                      setMonsterState({ ...monsterState, name: e.target.value })
                    }
                    placeholder="이 캐릭터의 이름 (예: 몽글이)"
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-xl mb-1.5 font-hand"
                  />
                  <input
                    type="text"
                    value={monsterState.state}
                    onChange={(e) =>
                      setMonsterState({ ...monsterState, state: e.target.value })
                    }
                    placeholder="지금 상태 (예: 시험을 앞두고 살짝 조마조마하지만 든든한 상태)"
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-hand"
                  />
                </div>
              </div>

              {/* Monster Preview Card */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F0F8FF] to-[#E6F3FF] rounded-3xl border-2 border-dashed border-skyblue/40">
                <div
                  style={{ backgroundColor: monsterState.color }}
                  className="w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-xl animate-float-slow transition-all duration-300 relative"
                >
                  <div className="text-3xl mb-1">{monsterState.eye}</div>
                  <div className="text-2xl">{monsterState.mouth}</div>
                  {/* Floating selected words around */}
                  <div className="absolute -bottom-2 flex flex-wrap justify-center gap-1">
                    {selectedWords.map((w, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/90 text-gray-800 font-badge font-bold px-2 py-0.5 rounded-full shadow-2xs"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="font-title font-bold text-sm text-gray-900">
                    &lt;{monsterState.name || "내 감정 몬스터"}&gt;
                  </p>
                  <p className="font-hand text-xs text-gray-700 mt-0.5">
                    &ldquo;지금 <span className="font-bold">{monsterState.state || "..."}</span>예요!&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Importance Modal Popup */}
          {showImportanceModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl animate-scale-in border-4 border-skyblue/30">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="font-title text-lg font-bold text-skyblue">
                    💡 감정 인식의 중요성
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowImportanceModal(false)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 bg-skyblue-light rounded-2xl border border-skyblue/30 text-center">
                  <p className="font-title text-sm sm:text-base font-bold text-gray-900">
                    &ldquo;나의 감정을 제대로 알아야 감정을 현명하게 표현할 수 있어요.&rdquo;
                  </p>
                </div>
                <p className="font-hand text-xs sm:text-sm text-gray-700 leading-relaxed">
                  우리는 종종 화가 날 때 &lsquo;짜증나&rsquo;라고 뭉뚱그려 말하지만, 속으로는 서운함이나 조마조마함이 숨어있을 수 있어요. 내 마음의 날씨를 정확히 알아차릴 때, 감정에 휘둘리지 않고 지혜롭게 대처할 수 있답니다!
                </p>
                <button
                  type="button"
                  onClick={() => setShowImportanceModal(false)}
                  className="w-full py-2 bg-skyblue text-white rounded-xl font-badge font-bold text-sm hover:bg-blue-600 transition"
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
              className="flex items-center gap-2 px-5 py-2.5 bg-skyblue text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-blue-600 active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-skyblue/30 shadow-sm">
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

          <div className="bg-gradient-to-r from-skyblue-light to-[#E3F2FD] rounded-2xl p-5 border border-skyblue/30 shadow-xs">
            <div className="flex items-center gap-2 text-skyblue font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-skyblue">
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

          <div className="bg-white rounded-2xl p-5 border border-skyblue/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>4차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="내 감정에 구체적인 이름을 붙이고 감정 몬스터를 만들어본 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-skyblue font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-skyblue" />
                <span>오늘 완성한 감정 캐릭터나 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-skyblue">
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
                <span>4차시 감정일기와 몬스터 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  5차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-skyblue to-[#1565C0] text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-blue-500/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>4차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
