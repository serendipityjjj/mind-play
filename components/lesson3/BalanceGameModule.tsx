"use client";

import React, { useState, useMemo } from "react";

export interface BalanceGameAnswer {
  [key: number]: string; // questionId -> chosen option text or code
}

export interface PeerProfile {
  studentId: string;
  name: string;
  avatar: string;
  mbti: string;
  intels: string;
  answers: { [key: number]: string };
}

// 11문항 데이터 정의
export const BALANCE_QUESTIONS = [
  {
    id: 1,
    title: "1. 주말 휴식 스타일",
    desc: "에너지를 충전하는 나만의 방식은?",
    options: [
      { id: "A", text: "집에서 혼자 침대 뒹굴거리며 넷플릭스/유튜브 보기 🛋️" },
      { id: "B", text: "친구들과 밖에서 신나게 약속 잡고 놀러 나가기 🏃" },
    ],
  },
  {
    id: 2,
    title: "2. 친구와 갈등 해결 방식",
    desc: "서로 의견이 부딪히거나 서운할 때 나는?",
    options: [
      { id: "A", text: "감정이 가라앉을 때까지 혼자 시간을 갖고 생각 정리하기 ⏳" },
      { id: "B", text: "답답한 건 못 참아! 즉시 솔직하게 터놓고 대화로 풀기 🗣️" },
    ],
  },
  {
    id: 3,
    title: "3. 모둠 과제 역할 선호",
    desc: "팀 프로젝트에서 내가 더 편하고 잘할 수 있는 역할은?",
    options: [
      { id: "A", text: "전체 흐름을 기획하고 발표하며 팀을 이끄는 리더/발표자 🎤" },
      { id: "B", text: "자료를 꼼꼼히 조사하고 PPT/보고서를 깔끔하게 만드는 서포터 💻" },
    ],
  },
  {
    id: 4,
    title: "4. 시험/과제 준비 스타일",
    desc: "중요한 마감이나 시험이 다가왔을 때 나의 행동은?",
    options: [
      { id: "A", text: "미리 캘린더에 계획을 세워 매일 정해진 분량 끝내기 📅" },
      { id: "B", text: "마감 직전의 초인적인 집중력! 벼락치기로 승부하기 ⚡" },
    ],
  },
  {
    id: 5,
    title: "5. 스트레스 해소 힐링법",
    desc: "마음이 복잡하고 지쳤을 때 가장 큰 위로가 되는 것은?",
    options: [
      { id: "A", text: "좋아하는 음악을 듣거나 혼자 조용히 산책/일기 쓰기 🎧" },
      { id: "B", text: "맛있는 매운 떡볶이 먹으며 친구와 신나게 수다 떨기 🍕" },
    ],
  },
  {
    id: 6,
    title: "6. 미래 꿈과 진로 선택 기준",
    desc: "내가 인생에서 더 중요하게 여기는 가치는?",
    options: [
      { id: "A", text: "내가 진정으로 가슴 뛰고 좋아하는 일을 하는 것 🌟" },
      { id: "B", text: "경제적 안정과 사회적으로 인정받는 직업을 갖는 것 💼" },
    ],
  },
  {
    id: 7,
    title: "7. 친구가 힘든 고민을 털어놓을 때",
    desc: "속상해하는 친구를 만났을 때 나의 첫 반응은?",
    options: [
      { id: "A", text: "따뜻한 눈빛으로 '얼마나 힘들었어...' 무조건 무한 공감 💖" },
      { id: "B", text: "'그럼 이렇게 해결해보자!' 현실적이고 실질적인 해결책 제시 🛠️" },
    ],
  },
  {
    id: 8,
    title: "8. 나의 숨은 취향/초능력",
    desc: "하루 동안 가질 수 있다면 가장 탐나는 능력은?",
    options: [
      { id: "A", text: "타인의 속마음을 투명하게 읽을 수 있는 독심술 🔮" },
      { id: "B", text: "원하는 곳 어디든 1초 만에 이동하는 순간이동 🚀" },
      { id: "C", text: "실수한 과거로 돌아가 다시 선택할 수 있는 타임머신 ⏰" },
      { id: "D", text: "한 번 보면 책 한 권을 통째로 외우는 슈퍼 암기력 🧠" },
      { id: "E", text: "아무리 먹어도 살찌지 않고 항상 건강한 무한 체력 🥗" },
    ],
  },
  {
    id: 9,
    title: "9. 새로운 환경에서의 첫 모습",
    desc: "새 학기 새 교실에 처음 들어갔을 때 나는?",
    options: [
      { id: "A", text: "먼저 다가가 밝게 인사하며 옆자리 친구에게 말 걸기 👋" },
      { id: "B", text: "조용히 자리에 앉아 주변 분위기와 친구들을 먼저 관찰하기 👀" },
      { id: "C", text: "스마트폰을 보며 자연스러운 척 어색함 넘기기 📱" },
      { id: "D", text: "아는 친구를 찾아 재빨리 뭉치기 🤝" },
      { id: "E", text: "오늘 급식 메뉴와 시간표를 확인하며 현실에 집중하기 🍱" },
    ],
  },
  {
    id: 10,
    title: "10. 나를 가장 잘 나타내는 상징 키워드",
    desc: "나의 성격이나 개성을 한 단어/상징으로 표현한다면? (직접 입력 가능)",
    allowCustom: true,
    options: [
      { id: "A", text: "잔잔하지만 깊은 따뜻한 호수 🌊" },
      { id: "B", text: "어디로 튈지 모르는 톡톡 튀는 탄산수 🥤" },
      { id: "C", text: "묵묵히 자리를 지키는 든든한 아름드리나무 🌳" },
      { id: "D", text: "열정적으로 타오르는 밝은 모닥불 🔥" },
      { id: "CUSTOM", text: "직접 멋지게 입력하기 ✍️" },
    ],
  },
  {
    id: 11,
    title: "11. 1년 뒤 내가 꼭 듣고 싶은 말",
    desc: "한 해를 마무리할 때 친구나 선생님께 가장 듣고 싶은 칭찬은? (직접 입력 가능)",
    allowCustom: true,
    options: [
      { id: "A", text: "'너 덕분에 우리 반이 정말 행복하고 든든했어!' 🥰" },
      { id: "B", text: "'너의 열정과 실력은 정말 최고야, 많이 배웠어!' 🏆" },
      { id: "C", text: "'너는 겉과 속이 한결같이 멋지고 신뢰할 수 있는 친구야!' 💎" },
      { id: "D", text: "'너와 함께라면 어떤 어려운 일도 다 이겨낼 수 있어!' 🚀" },
      { id: "CUSTOM", text: "직접 가슴 뛰는 한마디 적기 ✍️" },
    ],
  },
];

