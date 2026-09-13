"use client";

import React, { useState, useEffect } from "react";
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
  Thermometer,
  Wind,
  ShieldAlert,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

import {
  MusclePinchIllustration,
  FacialRelaxationIllustration,
  LegsToesIllustration,
  ButterflyHugIllustration
} from "@/components/lesson5/RelaxationIllustrations";

interface Lesson5ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
  isTeacher?: boolean;
}

export const Lesson5Module: React.FC<Lesson5ModuleProps> = ({
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
      text: `안녕, ${nickname}! 최근에 감정의 파도가 크게 요동쳐서 욱하거나 주체하기 힘들었던 순간이 있었니? 그때 어떤 마음이었어?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Broken Signal Chips & Hashtags)
  const brokenSignalCategories = [
    {
      category: "신체 반응",
      items: ["심장이 쿵쾅쿵쾅", "얼굴이 화끈거림", "숨이 가빠짐", "주먹에 힘이 꽉 들어감"],
    },
    {
      category: "행동 반응",
      items: ["말투가 퉁명스러워짐", "방문 쾅 닫기", "친구 눈 마주치기 싫음", "아무 말도 안 하고 입 닫기"],
    },
  ];
  const [selectedSignals, setSelectedSignals] = useState<string[]>(
    initialData?.interactiveData?.coolDown?.brokenSignals || [
      "심장이 쿵쾅쿵쾅",
      "말투가 퉁명스러워짐",
    ]
  );
  const [customSignal, setCustomSignal] = useState("");
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#심호흡_세번", "#감정의_파도타기", "#마음_온도_36.5도"]
  );

  // Step 3 State (Thermometer, 4-7-8 Breathing, Mantra Card)
  const [temperature, setTemperature] = useState<number>(
    initialData?.interactiveData?.coolDown?.selectedTemp || 80
  );
  const [mantraText, setMantraText] = useState<string>(
    initialData?.interactiveData?.coolDown?.mantra || "파도는 곧 지나간다"
  );
  const [actionText, setActionText] = useState<string>(
    initialData?.interactiveData?.coolDown?.action || "뒤돌아서 깊게 숨을 3번 쉬고 찬물 한 잔을 마시겠다"
  );

  // 5대 동영상 활동 워크시트 데이터 및 State
  const videoWorksheets = [
    {
      id: 1,
      title: "🎥 영상 1: 감정의 파도를 다스리는 3-10-3 원칙",
      videoUrl: "https://youtu.be/CyNx4jM6FNk",
      timestamp: "01:15 - 감정의 신체 신호 알아채기",
      quizQuestion: "Q1. 욱하는 감정이 들 때 가장 먼저 나타나는 신체 신호는 무엇일까요?",
      quizOptions: ["심장 쿵쾅거림 및 숨가쁨", "갑자기 잠이 옴", "손가락이 길어짐", "발가락이 간지러움"],
      correctQuizIndex: 0,
      reflectionPrompt: "💬 영상 속 3-10-3 호흡법 중 나에게 가장 도움이 될 것 같은 순간은 언제인가요?"
    },
    {
      id: 2,
      title: "🧘 영상 2: 3-10-3 긴급 정지 호흡 법실습",
      videoUrl: "https://youtu.be/vnS_NewSbU4",
      timestamp: "00:45 - 3초 멈춤과 10초 들이마시기",
      quizQuestion: "Q2. 3-10-3 호흡법에서 '3초' 동안 해야 할 행동은 무엇인가요?",
      quizOptions: ["말하기", "하던 행동을 멈추고 신체 신호 감지", "소리지르기", "뛰어가기"],
      correctQuizIndex: 1,
      reflectionPrompt: "💬 호흡을 따라 했을 때 내 마음의 온도는 몇 도 정도 내려갔나요?"
    },
    {
      id: 3,
      title: "💪 영상 3: 점진적 근육 이완법과 바디 스캔",
      videoUrl: "https://youtu.be/CyNx4jM6FNk",
      timestamp: "02:10 - 주먹 쥐고 풀기 릴랙스",
      quizQuestion: "Q3. 근육 이완법 시 주크박스 음악에 맞춰 힘을 줄 때 초 수는?",
      quizOptions: ["1초", "5초간 꽉 쥐었다가 풀기", "100초", "안 쥠"],
      correctQuizIndex: 1,
      reflectionPrompt: "💬 근육에 힘을 줬다 뺐을 때 내 몸의 어떤 부위가 가장 편안해졌나요?"
    },
    {
      id: 4,
      title: "🦋 영상 4: 나비 포옹법 (Self-Soothing Butterfly Hug)",
      videoUrl: "https://youtu.be/vnS_NewSbU4",
      timestamp: "01:30 - 양팔 교차하여 가슴 토닥이기",
      quizQuestion: "Q4. 나비 포옹법을 할 때 손을 어떻게 위치시켜야 할까요?",
      quizOptions: ["양팔을 엑스(X)자로 교차해 내 쇄골 아래 토닥이기", "머리 위로 만세하기", "뒷짐 지기", "주머니에 넣기"],
      correctQuizIndex: 0,
      reflectionPrompt: "💬 나 자신을 토닥여주며 들려주고 싶은 스스로의 위로 한마디는?"
    },
    {
      id: 5,
      title: "🛡️ 영상 5: 욱할 때 펼치는 SOS 마음 부적 제작",
      videoUrl: "https://youtu.be/CyNx4jM6FNk",
      timestamp: "03:00 - 나만의 SOS 행동 지침 만들기",
      quizQuestion: "Q5. SOS 부적에 적어야 할 가장 중요한 내용은 무엇일까요?",
      quizOptions: ["내가 욱했을 때 즉시 실행할 나만의 신호 및 행동 규칙", "친구 탓하는 글", "시험 정답", "노래 가사"],
      correctQuizIndex: 0,
      reflectionPrompt: "💬 나의 SOS 부적에 들어갈 단 한 문장의 주문을 적어주세요."
    }
  ];

  const [selectedVideoTab, setSelectedVideoTab] = useState(1);
  const [videoAnswers, setVideoAnswers] = useState<Record<number, { quizSelected: number | null; reflection: string }>>({
    1: { quizSelected: null, reflection: "" },
    2: { quizSelected: null, reflection: "" },
    3: { quizSelected: null, reflection: "" },
    4: { quizSelected: null, reflection: "" },
    5: { quizSelected: null, reflection: "" }
  });

  // 4-7-8 Breathing Guide Interactive State
  const [breathPhase, setBreathPhase] = useState<"ready" | "inhale" | "hold" | "exhale">("ready");
  const [breathCount, setBreathCount] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      if (breathPhase === "ready") {
        setBreathPhase("inhale");
        setBreathCount(4);
      } else if (breathPhase === "inhale") {
        if (breathCount > 1) {
          timer = setTimeout(() => setBreathCount(breathCount - 1), 1000);
        } else {
          setBreathPhase("hold");
          setBreathCount(7);
        }
      } else if (breathPhase === "hold") {
        if (breathCount > 1) {
          timer = setTimeout(() => setBreathCount(breathCount - 1), 1000);
        } else {
          setBreathPhase("exhale");
          setBreathCount(8);
        }
      } else if (breathPhase === "exhale") {
        if (breathCount > 1) {
          timer = setTimeout(() => setBreathCount(breathCount - 1), 1000);
        } else {
          setBreathPhase("inhale");
          setBreathCount(4);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isBreathingActive, breathPhase, breathCount]);

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
          lessonNo: 5,
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
          text: `감정의 파도는 누구나 겪는 자연스러운 현상이야! 4-7-8 호흡으로 파도를 가라앉혀 보자 🌊`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleSignal = (sig: string) => {
    if (selectedSignals.includes(sig)) {
      setSelectedSignals(selectedSignals.filter((s) => s !== sig));
    } else {
      setSelectedSignals([...selectedSignals, sig]);
    }
  };

  const handleAddCustomSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSignal.trim() && !selectedSignals.includes(customSignal.trim())) {
      setSelectedSignals([...selectedSignals, customSignal.trim()]);
      setCustomSignal("");
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
      id: initialData?.id || `entry-5-${Date.now()}`,
      lessonNo: 5,
      lessonTitle: lesson.topic,
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "5차시 수업을 통해 감정 온도계와 마법 주문 카드를 만들어 감정 조절법을 익혔다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        coolDown: {
          brokenSignals: selectedSignals,
          mantra: mantraText,
          action: actionText,
          selectedTemp: temperature,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Deep Purple Themed Banner Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-deeppurple/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-deeppurple-light via-white to-purple-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-deeppurple text-white text-xs font-badge rounded-md font-bold">
                5차시 • {lesson.area}
              </span>
              <span className="text-xs text-gray-500 font-sans">{lesson.workbookPages}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              {lesson.topic}
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">{lesson.goal}</p>

            {/* 교사 전용 이완법 안내 영상 보기 버튼 */}
            {isTeacher && (
              <div className="mt-2.5">
                <a
                  href="https://youtu.be/2e53yuS3mNY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white rounded-xl text-xs font-badge font-bold shadow-md transition-all transform hover:scale-105 inline-flex items-center gap-2 border border-purple-400/50 ring-2 ring-purple-300/40"
                  title="교실 빔프로젝터/TV 송출 전용 이완법 안내 영상"
                >
                  <span>📺 [교사 전용] 이완법 안내 영상 보기 (유튜브)</span>
                  <span>🔗</span>
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "고장 경보등" },
              { num: 3, label: "마법 주문 카드" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-deeppurple text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-deeppurple/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-deeppurple text-white text-xs font-badge font-bold rounded-full">
                  #오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer text={lesson.letterContent} themeColor="#5B4B8A" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-deeppurple/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-deeppurple-light text-deeppurple flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🌊
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 감정의 파도를 다스려볼까?
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;{lesson.letterContent}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong Interview */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-deeppurple/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-deeppurple" />
                <span className="font-title text-sm font-bold text-deeppurple">
                  마음이와의 5차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-deeppurple text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-deeppurple text-white rounded-tr-none"
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
                  placeholder="예: 어제 친구가 내 필통을 말없이 가져갔을 때 순간 욱해서 화가 났어."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deeppurple font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-deeppurple text-white rounded-xl text-xs font-badge font-bold hover:bg-purple-900 disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-deeppurple text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-purple-900 transition active:scale-95"
              >
                <span>마음 온도 조절하러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 (고장 경보등 & 해시태그) */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Broken Signal Checker */}
          <div className="bg-white rounded-2xl p-6 border border-deeppurple/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
              <ShieldAlert className="w-5 h-5 text-deeppurple" />
              <span>활동 A: 내 마음버튼 고장 경보등 (자가 점검)</span>
            </h3>
            <p className="font-sans text-xs text-gray-500 mb-4">
              내 감정 조절 버튼이 고장 났을 때, 나에게 주로 나타나는 신체·행동 반응은? (복수 선택)
            </p>

            <div className="space-y-4">
              {brokenSignalCategories.map((cat, idx) => (
                <div key={idx} className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-badge font-bold text-gray-700 block mb-2">
                    ✦ {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((sig) => {
                      const isSelected = selectedSignals.includes(sig);
                      return (
                        <button
                          key={sig}
                          type="button"
                          onClick={() => toggleSignal(sig)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-badge font-bold transition-all ${
                            isSelected
                              ? "bg-deeppurple text-white scale-105 shadow-sm border border-deeppurple"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {sig}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCustomSignal} className="flex gap-2 max-w-sm mt-3">
              <input
                type="text"
                value={customSignal}
                onChange={(e) => setCustomSignal(e.target.value)}
                placeholder="나만의 고장 신호 직접 적기"
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deeppurple font-hand"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-gray-700 text-white text-xs font-badge rounded-xl hover:bg-gray-800"
              >
                추가
              </button>
            </form>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-deeppurple text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-purple-900 active:scale-95"
            >
              <span>온도계 & 주문 카드 만들기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (감정 온도계, 4-7-8 호흡, 마법 주문 카드) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-deeppurple/30 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="px-3 py-1 bg-deeppurple text-white text-xs font-badge font-bold rounded-full">
                  🌡️ 핵심활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  내 마음 온도를 조절해 볼까요?
                </h3>
              </div>
              <Thermometer className="w-6 h-6 text-deeppurple" />
            </div>

            {/* Interactive 1: Emotion Thermometer & 4-7-8 Breath Animation */}
            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-badge font-bold text-gray-800">
                  인터랙션 1: 감정 온도계 & 5단계 조절법
                </span>
                <span className="text-sm font-title font-bold text-deeppurple">
                  현재 온도: {temperature}°C
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-deeppurple cursor-pointer"
              />

              {/* Temperature Action Guide */}
              <div className="mt-3 p-3 bg-white rounded-xl border border-purple-100 text-xs font-hand text-gray-700">
                {temperature >= 90 ? (
                  <p className="text-red-600 font-bold">
                    🔥 100°C 폭발 직전: &ldquo;잠깐 멈춤! 마음속으로 10초 카운트다운을 세어보세요.&rdquo;
                  </p>
                ) : temperature >= 70 ? (
                  <p className="text-orange-600 font-bold">
                    🌬️ 80°C 짜증 / 분노: &ldquo;천천히 들이마시고 내쉬는 4-7-8 심호흡을 실행해 보세요.&rdquo;
                  </p>
                ) : temperature >= 45 ? (
                  <p className="text-amber-600 font-bold">
                    💧 50°C 답답 / 불안: &ldquo;시원한 물 한 잔 마시기 or 가볍게 제자리 털기&rdquo;
                  </p>
                ) : (
                  <p className="text-emerald-600 font-bold">
                    🍃 36.5°C 평온 상태: &ldquo;내가 좋아하는 음악 듣기 / 가벼운 산책하기&rdquo;
                  </p>
                )}
              </div>

              {/* 4-7-8 Breathing Guide Interactive Box */}
              <div className="mt-4 p-4 bg-white/90 rounded-2xl border border-deeppurple/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-title text-xl font-bold transition-all duration-700 ${
                      breathPhase === "inhale"
                        ? "bg-blue-500 scale-125 shadow-lg"
                        : breathPhase === "hold"
                        ? "bg-purple-600 scale-110 shadow-md"
                        : breathPhase === "exhale"
                        ? "bg-emerald-500 scale-90 shadow-sm"
                        : "bg-gray-400"
                    }`}
                  >
                    {isBreathingActive ? breathCount : "4-7-8"}
                  </div>
                  <div>
                    <h5 className="font-title text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <Wind className="w-4 h-4 text-deeppurple" />
                      <span>4-7-8 릴랙스 호흡 가이드</span>
                    </h5>
                    <p className="font-hand text-xs text-gray-600">
                      {breathPhase === "inhale"
                        ? "코로 숨을 천천히 들이마십니다 (4초)"
                        : breathPhase === "hold"
                        ? "숨을 멈추고 마음을 정돈합니다 (7초)"
                        : breathPhase === "exhale"
                        ? "입으로 천천히 후- 내쉽니다 (8초)"
                        : "버튼을 눌러 호흡 훈련을 시작해 보세요"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBreathingActive(!isBreathingActive)}
                    className="px-3.5 py-1.5 bg-deeppurple text-white rounded-xl text-xs font-badge font-bold flex items-center gap-1 shadow-xs hover:bg-purple-900"
                  >
                    {isBreathingActive ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>일시정지</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>호흡 시작</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBreathingActive(false);
                      setBreathPhase("ready");
                    }}
                    className="p-1.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
                    title="초기화"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
            {/* 점진적 근육 이완법 3가지 동작 일러스트 카드 3종 */}
            <div className="mt-6 border-t border-purple-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-badge font-bold text-deeppurple flex items-center gap-1.5">
                  💪 점진적 근육 이완법 3가지 동작 가이드
                </span>
                <span className="text-[11px] font-hand text-gray-500">각 신체 부위별 5초 힘주기 ➔ 툭 힘빼기 동작</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 카드 1: 주먹과 어깨 */}
                <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-badge font-bold text-purple-950">1. 주먹과 어깨</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">5초 힘주기</span>
                  </div>
                  <p className="text-xs font-hand text-gray-600 leading-relaxed">
                    양주먹을 불끈 쥐고 어깨를 귀 근처까지 5초간 바짝 들어올린 후, 툭 소리와 함께 아래로 떨구어 긴장을 풉니다.
                  </p>
                  <MusclePinchIllustration />
                </div>

                {/* 카드 2: 얼굴과 턱 */}
                <div className="bg-white p-4 rounded-2xl border border-pink-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-badge font-bold text-pink-950">2. 얼굴과 턱 찡그리기</span>
                    <span className="text-[10px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">5초 찌푸리기</span>
                  </div>
                  <p className="text-xs font-hand text-gray-600 leading-relaxed">
                    눈, 코, 입을 얼굴 중앙으로 꽉 모아 5초간 찌푸린 후, 턱과 마스크 입가에 들어가 있던 힘을 살며시 풉니다.
                  </p>
                  <FacialRelaxationIllustration />
                </div>

                {/* 카드 3: 다리와 발가락 */}
                <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-badge font-bold text-blue-950">3. 다리와 발가락</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">5초 오므리기</span>
                  </div>
                  <p className="text-xs font-hand text-gray-600 leading-relaxed">
                    발가락을 발바닥 쪽으로 꽉 오므려 5초간 힘을 준 뒤, 발가락을 쫙 펴며 다리 전체의 무게감을 바닥으로 보냅니다.
                  </p>
                  <LegsToesIllustration />
                </div>
              </div>
            </div>

            {/* 나비 포옹법 (Butterfly Hug) 일러스트 카드 */}
            <div className="mt-4 bg-amber-50/80 p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-badge font-bold text-amber-950 flex items-center gap-1.5">
                  🦋 마음을 다독이는 나비 포옹법 (Self-Soothing Butterfly Hug)
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">Self-Care</span>
              </div>
              <p className="text-xs font-hand text-gray-700 leading-relaxed">
                양팔을 가슴 앞에서 X자로 교차하여 양손을 반대편 어깨와 쇄골 아래에 올리고, 나비가 날갯짓하듯 좌우 손을 번갈아 퐁당퐁당 톡톡 두드려 줍니다.
              </p>
              <ButterflyHugIllustration />
            </div>

            {/* Interactive 2: Magic Cool-Down Mantra Card Builder */}
            <div className="border-t border-gray-100 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-badge font-bold text-gray-800 block">
                  인터랙션 2: 나만의 감정 조절 마법 주문 카드 제작
                </span>

                <div>
                  <label className="text-[11px] font-badge text-gray-600 block mb-1">
                    화가 날 때 속으로 외칠 나만의 마법 주문
                  </label>
                  <input
                    type="text"
                    value={mantraText}
                    onChange={(e) => setMantraText(e.target.value)}
                    placeholder="예: 파도는 곧 지나간다 / 그럴 수도 있지"
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-hand"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-badge text-gray-600 block mb-1">
                    주문을 외친 후 실천할 쿨다운 행동
                  </label>
                  <textarea
                    value={actionText}
                    onChange={(e) => setActionText(e.target.value)}
                    placeholder="예: 뒤돌아서 깊게 숨 3번 쉬고 찬물 한 잔 마시기"
                    rows={2}
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-hand"
                  />
                </div>
              </div>

              {/* Mantra Card Visual Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FAF5FF] to-[#EDE9FE] rounded-3xl border-2 border-dashed border-deeppurple/40 shadow-md">
                <div className="w-full bg-white p-5 rounded-2xl border border-deeppurple/30 shadow-md text-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-deeppurple text-white flex items-center justify-center mx-auto text-sm font-bold shadow-xs">
                    🪄
                  </div>
                  <span className="text-[11px] font-badge text-deeppurple font-bold block">
                    {nickname}의 감정 조절 마법 주문 카드
                  </span>
                  <div className="p-3 bg-deeppurple-light rounded-xl border border-deeppurple/20">
                    <p className="font-title text-base font-bold text-deeppurple">
                      &ldquo;{mantraText || "마법 주문 입력"}&rdquo;
                    </p>
                  </div>
                  <p className="font-hand text-xs text-gray-700">
                    &ldquo;화가 나거나 파도가 칠 때, 나는 속으로 외치고{" "}
                    <span className="font-bold text-gray-900">{actionText || "..."}</span>를 하겠다!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive 3: 5대 동영상 시청각 활동 워크시트 */}
            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-badge font-bold text-deeppurple flex items-center gap-1.5">
                  🎬 5대 시청각 동영상 학습 워크시트 (타임스탬프 &amp; 퀴즈 &amp; 성찰)
                </span>
                <span className="text-[11px] font-hand text-gray-500">탭을 클릭하여 5개 동영상 활동을 완료하세요</span>
              </div>

              {/* 동영상 탭 버튼 */}
              <div className="flex flex-wrap gap-1.5 border-b pb-2">
                {videoWorksheets.map((ws) => (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => setSelectedVideoTab(ws.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-badge font-bold transition-all ${
                      selectedVideoTab === ws.id
                        ? "bg-deeppurple text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    영상 {ws.id}
                  </button>
                ))}
              </div>

              {/* 선택된 동영상 워크시트 본문 */}
              {(() => {
                const currentWs = videoWorksheets.find((w) => w.id === selectedVideoTab)!;
                const currentAns = videoAnswers[selectedVideoTab] || { quizSelected: null, reflection: "" };

                return (
                  <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-200/80 pb-3">
                      <div>
                        <h4 className="font-title text-sm sm:text-base font-bold text-purple-950">
                          {currentWs.title}
                        </h4>
                        <p className="text-xs font-hand text-purple-800 mt-0.5">
                          ⏱️ 주요 타임스탬프: <strong>{currentWs.timestamp}</strong>
                        </p>
                      </div>
                      <a
                        href={currentWs.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-badge font-bold shadow-2xs transition flex items-center gap-1 shrink-0 self-start sm:self-auto"
                      >
                        <span>▶ 유튜브 영상 시청</span>
                      </a>
                    </div>

                    {/* O/X 및 객관식 퀴즈 */}
                    <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-2">
                      <label className="text-xs font-badge font-bold text-gray-800 block">
                        {currentWs.quizQuestion}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentWs.quizOptions.map((opt, idx) => {
                          const isSelected = currentAns.quizSelected === idx;
                          const isCorrect = idx === currentWs.correctQuizIndex;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setVideoAnswers((prev) => ({
                                  ...prev,
                                  [selectedVideoTab]: {
                                    ...prev[selectedVideoTab],
                                    quizSelected: idx,
                                  },
                                }));
                              }}
                              className={`p-2 rounded-xl text-xs font-badge text-left transition ${
                                isSelected
                                  ? isCorrect
                                    ? "bg-emerald-100 text-emerald-900 border-2 border-emerald-400 font-bold"
                                    : "bg-rose-100 text-rose-900 border-2 border-rose-400 font-bold"
                                  : "bg-gray-50 text-gray-700 hover:bg-purple-100 border border-gray-200"
                              }`}
                            >
                              <span>{idx + 1}. {opt}</span>
                              {isSelected && (isCorrect ? " ✅ (정답!)" : " ❌ (다시 생각해보세요)")}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 성찰 질문 작성 */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-badge font-bold text-purple-950 block">
                        {currentWs.reflectionPrompt}
                      </label>
                      <input
                        type="text"
                        value={currentAns.reflection}
                        onChange={(e) => {
                          const val = e.target.value;
                          setVideoAnswers((prev) => ({
                            ...prev,
                            [selectedVideoTab]: {
                              ...prev[selectedVideoTab],
                              reflection: val,
                            },
                          }));
                        }}
                        placeholder="나의 생각과 느낌을 짧게 기록해 주세요"
                        className="w-full p-2.5 text-xs bg-white border border-purple-200 rounded-xl font-hand focus:ring-2 focus:ring-purple-400 outline-none"
                      />
                    </div>
                  </div>
                );
              })()}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-deeppurple text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-purple-900 active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-deeppurple/30 shadow-sm">
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

          {/* Mission */}
          <div className="bg-gradient-to-r from-deeppurple-light to-[#E9D5FF] rounded-2xl p-5 border border-deeppurple/30 shadow-xs">
            <div className="flex items-center gap-2 text-deeppurple font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-deeppurple">
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

          <div className="bg-white rounded-2xl p-5 border border-deeppurple/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>5차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="감정의 파도를 다스리는 나만의 호흡법과 마법 주문 카드를 써본 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-deeppurple font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-deeppurple" />
                <span>오늘 완성한 마법 주문 카드나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-deeppurple">
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
                <span>5차시 감정일기와 마법 주문 데이터가 안전하게 저장되었습니다!</span>
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-deeppurple to-purple-800 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-purple-700/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>5차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
