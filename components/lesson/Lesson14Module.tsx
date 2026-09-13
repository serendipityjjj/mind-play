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
  Shield,
  Layers,
  Award,
  AlertTriangle,
  Heart,
  Check,
  Zap,
} from "lucide-react";

interface Lesson14ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

interface SkillItem {
  id: number;
  lesson: string;
  name: string;
  icon: string;
  category: "자신" | "감정" | "관계" | "선택";
  desc: string;
}

const ALL_SKILLS: SkillItem[] = [
  { id: 1, lesson: "1~2차시", name: "강점 보석 탐색", icon: "💎", category: "자신", desc: "나만의 고유한 빛과 긍정 자원 찾기" },
  { id: 2, lesson: "3차시", name: "나다움 가면 표현", icon: "🎭", category: "자신", desc: "진솔한 내면을 솔직하게 표현하기" },
  { id: 3, lesson: "4차시", name: "감정 단어 알아차림", icon: "🔍", category: "감정", desc: "복합적인 속마음의 세밀한 이름표 붙이기" },
  { id: 4, lesson: "5차시", name: "4-7-8 심호흡 & 마음 쉼", icon: "🧘", category: "감정", desc: "분노와 불안을 가라앉히는 신체 이완" },
  { id: 5, lesson: "6차시", name: "ABCD 생각 뒤집기", icon: "🔄", category: "감정", desc: "비합리적 흑백논리를 유연하게 바꾸기" },
  { id: 6, lesson: "7차시", name: "스트레스 바구니 분리", icon: "🧺", category: "감정", desc: "통제 가능한 일과 불가능한 일 구분하기" },
  { id: 7, lesson: "8차시", name: "'오히려 좋아' 재해석", icon: "🍀", category: "감정", desc: "역경 속에서 다행과 배움의 씨앗 찾기" },
  { id: 8, lesson: "9차시", name: "다름 인정 & 존중 도장", icon: "🤝", category: "관계", desc: "틀림이 아닌 다양성을 너그럽게 수용하기" },
  { id: 9, lesson: "10차시", name: "손하트 공감 & 입장 바꾸기", icon: "❤️", category: "관계", desc: "평가 없이 상대의 마음 온도에 맞춰주기" },
  { id: 10, lesson: "11차시", name: "'나-전달법' 솔직 대화", icon: "💬", category: "관계", desc: "상처 주지 않고 사실-감정-바람 전하기" },
  { id: 11, lesson: "12차시", name: "먼저 손 내미는 사과/화해", icon: "🕊️", category: "관계", desc: "갈등을 키우지 않고 회복의 다리 놓기" },
  { id: 12, lesson: "13차시", name: "책임 있는 가치관 선택", icon: "⚖️", category: "선택", desc: "결과를 신중히 예측하고 내 결정 책임지기" },
];