// 25명 학급 친구 기본 프로필
export const CLASSMATES_BALANCE_DATA: PeerProfile[] = [
  { studentId: "10301", name: "권현규", avatar: "👦", mbti: "SJ", intels: "논리수학/신체운동", answers: { 1: "B", 2: "B", 3: "B", 4: "A", 5: "A", 6: "B", 7: "B", 8: "D", 9: "E", 10: "C", 11: "C" } },
  { studentId: "10302", name: "김도윤", avatar: "🧑", mbti: "NT", intels: "논리수학/자기이해", answers: { 1: "A", 2: "B", 3: "B", 4: "A", 5: "A", 6: "A", 7: "B", 8: "D", 9: "B", 10: "A", 11: "B" } },
  { studentId: "10303", name: "김민준", avatar: "👦", mbti: "SP", intels: "신체운동/공간", answers: { 1: "B", 2: "B", 3: "A", 4: "B", 5: "B", 6: "A", 7: "A", 8: "B", 9: "A", 10: "B", 11: "D" } },
  { studentId: "10304", name: "김서우", avatar: "👧", mbti: "NF", intels: "대인관계/음악", answers: { 1: "A", 2: "A", 3: "B", 4: "A", 5: "A", 6: "A", 7: "A", 8: "A", 9: "B", 10: "A", 11: "A" } },
  { studentId: "10305", name: "김시우", avatar: "👦", mbti: "NT", intels: "언어/논리수학", answers: { 1: "A", 2: "B", 3: "A", 4: "A", 5: "A", 6: "B", 7: "B", 8: "D", 9: "B", 10: "C", 11: "B" } },
  { studentId: "10306", name: "김하윤", avatar: "👧", mbti: "NF", intels: "대인관계/언어", answers: { 1: "A", 2: "B", 3: "A", 4: "A", 5: "B", 6: "A", 7: "A", 8: "A", 9: "A", 10: "A", 11: "A" } },
  { studentId: "10307", name: "노유진", avatar: "👧", mbti: "SJ", intels: "언어/자기이해", answers: { 1: "A", 2: "A", 3: "B", 4: "A", 5: "A", 6: "B", 7: "A", 8: "C", 9: "B", 10: "C", 11: "C" } },
  { studentId: "10308", name: "문채원", avatar: "👧", mbti: "SP", intels: "음악/신체운동", answers: { 1: "B", 2: "B", 3: "A", 4: "B", 5: "B", 6: "A", 7: "A", 8: "B", 9: "A", 10: "B", 11: "A" } },
  { studentId: "10309", name: "박지호", avatar: "👦", mbti: "NT", intels: "공간/논리수학", answers: { 1: "A", 2: "B", 3: "B", 4: "B", 5: "A", 6: "B", 7: "B", 8: "E", 9: "C", 10: "D", 11: "B" } },
  { studentId: "10310", name: "변해린", avatar: "👧", mbti: "SP", intels: "공간/자연관찰", answers: { 1: "B", 2: "A", 3: "B", 4: "B", 5: "B", 6: "A", 7: "B", 8: "B", 9: "C", 10: "B", 11: "D" } },
  { studentId: "10311", name: "송민재", avatar: "👦", mbti: "SJ", intels: "신체운동/대인관계", answers: { 1: "B", 2: "B", 3: "A", 4: "A", 5: "B", 6: "B", 7: "A", 8: "E", 9: "A", 10: "C", 11: "C" } },
  { studentId: "10312", name: "신아린", avatar: "👧", mbti: "NF", intels: "음악/자기이해", answers: { 1: "A", 2: "A", 3: "B", 4: "A", 5: "A", 6: "A", 7: "A", 8: "A", 9: "B", 10: "A", 11: "A" } },
  { studentId: "10313", name: "안도현", avatar: "👦", mbti: "NT", intels: "자연관찰/논리수학", answers: { 1: "A", 2: "B", 3: "B", 4: "A", 5: "A", 6: "B", 7: "B", 8: "D", 9: "B", 10: "C", 11: "B" } },
  { studentId: "10314", name: "양지안", avatar: "👧", mbti: "SP", intels: "대인관계/신체운동", answers: { 1: "B", 2: "B", 3: "A", 4: "B", 5: "B", 6: "A", 7: "A", 8: "B", 9: "A", 10: "B", 11: "D" } },
  { studentId: "10315", name: "오세은", avatar: "👧", mbti: "SJ", intels: "언어/대인관계", answers: { 1: "A", 2: "B", 3: "A", 4: "A", 5: "B", 6: "B", 7: "A", 8: "C", 9: "A", 10: "C", 11: "C" } },
  { studentId: "10316", name: "유태양", avatar: "👦", mbti: "SP", intels: "신체운동/공간", answers: { 1: "B", 2: "B", 3: "A", 4: "B", 5: "B", 6: "A", 7: "B", 8: "E", 9: "A", 10: "D", 11: "D" } },
  { studentId: "10317", name: "윤서연", avatar: "👧", mbti: "NF", intels: "자기이해/언어", answers: { 1: "A", 2: "A", 3: "B", 4: "A", 5: "A", 6: "A", 7: "A", 8: "A", 9: "B", 10: "A", 11: "A" } },
  { studentId: "10318", name: "이준우", avatar: "👦", mbti: "SJ", intels: "논리수학/신체운동", answers: { 1: "B", 2: "B", 3: "B", 4: "A", 5: "A", 6: "B", 7: "B", 8: "D", 9: "E", 10: "C", 11: "C" } },
  { studentId: "10319", name: "이지후", avatar: "👦", mbti: "NT", intels: "논리수학/공간", answers: { 1: "A", 2: "B", 3: "B", 4: "A", 5: "A", 6: "B", 7: "B", 8: "D", 9: "C", 10: "C", 11: "B" } },
  { studentId: "10320", name: "장서진", avatar: "👧", mbti: "SP", intels: "음악/자연관찰", answers: { 1: "B", 2: "A", 3: "A", 4: "B", 5: "B", 6: "A", 7: "A", 8: "B", 9: "A", 10: "B", 11: "A" } },
  { studentId: "10321", name: "정우진", avatar: "👦", mbti: "NT", intels: "언어/논리수학", answers: { 1: "A", 2: "B", 3: "A", 4: "A", 5: "A", 6: "B", 7: "B", 8: "D", 9: "B", 10: "D", 11: "B" } },
  { studentId: "10322", name: "정예원", avatar: "👧", mbti: "NF", intels: "대인관계/음악", answers: { 1: "A", 2: "A", 3: "A", 4: "A", 5: "A", 6: "A", 7: "A", 8: "A", 9: "A", 10: "A", 11: "A" } },
  { studentId: "10323", name: "조호진", avatar: "👦", mbti: "NF", intels: "대인관계/자기이해", answers: { 1: "A", 2: "B", 3: "A", 4: "A", 5: "A", 6: "A", 7: "A", 8: "A", 9: "B", 10: "A", 11: "A" } },
  { studentId: "10324", name: "최하은", avatar: "👧", mbti: "SJ", intels: "자연관찰/언어", answers: { 1: "A", 2: "A", 3: "B", 4: "A", 5: "A", 6: "B", 7: "A", 8: "C", 9: "B", 10: "C", 11: "C" } },
  { studentId: "10325", name: "한승우", avatar: "👦", mbti: "SP", intels: "신체운동/공간", answers: { 1: "B", 2: "B", 3: "A", 4: "B", 5: "B", 6: "A", 7: "B", 8: "E", 9: "A", 10: "D", 11: "D" } },
];

