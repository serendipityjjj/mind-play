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
  RefreshCw,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface Lesson6ModuleProps {
  lesson: LessonMetadata;
  nickname: string;
  initialData?: DiaryEntry;
  onSave: (entry: DiaryEntry) => void;
  onNextLesson?: () => void;
}

export const Lesson6Module: React.FC<Lesson6ModuleProps> = ({
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
      text: `안녕, ${nickname}! 최근에 '난 역시 안 돼', '다 끝났어'처럼 스스로를 옭아매고 힘들게 했던 생각이 있었니? 어떤 상황이었어?`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Step 2 State (Cognitive Traps & Hashtags)
  const cognitiveTraps = [
    { id: "black_white", label: "흑백논리", desc: "1등 아니면 전부 실패야!" },
    { id: "catastrophizing", label: "파국화", desc: "이번 시험 망쳤으니 내 인생도 끝났어." },
    { id: "mind_reading", label: "마음 읽기", desc: "쟤가 쳐다본 건 분명 날 싫어해서일 거야." },
    { id: "should_statement", label: "당위적 사고(~해야만 해)", desc: "난 모든 친구들에게 착한 아이여야만 해." },
    { id: "overgeneralization", label: "과도한 일반화", desc: "한 번 실수했으니 다음에도 또 망칠 거야." },
  ];
  const [selectedTraps, setSelectedTraps] = useState<string[]>(
    initialData?.interactiveData?.customData?.traps || ["파국화", "과도한 일반화"]
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialData?.hashtags || ["#걱정을_사서_하지_말자", "#근거_없는_생각_멈춰", "#생각을_바꿔봐"]
  );

  // Step 3 State (ABCD Cognitive Restructuring Model)
  const [abcdData, setAbcdData] = useState({
    eventA: initialData?.interactiveData?.customData?.eventA || "중간고사를 치렀으나 기대한 결과를 얻지 못함.",
    beliefB: initialData?.interactiveData?.customData?.beliefB || "나 빼고 다른 친구들은 다 잘 봤어. 난 열심히 해도 안 되는 사람이야.",
    emotionC: initialData?.interactiveData?.customData?.emotionC || "자책감과 무기력",
    actionC: initialData?.interactiveData?.customData?.actionC || "책을 덮어버리고 다음 시험공부를 포기함",
    disputeD: initialData?.interactiveData?.customData?.disputeD || "중간고사가 나의 모든 인생을 결정짓지는 않는다. 나는 공부 방법의 보완이 필요할 뿐이지 노력해서 안 되는 사람이 아니다.",
  });
  const [isFlipped, setIsFlipped] = useState(false);

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
          lessonNo: 6,
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
          text: `그런 부정적인 생각이 들었구나! 하지만 그건 사실이 아니라 왜곡된 생각의 안경일 수 있어. ABCD 모델로 함께 뒤집어보자 🔄`,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const toggleTrap = (label: string) => {
    if (selectedTraps.includes(label)) {
      setSelectedTraps(selectedTraps.filter((t) => t !== label));
    } else {
      setSelectedTraps([...selectedTraps, label]);
    }
  };

  const handleApplyDisputeHint = (text: string) => {
    setAbcdData({ ...abcdData, disputeD: text });
    setIsFlipped(true);
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
      id: initialData?.id || `entry-6-${Date.now()}`,
      lessonNo: 6,
      lessonTitle: "06. 생각을 바꾸면 놀라운 일이!",
      createdAt: new Date().toISOString().split("T")[0],
      nickname,
      emotionId: selectedEmotionId,
      hashtags,
      diaryText: diaryText.trim() || "6차시 ABCD 인지 재구성 모델을 통해 비합리적 신념을 깨뜨리고 합리적 신념을 세웠다.",
      imageUrl: uploadedImage,
      evalStars,
      interactiveData: {
        customData: {
          traps: selectedTraps,
          ...abcdData,
        },
      },
    };

    onSave(entry);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 6차시 딥 틸/청록 그린 테마 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#1A5D57]/30 overflow-hidden">
        <div className="spring-binding" />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#E6F4F1] via-white to-teal-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#1A5D57] text-white text-xs font-badge rounded-md font-bold">
                6차시 • 영역 ❸ 정서 조절하기
              </span>
              <span className="text-xs text-gray-500 font-sans">워크북 55~62쪽</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-title font-bold text-gray-900 mt-1">
              06. 생각을 바꾸면 놀라운 일이! (비합리적 신념 바꾸기)
            </h2>
            <p className="text-xs sm:text-sm font-hand text-gray-600 mt-0.5">
              생각에 따라 감정과 행동이 달라짐을 이해하고, 비합리적 신념을 찾아 합리적 신념으로 바꾸어 봅니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-gray-200">
            {[
              { num: 1, label: "편지 열기" },
              { num: 2, label: "생각의 함정" },
              { num: 3, label: "ABCD 카드" },
              { num: 4, label: "감정일기" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`px-3 py-1 text-xs font-badge font-bold rounded-lg transition ${
                  step === s.num
                    ? "bg-[#1A5D57] text-white shadow-xs"
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
          <div className="bg-gradient-to-br from-[#E6F4F1] to-[#D4EDE7] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#1A5D57]/40 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">📮</span>
                <span className="px-3 py-1 bg-[#1A5D57] text-white text-xs font-badge font-bold rounded-full">
                  #오늘의 마음 편지에 대해 이야기 나누기
                </span>
              </div>
              <TTSPlayer
                text="모든 일은 마음먹기에 달려 있다는 말이 있어. 그렇다면 힘든 일이 있을 때 내 생각을 바꾸면 되지 않을까? 생각을 바꾸는 데 도움이 되는 방법을 같이 알아보자!"
                themeColor="#1A5D57"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#1A5D57]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#1A5D57] flex-shrink-0 flex items-center justify-center text-2xl shadow-inner">
                  🔄
                </div>
                <div className="space-y-3">
                  <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                    안녕, {nickname}! 생각을 바꾸면 세상이 달라져 보여
                  </h4>
                  <p className="font-hand text-base sm:text-lg text-gray-700 leading-relaxed">
                    &ldquo;모든 일은 마음먹기에 달려 있다는 말이 있어. 그렇다면 힘든 일이 있을 때 내 생각을 바꾸면 되지 않을까? 생각을 바꾸는 데 도움이 되는 방법을 같이 알아보자!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Chatbot Pingpong */}
            <div className="mt-6 bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#1A5D57]/30 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <Bot className="w-4 h-4 text-[#1A5D57]" />
                <span className="font-title text-sm font-bold text-[#1A5D57]">
                  마음이와의 6차시 인터뷰
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
                      <div className="w-7 h-7 rounded-full bg-[#1A5D57] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        마음
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-hand leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-[#1A5D57] text-white rounded-tr-none"
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
                  placeholder="예: 이번 발표를 망쳐서 애들이 날 한심하게 볼 것 같았어."
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A5D57] font-hand"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-3.5 py-2 bg-[#1A5D57] text-white rounded-xl text-xs font-badge font-bold hover:bg-[#12443F] disabled:opacity-50 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1A5D57] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#12443F] transition active:scale-95"
              >
                <span>생각의 오류 찾으러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: 마음 만나기 */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 border border-[#1A5D57]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>활동 A: 내 안의 비합리적 신념 덫 찾기</span>
            </h3>
            <p className="font-sans text-xs text-gray-500 mb-4">
              나를 불편하게 만드는 생각의 오류는 무엇인가요? (복수 선택)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cognitiveTraps.map((trap) => {
                const isSelected = selectedTraps.includes(trap.label);
                return (
                  <button
                    key={trap.id}
                    type="button"
                    onClick={() => toggleTrap(trap.label)}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      isSelected
                        ? "bg-[#E6F4F1] border-[#1A5D57] ring-2 ring-[#1A5D57]/20 shadow-xs"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-title text-sm font-bold text-gray-900">
                        {trap.label}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-[#1A5D57] text-white px-2 py-0.5 rounded-full font-badge">
                          선택됨
                        </span>
                      )}
                    </div>
                    <p className="font-hand text-xs text-gray-600 mt-1">&ldquo;{trap.desc}&rdquo;</p>
                  </button>
                );
              })}
            </div>
          </div>

          <TicketPunchCard
            hashtags={hashtags}
            suggestedTags={["#걱정을_사서_하지_말자", "#근거_없는_생각_멈춰", "#생각을_바꿔봐", "#비합리적_신념_탈출"]}
            onAddTag={(tag) => !hashtags.includes(tag) && setHashtags([...hashtags, tag])}
            onRemoveTag={(tag) => setHashtags(hashtags.filter((t) => t !== tag))}
            guideText="생각에 따라 감정이 달라져요! 이번 시간 나만의 수업 목표를 해시태그로 적어봅시다."
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1A5D57] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#12443F] active:scale-95"
            >
              <span>ABCD 생각 바꾸기 활동 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: 마음 키우기 (ABCD 인지 재구성 카드 덱) */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A5D57]/30 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-[#1A5D57] text-white text-xs font-badge font-bold rounded-full">
                  🔄 CBT 핵심 활동
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-gray-900 mt-2">
                  ABCD로 내 마음 바꾸기!
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6F4F1] text-[#1A5D57] rounded-xl text-xs font-badge font-bold hover:bg-[#1A5D57] hover:text-white transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>카드 뒤집기 (Flip)</span>
              </button>
            </div>

            {/* Scenario Callout */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-hand text-amber-900 leading-relaxed">
              <strong>📖 워크북 슬라이드 상황:</strong> &ldquo;오늘은 중간고사! 그런데 시험을 망쳤어! 이번 중간고사를 위해 정말 열심히 밤새워가며 공부했는데… 나 빼고 다른 친구들은 다 시험을 잘 본 것 같던데… 난 역시 안 돼.&rdquo;
            </div>

            {/* ABCD 4-Step Builder Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step A: Activating Events */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1.5">
                <span className="text-xs font-badge font-bold text-[#1A5D57]">
                  【1단계】 사건(A) Activating events - 객관적 사실
                </span>
                <textarea
                  value={abcdData.eventA}
                  onChange={(e) => setAbcdData({ ...abcdData, eventA: e.target.value })}
                  rows={2}
                  className="w-full p-2 text-xs bg-white border border-gray-200 rounded-xl font-hand"
                />
              </div>

              {/* Step B: Irrational Belief */}
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1.5">
                <span className="text-xs font-badge font-bold text-rose-700">
                  【2단계】 비합리적 신념(B) Belief - 왜곡된 생각
                </span>
                <textarea
                  value={abcdData.beliefB}
                  onChange={(e) => setAbcdData({ ...abcdData, beliefB: e.target.value })}
                  rows={2}
                  className="w-full p-2 text-xs bg-white border border-rose-200 rounded-xl font-hand"
                />
              </div>

              {/* Step C: Consequence */}
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1.5">
                <span className="text-xs font-badge font-bold text-purple-700">
                  【3단계】 결과(C) Consequence - 감정과 행동
                </span>
                <input
                  type="text"
                  value={abcdData.emotionC}
                  onChange={(e) => setAbcdData({ ...abcdData, emotionC: e.target.value })}
                  placeholder="감정: 우울함, 자책감, 무기력"
                  className="w-full p-2 text-xs bg-white border border-purple-200 rounded-xl font-hand mb-1"
                />
                <input
                  type="text"
                  value={abcdData.actionC}
                  onChange={(e) => setAbcdData({ ...abcdData, actionC: e.target.value })}
                  placeholder="행동: 공부를 포기함, 친구에게 짜증 냄"
                  className="w-full p-2 text-xs bg-white border border-purple-200 rounded-xl font-hand"
                />
              </div>

              {/* Step D: Dispute */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-1.5">
                <span className="text-xs font-badge font-bold text-emerald-800 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                  <span>【4단계】 논박(D) Dispute - 객관적 반박</span>
                </span>
                <textarea
                  value={abcdData.disputeD}
                  onChange={(e) => setAbcdData({ ...abcdData, disputeD: e.target.value })}
                  rows={3}
                  className="w-full p-2 text-xs bg-white border border-emerald-300 rounded-xl font-hand"
                />
              </div>
            </div>

            {/* 3 Dispute Hints */}
            <div>
              <span className="text-xs font-badge font-bold text-gray-700 block mb-2">
                💡 3대 논박 힌트 버튼 (클릭 시 자동 적용):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "친구들이 다 잘 봤다고 볼 수는 없다.",
                  "중간고사가 나의 모든 인생을 결정짓지는 않는다.",
                  "나는 공부 방법의 보완이 필요할 뿐이지, 노력해서 안 되는 사람은 아니다.",
                ].map((hint, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyDisputeHint(hint)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-[#E6F4F1] hover:text-[#1A5D57] text-gray-700 text-xs font-badge rounded-xl border border-gray-200 transition text-left"
                  >
                    ✦ {hint}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Flipping Card Preview */}
            <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl border border-gray-200 flex flex-col items-center justify-center">
              <div
                className={`w-full max-w-md p-6 rounded-3xl transition-all duration-500 text-center shadow-lg border-2 ${
                  isFlipped
                    ? "bg-gradient-to-b from-[#E6F4F1] to-emerald-100 border-emerald-500 text-emerald-950"
                    : "bg-gradient-to-b from-rose-50 to-red-100 border-rose-400 text-rose-950"
                }`}
              >
                <div className="text-3xl mb-2">{isFlipped ? "🌿" : "⚠️"}</div>
                <span className="text-xs font-badge font-bold uppercase tracking-wider block">
                  {isFlipped ? "단단한 합리적 신념 카드" : "비합리적 생각의 덫"}
                </span>
                <p className="font-hand text-base sm:text-lg font-bold mt-2 leading-relaxed">
                  {isFlipped ? `"${abcdData.disputeD}"` : `"${abcdData.beliefB}"`}
                </p>
                <p className="text-[11px] font-badge mt-3 opacity-80">
                  {isFlipped
                    ? "✨ 생각의 렌즈를 바꾸니 마음이 가벼워지고 다시 시작할 용기가 생겼어요!"
                    : "🚨 근거 없는 왜곡된 생각이 내 마음을 괴롭히고 있어요. 반박해 보세요!"}
                </p>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1A5D57] text-white rounded-xl font-badge font-bold text-sm shadow-md hover:bg-[#12443F] active:scale-95"
            >
              <span>마음 다지기 & 감정일기 ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: 마음 다지기 */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-[#1A5D57]/30 shadow-sm">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
              <span>🔔</span>
              <span>똑똑똑 내 마음 두드리기 (자기평가)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl">
                <span className="font-hand text-sm text-gray-700">
                  Q1. 기분을 나쁘게 만드는 생각 속에 오류가 숨어있음을 깨달았나요?
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
                  Q2. 부정적인 생각이 들 때 스스로 반박(논박)할 용기가 생겼나요?
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

          {/* Mission Card */}
          <div className="bg-gradient-to-r from-[#E6F4F1] to-[#D4EDE7] rounded-2xl p-5 border border-[#1A5D57]/30 shadow-xs">
            <div className="flex items-center gap-2 text-[#1A5D57] font-badge font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>이번 주 함께 실천하는 마음 미션</span>
            </div>
            <h4 className="font-title text-base sm:text-lg font-bold text-[#1A5D57]">
              [비합리적 생각 스톱!(Stop) & 뒤집기]
            </h4>
            <p className="font-hand text-sm text-gray-700 mt-1 leading-relaxed">
              💡 실천 팁: &ldquo;이번 주 생활 중 '난 망했어'라는 생각이 불쑥 솟아오를 때, '잠깐! 그게 진짜 사실이야?'라고 스스로에게 질문 던져보기&rdquo;
            </p>
          </div>

          <EmotionCloudPicker
            selectedId={selectedEmotionId}
            onSelect={(c) => setSelectedEmotionId(c.id)}
          />

          <div className="bg-white rounded-2xl p-5 border border-[#1A5D57]/30 shadow-sm space-y-4">
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📝</span>
              <span>6차시 3줄 마음일기 & 사진 기록</span>
            </h3>

            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="ABCD 생각 뒤집기를 통해 부정적인 신념을 깨고 합리적으로 바꾼 소감을 3줄로 적어보세요..."
              rows={3}
              className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A5D57] font-hand leading-relaxed"
            />

            <div>
              <label className="block text-xs font-badge text-gray-600 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#1A5D57]" />
                <span>오늘 완성한 합리적 신념 카드나 감정 사진 첨부 (선택)</span>
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
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#1A5D57]">
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
                <span>6차시 감정일기와 ABCD 생각 데이터가 안전하게 저장되었습니다!</span>
              </div>
              {onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  다음 7차시로 이동 ➔
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A5D57] to-teal-700 text-white rounded-2xl font-badge font-bold text-sm sm:text-base shadow-lg hover:shadow-teal-700/30 transition active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>6차시 기록 완료하고 저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
