"use client";

import React, { useState } from "react";

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

// 25명 학급 친구 모의 데이터
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

  const answeredCount = Object.keys(balanceAnswers).length;

  // 매칭 계산
  const peerMatches = CLASSMATES_BALANCE_DATA.map((peer) => {
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

  const soulmate = peerMatches[0] || peerMatches[0];
  const opposite = peerMatches[peerMatches.length - 1] || peerMatches[peerMatches.length - 1];

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
                11문항 탐색
              </span>
            </h4>
            <p className="text-xs text-gray-500 font-batang mt-0.5">
              솔직한 선택을 통해 나의 가치관과 성향을 알아보고, 학급 친구들과의 케미 싱크로율을 실시간으로 확인해보세요!
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs font-mono font-bold text-[#1F6B38] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            진행률: {answeredCount}/11 ({Math.round((answeredCount / 11) * 100)}%)
          </span>
        </div>
      </div>

      {/* 상단 탭 전환 */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200">
        <button
          type="button"
          onClick={() => setSelectedTab("game")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-dodum font-bold transition flex items-center justify-center gap-2 ${
            selectedTab === "game"
              ? "bg-white text-[#144725] shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>🕹️ 11문항 밸런스 게임 풀기</span>
          <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">{answeredCount}/11</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("match")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-dodum font-bold transition flex items-center justify-center gap-2 ${
            selectedTab === "match"
              ? "bg-[#1F6B38] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>🤝 실시간 학급 친구 케미 & 싱크로율 리포트</span>
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">TOP 1위 & 반전 매력</span>
        </button>
      </div>

      {/* 탭 1: 11문항 밸런스 게임 */}
      {selectedTab === "game" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BALANCE_QUESTIONS.map((q) => {
              const currentAns = balanceAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all space-y-3 ${
                    currentAns
                      ? "border-emerald-400/80 bg-emerald-50/30 shadow-2xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-title font-bold text-sm text-gray-900">{q.title}</span>
                    <span
                      className={`text-[11px] font-dodum px-2 py-0.5 rounded-full font-bold ${
                        currentAns
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {currentAns ? "선택 완료" : "미선택"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-batang">{q.desc}</p>

                  {/* 선택지 옵션 버튼 */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = currentAns === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onAnswerChange(q.id, opt.id)}
                          className={`w-full text-left p-3 rounded-xl text-xs font-dodum transition-all flex items-start gap-2.5 border ${
                            isSelected
                              ? "bg-[#1F6B38] text-white font-bold border-[#1F6B38] shadow-sm transform scale-[1.01]"
                              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 font-mono font-bold mt-0.5 ${
                              isSelected ? "bg-white text-[#1F6B38]" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="flex-1 leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}

                    {/* 문항 10, 11 커스텀 입력창 */}
                    {q.id === 10 && currentAns === "CUSTOM" && (
                      <div className="pt-2 animate-fadeIn">
                        <input
                          type="text"
                          value={custom10}
                          onChange={(e) => onCustom10Change(e.target.value)}
                          placeholder="예: 자유롭게 유영하는 고래 🐋 / 끝없이 타오르는 보랏빛 불꽃 🔮"
                          className="w-full text-xs font-batang p-2.5 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900"
                        />
                      </div>
                    )}
                    {q.id === 11 && currentAns === "CUSTOM" && (
                      <div className="pt-2 animate-fadeIn">
                        <input
                          type="text"
                          value={custom11}
                          onChange={(e) => onCustom11Change(e.target.value)}
                          placeholder="예: '네가 있어서 지난 1년이 내 인생 최고의 해였어!' 🌟"
                          className="w-full text-xs font-batang p-2.5 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-dodum text-emerald-900">
              <span className="text-base">✨</span>
              <span>
                모든 문항을 선택하면 <strong>실시간 학급 친구 케미 & 싱크로율 리포트</strong>가 자동으로 완성됩니다!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTab("match")}
              className="px-4 py-2 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs font-dodum font-bold shadow-sm transition shrink-0"
            >
              매칭 리포트 확인하기 👉
            </button>
          </div>
        </div>
      )}

      {/* 탭 2: 실시간 학급 친구 케미 & 싱크로율 리포트 */}
      {selectedTab === "match" && (
        <div className="space-y-6">
          {/* 상단 요약 배너 */}
          <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl shadow-md space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono bg-white/20 px-3 py-1 rounded-full">
                1학년 3반 26인 밸런스 케미 분석 완료
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
                    {soulmate?.matchRate || 82}%
                  </span>
                  <span className="block text-[10px] text-gray-500 font-dodum">11문항 중 {soulmate?.sameCount || 9}개 일치</span>
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
                    #{soulmate?.mbti}기질 · #{soulmate?.intels.split("/")[0]}
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
                    {opposite?.matchRate || 27}%
                  </span>
                  <span className="block text-[10px] text-gray-500 font-dodum">차이점 {11 - (opposite?.sameCount || 3)}개 항목</span>
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
                    #{opposite?.mbti}기질 · #{opposite?.intels.split("/")[0]}
                  </span>
                </div>
                <p className="text-xs font-batang text-gray-700 leading-relaxed">
                  ✨ 나와 다른 접근 방식을 가지고 있어 모둠 프로젝트나 문제 해결 시 내가 보지 못한 새로운 아이디어를 선물해 줍니다!
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  <span className="text-[10px] font-dodum bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
                    🎯 보완 가능한 차이점 {11 - (opposite?.sameCount || 3)}개
                  </span>
                  <span className="text-[10px] font-dodum bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200">
                    #시너지_폭발 #서로를_채워주는_단짝
                  </span>
                </div>
              </div>
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
        </div>
      )}

      {/* 이전 / 다음 네비게이션 버튼 */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2.5 text-xs sm:text-sm font-dodum font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
        >
          ◀ 이전 단계 (3. 성격기질)
        </button>
        <button
          type="button"
          onClick={onNextStep}
          className="px-6 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs sm:text-sm font-dodum font-bold transition shadow-sm flex items-center gap-1.5"
        >
          <span>다음 단계 (5. 브랜딩카드 제작) 👉</span>
        </button>
      </div>
    </div>
  );
};