export interface BalanceGameModuleProps {
  studentName: string;
  studentId: string;
  isTeacherMode: boolean;
  isBalanceResultBroadcasted: boolean;
  onBroadcastBalanceResult?: () => void;
  balanceAnswers: BalanceGameAnswer;
  onAnswerChange: (qId: number, val: string) => void;
  custom10: string;
  onCustom10Change: (val: string) => void;
  custom11: string;
  onCustom11Change: (val: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const BalanceGameModule: React.FC<BalanceGameModuleProps> = ({
  studentName,
  studentId,
  isTeacherMode,
  isBalanceResultBroadcasted,
  onBroadcastBalanceResult,
  balanceAnswers,
  onAnswerChange,
  custom10,
  onCustom10Change,
  custom11,
  onCustom11Change,
  onNextStep,
  onPrevStep,
}) => {
  const [selectedTab, setSelectedTab] = useState<"game" | "match">("game");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const answeredCount = Object.keys(balanceAnswers).length;
  const currentQ = BALANCE_QUESTIONS[currentQuestionIndex];
  const currentAns = balanceAnswers[currentQ.id];

  // 옵션 선택 시 자동으로 다음 문항으로 이동
  const handleSelectOption = (qId: number, optId: string) => {
    onAnswerChange(qId, optId);
    if (optId !== "CUSTOM" && currentQuestionIndex < BALANCE_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, BALANCE_QUESTIONS.length - 1));
      }, 250);
    }
  };

  // 학급 전체 11문항 응답 통계 계산 (실제 학생 응답 및 급우 프로필 데이터 기반 집계)
  const classStats = useMemo(() => {
    return BALANCE_QUESTIONS.map((q) => {
      const optionCounts: { [optId: string]: number } = {};
      q.options.forEach((o) => { optionCounts[o.id] = 0; });

      // 25명 급우 데이터 집계
      CLASSMATES_BALANCE_DATA.forEach((p) => {
        const a = p.answers[q.id];
        if (a) {
          optionCounts[a] = (optionCounts[a] || 0) + 1;
        }
      });

      // 현재 학생의 답변 집계
      const myA = balanceAnswers[q.id];
      if (myA) {
        optionCounts[myA] = (optionCounts[myA] || 0) + 1;
      }

      const totalResponses = 26; // 1학년 3반 26명
      return {
        qId: q.id,
        title: q.title,
        desc: q.desc,
        options: q.options.map((opt) => ({
          ...opt,
          count: optionCounts[opt.id] || 0,
          pct: Math.round(((optionCounts[opt.id] || 0) / totalResponses) * 100),
        })),
      };
    });
  }, [balanceAnswers]);

  // 매칭 계산 (내 답변과 친구들의 답변 비교)
  const peerMatches = useMemo(() => {
    return CLASSMATES_BALANCE_DATA.map((peer) => {
      let sameCount = 0;
      const sameQuestions: number[] = [];
      const diffQuestions: number[] = [];

      BALANCE_QUESTIONS.forEach((q) => {
        const myAns = balanceAnswers[q.id];
        const peerAns = peer.answers[q.id];
        if (myAns && peerAns && myAns === peerAns) {
          sameCount++;
          sameQuestions.push(q.id);
        } else {
          diffQuestions.push(q.id);
        }
      });

      const matchRate = Math.round((sameCount / 11) * 100);
      return {
        ...peer,
        sameCount,
        matchRate,
        sameQuestions,
        diffQuestions,
      };
    }).sort((a, b) => b.matchRate - a.matchRate);
  }, [balanceAnswers]);

  const soulmate = peerMatches[0] || CLASSMATES_BALANCE_DATA[0];
  const opposite = peerMatches[peerMatches.length - 1] || CLASSMATES_BALANCE_DATA[CLASSMATES_BALANCE_DATA.length - 1];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold shadow-sm shrink-0">
            4
          </span>
          <div>
            <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 flex-wrap">
              <span>[Step 4] 나 알아보기 밸런스 게임 & 또래 성향 매칭</span>
              <span className="text-xs font-dodum bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                1문항씩 집중 탐색
              </span>
            </h4>
            <p className="text-xs text-gray-500 font-batang mt-0.5">
              솔직한 선택을 통해 나의 가치관과 성향을 알아보고, 학급 친구들과의 케미 싱크로율을 확인해보세요!
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1F6B38] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            진행률: {answeredCount}/11 ({Math.round((answeredCount / 11) * 100)}%)
          </span>
          {isTeacherMode && onBroadcastBalanceResult && (
            <button
              type="button"
              onClick={onBroadcastBalanceResult}
              className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold shadow-sm transition flex items-center gap-1 cursor-pointer ${
                isBalanceResultBroadcasted
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <span>{isBalanceResultBroadcasted ? "✅ 결과 전송 완료" : "📢 학급 결과 전송하기"}</span>
            </button>
          )}
        </div>
      </div>

      {/* 상단 탭 전환 */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200">
        <button
          type="button"
          onClick={() => setSelectedTab("game")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-dodum font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            selectedTab === "game"
              ? "bg-white text-[#144725] shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>🕹️ 11문항 밸런스 게임 (1문항씩 풀기)</span>
          <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">{answeredCount}/11</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("match")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-dodum font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            selectedTab === "match"
              ? "bg-[#1F6B38] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>🤝 실시간 학급 친구 케미 & 싱크로율 리포트</span>
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
            {isBalanceResultBroadcasted || isTeacherMode ? "집계 완료 ✨" : "선생님 전송 대기"}
          </span>
        </button>
      </div>

      {/* 탭 1: 1문항씩 순차 등장 밸런스 게임 */}
      {selectedTab === "game" && (
        <div className="space-y-6">
          {/* 11개 문항 번호 네비게이터 바 */}
          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-dodum">
              <span className="font-bold text-emerald-950">
                질문 번호 이동 (총 11문항)
              </span>
              <span className="text-[11px] text-emerald-700">
                선택 즉시 다음 질문으로 자동 이동됩니다 ✨
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {BALANCE_QUESTIONS.map((q, idx) => {
                const isAns = !!balanceAnswers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center relative cursor-pointer ${
                      isCurrent
                        ? "bg-[#1F6B38] text-white ring-2 ring-emerald-400 ring-offset-2 scale-110 shadow-sm"
                        : isAns
                        ? "bg-emerald-200/80 text-emerald-900 hover:bg-emerald-300"
                        : "bg-white text-gray-400 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {q.id}
                    {isAns && !isCurrent && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 단일 문항 대형 집중 카드 */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-400/80 bg-gradient-to-b from-emerald-50/40 via-white to-white shadow-md space-y-6 animate-fadeIn">
            {/* 문항 헤더 */}
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-mono font-bold">
                  Q {currentQ.id} / 11
                </span>
                <h5 className="font-title text-base sm:text-xl font-bold text-gray-900">
                  {currentQ.title}
                </h5>
              </div>
              <span
                className={`text-xs font-dodum px-3 py-1 rounded-full font-bold ${
                  currentAns
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {currentAns ? "선택 완료 ✨" : "선택 대기 중"}
              </span>
            </div>

            {/* 문항 설명 질문 */}
            <div className="text-sm sm:text-base font-batang text-gray-800 bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs">
              👉 <strong>{currentQ.desc}</strong>
            </div>

            {/* 선택지 옵션 버튼 리스트 */}
            <div className="space-y-3 pt-1">
              {currentQ.options.map((opt) => {
                const isSelected = currentAns === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-dodum transition-all flex items-center gap-3.5 border-2 cursor-pointer ${
                      isSelected
                        ? "bg-[#1F6B38] text-white font-bold border-[#1F6B38] shadow-md transform scale-[1.01]"
                        : "bg-white text-gray-800 hover:bg-emerald-50/60 hover:border-emerald-300 border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-mono font-bold ${
                        isSelected
                          ? "bg-white text-[#1F6B38]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                    {isSelected && (
                      <span className="text-base font-bold shrink-0">✓</span>
                    )}
                  </button>
                );
              })}

              {/* 문항 10, 11 커스텀 입력창 */}
              {currentQ.id === 10 && currentAns === "CUSTOM" && (
                <div className="pt-2 animate-fadeIn space-y-2">
                  <label className="text-xs font-dodum font-bold text-emerald-900 block">
                    ✍️ 나만의 상징 키워드를 직접 입력해 주세요:
                  </label>
                  <input
                    type="text"
                    value={custom10}
                    onChange={(e) => onCustom10Change(e.target.value)}
                    placeholder="예: 자유롭게 유영하는 고래 🐋 / 끝없이 타오르는 보랏빛 불꽃 🔮"
                    className="w-full text-xs sm:text-sm font-batang p-3 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900"
                  />
                </div>
              )}
              {currentQ.id === 11 && currentAns === "CUSTOM" && (
                <div className="pt-2 animate-fadeIn space-y-2">
                  <label className="text-xs font-dodum font-bold text-emerald-900 block">
                    ✍️ 1년 뒤 듣고 싶은 가슴 뛰는 한마디를 적어주세요:
                  </label>
                  <input
                    type="text"
                    value={custom11}
                    onChange={(e) => onCustom11Change(e.target.value)}
                    placeholder="예: '네가 있어서 지난 1년이 내 인생 최고의 해였어!' 🌟"
                    className="w-full text-xs sm:text-sm font-batang p-3 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900"
                  />
                </div>
              )}
            </div>

            {/* 질문별 이전 / 다음 문항 이동 버튼 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className={`px-4 py-2.5 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1.5 ${
                  currentQuestionIndex === 0
                    ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                }`}
              >
                ◀ 이전 질문
              </button>

              <span className="text-xs font-mono font-bold text-gray-500">
                {currentQuestionIndex + 1} / 11
              </span>

              {currentQuestionIndex < BALANCE_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(BALANCE_QUESTIONS.length - 1, prev + 1))}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>다음 질문</span> ▶
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedTab("match")}
                  className="px-5 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer animate-bounce"
                >
                  <span>매칭 결과 리포트 확인 👉</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 탭 2: 학급 친구 케미 & 통계 리포트 */}
      {selectedTab === "match" && (
        <div className="space-y-6">
          {/* 학생 화면에서 선생님이 아직 [결과 보내기]를 누르지 않은 경우 잠금 안내 */}
          {!isTeacherMode && !isBalanceResultBroadcasted ? (
            <div className="py-12 px-6 bg-gradient-to-b from-emerald-50/60 to-white rounded-3xl border-2 border-dashed border-emerald-300 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
                📊
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h5 className="font-title text-lg font-bold text-emerald-950">
                  1학년 3반 친구들의 밸런스 게임 결과 취합 중
                </h5>
                <p className="font-batang text-xs sm:text-sm text-gray-600 leading-relaxed">
                  우리 반 친구들이 11문항 응답을 모두 마치면, 선생님께서 교사용 대시보드에서 <strong>[결과 전송]</strong>을 눌러주십니다.<br />
                  전송이 완료되면 나의 소울메이트, 반전 케미 친구 및 학급 전체 통계가 실시간으로 열립니다! 🌸
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTab("game")}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-dodum font-bold shadow-sm"
                >
                  ◀ 11문항 내 답변 검토하기
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 상단 요약 배너 */}
              <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl shadow-md space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono bg-white/20 px-3 py-1 rounded-full">
                    1학년 3반 26인 밸런스 케미 분석 완료 ✨
                  </span>
                  <span className="text-xs font-dodum font-bold text-emerald-200">
                    분석 참여자: {studentName} ({studentId})
                  </span>
                </div>
                <h5 className="text-lg sm:text-xl font-title font-bold">
                  🎯 11가지 밸런스 취향으로 찾아낸 나의 소울메이트 & 반전 시너지 파트너!
                </h5>
                <p className="text-xs font-batang text-emerald-100 leading-relaxed">
                  나와 비슷한 성향을 가진 친구와는 깊은 공감대를 형성하고, 서로 다른 강점을 가진 친구와는 모둠 활동에서 강력한 시너지를 낼 수 있어요.
                </p>
              </div>

              {/* 소울메이트 1위 vs 반전 케미 1위 비교 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 소울메이트 카드 */}
                <div className="p-5 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-3xl border-2 border-emerald-400 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-base shadow-sm">
                        💖
                      </span>
                      <div>
                        <h6 className="font-title font-bold text-emerald-950 text-sm">나의 최고의 소울메이트</h6>
                        <span className="text-[11px] font-dodum text-emerald-700">취향 싱크로율 1위 파트너</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-mono font-extrabold text-emerald-700">
                        {soulmate?.matchRate || 0}%
                      </span>
                      <span className="block text-[10px] text-gray-500 font-dodum">11문항 중 {soulmate?.sameCount || 0}개 일치</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{soulmate?.avatar || "👧"}</span>
                        <div>
                          <strong className="text-sm font-title text-gray-900">{soulmate?.name}</strong>
                          <span className="text-xs font-mono text-gray-500 ml-1.5">({soulmate?.studentId})</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-mono font-bold">
                        #{soulmate?.mbti}기질 · #{soulmate?.intels ? soulmate.intels.split("/")[0] : "강점"}
                      </span>
                    </div>
                    <p className="text-xs font-batang text-gray-700 leading-relaxed">
                      💡 주말 휴식 스타일부터 갈등 해결 방식까지 성향이 꼭 닮았어요! 말하지 않아도 서로의 마음을 척척 이해할 수 있는 완벽한 짝꿍입니다.
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1">
                      <span className="text-[10px] font-dodum bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                        ✨ 함께 공감하는 항목 {soulmate?.sameCount}개
                      </span>
                      <span className="text-[10px] font-dodum bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                        #대화_통하는_친구 #영혼의_단짝
                      </span>
                    </div>
                  </div>
                </div>

                {/* 반전 매력 시너지 카드 */}
                <div className="p-5 bg-gradient-to-br from-amber-50 via-orange-50/50 to-white rounded-3xl border-2 border-amber-400 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-base shadow-sm">
                        ⚡
                      </span>
                      <div>
                        <h6 className="font-title font-bold text-amber-950 text-sm">정반대 매력의 시너지 친구</h6>
                        <span className="text-[11px] font-dodum text-amber-700">새로운 시각을 주는 보완 파트너</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-mono font-extrabold text-amber-700">
                        {opposite?.matchRate || 0}%
                      </span>
                      <span className="block text-[10px] text-gray-500 font-dodum">차이점 {11 - (opposite?.sameCount || 0)}개 항목</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{opposite?.avatar || "👦"}</span>
                        <div>
                          <strong className="text-sm font-title text-gray-900">{opposite?.name}</strong>
                          <span className="text-xs font-mono text-gray-500 ml-1.5">({opposite?.studentId})</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-mono font-bold">
                        #{opposite?.mbti}기질 · #{opposite?.intels ? opposite.intels.split("/")[0] : "강점"}
                      </span>
                    </div>
                    <p className="text-xs font-batang text-gray-700 leading-relaxed">
                      ✨ 나와 다른 접근 방식을 가지고 있어 모둠 프로젝트나 문제 해결 시 내가 보지 못한 새로운 아이디어를 선물해 줍니다!
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1">
                      <span className="text-[10px] font-dodum bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
                        🎯 보완 가능한 차이점 {11 - (opposite?.sameCount || 0)}개
                      </span>
                      <span className="text-[10px] font-dodum bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
                        #시너지_폭발 #서로를_채워주는_단짝
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📊 1학년 3반 11문항 밸런스 통계 분석 차트 */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-3xl border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    <h5 className="font-title text-sm sm:text-base font-bold text-gray-900">
                      1학년 3반 밸런스 게임 11문항 학급 응답 통계
                    </h5>
                  </div>
                  <span className="text-xs font-dodum text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold">
                    총 26명 실시간 집계
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classStats.map((st) => (
                    <div key={st.qId} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold font-title text-gray-900">
                        <span>{st.title}</span>
                      </div>
                      <div className="space-y-2">
                        {st.options.map((opt) => {
                          const isMyChoice = balanceAnswers[st.qId] === opt.id;
                          return (
                            <div key={opt.id} className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-batang text-gray-700">
                                <span className="flex items-center gap-1">
                                  {isMyChoice && <span className="text-emerald-600 font-bold font-dodum">👉 내 선택:</span>}
                                  <span className="line-clamp-1">{opt.text}</span>
                                </span>
                                <span className="font-mono font-bold shrink-0 ml-2">
                                  {opt.count}명 ({opt.pct}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isMyChoice ? "bg-emerald-600" : "bg-teal-400"
                                  }`}
                                  style={{ width: `${Math.max(opt.pct, 4)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 전체 학급 친구 싱크로율 순위표 */}
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <h6 className="font-title font-bold text-xs sm:text-sm text-gray-900 flex items-center justify-between">
                  <span>📊 1학년 3반 친구들과의 취향 일치율 랭킹 전체보기</span>
                  <span className="text-xs font-dodum text-gray-500 font-normal">총 25명 급우</span>
                </h6>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {peerMatches.map((peer, idx) => (
                    <div
                      key={peer.studentId}
                      className="p-2.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-xs hover:border-emerald-300 transition shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-400 w-4 text-center">{idx + 1}</span>
                        <span>{peer.avatar}</span>
                        <span className="font-bold text-gray-800">{peer.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">({peer.studentId})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] ${
                            peer.matchRate >= 70
                              ? "bg-emerald-100 text-emerald-800"
                              : peer.matchRate >= 45
                              ? "bg-teal-50 text-teal-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {peer.matchRate}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 이전 / 다음 네비게이션 버튼 */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2.5 text-xs sm:text-sm font-dodum font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition cursor-pointer"
        >
          ◀ 이전 단계 (3. 성격기질)
        </button>
        <button
          type="button"
          onClick={onNextStep}
          className="px-6 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs sm:text-sm font-dodum font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <span>다음 단계 (5. 브랜딩카드 제작) 👉</span>
        </button>
      </div>
    </div>
  );
};