interface TowerCrisis {
  id: number;
  title: string;
  situation: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

const CRISES: TowerCrisis[] = [
  {
    id: 1,
    title: "⚡ 돌발 위기 1: 손 떨림과 실수 발생!",
    situation: "카드를 3층까지 올리던 중 실수로 살짝 부딪혀 타워가 흔들렸습니다! 친구가 당황해 굳어버렸어요.",
    options: [
      { text: "'4-7-8 심호흡'을 함께하며 '괜찮아, 천천히 다시 중심 잡자!' 격려한다.", correct: true, feedback: "최고의 팀워크! 불안을 가라앉히고 안정된 밸런스를 되찾았습니다." },
      { text: "'조심 좀 하지 왜 그랬어?'라며 친구를 탓한다.", correct: false, feedback: "비난은 긴장감을 높여 타워가 더 흔들리게 만듭니다." },
    ],
  },
  {
    id: 2,
    title: "🔥 돌발 위기 2: 타워 지붕 형태 의견 충돌!",
    situation: "5층 지붕을 뾰족하게 세울지, 넓은 평면으로 할지 조원들 간에 의견이 팽팽하게 엇갈립니다.",
    options: [
      { text: "'나-전달법'으로 각자 아이디어의 장점을 설명하고 '하이브리드 절충안'을 찾는다.", correct: true, feedback: "현명한 소통! 두 아이디어가 결합되어 훨씬 튼튼한 구조가 완성되었습니다." },
      { text: "내 의견을 무조건 관철시키기 위해 끝까지 양보하지 않는다.", correct: false, feedback: "고집은 협동의 흐름을 끊고 시간을 낭비하게 만듭니다." },
    ],
  },
  {
    id: 3,
    title: "⏱️ 돌발 위기 3: 남은 시간 부족과 초조함!",
    situation: "제한 시간이 2분밖에 남지 않아 모두가 조급해하며 손이 분주해집니다.",
    options: [
      { text: "'오히려 좋아! 지금 집중하면 충분해!' 긍정을 외치고 역할(지지대/카드배치)을 신속히 나눈다.", correct: true, feedback: "빛나는 시너지! 위기 속에서도 긍정 에너지와 분업으로 7층을 완벽히 완성했습니다!" },
      { text: "시간이 없으니 대충 아무렇게나 마구 쌓아 올린다.", correct: false, feedback: "성급함은 타워를 한순간에 무너뜨릴 수 있습니다." },
    ],
  },
];

export const Lesson14Module: React.FC<Lesson14ModuleProps> = ({
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
      text: `반가워, ${nickname}! 지금까지 13주 동안 배운 다양한 마음기술 중에서, 우리 반이나 모둠 친구들과 함께할 때 가장 강력하다고 느낀 스킬은 뭐야?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State: Equipped Skills & Hashtags
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>(
    initialData?.interactiveData?.customData?.equippedSkillIds || [4, 9, 10]
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#마음_모아_플레이", "#협동의_힘", "#함께_자라는_우리", "#시너지_폭발"]
  );

  // Step 3 State: 7-Floor Card Tower Simulator
  const [towerFloor, setTowerFloor] = useState<number>(initialData?.interactiveData?.customData?.towerFloor || 1);
  const [activeCrisisIndex, setActiveCrisisIndex] = useState<number>(0);
  const [crisisSolved, setCrisisSolved] = useState<boolean[]>([false, false, false]);
  const [crisisFeedback, setCrisisFeedback] = useState<string | null>(null);
  const [thankCoupon, setThankCoupon] = useState({
    recipient: initialData?.interactiveData?.customData?.thankCouponRecipient || "우리 모둠 친구들에게",
    moment: initialData?.interactiveData?.customData?.thankCouponMoment || "내가 당황했을 때 따뜻하게 '괜찮아'라고 말해주고 지지대를 묵묵히 잡아주었을 때",
    praiseStamp: initialData?.interactiveData?.customData?.thankCouponStamp || "든든한 최고의 파트너 🏆",
  });

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

  // Handlers
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
        { sender: "bot", text: data.reply || "함께 마음을 모았을 때 우리는 혼자일 때보다 훨씬 단단해진단다!" },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "친구와 서로의 강점을 알아봐주고 배려할 때 진짜 놀라운 시너지가 일어난단다." },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleSkill = (id: number) => {
    if (selectedSkillIds.includes(id)) {
      setSelectedSkillIds(selectedSkillIds.filter((sId) => sId !== id));
    } else {
      if (selectedSkillIds.length < 3) {
        setSelectedSkillIds([...selectedSkillIds, id]);
      }
    }
  };

  const handleSolveCrisisOption = (isCorrect: boolean, feedbackText: string) => {
    setCrisisFeedback(feedbackText);
    if (isCorrect) {
      const newSolved = [...crisisSolved];
      newSolved[activeCrisisIndex] = true;
      setCrisisSolved(newSolved);
      if (towerFloor < 7) {
        setTowerFloor((prev) => Math.min(7, prev + 2));
      }
    }
  };

  const handleBuildFloor = () => {
    if (towerFloor < 7) {
      setTowerFloor((prev) => prev + 1);
    }
  };

  const handleSaveAll = () => {
    const entry: DiaryEntry = {
      lessonNo: 14,
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
          equippedSkillIds: selectedSkillIds,
          towerFloor,
          thankCouponRecipient: thankCoupon.recipient,
          thankCouponMoment: thankCoupon.moment,
          thankCouponStamp: thankCoupon.praiseStamp,
        },
      },
      completed: true,
      updatedAt: new Date().toISOString(),
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-deepgreen/20 shadow-xl overflow-hidden animate-fadeIn">
      {/* Top Lesson Header Banner */}
      <div className="bg-gradient-to-r from-[#16A34A] via-[#1F7A55] to-[#0D9488] p-6 sm:p-8 text-white relative">
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
              14차시 협동 챌린지
            </span>
            <span className="text-xl font-bold font-title text-yellow-300">
              7층 타워 완성 도전 🏰
            </span>
          </div>
        </div>

        {/* 4-Step Navigation Tab Bar */}
        <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4 max-w-2xl">
          {[
            { num: 1, label: "1. 마음이와 대화 & 마음편지" },
            { num: 2, label: "2. 12가지 마음기술 인벤토리" },
            { num: 3, label: "3. 7층 타워 챌린지 & 감사 쿠폰" },
            { num: 4, label: "4. 자가진단 & 14차시 일기" },
          ].map((tab) => (
            <button
              key={tab.num}
              type="button"
              onClick={() => setStep(tab.num)}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs sm:text-sm font-badge transition ${
                step === tab.num
                  ? "bg-white text-deepgreen font-bold shadow-md scale-105"
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
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-3xl p-6 relative shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-[#BBF7D0] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💌</span>
                  <h3 className="font-title text-lg font-bold text-[#166534]">
                    마음이의 14차시 따뜻한 마음 편지
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
                <span>마음이와의 14차시 인터뷰 (Gemini AI)</span>
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
                          ? "bg-[#16A34A] text-white rounded-br-none font-sans"
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
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-deepgreen" />
                      마음이가 따뜻한 답변을 생각하고 있어요...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="협동 활동 중 친구와 서로 든든했던 순간을 이야기해 주세요..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] text-sm font-hand text-base"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-5 py-3 bg-[#16A34A] text-white rounded-xl text-sm font-badge font-bold hover:bg-[#15803D] disabled:opacity-50 transition flex items-center gap-1.5 shadow-sm"
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
                className="px-6 py-3 bg-[#16A34A] text-white rounded-2xl font-badge font-bold shadow-md hover:bg-[#15803D] flex items-center gap-2 transition"
              >
                <span>2단계: 12가지 마음기술 인벤토리로 이동</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: 12 MIND SKILLS INVENTORY & HASHTAGS ================= */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Mind Skills Inventory */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                <div>
                  <h3 className="text-lg font-title font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#16A34A]" />
                    <span>1~13차시 마음기술 종합 스킬 인벤토리</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-sans mt-0.5">
                    우리 모둠의 시너지를 위해 장착할 핵심 스킬 3가지를 선택해 주세요! (현재 {selectedSkillIds.length}/3개 장착)
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#F0FDF4] text-[#16A34A] font-badge font-bold rounded-full text-xs border border-[#BBF7D0]">
                  모둠 시너지 덱
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ALL_SKILLS.map((skill) => {
                  const isSelected = selectedSkillIds.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-[#16A34A] bg-[#F0FDF4] shadow-md scale-[1.02]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{skill.icon}</span>
                          <div>
                            <span className="text-[10px] font-mono text-gray-400 block">
                              {skill.lesson}
                            </span>
                            <h4 className="text-sm font-title font-bold text-gray-900">
                              {skill.name}
                            </h4>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? "bg-[#16A34A] text-white"
                              : "border border-gray-300 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 font-sans mt-2">
                        {skill.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hashtag Ticket Punching */}
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
                className="px-6 py-3 bg-[#16A34A] text-white rounded-2xl font-badge font-bold shadow-md hover:bg-[#15803D] flex items-center gap-2 transition"
              >
                <span>3단계: 7층 타워 챌린지 및 감사 쿠폰으로 이동</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: 7-FLOOR TOWER & THANK-YOU COUPON ================= */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            {/* 7-Floor Card Tower Simulator */}
            <div className="bg-gradient-to-b from-[#F0FDF4] to-white border-2 border-[#BBF7D0] rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#BBF7D0] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-6 h-6 text-[#16A34A]" />
                    <h3 className="font-title text-xl font-bold text-gray-900">
                      모둠 협동 7층 마음 카드 타워 밸런스 챌린지
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-sans mt-0.5">
                    돌발 위기를 극복하고 서로의 카드를 지탱하며 7층 꼭대기까지 마음 타워를 올려보세요!
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 font-mono">타워 완성도</span>
                  <div className="text-2xl font-title font-bold text-[#16A34A]">
                    {towerFloor} / 7 층 ({Math.round((towerFloor / 7) * 100)}%)
                  </div>
                </div>
              </div>

              {/* Tower Graphic Visualizer */}
              <div className="flex flex-col items-center justify-center py-4 bg-white/70 rounded-2xl border border-[#BBF7D0] p-4">
                <div className="w-full max-w-sm space-y-2">
                  {[7, 6, 5, 4, 3, 2, 1].map((floorNum) => {
                    const isBuilt = towerFloor >= floorNum;
                    const floorNames: Record<number, string> = {
                      7: "🌟 7층: 마음 시너지 완성 (꼭대기 별빛)",
                      6: "🤝 6층: 역할 분담과 상호 신뢰",
                      5: "🕊️ 5층: 갈등의 지혜로운 해결",
                      4: "💬 4층: 나-전달법 솔직 소통",
                      3: "🍀 3층: 긍정 에너지 공유 ('오히려 좋아')",
                      2: "❤️ 2층: 경청과 깊은 공감",
                      1: "🏛️ 1층: 서로의 다름 인정 (기초 지지대)",
                    };
                    return (
                      <div
                        key={floorNum}
                        className={`py-2 px-4 rounded-xl border text-center font-title text-xs sm:text-sm font-bold transition-all ${
                          isBuilt
                            ? "bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white border-[#15803D] shadow-md transform scale-[1.01]"
                            : "bg-gray-100 text-gray-400 border-dashed border-gray-300 opacity-60"
                        }`}
                      >
                        {floorNames[floorNum]}
                      </div>
                    );
                  })}
                </div>

                {towerFloor < 7 && (
                  <button
                    type="button"
                    onClick={handleBuildFloor}
                    className="mt-4 px-5 py-2.5 bg-[#16A34A] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#15803D] shadow transition flex items-center gap-1.5"
                  >
                    <Layers className="w-4 h-4" />
                    <span>+1층 카드 안정적으로 쌓기</span>
                  </button>
                )}
                {towerFloor >= 7 && (
                  <div className="mt-4 px-4 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl text-xs font-badge font-bold flex items-center gap-1.5 animate-bounce">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                    <span>🎉 축하합니다! 7층 마음 카드 타워를 완성했습니다!</span>
                  </div>
                )}
              </div>

              {/* 3 Sudden Crisis Simulator Tabs */}
              <div className="space-y-3 bg-white rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-title font-bold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>3대 돌발 위기 대처 시뮬레이션</span>
                  </h4>
                  <div className="flex gap-1.5">
                    {CRISES.map((c, i) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setActiveCrisisIndex(i);
                          setCrisisFeedback(null);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-badge ${
                          activeCrisisIndex === i
                            ? "bg-[#16A34A] text-white font-bold"
                            : crisisSolved[i]
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        미션 {i + 1} {crisisSolved[i] && "✓"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
                  <h5 className="font-title text-sm font-bold text-amber-900">
                    {CRISES[activeCrisisIndex].title}
                  </h5>
                  <p className="font-hand text-sm sm:text-base text-gray-800">
                    {CRISES[activeCrisisIndex].situation}
                  </p>

                  <div className="space-y-2 pt-2">
                    {CRISES[activeCrisisIndex].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSolveCrisisOption(opt.correct, opt.feedback)}
                        className="w-full text-left p-3 rounded-xl bg-white border border-gray-200 hover:border-[#16A34A] hover:bg-[#F0FDF4] text-xs sm:text-sm font-sans transition flex items-start gap-2"
                      >
                        <span className="font-bold text-[#16A34A]">선택 {oIdx + 1}.</span>
                        <span className="text-gray-800">{opt.text}</span>
                      </button>
                    ))}
                  </div>

                  {crisisFeedback && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-blue-200 text-xs text-blue-900 font-sans animate-fadeIn">
                      💡 {crisisFeedback}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thank-You Coupon for Team Member */}
            <div className="bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FFFBEB] border-2 border-[#FDE68A] rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#FDE68A] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h3 className="font-title text-lg font-bold text-amber-900">
                    💌 팀원을 위한 &apos;고마워&apos; 칭찬 쿠폰
                  </h3>
                </div>
                <span className="text-xs font-badge text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                  마음 선물
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-badge text-gray-700 font-bold">
                    받는 친구 / 모둠
                  </label>
                  <input
                    type="text"
                    value={thankCoupon.recipient}
                    onChange={(e) => setThankCoupon({ ...thankCoupon, recipient: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-sm font-hand"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-badge text-gray-700 font-bold">
                    수여 스탬프
                  </label>
                  <select
                    value={thankCoupon.praiseStamp}
                    onChange={(e) => setThankCoupon({ ...thankCoupon, praiseStamp: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-xs font-badge"
                  >
                    <option value="든든한 최고의 파트너 🏆">든든한 최고의 파트너 🏆</option>
                    <option value="분위기 메이커 비타민 🍋">분위기 메이커 비타민 🍋</option>
                    <option value="따뜻한 경청 힐러 ❤️">따뜻한 경청 힐러 ❤️</option>
                    <option value="번뜩이는 아이디어 뱅크 💡">번뜩이는 아이디어 뱅크 💡</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-badge text-gray-700 font-bold">
                  협동하며 가장 고마웠던 순간 & 감사의 말
                </label>
                <textarea
                  rows={2}
                  value={thankCoupon.moment}
                  onChange={(e) => setThankCoupon({ ...thankCoupon, moment: e.target.value })}
                  className="w-full p-3 bg-white rounded-xl border border-amber-300 text-sm font-hand leading-relaxed"
                />
              </div>
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
                className="px-6 py-3 bg-[#16A34A] text-white rounded-2xl font-badge font-bold shadow-md hover:bg-[#15803D] flex items-center gap-2 transition"
              >
                <span>4단계: 14차시 일기 쓰기 & 완료</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: EVALUATION & DIARY ================= */}
        {step === 4 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Self Evaluation */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
              <h3 className="font-title text-base font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>14차시 스스로 배움 점검하기</span>
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
                오늘 나의 마음을 가장 잘 담은 8대 감정 구름
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
                  14차시 마음 성장 일기
                </h3>
                <span className="text-xs text-gray-400 font-sans">
                  {diaryText.length}자 작성 중
                </span>
              </div>

              <textarea
                rows={5}
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                placeholder="친구들과 마음을 모아 7층 타워를 세우고 감사 쿠폰을 나누며 느낀 소중한 감동을 적어보세요..."
                className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] font-hand text-base leading-relaxed bg-amber-50/20"
              />

              {/* Photo Upload Simulation */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h5 className="text-xs font-badge font-bold text-gray-800">
                      모둠 협동 활동 사진 또는 그림 첨부
                    </h5>
                    <p className="text-[11px] text-gray-500 font-sans">
                      타워 완성 기념사진이나 인증샷을 올려보세요
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="lesson14-photo"
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
                  htmlFor="lesson14-photo"
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

            {/* Save Buttons & Next Lesson */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-badge text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>3단계로</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="flex-1 sm:flex-initial px-6 py-3.5 bg-[#16A34A] text-white rounded-2xl font-badge font-bold shadow-md hover:bg-[#15803D] active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>14차시 일기 저장하기</span>
                </button>

                {onNextLesson && (
                  <button
                    type="button"
                    onClick={onNextLesson}
                    className="px-6 py-3.5 bg-gradient-to-r from-deepgreen to-rosepink text-white rounded-2xl font-badge font-bold shadow-md hover:opacity-95 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <span>최종 15차시로 이동</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {isSavedSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-center text-sm font-badge font-bold flex items-center justify-center gap-2 animate-fadeIn">
                <Check className="w-5 h-5 text-green-600" />
                <span>14차시 마음일기가 안전하게 저장되었습니다!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
