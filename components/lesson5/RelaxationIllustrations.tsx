"use client";

import React from "react";

/**
 * 1. 주먹과 어깨 이완법 일러스트
 * Left: 힘 주기 (주먹 불끈 쥐고 어깨 위로 바짝 올림)
 * Right: 힘 빼기 (어깨 툭 내려놓고 손 편안히 폄)
 */
export const MusclePinchIllustration: React.FC = () => {
  return (
    <div className="w-full my-3 p-3 bg-purple-50/80 rounded-2xl border border-purple-200/60 flex flex-col sm:flex-row items-center justify-around gap-4">
      {/* 1) 힘 주기 */}
      <div className="flex flex-col items-center space-y-1.5">
        <span className="text-[11px] font-badge font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
          1단계: 5초간 꽉 힘주기 💥
        </span>
        <svg viewBox="0 0 160 120" className="w-36 h-28 filter drop-shadow-xs">
          {/* 머리 */}
          <circle cx="80" cy="32" r="18" fill="#F3E8FF" stroke="#6B21A8" strokeWidth="2.5" />
          {/* 찡그린 눈 */}
          <path d="M72 30 L78 34" stroke="#6B21A8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M88 30 L82 34" stroke="#6B21A8" strokeWidth="2.5" strokeLinecap="round" />
          {/* 어깨와 상체 (어깨를 귀 근처로 번쩍 올려 긴장된 모습) */}
          <path d="M45 75 Q45 42 80 42 Q115 42 115 75 Z" fill="#E9D5FF" stroke="#6B21A8" strokeWidth="2.5" />
          {/* 불끈 쥔 두 주먹 */}
          <circle cx="42" cy="58" r="9" fill="#D8B4FE" stroke="#6B21A8" strokeWidth="2.5" />
          <circle cx="118" cy="58" r="9" fill="#D8B4FE" stroke="#6B21A8" strokeWidth="2.5" />
          {/* 긴장 진동선 */}
          <path d="M30 52 L35 55 M125 55 L130 52" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 20 L72 15 M88 20 L90 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="hidden sm:block text-purple-300 font-bold text-lg">➔</div>

      {/* 2) 힘 빼기 */}
      <div className="flex flex-col items-center space-y-1.5">
        <span className="text-[11px] font-badge font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
          2단계: 툭 늘어뜨리기 🍃
        </span>
        <svg viewBox="0 0 160 120" className="w-36 h-28 filter drop-shadow-xs">
          {/* 머리 */}
          <circle cx="80" cy="36" r="18" fill="#ECFDF5" stroke="#047857" strokeWidth="2.5" />
          {/* 미소짓는 눈 */}
          <path d="M70 34 Q74 40 78 34" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M82 34 Q86 40 90 34" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* 어깨와 상체 (어깨가 아래로 툭 편안히 내려온 모습) */}
          <path d="M40 90 Q40 58 80 58 Q120 58 120 90 Z" fill="#A7F3D0" stroke="#047857" strokeWidth="2.5" />
          {/* 편안히 펴진 손 */}
          <ellipse cx="36" cy="85" rx="8" ry="11" fill="#D1FAE5" stroke="#047857" strokeWidth="2.5" />
          <ellipse cx="124" cy="85" rx="8" ry="11" fill="#D1FAE5" stroke="#047857" strokeWidth="2.5" />
          {/* 바람과 평온 표시 */}
          <path d="M22 80 Q28 75 32 82" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" fill="none" />
          <path d="M138 80 Q132 75 128 82" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" fill="none" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. 얼굴과 턱 찡그리기 일러스트
 * Left: 눈, 코, 입 잔뜩 중앙으로 모아 찡그리기
 * Right: 눈 살며시 감고 편안하게 마스크 풀기
 */
export const FacialRelaxationIllustration: React.FC = () => {
  return (
    <div className="w-full my-3 p-3 bg-pink-50/80 rounded-2xl border border-pink-200/60 flex flex-col sm:flex-row items-center justify-around gap-4">
      {/* 1) 꽉 찡그리기 */}
      <div className="flex flex-col items-center space-y-1.5">
        <span className="text-[11px] font-badge font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
          1단계: 중앙으로 꽉 찡그리기 😣
        </span>
        <svg viewBox="0 0 160 120" className="w-36 h-28 filter drop-shadow-xs">
          {/* 얼굴 윤곽 */}
          <circle cx="80" cy="60" r="42" fill="#FFE4E6" stroke="#BE123C" strokeWidth="2.5" />
          {/* 꽉 감은 눈 (X자 모양) */}
          <path d="M58 48 L68 58 M68 48 L58 58" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />
          <path d="M92 48 L102 58 M102 48 L92 58" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />
          {/* 오므린 입 */}
          <ellipse cx="80" cy="78" rx="7" ry="9" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          {/* 얼굴 주름 스파크 */}
          <path d="M74 38 L80 44 L86 38" stroke="#BE123C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="hidden sm:block text-pink-300 font-bold text-lg">➔</div>

      {/* 2) 미소 이완 */}
      <div className="flex flex-col items-center space-y-1.5">
        <span className="text-[11px] font-badge font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
          2단계: 턱과 입가 힘 풀기 😊
        </span>
        <svg viewBox="0 0 160 120" className="w-36 h-28 filter drop-shadow-xs">
          {/* 얼굴 윤곽 */}
          <circle cx="80" cy="60" r="42" fill="#F0FDF4" stroke="#15803D" strokeWidth="2.5" />
          {/* 살며시 감은 평온한 눈 */}
          <path d="M56 52 Q64 60 72 52" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M88 52 Q96 60 104 52" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* 완만한 편안한 미소 */}
          <path d="M68 74 Q80 84 92 74" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* 핑크 볼터치 */}
          <circle cx="56" cy="66" r="6" fill="#BBF7D0" opacity="0.8" />
          <circle cx="104" cy="66" r="6" fill="#BBF7D0" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. 다리와 발가락 이완법 일러스트
 * Left: 발가락을 발바닥 쪽으로 꽉 오므림
 * Right: 발가락 편안하게 쫙 폄
 */
export const LegsToesIllustration: React.FC = () => {
  return (
    <div className="w-full my-3 p-3 bg-blue-50/80 rounded-2xl border border-blue-200/60 flex flex-col sm:flex-row items-center justify-around gap-4">
      {/* 1) 오므리기 */}
      <div className="flex flex-col items-center space-y-1.5">
        <span className="text-[11px] font-badge font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-full">
          1단계: 발가락 꽉 오므리기 🦶
        </span>
        <svg viewBox="0 0 160 120" className="w-36 h-28 filter drop-shadow-xs">
          {/* 다리와 발바닥 (오므린 곡선) */}
          <path d="M40 20 L50 75 C52 92 68 95 85 92 L110 88 C115 80 112 70 102 70 L80 72 L65 20 Z" fill="#E0E7FF" stroke="#3730A3" strokeWidth="2.5" />
          {/* 발가락 구부러진 부분 */}
          <circle cx="108" cy="85" r="5" fill="#C7D2FE" stroke="#3730A3" strokeWidth="2" />
          <circle cx="102" cy="88" r="4" fill="#C7D2FE" stroke="#3730A3" strokeWidth="2" />
          <circle cx="96" cy="90" r="3.5" fill="#C7D2FE" stroke="#3730A3" strokeWidth="2" />
          {/* 힘주는 진동 라인 */}
          <path d="M115 82 L122 80 M112 94 L118 97" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="hidden sm:block text-blue-300 font-bold text-lg">➔</div>

      {/* 2) 쫙 펴기 */}
      <div className="flex flex-col items-center space-y-1.5">
        <span className="text-[11px] font-badge font-bold text-sky-900 bg-sky-100 px-2 py-0.5 rounded-full">
          2단계: 릴랙스 쫙 펼치기 ✨
        </span>
        <svg viewBox="0 0 160 120" className="w-36 h-28 filter drop-shadow-xs">
          {/* 편안히 단정한 발 */}
          <path d="M40 20 L50 70 C52 85 70 90 95 88 L122 84 C128 78 122 68 110 68 L80 70 L65 20 Z" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2.5" />
          {/* 쫙 펴진 발가락 5개 */}
          <circle cx="122" cy="72" r="5" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
          <circle cx="123" cy="80" r="4" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
          <circle cx="120" cy="86" r="3.5" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
          <circle cx="115" cy="90" r="3" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
          <circle cx="108" cy="92" r="2.5" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. 나비 포옹법 (Butterfly Hug) 일러스트
 * 양팔을 가슴 앞에서 X자로 교차해 반대편 어깨/쇄골 밑을 번갈아 토닥임
 * 좌우 번갈아 두드리는 리듬을 화살표/점선으로 표현
 */
export const ButterflyHugIllustration: React.FC = () => {
  return (
    <div className="w-full my-3 p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200 flex flex-col items-center space-y-3">
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-full text-xs font-badge font-bold">
          🦋 나비 포옹법 자세 &amp; 토닥임 리듬
        </span>
      </div>

      <svg viewBox="0 0 200 140" className="w-48 h-36 filter drop-shadow-sm">
        {/* 머리 */}
        <circle cx="100" cy="35" r="20" fill="#FEF3C7" stroke="#B45309" strokeWidth="2.5" />
        {/* 온화한 표정 */}
        <path d="M92 33 Q96 38 100 33" stroke="#B45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M100 33 Q104 38 108 33" stroke="#B45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M94 44 Q100 48 106 44" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* 상체 */}
        <path d="M60 100 Q60 62 100 62 Q140 62 140 100 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />

        {/* X자 교차 팔 (왼팔 -> 오른쪽 어깨, 오른팔 -> 왼쪽 어깨) */}
        {/* 왼팔 */}
        <path d="M60 75 C70 90 105 85 125 70" stroke="#B45309" strokeWidth="6" strokeLinecap="round" fill="none" />
        <ellipse cx="128" cy="68" rx="8" ry="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />

        {/* 오른팔 */}
        <path d="M140 75 C130 90 95 85 75 70" stroke="#92400E" strokeWidth="6" strokeLinecap="round" fill="none" />
        <ellipse cx="72" cy="68" rx="8" ry="6" fill="#D97706" stroke="#92400E" strokeWidth="2" />

        {/* 나비 날개 효과 점선 */}
        <path d="M50 55 C35 45 40 25 60 40 C75 50 65 70 50 55 Z" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />
        <path d="M150 55 C165 45 160 25 140 40 C125 50 135 70 150 55 Z" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />

        {/* 좌우 번갈아 톡톡 두드리는 리듬 화살표 */}
        <path d="M62 60 Q70 50 78 60" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <polygon points="78,60 72,55 74,62" fill="#EF4444" />
        
        <path d="M138 60 Q130 50 122 60" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <polygon points="122,60 128,55 126,62" fill="#EF4444" />

        {/* 리듬 텍스트 */}
        <text x="100" y="125" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#78350F">
          왼손 톡 ➔ 오른손 톡 (나비 날개처럼 천천히 퐁당퐁당)
        </text>
      </svg>
    </div>
  );
};
