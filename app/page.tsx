"use client";

import React, { useState, useEffect, useRef } from "react";


    

    // 10종 귀여운 구름 감정 캐릭터 (이미지 기반 감정 및 명언)
    const EMOTION_CHARACTERS = [
      {
        id: "proud",
        name: "뿌듯이",
        quote: "오늘 하루도 만족스러워요!",
        tag: "성취 · 만족",
        theme: "from-amber-400 to-orange-400",
        border: "border-orange-300",
        bg: "bg-orange-50",
        badgeBg: "bg-orange-100 text-orange-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-proud" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-proud)" />
            {/* 안경 */}
            <circle cx="38" cy="38" r="8" fill="none" stroke="#7C2D12" strokeWidth="2.5" />
            <circle cx="62" cy="38" r="8" fill="none" stroke="#7C2D12" strokeWidth="2.5" />
            <line x1="46" y1="38" x2="54" y2="38" stroke="#7C2D12" strokeWidth="2.5" />
            {/* 눈동자 */}
            <circle cx="38" cy="38" r="2.5" fill="#7C2D12" />
            <circle cx="62" cy="38" r="2.5" fill="#7C2D12" />
            {/* 미소 */}
            <path d="M44,48 Q50,54 56,48" fill="none" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            {/* 볼터치 */}
            <ellipse cx="28" cy="46" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
            <ellipse cx="72" cy="46" rx="4" ry="2.5" fill="#F87171" opacity="0.6" />
          </svg>
        )
      },
      {
        id: "angry",
        name: "화남이",
        quote: "답답하고 짜증난다..후",
        tag: "분노 · 답답",
        theme: "from-rose-500 to-red-600",
        border: "border-red-300",
        bg: "bg-red-50",
        badgeBg: "bg-red-100 text-red-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-angry" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-angry)" />
            {/* 화난 눈썹 */}
            <line x1="32" y1="30" x2="44" y2="36" stroke="#450A0A" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="30" x2="56" y2="36" stroke="#450A0A" strokeWidth="3" strokeLinecap="round" />
            {/* 세모 눈 */}
            <polygon points="34,38 42,42 36,44" fill="#450A0A" />
            <polygon points="66,38 58,42 64,44" fill="#450A0A" />
            {/* 입 삐죽 */}
            <path d="M43,52 Q50,47 57,52" fill="none" stroke="#450A0A" strokeWidth="2.5" strokeLinecap="round" />
            {/* 씩씩 김/분노 마크 */}
            <text x="74" y="24" fontSize="13" fill="#B91C1C" fontWeight="bold">💢</text>
          </svg>
        )
      },
      {
        id: "sadness",
        name: "슬픔이",
        quote: "하염없이 눈물이 나요",
        tag: "슬픔 · 서운",
        theme: "from-blue-400 to-indigo-500",
        border: "border-blue-300",
        bg: "bg-blue-50",
        badgeBg: "bg-blue-100 text-blue-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-sad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-sad)" />
            {/* 슬픈 팔자 눈썹 */}
            <path d="M34,32 Q40,30 44,36" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M66,32 Q60,30 56,36" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
            {/* 울먹이는 눈 */}
            <ellipse cx="38" cy="40" rx="3" ry="4" fill="#1E3A8A" />
            <ellipse cx="62" cy="40" rx="3" ry="4" fill="#1E3A8A" />
            {/* 눈물 줄기 */}
            <path d="M38,44 Q36,54 39,58 Q42,54 40,44" fill="#38BDF8" opacity="0.9" />
            <path d="M62,44 Q60,54 63,58 Q66,54 64,44" fill="#38BDF8" opacity="0.9" />
            {/* 슬픈 입 */}
            <path d="M45,52 Q50,47 55,52" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: "happiness",
        name: "행복이",
        quote: "설레는 일이 가득해요",
        tag: "행복 · 설렘",
        theme: "from-pink-400 to-rose-400",
        border: "border-pink-300",
        bg: "bg-pink-50",
        badgeBg: "bg-pink-100 text-pink-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-happy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#FB7185" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-happy)" />
            {/* 반달 웃는 눈 */}
            <path d="M33,36 Q40,29 45,36" fill="none" stroke="#831843" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M55,36 Q60,29 67,36" fill="none" stroke="#831843" strokeWidth="2.8" strokeLinecap="round" />
            {/* 활짝 벌린 입 */}
            <path d="M42,44 Q50,56 58,44 Z" fill="#BE185D" />
            {/* 볼터치 하트 */}
            <text x="24" y="47" fontSize="10" fill="#FDA4AF">❤️</text>
            <text x="68" y="47" fontSize="10" fill="#FDA4AF">❤️</text>
            {/* 머리 위 작은 하트 */}
            <text x="46" y="16" fontSize="12" fill="#F43F5E">💖</text>
          </svg>
        )
      },
      {
        id: "joy",
        name: "기쁨이",
        quote: "산다는 건 신나고 즐거워!",
        tag: "기쁨 · 활력",
        theme: "from-yellow-300 to-amber-400",
        border: "border-amber-300",
        bg: "bg-amber-50",
        badgeBg: "bg-amber-100 text-amber-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-joy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-joy)" />
            {/* > < 눈 */}
            <path d="M33,34 L43,39 L33,44" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M67,34 L57,39 L67,44" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* 벌린 입과 혀 */}
            <path d="M43,46 Q50,56 57,46 Z" fill="#DC2626" />
            {/* 볼터치 */}
            <ellipse cx="28" cy="46" rx="4" ry="2.5" fill="#FB923C" opacity="0.8" />
            <ellipse cx="72" cy="46" rx="4" ry="2.5" fill="#FB923C" opacity="0.8" />
            {/* 반짝이 */}
            <text x="74" y="22" fontSize="13" fill="#D97706">✨</text>
          </svg>
        )
      },
      {
        id: "peace",
        name: "평온이",
        quote: "마음이 평안하고 무탈해요",
        tag: "평온 · 여유",
        theme: "from-emerald-300 to-teal-400",
        border: "border-emerald-300",
        bg: "bg-emerald-50",
        badgeBg: "bg-emerald-100 text-emerald-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-peace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-peace)" />
            {/* 편안히 감은 눈 u u */}
            <path d="M34,36 Q40,43 46,36" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M54,36 Q60,43 66,36" fill="none" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" />
            {/* 잔잔한 미소 */}
            <path d="M46,47 Q50,51 54,47" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
            {/* 나뭇잎 잎새 */}
            <text x="44" y="16" fontSize="13" fill="#047857">🍃</text>
          </svg>
        )
      },
      {
        id: "tired",
        name: "피곤이",
        quote: "자고 싶다.. 자고 싶다..",
        tag: "피로 · 지침",
        theme: "from-purple-300 to-indigo-300",
        border: "border-purple-300",
        bg: "bg-purple-50",
        badgeBg: "bg-purple-100 text-purple-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-tired" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-tired)" />
            {/* 다크서클 */}
            <ellipse cx="38" cy="44" rx="6" ry="3" fill="#6B21A8" opacity="0.25" />
            <ellipse cx="62" cy="44" rx="6" ry="3" fill="#6B21A8" opacity="0.25" />
            {/* 감긴 눈 - - */}
            <line x1="33" y1="38" x2="43" y2="38" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="57" y1="38" x2="67" y2="38" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
            {/* 벌린 입과 침방울 */}
            <ellipse cx="50" cy="48" rx="3" ry="4" fill="#581C87" />
            <circle cx="53" cy="51" r="2" fill="#93C5FD" opacity="0.9" />
            {/* zZ 말풍선 */}
            <text x="70" y="24" fontSize="12" fill="#6D28D9" fontWeight="bold">💤</text>
          </svg>
        )
      },
      {
        id: "anxiety",
        name: "불안이",
        quote: "잠 못 이루는 밤.. o_O",
        tag: "불안 · 걱정",
        theme: "from-cyan-300 to-sky-400",
        border: "border-cyan-300",
        bg: "bg-cyan-50",
        badgeBg: "bg-cyan-100 text-cyan-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-anxiety" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-anxiety)" />
            {/* 크기가 다른 동공 o_O */}
            <circle cx="37" cy="38" r="5" fill="none" stroke="#164E63" strokeWidth="2" />
            <circle cx="37" cy="38" r="2" fill="#164E63" />
            <circle cx="63" cy="38" r="7.5" fill="none" stroke="#164E63" strokeWidth="2.5" />
            <circle cx="63" cy="38" r="3.5" fill="#164E63" />
            {/* 떨리는 지그재그 입 */}
            <path d="M42,50 L46,47 L50,51 L54,47 L58,50" fill="none" stroke="#164E63" strokeWidth="2" strokeLinecap="round" />
            {/* 식은땀 */}
            <path d="M72,32 Q70,38 73,40 Q76,38 74,32" fill="#0284C7" />
          </svg>
        )
      },
      {
        id: "neutral",
        name: "그냥이",
        quote: "나는 아무 생각이 없다",
        tag: "무념 · 덤덤",
        theme: "from-slate-300 to-gray-400",
        border: "border-slate-300",
        bg: "bg-slate-50",
        badgeBg: "bg-slate-100 text-slate-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-neutral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-neutral)" />
            {/* 멍한 점 눈 . . */}
            <circle cx="38" cy="38" r="3" fill="#334155" />
            <circle cx="62" cy="38" r="3" fill="#334155" />
            {/* 일자 입 ㅡ */}
            <line x1="44" y1="48" x2="56" y2="48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: "gloomy",
        name: "우울이",
        quote: "침울하고 무기력해요",
        tag: "우울 · 지침",
        theme: "from-slate-400 to-zinc-500",
        border: "border-zinc-400",
        bg: "bg-zinc-50",
        badgeBg: "bg-zinc-200 text-zinc-800",
        svg: (
          <svg viewBox="0 0 100 80" className="w-16 h-16 filter drop-shadow-sm">
            <defs>
              <linearGradient id="grad-gloomy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A1A1AA" />
                <stop offset="100%" stopColor="#71717A" />
              </linearGradient>
            </defs>
            <path d="M25,60 C15,60 10,50 15,40 C10,30 22,18 35,22 C42,12 60,12 68,22 C80,18 90,30 85,42 C92,52 85,60 75,60 Z" fill="url(#grad-gloomy)" />
            {/* 먹구름 비 내림 */}
            <line x1="35" y1="64" x2="33" y2="72" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="64" x2="48" y2="73" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
            <line x1="65" y1="64" x2="63" y2="71" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
            {/* 축 처진 눈 */}
            <path d="M34,36 Q38,40 42,38" fill="none" stroke="#27272A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M58,38 Q62,40 66,36" fill="none" stroke="#27272A" strokeWidth="2.5" strokeLinecap="round" />
            {/* 한숨 푹 입 */}
            <path d="M44,50 Q50,45 56,50" fill="none" stroke="#27272A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      }
    ];

    
    // 4단계: 33종 감정 스펙트럼 단어 사전
    const EMOTION_33_SPECTRUM = [
      { id: "e1", word: "서운함", color: "#F43F5E", category: "상처/아쉬움", desc: "기대했던 마음이 채워지지 않아 섭섭함" },
      { id: "e2", word: "억울함", color: "#EF4444", category: "분노/답답함", desc: "잘못하지 않았는데 오해나 탓을 받아 분함" },
      { id: "e3", word: "조급함", color: "#F97316", category: "불안/초조", desc: "시간이나 상황에 쫓겨 마음이 몹시 바쁨" },
      { id: "e4", word: "무기력", color: "#64748B", category: "지침/슬픔", desc: "아무것도 하고 싶지 않고 힘이 빠짐" },
      { id: "e5", word: "답답함", color: "#78716C", category: "분노/답답함", desc: "상황이 뜻대로 풀리지 않아 숨이 턱 막힘" },
      { id: "e6", word: "불안함", color: "#EAB308", category: "불안/초조", desc: "앞으로 일어날 일에 대해 걱정스럽고 두려움" },
      { id: "e7", word: "외로움", color: "#6366F1", category: "지침/슬픔", desc: "세상에 나 혼자만 남겨진 것 같은 쓸쓸함" },
      { id: "e8", word: "부끄러움", color: "#EC4899", category: "수치/어색", desc: "남의 시선이나 실수 때문에 얼굴이 화끈거림" },
      { id: "e9", word: "미안함", color: "#14B8A6", category: "관계/회복", desc: "상대방에게 피해를 주었거나 폐를 끼쳐 죄송함" },
      { id: "e10", word: "질투심", color: "#8B5CF6", category: "비교/열등", desc: "남의 좋은 점이나 가진 것을 부러워하고 시샘함" },
      { id: "e11", word: "속상함", color: "#FB7185", category: "상처/아쉬움", desc: "마음이 아프고 마음먹은 대로 되지 않아 괴로움" },
      { id: "e12", word: "초조함", color: "#F59E0B", category: "불안/초조", desc: "결과를 기다리며 마음이 조마조마함" },
      { id: "e13", word: "허탈함", color: "#94A3B8", category: "지침/슬픔", desc: "노력했던 것이 한순간에 물거품이 된 듯 멍함" },
      { id: "e14", word: "분노", color: "#DC2626", category: "분노/답답함", desc: "몹시 화가 나고 참기 어려운 격한 감정" },
      { id: "e15", word: "두려움", color: "#7C3AED", category: "불안/초조", desc: "위험하거나 무서운 대상을 마주했을 때의 공포" },
      { id: "e16", word: "막막함", color: "#475569", category: "지침/슬픔", desc: "앞으로 무엇을 어떻게 해야 할지 도무지 모름" },
      { id: "e17", word: "지루함", color: "#A8A29E", category: "지침/슬픔", desc: "흥미가 없고 시간이 너무 더디게 감" },
      { id: "e18", word: "뿌듯함", color: "#10B981", category: "긍정/성취", desc: "스스로 해낸 일이 자랑스럽고 가슴 벅참" },
      { id: "e19", word: "설렘", color: "#F472B6", category: "긍정/성취", desc: "기분 좋은 일이 다가올 것 같아 가슴이 뜀" },
      { id: "e20", word: "안도감", color: "#06B6D4", category: "평온/안정", desc: "걱정했던 일이 무사히 지나가 마음이 놓임" },
      { id: "e21", word: "고마움", color: "#34D399", category: "관계/회복", desc: "남이 나에게 베풀어 준 마음에 감사함" },
      { id: "e22", word: "편안함", color: "#3B82F6", category: "평온/안정", desc: "긴장 없이 몸과 마음이 한없이 아늑함" },
      { id: "e23", word: "자신감", color: "#FBBF24", category: "긍정/성취", desc: "무엇이든 잘 해낼 수 있을 것 같은 당당함" },
      { id: "e24", word: "기쁨", color: "#F59E0B", category: "긍정/성취", desc: "원하던 일이 이루어져 마냥 즐겁고 유쾌함" },
      { id: "e25", word: "홀가분함", color: "#38BDF8", category: "평온/안정", desc: "무거운 짐이나 숙제를 다 끝내고 마음이 가벼움" },
      { id: "e26", word: "감동", color: "#D946EF", category: "긍정/성취", desc: "아름다운 마음이나 행동에 깊이 울림을 받음" },
      { id: "e27", word: "신뢰감", color: "#2563EB", category: "관계/회복", desc: "상대방을 굳게 믿고 의지할 수 있음" },
      { id: "e28", word: "희망", color: "#A3E635", category: "긍정/성취", desc: "앞으로의 미래가 더 좋아질 것이라 기대함" },
      { id: "e29", word: "당황함", color: "#FB923C", category: "수치/어색", desc: "예상치 못한 일이 생겨 어찌할 바를 모름" },
      { id: "e30", word: "어색함", color: "#C084FC", category: "수치/어색", desc: "분위기나 관계가 서먹서먹하고 불편함" },
      { id: "e31", word: "괴로움", color: "#991B1B", category: "분노/답답함", desc: "몸과 마음에 큰 고통과 시련이 찾아옴" },
      { id: "e32", word: "소외감", color: "#4B5563", category: "지침/슬픔", desc: "무리나 친구들 사이에서 배제된 느낌" },
      { id: "e33", word: "호기심", color: "#0D9488", category: "긍정/성취", desc: "새롭고 신기한 것을 탐구하고 싶은 흥미" }
    ];

    const CURRICULUM = [
      { no: 1, title: "01. 마음, 그게 궁금해!", subtitle: "마음의 문 열기 & 일상 고민 주파수 라디오", area: "영역 ❶ 나와 마주하기" },
      { no: 2, title: "02. 진짜 나를 알아볼까?(1)", subtitle: "조하리의 창(Johari Window) & 나와 친구의 강점 발견하기", area: "영역 ❶ 나와 마주하기" },
      { no: 3, title: "03. 진짜 나를 알아볼까?(2)", subtitle: "나를 표현하는 브랜딩카드 만들기", area: "영역 ❷ 나를 표현하기" },
      { no: 4, title: "04. 내 감정을 알고 싶어", subtitle: "33종 감정 스펙트럼 믹서기 & 몬스터", area: "영역 ❷ 나를 표현하기" },
      { no: 5, title: "05. 감정의 파도 다스리기", subtitle: "긴급 SOS 10초 쿨다운 & 4-7-8 호흡 가이드", area: "영역 ❸ 정서 조절하기" },
      { no: 6, title: "06. 생각을 바꾸면 놀라운 일이!", subtitle: "비합리적 생각 브레이커 ABCD 카드 게임", area: "영역 ❸ 정서 조절하기" },
      { no: 7, title: "07. 단단해질 내 마음", subtitle: "통제 분리수거 타임어택 아케이드", area: "영역 ❸ 정서 조절하기" },
      { no: 8, title: "08. I can do it! 긍정의 힘", subtitle: "'오히려 좋아!' 역발상 슬롯머신 & 감사 한 컷", area: "영역 ❹ 긍정의 힘 기르기" },
      { no: 9, title: "09. 당연히 다를 수 있어", subtitle: "학급 취향 밸런스 게임 & 다름 인정 도장", area: "영역 ❺ 타인과 소통하고 공감하기" },
      { no: 10, title: "10. 관계를 이어가고 싶다면 꼭!", subtitle: "고민 상담소: 4단계 공감 톡 시뮬레이터", area: "영역 ❺ 타인과 소통하고 공감하기" },
      { no: 11, title: "11. 진짜 마음을 전할래요", subtitle: "공격적 말투 정화기 (너-전달법 ➔ 나사감바)", area: "영역 ❺ 타인과 소통하고 공감하기" },
      { no: 12, title: "12. 갈등을 키우지 않으려면", subtitle: "인사약(사과) & 공마다(거절) 대화 방탈출", area: "영역 ❻ 갈등 해결과 성숙한 관계" },
      { no: 13, title: "13. 현명한 선택을 하려면", subtitle: "선택의 갈림길: 나비효과 시뮬레이터", area: "영역 ❻ 갈등 해결과 성숙한 관계" },
      { no: 14, title: "14. 마음 모아 플레이하기", subtitle: "마음 레벨업 5대 스킬 덱 & 7층 타워", area: "영역 ❼ 마음 모아 성장하기" },
      { no: 15, title: "15. 이제는 내 마음대로!", subtitle: "15주 타임캡슐 개봉식 & 디지털 롤링페이퍼", area: "영역 ❼ 마음 모아 성장하기" }
    ];

    // 1학년 3반 사전 등록 학생 명렬 (26명 + 체험용 10101)
    const CLASS_STUDENTS = [
      { studentId: "10101", name: "김하늘", isDemo: true },
      { studentId: "10102", name: "이도윤", isDemo: true },
      { studentId: "10301", name: "권현규" }, { studentId: "10302", name: "김도연" },
      { studentId: "10303", name: "김성균" }, { studentId: "10304", name: "김소율" },
      { studentId: "10305", name: "김정훈" }, { studentId: "10306", name: "김하윤" },
      { studentId: "10307", name: "문정인" }, { studentId: "10308", name: "박준석" },
      { studentId: "10309", name: "박하진" }, { studentId: "10310", name: "변해린" },
      { studentId: "10311", name: "신수환" }, { studentId: "10312", name: "양하윤" },
      { studentId: "10313", name: "우준오" }, { studentId: "10314", name: "이강운" },
      { studentId: "10315", name: "이서은" }, { studentId: "10316", name: "이예린" },
      { studentId: "10317", name: "이윤솔" }, { studentId: "10318", name: "이태건" },
      { studentId: "10319", name: "이현동" }, { studentId: "10320", name: "전수진" },
      { studentId: "10321", name: "정다은" }, { studentId: "10322", name: "정우진" },
      { studentId: "10323", name: "조호진" }, { studentId: "10324", name: "최지현" },
      { studentId: "10325", name: "허정빈" }, { studentId: "10326", name: "황승후" }
    ];

    // 24가지 한국어 성격 강점 라이브러리 (6대 덕목 분류)
    const VIA_STRENGTHS = [
      { category: "지혜와 지식", items: ["창의성", "호기심", "개방성", "학구열", "지혜"], color: "bg-blue-50 text-blue-800 border-blue-200" },
      { category: "용기", items: ["용감함", "끈기", "진실성", "활력"], color: "bg-rose-50 text-rose-800 border-rose-200" },
      { category: "인간애", items: ["사랑", "친절/이타성", "사회지능(눈치/공감)"], color: "bg-amber-50 text-amber-800 border-amber-200" },
      { category: "정의", items: ["시민의식/협동", "공정성", "리더십"], color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
      { category: "절제", items: ["용서", "겸손", "신중성", "자기조절"], color: "bg-teal-50 text-teal-800 border-teal-200" },
      { category: "초월성", items: ["심미안(아름다움을 느낌)", "감사", "낙관성(희망)", "유머"], color: "bg-purple-50 text-purple-800 border-purple-200" }
    ];

    const ALL_VIA_STRENGTH_ITEMS = VIA_STRENGTHS.flatMap(g => g.items);

    // 가드너 8대 다중지능 정의 및 56문항 데이터베이스 (학습지 원본)
    const GARDNER_INTELLIGENCES = [
      {
        id: "music",
        name: "음악",
        character: "음의 마술사",
        icon: "🎵",
        color: "from-rose-400 to-pink-500",
        bg: "bg-rose-50 border-rose-200 text-rose-900",
        qNums: [1, 9, 17, 25, 33, 41, 49],
        statement: "악기 연주와 음악 감상, 리듬 표현하기를 가장 좋아한다 🎶",
        ability: "멜로디, 박자, 리듬에 민감하고 소리를 통해 생각과 감정을 표현하는 능력",
        feature: "노래를 흥얼거리거나 악기 다루기를 좋아하고, 음악만 들어도 분위기를 단번에 파악해요.",
        keywords: ["#노래부르기", "#악기연주", "#플레이리스트", "#비트장인"]
      },
      {
        id: "kinesthetic",
        name: "신체운동",
        character: "몸놀림의 달인",
        icon: "⚽",
        color: "from-orange-400 to-amber-500",
        bg: "bg-orange-50 border-orange-200 text-orange-900",
        qNums: [2, 10, 18, 26, 34, 42, 50],
        statement: "몸을 움직이는 운동과 댄스, 섬세한 손재주 발휘를 가장 좋아한다 🏃",
        ability: "온몸을 조화롭게 움직이거나, 손을 섬세하고 정교하게 사용하는 능력",
        feature: "새로운 운동이나 춤 동작을 금방 따라 하고, 손재주가 좋아 조립이나 만들기를 잘해요.",
        keywords: ["#체육시간에이스", "#손재주만렙", "#댄스커버", "#만들기달인"]
      },
      {
        id: "logical",
        name: "논리수학",
        character: "논리적인 해결사",
        icon: "🧩",
        color: "from-blue-400 to-cyan-500",
        bg: "bg-blue-50 border-blue-200 text-blue-900",
        qNums: [3, 11, 19, 27, 35, 43, 51],
        statement: "원인을 분석하고 규칙을 찾아 논리적으로 문제 해결하기를 가장 좋아한다 🔍",
        ability: "원인과 결과를 따져보고, 복잡한 문제나 규칙을 논리적으로 파헤치는 능력",
        feature: "\"왜 그럴까?\" 이유를 파고들기 좋아하고, 퍼즐이나 전략 게임, 체계적인 분석을 즐겨요.",
        keywords: ["#원인분석", "#전략게임", "#퍼즐해결", "#수학과학호기심"]
      },
      {
        id: "spatial",
        name: "공간",
        character: "상상 캔버스",
        icon: "🎨",
        color: "from-purple-400 to-indigo-500",
        bg: "bg-purple-50 border-purple-200 text-purple-900",
        qNums: [4, 12, 20, 28, 36, 44, 52],
        statement: "그림 그리기와 모형 만들기, 공간과 이미지를 시각화하기를 가장 좋아한다 🖌️",
        ability: "머릿속으로 그림을 그리거나 모양, 색감, 배치를 감각적으로 파악하는 능력",
        feature: "그림 그리기와 꾸미기를 좋아하고, 길을 잘 찾거나 머릿속에 지도를 잘 떠올려요.",
        keywords: ["#그림그리기", "#방꾸미기", "#디자인감각", "#길찾기달인"]
      },
      {
        id: "linguistic",
        name: "언어",
        character: "말과 글의 연금술사",
        icon: "✍️",
        color: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
        qNums: [5, 13, 21, 29, 37, 45, 53],
        statement: "글을 조리 있게 쓰고 책을 읽으며 언어로 생각을 표현하기를 가장 좋아한다 📖",
        ability: "말과 글을 조리 있게 사용해 내 생각을 상대방에게 쏙쏙 전달하는 능력",
        feature: "어휘력이 풍부하고, 책 읽기나 글쓰기를 좋아하며, 말로 친구들을 웃기거나 설득하는 데 능해요.",
        keywords: ["#글쓰기좋아", "#말솜씨최고", "#풍부한어휘", "#토론과유머"]
      },
      {
        id: "interpersonal",
        name: "대인관계",
        character: "프로 공감러 & 분위기 메이커",
        icon: "🤝",
        color: "from-amber-400 to-yellow-500",
        bg: "bg-amber-50 border-amber-200 text-amber-900",
        qNums: [6, 14, 22, 30, 38, 46, 54],
        statement: "친구들의 마음을 헤아리고 다 함께 협동하여 소통하기를 가장 좋아한다 👥",
        ability: "친구들의 기분과 속마음을 잘 알아채고, 사람들과 좋은 관계를 맺는 능력",
        feature: "고민 상담을 잘해주고, 모둠 활동에서 팀원들의 의견을 둥글게 조율하며 협동을 이끌어요.",
        keywords: ["#친구고민상담", "#눈치만렙", "#모둠조율자", "#협동의달인"]
      },
      {
        id: "intrapersonal",
        name: "자기이해",
        character: "내 마음의 조종사",
        icon: "🧘",
        color: "from-teal-400 to-green-500",
        bg: "bg-teal-50 border-teal-200 text-teal-900",
        qNums: [7, 15, 23, 31, 39, 47, 55],
        statement: "내 마음과 기분을 돌아보고 스스로 계획을 세워 성장하기를 가장 좋아한다 🌱",
        ability: "내 감정과 기분, 장단점을 정확히 알고 스스로를 다스릴 줄 아는 능력",
        feature: "\"오늘 내 기분이 왜 이렇지?\" 스스로를 잘 돌아보고, 목표와 계획을 세워 규칙적으로 실천해요.",
        keywords: ["#멘탈관리", "#일기쓰기", "#자기성찰", "#목표계획러"]
      },
      {
        id: "naturalist",
        name: "자연친화",
        character: "생태계의 탐험가",
        icon: "🌿",
        color: "from-lime-400 to-emerald-500",
        bg: "bg-lime-50 border-lime-200 text-lime-900",
        qNums: [8, 16, 24, 32, 40, 48, 56],
        statement: "동식물을 돌보고 자연환경의 특징을 관찰·분석하기를 가장 좋아한다 🐾",
        ability: "동물, 식물, 날씨 등 주변 자연환경과 생명체의 특징을 민감하게 느끼고 돌보는 능력",
        feature: "반려동물이나 식물을 정성껏 보살피고, 자연 속 산책이나 환경 문제에 관심이 많아요.",
        keywords: ["#동물식물집사", "#자연관찰", "#산책힐링", "#지구지킴이"]
      }
    ];

    const GARDNER_56_QUESTIONS = [
      { no: 1, type: "music", text: "악기 연주를 하거나 음악 감상하는 것을 즐긴다." },
      { no: 2, type: "kinesthetic", text: "운동선수의 장·단점을 잘 찾아낸다." },
      { no: 3, type: "logical", text: "새로운 가설을 세우고 실험·검증하는 것을 좋아한다." },
      { no: 4, type: "spatial", text: "만들기나 그림 그리는 활동을 좋아한다." },
      { no: 5, type: "linguistic", text: "어휘력이 풍부하고 말을 조리 있게 잘하는 편이다." },
      { no: 6, type: "interpersonal", text: "친구들이나 가족의 고민을 듣고 해결해 주는 것을 좋아한다." },
      { no: 7, type: "intrapersonal", text: "자신을 되돌아보고 생활 계획 세우는 것을 좋아한다." },
      { no: 8, type: "naturalist", text: "자동차나 비행기 등 사물에 관심이 많고 특징을 잘 안다." },
      { no: 9, type: "music", text: "악보를 보면 대략 어떤 멜로디인지 파악할 수 있다." },
      { no: 10, type: "kinesthetic", text: "몸을 움직이는 다양한 활동을 좋아한다." },
      { no: 11, type: "logical", text: "수학이나 과학 과목을 좋아하고 흥미를 느낀다." },
      { no: 12, type: "spatial", text: "어림짐작으로 길이와 넓이를 잘 맞춘다." },
      { no: 13, type: "linguistic", text: "문법적으로 어색하거나 틀린 문장을 잘 찾아낸다." },
      { no: 14, type: "interpersonal", text: "학교 폭력이나 갈등이 발생하는 원인과 해결책을 잘 안다." },
      { no: 15, type: "intrapersonal", text: "자신의 건강 상태나 기분을 정확하게 파악하고 있다." },
      { no: 16, type: "naturalist", text: "친구들의 옷이나 가방 브랜드를 바로 알아맞힌다." },
      { no: 17, type: "music", text: "친구나 가수가 부르는 노래의 부족한 점을 잘 파악한다." },
      { no: 18, type: "kinesthetic", text: "새로운 운동이나 신체 동작을 한두 번 해보면 곧잘 따라 한다." },
      { no: 19, type: "logical", text: "다른 사람의 말이나 글에서 비논리적인 점을 잘 찾아낸다." },
      { no: 20, type: "spatial", text: "그림이나 사진을 보고 구도와 느낌을 잘 평가한다." },
      { no: 21, type: "linguistic", text: "꿈이 작가나 아나운서, 기자인 적이 있었다." },
      { no: 22, type: "interpersonal", text: "친구들로부터 다정다감하고 배려심 있다는 소리를 자주 듣는다." },
      { no: 23, type: "intrapersonal", text: "자신의 감정을 상황에 맞게 잘 통제하고 조절한다." },
      { no: 24, type: "naturalist", text: "동물이나 식물, 생물에 대한 정보를 많이 알고 있다." },
      { no: 25, type: "music", text: "노래를 부를 때 화음을 잘 맞추어 넣을 수 있다." },
      { no: 26, type: "kinesthetic", text: "운동을 잘한다는 칭찬을 주변에서 자주 듣는다." },
      { no: 27, type: "logical", text: "복잡한 문제나 규칙이 있는 게임의 해결 절차를 잘 파악한다." },
      { no: 28, type: "spatial", text: "방을 꾸밀 때 가구 배치나 인테리어 감각이 뛰어나다." },
      { no: 29, type: "linguistic", text: "글을 조리 있고 설득력 있게 잘 쓴다는 말을 듣는다." },
      { no: 30, type: "interpersonal", text: "친구들의 표정이나 기분 변화를 민감하게 알아차린다." },
      { no: 31, type: "intrapersonal", text: "자신의 재능과 잠재력을 계발하기 위해 꾸준히 노력한다." },
      { no: 32, type: "naturalist", text: "반려동물이나 식물을 정성껏 키우고 돌보는 것을 좋아한다." },
      { no: 33, type: "music", text: "연주를 하거나 노래할 때 음정과 박자를 정확하게 표현한다." },
      { no: 34, type: "kinesthetic", text: "손재주가 좋아 섬세한 손놀림 활동(조립, 공예 등)을 잘한다." },
      { no: 35, type: "logical", text: "물건 가격이나 수치, 할인율 등을 빠르고 정확하게 계산한다." },
      { no: 36, type: "spatial", text: "그림이나 만들기 작품으로 칭찬을 받은 적이 많다." },
      { no: 37, type: "linguistic", text: "신문 기사나 책, 설명문의 핵심 내용을 쉽게 이해한다." },
      { no: 38, type: "interpersonal", text: "처음 만난 사람과도 금방 친해지고 누구와도 잘 지낸다." },
      { no: 39, type: "intrapersonal", text: "다이어리를 정리하거나 계획을 세워 규칙적으로 생활한다." },
      { no: 40, type: "naturalist", text: "자연 생태나 동식물, 환경 관련 연구에 관심이 많다." },
      { no: 41, type: "music", text: "새로운 악기의 연주법이나 멜로디를 빠르게 배운다." },
      { no: 42, type: "kinesthetic", text: "다른 사람의 독특한 걸음걸이나 행동 특징을 잘 흉내 낸다." },
      { no: 43, type: "logical", text: "무조건 외우기보다 논리적 인과관계를 이해하며 학습한다." },
      { no: 44, type: "spatial", text: "그림, 지도, 도표, 마인드맵을 그리며 내용을 정리하는 편이다." },
      { no: 45, type: "linguistic", text: "글짓기 시간이나 일기, 생각을 글로 쓰는 시간을 좋아한다." },
      { no: 46, type: "interpersonal", text: "모둠 활동이나 단체 생활에서 내가 해야 할 일을 잘 찾아낸다." },
      { no: 47, type: "intrapersonal", text: "실수나 실패를 했을 때 원인을 분석하여 다시 도전한다." },
      { no: 48, type: "naturalist", text: "주변 사물이나 자연 현상의 공통점과 차이점을 잘 구분한다." },
      { no: 49, type: "music", text: "분위기와 박자에 어울리는 노랫말이나 멜로디를 잘 떠올린다." },
      { no: 50, type: "kinesthetic", text: "몸짓이나 연기, 춤으로 생각이나 감정을 잘 표현한다." },
      { no: 51, type: "logical", text: "어떤 사건이나 문제의 발생 원인을 여러 각도에서 분석한다." },
      { no: 52, type: "spatial", text: "고장 난 물건이나 부품의 구조를 파악해 잘 고친다." },
      { no: 53, type: "linguistic", text: "다른 사람이 말하는 핵심 요점과 숨은 뜻을 잘 파악한다." },
      { no: 54, type: "interpersonal", text: "많은 사람들 앞에서도 자신감 있게 발표나 사회를 잘 본다." },
      { no: 55, type: "intrapersonal", text: "내가 원하는 꿈과 인생의 목표에 대한 뚜렷한 신념이 있다." },
      { no: 56, type: "naturalist", text: "환경 오염 문제와 생태계 보호 방법에 관심이 많고 잘 안다." }
    ];

    // Keirsey 4가지 기질 검사 (36개 카드 덱)
    const KEIRSEY_TEMPERAMENTS = {
      SJ: {
        code: "SJ",
        title: "SJ 든든한 수호자",
        sub: "책임감 있고 조직적인 현실의 기둥",
        badge: "🛡️ 책임 수호자",
        color: "blue",
        theme: "bg-blue-50 text-blue-900 border-blue-300",
        btnColor: "bg-blue-600 hover:bg-blue-700 text-white",
        cards: [
          { trait: "계획성이 있다", desc: "일단 계획부터 짜야 안심! 무계획은 불안해" },
          { trait: "전통을 지킨다", desc: "트렌드는 바뀌어도 기본과 전통이 중요해" },
          { trait: "믿을 만하다", desc: "맡기면 끝까지 해내는 든든한 사람" },
          { trait: "규칙을 잘 지킨다", desc: "규칙과 질서가 있어야 마음이 편해" },
          { trait: "안정적이다", desc: "급격한 변화보단 안정적인 게 최고" },
          { trait: "꾸준히 끝까지 한다", desc: "늘 하던 대로 묵묵히 완주하기" },
          { trait: "책임감이 있다", desc: "내가 맡은 일은 반드시 책임져" },
          { trait: "디테일을 중시한다", desc: "사소한 오타나 작은 부분도 놓치지 않아" },
          { trait: "체계적이다", desc: "정리정돈부터 깔끔하게 하고 시작해야 속 시원함" }
        ]
      },
      SP: {
        code: "SP",
        title: "SP 자유로운 모험가",
        sub: "감각적이고 즉흥적인 열정의 행동가",
        badge: "⚡ 열정 모험가",
        color: "amber",
        theme: "bg-amber-50 text-amber-900 border-amber-300",
        btnColor: "bg-amber-600 hover:bg-amber-700 text-white",
        cards: [
          { trait: "호기심이 많다", desc: "맨날 똑같은 건 질려! 새로운 거 환영" },
          { trait: "현실적이다", desc: "말만 번지르르한 건 No! 실생활에 쓸모가 있어야지" },
          { trait: "활동적이다", desc: "가만히 앉아만 있으면 몸이 근질근질" },
          { trait: "자유롭다", desc: "날 구속하는 모든 틀을 거부한다, 자유가 최고" },
          { trait: "이 순간을 즐긴다", desc: "미래 걱정은 나중에, 지금 이 순간을 만끽!" },
          { trait: "모험심이 있다", desc: "어렵고 낯설어도 일단 부딪혀봐야 직성 풀림" },
          { trait: "융통성이 있다", desc: "융통성 없는 딱딱한 원칙은 답답해" },
          { trait: "오감 만족이 중요하다", desc: "맛있는 거, 예쁜 거, 신나는 게 제일 좋아" },
          { trait: "표현력이 좋다", desc: "그림, 영상, 춤으로 나를 표현하기 좋아함" }
        ]
      },
      NT: {
        code: "NT",
        title: "NT 스마트한 전략가",
        sub: "논리적이고 분석적인 미래의 사색가",
        badge: "💡 논리 전략가",
        color: "purple",
        theme: "bg-purple-50 text-purple-900 border-purple-300",
        btnColor: "bg-purple-600 hover:bg-purple-700 text-white",
        cards: [
          { trait: "문제해결을 잘한다", desc: "복잡한 문제 생겼어? 내가 분석해서 풀어볼게" },
          { trait: "독립적이다", desc: "남에게 의지하지 않고 혼자서도 척척 해냄" },
          { trait: "생각이 명확하다", desc: "머릿속에 지도가 착착 정리되어 있음" },
          { trait: "논리적이다", desc: "감정적인 주장 말고 객관적 근거를 제시해줘" },
          { trait: "시간을 중시한다", desc: "시간 낭비는 질색, 시간 대비 최대 효율 추구" },
          { trait: "새 아이디어가 많다", desc: "머릿속에 기발한 아이디어 실험실이 있음" },
          { trait: "배우는 걸 좋아한다", desc: "새로운 지식을 탐구하는 게 진짜 재밌어" },
          { trait: "미래계획 세우기를 좋아함", desc: "앞으로 어떻게 나아갈지 큰 그림 그리기" },
          { trait: "생각하는 것을 즐긴다", desc: "\"왜 그럴까?\" 원인을 끝까지 파고듦" }
        ]
      },
      NF: {
        code: "NF",
        title: "NF 따뜻한 조화자",
        sub: "의미와 깊은 유대를 추구하는 이상주의자",
        badge: "💖 공감 이상가",
        color: "rose",
        theme: "bg-rose-50 text-rose-900 border-rose-300",
        btnColor: "bg-rose-600 hover:bg-rose-700 text-white",
        cards: [
          { trait: "우정을 중요시한다", desc: "친구들과 겉돌지 않고 마음을 깊이 나누고 싶어" },
          { trait: "공감 능력이 뛰어나다", desc: "친구 표정만 봐도 무슨 일 있는지 단번에 눈치챔" },
          { trait: "성찰을 잘한다", desc: "가끔 \"나는 어떤 사람일까?\" 깊은 생각에 잠김" },
          { trait: "내 신념대로 산다", desc: "내 가치관과 양심에 따라 행동하는 게 중요해" },
          { trait: "이상을 품고 있다", desc: "모두가 상처받지 않고 따뜻한 세상을 꿈꿔" },
          { trait: "갈등을 잘 해결한다", desc: "싸우는 건 싫어, 두루두루 화합하는 게 좋아" },
          { trait: "감각이 섬세하다", desc: "주변 분위기 변화나 감정 레이더가 발달함" },
          { trait: "창의적 활동을 좋아한다", desc: "나만의 색깔이 담긴 독창적인 걸 만들 때 신남" },
          { trait: "영감이 자주 떠오른다", desc: "번뜩이는 영감과 직관을 신뢰해" }
        ]
      }
    };

    // 단방향 순환 순열(Circular Derangement) 매칭 헬퍼 함수
    function getMatchedPartner(myStudentId) {
      const idx = CLASS_STUDENTS.findIndex(s => s.studentId === myStudentId);
      if (idx === -1) {
        return {
          targetPartner: CLASS_STUDENTS[0],
          sourcePartner: CLASS_STUDENTS[CLASS_STUDENTS.length - 1]
        };
      }
      // 원형 큐: 내가 강점을 찾아줄 친구 = (idx + 1) % 26
      const targetIndex = (idx + 1) % CLASS_STUDENTS.length;
      // 나에게 강점을 선물해준 친구 = (idx - 1 + 26) % 26
      const sourceIndex = (idx - 1 + CLASS_STUDENTS.length) % CLASS_STUDENTS.length;
      return {
        targetPartner: CLASS_STUDENTS[targetIndex] || CLASS_STUDENTS[0],
        sourcePartner: CLASS_STUDENTS[sourceIndex] || CLASS_STUDENTS[CLASS_STUDENTS.length - 1]
      };
    }

    function App() {
      // 로그인 세션 상태
      const [currentUser, setCurrentUser] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_user");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return { studentId: "10101", name: "김하늘", isDemo: true };
      });
      const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
      const [loginInputId, setLoginInputId] = useState("");
      const [loginInputPw, setLoginInputPw] = useState("");
      const [detectedStudent, setDetectedStudent] = useState(null);
      const [isTeacherMode, setIsTeacherMode] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_user");
          if (saved) {
            const u = JSON.parse(saved);
            return u.studentId === "00000" || !!u.isTeacher;
          }
        } catch(e){}
        return false;
      });
      const [teacherSelectedStage, setTeacherSelectedStage] = useState(1); // 교사용 대시보드 단계 필터 선택기 (1~15단계)

      // 학번 입력 감지
      useEffect(() => {
        const trimmed = loginInputId.trim();
        if (trimmed === "00000") {
          setDetectedStudent({ studentId: "00000", name: "선생님 (관리자)", isTeacher: true });
        } else if (trimmed.length >= 4) {
          const matched = CLASS_STUDENTS.find(s => s.studentId === trimmed);
          setDetectedStudent(matched || null);
        } else {
          setDetectedStudent(null);
        }
      }, [loginInputId]);

      const handleLoginSubmit = (e) => {
        e.preventDefault();
        const trimmedId = (loginInputId || "").trim();
        const trimmedPw = (loginInputPw || "").trim();

        // 1. 교사용 로그인 (00000 / 비번 8888)
        if (trimmedId === "00000") {
          if (trimmedPw === "8888") {
            const teacherUser = { studentId: "00000", name: "선생님 (관리자)", isTeacher: true };
            setCurrentUser(teacherUser);
            setIsTeacherMode(true);
            setCurrentTab("teacher");
            try { localStorage.setItem("mindplay_user", JSON.stringify(teacherUser)); } catch(err){}
            setIsLoginModalOpen(false);
            setLoginInputId("");
            setLoginInputPw("");
            triggerConfetti();
          } else {
            alert("교사용 비밀번호가 올바르지 않습니다.");
          }
          return;
        }

        // 2. 체험용 학생 10101 및 10102 로그인 (비번 0000)
        if (trimmedId === "10101" || trimmedId === "10102") {
          if (trimmedPw === "0000") {
            const found = CLASS_STUDENTS.find(s => s.studentId === trimmedId) || { studentId: trimmedId, name: trimmedId === "10101" ? "김하늘" : "이도윤", isDemo: true };
            setCurrentUser(found);
            setIsTeacherMode(false);
            setCurrentTab("activity");
            try { localStorage.setItem("mindplay_user", JSON.stringify(found)); } catch(err){}
            setIsLoginModalOpen(false);
            setLoginInputId("");
            setLoginInputPw("");
            triggerConfetti();
          } else {
            alert("체험용 학생 비밀번호가 올바르지 않습니다. (비밀번호: 0000)");
          }
          return;
        }

        // 3. 1학년 3반 일반 학생 로그인 (비번: 자신의 학번 5자리)
        const found = CLASS_STUDENTS.find(s => s.studentId === trimmedId);
        if (found) {
          if (trimmedPw === trimmedId) {
            setCurrentUser(found);
            setIsTeacherMode(false);
            setCurrentTab("activity");
            try { localStorage.setItem("mindplay_user", JSON.stringify(found)); } catch(err){}
            setIsLoginModalOpen(false);
            setLoginInputId("");
            setLoginInputPw("");
            triggerConfetti();
          } else {
            alert(`비밀번호가 올바르지 않습니다. (초기 비밀번호는 자신의 학번인 ${trimmedId} 입니다)`);
          }
        } else {
          alert("1학년 3반 명렬표에 등록되지 않은 학번입니다. (교사용: 00000, 학생: 10101 또는 10301~10326)");
        }
      };

      // 뷰 상태: "home"(홈메인 4개 버튼 카드), "activity"(1~15단계 활동), "diary"(감정일기), "mypage"(마이페이지), "print"(전시용 인쇄), "teacher"(교사용 대시보드)
      const [currentTab, setCurrentTab] = useState("home");
      const [archiveModal, setArchiveModal] = useState(null);
      const [selectedGalleryCard, setSelectedGalleryCard] = useState(null); // 3단계 학급 갤러리 친구 상세 모달
      const [lesson2Rating, setLesson2Rating] = useState(5); // 2단계 성장 확인 별점
      const [teacherInspectStudent, setTeacherInspectStudent] = useState(null);
      const [currentLesson, setCurrentLesson] = useState(1);
      const [selectedDiaryLesson, setSelectedDiaryLesson] = useState(null); // 1~15회차 감정일기 선택 상태
      const [selectedEmotionId, setSelectedEmotionId] = useState("proud");
      const studentName = currentUser.name;
      const studentId = currentUser.studentId;
      const [nickname, setNickname] = useState("햇살구름");

      // 완료한 단계 목록 (레벨업 시스템)
      const [completedLessons, setCompletedLessons] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_completed_lessons_" + (currentUser.studentId || "guest"));
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return [1];
      });

      const handleCompleteLesson = (lessonNo) => {
        setCompletedLessons(prev => {
          const next = prev.includes(lessonNo) ? prev : [...prev, lessonNo];
          try {
            localStorage.setItem("mindplay_completed_lessons_" + (currentUser.studentId || "guest"), JSON.stringify(next));
          } catch(e){}
          return next;
        });
        triggerConfetti();
        alert(`🎉 ${lessonNo}단계 마음 성장 퀘스트를 완료했습니다! 마음 레벨이 상승했습니다! ⭐`);
      };

      // 교사용 단계별 잠금/해제 상태 (1, 2, 3단계 기본 해제, 4~15단계 기본 잠금)
      const [unlockedStages, setUnlockedStages] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_unlocked_stages");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return {
          1: true, 2: true, 3: true,
          4: false, 5: false, 6: false, 7: false, 8: false,
          9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false
        };
      });

      const handleToggleStageLock = (stageNo) => {
        setUnlockedStages(prev => {
          const next = { ...prev, [stageNo]: !prev[stageNo] };
          try {
            localStorage.setItem("mindplay_unlocked_stages", JSON.stringify(next));
          } catch(e){}
          return next;
        });
        triggerConfetti();
      };

      // 1단계 단계별 페이지 전환 상태 (1: 고민 라디오 및 사연 작성, 2: 1:1 토닥토닥 마음 우체통)
      const [lesson1Page, setLesson1Page] = useState(1);

      // 2단계 조하리의 창 (Johari Window) 상태
      const partnerInfo = getMatchedPartner(studentId);
      const [mySelfStrengths, setMySelfStrengths] = useState([]); // 내가 생각하는 나의 강점 5개 (학생이 직접 선택)
      const [myAspirationalStrengths, setMyAspirationalStrengths] = useState([]); // 내가 갖고 싶은 잠재 강점 2개 (학생이 직접 선택)
      const [partnerGiftStrengths, setPartnerGiftStrengths] = useState([]); // 내가 짝꿍에게 선물할 강점 5개
      const [hasSentPartnerGift, setHasSentPartnerGift] = useState(false);
      
      // 친구가 나에게 선물해준 강점 (시뮬레이션 및 교차 검증)
      const [receivedFromPartnerStrengths, setReceivedFromPartnerStrengths] = useState(["친절/이타성", "끈기", "유머", "감사", "진실성"]);
      
      // 조하리의 창 계산:
      // 1. 열린 창: 나와 친구 모두 고른 강점
      const openArea = mySelfStrengths.filter(s => receivedFromPartnerStrengths.includes(s));
      // 2. 보이지 않는 창: 친구만 골라주고 나는 몰랐던 강점
      const blindArea = receivedFromPartnerStrengths.filter(s => !mySelfStrengths.includes(s));
      // 3. 숨겨진 창: 나만 고르고 친구는 모르는 강점
      const hiddenArea = mySelfStrengths.filter(s => !receivedFromPartnerStrengths.includes(s));
      // 4. 미지의 창: 내가 앞으로 갖고 싶은 잠재 강점
      const unknownArea = myAspirationalStrengths;

      // 4개 나다움 문장 카드 커스텀 텍스트
      const [johariSentences, setJohariSentences] = useState({
        open: "",
        blind: "",
        hidden: "",
        unknown: ""
      });

      // 감정일기 데이터 저장소 (각 단계별)
      const [diaries, setDiaries] = useState({
        1: { emotion: "happiness", title: "새 학년의 첫 시작, 긴장과 설렘", content: "처음 중학교 교실에 들어올 땐 단톡방 눈치도 보이고 어색했지만, 고민 주파수 라디오를 들으며 나만 그런 게 아니라는 걸 알게 되어 한결 편안해졌다.", date: "2026. 03. 05" },
        2: { emotion: "joy", title: "조하리의 창으로 발견한 숨은 보석", content: "친구가 나에게 '유머'와 '감사' 강점을 선물해 줬다. 내가 몰랐던 내 안의 따뜻한 빛을 발견해서 기뻤다.", date: "2026. 03. 12" },
        3: { emotion: "proud", title: "진짜 나다운 가면을 벗고", content: "남의 시선에 맞춘 착한 아이 가면 대신, 솔직하고 엉뚱한 내 본모습을 소개서에 당당히 적었다.", date: "2026. 03. 19" }
      });

      const [currentDiaryInput, setCurrentDiaryInput] = useState({
        title: "",
        content: ""
      });
      const [isSaved, setIsSaved] = useState(false);

            // 6대 고민 라디오 주파수 채널 정의
      const RADIO_CHANNELS = [
        { freq: 91.5, name: "외모/성장통", text: "🎧 [91.5 MHz 외모/성장 채널] \"키가 언제쯤 클까요? 여드름 때문에 아침마다 거울 보기가 겁나요...\"" },
        { freq: 95.0, name: "또래/교우", text: "🎧 [95.0 MHz 또래/교우 채널] \"친구들이랑 잘 지내고 싶은데 묘하게 어긋난 느낌이 들어요..교우관계 고민이 커요..\"" },
        { freq: 98.5, name: "성적/학업", text: "🎧 [98.5 MHz 학업스트레스 채널] \"수행평가와 시험공부를 열심히 했는데 결과가 안 나와서 속상해요...\"" },
        { freq: 102.0, name: "경제/소비", text: "🎧 [102.0 MHz 경제/소비 채널] \"온라인 게임 아이템을 사고 싶은데 용돈이 부족합니다.\"" },
        { freq: 105.5, name: "진로/꿈", text: "🎧 [105.5 MHz 진로/꿈 채널] \"친구들은 다 꿈이 뚜렷한 것 같은데 나만 아직 좋아하는 걸 못 찾은 것 같아요...\"" },
        { freq: 108.0, name: "가족/부모님", text: "🎧 [108.0 MHz 가족소통 채널] \"부모님이랑 사소한 일로 자꾸 부딪히고 잔소리를 들을 때마다 답답하고 죄송해요...\"" }
      ];

      // 1~15단계 전용 인터랙티브 상태 변수들
      const [radioFreq, setRadioFreq] = useState(98.5);
      const [radioHearts, setRadioHearts] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_radio_hearts");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return { 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 };
      });
      const [radioLikedChannels, setRadioLikedChannels] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_radio_liked");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return {};
      });
      const [isJohariTheoryOpen, setIsJohariTheoryOpen] = useState(false); // 조하리의 창 4개 창 이론 설명 아코디언 열림/닫힘
      const [isJohariUnlocked, setIsJohariUnlocked] = useState(() => {
        try {
          return localStorage.getItem("mindplay_johari_unlocked") === "true";
        } catch(e){ return false; }
      });
      const [isWorryDispatched, setIsWorryDispatched] = useState(false); // 교사 사연 배정 완료 상태 (비번 8888)
      const [essayDrafts, setEssayDrafts] = useState(() => {
        try {
          const s = localStorage.getItem("mindplay_essays");
          if (s) return JSON.parse(s);
        } catch(e){}
        return {};
      });
      const [essayEditLesson, setEssayEditLesson] = useState(1);
      const [isEssayEditing, setIsEssayEditing] = useState(false);
      const [essayEditContent, setEssayEditContent] = useState("");
      const [essayShiftContent, setEssayShiftContent] = useState({ first: "", found: "", core: "", learned: "" });
      const [essayKeyInsight, setEssayKeyInsight] = useState("");
      const [votedRadio, setVotedRadio] = useState(false);
      const [strengthBadges, setStrengthBadges] = useState([
        "묵묵한 경청 👂", "말없이 젤리 챙겨줌 🍬", "반 분위기 메이커 🌟", "약속 시간 칼지킴 ⏰",
        "정리정돈 마스터 🧹", "새로운 호기심 대장 🚀", "꾸준한 끈기력 🪵", "따뜻한 리액션 👏",
        "친구 이름 먼저 부르기 🙋", "남모르게 양보하기 🤝", "어색한 친구 말 걸어주기 💬", "약속 비밀 끝까지 지키기 🔐",
        "끝까지 포기 안 하기 🛡️", "주변 눈치 빠르게 챙기기 👀", "긍정 파워 불어넣기 🌈", "유머로 긴장 풀어주기 😄"
      ]);
      const [customBadgeInput, setCustomBadgeInput] = useState("");
      // 1단계 특별 미션 (토닥토닥 우체통) 펼침/모달 상태
      const [isLesson1SpecialMissionOpen, setIsLesson1SpecialMissionOpen] = useState(false);

      // 2단계 단계별 탭 상태 ("A": 나의 강점, "B": 짝꿍 강점 발견, "C": 조하리의 창 4개 영역, "D": 나다움 문장 완성)
      const [lesson2Step, setLesson2Step] = useState("A");

      // 3단계: 가드너 8대 다중지능 & Keirsey 4가지 기질 & 나다움 브랜딩 카드 상태
      const [lesson3Step, setLesson3Step] = useState(1); // 1: 안내/사전예상, 2: 56문항 다중지능검사, 3: 36문항 기질검사, 4: 종합분석/브랜딩카드, 5: 학급갤러리
      const [gardnerPredictedTop, setGardnerPredictedTop] = useState("대인관계");
      const [gardnerPredictedHope, setGardnerPredictedHope] = useState("자기이해");
      const [gardnerAnswers, setGardnerAnswers] = useState(() => {
        // 초기 기본값 (모든 문항 3점 보통이다)
        const init = {};
        for (let i = 1; i <= 56; i++) {
          init[i] = (i % 3 === 0) ? 4 : (i % 5 === 0) ? 5 : 3;
        }
        return init;
      });
      const [gardnerPage, setGardnerPage] = useState(0); // 0~6 (8문항씩 7페이지)

      // Keirsey 기질 검사 상태 (36문항 중 선택된 항목들의 id)
      const [keirseyPredicted, setKeirseyPredicted] = useState("NF");
      const [keirseyChecked, setKeirseyChecked] = useState([
        "NF_0", "NF_1", "NF_2", "NF_4", "NF_7", // NF 대표 5개 기본 선택
        "SJ_0", "SJ_2", "SJ_6",                 // SJ 3개
        "NT_0", "NT_3",                         // NT 2개
        "SP_0", "SP_4"                          // SP 2개
      ]);

      // 가드너 다중지능 점수 실시간 계산 (최소 7점 ~ 최대 35점)
      const gardnerScores = GARDNER_INTELLIGENCES.map(intel => {
        const total = intel.qNums.reduce((sum, qNum) => sum + (gardnerAnswers[qNum] || 3), 0);
        return { ...intel, score: total };
      }).sort((a, b) => b.score - a.score);

      const top1Intel = gardnerScores[0] || GARDNER_INTELLIGENCES[5];
      const top2Intel = gardnerScores[1] || GARDNER_INTELLIGENCES[0];

      // Keirsey 기질 실시간 점수 계산 (4대 기질별 체크 수)
      const keirseyCounts = {
        SJ: keirseyChecked.filter(k => k.startsWith("SJ")).length,
        SP: keirseyChecked.filter(k => k.startsWith("SP")).length,
        NT: keirseyChecked.filter(k => k.startsWith("NT")).length,
        NF: keirseyChecked.filter(k => k.startsWith("NF")).length
      };
      const sortedTemperaments = ["SJ", "SP", "NT", "NF"].sort((a, b) => keirseyCounts[b] - keirseyCounts[a]);
      const primaryTemperamentCode = sortedTemperaments[0] || "NF";
      const primaryTemperament = KEIRSEY_TEMPERAMENTS[primaryTemperamentCode];

      const [selectedIntelligences, setSelectedIntelligences] = useState(["대인관계", "음악"]); // 1, 2순위
      const [selectedTemperament, setSelectedTemperament] = useState("NF"); // SJ, SP, NT, NF
      const [lesson3HashTags, setLesson3HashTags] = useState(["#나를_응원하기", "#당당하게_나를_보여줄게", "#진짜_나다운_순간"]);
      const [customHashInput, setCustomHashInput] = useState("");
      const [maskBioNickname, setMaskBioNickname] = useState("따뜻한 공감의 NF 대인관계 조율사");
      const [maskCallMeWhen, setMaskCallMeWhen] = useState("친구들 사이에 오해가 생겼거나 마음속 깊은 고민을 털어놓고 싶을 때");
      const [maskSelfCheer, setMaskSelfCheer] = useState("남들의 시선에 흔들리지 않고 나의 공감력과 따뜻함을 믿고 당당하게 나아갈 거야!");
      const [lesson3Rating1, setLesson3Rating1] = useState(5);
      const [lesson3Rating2, setLesson3Rating2] = useState(5);
      const [classGalleryStamps, setClassGalleryStamps] = useState({
        "10301": { stamp: "멋진 재능이야! 🌟", count: 3 },
        "10305": { stamp: "완전 너다워 👍", count: 4 },
        "10315": { stamp: "다음에 꼭 도와줘 🤝", count: 5 }
      });

      // 4단계: 듀얼 마음 편지 (감사 한 컷 & 토닥토닥 미안함 회복 인사약 편지) 상태
      // 4단계: Step 0 감정 알아차리기 & 특별활동 듀얼 마음 편지 상태
      const [lesson4Step, setLesson4Step] = useState(0); // 0: 감정 알아차리기 (믹서기, 챗봇, 주크박스), 1~4: 특별활동 듀얼 마음 편지
      const [lesson4SubTab, setLesson4SubTab] = useState("mixer"); // "mixer", "chatbot", "jukebox"

      // ① 33종 믹서기 선택 감정들 (3~4개 선택 및 슬라이더 비율 0~100%)
      const [cocktailEmotions, setCocktailEmotions] = useState([
        { word: "서운함", percent: 71, color: "#F43F5E" },
        { word: "억울함", percent: 70, color: "#EF4444" },
        { word: "조급함", percent: 40, color: "#F97316" },
        { word: "무기력", percent: 25, color: "#64748B" }
      ]);

      // ② 공감 챗봇 마음이와의 2문장 핑퐁 대화
      const [chatbotEventInput, setChatbotEventInput] = useState("친구들이 모둠 과제 안 하고 폰만 보는데 나 혼자 다 제출했음");
      const [chatbotDesireInput, setChatbotDesireInput] = useState("역할을 공평하게 나눠서 같이 끝내고 싶었어");
      const [isChatbotStep2Open, setIsChatbotStep2Open] = useState(false);
      const [isChatbotPingPongDone, setIsChatbotPingPongDone] = useState(false);

      // ③ 우리 반 감정 치유 주크박스
      const [jukeboxTheme, setJukeboxTheme] = useState("화가 날 때");
      const [jukeboxArtist, setJukeboxArtist] = useState("DAY6 (데이식스)");
      const [jukeboxTitle, setJukeboxTitle] = useState("한 페이지가 될 수 있게");
      const [jukeboxUrl, setJukeboxUrl] = useState("https://youtu.be/vnS_NewSbU4");
      const [jukeboxComment, setJukeboxComment] = useState("이 노래의 신나는 밴드 사운드를 들으면 억울했던 마음이 시원하게 풀려요!");
      const [classJukeboxList, setClassJukeboxList] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_jukebox_list");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return [
          { id: "j1", author: "김하늘", theme: "화가 날 때", artist: "DAY6 (데이식스)", title: "한 페이지가 될 수 있게", url: "https://youtu.be/vnS_NewSbU4", comment: "신나는 드럼과 밴드 사운드로 억울함을 훌훌 털어내요! 🥁", likes: 8, liked: false },
          { id: "j2", author: "이도윤", theme: "고민·불안할 때", artist: "아이유", title: "Love wins all", url: "https://youtu.be/JleoAppaxi0", comment: "마음이 불안할 때 들으면 따뜻하게 안아주는 기분이에요 ✨", likes: 12, liked: true },
          { id: "j3", author: "권현규", theme: "외로울 때", artist: "악뮤 (AKMU)", title: "후라이의 꿈", url: "https://youtu.be/3kGAlp_PNUg", comment: "그냥 가만히 누워있고 싶을 때 위로가 되는 힐링곡 🍳", likes: 6, liked: false },
          { id: "j4", author: "김소율", theme: "기쁠 때", artist: "NewJeans", title: "Hype Boy", url: "https://youtu.be/11cta61Wi0g", comment: "기분 좋은 날 들으면 텐션이 2배로 올라가는 마법 🎈", likes: 15, liked: false }
        ];
      });

      // 똑똑똑 내 마음 두드리기 (성장 별점 Q1, Q2)
      const [lesson4Q1Rating, setLesson4Q1Rating] = useState(5);
      const [lesson4Q2Rating, setLesson4Q2Rating] = useState(5);

      const handleAddJukebox = (e) => {
        e.preventDefault();
        if (!jukeboxTitle.trim() || !jukeboxArtist.trim()) {
          alert("노래 제목과 가수명을 입력해 주세요!");
          return;
        }
        const newTrack = {
          id: `j_${Date.now()}_${studentId}`,
          author: studentName,
          theme: jukeboxTheme,
          artist: jukeboxArtist.trim(),
          title: jukeboxTitle.trim(),
          url: jukeboxUrl.trim() || "https://youtu.be/vnS_NewSbU4",
          comment: jukeboxComment.trim() || "마음을 편안하게 해주는 추천곡입니다 🎵",
          likes: 0,
          liked: false,
          registeredAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        const updated = [newTrack, ...classJukeboxList];
        setClassJukeboxList(updated);
        try { localStorage.setItem("mindplay_jukebox_list", JSON.stringify(updated)); } catch(e){}
        setJukeboxTitle("");
        setJukeboxArtist("");
        setJukeboxComment("");
        triggerConfetti();
        alert("🎉 우리 반 감정 치유 주크박스에 추천곡이 등록되었습니다! 🎶");
      };

      const handleToggleJukeboxLike = (id) => {
        setClassJukeboxList(prev => {
          const next = prev.map(t => t.id === id ? { ...t, likes: t.liked ? t.likes - 1 : t.likes + 1, liked: !t.liked } : t);
          try { localStorage.setItem("mindplay_jukebox_list", JSON.stringify(next)); } catch(e){}
          return next;
        });
      };
      const [lesson4TargetNickname, setLesson4TargetNickname] = useState("매점에서 빵 사준 착한 짝꿍");
      const [thanksReason, setThanksReason] = useState("체육 시간에 배구 서브 실패했을 때 괜찮다고 먼저 공 주워주고 다독여줬을 때");
      const [thanksBody, setThanksBody] = useState("네가 곁에서 웃으며 응원해 준 덕분에 위축되지 않고 끝까지 힘낼 수 있었어. 정말 고마워!");
      const [sorryAdmit, setSorryAdmit] = useState("내가 청소 당번 때 급하게 학원 간다고 너한테 쓰레기통 비우기 떠넘겼던 거, 내 잘못인 거 알아.");
      const [sorryPromise, setSorryPromise] = useState("다음 주 내내 네 몫까지 분리수거 솔선수범하고 약속 칼같이 지킬게!");
      const [lesson4Rating1, setLesson4Rating1] = useState(5);
      const [lesson4Rating2, setLesson4Rating2] = useState(5);
      const [isDualLetterSaved, setIsDualLetterSaved] = useState(false);

      const [equippedBadges, setEquippedBadges] = useState(["말없이 젤리 챙겨줌 🍬", "반 분위기 메이커 🌟"]);
      const [sentenceSelf, setSentenceSelf] = useState("친구 이야기 묵묵히 들어주기");
      const [sentenceJoy, setSentenceJoy] = useState("점심시간에 같이 보드게임할 때");
      const [mixer, setMixer] = useState({ 서운함: 40, 억울함: 20, 조급함: 30, 무기력: 10 });
      const [breathStep, setBreathStep] = useState("idle");
      const [mantraCustom, setMantraCustom] = useState("귀여운 내가 참자, 파도는 곧 지나간다!");
      const [isAbcdFlipped, setIsAbcdFlipped] = useState(false);
      const [sortedItems, setSortedItems] = useState({
        cannot: ["지난 시험 성적", "부모님의 잔소리"],
        can: ["오늘 공부하는 마음가짐", "친구에게 건네는 말"]
      });
      const [controlPledge, setControlPledge] = useState("내가 바꿀 수 있는 오늘 10분 복습에 집중하자!");
      const [slotResult, setSlotResult] = useState("늦잠 지각 ➔ 늦은 밤 스마트폰 습관을 고칠 기회니까 오히려 좋아! 🍀");
      const [stampedDiff, setStampedDiff] = useState(false);
      const [selectedEmpathyChat, setSelectedEmpathyChat] = useState("부모님이 반대하셔서 진짜 답답하고 속상했겠다. 네 진심을 어떻게 전할지 같이 고민해 볼까?");
      const [rollingNotes, setRollingNotes] = useState([
        { from: "민우", text: "15주 동안 묵묵히 내 이야기 들어줘서 고마웠어!", stamp: "❤️" },
        { from: "지우", text: "타워 쌓을 때 심호흡하자고 해준 덕분에 살았음 최고!", stamp: "🏆" }
      ]);

      // 1단계 고민주파수 학급 실시간 공유 및 공감 상태
      const [customWorryText, setCustomWorryText] = useState("");
      const [customWorryCategory, setCustomWorryCategory] = useState("또래/교우");
      // 예시 사연 3개 (명확히 '고민 사연 예시'로 라벨링)
      const DUMMY_EXAMPLE_WORRIES = [
        { id: "dummy_1", author: "사연 예시 ①", freq: "95.0 MHz", category: "또래/교우", content: "친구들이랑 잘 지내고 싶은데 묘하게 어긋난 느낌이 들어요..교우관계 고민이 커요..", likes: 3, liked: false, isExample: true },
        { id: "dummy_2", author: "사연 예시 ②", freq: "98.5 MHz", category: "성적/학업", content: "초등학교 때보다 수행평가가 너무 많아서 매일 밤샘하는데 집중이 잘 안 돼요...", likes: 2, liked: false, isExample: true },
        { id: "dummy_3", author: "사연 예시 ③", freq: "102.0 MHz", category: "또래/교우", content: "짝꿍이랑 어색해서 지우개 빌려달라는 말도 10분 동안 망설이다가 결국 못 빌렸어요.", likes: 4, liked: false, isExample: true }
      ];
      const [studentRealWorries, setStudentRealWorries] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_real_worries");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return [];
      });

      // 챗봇 커스텀 이름 및 7단계 대화 엔진 상태
      const [chatbotName, setChatbotName] = useState(() => {
        return localStorage.getItem("mindplay_bot_name") || "";
      });
      const [chatbotNameInput, setChatbotNameInput] = useState("");
      const [isBotNameLocked, setIsBotNameLocked] = useState(() => {
        return !!localStorage.getItem("mindplay_bot_name");
      });
      const [chatStep, setChatStep] = useState(1); // 1~7단계 대화 상태 머신
      const [selectedEmotionChip, setSelectedEmotionChip] = useState("");
      const [selectedDesireChip, setSelectedDesireChip] = useState("");
      const [selectedQuickChips, setSelectedQuickChips] = useState([]); // 다중 선택 가능한 감정/욕구 칩 목록
      const [diaryAiPromptText, setDiaryAiPromptText] = useState("");
      const [diaryArtStyle, setDiaryArtStyle] = useState("따뜻한 파스텔 수채화 일러스트");
      const [currentDiaryImage, setCurrentDiaryImage] = useState(""); // 사용자가 직접 첨부/붙여넣기/생성한 그림일기 이미지 DataURL
      const [isGardnerTheoryOpen, setIsGardnerTheoryOpen] = useState(false);

      const [chatMessages, setChatMessages] = useState(() => {
        const savedName = localStorage.getItem("mindplay_bot_name") || "마음친구";
        return [
          {
            sender: "bot",
            text: `안녕, ${studentName || "친구"}야! 나는 너의 감정 탐색을 함께할 **'${savedName}'**(이)야 🌸\n오늘 하루 몸의 감각이나 마음의 기분은 어때? 가슴이 답답하거나 서운했거나, 혹은 뿌듯하고 편안했니? 지금 느껴지는 마음에 가장 가까운 단어를 아래에서 고르거나 편하게 말해줘!`
          }
        ];
      });
      const [chatInput, setChatInput] = useState("");

      const handleConfirmBotName = () => {
        if (!chatbotNameInput.trim()) return;
        const name = chatbotNameInput.trim();
        setChatbotName(name);
        setIsBotNameLocked(true);
        try {
          localStorage.setItem("mindplay_bot_name", name);
        } catch(e){}
        setChatMessages([
          {
            sender: "bot",
            text: `반가워! 내 이름을 **'${name}'**(으)로 지어줘서 정말 고마워 ✨ 앞으로 네 마음속 이야기를 언제든 편하게 털어놓아 줘.\n\n오늘 하루 몸의 컨디션이나 마음의 기분은 어땠니? 아래 감정 단어를 누르거나 이야기해 줘!`
          }
        ]);
        triggerConfetti();
      };

      const handleSendChat = (customText) => {
        const msgToSend = typeof customText === "string" ? customText : chatInput;
        if (!msgToSend || !msgToSend.trim()) return;
        const userMsg = msgToSend.trim();
        const nextMessages = [...chatMessages, { sender: "user", text: userMsg }];
        setChatMessages(nextMessages);
        if (!customText) setChatInput("");

        const botDisplayName = chatbotName || "마음친구";

        setTimeout(() => {
          let botReply = "";
          let nextStep = chatStep;

          if (chatStep === 1) {
            setSelectedEmotionChip(userMsg);
            botReply = `‘${userMsg}’(이)라는 마음이 먼저 스쳐 지나갔구나. 마음을 알아차려 준 것만으로도 대단해.\n그때 구체적으로 어떤 상황이나 일이 있었니? 누구와 있었거나 어떤 말을 들었는지, 비난 없이 그때의 장면을 차분히 들려줄래?`;
            nextStep = 2;
          } else if (chatStep === 2) {
            botReply = `그런 일이 있었구나. 네 이야기를 들으니 그 상황에서 마음이 많이 복잡했겠어.\n그 순간 네 마음속에선 사실 어떤 게 가장 간절했을까? 인정받고 싶었니, 존중받고 싶었니, 아니면 편안하게 쉬고 싶었니?`;
            nextStep = 3;
          } else if (chatStep === 3) {
            setSelectedDesireChip(userMsg);
            botReply = `맞아, 너에게는 '${userMsg}'(이)라는 마음이 정말 소중하고 당연했던 거야.\n그 상황에서 속으로 삼켰거나 꼭 하고 싶었던 말이 있다면, 나에게는 편하게 전부 털어놓아 볼래? 어떤 말이든 다 들어줄게.`;
            nextStep = 4;
          } else if (chatStep === 4) {
            botReply = `마음속 깊은 이야기를 솔직하게 꺼내줘서 고마워. 속에만 담아두느라 참 무거웠을 텐데 잘 털어놓았어.\n잠시 어깨의 힘을 툭 빼고 숨을 깊게 들이마시고 천천히 내쉬어보자 🌿 "그럴 수도 있지, 오늘 하루도 애썼어"라고 너 자신을 따뜻하게 토닥여줄까?`;
            nextStep = 5;
          } else if (chatStep === 5) {
            botReply = `호흡을 가다듬으니 마음이 한결 가벼워졌길 바라.\n오늘의 대화를 돌아보면, 겉으로는 힘든 순간이 있었지만 그 이면에는 **너의 소중한 가치와 마음**이 담겨 있었어. 이 경험을 통해 나에게 해주고 싶은 깨달음이나 다짐이 있니?`;
            nextStep = 6;
          } else {
            botReply = `오늘 너와 솔직하게 나눈 이 대화는 정말 소중한 너만의 보물이야 ✨\n이제 이 따뜻한 마음과 솔직한 생각을 바탕으로, 아래 **'일기 작성하기'** 란에 너만의 감정일기를 기록해 볼까? 내가 옆에서 계속 함께할게!`;
            nextStep = 7;
            setDiaryAiPromptText(`오늘의 감정: ${selectedEmotionChip || '성찰'}, 숨은 욕구: ${selectedDesireChip || '존중과 위로'}를 담아낸 따뜻한 힐링 아트`);
          }

          setChatStep(nextStep);
          setChatMessages([...nextMessages, { sender: "bot", text: botReply }]);
          triggerConfetti();
        }, 600);
      };

      // 마음에세이 AI 변환 생성 엔진 (감정일기 + 챗봇 대화 + 학생 성찰 연동)
      const handleGenerateEssay = (targetLesson = currentLesson) => {
        const d = diaries[targetLesson] || { title: `${targetLesson}단계 활동 성찰`, content: "" };
        const botName = chatbotName || "마음친구";
        const emo = EMOTION_CHARACTERS.find(e => e.id === selectedEmotionId) || EMOTION_CHARACTERS[0];
        
        // 챗봇 대화에서 사용자가 발화한 텍스트 추출
        const userChatLogs = chatMessages.filter(m => m.sender === "user").map(m => m.text);
        const situationText = userChatLogs[1] || d.content || "오늘 하루 학교에서 여러 일들을 겪으며 마음이 분주했던 순간이 있었다.";
        const rawEmotion = selectedEmotionChip || userChatLogs[0] || emo.name;
        const desireText = selectedDesireChip || userChatLogs[2] || "친구들과 편안하게 소통하고 스스로를 인정받고 싶은 마음";
        const honestThought = userChatLogs[3] || "겉으로는 아무렇지 않은 척 웃어넘겼지만 속으로는 서운함과 긴장이 맴돌았다.";
        const reflectionThought = userChatLogs[5] || userChatLogs[4] || "모든 걸 완벽하게 해내지 않아도, 내 마음의 소리에 귀 기울여주는 것만으로도 충분히 괜찮다는 생각이 들었다.";

        // 1. 1인칭 자기성찰 에세이 (700~1,000자 서사적 흐름)
        const generatedEssay = `오늘 하루를 시작할 때만 해도 내 마음속에는 '${rawEmotion}'이라는 감정이 짙게 자리 잡고 있었다. 교실 문을 열고 친구들과 인사를 나누면서도 어딘가 모르게 가슴 한구석이 묵직하고 복잡한 기분이 들었다.

구체적으로 돌아보면, ${situationText} 순간에 유독 감정이 크게 흔들렸다. 처음에는 그저 상황에 대한 즉각적인 반응으로 당황스럽거나 답답하다고만 느꼈다. '왜 이런 일이 생겼을까', '나만 왜 이렇게 예민하게 반응할까' 하며 스스로를 탓하거나 상황을 애써 외면하고 싶었던 것도 사실이다.

하지만 나의 마음 탐색 친구인 '${botName}'와 차분히 대화를 나누며 내 마음의 깊은 층위를 한 꺼풀씩 들여다보게 되었다. 챗봇이 던져준 "그 순간 네 마음에선 사실 어떤 게 가장 간절했을까?"라는 질문을 마주했을 때, 비로소 겉으로 드러난 감정 뒤에 숨겨져 있던 진짜 나의 바람을 발견할 수 있었다. 내가 그토록 바랐던 것은 바로 '${desireText}'이었다.

마음속으로 꾹꾹 삼켜두었던 이야기("${honestThought}")를 솔직하게 털어놓고 깊은 숨을 들이마시자, 나를 짓누르던 무거운 긴장감이 조금씩 흩어지는 것이 느껴졌다. 예전 같았으면 부정적인 감정이 올라올 때 무조건 억누르거나 자책했겠지만, 이제는 안다. 어떤 감정이든 그 이면에는 나를 지키고 더 나은 방향으로 나아가고자 하는 소중한 가치가 담겨 있다는 것을.

${reflectionThought} 앞으로도 예상치 못한 감정의 파도가 밀려올 때마다, 성급하게 나를 다그치기보다 한 걸음 물러서서 내 안의 소중한 마음에 따뜻한 시선을 건네줄 것이다.`;

        // 2. 나의 감정 변화 4요소
        const shift = {
          first: `${rawEmotion} (불안하거나 답답하게 굳어있던 마음)`,
          found: `${desireText} (대화를 통해 발견한 진짜 나의 욕구와 소중한 가치)`,
          core: `${emo.name} & 자기이해 (스스로를 탓하지 않고 온전히 인정해 준 마음)`,
          learned: `부정적인 감정도 나를 지키려는 신호이며, 내 마음을 차분히 알아차릴 때 스스로를 회복할 수 있다는 점`
        };

        // 3. 나를 이해하게 된 한 문장
        const insight = `어떤 감정이 찾아와도 두려워하지 않고, 내 안의 진실한 목소리를 다정하게 안아줄 수 있게 되었다.`;

        const newDraft = {
          essay: generatedEssay,
          emotionalShift: shift,
          keyInsight: insight,
          updatedAt: new Date().toLocaleDateString('ko-KR')
        };

        setEssayDrafts(prev => {
          const next = { ...prev, [targetLesson]: newDraft };
          try {
            localStorage.setItem("mindplay_essays", JSON.stringify(next));
          } catch(e){}
          return next;
        });

        setEssayEditLesson(targetLesson);
        setEssayEditContent(generatedEssay);
        setEssayShiftContent(shift);
        setEssayKeyInsight(insight);
        setIsEssayEditing(false);
        triggerConfetti();
      };

      const handleSaveCustomEssay = () => {
        const updated = {
          essay: essayEditContent,
          emotionalShift: essayShiftContent,
          keyInsight: essayKeyInsight,
          updatedAt: new Date().toLocaleDateString('ko-KR')
        };
        setEssayDrafts(prev => {
          const next = { ...prev, [essayEditLesson]: updated };
          try {
            localStorage.setItem("mindplay_essays", JSON.stringify(next));
          } catch(e){}
          return next;
        });
        setIsEssayEditing(false);
        triggerConfetti();
        alert("🎉 마음에세이가 안전하게 저장되었습니다!");
      };

      const handleAddCustomWorry = (e) => {
        e.preventDefault();
        if (!customWorryText.trim()) return;
        const newWorry = {
          id: `worry_${Date.now()}_${studentId}`,
          studentId: studentId,
          author: `${studentName} (${studentId})`,
          freq: `${radioFreq} MHz`,
          category: customWorryCategory,
          content: customWorryText.trim(),
          likes: 0,
          liked: false,
          submittedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        const updated = [newWorry, ...studentRealWorries.filter(w => w.studentId !== studentId)];
        setStudentRealWorries(updated);
        try {
          localStorage.setItem("mindplay_real_worries", JSON.stringify(updated));
        } catch(err){}
        setCustomWorryText("");
        triggerConfetti();
        alert("고민 사연이 성공적으로 등록되었습니다! 교사 배정 완료 후 2단계 마음 우체통에서 친구의 사연을 확인할 수 있습니다 💌");
      };

      const handleTeacherDispatchWorries = () => {
        const pw = prompt("교사 비밀번호를 입력해주세요:");
        if (pw === "8888") {
          setIsWorryDispatched(true);
          try {
            localStorage.setItem("mindplay_worry_dispatched", "true");
          } catch(e){}
          triggerConfetti();
          alert("🎉 모든 학생의 사연이 1:1로 겹치지 않게 무작위 배정되었습니다! 이제 학생들이 2단계 토닥토닥 마음 우체통에서 친구 사연을 확인하고 위로를 전할 수 있습니다.");
        } else if (pw !== null) {
          alert("비밀번호가 일치하지 않습니다.");
        }
      };

      const handleTeacherUnlockJohari = () => {
        const pw = prompt("교사 비밀번호를 입력해주세요:");
        if (pw === "8888") {
          setIsJohariUnlocked(true);
          try {
            localStorage.setItem("mindplay_johari_unlocked", "true");
          } catch(e){}
          triggerConfetti();
          alert("🎉 조하리의 창 Step C(4개의 창 분석)가 전체 학생에게 성공적으로 공개되었습니다!");
        } else if (pw !== null) {
          alert("비밀번호가 일치하지 않습니다.");
        }
      };

      const handleResetWorrySession = () => {
        if (confirm("정말로 모든 사연과 배정 상태를 초기화하시겠습니까? (테스트 시 유용)")) {
          setStudentRealWorries([]);
          setIsWorryDispatched(false);
          setHasSentComfort(false);
          try {
            localStorage.removeItem("mindplay_real_worries");
            localStorage.removeItem("mindplay_worry_dispatched");
          } catch(e){}
          alert("고민 사연 및 배정 상태가 초기화되었습니다.");
        }
      };

      const handleToggleLikeWorry = (id) => {
        setStudentRealWorries(prev => {
          const next = prev.map(w => {
            if (w.id === id) {
              return {
                ...w,
                likes: w.liked ? w.likes - 1 : w.likes + 1,
                liked: !w.liked
              };
            }
            return w;
          });
          try { localStorage.setItem("mindplay_real_worries", JSON.stringify(next)); } catch(e){}
          return next;
        });
      };

      // 1단계 익명 토닥토닥 마음 우체통 1:1 순환 배정 계산
      const getAssignedWorryForMe = () => {
        if (studentRealWorries.length >= 2) {
          const myIdx = studentRealWorries.findIndex(w => w.studentId === studentId);
          if (myIdx !== -1) {
            const partnerWorryIdx = (myIdx + 1) % studentRealWorries.length;
            const pw = studentRealWorries[partnerWorryIdx];
            return {
              id: pw.id,
              senderTag: "익명 친구의 고민 엽서",
              category: pw.category,
              content: pw.content,
              isReal: true
            };
          }
          const otherWorries = studentRealWorries.filter(w => w.studentId !== studentId);
          if (otherWorries.length > 0) {
            const pw = otherWorries[0];
            return {
              id: pw.id,
              senderTag: "익명 친구의 고민 엽서",
              category: pw.category,
              content: pw.content,
              isReal: true
            };
          }
        }
        // Fallback demo matching
        if (studentId === "10101") {
          return {
            id: "worry_10102_demo",
            senderTag: "익명 친구 (이도윤)",
            category: "또래/교우",
            content: "새 학년 짝꿍이랑 아직 한마디도 못 해봤는데 어떻게 말을 걸어야 할지 모르겠어요... 먼저 말 걸었다가 어색해질까 봐 걱정돼요.",
            isReal: false
          };
        } else if (studentId === "10102") {
          return {
            id: "worry_10101_demo",
            senderTag: "익명 친구 (김하늘)",
            category: "또래/교우",
            content: "친구들이랑 잘 지내고 싶은데 묘하게 어긋난 느낌이 들어요..교우관계 고민이 커요..",
            isReal: false
          };
        }
        return {
          id: "worry_match_default",
          senderTag: "초록반 친구의 고민 엽서",
          category: "교우/새 학기",
          content: "새 학기 시작하고 반에 아는 친구가 별로 없어서 쉬는 시간마다 엎드려 자는 척해요... 먼저 친해지고 싶은데 거절당할까 봐 망설여져요.",
          isReal: false
        };
      };

      const activeAssignedWorry = getAssignedWorryForMe();
      const [comfortStep1, setComfortStep1] = useState("");
      const [comfortStep2, setComfortStep2] = useState("");
      const [comfortStep3, setComfortStep3] = useState("");
      const [selectedStickers, setSelectedStickers] = useState([]);
      const [hasSentComfort, setHasSentComfort] = useState(false);
      const [comfortLetterSentTime, setComfortLetterSentTime] = useState(null);

      // 내가 받은 위로 엽서 상태 및 답장 모달
      const [receivedComfortPostcard, setReceivedComfortPostcard] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_received_comfort");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return null;
      });
      const [isComfortModalOpen, setIsComfortModalOpen] = useState(false);
      const [isPostcardFlipped, setIsPostcardFlipped] = useState(false);

      const hasReceivedComfortLetter = !!receivedComfortPostcard || isTeacherMode;

      const COMFORT_STICKER_OPTIONS = [
        "넌 충분히 잘하고 있어! 🌟",
        "천천히 해도 괜찮아 🌿",
        "네 편이 되어줄게 🤝",
        "혼자가 아니야 🎈",
        "토닥토닥 힘내자 💖",
        "너의 용기를 응원해 🚀"
      ];

      const handleAddSticker = (sticker) => {
        if (selectedStickers.includes(sticker)) {
          setSelectedStickers(selectedStickers.filter(s => s !== sticker));
        } else {
          if (selectedStickers.length < 3) {
            setSelectedStickers([...selectedStickers, sticker]);
          }
        }
      };

      const handleSendComfortLetter = (e) => {
        e.preventDefault();
        if (!comfortStep1.trim() || !comfortStep2.trim() || !comfortStep3.trim()) {
          alert("3단계 위로 가이드를 모두 성실하게 작성해 주세요! 친구에게 큰 힘이 됩니다 💌");
          return;
        }
        setHasSentComfort(true);
        setComfortLetterSentTime(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
        triggerConfetti();
      };

      const handleToggleThankYou = () => {
        setReceivedComfortPostcard(prev => ({
          ...prev,
          thankCount: prev.thanked ? prev.thankCount - 1 : prev.thankCount + 1,
          thanked: !prev.thanked
        }));
        triggerConfetti();
      };

      const handleToggleRadioHeart = (freq) => {
        const isLiked = !!radioLikedChannels[freq];
        if (isLiked) {
          alert("이미 이 사연에 공감 하트를 보냈습니다! ❤️ (사연마다 1회씩만 참여 가능합니다)");
          return;
        }
        setRadioHearts(prev => {
          const next = { ...prev, [freq]: (prev[freq] || 0) + 1 };
          try { localStorage.setItem("mindplay_radio_hearts", JSON.stringify(next)); } catch(e){}
          return next;
        });
        setRadioLikedChannels(prev => {
          const next = { ...prev, [freq]: true };
          try { localStorage.setItem("mindplay_radio_liked", JSON.stringify(next)); } catch(e){}
          return next;
        });
        triggerConfetti();
      };

      const handleTeacherResetRadioHearts = () => {
        if (confirm("우리 반 6대 고민 주파수 라디오 공감 하트 수를 모두 0회로 초기화하시겠습니까?")) {
          const initHearts = { 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 };
          setRadioHearts(initHearts);
          setRadioLikedChannels({});
          try {
            localStorage.removeItem("mindplay_radio_hearts");
            localStorage.removeItem("mindplay_radio_liked");
          } catch(e){}
          triggerConfetti();
          alert("라디오 사연 공감 하트 수가 0회로 초기화되었습니다.");
        }
      };

      // 각 활동별 교사용/테스트용 초기화 함수
      const handleResetCurrentActivity = (lessonNo) => {
        if (!confirm(`${lessonNo}단계 활동 데이터를 초기화하시겠습니까? (테스트 시 유용)`)) return;
        if (lessonNo === 1) {
          setStudentRealWorries([]);
          setIsWorryDispatched(false);
          setHasSentComfort(false);
          setComfortStep1("");
          setComfortStep2("");
          setComfortStep3("");
          setSelectedStickers([]);
          setRadioHearts({ 91.5: 0, 95.0: 0, 98.5: 0, 102.0: 0, 105.5: 0, 108.0: 0 });
          setRadioLikedChannels({});
          try {
            localStorage.removeItem("mindplay_real_worries");
            localStorage.removeItem("mindplay_worry_dispatched");
            localStorage.removeItem("mindplay_radio_hearts");
            localStorage.removeItem("mindplay_radio_liked");
          } catch(e){}
        } else if (lessonNo === 2) {
          setMySelfStrengths([]);
          setMyAspirationalStrengths([]);
          setPartnerGiftStrengths([]);
          setHasSentPartnerGift(false);
          setIsJohariUnlocked(false);
          setLesson2Step("A");
          try {
            localStorage.removeItem("mindplay_johari_unlocked");
          } catch(e){}
        } else if (lessonNo === 3) {
          const initAnswers = {};
          for (let i = 1; i <= 56; i++) initAnswers[i] = 3;
          setGardnerAnswers(initAnswers);
          setGardnerPage(0);
          setKeirseyChecked(["NF_0", "NF_1", "NF_2", "NF_4", "NF_7"]);
          setMaskBioNickname("따뜻한 공감의 NF 대인관계 조율사");
          setSentenceSelf("");
          setSentenceJoy("");
          setMaskCallMeWhen("");
          setMaskSelfCheer("");
          setLesson3Step(1);
        } else if (lessonNo === 4) {
          setThanksReason("");
          setThanksBody("");
          setSorryAdmit("");
          setSorryPromise("");
          setIsDualLetterSaved(false);
          setLesson4Step(1);
        } else if (lessonNo === 5) {
          setEquippedBadges([]);
        } else if (lessonNo === 6) {
          setSentenceSelf("");
          setSentenceJoy("");
        } else if (lessonNo === 7) {
          setMixer({ 서운함: 25, 억울함: 25, 조급함: 25, 무기력: 25 });
        } else if (lessonNo === 8) {
          setMantraCustom("귀여운 내가 참자, 파도는 곧 지나간다!");
        } else if (lessonNo === 9) {
          setIsAbcdFlipped(false);
        } else if (lessonNo === 10) {
          setSortedItems({ cannot: [], can: [] });
          setControlPledge("");
        } else if (lessonNo === 11) {
          setSlotResult("");
        } else if (lessonNo === 12) {
          setStampedDiff(false);
        } else if (lessonNo === 13) {
          setSelectedEmpathyChat("");
        } else if (lessonNo === 14) {
          setRollingNotes([]);
        } else if (lessonNo === 15) {
          // 타임캡슐 초기화
        }
        setCurrentDiaryImage("");
        triggerConfetti();
        alert(`${lessonNo}단계 활동 데이터가 깔끔하게 초기화되었습니다! ✨`);
      };

      const activeDiaryLesson = selectedDiaryLesson || currentLesson || 1;
      const handleSaveDiary = () => {
        const targetLessonNo = selectedDiaryLesson || currentLesson || 1;
        setDiaries(prev => ({
          ...prev,
          [targetLessonNo]: {
            emotion: selectedEmotionId,
            title: currentDiaryInput.title || `${targetLessonNo}회차 나의 마음 이야기`,
            content: currentDiaryInput.content || "오늘 하루도 내 감정을 온전히 마주하고 따뜻하게 안아주었습니다.",
            image: currentDiaryImage || "",
            date: new Date().toLocaleDateString('ko-KR')
          }
        }));
        setIsSaved(true);
        triggerConfetti();
        setTimeout(() => setIsSaved(false), 3000);
      };

      const curLessonData = CURRICULUM.find(c => c.no === currentLesson) || CURRICULUM[0];
      const selectedEmotionObj = EMOTION_CHARACTERS.find(e => e.id === selectedEmotionId) || EMOTION_CHARACTERS[0];

      return (
        <div className="min-h-screen flex flex-col justify-between">
          {/* Main Top Navigation Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm no-print">
            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              {/* Logo (Clicking opens Home) */}
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => setCurrentTab("home")}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
                  🌸
                </div>
                <div>
                  <h1 className="text-2xl font-title font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                    마음플레이
                    <span className="text-xs font-dodum font-normal text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      15단계 마음성장
                    </span>
                  </h1>
                </div>
              </div>

                            {/* Navigation Tabs */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab("home")}
                  className={`px-4 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${currentTab === "home" ? "bg-gray-900 text-white shadow-md scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  🏠 홈
                </button>

                {/* 첫 화면(홈)에서는 홈 버튼과 이름만 보이고, 다른 탭으로 이동했을 때만 상세 탭들 노출 */}
                {currentTab !== "home" && (
                  <>
                    <button
                      type="button"
                      onClick={() => { setSelectedDiaryLesson(null); setCurrentTab("diary"); }}
                      className={`px-4 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${currentTab === "diary" ? "bg-rose-600 text-white shadow-md scale-105" : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"}`}
                    >
                      📝 감정일기
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCurrentLesson(null); setCurrentTab("activity"); }}
                      className={`px-4 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${currentTab === "activity" ? "bg-emerald-800 text-white shadow-md scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      🎯 마음활동
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentTab("mypage")}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${currentTab === "mypage" ? "bg-amber-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      🗂️ 마이페이지
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentTab("print")}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${currentTab === "print" ? "bg-purple-700 text-white shadow-md scale-105" : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"}`}
                    >
                      📖 마음에세이
                    </button>
                    {(isTeacherMode || currentUser.studentId === "00000") && (
                      <button
                        type="button"
                        onClick={() => setCurrentTab("teacher")}
                        className={`px-3.5 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${currentTab === "teacher" ? "bg-indigo-700 text-white shadow-md scale-105" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"}`}
                      >
                        📊 교사용 대시보드
                      </button>
                    )}
                  </>
                )}

                {/* 사용자 정보 칩 / 클릭 시 학번 변경 */}
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-300 rounded-2xl text-xs font-dodum font-bold text-emerald-900 transition flex items-center gap-1.5 shadow-2xs"
                  title="클릭하여 다른 학번 또는 교사용으로 로그인"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{currentUser.studentId} {currentUser.name}</span>
                  <span className="text-[10px] text-emerald-700 bg-white px-1.5 py-0.5 rounded-full border border-emerald-200">변경</span>
                </button>
              </div>
            </div>
          </header>

          {/* 무가입 학번-이름 다이렉트 로그인 모달 */}
          {isLoginModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-fadeIn border-2 border-emerald-200">
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold"
                >
                  ✕
                </button>

                <div className="text-center space-y-1">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-dodum font-bold">
                    🏫 1학년 3반 마음플레이 입장
                  </span>
                  <h3 className="text-2xl font-title font-bold text-gray-900 pt-1">
                    학번 5자리를 입력해 주세요
                  </h3>
                  <p className="text-xs font-batang text-gray-500">
                    10301~10326 중 자신의 학번을 입력하세요.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-dodum font-bold text-gray-700 block">
                      학번 5자리
                    </label>
                    <input
                      type="text"
                      maxLength="5"
                      autoFocus
                      value={loginInputId}
                      onChange={(e) => setLoginInputId(e.target.value)}
                      placeholder="자신의 학번 5자리 입력 (예: 10315)"
                      className="w-full p-3.5 bg-gray-50 rounded-2xl border-2 border-emerald-300 font-mono text-center text-xl font-bold text-emerald-950 tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* 교사용 비밀번호 입력창 (학번이 00000일 때 자동 노출) */}
                  {loginInputId.trim() === "00000" && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="text-xs font-dodum font-bold text-indigo-700 block flex items-center justify-between">
                        <span>🔒 교사용 비밀번호</span>
                      </label>
                      <input
                        type="password"
                        maxLength="10"
                        value={loginInputPw}
                        onChange={(e) => setLoginInputPw(e.target.value)}
                        placeholder="교사 비밀번호 입력"
                        className="w-full p-3.5 bg-indigo-50/50 rounded-2xl border-2 border-indigo-300 font-mono text-center text-xl font-bold text-indigo-950 tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      />
                    </div>
                  )}

                  {/* 학생 비밀번호 입력창 (00000이 아닐 때) */}
                  {loginInputId.trim() !== "00000" && loginInputId.trim().length >= 4 && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="text-xs font-dodum font-bold text-emerald-800 block flex items-center justify-between">
                        <span>🔑 비밀번호</span>
                      </label>
                      <input
                        type="password"
                        maxLength="10"
                        value={loginInputPw}
                        onChange={(e) => setLoginInputPw(e.target.value)}
                        placeholder="비밀번호 입력"
                        className="w-full p-3.5 bg-emerald-50/50 rounded-2xl border-2 border-emerald-400 font-mono text-center text-xl font-bold text-emerald-950 tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                      />
                    </div>
                  )}

                  {/* 실시간 감지된 사용자/학생 표시 */}
                  {detectedStudent && (
                    <div className={`p-3 rounded-2xl border text-center animate-fadeIn space-y-0.5 ${detectedStudent.isTeacher ? "bg-indigo-50 border-indigo-200" : "bg-emerald-50 border-emerald-200"}`}>
                      <span className={`text-xs font-batang ${detectedStudent.isTeacher ? "text-indigo-800" : "text-emerald-800"}`}>
                        {detectedStudent.isTeacher ? "교사용 관리 모드 감지!" : "반가워요!"}
                      </span>
                      <div className={`text-base font-title font-bold ${detectedStudent.isTeacher ? "text-indigo-950" : "text-emerald-900"}`}>
                        🌸 {detectedStudent.studentId} <span className="underline decoration-wavy decoration-emerald-500">{detectedStudent.name}</span>
                        {detectedStudent.isDemo && <span className="ml-1.5 text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">체험 계정</span>}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-3.5 text-white rounded-2xl font-dodum font-bold text-sm shadow-md transition hover:scale-[1.02] flex items-center justify-center gap-2 ${loginInputId.trim() === "00000" ? "bg-indigo-700 hover:bg-indigo-800" : "bg-emerald-800 hover:bg-emerald-900"}`}
                  >
                    <span>{loginInputId.trim() === "00000" ? "📊" : "🚀"}</span>
                    <span>{loginInputId.trim() === "00000" ? "교사용 대시보드 입장하기" : "마음플레이 바로 시작하기"}</span>
                  </button>
                </form>

                  
              </div>
            </div>
          )}

          {/* MAIN CONTAINER */}
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">

            {/* TAB 0: HOME MAIN (4개 대형 메인 메뉴 카드) */}
            {currentTab === "home" && (
              <div className="space-y-8 animate-fadeIn">
                {/* 웰컴 대형 히어로 배너 */}
                <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-600 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                      🌸 1학년 3반 사회정서학습(SEL) 마음플레이
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-title font-bold leading-tight">
                    {studentName} 학생, 반가워요! ✨<br/>
                    오늘 어떤 마음을 탐색하고 싶나요?
                  </h2>
                  <p className="font-batang text-sm sm:text-base text-rose-100 max-w-2xl leading-relaxed">
                    아래 4가지 활동 메뉴를 선택해 감정일기를 작성하거나 15단계 마음 성장 퀘스트에 참여해 보세요.
                  </p>
                </div>

                {/* 4대 대형 메인 카드 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 1. 감정일기 쓰기 */}
                  <div
                    onClick={() => { setSelectedDiaryLesson(null); setCurrentTab("diary"); }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-100/70 border-2 border-rose-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                        📝
                      </div>
                      <div>
                        <span className="text-xs font-dodum font-bold text-rose-600 bg-white px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
                          오늘 하루 마음 기록
                        </span>
                        <h3 className="text-2xl font-title font-bold text-gray-900 mt-2 group-hover:text-rose-600 transition-colors">
                          감정일기 쓰기
                        </h3>
                        <p className="text-xs sm:text-sm font-batang text-gray-600 mt-1.5 leading-relaxed">
                          AI 챗봇과 대화하며 내 안의 솔직한 감정과 숨은 욕구를 찾아 한 장의 그림일기로 완성해요.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-rose-200/60 text-xs font-dodum font-bold text-rose-700">
                      <span>바로가기</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </div>

                  {/* 2. 1~15단계 마음활동 */}
                  <div
                    onClick={() => { setCurrentLesson(null); setCurrentTab("activity"); }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100/70 border-2 border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                        🎯
                      </div>
                      <div>
                        <span className="text-xs font-dodum font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                          단계별 마음 성장
                        </span>
                        <h3 className="text-2xl font-title font-bold text-gray-900 mt-2 group-hover:text-emerald-800 transition-colors">
                          1~15단계 마음활동
                        </h3>
                        <p className="text-xs sm:text-sm font-batang text-gray-600 mt-1.5 leading-relaxed">
                          고민 라디오, 조하리의 창, 다중지능 브랜딩 카드, 듀얼 편지 등 흥미진진한 15가지 미션을 수행해요.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-emerald-200/60 text-xs font-dodum font-bold text-emerald-800">
                      <span>현재 {currentLesson}단계 진행 중</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </div>

                  {/* 3. 마이페이지 */}
                  <div
                    onClick={() => setCurrentTab("mypage")}
                    className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100/70 border-2 border-amber-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                        🗂️
                      </div>
                      <div>
                        <span className="text-xs font-dodum font-bold text-amber-900 bg-white px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
                          나의 성장 보물상자
                        </span>
                        <h3 className="text-2xl font-title font-bold text-gray-900 mt-2 group-hover:text-amber-700 transition-colors">
                          마이페이지
                        </h3>
                        <p className="text-xs sm:text-sm font-batang text-gray-600 mt-1.5 leading-relaxed">
                          내가 완성한 1~15단계 활동 카드, 제출한 감정일기 및 성장 기록들을 한눈에 다시 보아요.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-amber-200/60 text-xs font-dodum font-bold text-amber-800">
                      <span>아카이브 확인하기</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </div>

                  {/* 4. 마음에세이 */}
                  <div
                    onClick={() => setCurrentTab("print")}
                    className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-100/70 border-2 border-purple-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                        📖
                      </div>
                      <div>
                        <span className="text-xs font-dodum font-bold text-purple-700 bg-white px-3 py-1 rounded-full border border-purple-300 shadow-2xs">
                          나만의 포트폴리오
                        </span>
                        <h3 className="text-2xl font-title font-bold text-gray-900 mt-2 group-hover:text-purple-700 transition-colors">
                          마음에세이
                        </h3>
                        <p className="text-xs sm:text-sm font-batang text-gray-600 mt-1.5 leading-relaxed">
                          나의 마음 성장을 4페이지 멋진 나만의 마음에세이 PDF 및 전시용 책자 형태로 보관하고 출력해요.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-purple-200/60 text-xs font-dodum font-bold text-purple-800">
                      <span>PDF 인쇄 및 열람</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: 1~15단계 인터랙티브 마음 활동 */}
            {currentTab === "activity" && (
              <div className="space-y-6">

                {/* 1~15단계 선택 카드 그리드 */}
                {/* 1) 단계 미선택 시: 1~15단계 단계와 제목만 깔끔하게 표시 */}
                {currentLesson === null && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                          🎯 15단계 마음성장 퀘스트
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-title font-bold">
                        참여할 활동 단계를 선택해 주세요! ✨
                      </h2>
                      <p className="font-batang text-xs sm:text-sm text-emerald-100 leading-relaxed">
                        원하는 단계를 클릭하면 해당 단계의 상세 인터랙티브 활동이 펼쳐집니다.
                      </p>
                    </div>

                    {/* 1~15단계 선택 카드 그리드 (간소화: 단계 번호 + 1단계 마음활동 + 활동 전/활동 완료 + 활동 시작하기 버튼) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                      {CURRICULUM.map(c => {
                        const isUnlocked = isTeacherMode || unlockedStages[c.no];
                        const isDone = completedLessons.includes(c.no);
                        return (
                          <div
                            key={c.no}
                            onClick={() => {
                              if (isUnlocked) {
                                setCurrentLesson(c.no);
                              } else {
                                alert(`🔒 ${c.no}단계는 선생님께서 아직 잠금 설정해 둔 단계입니다.\n수업 진행에 맞춰 잠금이 해제되면 열립니다!`);
                              }
                            }}
                            className={`p-5 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center justify-between text-center gap-3 shadow-xs ${isUnlocked ? isDone ? "bg-gradient-to-b from-emerald-50/70 to-white border-emerald-400 hover:border-emerald-500 hover:shadow-md hover:-translate-y-1 cursor-pointer" : "bg-white border-gray-200 hover:border-emerald-400 hover:shadow-md hover:-translate-y-1 cursor-pointer" : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"}`}
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold font-mono shadow-inner ${isUnlocked ? isDone ? "bg-emerald-100 text-emerald-800" : "bg-teal-50 text-teal-800" : "bg-gray-200 text-gray-500"}`}>
                              {c.no}
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="text-base font-title font-bold text-gray-900">
                                {c.no}단계
                              </h3>
                              <div>
                                {isDone ? (
                                  <span className="text-[11px] font-dodum font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 inline-block">
                                    ✓ 활동 완료
                                  </span>
                                ) : (
                                  <span className="text-[11px] font-dodum font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200 inline-block">
                                    활동 전
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`w-full py-1.5 rounded-xl text-xs font-dodum font-bold transition shadow-2xs ${isUnlocked ? "bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-800" : "bg-gray-200 text-gray-500"}`}
                            >
                              {isUnlocked ? "활동 시작 🎯" : "🔒 잠김"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2) 단계 선택 시: 선택한 단계의 상세 활동 */}
                {currentLesson !== null && (
                  <div className="space-y-6 animate-fadeIn pt-6 border-t">
                    {/* 상단 네비게이션 및 돌아가기 바 */}
                    <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between gap-3 overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => setCurrentLesson(null)}
                        className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-dodum font-bold whitespace-nowrap transition flex items-center gap-1 shrink-0"
                      >
                        ◀ 단계 선택 목록으로
                      </button>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 items-center">
                        {CURRICULUM.map(c => {
                          const isUnlocked = isTeacherMode || unlockedStages[c.no];
                          const isSelected = currentLesson === c.no;
                          const isDone = completedLessons.includes(c.no);
                          return (
                            <button
                              key={c.no}
                              type="button"
                              onClick={() => {
                                if (isUnlocked) {
                                  setCurrentLesson(c.no);
                                } else {
                                  alert(`🔒 ${c.no}단계는 선생님께서 아직 잠금 설정해 둔 단계입니다.`);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold whitespace-nowrap transition-all flex items-center gap-1 ${isSelected ? "bg-emerald-800 text-white shadow-md scale-105" : isUnlocked ? "bg-gray-50 text-gray-700 hover:bg-emerald-50 border border-gray-200/60" : "bg-gray-100 text-gray-400 border border-dashed border-gray-300 opacity-60 cursor-not-allowed"}`}
                            >
                              {isDone && <span>⭐</span>}
                              {!isUnlocked && <span>🔒</span>}
                              <span>{c.no}단계</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Lesson Header Banner with Stage Clear Button */}
                    <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold">
                          {curLessonData.area}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* 🌟 마음 성장 완료 & 레벨업 버튼 */}
                          <button
                            type="button"
                            onClick={() => handleCompleteLesson(currentLesson)}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-amber-950 rounded-full text-xs font-dodum font-bold shadow-md transition transform hover:scale-105 flex items-center gap-1 border border-amber-300"
                          >
                            <span>⭐</span>
                            <span>{completedLessons.includes(currentLesson) ? `${currentLesson}단계 클리어 완료 (다시 완료)` : `${currentLesson}단계 클리어 & 레벨업!`}</span>
                          </button>
                          {/* 활동 초기화 버튼 (교사 또는 테스트용) */}
                          {(isTeacherMode || currentUser.studentId === "00000" || currentUser.isDemo) && (
                            <button
                              type="button"
                              onClick={() => handleResetCurrentActivity(currentLesson)}
                              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-dodum font-bold transition flex items-center gap-1 border border-white/30"
                              title={`${currentLesson}단계 활동 초기화`}
                            >
                              <span>🔄</span>
                              <span>초기화</span>
                            </button>
                          )}
                          {/* 교사용 전용 단계 잠금/풀기 토글 버튼 */}
                          {isTeacherMode && (
                            <button
                              type="button"
                              onClick={() => handleToggleStageLock(currentLesson)}
                              className={`px-3 py-1 rounded-full text-xs font-dodum font-bold shadow-sm transition flex items-center gap-1.5 ${unlockedStages[currentLesson] ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-amber-400 hover:bg-amber-500 text-amber-950"}`}
                            >
                              <span>{unlockedStages[currentLesson] ? "🔓 학생 공개 중" : "🔒 학생 잠김"}</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-dodum font-bold bg-white/10 px-3 py-1 rounded-full text-emerald-100">
                          {curLessonData.no}단계 활동
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-title font-bold">
                        {curLessonData.title}
                      </h2>
                      <p className="font-batang text-base text-emerald-100">
                        {curLessonData.subtitle}
                      </p>
                    </div>

                {/* Activity Interaction Container */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
                  
                  {/* 1단계: 라디오 및 고민 공유 커뮤니티 피드 + 1:1 토닥토닥 마음 우체통 (순차적 2단계 페이지 전환) */}
                  {currentLesson === 1 && (
                    <div className="space-y-6">
                      {/* 1단계 상단 단계 인디케이터 */}
                      <div className="flex items-center justify-between bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-xl text-xs font-dodum font-bold transition ${lesson1Page === 1 ? "bg-amber-700 text-white shadow-sm" : "bg-white text-gray-600 border"}`}>
                            1단계: 고민 주파수 라디오 & 사연 올리기
                          </span>
                          <span className="text-gray-400">➔</span>
                          <span className={`px-3 py-1 rounded-xl text-xs font-dodum font-bold transition ${lesson1Page === 2 ? "bg-[#2A784B] text-white shadow-sm" : "bg-white text-gray-600 border"}`}>
                            2단계: 익명 토닥토닥 마음 우체통 (위로 매칭)
                          </span>
                        </div>
                        <span className="text-xs font-batang font-bold text-amber-900 hidden sm:inline">
                          {lesson1Page === 1 ? "📌 사연을 등록하고 다음 단계로 이동하세요" : "💌 친구에게 따뜻한 위로 엽서를 전하세요"}
                        </span>
                      </div>

                      {/* [1단계 PAGE 1: 라디오 튜너 & 학급 사연 작성] */}
                      {lesson1Page === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                          {/* 교사용 참고 유튜브 영상 링크 (청소년 고민 예시) */}
                          {isTeacherMode && (
                            <div className="p-4 bg-amber-100/80 rounded-2xl border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">🎬</span>
                                <div>
                                  <div className="text-xs sm:text-sm font-dodum font-bold text-amber-950">
                                    [교사용 수업 참고 영상] 청소년들의 진짜 일상 고민 예시 인터뷰
                                  </div>
                                  <div className="text-[11px] font-batang text-amber-800">
                                    클릭 시 새 창에서 관련 유튜브 영상이 열립니다.
                                  </div>
                                </div>
                              </div>
                              <a
                                href="https://youtu.be/CyNx4jM6FNk?si=_fXuyvKLJshDW_ET"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold shadow-sm transition flex items-center gap-1.5 shrink-0 hover:scale-105"
                              >
                                <span>▶ 유튜브 영상 열기</span>
                                <span>🔗</span>
                              </a>
                            </div>
                          )}
                          {/* 6대 고민 주파수 라디오 튜너 */}
                          <div className="space-y-4 bg-amber-50/90 p-6 sm:p-7 rounded-3xl border-2 border-amber-300 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-sm sm:text-base font-dodum font-bold bg-amber-200 text-amber-950 px-3.5 py-1.5 rounded-full shadow-2xs">
                                📻 우리 반 6대 마음 주파수 라디오 채널
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-mono font-bold text-amber-900 bg-white px-3.5 py-1 rounded-xl border border-amber-300">
                                  현재 주파수: {radioFreq} MHz
                                </span>
                              </div>
                            </div>

                            {/* 빠른 채널 선택 칩 */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
                              {RADIO_CHANNELS.map(ch => (
                                <button
                                  key={ch.freq}
                                  type="button"
                                  onClick={() => setRadioFreq(ch.freq)}
                                  className={`px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-dodum font-bold transition-all flex flex-col items-center gap-0.5 ${radioFreq === ch.freq ? "bg-amber-700 text-white shadow-md scale-105" : "bg-white text-gray-700 hover:bg-amber-100 border border-amber-200"}`}
                                >
                                  <span className="text-xs font-mono font-bold">{ch.freq} MHz</span>
                                  <span className="text-xs sm:text-sm">{ch.name}</span>
                                </button>
                              ))}
                            </div>

                            <div className="space-y-2 pt-2">
                              <input
                                type="range"
                                min="90"
                                max="110"
                                step="0.1"
                                value={radioFreq}
                                onChange={(e) => setRadioFreq(parseFloat(e.target.value))}
                                className="w-full accent-amber-600 h-2.5 bg-amber-200 rounded-lg cursor-pointer"
                              />
                            </div>

                            {/* 채널 사연 방송 화면 */}
                            {(() => {
                              const activeCh = RADIO_CHANNELS.find(c => Math.abs(c.freq - radioFreq) < 1.8) || RADIO_CHANNELS[2];
                              return (
                                <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-amber-300 space-y-3 shadow-sm">
                                  <div className="text-base sm:text-lg font-batang text-amber-950 font-bold leading-relaxed">
                                    {activeCh.text}
                                  </div>
                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-100">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleRadioHeart(activeCh.freq)}
                                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-dodum font-bold shadow transition flex items-center gap-1.5 hover:scale-105 ${radioLikedChannels[activeCh.freq] ? "bg-rose-600 text-white shadow-inner" : "bg-rose-500 hover:bg-rose-600 text-white"}`}
                                    >
                                      <span>{radioLikedChannels[activeCh.freq] ? "💖" : "❤️"}</span>
                                      <span>{radioLikedChannels[activeCh.freq] ? "공감 완료 (참여함)" : "이 사연에 폭풍 공감 보내기"}</span>
                                    </button>
                                    <span className="text-sm sm:text-base font-batang text-rose-600 font-bold">
                                      우리 반 실시간 공감 하트: {radioHearts[activeCh.freq] || 0}회
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* 학급 고민 사연 공유 & 실시간 공감 피드 */}
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                  <span>💬</span> 우리 반 고민 주파수 라디오 사연함
                                </h4>
                                <p className="text-xs sm:text-sm font-batang text-gray-600 mt-1">
                                  친구들과 나누고 싶은 나만의 고민 사연을 등록해 보세요! 사연을 작성하면 다음 페이지로 이동하여 친구를 위로할 수 있습니다.
                                </p>
                              </div>
                              <span className="text-xs sm:text-sm font-batang font-bold bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full border border-amber-200 self-start sm:self-center">
                                학생 실시간 사연: {studentRealWorries.length}개
                              </span>
                            </div>

                            {/* 사연 작성 폼 (6개 카테고리 + 기타) */}
                            <form onSubmit={handleAddCustomWorry} className="p-5 bg-amber-50/60 rounded-3xl border-2 border-amber-200 space-y-3.5 shadow-2xs">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-amber-950">사연 카테고리:</span>
                                {["외모/성장", "또래/교우", "성적/학업", "경제/소비", "진로/꿈", "가족/부모님", "기타"].map(cat => (
                                  <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCustomWorryCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-batang transition ${customWorryCategory === cat ? "bg-amber-700 text-white font-bold shadow-2xs scale-105" : "bg-white text-gray-700 border border-gray-200 hover:bg-amber-50"}`}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                  type="text"
                                  value={customWorryText}
                                  onChange={(e) => setCustomWorryText(e.target.value)}
                                  placeholder="오늘 나를 힘들게 하거나 고민되는 이야기를 솔직하게 적어보세요..."
                                  className="flex-1 p-3.5 bg-white rounded-2xl border border-gray-300 font-batang text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                                />
                                <button
                                  type="submit"
                                  className="px-6 py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shrink-0 shadow transition flex items-center justify-center gap-1.5 hover:scale-105"
                                >
                                  <span>🚀</span> 사연 등록하기
                                </button>
                              </div>
                            </form>

                            {/* 📜 고민 사연 예시 3종 섹션 */}
                            <div className="space-y-2.5 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                                  <span>📜</span> 고민 사연 예시 (선생님 가이드)
                                </span>
                                <span className="text-xs font-batang text-gray-500">참고용 예시 사연 3개</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {DUMMY_EXAMPLE_WORRIES.map(w => (
                                  <div key={w.id} className="p-4 bg-amber-50/40 rounded-2xl border border-amber-200 space-y-2 flex flex-col justify-between">
                                    <div className="space-y-1.5">
                                      <div className="flex justify-between items-center text-xs font-batang">
                                        <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">{w.category}</span>
                                        <span className="text-amber-700 text-[11px] font-mono font-bold">{w.freq}</span>
                                      </div>
                                      <p className="text-xs sm:text-sm font-batang text-gray-800 leading-relaxed italic">
                                        &quot;{w.content}&quot;
                                      </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 text-xs">
                                      <span className="text-gray-500 font-dodum">{w.author}</span>
                                      <span className="text-rose-600 font-dodum font-bold flex items-center gap-1">
                                        ❤️ {w.likes}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 📨 실시간 등록된 우리 반 학생 고민 사연 섹션 */}
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-emerald-900 flex items-center gap-1.5">
                                  <span>💌</span> 실시간 등록된 우리 반 학생 사연:
                                </span>
                                <span className="text-xs font-batang font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                                  학생 실시간 제출: {studentRealWorries.length}명
                                </span>
                              </div>

                              {studentRealWorries.length === 0 ? (
                                <div className="p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center space-y-1 text-gray-500 text-xs sm:text-sm font-batang">
                                  <p>아직 제출된 학생 사연이 없습니다.</p>
                                  <p className="text-xs text-gray-400">위 사연 작성창에서 고민을 적고 등록해 보세요!</p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {studentRealWorries.map((w, wIdx) => (
                                    <div key={w.id} className="p-4 bg-white rounded-2xl border-2 border-emerald-200 shadow-sm space-y-2.5 flex flex-col justify-between">
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between items-center text-xs font-batang">
                                          <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">{w.category}</span>
                                          <span className="text-gray-400 font-mono text-[11px]">{w.submittedAt || w.freq}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm font-batang text-gray-800 leading-relaxed italic">
                                          &quot;{w.content}&quot;
                                        </p>
                                      </div>
                                      <div className="flex items-center justify-between pt-2 border-t border-emerald-100 text-xs">
                                        <span className="text-emerald-900 font-dodum font-bold">익명 사연 #{wIdx + 1}</span>
                                        <button
                                          type="button"
                                          onClick={() => handleToggleLikeWorry(w.id)}
                                          className={`px-2.5 py-1 rounded-xl font-dodum font-bold flex items-center gap-1 transition ${w.liked ? "bg-rose-500 text-white" : "bg-white text-rose-600 border border-rose-200"}`}
                                        >
                                          <span>❤️</span>
                                          <span>{w.likes}</span>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* 교사용 사연 1:1 무작위 배정 완료 컨트롤 바 (교사 모드 전용) */}
                            {(isTeacherMode || currentUser.studentId === "00000") && (
                              <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-1 bg-slate-800 text-white rounded-lg text-xs font-dodum font-bold">
                                    교사용 제어
                                  </span>
                                  <span className="text-xs font-batang text-slate-700">
                                    {isWorryDispatched ? "✅ 사연이 1:1 무작위 순환 배정되었습니다." : "모든 사연이 접수된 후 배정 완료 버튼을 눌러주세요."}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={handleTeacherResetRadioHearts}
                                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 rounded-xl text-xs font-dodum font-bold transition"
                                  >
                                    하트 0회 초기화 ❤️
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleResetWorrySession}
                                    className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-dodum font-bold transition"
                                  >
                                    사연 초기화 🔄
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleTeacherDispatchWorries}
                                    className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1.5 ${isWorryDispatched ? "bg-emerald-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                                  >
                                    <span>{isWorryDispatched ? "✨ 배정 완료됨 (재배정)" : "🔒 교사 전용: 사연 1:1 배정 완료"}</span>
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* 1단계 하단 네비게이션: 다음 페이지(토닥토닥 우체통) 이동 버튼 */}
                            <div className="pt-4 flex items-center justify-end border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => {
                                  setLesson1Page(2);
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className="px-6 py-3 bg-[#2A784B] hover:bg-[#1E5736] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition flex items-center gap-2 hover:scale-105"
                              >
                                <span>다음 단계: 익명 토닥토닥 마음 우체통 위로하러 가기</span>
                                <span>▶</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* [1단계 PAGE 2: 익명 토닥토닥 마음 우체통 (1:1 고민-위로 매칭 시스템)] */}
                      {lesson1Page === 2 && (
                        <div className="space-y-6 bg-gradient-to-b from-[#EEF6F0] to-[#E3EFE6] p-6 sm:p-8 rounded-3xl border-2 border-[#2A784B]/30 shadow-md animate-fadeIn">
                          {/* 헤더 타이틀 */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A784B]/20 pb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#2A784B] text-white rounded-full text-xs font-dodum font-bold shadow-sm">
                                  📬 1단계 2단계 미션
                                </span>
                                <span className="text-xs font-batang text-[#2A784B] font-bold">
                                  익명 토닥토닥 마음 우체통
                                </span>
                              </div>
                              <h3 className="text-xl sm:text-2xl font-title font-bold text-[#1E5736]">
                                1:1 고민-위로 매칭: 친구의 마음에 따뜻한 온기 전하기
                              </h3>
                              <p className="text-xs sm:text-sm font-batang text-gray-700">
                                비난과 섣부른 조언 대신, <strong>[3단계 위로 공식]</strong>에 맞춰 친구의 지친 마음에 안식처가 되어주세요.
                              </p>
                            </div>

                            {/* 내가 받은 위로 답장 열람 버튼 알림함 */}
                            <button
                              type="button"
                              onClick={() => {
                                if (!hasReceivedComfortLetter) {
                                  alert("아직 친구가 보낸 위로 답장이 도착하지 않았습니다 📭\n친구들의 따뜻한 위로 편지가 전송되면 알림이 도착합니다.");
                                  return;
                                }
                                setIsComfortModalOpen(true);
                                setIsPostcardFlipped(false);
                              }}
                              className="relative px-4 py-2.5 bg-white border-2 border-rose-400 hover:border-rose-500 text-rose-700 rounded-2xl text-xs font-dodum font-bold shadow-sm transition flex items-center gap-2 self-start sm:self-center shrink-0 hover:scale-105"
                            >
                              <span className="text-base">💌</span>
                              <span>내게 온 위로 답장함</span>
                              {hasReceivedComfortLetter && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-mono font-bold animate-bounce shadow">
                                  NEW 1
                                </span>
                              )}
                            </button>
                          </div>

                          {/* Step 1 & 2: 매칭된 친구의 고민 사연 엽서 열람 */}
                          <div className="bg-white/90 p-5 sm:p-6 rounded-2xl border border-[#2A784B]/30 shadow-sm space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -z-0 opacity-40"></div>
                            <div className="flex items-center justify-between relative z-10">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🏷️</span>
                                <span className="text-xs sm:text-sm font-dodum font-bold text-[#2A784B] bg-[#EEF6F0] px-3.5 py-1 rounded-full border border-[#2A784B]/20">
                                  나에게 배달된 사연 [{activeAssignedWorry.category}]
                                </span>
                              </div>
                              <span className="text-xs sm:text-sm font-batang text-gray-500 font-bold">
                                보낸이: {activeAssignedWorry.senderTag}
                              </span>
                            </div>
                            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 font-batang text-sm sm:text-base text-gray-800 leading-relaxed relative z-10 italic">
                              &quot;{activeAssignedWorry.content}&quot;
                            </div>
                          </div>

                          {/* 3단계 위로 가이드 템플릿 작성 폼 */}
                          <form onSubmit={handleSendComfortLetter} className="space-y-4">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
                              <h4 className="font-title text-base font-bold text-gray-900 flex items-center gap-2">
                                <span>✍️</span> 3단계 구조화 위로 가이드 작성하기
                              </h4>

                              {/* 1단계: 공감과 감정 읽어주기 */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-dodum font-bold text-[#2A784B] flex items-center gap-1.5">
                                  <span className="w-5 h-5 rounded-full bg-[#2A784B] text-white flex items-center justify-center text-[10px]">1</span>
                                  <span>[공감과 감정 읽어주기]</span>
                                  <span className="text-[11px] font-batang text-gray-500 font-normal">
                                    (예: 너에게 그런 일이 있어서 많이 불안하고 외로웠겠구나...)
                                  </span>
                                </label>
                                <textarea
                                  rows="2"
                                  value={comfortStep1}
                                  onChange={(e) => setComfortStep1(e.target.value)}
                                  placeholder="친구의 감정을 먼저 따뜻하게 짚어주세요..."
                                  className="w-full p-3 bg-[#FAFCFA] rounded-xl border border-gray-300 font-batang text-sm focus:outline-none focus:ring-2 focus:ring-[#2A784B] leading-relaxed"
                                />
                              </div>

                              {/* 2단계: 존재 인정 & 비난하지 않기 */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-dodum font-bold text-[#2A784B] flex items-center gap-1.5">
                                  <span className="w-5 h-5 rounded-full bg-[#2A784B] text-white flex items-center justify-center text-[10px]">2</span>
                                  <span>[존재 인정 & 자책 덜어주기]</span>
                                  <span className="text-[11px] font-batang text-gray-500 font-normal">
                                    (예: 네가 소심하거나 부족해서가 절대 아니야. 누구나 처음엔 낯설고 무서워.)
                                  </span>
                                </label>
                                <textarea
                                  rows="2"
                                  value={comfortStep2}
                                  onChange={(e) => setComfortStep2(e.target.value)}
                                  placeholder="친구 탓이 아니라는 점을 진심으로 짚어주세요..."
                                  className="w-full p-3 bg-[#FAFCFA] rounded-xl border border-gray-300 font-batang text-sm focus:outline-none focus:ring-2 focus:ring-[#2A784B] leading-relaxed"
                                />
                              </div>

                              {/* 3단계: 작은 용기와 응원 한 줄 */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-dodum font-bold text-[#2A784B] flex items-center gap-1.5">
                                  <span className="w-5 h-5 rounded-full bg-[#2A784B] text-white flex items-center justify-center text-[10px]">3</span>
                                  <span>[작은 용기와 응원 한 줄]</span>
                                  <span className="text-[11px] font-batang text-gray-500 font-normal">
                                    (예: 조급해하지 않아도 돼! 내일은 짝꿍에게 가벼운 눈인사부터 해보는 건 어떨까?)
                                  </span>
                                </label>
                                <textarea
                                  rows="2"
                                  value={comfortStep3}
                                  onChange={(e) => setComfortStep3(e.target.value)}
                                  placeholder="작은 실천 팁이나 따뜻한 응원의 말을 건네주세요..."
                                  className="w-full p-3 bg-[#FAFCFA] rounded-xl border border-gray-300 font-batang text-sm focus:outline-none focus:ring-2 focus:ring-[#2A784B] leading-relaxed"
                                />
                              </div>

                              {/* 마법의 위로 스티커 칩 (원클릭 토글) */}
                              <div className="space-y-2 pt-2 border-t border-gray-100">
                                <span className="text-xs font-dodum font-bold text-gray-700 flex items-center gap-1">
                                  <span>✨</span> 마법의 위로 스티커 붙이기 (최대 3개):
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {COMFORT_STICKER_OPTIONS.map((stk) => {
                                    const isSelected = selectedStickers.includes(stk);
                                    return (
                                      <button
                                        key={stk}
                                        type="button"
                                        onClick={() => handleAddSticker(stk)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-batang transition-all flex items-center gap-1 ${isSelected ? "bg-rose-500 text-white font-bold shadow scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"}`}
                                      >
                                        <span>{isSelected ? "💖" : "🏷️"}</span>
                                        <span>{stk}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* 발송 버튼 및 발송 완료 메시지 */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                              <div className="text-xs font-batang text-gray-600">
                                {hasSentComfort ? (
                                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                                    <span>✅</span> {comfortLetterSentTime}에 친구에게 위로 엽서가 안전하게 도착했습니다! 💌
                                  </span>
                                ) : (
                                  <span>엽서를 보내면 친구의 마음에 실시간으로 배달됩니다.</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setLesson1Page(1)}
                                  className="px-4 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl text-xs font-dodum font-bold shadow-sm transition"
                                >
                                  ◀ 이전 단계 (사연함)
                                </button>
                                <button
                                  type="submit"
                                  disabled={hasSentComfort}
                                  className={`px-6 py-3 rounded-2xl text-xs font-dodum font-bold shadow-md transition flex items-center gap-2 shrink-0 ${hasSentComfort ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#2A784B] hover:bg-[#1E5736] text-white hover:scale-105"}`}
                                >
                                  <span>💌</span>
                                  <span>{hasSentComfort ? "위로 엽서 발송 완료" : "익명 위로 엽서 부치기"}</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* 내가 받은 위로 답장 모달 (카드 뒤집기 애니메이션 & 고마워요 버튼) */}
                      {isComfortModalOpen && (() => {
                        const displayPostcard = receivedComfortPostcard || {
                          from: "1학년 3반 마음친구 🌿",
                          matchedWorrySnippet: "친구들과 어울리는 게 조금 어색하고 용기가 필요했어요...",
                          step1: "새 학기에는 누구나 낯설고 긴장되는 게 당연해. 너만 그런 게 아니니까 너무 걱정하지 마!",
                          step2: "쉬는 시간에 혼자 있는 건 네 탓이 아니야. 스스로를 너무 자책하지 않았으면 좋겠어.",
                          step3: "내일 아침에 눈 마주치면 가볍게 '안녕' 하고 먼저 웃어보자. 넌 충분히 따뜻하고 멋진 친구야!",
                          stickers: ["넌 충분히 잘하고 있어! 🌟", "토닥토닥 힘내자 💖", "네 편이 되어줄게 🤝"],
                          thanked: false,
                          thankCount: 1
                        };
                        return (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-fadeIn border-2 border-rose-200">
                            <button
                              type="button"
                              onClick={() => setIsComfortModalOpen(false)}
                              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold"
                            >
                              ✕
                            </button>

                            <div className="text-center space-y-1">
                              <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-dodum font-bold">
                                📬 나에게 도착한 위로 엽서
                              </span>
                              <h3 className="text-xl font-title font-bold text-gray-900 pt-1">
                                친구가 보낸 따뜻한 위로 엽서가 도착했어요!
                              </h3>
                              <p className="text-xs font-batang text-gray-500">
                                카드를 클릭하여 앞뒤를 뒤집어보세요 🔄
                              </p>
                            </div>

                            {/* 엽서 카드 (앞면 / 뒷면 플립) */}
                            <div
                              onClick={() => setIsPostcardFlipped(!isPostcardFlipped)}
                              className={`cursor-pointer rounded-2xl p-6 transition-all duration-500 shadow-inner border-2 ${isPostcardFlipped ? "bg-[#EEF6F0] border-[#2A784B]" : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"}`}
                            >
                              {!isPostcardFlipped ? (
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center text-xs font-batang border-b border-amber-200 pb-2">
                                    <span className="font-bold text-amber-900">내가 보냈던 고민:</span>
                                    <span className="text-amber-700 text-[11px]">카드 터치해서 뒤집기 👆</span>
                                  </div>
                                  <p className="font-batang text-sm text-gray-800 italic bg-white/80 p-3 rounded-xl border border-amber-200">
                                    &quot;{displayPostcard.matchedWorrySnippet}&quot;
                                  </p>
                                  <div className="text-center pt-2">
                                    <span className="text-xs font-dodum font-bold text-amber-800 bg-amber-200/80 px-4 py-1.5 rounded-full shadow-sm inline-block">
                                      💌 친구의 3단계 위로 답장 읽기 (클릭)
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center text-xs font-batang border-b border-emerald-200 pb-2">
                                    <span className="font-bold text-[#2A784B]">보낸이: {displayPostcard.from}</span>
                                    <span className="text-xs font-mono text-gray-400">1:1 익명 매칭</span>
                                  </div>

                                  <div className="space-y-3 font-batang text-xs sm:text-sm text-gray-800 leading-relaxed">
                                    <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-100 space-y-0.5">
                                      <strong className="text-emerald-800 block text-xs">[1단계] 공감하기</strong>
                                      <p>{displayPostcard.step1}</p>
                                    </div>
                                    <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-100 space-y-0.5">
                                      <strong className="text-emerald-800 block text-xs">[2단계] 자책 덜어주기</strong>
                                      <p>{displayPostcard.step2}</p>
                                    </div>
                                    <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-100 space-y-0.5">
                                      <strong className="text-emerald-800 block text-xs">[3단계] 따뜻한 응원</strong>
                                      <p>{displayPostcard.step3}</p>
                                    </div>
                                  </div>

                                  {/* 스티커 목록 */}
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {(displayPostcard.stickers || []).map((stk, idx) => (
                                      <span key={idx} className="px-2.5 py-1 bg-white rounded-full text-xs font-batang text-emerald-900 border border-emerald-200 font-bold shadow-2xs">
                                        {stk}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* 하단 인터랙션 (고마워요 하트 피드백) */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                              <span className="text-xs font-batang text-gray-500">
                                따뜻한 위로를 보낸 친구에게 고마움을 전해보세요!
                              </span>
                              <button
                                type="button"
                                onClick={handleToggleThankYou}
                                className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold flex items-center gap-1.5 transition ${displayPostcard.thanked ? "bg-rose-500 text-white shadow-md scale-105" : "bg-rose-50 text-rose-600 border border-rose-300 hover:bg-rose-100"}`}
                              >
                                <span>{displayPostcard.thanked ? "❤️" : "🤍"}</span>
                                <span>고마워요 ({displayPostcard.thankCount || 0})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* 2단계: 한국어 조하리의 창(Johari Window) 나와 친구의 강점 발견하기 */}
                  {currentLesson === 2 && (
                    <div className="space-y-6 bg-gradient-to-b from-[#EEF6F0] to-[#E3EFE6] p-6 sm:p-8 rounded-3xl border-2 border-[#2A784B]/30 shadow-md">
                      {/* 단계 타이틀 헤더 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A784B]/20 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#2A784B] text-white rounded-full text-xs font-dodum font-bold shadow-sm">
                              🪟 2단계 활동
                            </span>
                            <span className="text-xs font-batang text-[#2A784B] font-bold">
                              조하리의 창 (Johari Window)
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-title font-bold text-[#1E5736]">
                            나와 친구의 강점 발견하기
                          </h3>
                          <p className="text-sm sm:text-base font-batang text-gray-700 leading-relaxed">
                            내가 생각하는 나와 친구가 바라본 나를 교차 분석하여 <strong>진짜 나의 숨겨진 보석</strong>을 발견합니다.
                          </p>
                        </div>

                        {/* 조하리의 창(Johari Window) 4개 마음 창문 알아보기 설명 토글 버튼 & 단계별 네비게이션 */}
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsJohariTheoryOpen(!isJohariTheoryOpen)}
                            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-2xs transition flex items-center gap-1.5"
                          >
                            <span>💡</span>
                            <span>{isJohariTheoryOpen ? "조하리의 창 이론 닫기 ✕" : "조하리의 창 4개 마음 창문 알아보기 📖"}</span>
                          </button>
                          
                          <div className="flex items-center gap-1 bg-white/80 p-1.5 rounded-2xl border border-[#2A784B]/20 shadow-2xs">
                            {[
                              { key: "A", label: "Step A. 나의 강점" },
                              { key: "B", label: "Step B. 친구 강점 발견" },
                              { key: "C", label: "Step C. 4개의 창" },
                              { key: "D", label: "Step D. 문장 완성" }
                            ].map(step => (
                              <button
                                key={step.key}
                                type="button"
                                onClick={() => setLesson2Step(step.key)}
                                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-dodum font-bold transition-all ${lesson2Step === step.key ? "bg-[#2A784B] text-white shadow-sm scale-105" : "text-gray-600 hover:bg-emerald-50"}`}
                              >
                                {step.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* [💡 조하리의 창 4개 마음 창문 상세 가이드 아코디언] */}
                      {isJohariTheoryOpen && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-300 shadow-md space-y-5 animate-fadeIn">
                          <div className="border-b border-emerald-100 pb-3 space-y-1">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-dodum font-bold">
                              심리학 이론 탐구
                            </span>
                            <h4 className="text-xl font-title font-bold text-gray-900 pt-1">
                              🪟 조하리의 창(Johari Window)이란?
                            </h4>
                            <p className="text-sm sm:text-base font-batang text-gray-600 leading-relaxed">
                              심리학자 조셉 러프트(Joseph Luft)와 해리 잉검(Harry Ingham)이 개발한 대인관계 및 자기이해 모델입니다. 나를 바라보는 시선과 타인이 바라보는 시선을 2x2 매트릭스로 분석하여 진짜 나의 모습을 입체적으로 탐색합니다.
                            </p>
                          </div>

                          {/* 유튜브 링크 버튼 (조하리의 창) - 교사 전용 */}
                          {isTeacherMode && (
                            <div className="p-4 bg-emerald-100/70 rounded-2xl border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">🎬</span>
                                <div>
                                  <div className="text-xs sm:text-sm font-dodum font-bold text-emerald-950">
                                    [교사용 참고 영상] 조하리의 창 4개 마음 창문 알아보기
                                  </div>
                                  <div className="text-[11px] font-batang text-emerald-800">
                                    클릭 시 새 창에서 관련 유튜브 영상이 열립니다.
                                  </div>
                                </div>
                              </div>
                              <a
                                href="https://youtu.be/u3-OHY2CdVE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold shadow-sm transition flex items-center gap-1.5 shrink-0 hover:scale-105"
                              >
                                <span>▶ 유튜브 영상 열기</span>
                                <span>🔗</span>
                              </a>
                            </div>
                          )}

                          {/* 2x2 테이블 구조도 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <strong className="text-sm sm:text-base font-dodum font-bold text-emerald-900">① 열린 창 (Open Area)</strong>
                                <span className="text-xs sm:text-sm font-batang text-emerald-700 font-bold">나도 앎 · 친구도 앎</span>
                              </div>
                              <p className="text-xs sm:text-sm font-batang text-gray-700 leading-relaxed">
                                내가 아는 나의 모습과 친구들이 알고 있는 나의 모습이 일치하는 영역입니다. 나의 대표 강점으로 사람들과 스스럼없이 소통하고 표현할 수 있습니다.
                              </p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-300 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <strong className="text-sm sm:text-base font-dodum font-bold text-blue-900">② 보이지 않는 창 (Blind Area)</strong>
                                <span className="text-xs sm:text-sm font-batang text-blue-700 font-bold">나는 모름 · 친구는 앎</span>
                              </div>
                              <p className="text-xs sm:text-sm font-batang text-gray-700 leading-relaxed">
                                나는 미처 깨닫지 못했지만 친구들이 발견해 준 나의 강점 영역입니다. 친구들의 따뜻한 피드백을 통해 새로운 나의 매력과 보석을 발견할 수 있습니다.
                              </p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <strong className="text-sm sm:text-base font-dodum font-bold text-amber-900">③ 숨겨진 창 (Hidden Area)</strong>
                                <span className="text-xs sm:text-sm font-batang text-amber-700 font-bold">나는 앎 · 친구는 모름</span>
                              </div>
                              <p className="text-xs sm:text-sm font-batang text-gray-700 leading-relaxed">
                                나만의 비밀이거나 아직 친구들에게 적극적으로 보여주지 못한 강점 영역입니다. 진솔한 자기표현을 통해 친구들에게 내 매력을 조금씩 열어갈 수 있습니다.
                              </p>
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50 border border-purple-300 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <strong className="text-sm sm:text-base font-dodum font-bold text-purple-900">④ 미지의 창 (Unknown Area)</strong>
                                <span className="text-xs sm:text-sm font-batang text-purple-700 font-bold">앞으로 키울 잠재력</span>
                              </div>
                              <p className="text-xs sm:text-sm font-batang text-gray-700 leading-relaxed">
                                아직 발현되지 않았지만 앞으로 내가 배우고 경험하며 성장시키고 싶은 미래의 잠재 강점 영역입니다.
                              </p>
                            </div>
                          </div>

                          <div className="text-center pt-2">
                            <span className="text-xs sm:text-sm font-batang text-emerald-800 font-bold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                              🌱 서로의 마음 창문을 열어갈수록 우리 반의 유대감과 자존감은 더욱 커집니다!
                            </span>
                          </div>
                        </div>
                      )}

                      {/* [Step A: 내가 생각하는 나의 강점 5가지 & 갖고 싶은 강점 2가지] */}
                      {lesson2Step === "A" && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                            <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-[#2A784B] text-white flex items-center justify-center text-sm font-bold">A</span>
                              <span>[Step A] 내가 생각하는 나의 강점 & 갖고 싶은 강점</span>
                            </h4>
                            <span className="text-xs font-batang bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-bold border border-emerald-200">
                              나의 강점 ({mySelfStrengths.length}/5) · 희망 강점 ({myAspirationalStrengths.length}/2)
                            </span>
                          </div>

                          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-batang text-emerald-950 space-y-1">
                            <p>
                              👉 <strong>내가 생각하는 나의 강점:</strong> 단어 왼쪽의 <strong>[초록색 버튼]</strong>을 클릭하여 5개를 골라주세요.
                            </p>
                            <p>
                              👉 <strong>앞으로 키우고 싶은 강점:</strong> 단어 오른쪽의 <strong>[✨희망 버튼]</strong>을 클릭하여 2개를 골라주세요.
                            </p>
                          </div>

                          {/* 24개 강점 6대 덕목별 그리드 */}
                          <div className="space-y-4">
                            {VIA_STRENGTHS.map(group => (
                              <div key={group.category} className="space-y-2">
                                <div className="text-xs sm:text-sm font-dodum font-bold text-gray-700 flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A784B]"></span>
                                  <span>{group.category}</span>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                  {group.items.map(item => {
                                    const isSelf = mySelfStrengths.includes(item);
                                    const isAspirational = myAspirationalStrengths.includes(item);
                                    return (
                                      <div key={item} className="inline-flex rounded-2xl overflow-hidden border-2 border-gray-200 shadow-2xs hover:border-[#2A784B]/50 transition-all">
                                        {/* 왼쪽: 내가 생각하는 나의 강점 버튼 */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (isSelf) {
                                              setMySelfStrengths(mySelfStrengths.filter(s => s !== item));
                                            } else {
                                              if (mySelfStrengths.length < 5 && !isAspirational) {
                                                setMySelfStrengths([...mySelfStrengths, item]);
                                                triggerConfetti();
                                              }
                                            }
                                          }}
                                          className={`px-3.5 py-2 text-xs sm:text-sm font-batang font-medium transition-all flex items-center gap-1.5 ${isSelf ? "bg-[#2A784B] text-white font-bold" : "bg-white text-gray-800 hover:bg-emerald-50"}`}
                                        >
                                          <span>{isSelf ? "⭐" : "🏷️"}</span>
                                          <span>{item}</span>
                                        </button>
                                        {/* 오른쪽: 앞으로 키우고 싶은 희망 강점 버튼 */}
                                        <button
                                          type="button"
                                          title="앞으로 키우고 싶은 희망 강점으로 선택"
                                          onClick={() => {
                                            if (isAspirational) {
                                              setMyAspirationalStrengths(myAspirationalStrengths.filter(s => s !== item));
                                            } else {
                                              if (myAspirationalStrengths.length < 2 && !isSelf) {
                                                setMyAspirationalStrengths([...myAspirationalStrengths, item]);
                                                triggerConfetti();
                                              }
                                            }
                                          }}
                                          className={`px-3 py-2 text-xs font-dodum transition border-l border-gray-200 flex items-center gap-1 ${isAspirational ? "bg-purple-600 text-white font-bold" : "bg-gray-50 text-gray-500 hover:bg-purple-50 hover:text-purple-700 font-medium"}`}
                                        >
                                          <span>✨</span>
                                          <span>{isAspirational ? "희망 선택됨" : "희망"}</span>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                            <div className="text-xs sm:text-sm font-batang text-gray-700">
                              나의 강점 5개와 희망 강점 2개를 모두 고르면 다음 단계로 넘어갈 수 있습니다.
                            </div>
                            <button
                              type="button"
                              disabled={mySelfStrengths.length !== 5 || myAspirationalStrengths.length !== 2}
                              onClick={() => {
                                setLesson2Step("B");
                                triggerConfetti();
                              }}
                              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition flex items-center gap-2 ${mySelfStrengths.length === 5 && myAspirationalStrengths.length === 2 ? "bg-[#2A784B] hover:bg-[#1E5736] text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                            >
                              <span>다음 단계로 (친구 강점 찾아주기)</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* [Step B: 1:1 순환 매칭된 친구의 강점 발견하기] */}
                      {lesson2Step === "B" && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                            <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm font-bold">B</span>
                              <span>[Step B] 매칭된 친구의 강점 5가지 발견하기</span>
                            </h4>
                            <span className="text-xs font-dodum font-bold bg-rose-50 text-rose-700 px-3.5 py-1 rounded-full border border-rose-200">
                              선택된 친구: <strong>{partnerInfo.targetPartner.name}</strong> ({partnerInfo.targetPartner.studentId})
                            </span>
                          </div>

                          <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs sm:text-sm font-batang text-rose-950 leading-relaxed">
                            내가 평소에 관찰한 <strong>{partnerInfo.targetPartner.name}</strong> 학생의 멋진 강점 5가지를 골라주세요! (선택 즉시 서로 교차 반영됩니다)
                          </div>

                          <div className="flex flex-wrap gap-2.5 pt-1">
                            {ALL_VIA_STRENGTH_ITEMS.map(item => {
                              const isSelected = partnerGiftStrengths.includes(item);
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setPartnerGiftStrengths(partnerGiftStrengths.filter(s => s !== item));
                                    } else {
                                      if (partnerGiftStrengths.length < 5) {
                                        setPartnerGiftStrengths([...partnerGiftStrengths, item]);
                                      }
                                    }
                                  }}
                                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-batang transition-all flex items-center gap-1.5 ${isSelected ? "bg-rose-500 text-white font-bold shadow-md scale-105" : "bg-gray-50 text-gray-800 hover:bg-rose-50 border border-gray-200"}`}
                                >
                                  <span>{isSelected ? "💎" : "🏷️"}</span>
                                  <span>{item}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                            <button
                              type="button"
                              onClick={() => setLesson2Step("A")}
                              className="px-4 py-2.5 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 이전 단계로 (Step A)
                            </button>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-batang text-gray-500">
                                선택: <strong>{partnerGiftStrengths.length}/5개</strong>
                              </span>
                              <button
                                type="button"
                                disabled={partnerGiftStrengths.length !== 5}
                                onClick={() => {
                                  setHasSentPartnerGift(true);
                                  setLesson2Step("C");
                                  triggerConfetti();
                                }}
                                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition flex items-center gap-1.5 ${partnerGiftStrengths.length === 5 ? "bg-rose-600 hover:bg-rose-700 text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                              >
                                <span>{partnerInfo.targetPartner.name}의 강점 확인 완료 ➔</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* [Step C: 실시간 '조하리의 4개 창' 2x2 매트릭스 시각화] */}
                      {lesson2Step === "C" && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          {!isTeacherMode && !isJohariUnlocked ? (
                            <div className="py-12 px-6 bg-emerald-50/50 rounded-3xl border-2 border-dashed border-emerald-200 text-center space-y-5">
                              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
                                🔒
                              </div>
                              <div className="space-y-2 max-w-md mx-auto">
                                <h4 className="font-title text-xl font-bold text-emerald-950">
                                  친구들의 강점 입력 취합 및 분석 중
                                </h4>
                                <p className="font-batang text-sm text-gray-700 leading-relaxed">
                                  선생님께서 우리 반 친구들이 서로에게 선물한 강점을 취합하여 <strong>조하리의 4개 창</strong>을 분석하고 있습니다. 분석이 완료되면 화면이 자동으로 열립니다.
                                </p>
                              </div>
                              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setLesson2Step("B")}
                                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-dodum font-bold"
                                >
                                  ◀ 친구 강점 수정하기
                                </button>
                                <button
                                  type="button"
                                  onClick={handleTeacherUnlockJohari}
                                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1.5"
                                >
                                  <span>🔒</span>
                                  <span>선생님 전용: 4개의 창 공개하기</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-sm font-bold">C</span>
                                  <span>[Step C] {studentName} 학생의 조하리의 4개 창</span>
                                </h4>
                                <div className="flex items-center gap-2">
                                  {isTeacherMode && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsJohariUnlocked(!isJohariUnlocked);
                                        localStorage.setItem("mindplay_johari_unlocked", (!isJohariUnlocked).toString());
                                      }}
                                      className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-dodum font-bold"
                                    >
                                      {isJohariUnlocked ? "학생 공개 중 ✅" : "학생 잠금 상태 🔒"}
                                    </button>
                                  )}
                                  <span className="text-xs font-batang text-emerald-800 font-bold">
                                    {partnerInfo.sourcePartner.name} 친구와의 교차 분석 완료 ✨
                                  </span>
                                </div>
                              </div>

                              {/* 2x2 매트릭스 테이블 */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                {/* ① 열린 창 (Open Area) */}
                                <div className="p-5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-dodum font-bold">
                                      ① 열린 창 (Open Area)
                                    </span>
                                    <span className="text-xs font-batang text-emerald-900 font-bold">나도 알고, 친구도 안다</span>
                                  </div>
                                  <p className="text-xs sm:text-sm font-batang text-emerald-950 font-bold">
                                    👉 &quot;자신 있게 표현할 나의 대표 강점!&quot;
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-1 min-h-[46px]">
                                    {openArea.length > 0 ? (
                                      openArea.map(s => (
                                        <span key={s} className="px-3 py-1.5 bg-white rounded-xl text-xs sm:text-sm font-dodum font-bold text-emerald-800 border border-emerald-300 shadow-2xs">
                                          ⭐ {s}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-xs font-batang text-gray-400 italic">교차 일치 강점 탐색 중...</span>
                                    )}
                                  </div>
                                </div>

                                {/* ② 보이지 않는 창 (Blind Area) */}
                                <div className="p-5 rounded-2xl bg-blue-50/90 border-2 border-blue-300 space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-dodum font-bold">
                                      ② 보이지 않는 창 (Blind Area)
                                    </span>
                                    <span className="text-xs font-batang text-blue-900 font-bold">나는 몰랐고, 친구는 안다</span>
                                  </div>
                                  <p className="text-xs sm:text-sm font-batang text-blue-950 font-bold">
                                    👉 &quot;친구가 발견해 준 나의 숨은 보석 피드백!&quot;
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-1 min-h-[46px]">
                                    {blindArea.length > 0 ? (
                                      blindArea.map(s => (
                                        <span key={s} className="px-3 py-1.5 bg-white rounded-xl text-xs sm:text-sm font-dodum font-bold text-blue-800 border border-blue-300 shadow-2xs">
                                          💎 {s}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-xs font-batang text-gray-400 italic">피드백 분석 중...</span>
                                    )}
                                  </div>
                                </div>

                                {/* ③ 숨겨진 창 (Hidden Area) */}
                                <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-dodum font-bold">
                                      ③ 숨겨진 창 (Hidden Area)
                                    </span>
                                    <span className="text-xs font-batang text-amber-900 font-bold">나는 알고, 친구는 모른다</span>
                                  </div>
                                  <p className="text-xs sm:text-sm font-batang text-amber-950 font-bold">
                                    👉 &quot;친구들에게 슬쩍 꺼내 보여줄 나의 매력!&quot;
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-1 min-h-[46px]">
                                    {hiddenArea.length > 0 ? (
                                      hiddenArea.map(s => (
                                        <span key={s} className="px-3 py-1.5 bg-white rounded-xl text-xs sm:text-sm font-dodum font-bold text-amber-800 border border-amber-300 shadow-2xs">
                                          🔒 {s}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-xs font-batang text-gray-400 italic">분석 중...</span>
                                    )}
                                  </div>
                                </div>

                                {/* ④ 미지의 창 (Unknown Area) */}
                                <div className="p-4 rounded-2xl bg-purple-50/90 border-2 border-purple-300 space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-dodum font-bold">
                                      ④ 미지의 창 (Unknown Area)
                                    </span>
                                    <span className="text-xs font-batang text-purple-900 font-bold">앞으로 키워갈 잠재 강점</span>
                                  </div>
                                  <p className="text-xs sm:text-sm font-batang text-purple-950 font-bold">
                                    👉 &quot;도전과 연습을 통해 키워나갈 나의 잠재력!&quot;
                                  </p>
                                  <div className="flex flex-wrap gap-2 pt-1 min-h-[46px]">
                                    {unknownArea.length > 0 ? (
                                      unknownArea.map(s => (
                                        <span key={s} className="px-3 py-1.5 bg-white rounded-xl text-xs sm:text-sm font-dodum font-bold text-purple-800 border border-purple-300 shadow-2xs">
                                          🌱 {s}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-xs font-batang text-gray-400 italic">희망 강점 선택 대기...</span>
                                    )}
                                  </div>
                                </div>

                              </div>

                              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <button
                                  type="button"
                                  onClick={() => setLesson2Step("B")}
                                  className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                >
                                  ◀ 이전 단계로 (Step B)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setLesson2Step("D")}
                                  className="px-6 py-3 bg-[#2A784B] hover:bg-[#1E5736] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition hover:scale-105"
                                >
                                  다음 단계로 (나다움 문장 완성하기) ➔
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* [Step D: 나다움 문장 완성 및 최종 출력] */}
                      {lesson2Step === "D" && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                            <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-bold">D</span>
                              <span>[Step D] 나다움 4대 문장 완성하기 (학습지 연동)</span>
                            </h4>
                            <span className="text-xs font-batang text-teal-800 font-bold">
                              4개 창 결과가 자동으로 문장에 반영되었습니다 ✍️
                            </span>
                          </div>

                          <div className="space-y-4 font-batang text-sm sm:text-base">
                            {/* 열린 창 문장 */}
                            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-1">
                              <label className="text-xs font-dodum font-bold text-emerald-900 block">
                                ① 열린 창 문장:
                              </label>
                              <p className="text-gray-800 leading-relaxed">
                                &quot;나는 <strong className="text-emerald-800 underline decoration-wavy">{openArea.join(", ") || "배려와 끈기"}</strong>을(를) 가진 멋진 사람이다.&quot;
                              </p>
                            </div>

                            {/* 보이지 않는 창 문장 */}
                            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
                              <label className="text-xs font-dodum font-bold text-blue-900 block">
                                ② 보이지 않는 창 문장:
                              </label>
                              <p className="text-gray-800 leading-relaxed">
                                &quot;친구가 말하기를, 나는 <strong className="text-blue-800 underline decoration-wavy">{blindArea.join(", ") || "유머와 감사"}</strong>이(가) 있는 사람이래요.&quot;
                              </p>
                            </div>

                            {/* 숨겨진 창 문장 */}
                            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1">
                              <label className="text-xs font-dodum font-bold text-amber-900 block">
                                ③ 숨겨진 창 문장:
                              </label>
                              <p className="text-gray-800 leading-relaxed">
                                &quot;내가 생각하기에, 나는 <strong className="text-amber-800 underline decoration-wavy">{hiddenArea.join(", ") || "남모를 성실함"}</strong>도 지니고 있어요.&quot;
                              </p>
                            </div>

                            {/* 미지의 창 문장 */}
                            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-1">
                              <label className="text-xs font-dodum font-bold text-purple-900 block">
                                ④ 미지의 창 문장:
                              </label>
                              <p className="text-gray-800 leading-relaxed">
                                &quot;나는 앞으로 <strong className="text-purple-800 underline decoration-wavy">{unknownArea.join(", ") || "리더십과 낙관성"}</strong>을(를) 멋지게 키워나가고 싶어요.&quot;
                              </p>
                            </div>
                          </div>

                          {/* 똑똑똑 내 마음 두드리기 (성장 확인) & 이번 주 마음 미션 */}
                          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 space-y-4">
                            <h5 className="font-title text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                              <span>⭐</span> 똑똑똑 내 마음 두드리기 &amp; 이번 주 마음 미션
                            </h5>
                            <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2 text-xs font-batang">
                              <span className="font-bold text-gray-800">성장 확인: &quot;친구의 피드백을 통해 나의 새로운 강점을 발견했나요?&quot;</span>
                              <div className="flex gap-1.5 text-amber-500 text-lg">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button key={star} type="button" onClick={() => setLesson2Rating(star)} className="hover:scale-110 transition-transform">
                                    {star <= lesson2Rating ? "★" : "☆"}
                                  </button>
                                ))}
                                <span className="ml-2 text-xs font-dodum text-emerald-800 font-bold self-center">({lesson2Rating} / 5점)</span>
                              </div>
                            </div>
                            <div className="p-3.5 bg-[#1F6B38] text-white rounded-xl text-xs font-dodum font-bold flex items-center justify-between shadow-sm">
                              <span>🎯 이번 주 실천 미션: [아침마다 거울을 보며 나에게 힘이 나는 응원의 한마디 하기]</span>
                              <span>✨</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <button
                              type="button"
                              onClick={() => setLesson2Step("C")}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 이전 단계로 (Step C)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                triggerConfetti();
                                alert("조하리의 창 나다움 강점 문장이 성공적으로 기록되었습니다! ✨\n[마이페이지] 아카이브에 안전하게 보관되었습니다.");
                              }}
                              className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition hover:scale-105"
                            >
                              💾 2단계 강점 분석 완료 및 저장
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* 3단계: 가드너 8대 다중지능 & Keirsey 4가지 기질 & 나다움 가면 소개서 & 원본 활동 */}
                  {currentLesson === 3 && (
                    <div className="space-y-8">
                      {/* 3단계 상호작용 5단계 모듈: 다중지능 56문항 + 기질 36문항 + 나만의 브랜딩 카드 */}
                      <div className="bg-gradient-to-b from-[#EEF6F0] to-[#E3EFE6] p-6 sm:p-8 rounded-3xl border-2 border-[#1F6B38]/30 shadow-md space-y-6">
                        {/* 단계 타이틀 헤더 */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F6B38]/20 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-[#1F6B38] text-white rounded-full text-xs font-dodum font-bold shadow-sm">
                                🎭 3단계 특별 활동
                              </span>
                              <span className="text-xs font-batang text-[#1F6B38] font-bold">
                                가드너 8대 다중지능 & Keirsey 4가지 기질 탐색
                              </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-title font-bold text-[#144725]">
                              나를 표현하는 브랜딩카드 만들기: 당당하게 나를 표현하기
                            </h3>
                            <p className="text-xs sm:text-sm font-batang text-gray-700">
                              56문항 다중지능 검사와 36문항 성격 기질 검사를 통해 나만의 특별한 브랜딩 카드를 완성합니다.
                            </p>
                          </div>

                          {/* 5단계 스텝 인디케이터 */}
                          <div className="flex flex-wrap items-center gap-1 bg-white/90 p-1.5 rounded-2xl border border-[#1F6B38]/20 shadow-2xs">
                            {[
                              { num: 1, label: "사전예상" },
                              { num: 2, label: "다중지능(56)" },
                              { num: 3, label: "성격기질(36)" },
                              { num: 4, label: "브랜딩카드" },
                              { num: 5, label: "학급갤러리" }
                            ].map(s => (
                              <button
                                key={s.num}
                                type="button"
                                onClick={() => setLesson3Step(s.num)}
                                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition-all ${lesson3Step === s.num ? "bg-[#1F6B38] text-white shadow-sm scale-105" : "text-gray-600 hover:bg-emerald-50"}`}
                              >
                                {s.num}. {s.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* [Step 1: 검사 전 마음 열기 & 사전 예상] */}
                        {lesson3Step === 1 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between border-b pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">1</span>
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                  [Step 1] 검사 전 마음 열기 & 나의 재능 사전 예상하기
                                </h4>
                              </div>
                              <span className="text-xs font-dodum text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                🌱 마음가짐 준비
                              </span>
                            </div>

                            {/* 가드너 다중지능 이론 안내 & 8대 지능 캐릭터 도감 토글 가이드 */}
                            <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl border-2 border-[#1F6B38]/30 space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-[#144725]">
                                  <span className="text-2xl">💡</span>
                                  <span>가드너 8대 다중지능이란? 시작하기 전 마음 열기</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setIsGardnerTheoryOpen(!isGardnerTheoryOpen)}
                                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-dodum font-bold shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
                                >
                                  <span>{isGardnerTheoryOpen ? "닫기 ▲" : "8대 지능 캐릭터 도감 보기 ▼"}</span>
                                </button>
                              </div>

                              <ul className="text-xs sm:text-sm font-batang text-gray-800 space-y-1.5 leading-relaxed list-disc list-inside">
                                <li><strong>지능은 IQ 하나로만 결정되는 것이 아니에요!</strong> 사람은 누구나 저마다의 독특하고 빛나는 8가지 지능 보석을 지니고 있습니다.</li>
                                <li><strong>지능은 고정된 것이 아니라 노력과 경험에 따라 언제든 자라납니다.</strong> 점수에 연연하지 말고 나의 강점을 즐겁게 탐색해 보세요.</li>
                                <li>정답이 없으므로, 남의 눈치를 보지 말고 평소 나의 솔직한 모습을 떠올리며 응답해 주세요.</li>
                              </ul>

                              {/* 유튜브 링크 버튼 (가드너 8대 다중지능) - 교사 전용 */}
                              {isTeacherMode && (
                                <div className="p-4 bg-emerald-200/50 rounded-2xl border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">🎬</span>
                                    <div>
                                      <div className="text-xs sm:text-sm font-dodum font-bold text-emerald-950">
                                        [교사용 참고 영상] 가드너 8대 다중지능 이론 안내
                                      </div>
                                      <div className="text-[11px] font-batang text-emerald-800">
                                        클릭 시 새 창에서 관련 유튜브 영상이 열립니다.
                                      </div>
                                    </div>
                                  </div>
                                  <a
                                    href="https://youtu.be/PY-Jj6pyjME"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold shadow-sm transition flex items-center gap-1.5 shrink-0 hover:scale-105"
                                  >
                                    <span>▶ 유튜브 영상 열기</span>
                                    <span>🔗</span>
                                  </a>
                                </div>
                              )}

                              {/* 8대 지능 캐릭터 도감 그리드 (펼침 시) */}
                              {isGardnerTheoryOpen && (
                                <div className="pt-3 border-t border-emerald-200/80 space-y-3 animate-fadeIn">
                                  <div className="text-xs font-dodum font-bold text-emerald-950 flex items-center gap-1">
                                    <span>📚</span> 가드너가 밝혀낸 우리들의 8가지 대표 지능 캐릭터:
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                    {GARDNER_INTELLIGENCES.map(intel => (
                                      <div key={intel.id} className={`p-4 rounded-2xl border ${intel.bg} space-y-2 flex flex-col justify-between shadow-2xs`}>
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between">
                                            <span className="text-2xl">{intel.icon}</span>
                                            <span className="text-[10px] font-dodum font-bold px-2 py-0.5 rounded-full bg-white border">
                                              {intel.character}
                                            </span>
                                          </div>
                                          <h5 className="font-title font-bold text-sm text-gray-900">{intel.name}지능</h5>
                                          <p className="text-[11px] font-batang text-gray-700 leading-snug">
                                            {intel.ability}
                                          </p>
                                        </div>
                                        <div className="pt-2 border-t border-current/10 flex flex-wrap gap-1">
                                          {intel.keywords?.slice(0, 2).map(k => (
                                            <span key={k} className="text-[9px] font-dodum bg-white/80 px-1.5 py-0.5 rounded text-gray-700">
                                              {k}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* 사전 예상 픽커 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                              <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-3">
                                <span className="text-xs font-dodum font-bold text-blue-900 block">
                                  🎯 [사전 예상 1] 가장 높게 나올 것 같은 나의 지능은?
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                  {GARDNER_INTELLIGENCES.map(g => (
                                    <button
                                      key={g.name}
                                      type="button"
                                      onClick={() => setGardnerPredictedTop(g.name)}
                                      className={`p-2.5 rounded-xl text-xs font-dodum font-bold transition flex items-center justify-between ${gardnerPredictedTop === g.name ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-700 border border-blue-200 hover:bg-blue-100"}`}
                                    >
                                      <span>{g.icon} {g.name}지능</span>
                                      {gardnerPredictedTop === g.name && <span>✓</span>}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="p-5 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3">
                                <span className="text-xs font-dodum font-bold text-purple-900 block">
                                  ✨ [사전 예상 2] 앞으로 더 키우고 싶은 희망 지능은?
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                  {GARDNER_INTELLIGENCES.map(g => (
                                    <button
                                      key={g.name}
                                      type="button"
                                      onClick={() => setGardnerPredictedHope(g.name)}
                                      className={`p-2.5 rounded-xl text-xs font-dodum font-bold transition flex items-center justify-between ${gardnerPredictedHope === g.name ? "bg-purple-600 text-white shadow-sm" : "bg-white text-gray-700 border border-purple-200 hover:bg-purple-100"}`}
                                    >
                                      <span>{g.icon} {g.name}지능</span>
                                      {gardnerPredictedHope === g.name && <span>✓</span>}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end items-center pt-3 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => {
                                  setLesson3Step(2);
                                  triggerConfetti();
                                }}
                                className="px-6 py-3 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition hover:scale-105 flex items-center gap-2"
                              >
                                <span>가드너 56문항 다중지능 검사 시작하기</span>
                                <span>➔</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* [Step 2: 가드너 56문항 5점 리커트 척도 다중지능 검사] */}
                        {lesson3Step === 2 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">2</span>
                                  <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                    [Step 2] 가드너 8대 다중지능 56문항 검사
                                  </h4>
                                </div>
                                <p className="text-xs font-batang text-gray-500 mt-0.5">
                                  문항을 읽고 나에게 얼마나 해당하는지 1점(전혀 아니다)부터 5점(매우 그렇다)까지 선택해 주세요.
                                </p>
                              </div>

                              {/* 페이지 탭 & 프로그레스 */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                  {gardnerPage * 8 + 1}~{Math.min(56, (gardnerPage + 1) * 8)} / 56문항 (Page {gardnerPage + 1}/7)
                                </span>
                              </div>
                            </div>

                            {/* 7개 페이지 탭 버튼 */}
                            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-gray-100">
                              {[0, 1, 2, 3, 4, 5, 6].map(pageIdx => (
                                <button
                                  key={pageIdx}
                                  type="button"
                                  onClick={() => setGardnerPage(pageIdx)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${gardnerPage === pageIdx ? "bg-[#1F6B38] text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-emerald-50"}`}
                                >
                                  {pageIdx * 8 + 1}~{(pageIdx + 1) * 8}번
                                </button>
                              ))}
                            </div>

                            {/* 8문항 리스트 */}
                            <div className="space-y-4">
                              {GARDNER_56_QUESTIONS.slice(gardnerPage * 8, (gardnerPage + 1) * 8).map(q => {
                                const currentVal = gardnerAnswers[q.no] || 3;
                                return (
                                  <div key={q.no} className="p-4 rounded-2xl bg-gray-50/80 hover:bg-emerald-50/40 border border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
                                    <div className="space-y-1 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">
                                          {q.no}
                                        </span>
                                      </div>
                                      <p className="font-batang text-sm sm:text-base text-gray-900 font-medium pl-1">
                                        {q.text}
                                      </p>
                                    </div>

                                    {/* 5점 리커트 선택 버튼 바 */}
                                    <div className="flex items-center gap-1 sm:gap-1.5 self-center md:self-auto shrink-0 bg-white p-1 rounded-xl border border-gray-200">
                                      {[
                                        { score: 1, label: "전혀 아님" },
                                        { score: 2, label: "아님" },
                                        { score: 3, label: "보통" },
                                        { score: 4, label: "그렇다" },
                                        { score: 5, label: "매우 그렇다" }
                                      ].map(btn => (
                                        <button
                                          key={btn.score}
                                          type="button"
                                          onClick={() => {
                                            setGardnerAnswers({ ...gardnerAnswers, [q.no]: btn.score });
                                          }}
                                          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-dodum transition flex flex-col items-center gap-0.5 ${currentVal === btn.score ? "bg-[#1F6B38] text-white font-bold shadow-xs scale-105" : "text-gray-600 hover:bg-gray-100"}`}
                                        >
                                          <span className="font-mono text-xs">{btn.score}점</span>
                                          <span className="text-[10px] hidden sm:inline">{btn.label}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* 검사 진행 안내 (선입견 방지를 위해 실시간 집계는 결과 단계에서 공개) */}
                            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                              <p className="text-xs font-batang text-gray-600">
                                💡 모든 56문항에 솔직하게 응답하면 <strong>[Step 4] 종합 분석 리포트</strong>에서 나의 8대 다중지능 순위와 대표 재능이 멋지게 공개됩니다!
                              </p>
                            </div>

                            {/* 페이지 네비게이션 */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => {
                                  if (gardnerPage > 0) setGardnerPage(gardnerPage - 1);
                                  else setLesson3Step(1);
                                }}
                                className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                              >
                                ◀ 이전 {gardnerPage > 0 ? "페이지" : "단계"}
                              </button>

                              {gardnerPage < 6 ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setGardnerPage(gardnerPage + 1);
                                  }}
                                  className="px-6 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105"
                                >
                                  다음 8문항 풀기 ({gardnerPage + 2}/7) ➔
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLesson3Step(3);
                                    triggerConfetti();
                                  }}
                                  className="px-6 py-3 bg-gradient-to-r from-emerald-700 to-teal-700 hover:opacity-95 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105"
                                >
                                  다중지능 완료! 성격 기질 검사로 이동 ➔
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* [Step 3: Keirsey 4가지 기질 36문항 빙고/체크 덱] */}
                        {lesson3Step === 3 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">3</span>
                                  <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                    [Step 3] Keirsey 4가지 성격 기질 36문항 탐색
                                  </h4>
                                </div>
                                <p className="text-xs font-batang text-gray-500 mt-0.5">
                                  각 기질 카드를 읽고 &quot;이건 진짜 나다!&quot; 싶은 항목을 클릭하여 선택해 주세요.
                                </p>
                              </div>

                              <div className="text-xs font-dodum font-bold bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200">
                                선택된 카드: 총 {keirseyChecked.length}개
                              </div>
                            </div>

                            {/* 4대 기질 랭킹 요약 칩 */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {["SJ", "SP", "NT", "NF"].map(code => {
                                const t = KEIRSEY_TEMPERAMENTS[code];
                                const count = keirseyCounts[code];
                                const isTop = primaryTemperamentCode === code;
                                return (
                                  <div key={code} className={`p-3.5 rounded-2xl border-2 transition-all ${isTop ? "bg-emerald-50 border-[#1F6B38] shadow-sm" : "bg-gray-50 border-gray-200"}`}>
                                    <div className="flex items-center justify-between text-xs font-dodum">
                                      <span className="font-bold text-gray-800">{t.title.split(" ")[0]}</span>
                                      <span className="font-mono font-bold text-[#1F6B38] bg-white px-2 py-0.5 rounded-full border">{count}/9개</span>
                                    </div>
                                    <div className="text-[11px] font-batang text-gray-600 mt-1 line-clamp-1">{t.badge}</div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* 4대 기질별 9개 카드 그리드 (총 36개) */}
                            <div className="space-y-6">
                              {Object.values(KEIRSEY_TEMPERAMENTS).map(group => (
                                <div key={group.code} className="space-y-3">
                                  <div className="flex items-center justify-between border-b pb-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="font-title font-bold text-base text-gray-900">{group.title}</span>
                                      <span className="text-xs font-batang text-gray-500">({group.sub})</span>
                                    </div>
                                    <span className="text-xs font-dodum font-bold text-gray-600">
                                      {keirseyCounts[group.code]}개 선택됨
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                    {group.cards.map((card, idx) => {
                                      const cardId = `${group.code}_${idx}`;
                                      const isChecked = keirseyChecked.includes(cardId);
                                      return (
                                        <div
                                          key={cardId}
                                          onClick={() => {
                                            if (isChecked) {
                                              setKeirseyChecked(keirseyChecked.filter(id => id !== cardId));
                                            } else {
                                              setKeirseyChecked([...keirseyChecked, cardId]);
                                              triggerConfetti();
                                            }
                                          }}
                                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-2 select-none ${isChecked ? `${group.theme} border-current shadow-xs scale-[1.01]` : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                                        >
                                          <div className="space-y-1">
                                            <div className="font-title font-bold text-xs sm:text-sm flex items-center gap-1.5">
                                              <span>{isChecked ? "✅" : "⚪"}</span>
                                              <span>{card.trait}</span>
                                            </div>
                                            <p className="text-[11px] font-batang text-gray-600 leading-snug">
                                              {card.desc}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* 페이지 네비게이션 */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => setLesson3Step(2)}
                                className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                              >
                                ◀ 이전 단계로 (다중지능)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  // 자동으로 브랜딩 칭호 및 프리셋 바인딩
                                  const autoTitle = `${primaryTemperament.badge.split(" ")[1]} ${top1Intel.name} 전문가`;
                                  setMaskBioNickname(autoTitle);
                                  setMaskCallMeWhen(`${top1Intel.statement} 순간이나 ${primaryTemperament.title}의 도움이 필요할 때!`);
                                  setLesson3Step(4);
                                  triggerConfetti();
                                }}
                                className="px-6 py-3 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105"
                              >
                                종합 분석 & 나만의 브랜딩 카드 발급하기 ➔
                              </button>
                            </div>
                          </div>
                        )}

                        {/* [Step 4: 종합 분석 리포트 & 나만의 브랜딩 카드 작성] */}
                        {lesson3Step === 4 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between border-b pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">4</span>
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                  [Step 4] 종합 분석 리포트 & 나만의 브랜딩 카드 작성
                                </h4>
                              </div>
                              <span className="text-xs font-dodum text-[#1F6B38] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                자동 연동 완료 ✨
                              </span>
                            </div>

                            {/* 종합 진단 분석 리포트 & 또래 성향 매칭 (닮은 친구 vs 반대 매력 친구) */}
                            <div className="space-y-4">
                              <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl border-2 border-emerald-200 space-y-3">
                                <span className="text-xs font-dodum font-bold text-[#144725] block">
                                  🔍 {studentName} 학생의 심리검사 종합 분석 요약:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-batang text-gray-800">
                                  <div className="p-3.5 bg-white/90 rounded-2xl border border-emerald-200 space-y-1 shadow-2xs">
                                    <div className="font-title font-bold text-emerald-900 flex items-center justify-between">
                                      <span>🥇 다중지능 1·2위: {top1Intel.icon} {top1Intel.name}({top1Intel.score}점) & {top2Intel.icon} {top2Intel.name}({top2Intel.score}점)</span>
                                    </div>
                                    <p className="text-gray-600 leading-snug">
                                      👉 {top1Intel.statement}
                                    </p>
                                  </div>
                                  <div className="p-3.5 bg-white/90 rounded-2xl border border-emerald-200 space-y-1 shadow-2xs">
                                    <div className="font-title font-bold text-purple-900 flex items-center justify-between">
                                      <span>🛡️ 대표 성격 기질: {primaryTemperament.title} ({keirseyCounts[primaryTemperamentCode]}개 체크)</span>
                                    </div>
                                    <p className="text-gray-600 leading-snug">
                                      👉 &quot;{primaryTemperament.sub}&quot;
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* 🤝 1학년 3반 또래 시너지 매칭 (나와 닮은 친구 & 정반대 매력의 친구) */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {/* 나와 성향이 비슷한 친구 */}
                                <div className="p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-300 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-dodum font-bold flex items-center gap-1">
                                      <span>🤝</span> 나와 성향이 비슷한 친구
                                    </span>
                                    <span className="text-[11px] font-mono font-bold text-emerald-800">#{primaryTemperamentCode} · #{top1Intel.name}</span>
                                  </div>
                                  <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                                    <div className="text-xs font-bold font-title text-emerald-950">
                                      김하윤 (10306) & 조호진 (10323)
                                    </div>
                                    <p className="text-[11px] font-batang text-gray-600 leading-snug">
                                      💡 같은 {primaryTemperamentCode} 기질과 {top1Intel.name} 지능을 공유하여, 눈빛만 봐도 서로의 마음을 척척 이해하고 깊은 공감을 나눌 수 있어요!
                                    </p>
                                  </div>
                                </div>

                                {/* 나와 정반대의 매력을 가진 친구 */}
                                <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-300 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-xs font-dodum font-bold flex items-center gap-1">
                                      <span>⚡</span> 나와 정반대 매력의 시너지 친구
                                    </span>
                                    <span className="text-[11px] font-mono font-bold text-amber-800">
                                      #{primaryTemperamentCode === 'NF' ? 'ST' : primaryTemperamentCode === 'SJ' ? 'NP' : '보완기질'}
                                    </span>
                                  </div>
                                  <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                                    <div className="text-xs font-bold font-title text-amber-950">
                                      권현규 (10301) & 변해린 (10310)
                                    </div>
                                    <p className="text-[11px] font-batang text-gray-600 leading-snug">
                                      ✨ 서로 다른 기질과 강점을 지녀 모둠 활동에서 나의 부족한 점을 보완해 주고 새로운 시각을 넓혀주는 최고의 파트너예요!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 브랜딩 카드 빌더 & 홀로그램 카드 프리뷰 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* 좌측: 6대 항목 빌더 입력 폼 */}
                              <div className="space-y-3.5">
                                <div>
                                  <label className="text-xs font-dodum font-bold text-gray-700 block mb-1">
                                    1. [나만의 브랜딩 타이틀] ({top1Intel.name} 지능, {top2Intel.name} 지능 + {primaryTemperamentCode} 기질 결합)
                                  </label>
                                  <input
                                    type="text"
                                    value={maskBioNickname}
                                    onChange={(e) => setMaskBioNickname(e.target.value)}
                                    placeholder="예: 따뜻한 공감의 NF 대인관계 조율사"
                                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 font-batang text-xs sm:text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-dodum font-bold text-gray-700 block mb-1">
                                    2. [시그니처 해시태그]
                                  </label>
                                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-dodum font-bold text-emerald-900 flex flex-wrap gap-1.5">
                                    <span>#{primaryTemperamentCode}_기질</span>
                                    <span>#{top1Intel.name}_지능</span>
                                    <span>#{top2Intel.name}_지능</span>
                                    <span>#당당한_나다움</span>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs font-dodum font-bold text-gray-700 block mb-1">
                                    3. [남들이 보지 않을 때도 내가 가장 나다워지는 순간은?]
                                  </label>
                                  <input
                                    type="text"
                                    value={sentenceSelf}
                                    onChange={(e) => setSentenceSelf(e.target.value)}
                                    placeholder="예: 방에서 좋아하는 음악을 들으며 혼자 끄적일 때"
                                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 font-batang text-xs sm:text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-dodum font-bold text-gray-700 block mb-1">
                                    4. [친구들과 함께 있을 때 내가 가장 반짝이는 때는?]
                                  </label>
                                  <input
                                    type="text"
                                    value={sentenceJoy}
                                    onChange={(e) => setSentenceJoy(e.target.value)}
                                    placeholder="예: 친구들 이야기 묵묵히 들어주고 같이 웃어줄 때"
                                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 font-batang text-xs sm:text-sm"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-dodum font-bold text-gray-700 block mb-1">
                                    5. [이런 순간에 나를 불러줘! (나의 쓸모와 강점)]
                                  </label>
                                  <textarea
                                    rows="2"
                                    value={maskCallMeWhen}
                                    onChange={(e) => setMaskCallMeWhen(e.target.value)}
                                    placeholder="예: 수업 필기가 필요하거나 친구 사이에 화해가 필요할 때!"
                                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 font-batang text-xs sm:text-sm leading-relaxed"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-dodum font-bold text-gray-700 block mb-1">
                                    6. [스스로에게 전하는 당당한 응원 한마디]
                                  </label>
                                  <textarea
                                    rows="2"
                                    value={maskSelfCheer}
                                    onChange={(e) => setMaskSelfCheer(e.target.value)}
                                    placeholder="예: 남의 시선에 흔들리지 않고 나의 가치를 믿고 당당하게 나아갈 거야!"
                                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 font-batang text-xs sm:text-sm leading-relaxed"
                                  />
                                </div>
                              </div>

                              {/* 우측: 홀로그램 포토카드 실시간 프리뷰 */}
                              <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-800 via-teal-800 to-emerald-950 text-white shadow-xl space-y-4 border-2 border-emerald-300/40 relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="space-y-3 relative z-10">
                                  <div className="flex justify-between items-center text-xs font-mono text-emerald-200 border-b border-white/20 pb-2">
                                    <span>MIND PLAY BRANDING CARD</span>
                                    <span>1-3 {studentName}</span>
                                  </div>
                                  <div className="text-center py-1">
                                    <div className="text-3xl mb-1">🎭</div>
                                    <h5 className="text-lg font-title font-bold text-emerald-100">{maskBioNickname}</h5>
                                    <span className="text-[11px] font-batang text-emerald-200">1학년 3반 {studentId} {studentName}</span>
                                  </div>
                                  <div className="p-3 bg-black/25 rounded-2xl border border-white/15 space-y-2 text-xs font-batang leading-relaxed">
                                    <div>
                                      <strong className="text-emerald-300 block text-[11px] font-dodum">🌿 혼자 있을 때 나다워지는 순간:</strong>
                                      <p className="text-gray-100">{sentenceSelf}</p>
                                    </div>
                                    <div>
                                      <strong className="text-emerald-300 block text-[11px] font-dodum">✨ 친구들과 함께 반짝이는 때:</strong>
                                      <p className="text-gray-100">{sentenceJoy}</p>
                                    </div>
                                    <div>
                                      <strong className="text-emerald-300 block text-[11px] font-dodum">⚡ 나를 부르는 순간:</strong>
                                      <p className="text-gray-100">{maskCallMeWhen}</p>
                                    </div>
                                    <div>
                                      <strong className="text-emerald-300 block text-[11px] font-dodum">💖 나에게 보내는 응원:</strong>
                                      <p className="text-gray-100">{maskSelfCheer}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-2 text-[10px] font-dodum text-emerald-200 relative z-10">
                                  <span>#{primaryTemperamentCode}</span>
                                  <span>#{top1Intel.name}지능</span>
                                  <span>#{top2Intel.name}지능</span>
                                  {lesson3HashTags.slice(0, 2).map(t => <span key={t}>{t}</span>)}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                              <button
                                type="button"
                                onClick={() => setLesson3Step(3)}
                                className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                              >
                                ◀ 이전 단계로
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setLesson3Step(5);
                                  triggerConfetti();
                                }}
                                className="px-6 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105"
                              >
                                학급 갤러리 둘러보기 & 저장 ➔
                              </button>
                            </div>
                          </div>
                        )}

                        {/* [Step 5: 학급 갤러리 & 마음 다지기] */}
                        {lesson3Step === 5 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between border-b pb-3">
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">5</span>
                                <span>[Step 5] 1학년 3반 학급 브랜딩 카드 전시관 & 마음 다지기</span>
                              </h4>
                              <span className="text-xs font-dodum text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                                🏛️ 브랜딩 카드 전시관
                              </span>
                            </div>

                            {/* 학급 갤러리 피드 (자신을 제외한 모든 25명 친구 목록, 클릭 시 상세 모달) */}
                            <div className="space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                                  <span>🖼️</span> 1학년 3반 친구들의 브랜딩 카드 전시관 (이름을 클릭하여 카드 보기):
                                </span>
                                <span className="text-xs font-batang text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  총 {CLASS_STUDENTS.filter(s => s.studentId !== studentId).length}명의 친구 전시 중
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 max-h-[420px] overflow-y-auto p-1.5 bg-gray-50/70 rounded-2xl border border-gray-200">
                                {CLASS_STUDENTS.filter(s => s.studentId !== studentId).map((st, idx) => {
                                  // 25명 친구별 다채로운 지능/기질/문구 생성 데이터
                                  const titles = [
                                    { title: "논리적 문제해결 NT 탐구자", intels: "논리수학 지능, 공간 지능", mbti: "NT", when: "복잡한 보드게임 전략 짤 때", cheer: "포기하지 않고 끝까지 풀자!", call: "수학 문제 막히거나 퍼즐 풀 때" },
                                    { title: "에너지 넘치는 SP 모험가", intels: "신체운동 지능, 공간 지능", mbti: "SP", when: "체육 대회 축구할 때", cheer: "신나게 뛰며 순간을 즐기자!", call: "체육 활동이나 힘쓰는 일 있을 때" },
                                    { title: "따뜻한 공감의 NF 힐러", intels: "대인관계 지능, 자기성찰 지능", mbti: "NF", when: "친구들 이야기 묵묵히 들어줄 때", cheer: "네 편이 되어줄게 힘내자!", call: "마음속 깊은 고민을 털어놓고 싶을 때" },
                                    { title: "책임감 넘치는 SJ 수호자", intels: "언어 지능, 자기성찰 지능", mbti: "SJ", when: "학급 규칙 지키고 정리정돈할 때", cheer: "맡은 일은 끝까지 책임지자!", call: "학급 환경미화나 시간 체크할 때" },
                                    { title: "자연을 사랑하는 탐험가", intels: "자연관찰 지능, 음악 지능", mbti: "NF", when: "식물 키우고 음악 들을 때", cheer: "맑고 푸른 자연처럼 자라자!", call: "화단 가꾸기나 동물 돌볼 때" },
                                    { title: "창의적인 예술 창작가", intels: "공간 지능, 신체운동 지능", mbti: "SP", when: "자유롭게 그림 그리거나 만들 때", cheer: "나만의 색깔을 당당히 펼치자!", call: "포스터 그리거나 꾸미기 할 때" }
                                  ];
                                  const cardData = titles[idx % titles.length];
                                  return (
                                    <button
                                      key={st.studentId}
                                      type="button"
                                      onClick={() => setSelectedGalleryCard({ student: st, ...cardData })}
                                      className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-2xs hover:shadow-md hover:border-emerald-500 hover:scale-[1.03] transition-all text-left flex flex-col justify-between gap-1.5 group cursor-pointer"
                                    >
                                      <div className="flex items-center justify-between text-xs font-batang w-full">
                                        <span className="font-mono font-bold text-gray-500 text-[10px]">{st.studentId}</span>
                                        <span className="text-[10px] font-dodum font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                          #{cardData.mbti}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="font-title font-bold text-sm text-gray-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                                          <span>🌸</span> {st.name}
                                        </div>
                                        <div className="text-[11px] font-dodum text-emerald-900 font-bold line-clamp-1 mt-0.5">
                                          {cardData.title}
                                        </div>
                                      </div>
                                      <div className="text-[10px] font-dodum text-gray-400 text-right pt-1 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-emerald-600 font-bold">카드 열람</span>
                                        <span>🔍</span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 팝업 모달: 친구 브랜딩 카드 상세 보기 */}
                            {selectedGalleryCard && (
                              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                                <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative border-2 border-emerald-300">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedGalleryCard(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition"
                                  >
                                    ✕
                                  </button>

                                  {/* 홀로그램 카드 디자인 */}
                                  <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-800 via-teal-800 to-emerald-950 text-white shadow-xl space-y-4 border-2 border-emerald-300/40 relative overflow-hidden">
                                    <div className="flex justify-between items-center text-xs font-mono text-emerald-200 border-b border-white/20 pb-2">
                                      <span>MIND PLAY BRANDING CARD</span>
                                      <span>1-3 {selectedGalleryCard.student.name}</span>
                                    </div>
                                    <div className="text-center py-1">
                                      <div className="text-3xl mb-1">🎭</div>
                                      <div className="text-xs font-dodum text-emerald-300 font-bold">
                                        {selectedGalleryCard.intels}이 발달한
                                      </div>
                                      <h5 className="text-xl font-title font-bold text-white mt-0.5">
                                        {selectedGalleryCard.title}
                                      </h5>
                                      <span className="text-xs font-batang text-emerald-200">
                                        1학년 3반 {selectedGalleryCard.student.studentId} {selectedGalleryCard.student.name}
                                      </span>
                                    </div>
                                    <div className="p-3 bg-black/25 rounded-2xl border border-white/15 space-y-2 text-xs font-batang leading-relaxed">
                                      <div>
                                        <strong className="text-emerald-300 block text-[11px] font-dodum">🌿 혼자 있을 때 나다워지는 순간:</strong>
                                        <p className="text-gray-100">{selectedGalleryCard.when}</p>
                                      </div>
                                      <div>
                                        <strong className="text-emerald-300 block text-[11px] font-dodum">⚡ 나를 부르는 순간:</strong>
                                        <p className="text-gray-100">{selectedGalleryCard.call}</p>
                                      </div>
                                      <div>
                                        <strong className="text-emerald-300 block text-[11px] font-dodum">💖 나에게 보내는 응원:</strong>
                                        <p className="text-gray-100">&quot;{selectedGalleryCard.cheer}&quot;</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-dodum text-emerald-200">
                                      <span>#{selectedGalleryCard.mbti}기질</span>
                                      <span>#1학년3반</span>
                                      <span>#당당한_나다움</span>
                                    </div>
                                  </div>

                                  <div className="flex justify-end pt-1">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedGalleryCard(null)}
                                      className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm"
                                    >
                                      확인 및 닫기
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 똑똑똑 내 마음 두드리기 (별점 평가) & 이번 주 미션 */}
                            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 space-y-4">
                              <h5 className="font-title text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                                <span>⭐</span> 똑똑똑 내 마음 두드리기 & 이번 주 마음 미션
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-batang">
                                <div className="space-y-1 bg-white p-3.5 rounded-xl border border-emerald-100">
                                  <span>Q1. 나의 다양한 지능과 특성을 당당하게 표현했나요?</span>
                                  <div className="flex gap-1 pt-1 text-amber-500 text-base">
                                    {[1, 2, 3, 4, 5].map(star => (
                                      <button key={star} type="button" onClick={() => setLesson3Rating1(star)}>
                                        {star <= lesson3Rating1 ? "★" : "☆"}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-1 bg-white p-3.5 rounded-xl border border-emerald-100">
                                  <span>Q2. 친구들의 서로 다른 재능을 존중하는 마음을 가졌나요?</span>
                                  <div className="flex gap-1 pt-1 text-amber-500 text-base">
                                    {[1, 2, 3, 4, 5].map(star => (
                                      <button key={star} type="button" onClick={() => setLesson3Rating2(star)}>
                                        {star <= lesson3Rating2 ? "★" : "☆"}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="p-3 bg-emerald-800 text-white rounded-xl text-xs font-dodum font-bold flex items-center justify-between">
                                <span>🎯 이번 주 실천 미션: [하루 한 번 나를 칭찬하고 당당하게 표현하기]</span>
                                <span>✨</span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                              <button
                                type="button"
                                onClick={() => setLesson3Step(4)}
                                className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                              >
                                ◀ 이전 단계로
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  triggerConfetti();
                                  alert("3단계 나만의 브랜딩 카드 및 심리검사 결과가 성공적으로 저장되었습니다! 🎭\n[마이페이지] 아카이브에 안전하게 보관되었습니다.");
                                }}
                                className="px-6 py-3 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition hover:scale-105"
                              >
                                💾 3단계 모든 활동 완료 및 저장
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 4단계: Step 0 내 감정 알아차리기 & 특별활동 듀얼 마음 편지 */}
                  {currentLesson === 4 && (
                    <div className="space-y-8 animate-fadeIn">
                      {/* 4단계 메인 헤더 배너 */}
                      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                              🎯 4단계 마음활동
                            </span>
                            <span className="text-xs font-batang text-pink-100 font-bold">
                              영역 ❷ 나를 표현하기
                            </span>
                          </div>
                          {/* Step 0 vs 특별활동(Step 1~4) 전환 탭 버튼 */}
                          <div className="flex items-center bg-black/25 p-1 rounded-2xl backdrop-blur">
                            <button
                              type="button"
                              onClick={() => setLesson4Step(0)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${lesson4Step === 0 ? "bg-white text-rose-700 shadow-sm scale-105" : "text-white/80 hover:text-white"}`}
                            >
                              ① Step 0. 감정 알아차리기 🍹
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson4Step(1)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${lesson4Step >= 1 ? "bg-white text-indigo-700 shadow-sm scale-105" : "text-white/80 hover:text-white"}`}
                            >
                              ② [특별활동] 듀얼 마음 편지 💌
                            </button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-title font-bold">
                            04. 내 감정을 알고 싶어: 복합 감정 믹서 &amp; 치유 주크박스
                          </h3>
                          <p className="text-xs sm:text-sm font-batang text-pink-100 leading-relaxed mt-1">
                            &quot;그냥 짜증나&quot;라는 단순한 말 뒤에 숨겨진 <strong>33가지 진짜 내 감정</strong>을 믹서기로 구체화하고, 공감 챗봇 마음이 및 치유 음악과 함께 다스려보세요.
                          </p>
                        </div>
                      </div>

                      {/* ========================================================================= */}
                      {/* [Step 0: 내 감정 알아차리기 - 3대 핵심 서브 활동] */}
                      {/* ========================================================================= */}
                      {lesson4Step === 0 && (
                        <div className="space-y-6">
                          {/* Step 0 내부 서브 네비게이션 탭 */}
                          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap gap-2 items-center justify-between">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setLesson4SubTab("mixer")}
                                className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1.5 ${lesson4SubTab === "mixer" ? "bg-pink-600 text-white shadow-sm" : "bg-gray-50 text-gray-700 hover:bg-pink-50"}`}
                              >
                                <span>🍹</span>
                                <span>① 33종 감정 칵테일 믹서기</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setLesson4SubTab("chatbot")}
                                className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1.5 ${lesson4SubTab === "chatbot" ? "bg-rose-600 text-white shadow-sm" : "bg-gray-50 text-gray-700 hover:bg-rose-50"}`}
                              >
                                <span>🤖</span>
                                <span>② 공감 챗봇 마음이와 핑퐁</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setLesson4SubTab("jukebox")}
                                className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1.5 ${lesson4SubTab === "jukebox" ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-50 text-gray-700 hover:bg-indigo-50"}`}
                              >
                                <span>📻</span>
                                <span>③ 우리 반 감정 치유 주크박스</span>
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setLesson4Step(1)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1 hover:scale-105"
                            >
                              <span>다음 특별활동(듀얼 편지) ➔</span>
                            </button>
                          </div>

                          {/* ① 33종 감정 스펙트럼 칵테일 믹서기 */}
                          {lesson4SubTab === "mixer" && (
                            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fadeIn">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                                <div>
                                  <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-sm">🍹</span>
                                    <span>[활동 1] 33종 감정 스펙트럼 칵테일 믹서기</span>
                                  </h4>
                                  <p className="text-xs font-batang text-gray-500 mt-0.5">
                                    목적: &quot;그냥 짜증나&quot;를 넘어 내면의 복합 감정(서운함, 억울함, 조급함, 무기력 등)을 시각적으로 구체화합니다.
                                  </p>
                                </div>
                                <span className="text-xs font-dodum text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                                  감정 3~4개 선택 및 슬라이더 조절
                                </span>
                              </div>

                              {/* 칵테일 비주얼 믹스 블렌딩 프리뷰 & 슬라이더 컨트롤 */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                {/* 좌측: 내 마음의 감정 칵테일 비주얼 믹스 잔 */}
                                <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-lg space-y-4 flex flex-col items-center justify-between text-center relative overflow-hidden">
                                  <div className="space-y-1">
                                    <span className="text-xs font-dodum font-bold text-pink-300">
                                      MY EMOTION COCKTAIL GLASS
                                    </span>
                                    <h5 className="text-lg font-title font-bold text-white">
                                      {studentName}의 마음 칵테일 믹스
                                    </h5>
                                  </div>

                                  {/* 칵테일 잔 SVG / 레이어 실시간 블렌딩 */}
                                  <div className="w-48 h-64 relative flex flex-col items-center justify-end p-2 border-4 border-white/40 rounded-b-[60px] rounded-t-lg bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
                                    {/* 상단 칵테일 데코 */}
                                    <div className="absolute top-2 right-4 text-2xl animate-bounce">🍒</div>
                                    <div className="absolute top-4 left-4 text-xl">🍋</div>
                                    
                                    {/* 블렌딩 레이어 스택 */}
                                    <div className="w-full flex flex-col-reverse justify-start h-full rounded-b-[48px] overflow-hidden">
                                      {cocktailEmotions.map((item, idx) => (
                                        <div
                                          key={idx}
                                          style={{
                                            height: `${Math.max(10, item.percent)}%`,
                                            backgroundColor: item.color,
                                            opacity: 0.85
                                          }}
                                          className="w-full transition-all duration-300 flex items-center justify-center text-white text-[11px] font-dodum font-bold shadow-inner relative group border-t border-white/20"
                                        >
                                          <span className="drop-shadow-md">{item.word} {item.percent}%</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 감정 분석 한 줄 요약 */}
                                  <div className="p-3 bg-white/10 rounded-2xl text-xs font-batang text-pink-100 border border-white/15 w-full">
                                    현재 내 마음의 주요 조합: <strong>{cocktailEmotions.map(e => `${e.word} ${e.percent}%`).join(" + ")}</strong>
                                  </div>
                                </div>

                                {/* 우측: 33종 단어 선택 및 슬라이더 조절기 */}
                                <div className="lg:col-span-7 space-y-5">
                                  {/* 선택된 감정 비율 슬라이더 */}
                                  <div className="space-y-3 bg-pink-50/50 p-5 rounded-2xl border border-pink-200">
                                    <h5 className="text-xs font-dodum font-bold text-pink-950 flex items-center justify-between">
                                      <span>🎚️ 선택된 감정 비율 조절 (0~100%)</span>
                                      <span className="text-[11px] text-pink-700 font-normal">슬라이더를 움직여 비율을 맞추세요</span>
                                    </h5>
                                    
                                    <div className="space-y-3">
                                      {cocktailEmotions.map((item, idx) => (
                                        <div key={idx} className="space-y-1 bg-white p-3 rounded-xl border border-pink-100 shadow-2xs">
                                          <div className="flex justify-between items-center text-xs font-dodum">
                                            <span className="font-bold flex items-center gap-1.5" style={{ color: item.color }}>
                                              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color }}></span>
                                              {item.word}
                                            </span>
                                            <span className="font-mono font-bold text-gray-800">{item.percent}%</span>
                                          </div>
                                          <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={item.percent}
                                            onChange={(e) => {
                                              const val = parseInt(e.target.value);
                                              setCocktailEmotions(prev => prev.map((em, i) => i === idx ? { ...em, percent: val } : em));
                                            }}
                                            className="w-full h-2 rounded-lg cursor-pointer accent-pink-600 bg-gray-200"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 33종 감정 단어 사전 칩 (클릭하여 믹서기에 추가/교체) */}
                                  <div className="space-y-2">
                                    <label className="text-xs font-dodum font-bold text-gray-800 flex items-center justify-between">
                                      <span>📖 33종 감정 단어 사전에서 내 감정 선택 (클릭하여 믹서기에 담기):</span>
                                      <span className="text-[11px] font-batang text-gray-500">최대 4개 선택</span>
                                    </label>
                                    <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2.5 bg-gray-50 rounded-2xl border border-gray-200">
                                      {EMOTION_33_SPECTRUM.map((item) => {
                                        const isSelected = cocktailEmotions.some(e => e.word === item.word);
                                        return (
                                          <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => {
                                              if (isSelected) {
                                                if (cocktailEmotions.length > 1) {
                                                  setCocktailEmotions(cocktailEmotions.filter(e => e.word !== item.word));
                                                } else {
                                                  alert("최소 1개 이상의 감정이 믹서기에 담겨 있어야 합니다.");
                                                }
                                              } else {
                                                if (cocktailEmotions.length < 4) {
                                                  setCocktailEmotions([...cocktailEmotions, { word: item.word, percent: 50, color: item.color }]);
                                                } else {
                                                  alert("믹서기에는 최대 4개의 감정을 조합할 수 있습니다. 기존 감정을 클릭해 뺀 후 추가해 보세요!");
                                                }
                                              }
                                            }}
                                            className={`px-2.5 py-1 rounded-xl text-xs font-dodum transition-all flex items-center gap-1 ${isSelected ? "bg-slate-900 text-white font-bold shadow-xs scale-105" : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-200 shadow-2xs"}`}
                                            title={item.desc}
                                          >
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span>{item.word}</span>
                                            {isSelected && <span className="text-pink-300">✓</span>}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end pt-2 border-t">
                                <button
                                  type="button"
                                  onClick={() => setLesson4SubTab("chatbot")}
                                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105 flex items-center gap-1.5"
                                >
                                  <span>이 감정으로 공감 챗봇 마음이와 대화하기</span>
                                  <span>➔</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* ② 내 마음을 알아채는 '공감 챗봇 마음이'와 핑퐁 (사건 & 욕구 털어놓기) */}
                          {lesson4SubTab === "chatbot" && (
                            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fadeIn">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                                <div>
                                  <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-sm">🤖</span>
                                    <span>[활동 2] 내 마음을 알아채는 공감 챗봇 &apos;마음이&apos;와 핑퐁</span>
                                  </h4>
                                  <p className="text-xs font-batang text-gray-500 mt-0.5">
                                    목적: 믹서기로 고른 감정의 원인(사건과 숨겨진 욕구)을 판단 없이 안전하게 털어놓고 위로받기.
                                  </p>
                                </div>
                                <span className="text-xs font-dodum text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                                  2단계 핑퐁 질문 &amp; 답변
                                </span>
                              </div>

                              {/* 챗봇 인터랙티브 대화 폼 */}
                              <div className="space-y-4 max-w-3xl mx-auto bg-rose-50/40 p-6 rounded-3xl border border-rose-200">
                                {/* 챗봇 발문 1 */}
                                <div className="flex items-start gap-3 animate-fadeIn">
                                  <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                                    마음이
                                  </div>
                                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-rose-200 text-xs sm:text-sm font-batang text-gray-800 leading-relaxed shadow-2xs space-y-1">
                                    <p className="font-bold text-rose-900">
                                      &quot;{cocktailEmotions.map(e => `${e.word} ${e.percent}%`).slice(0, 2).join(", ")}가 나왔네. 가슴이 턱 막혔을 것 같아. 그때 구체적으로 어떤 일이 있었는지 편하게 들려줄래?&quot;
                                    </p>
                                  </div>
                                </div>

                                {/* 학생 입력 1: 구체적 사건 */}
                                <div className="space-y-2 pl-12">
                                  <label className="text-xs font-dodum font-bold text-gray-700 flex items-center gap-1">
                                    <span>✍️</span> 학생 입력 1 (구체적 사건):
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={chatbotEventInput}
                                      onChange={(e) => setChatbotEventInput(e.target.value)}
                                      placeholder="예: 친구들이 모둠 과제 안 하고 폰만 보는데 나 혼자 다 제출했음"
                                      className="flex-1 p-3 bg-white rounded-xl border border-rose-300 text-xs sm:text-sm font-batang focus:ring-2 focus:ring-rose-400 outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (chatbotEventInput.trim()) {
                                          setIsChatbotStep2Open(true);
                                          triggerConfetti();
                                        } else {
                                          alert("구체적인 사건 내용을 적어주세요!");
                                        }
                                      }}
                                      className="px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-dodum font-bold shrink-0 transition"
                                    >
                                      답변 전송 💬
                                    </button>
                                  </div>
                                </div>

                                {/* 챗봇 발문 2 (Step 1 전송 후 노출) */}
                                {isChatbotStep2Open && (
                                  <div className="space-y-4 pt-4 border-t border-rose-200/60 animate-fadeIn">
                                    <div className="flex items-start gap-3">
                                      <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                                        마음이
                                      </div>
                                      <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-rose-200 text-xs sm:text-sm font-batang text-gray-800 leading-relaxed shadow-2xs space-y-1">
                                        <p className="font-bold text-rose-900">
                                          &quot;혼자 짐을 다 짊어져서 정말 답답하고 힘들었겠다. 그때 속으로 친구들에게 바랐던 진짜 마음은 뭐였어?&quot;
                                        </p>
                                      </div>
                                    </div>

                                    {/* 학생 입력 2: 진짜 욕구 */}
                                    <div className="space-y-2 pl-12">
                                      <label className="text-xs font-dodum font-bold text-gray-700 flex items-center gap-1">
                                        <span>💡</span> 학생 입력 2 (진짜 욕구와 바람):
                                      </label>
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          value={chatbotDesireInput}
                                          onChange={(e) => setChatbotDesireInput(e.target.value)}
                                          placeholder="예: 역할을 공평하게 나눠서 같이 끝내고 싶었어"
                                          className="flex-1 p-3 bg-white rounded-xl border border-rose-300 text-xs sm:text-sm font-batang focus:ring-2 focus:ring-rose-400 outline-none"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (chatbotDesireInput.trim()) {
                                              setIsChatbotPingPongDone(true);
                                              triggerConfetti();
                                              alert("🎉 마음이와의 대화가 완성되었습니다! 내 안의 진짜 욕구를 알아채는 멋진 성장을 이루었어요 ✨");
                                            } else {
                                              alert("친구들에게 바랐던 진짜 마음을 적어주세요!");
                                            }
                                          }}
                                          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-dodum font-bold shrink-0 transition"
                                        >
                                          마음 확인 완료 ✨
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {isChatbotPingPongDone && (
                                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-900 text-xs font-batang space-y-1 animate-fadeIn">
                                    <span className="font-bold font-dodum text-emerald-950 flex items-center gap-1">
                                      <span>🌿</span> 마음이의 따뜻한 공감 피드백:
                                    </span>
                                    <p>
                                      &quot;{studentName}야, 네가 화가 나고 억울했던 건 네 안에 <strong>&apos;함께 협력하고 존중받고 싶다는 소중한 욕구&apos;</strong>가 있었기 때문이야. 네 마음은 너무나 자연스럽고 소중해.&quot;
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t">
                                <button
                                  type="button"
                                  onClick={() => setLesson4SubTab("mixer")}
                                  className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                >
                                  ◀ 감정 믹서기로
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setLesson4SubTab("jukebox")}
                                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105 flex items-center gap-1.5"
                                >
                                  <span>음악으로 마음 치유하러 가기</span>
                                  <span>➔</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* ③ 우리 반 감정 치유 주크박스 (유튜브 플레이리스트 등록) */}
                          {lesson4SubTab === "jukebox" && (
                            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6 animate-fadeIn">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                                <div>
                                  <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-sm">📻</span>
                                    <span>[활동 3] 우리 반 감정 치유 주크박스 (YouTube 플레이리스트)</span>
                                  </h4>
                                  <p className="text-xs font-batang text-gray-500 mt-0.5">
                                    목적: 음악과 연결하여 감정을 배출하고 위로받기 (비공개 학교 계정 제약 해결).
                                  </p>
                                </div>
                                <span className="text-xs font-dodum text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                                  1학년 3반 실시간 음악 보드
                                </span>
                              </div>

                              {/* 추천곡 입력 등록 폼 */}
                              <form onSubmit={handleAddJukebox} className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200 space-y-4">
                                <h5 className="text-xs font-dodum font-bold text-indigo-950 flex items-center gap-1.5">
                                  <span>🎵</span> 나만의 힐링 추천곡 등록하기:
                                </h5>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-dodum">
                                  {/* 감정 테마 선택 */}
                                  <div className="space-y-1">
                                    <label className="text-gray-700 font-bold block">감정 테마</label>
                                    <select
                                      value={jukeboxTheme}
                                      onChange={(e) => setJukeboxTheme(e.target.value)}
                                      className="w-full p-2.5 bg-white rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    >
                                      <option value="화가 날 때">화가 날 때 🌋</option>
                                      <option value="고민·불안할 때">고민·불안할 때 🌊</option>
                                      <option value="외로울 때">외로울 때 🍂</option>
                                      <option value="기쁠 때">기쁠 때 🎈</option>
                                    </select>
                                  </div>

                                  {/* 가수명 */}
                                  <div className="space-y-1">
                                    <label className="text-gray-700 font-bold block">가수명</label>
                                    <input
                                      type="text"
                                      value={jukeboxArtist}
                                      onChange={(e) => setJukeboxArtist(e.target.value)}
                                      placeholder="예: DAY6 (데이식스)"
                                      className="w-full p-2.5 bg-white rounded-xl border border-indigo-200 font-batang focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                  </div>

                                  {/* 노래 제목 */}
                                  <div className="space-y-1">
                                    <label className="text-gray-700 font-bold block">노래 제목</label>
                                    <input
                                      type="text"
                                      value={jukeboxTitle}
                                      onChange={(e) => setJukeboxTitle(e.target.value)}
                                      placeholder="예: 한 페이지가 될 수 있게"
                                      className="w-full p-2.5 bg-white rounded-xl border border-indigo-200 font-batang focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                  </div>

                                  {/* 유튜브 영상 링크 */}
                                  <div className="space-y-1">
                                    <label className="text-gray-700 font-bold block">YouTube 링크 주소</label>
                                    <input
                                      type="text"
                                      value={jukeboxUrl}
                                      onChange={(e) => setJukeboxUrl(e.target.value)}
                                      placeholder="https://youtu.be/..."
                                      className="w-full p-2.5 bg-white rounded-xl border border-indigo-200 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                  </div>
                                </div>

                                {/* 추천 한마디 */}
                                <div className="space-y-1">
                                  <label className="text-xs font-dodum font-bold text-gray-700 block">추천 한마디 (친구들에게 전하는 힐링 포인트)</label>
                                  <input
                                    type="text"
                                    value={jukeboxComment}
                                    onChange={(e) => setJukeboxComment(e.target.value)}
                                    placeholder="이 노래의 신나는 밴드 사운드를 들으면 억울했던 마음이 시원하게 풀려요!"
                                    className="w-full p-2.5 bg-white rounded-xl border border-indigo-200 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                  />
                                </div>

                                <div className="flex justify-end pt-1">
                                  <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105 flex items-center gap-1.5"
                                  >
                                    <span>주크박스에 음악 올리기</span>
                                    <span>💿</span>
                                  </button>
                                </div>
                              </form>

                              {/* 1학년 3반 주크박스 카드 그리드 보드 */}
                              <div className="space-y-3">
                                <h5 className="text-xs font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                                  <span>📻</span> 1학년 3반 친구들의 힐링 음악 보드 (클릭하여 듣기)
                                </h5>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                  {classJukeboxList.map((track) => (
                                    <div
                                      key={track.id}
                                      className="p-4 bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                                    >
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-dodum font-bold bg-indigo-100 text-indigo-900">
                                            {track.theme}
                                          </span>
                                          <span className="text-[11px] font-batang text-gray-400">
                                            {track.author} 추천
                                          </span>
                                        </div>
                                        <div>
                                          <h6 className="font-title font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-indigo-700">
                                            {track.title}
                                          </h6>
                                          <p className="text-xs font-dodum text-gray-500 line-clamp-1">
                                            {track.artist}
                                          </p>
                                        </div>
                                        <p className="text-xs font-batang text-gray-600 bg-indigo-50/50 p-2 rounded-xl border border-indigo-50 line-clamp-2 italic">
                                          &quot;{track.comment}&quot;
                                        </p>
                                      </div>

                                      <div className="pt-2 border-t flex items-center justify-between text-xs font-dodum">
                                        <a
                                          href={track.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-red-600 hover:underline flex items-center gap-1 font-bold text-[11px]"
                                        >
                                          <span>▶ YouTube 듣기</span>
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => handleToggleJukeboxLike(track.id)}
                                          className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition ${track.liked ? "bg-rose-50 border-rose-300 text-rose-600" : "bg-gray-50 border-gray-200 text-gray-600"}`}
                                        >
                                          <span>{track.liked ? "❤️" : "🤍"}</span>
                                          <span>{track.likes}</span>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t">
                                <button
                                  type="button"
                                  onClick={() => setLesson4SubTab("chatbot")}
                                  className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                >
                                  ◀ 공감 챗봇으로
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setLesson4Step(1)}
                                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105 flex items-center gap-1.5"
                                >
                                  <span>[특별활동] 듀얼 마음 편지 쓰러 가기</span>
                                  <span>➔</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {/* 똑똑똑 내 마음 두드리기 (성장 별점 Q1, Q2) & 함께 실천하는 마음 미션 */}
                          <div className="p-6 bg-gradient-to-r from-pink-50 via-rose-50 to-indigo-50 rounded-3xl border-2 border-pink-200 shadow-sm space-y-4">
                            <h5 className="font-title text-base font-bold text-rose-950 flex items-center gap-2">
                              <span>⭐</span> 똑똑똑 내 마음 두드리기 &amp; 함께 실천하는 마음 미션
                            </h5>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-batang">
                              {/* Q1 */}
                              <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-2xs space-y-2">
                                <span className="font-bold text-gray-800 block">
                                  Q1. 내 안에 섞여 있는 다양한 감정을 솔직하게 알아챘나요?
                                </span>
                                <div className="flex items-center gap-1.5 text-amber-500 text-lg">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} type="button" onClick={() => setLesson4Q1Rating(star)} className="hover:scale-110 transition-transform">
                                      {star <= lesson4Q1Rating ? "★" : "☆"}
                                    </button>
                                  ))}
                                  <span className="ml-2 text-xs font-dodum text-rose-800 font-bold">({lesson4Q1Rating} / 5점)</span>
                                </div>
                              </div>

                              {/* Q2 */}
                              <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-2xs space-y-2">
                                <span className="font-bold text-gray-800 block">
                                  Q2. 부정적인 감정이 들었을 때 음악이나 호흡으로 다스릴 준비가 되었나요?
                                </span>
                                <div className="flex items-center gap-1.5 text-amber-500 text-lg">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} type="button" onClick={() => setLesson4Q2Rating(star)} className="hover:scale-110 transition-transform">
                                      {star <= lesson4Q2Rating ? "★" : "☆"}
                                    </button>
                                  ))}
                                  <span className="ml-2 text-xs font-dodum text-rose-800 font-bold">({lesson4Q2Rating} / 5점)</span>
                                </div>
                              </div>
                            </div>

                            {/* 함께 실천하는 마음 미션 */}
                            <div className="p-4 bg-gradient-to-r from-rose-600 to-indigo-700 text-white rounded-2xl text-xs font-dodum font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-md">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">🎯</span>
                                <span>함께 실천하는 마음 미션: [하루 한 번 &apos;내 감정에 이름 붙이기&apos; 챌린지]</span>
                              </div>
                              <span className="text-pink-200 font-normal italic">
                                (예: &quot;지금 내 마음은 억울함 60%에 서운함 40%야&quot;)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ========================================================================= */}
                      {/* [특별활동: 감사와 미안함을 전하는 듀얼 마음 편지 (Step 1~4 보존)] */}
                      {/* ========================================================================= */}
                      {lesson4Step >= 1 && (
                        <div className="bg-gradient-to-b from-[#EBF2FA] to-[#DFEAF5] p-6 sm:p-8 rounded-3xl border-2 border-[#1E4E8C]/30 shadow-md space-y-6">
                          {/* 듀얼 편지 타이틀 헤더 */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E4E8C]/20 pb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#1E4E8C] text-white rounded-full text-xs font-dodum font-bold shadow-sm">
                                  💌 4단계 특별 활동
                                </span>
                                <span className="text-xs font-batang text-[#1E4E8C] font-bold">
                                  감사와 미안함을 전하는 듀얼 마음 편지
                                </span>
                              </div>
                              <h4 className="text-2xl sm:text-3xl font-title font-bold text-[#143560]">
                                진심을 담은 별명 듀얼 마음 엽서
                              </h4>
                              <p className="text-xs sm:text-sm font-batang text-gray-700">
                                평소 쑥스러워 묻어두었던 <strong>감사함</strong>과 타이밍을 놓쳤던 <strong>미안함</strong>을 별명 엽서로 솔직하게 전해보세요.
                              </p>
                            </div>

                            {/* 4단계 스텝 인디케이터 */}
                            <div className="flex items-center gap-1 bg-white/90 p-1.5 rounded-2xl border border-[#1E4E8C]/20 shadow-2xs">
                              <button
                                type="button"
                                onClick={() => setLesson4Step(0)}
                                className="px-3 py-1.5 rounded-xl text-xs font-dodum font-bold text-rose-700 hover:bg-rose-50"
                              >
                                ◀ Step 0. 감정인식
                              </button>
                              {[
                                { num: 1, label: "마음 편지" },
                                { num: 2, label: "감정 체크" },
                                { num: 3, label: "듀얼 엽서" },
                                { num: 4, label: "마음 다지기" }
                              ].map(s => (
                                <button
                                  key={s.num}
                                  type="button"
                                  onClick={() => setLesson4Step(s.num)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition-all ${lesson4Step === s.num ? "bg-[#1E4E8C] text-white shadow-sm scale-105" : "text-gray-600 hover:bg-blue-50"}`}
                                >
                                  Step {s.num}. {s.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* [Step 1: 오늘의 마음 편지 (열기)] */}
                          {lesson4Step === 1 && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-fadeIn">
                              <div className="flex items-center justify-between border-b pb-3">
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-[#1E4E8C] text-white flex items-center justify-center text-sm font-bold">1</span>
                                  <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                    [Step 1] 4단계 마음 편지 열기
                                  </h4>
                                </div>
                                <span className="text-xs font-dodum text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                                  📮 빨간 우체통 배달
                                </span>
                              </div>

                              <div className="p-6 bg-[#EBF2FA] rounded-2xl border-2 border-[#1E4E8C]/30 space-y-4 relative overflow-hidden">
                                <div className="flex items-center gap-3">
                                  <span className="text-3xl">📮</span>
                                  <div>
                                    <span className="text-xs font-dodum font-bold text-[#1E4E8C]">워크북 29~36쪽 연동</span>
                                    <h5 className="text-base font-title font-bold text-gray-900">내 감정을 정확히 알면 나와 친구 모두와 잘 지낼 수 있어!</h5>
                                  </div>
                                </div>
                                <blockquote className="font-batang text-sm sm:text-base text-gray-800 leading-relaxed bg-white/90 p-5 rounded-xl border border-[#1E4E8C]/20 italic">
                                  &quot;일상생활 속에서 내가 느끼는 감정이 무엇인지 알면 나 자신과 잘 지내고, 친구들과도 더욱 깊이 마음을 나눌 수 있게 돼. 우리 모두 자신의 솔직한 감정에 대해 한번 알아볼까?&quot;
                                </blockquote>
                                <div className="flex items-center justify-between pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setLesson4Step(0)}
                                    className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                  >
                                    ◀ Step 0. 감정 알아차리기로
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setLesson4Step(2)}
                                    className="px-6 py-2.5 bg-[#1E4E8C] hover:bg-[#143560] text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105"
                                  >
                                    내 감정 들여다보러 가기 ➔
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* [Step 2: 마음 만나기 (감사 & 미안함 상황 직접 작성)] */}
                          {lesson4Step === 2 && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                              <div className="flex items-center justify-between border-b pb-3">
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-[#1E4E8C] text-white flex items-center justify-center text-sm font-bold">2</span>
                                  <span>[Step 2] 일상 감정 상황 체크 (고마웠던 순간 &amp; 미안했던 순간)</span>
                                </h4>
                                <span className="text-xs font-batang text-[#1E4E8C] font-bold">
                                  감사 · 미안함 상황 탐색
                                </span>
                              </div>

                              {/* 1. 고마웠던 순간 골라보기 및 작성 */}
                              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-3">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-amber-950 flex items-center gap-1.5">
                                  <span>💡</span> 활동 A. 평소 고마웠던 순간 (예시 참고 후 직접 작성):
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {[
                                    "수학 문제 친절하게 알려줬을 때 📐",
                                    "체육 시간 배구 서브 실패했을 때 다독여줌 🏐",
                                    "급식 맛있는 반찬 양보해 줬을 때 🍱",
                                    "비 올 때 우산 같이 씌워줬을 때 ☔"
                                  ].map((chip, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white text-amber-900 rounded-xl text-[11px] font-batang border border-amber-300 font-medium">
                                      예시: {chip}
                                    </span>
                                  ))}
                                </div>
                                <div>
                                  <label className="text-xs font-dodum font-bold text-amber-900 block mb-1">
                                    내가 떠올린 고마웠던 순간 직접 적어보기:
                                  </label>
                                  <textarea
                                    rows="2"
                                    value={thanksReason}
                                    onChange={(e) => setThanksReason(e.target.value)}
                                    placeholder="친구, 가족, 선생님에게 고마웠던 구체적인 순간을 적어보세요..."
                                    className="w-full p-3 bg-white rounded-xl border border-amber-300 font-batang text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-400"
                                  />
                                </div>
                              </div>

                              {/* 2. 미안했던 순간 골라보기 및 작성 */}
                              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-teal-950 flex items-center gap-1.5">
                                  <span>🩹</span> 활동 B. 평소 마음에 걸렸거나 미안했던 순간 (예시 참고 후 직접 작성):
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {[
                                    "내 짜증을 묵묵히 다 받아줬을 때 🌧️",
                                    "단톡방 답장 늦게 보냈던 미안한 순간 💬",
                                    "장난치다 선 넘어서 어색해졌을 때 🙇",
                                    "청소 당번 대신해 줬을 때 🧹"
                                  ].map((chip, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white text-teal-900 rounded-xl text-[11px] font-batang border border-teal-300 font-medium">
                                      예시: {chip}
                                    </span>
                                  ))}
                                </div>
                                <div>
                                  <label className="text-xs font-dodum font-bold text-teal-900 block mb-1">
                                    내가 떠올린 미안했던 순간 직접 적어보기:
                                  </label>
                                  <textarea
                                    rows="2"
                                    value={sorryAdmit}
                                    onChange={(e) => setSorryAdmit(e.target.value)}
                                    placeholder="마음에 걸렸거나 사과하고 싶었던 구체적인 순간을 적어보세요..."
                                    className="w-full p-3 bg-white rounded-xl border border-teal-300 font-batang text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-400"
                                  />
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <button
                                  type="button"
                                  onClick={() => setLesson4Step(1)}
                                  className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                >
                                  ◀ 이전 단계로
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setLesson4Step(3)}
                                  className="px-6 py-2.5 bg-[#1E4E8C] hover:bg-[#143560] text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105"
                                >
                                  듀얼 마음 편지 작성하기 ➔
                                </button>
                              </div>
                            </div>
                          )}

                          {/* [Step 3: 마음 키우기 (별명으로 부르는 듀얼 마음 편지 작성기)] */}
                          {lesson4Step === 3 && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                              <div className="flex items-center justify-between border-b pb-3">
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-[#1E4E8C] text-white flex items-center justify-center text-sm font-bold">3</span>
                                  <span>[Step 3] 별명으로 부르는 듀얼 마음 편지 작성</span>
                                </h4>
                                <span className="text-xs font-dodum text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                                  익명화 닉네임 + 감사 &amp; 미안함
                                </span>
                              </div>

                              {/* 인터랙션 1: 수신인 별명 예시 및 입력 */}
                              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                                <label className="text-xs font-dodum font-bold text-gray-800 block">
                                  🏷️ 수신인 다정한 별명 짓기 (실명 대신 별명 입력):
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {["매점에서 빵 사준 착한 짝꿍", "매일 아침 깨워주는 우리 집 대장님", "공부 도와주는 수학 요정", "묵묵히 내 편 들어주는 든든한 친구"].map(alias => (
                                    <span
                                      key={alias}
                                      className="px-3 py-1 bg-white text-gray-600 border border-gray-200 rounded-xl text-xs font-batang"
                                    >
                                      예시: {alias}
                                    </span>
                                  ))}
                                </div>
                                <input
                                  type="text"
                                  value={lesson4TargetNickname}
                                  onChange={(e) => setLesson4TargetNickname(e.target.value)}
                                  placeholder="받을 친구의 다정한 별명을 입력해 주세요 (예: 체육 시간 배구 짝꿍)..."
                                  className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs sm:text-sm font-batang mt-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                />
                              </div>

                              {/* 듀얼 카드 작성 그리드 */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* 1. 찰칵~ 감사 한 컷 편지 */}
                                <div className="p-6 bg-gradient-to-b from-amber-50 to-orange-50/60 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
                                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                                    <span className="text-xs font-dodum font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
                                      📷 찰칵~ 감사 한 컷 편지
                                    </span>
                                    <span className="text-xs font-batang text-amber-800 font-bold">To. {lesson4TargetNickname}</span>
                                  </div>

                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-xs font-dodum font-bold text-amber-950 block mb-1">
                                        고마웠던 구체적인 이유:
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={thanksReason}
                                        onChange={(e) => setThanksReason(e.target.value)}
                                        placeholder="어떤 순간에 고마움을 느꼈는지 적어보세요..."
                                        className="w-full p-3 bg-white rounded-xl border border-amber-200 font-batang text-xs sm:text-sm leading-relaxed"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs font-dodum font-bold text-amber-950 block mb-1">
                                        전하고 싶은 진심:
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={thanksBody}
                                        onChange={(e) => setThanksBody(e.target.value)}
                                        placeholder="친구에게 전하고 싶은 따뜻한 감사의 말을 적어보세요..."
                                        className="w-full p-3 bg-white rounded-xl border border-amber-200 font-batang text-xs sm:text-sm leading-relaxed"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* 2. 토닥토닥 미안함 회복 편지 */}
                                <div className="p-6 bg-gradient-to-b from-teal-50 to-emerald-50/60 rounded-3xl border-2 border-teal-300 shadow-sm space-y-4">
                                  <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                                    <span className="text-xs font-dodum font-bold text-teal-900 bg-teal-200/80 px-3 py-1 rounded-full">
                                      🩹 토닥토닥 미안함 회복 (인사약)
                                    </span>
                                    <span className="text-xs font-batang text-teal-800 font-bold">인정 · 사과 · 약속</span>
                                  </div>

                                  <div className="space-y-3 text-xs sm:text-sm font-batang">
                                    <div>
                                      <label className="text-xs font-dodum font-bold text-teal-950 block mb-1">
                                        [인정] 내 잘못 인정하기:
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={sorryAdmit}
                                        onChange={(e) => setSorryAdmit(e.target.value)}
                                        placeholder="내가 ~했던 거, 내 잘못인 거 알아..."
                                        className="w-full p-3 bg-white rounded-xl border border-teal-200 font-batang text-xs sm:text-sm leading-relaxed"
                                      />
                                    </div>
                                    <div className="p-2.5 bg-white/80 rounded-xl border border-teal-200 text-teal-900 text-xs italic">
                                      [사과] &quot;변명 없이 진심으로 사과할게. 정말 미안해.&quot;
                                    </div>
                                    <div>
                                      <label className="text-xs font-dodum font-bold text-teal-950 block mb-1">
                                        [약속] 앞으로의 다짐과 행동 변화:
                                      </label>
                                      <textarea
                                        rows="2"
                                        value={sorryPromise}
                                        onChange={(e) => setSorryPromise(e.target.value)}
                                        placeholder="앞으로는 ~하도록 노력할게!"
                                        className="w-full p-3 bg-white rounded-xl border border-teal-200 font-batang text-xs sm:text-sm leading-relaxed"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <button
                                  type="button"
                                  onClick={() => setLesson4Step(2)}
                                  className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                >
                                  ◀ 이전 단계로
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLesson4Step(4);
                                    setIsDualLetterSaved(true);
                                    triggerConfetti();
                                  }}
                                  className="px-6 py-2.5 bg-[#1E4E8C] hover:bg-[#143560] text-white rounded-xl text-xs font-dodum font-bold shadow transition hover:scale-105"
                                >
                                  듀얼 엽서 발급 &amp; 마음 다지기 ➔
                                </button>
                              </div>
                            </div>
                          )}

                          {/* [Step 4: 마음 다지기 (익명 갤러리 & 미션 & 평가)] */}
                          {lesson4Step === 4 && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                              <div className="flex items-center justify-between border-b pb-3">
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-[#1E4E8C] text-white flex items-center justify-center text-sm font-bold">4</span>
                                  <span>[Step 4] 별명 듀얼 마음 엽서 최종 렌더 &amp; 실천 미션</span>
                                </h4>
                                <span className="text-xs font-batang text-emerald-800 font-bold">
                                  엽서 발급 완료 ✨
                                </span>
                              </div>

                              {/* 듀얼 엽서 최종 렌더링 카드 */}
                              <div className="p-6 bg-gradient-to-r from-amber-50 via-white to-teal-50 rounded-3xl border-2 border-[#1E4E8C]/30 shadow-md space-y-4">
                                <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b pb-2">
                                  <span>DUAL HEART POSTCARD</span>
                                  <span>보낸이: 1-3 {studentName} ({studentId})</span>
                                </div>
                                <div className="text-center font-title font-bold text-lg text-gray-900">
                                  💌 To. <span className="text-[#1E4E8C] underline decoration-wavy">{lesson4TargetNickname}</span> 에게
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-batang">
                                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1.5">
                                    <span className="font-dodum font-bold text-amber-900 block text-xs">💛 고마웠던 순간 (감사 한 컷)</span>
                                    <p className="text-gray-800">{thanksReason}</p>
                                    <p className="text-gray-700 italic border-t border-amber-100 pt-1">&quot;{thanksBody}&quot;</p>
                                  </div>
                                  <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200 space-y-1.5">
                                    <span className="font-dodum font-bold text-teal-900 block text-xs">💚 미안했던 마음 회복 (인사약)</span>
                                    <p className="text-gray-800">{sorryAdmit}</p>
                                    <p className="text-gray-700 italic border-t border-teal-100 pt-1">&quot;{sorryPromise}&quot;</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-2">
                                <button
                                  type="button"
                                  onClick={() => setLesson4Step(3)}
                                  className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                >
                                  ◀ 이전 단계로
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const saveData = {
                                      studentId,
                                      studentName,
                                      savedAt: new Date().toLocaleString("ko-KR"),
                                      lesson: 4,
                                      targetNickname: lesson4TargetNickname,
                                      thanksReason,
                                      thanksBody,
                                      sorryAdmit,
                                      sorryPromise,
                                      rating1: lesson4Rating1,
                                      rating2: lesson4Rating2,
                                    };
                                    try {
                                      const all = JSON.parse(localStorage.getItem("mindplay_lesson4_records") || "{}");
                                      all[studentId] = saveData;
                                      localStorage.setItem("mindplay_lesson4_records", JSON.stringify(all));
                                    } catch(e) {}
                                    handleCompleteLesson(4);
                                    triggerConfetti();
                                    alert("💌 4단계 복합 감정 믹서 & 듀얼 마음 엽서가 마이페이지에 안전하게 저장되었습니다!");
                                  }}
                                  className="px-6 py-3 bg-[#1E4E8C] hover:bg-[#143560] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition hover:scale-105"
                                >
                                  💾 4단계 모든 활동 완료 및 저장
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5단계: 4-7-8 호흡 가이드 */}
                  {currentLesson === 5 && (
                    <div className="space-y-6 bg-teal-50/70 p-6 rounded-3xl border border-teal-200">
                      <div className="text-center space-y-1">
                        <span className="text-xs font-dodum font-bold bg-teal-200 text-teal-900 px-3 py-1 rounded-full">
                          🌬️ 긴급 SOS 4-7-8 마음 안정 호흡 가이드
                        </span>
                        <h3 className="text-base font-title font-bold text-teal-950 mt-2">
                          가슴이 답답하고 불안할 땐, 호흡에 온 마음을 집중해보세요
                        </h3>
                      </div>

                      {/* YouTube Video Guide & Interactive Timer Side-by-side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* YouTube Embed */}
                        <div className="space-y-2">
                          <div className="text-xs font-dodum font-bold text-teal-800 flex items-center gap-1.5">
                            <span>▶️ 마음 안정 호흡 영상 가이드 (YouTube)</span>
                          </div>
                          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-teal-300 shadow-md bg-black">
                            <iframe
                              className="w-full h-full"
                              src="https://www.youtube.com/embed/yJusPHbdbA8"
                              title="4-7-8 마음 안정 호흡 가이드"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <p className="text-[11px] font-batang text-teal-700 text-center">
                            * 영상을 보며 편안한 자세로 호흡을 따라 해보세요.
                          </p>
                        </div>

                        {/* Interactive Breathing Bubble */}
                        <div className="p-6 bg-white/80 rounded-2xl border border-teal-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                          <span className="text-xs font-dodum font-bold text-teal-900">
                            🫧 나만의 인터랙티브 호흡 타이머
                          </span>
                          <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 text-teal-950 flex items-center justify-center text-xs font-title font-bold shadow-lg transition-transform duration-1000 ${breathStep === "inhale" ? "scale-125" : breathStep === "hold" ? "scale-125 ring-8 ring-teal-200" : "scale-100"}`}>
                            {breathStep === "inhale" && "들이마시기 (4초)"}
                            {breathStep === "hold" && "숨 참기 (7초)"}
                            {breathStep === "exhale" && "내쉬기 (8초)"}
                            {breathStep === "idle" && "호흡 시작 버튼"}
                          </div>
                          <div className="flex flex-col gap-1 w-full max-w-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setBreathStep("inhale");
                                setTimeout(() => setBreathStep("hold"), 4000);
                                setTimeout(() => setBreathStep("exhale"), 11000);
                                setTimeout(() => setBreathStep("idle"), 19000);
                              }}
                              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-dodum font-bold shadow transition-all"
                            >
                              4-7-8 호흡 사이클 시작 (19초) ▶
                            </button>
                            <span className="text-[10px] text-gray-500 font-batang">
                              4초 흡기 ➔ 7초 멈춤 ➔ 8초 호기
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6단계: ABCD 생각 뒤집기 */}
                  {currentLesson === 6 && (
                    <div className="space-y-4 bg-amber-50/70 p-6 rounded-3xl border border-amber-200">
                      <span className="text-xs font-dodum font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
                        🃏 비합리적 생각 브레이커: ABCD 생각 뒤집기 카드
                      </span>
                      <div 
                        onClick={() => setIsAbcdFlipped(!isAbcdFlipped)}
                        className={`flip-card cursor-pointer p-6 rounded-3xl border-2 transition-all shadow-md ${isAbcdFlipped ? "bg-emerald-600 text-white border-emerald-700" : "bg-white text-gray-800 border-amber-300"}`}
                      >
                        {!isAbcdFlipped ? (
                          <div className="space-y-2">
                            <span className="text-xs font-dodum text-rose-600 font-bold block">🚨 자동적 부정 생각 (A-B)</span>
                            <h4 className="text-base font-title font-bold">"친구에게 인사했는데 안 받아줬어. 걔는 분명 나를 싫어해."</h4>
                            <p className="text-xs text-gray-500 font-dodum">👉 카드를 탭하여 합리적 생각(D-E)으로 뒤집어 보세요!</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-xs font-dodum text-emerald-200 font-bold block">✨ 생각 뒤집기 성공! (D-E)</span>
                            <h4 className="text-base font-title font-bold">"이어폰을 끼고 있거나 딴생각을 하느라 못 들었을 수도 있어. 쉬는 시간에 다시 가볍게 말 걸어보자!"</h4>
                            <p className="text-xs text-emerald-100 font-dodum">👉 다시 탭하면 앞면으로 돌아갑니다.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 7단계: 통제 분리수거 */}
                  {currentLesson === 7 && (
                    <div className="space-y-4 bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200">
                      <span className="text-xs font-dodum font-bold bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full">
                        🗑️ 내 마음 통제 분리수거
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-2xl border border-red-200 space-y-2">
                          <h4 className="text-xs font-dodum font-bold text-red-900">❌ 내가 바꿀 수 없는 것 (흘려보내기)</h4>
                          <ul className="text-xs font-batang space-y-1 text-red-800">
                            {sortedItems.cannot.map((it, idx) => <li key={idx}>• {it}</li>)}
                          </ul>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                          <h4 className="text-xs font-dodum font-bold text-emerald-900">⭕ 내가 바꿀 수 있는 것 (집중하기)</h4>
                          <ul className="text-xs font-batang space-y-1 text-emerald-800">
                            {sortedItems.can.map((it, idx) => <li key={idx}>• {it}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 8단계: 오히려 좋아 슬롯머신 */}
                  {currentLesson === 8 && (
                    <div className="space-y-4 bg-rose-50/70 p-6 rounded-3xl border border-rose-200 text-center">
                      <span className="text-xs font-dodum font-bold bg-rose-200 text-rose-900 px-3 py-1 rounded-full">
                        🎰 '오히려 좋아!' 역발상 슬롯머신
                      </span>
                      <div className="p-6 bg-white rounded-2xl border border-rose-300 space-y-3">
                        <div className="text-base font-title font-bold text-rose-950">
                          {slotResult}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const samples = [
                              "급식 메뉴가 싫어하는 거 나옴 ➔ 집밥이 10배 더 맛있어질 테니 오히려 좋아! 🍚",
                              "체육 시간 비 와서 강당 수업 ➔ 땀 덜 흘리고 시원해서 오히려 좋아! 🌧️",
                              "시험에서 실수로 하나 틀림 ➔ 진짜 시험 전 약점을 찾았으니 오히려 좋아! 💯"
                            ];
                            setSlotResult(samples[Math.floor(Math.random() * samples.length)]);
                            triggerConfetti();
                          }}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold"
                        >
                          슬롯머신 돌리기 🔄
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 9~15단계 요약 퀘스트 */}
                  {currentLesson >= 9 && (
                    <div className="space-y-3 bg-blue-50/70 p-6 rounded-3xl border border-blue-200 text-center">
                      <h3 className="font-title text-base font-bold text-blue-950">
                        ✨ 【{currentLesson}단계 인터랙티브 퀘스트】
                      </h3>
                      <p className="font-batang text-base text-blue-900">
                        {currentLesson === 9 && "💮 '아~ 너는 그렇게 생각하는구나!' 학급 밸런스 게임 다름 인정 도장 완료!"}
                        {currentLesson === 10 && "❤️ 4단계 공감 톡 답장을 완성하여 [공감 마스터 뱃지]를 획득했습니다."}
                        {currentLesson === 11 && "💬 공격적인 너-전달법을 [나사감바] 부드러운 대화 카드로 정화했습니다."}
                        {currentLesson === 12 && "🕊️ 인사약(인정-사과-약속) 황금 사과 레시피를 완성했습니다."}
                        {currentLesson === 13 && "⚖️ 나비효과 저울을 비교하고 책임 있는 선택을 내렸습니다."}
                        {currentLesson === 14 && "🏰 모둠 협동 7층 마음 카드 타워를 무사히 완공했습니다."}
                        {currentLesson === 15 && "🎓 1단계 타임캡슐을 열고 친구들과의 디지털 롤링페이퍼를 완성했습니다."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

            {/* TAB 2: 감정일기 쓰기 (1~15회차 선택기 ➔ 감정구름/AI챗봇/그림일기 작성) */}
            {currentTab === "diary" && (
              <div className="space-y-6 animate-fadeIn">
                {/* 1) 1~15회차 미선택 시: 회차 선택 카드 그리드 노출 */}
                {selectedDiaryLesson === null && (
                  <div className="space-y-6">
                    {/* 상단 헤더 배너 */}
                    <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                          📝 1~15회차 마음성장 감정일기
                        </span>
                        <span className="text-xs font-mono font-bold text-white/90">
                          {studentName} ({nickname})
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h2 className="text-2xl sm:text-3xl font-title font-bold">
                          일기를 작성할 회차를 선택해 주세요 ✨
                        </h2>
                        {isTeacherMode && (
                          <a
                            href="https://youtu.be/PzweJS3SOng?si=GVtpsA3oF6SFzNUb&t=7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-dodum font-bold shadow-md transition hover:scale-105 shrink-0"
                          >
                            <span>▶</span>
                            <span>[교사용] 감정일기 지도 참고 영상 보기</span>
                            <span className="text-[10px] bg-red-800/80 px-1.5 py-0.5 rounded">YouTube</span>
                          </a>
                        )}
                      </div>
                      <p className="font-batang text-xs sm:text-sm text-rose-50 leading-relaxed">
                        원하는 회차를 클릭하면 10가지 감정구름 캐릭터 선택 및 AI 마음 챗봇 대화, 그림일기 작성이 시작됩니다.
                      </p>
                    </div>

                    {/* 1~15회차 선택 카드 그리드 (간소화: 회차 번호 + 미작성/작성완료 상태만 깔끔하게 노출) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                      {CURRICULUM.map(c => {
                        const d = diaries[c.no];
                        const isDone = !!d && (!!d.content || !!d.image);
                        return (
                          <div
                            key={c.no}
                            onClick={() => {
                              setSelectedDiaryLesson(c.no);
                              setCurrentLesson(c.no);
                              if (d) {
                                setCurrentDiaryInput({
                                  title: d.title || `${c.no}회차 나의 마음 이야기`,
                                  content: d.content || ""
                                });
                                if (d.image) setCurrentDiaryImage(d.image);
                                if (d.emotion) setSelectedEmotionId(d.emotion);
                              } else {
                                setCurrentDiaryInput({
                                  title: `${c.no}회차 나의 마음 이야기`,
                                  content: ""
                                });
                                setCurrentDiaryImage("");
                              }
                            }}
                            className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between text-center gap-3 shadow-xs hover:shadow-md hover:-translate-y-1 ${isDone ? "bg-gradient-to-b from-rose-50/60 to-white border-rose-300 hover:border-rose-400" : "bg-white border-gray-200 hover:border-rose-300"}`}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl font-bold font-mono shadow-inner">
                              {c.no}
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="text-base font-title font-bold text-gray-900">
                                {c.no}회차 일기
                              </h3>
                              <div>
                                {isDone ? (
                                  <span className="text-[11px] font-dodum font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 inline-block">
                                    ✓ 작성 완료
                                  </span>
                                ) : (
                                  <span className="text-[11px] font-dodum font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200 inline-block">
                                    미작성
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="w-full py-1.5 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-700 rounded-xl text-xs font-dodum font-bold transition shadow-2xs"
                            >
                              일기 쓰기 ✍️
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2) 1~15회차 중 특정 회차를 선택했을 때: 감정구름 + AI챗봇 + 그림일기 본문 */}
                {selectedDiaryLesson !== null && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* 상단 네비게이션 & 회차 배너 */}
                    <div className="bg-gradient-to-r from-rose-500 to-orange-400 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedDiaryLesson(null)}
                            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-dodum font-bold transition flex items-center gap-1"
                          >
                            <span>◀</span>
                            <span>다른 회차 선택하기</span>
                          </button>
                          <span className="px-3 py-1 bg-black/20 rounded-full text-xs font-dodum font-bold">
                            {selectedDiaryLesson}회차 마음성장 일기장
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white/90">
                          {studentName} ({nickname})
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h2 className="text-2xl sm:text-3xl font-title font-bold">
                          【{selectedDiaryLesson}회차】 오늘 나의 마음 구름을 골라 일기를 써보세요
                        </h2>
                        {isTeacherMode && (
                          <a
                            href="https://youtu.be/PzweJS3SOng?si=GVtpsA3oF6SFzNUb&t=7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-dodum font-bold shadow transition hover:scale-105 shrink-0"
                          >
                            <span>▶</span>
                            <span>[교사용] 감정일기 참고 영상</span>
                          </a>
                        )}
                      </div>
                      <p className="font-batang text-sm text-rose-50 leading-relaxed">
                        오늘 하루 나를 스쳐 지나간 감정을 솔직하게 마주하고, 챗봇과 대화하며 나만의 따뜻한 한 줄을 기록합니다.
                      </p>
                    </div>

                    {/* 10종 감정 구름 캐릭터 선택기 */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
                      <div>
                        <h3 className="font-title text-base font-bold text-gray-900 flex items-center gap-2 mb-1">
                          <span>🎨</span> 10가지 파스텔 감정 구름 캐릭터
                        </h3>
                        <p className="text-xs font-batang text-gray-500">
                          오늘 활동을 시작하기 전, 나의 마음과 가장 닮은 귀여운 구름 친구를 클릭해 보세요.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {EMOTION_CHARACTERS.map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setSelectedEmotionId(c.id);
                              triggerConfetti();
                            }}
                            className={`p-3.5 rounded-3xl border-2 transition-all flex flex-col items-center justify-between text-center gap-1.5 relative overflow-hidden ${selectedEmotionId === c.id ? `${c.border} ${c.bg} shadow-md scale-105 ring-2 ring-rose-400/40` : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"}`}
                          >
                            <div className="h-16 flex items-center justify-center">
                              {c.svg}
                            </div>
                            <div className="w-full">
                              <span className={`text-[11px] font-dodum font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${c.badgeBg}`}>
                                {c.name}
                              </span>
                              <p className="text-[11px] font-batang text-gray-600 line-clamp-1 italic">
                                "{c.quote}"
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* 선택된 감정 캐릭터 카드 배너 */}
                      <div className={`p-5 rounded-2xl border ${selectedEmotionObj.border} ${selectedEmotionObj.bg} flex items-center gap-4`}>
                        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                          {selectedEmotionObj.svg}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-title text-base font-bold text-gray-900">
                              {selectedEmotionObj.name} 구름 선택됨
                            </span>
                            <span className="text-xs font-dodum font-bold px-2 py-0.5 rounded-full bg-white border text-gray-700">
                              {selectedEmotionObj.tag}
                            </span>
                          </div>
                          <p className="font-batang text-sm text-gray-700 italic">
                            "{selectedEmotionObj.quote}"
                          </p>
                        </div>
                      </div>

                      {/* 일기 작성 전: 인공지능 마음 챗봇 대화방 */}
                      <div className="bg-rose-50/60 rounded-3xl p-5 sm:p-6 border-2 border-rose-200 space-y-4 shadow-sm" id="chatbot-section">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200/70 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-sm shadow-sm">🤖</span>
                            <div>
                              <h4 className="font-title text-base font-bold text-gray-900 flex items-center gap-2">
                                <span>{chatbotName ? `[${chatbotName}] 챗봇과 나누는 감정 탐색` : "나만의 마음 친구 챗봇 이름 짓기"}</span>
                                {isBotNameLocked && (
                                  <span className="text-[10px] font-dodum bg-rose-200 text-rose-800 px-2 py-0.5 rounded-md font-bold">
                                    🔒 이름 확정됨
                                  </span>
                                )}
                              </h4>
                              <p className="text-[11px] font-batang text-gray-500">
                                7단계 질문을 따라 내 감정과 숨은 바람을 차분히 알아차려 보세요.
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-dodum text-rose-800 bg-white px-3 py-1 rounded-full border border-rose-200 font-bold self-start sm:self-auto shadow-2xs">
                            🌱 감정 탐색 {chatStep}/7단계
                          </span>
                        </div>

                        {/* 챗봇 커스텀 이름 설정 영역 (최초 1회 설정 후 잠금) */}
                        {!isBotNameLocked ? (
                          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-rose-300 flex flex-col sm:flex-row items-center gap-3 animate-fadeIn">
                            <div className="text-xs font-batang text-rose-950 flex-1">
                              ✨ <strong>챗봇에게 특별한 이름을 지어주세요:</strong> 한 번 정한 이름은 나만의 짝꿍으로 계속 기억됩니다. (수정 불가)
                            </div>
                            <div className="flex w-full sm:w-auto gap-2">
                              <input
                                type="text"
                                value={chatbotNameInput}
                                onChange={(e) => setChatbotNameInput(e.target.value)}
                                placeholder="예: 구름이, 토닥이, 별이"
                                className="px-3.5 py-2 rounded-xl border border-rose-300 text-xs font-dodum focus:ring-2 focus:ring-rose-400 outline-none flex-1 sm:w-48"
                              />
                              <button
                                type="button"
                                onClick={handleConfirmBotName}
                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold shrink-0 transition"
                              >
                                확정하기 🔒
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-white/80 rounded-2xl border border-rose-200 flex items-center justify-between text-xs font-batang text-gray-700">
                            <span>🤝 마음 짝꿍 챗봇: <strong className="text-rose-700 font-bold">{chatbotName}</strong></span>
                            <span className="text-[11px] text-gray-400">친절하고 따뜻하게 귀 기울여 듣고 있어요</span>
                          </div>
                        )}

                        {/* 챗봇 메시지 히스토리 스크롤 박스 */}
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 bg-white/70 p-4 rounded-2xl border border-rose-100 shadow-inner">
                          {chatMessages.map((msg, idx) => (
                            <div
                              key={idx}
                              className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-2xs ${msg.sender === "user" ? "bg-amber-500 text-white" : "bg-rose-500 text-white"}`}>
                                {msg.sender === "user" ? "나" : "🤖"}
                              </div>
                              <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm font-batang leading-relaxed shadow-2xs whitespace-pre-line ${msg.sender === "user" ? "bg-amber-100 text-amber-950 rounded-tr-none border border-amber-200" : "bg-white text-gray-800 rounded-tl-none border border-rose-100"}`}>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* 챗봇 추천 감정/욕구 단어 칩 (다중 선택 및 즉시 전송) */}
                        <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-rose-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-dodum font-bold text-gray-700 flex items-center gap-1">
                              <span>💡</span>
                              <span>지금 마음에 맴도는 감정 단어를 클릭해 보세요 (복수 선택 가능):</span>
                            </span>
                            {selectedQuickChips.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setSelectedQuickChips([])}
                                className="text-[10px] font-batang text-gray-400 hover:text-rose-600 underline"
                              >
                                선택 해제
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {["답답함 🌫️", "서운함 🥺", "억울함 🗯️", "불안함 🌊", "지침/무기력 🛌", "뿌듯함 ✨", "고마움 💖", "외로움 🍂", "인정받고 싶음 ⭐", "편히 쉬고 싶음 🌿", "화남/분노 🌋", "설렘/기대 🎈"].map(chip => {
                              const isSel = selectedQuickChips.includes(chip);
                              return (
                                <button
                                  key={chip}
                                  type="button"
                                  onClick={() => {
                                    if (isSel) {
                                      setSelectedQuickChips(selectedQuickChips.filter(c => c !== chip));
                                    } else {
                                      setSelectedQuickChips([...selectedQuickChips, chip]);
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-dodum transition-all flex items-center gap-1 ${isSel ? "bg-rose-600 text-white font-bold shadow-sm scale-105 ring-2 ring-rose-400" : "bg-white text-gray-700 hover:bg-rose-50 border border-rose-200 shadow-2xs"}`}
                                >
                                  <span>{isSel ? "✓" : "+"}</span>
                                  <span>{chip}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* 선택된 칩 일괄 전송 버튼 바 */}
                          {selectedQuickChips.length > 0 && (
                            <div className="pt-2 flex items-center justify-between border-t border-rose-100 animate-fadeIn">
                              <span className="text-xs font-batang text-rose-800">
                                선택한 표현: <strong>{selectedQuickChips.join(", ")}</strong>
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const combined = selectedQuickChips.join(", ");
                                  handleSendChat(combined);
                                  setSelectedQuickChips([]);
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl text-xs font-dodum font-bold shadow-md transition flex items-center gap-1 hover:scale-105"
                              >
                                <span>선택한 감정 전송하기</span>
                                <span>💬</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* 챗봇 직접 입력창 & 하단 일기 쓰러 가기 버튼 */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-1">
                          <div className="flex flex-1 gap-2">
                            <input
                              type="text"
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") handleSendChat(); }}
                              placeholder={`${chatbotName || "마음친구"}에게 지금 생각나는 마음을 편하게 말해줘...`}
                              className="flex-1 p-3 bg-white rounded-2xl border border-rose-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-xs"
                            />
                            <button
                              type="button"
                              onClick={() => handleSendChat()}
                              className="px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shrink-0 shadow transition flex items-center gap-1"
                            >
                              <span>보내기</span>
                              <span>💬</span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const diaryEl = document.getElementById("diary-form-section");
                              if (diaryEl) diaryEl.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shrink-0 shadow transition flex items-center justify-center gap-1 hover:scale-105"
                          >
                            <span>그림일기 쓰러 가기</span>
                            <span>✍️</span>
                          </button>
                        </div>
                      </div>

                      {/* 🖼️ 통합 그림일기 (이미지 직접 붙여넣기/업로드/AI 일러스트 + 일기 작성 일체형 캔버스) */}
                      <div className="bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 space-y-6 shadow-md" id="diary-form-section">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-dodum font-bold shadow-xs">
                                🖼️ {selectedDiaryLesson}회차 마음 그림일기장
                              </span>
                              <span className="text-xs font-batang text-amber-800 font-bold">
                                날씨: 맑음 ☀️ · 작성일: {new Date().toLocaleDateString('ko-KR')}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-title font-bold text-gray-900">
                              오늘의 마음 그림일기 (그림 + 일기 한눈에 보기)
                            </h3>
                          </div>
                        </div>

                        {/* 그림일기 상단: 일기 제목 */}
                        <div>
                          <label className="text-xs font-dodum font-bold text-gray-700 block mb-1.5">
                            일기 제목
                          </label>
                          <input
                            type="text"
                            value={currentDiaryInput.title}
                            onChange={(e) => setCurrentDiaryInput({ ...currentDiaryInput, title: e.target.value })}
                            placeholder={`${selectedDiaryLesson}회차 나의 마음 이야기`}
                            className="w-full p-3.5 rounded-2xl border-2 border-amber-200 font-batang text-base bg-white focus:ring-2 focus:ring-amber-400 outline-none shadow-2xs font-bold text-gray-800"
                          />
                        </div>

                        {/* 그림일기 1구역: 그림/일러스트 캔버스 프레임 */}
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="text-xs font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                              <span>🎨</span>
                              <span>[그림 칸] 오늘의 마음을 담은 그림 / 일러스트</span>
                              <span className="text-[11px] font-batang text-amber-800 font-normal">
                                (Ctrl+V 붙여넣기, 파일 첨부, 또는 AI 프롬프트 생성 모두 가능)
                              </span>
                            </label>
                            {currentDiaryImage && (
                              <button
                                type="button"
                                onClick={() => setCurrentDiaryImage("")}
                                className="text-xs font-dodum text-rose-600 hover:text-rose-800 underline flex items-center gap-1"
                              >
                                <span>🗑️</span>
                                <span>그림 지우고 새로 올리기</span>
                              </button>
                            )}
                          </div>

                          {/* 이미지 드롭 & 붙여넣기(Paste) & 프리뷰 영역 */}
                          <div
                            tabIndex="0"
                            onPaste={(e) => {
                              const items = e.clipboardData?.items;
                              if (items) {
                                for (let i = 0; i < items.length; i++) {
                                  if (items[i].type.indexOf("image") !== -1) {
                                    const blob = items[i].getAsFile();
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      setCurrentDiaryImage(event.target.result);
                                      triggerConfetti();
                                    };
                                    reader.readAsDataURL(blob);
                                    break;
                                  }
                                }
                              }
                            }}
                            className={`min-h-[220px] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 relative overflow-hidden bg-amber-50/30 ${currentDiaryImage ? "border-amber-400 bg-white" : "border-amber-300 hover:border-amber-400"}`}
                          >
                            {currentDiaryImage ? (
                              <div className="w-full flex flex-col items-center gap-3">
                                <div className="max-h-80 w-full rounded-2xl overflow-hidden shadow-md border border-amber-200 flex items-center justify-center bg-gray-50">
                                  <img src={currentDiaryImage} alt="첨부된 그림일기" className="max-h-80 w-auto object-contain" />
                                </div>
                                <span className="text-xs font-dodum text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                  ✨ 그림이 성공적으로 등록되었습니다! (새 이미지를 붙여넣거나 생성하면 교체됩니다)
                                </span>
                              </div>
                            ) : (
                              <div className="text-center space-y-2 p-6">
                                <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mx-auto shadow-inner">
                                  🖼️
                                </div>
                                <div className="space-y-1">
                                  <p className="font-title text-base font-bold text-gray-800">
                                    이곳을 클릭하고 <kbd className="px-2 py-1 bg-amber-100 rounded-lg text-amber-900 font-mono text-xs border border-amber-300">Ctrl + V</kbd> 로 캡처 이미지를 바로 붙여넣으세요!
                                  </p>
                                  <p className="font-batang text-xs text-gray-500">
                                    컴퓨터에 저장된 사진을 올리거나 아래 AI 자동 그리기 프롬프트로 그림을 만들어볼 수도 있습니다.
                                  </p>
                                </div>
                                <label className="inline-block px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-dodum font-bold cursor-pointer transition shadow-2xs">
                                  📁 내 컴퓨터에서 이미지 파일 선택
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          setCurrentDiaryImage(event.target.result);
                                          triggerConfetti();
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            )}
                          </div>

                          {/* AI 일러스트 화풍 및 프롬프트 생성기 */}
                          <div className="p-4 bg-white/90 rounded-2xl border border-amber-200 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-dodum font-bold text-gray-800 flex items-center gap-1">
                                <span>🤖</span>
                                <span>AI 그림 생성 프롬프트 도우미</span>
                              </span>
                              <div className="flex items-center gap-1.5 text-xs font-batang">
                                <span className="text-gray-500">화풍:</span>
                                <select
                                  value={diaryArtStyle}
                                  onChange={(e) => setDiaryArtStyle(e.target.value)}
                                  className="p-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-dodum"
                                >
                                  <option value="따뜻한 파스텔 수채화 일러스트">따뜻한 파스텔 수채화</option>
                                  <option value="귀여운 지브리 감성 애니메이션 풍">지브리 감성 애니메이션 풍</option>
                                  <option value="동화책 속 색연필 일러스트">동화책 속 색연필 풍</option>
                                  <option value="포근한 3D 클레이 찰흙 캐릭터">포근한 3D 클레이 찰흙 풍</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={diaryAiPromptText}
                                onChange={(e) => setDiaryAiPromptText(e.target.value)}
                                placeholder="예: 햇살이 비치는 교실 창가에서 따뜻한 미소를 짓고 있는 중학생 구름 친구"
                                className="flex-1 p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs font-batang focus:outline-none focus:ring-2 focus:ring-amber-400"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  // 간단한 SVG 프리셋 캔버스 생성 시뮬레이션
                                  const prompt = diaryAiPromptText.trim() || `${selectedEmotionObj.name} 마음을 담은 포근한 하루 풍경`;
                                  const svgCanvas = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23FFFBEB"/><circle cx="300" cy="180" r="100" fill="%23FDE68A" opacity="0.6"/><text x="300" y="190" font-size="60" text-anchor="middle">🎨</text><text x="300" y="270" font-size="16" font-weight="bold" fill="%2392400E" text-anchor="middle">${encodeURIComponent(prompt)}</text><text x="300" y="300" font-size="12" fill="%23B45309" text-anchor="middle">화풍: ${encodeURIComponent(diaryArtStyle)}</text></svg>`;
                                  setCurrentDiaryImage(svgCanvas);
                                  triggerConfetti();
                                }}
                                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-dodum font-bold shrink-0 shadow transition flex items-center gap-1"
                              >
                                <span>AI 그림 생성</span>
                                <span>✨</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 그림일기 2구역: 글 작성 칸 (일기 본문) */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-dodum font-bold text-gray-800 flex items-center gap-1">
                              <span>📝</span>
                              <span>[글 칸] 오늘의 감정 분석 및 하루 돌아보기</span>
                            </label>
                          </div>
                          <p className="text-xs font-batang text-amber-950 bg-amber-100/60 p-3 rounded-xl border border-amber-200 leading-relaxed">
                            💡 <strong>작성 가이드:</strong> 오늘 느껴지는 감정을 솔직하고 구체적으로 적어보세요. 
                            왜 그런 감정을 느낀 것인지 오늘의 하루와 학교생활을 돌아보며 스스로의 마음을 차분히 분석해 보세요.
                          </p>
                          <textarea
                            rows={7}
                            value={currentDiaryInput.content}
                            onChange={(e) => setCurrentDiaryInput({ ...currentDiaryInput, content: e.target.value })}
                            placeholder="[오늘 느낀 구체적인 감정]&#10;오늘 아침부터 내 마음속에는...&#10;&#10;[감정의 원인 및 하루 분석]&#10;왜냐하면 오늘 학교에서...&#10;&#10;[나를 위한 따뜻한 한 줄]&#10;그래도 괜찮아, 오늘 하루도 참 애썼어..."
                            className="w-full p-4 rounded-2xl border-2 border-amber-200 font-batang text-base leading-relaxed bg-white focus:ring-2 focus:ring-amber-400 outline-none shadow-inner"
                          />
                        </div>

                        {/* 하단 저장 및 이동 컨트롤 바 */}
                        <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                          <button
                            type="button"
                            onClick={() => setSelectedDiaryLesson(null)}
                            className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-dodum text-gray-700 hover:bg-white bg-gray-50 shadow-2xs transition flex items-center gap-1"
                          >
                            <span>◀</span>
                            <span>회차 목록으로 돌아가기</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSaveDiary}
                            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 hover:opacity-95 text-white rounded-2xl font-dodum font-bold text-sm shadow-md transition hover:scale-105 flex items-center gap-2"
                          >
                            <span>✨</span>
                            <span>{selectedDiaryLesson}회차 그림일기 저장하기</span>
                          </button>
                        </div>

                        {isSaved && (
                          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-center text-sm font-dodum font-bold animate-bounce shadow-sm">
                            🎉 {selectedDiaryLesson}회차 그림일기(그림+글)가 안전하게 저장되었습니다!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: 마이페이지 */}
            {currentTab === "mypage" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-3xl shadow-sm">
                        {isTeacherMode ? "👨‍🏫" : "🌸"}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {isTeacherMode ? "교사 전용 대시보드 및 마이페이지 (보안 분리)" : `1학년 3반 (학번: ${studentId})`}
                        </span>
                        <h2 className="text-2xl font-title font-bold text-gray-900 mt-1">
                          {isTeacherMode ? "선생님 개인 아카이브 🔒" : `${studentName} `}
                          {!isTeacherMode && <span className="text-rose-600 font-batang text-xl font-normal">({nickname})</span>}
                        </h2>
                      </div>
                    </div>

                  </div>

                  {/* 마음 성장 레벨 게이지 바 (Lv.1 ~ Lv.15) */}
                  <div className="p-6 bg-gradient-to-r from-amber-50 via-rose-50 to-emerald-50 rounded-3xl border-2 border-amber-300/70 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between font-dodum">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs">
                          🌱 마음 레벨: Lv.{Math.min(15, completedLessons.length)}
                        </span>
                        <span className="text-xs font-bold text-amber-900">
                          ({completedLessons.length}개 단계 미션 클리어 완료)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-800">
                        {Math.round((completedLessons.length / 15) * 100)}% 성장
                      </span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden p-0.5 border border-amber-200">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${(Math.min(15, completedLessons.length) / 15) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-gray-500 font-bold px-1">
                      <span>Lv.1 시작</span>
                      <span>Lv.5 파수꾼</span>
                      <span>Lv.10 공감 마스터</span>
                      <span>Lv.15 완성</span>
                    </div>
                  </div>
                </div>

                {/* 15단계 아카이브 카드 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-title font-bold text-gray-900">
                    1~15단계 마음활동 &amp; 감정일기 아카이브
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CURRICULUM.map(c => {
                      const d = diaries[c.no];
                      const isDone = completedLessons.includes(c.no);
                      return (
                        <div
                          key={c.no}
                          className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition space-y-3"
                        >
                          <div className="flex items-center justify-between text-xs font-dodum">
                            <span className="text-gray-400 font-mono font-bold">{c.no}단계</span>
                            {isDone ? (
                              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">✓ 활동 완료</span>
                            ) : (
                              <span className="text-gray-500 font-bold bg-gray-100 px-2.5 py-0.5 rounded-full">⏳ 활동 전</span>
                            )}
                          </div>
                          <h4 className="text-sm font-title font-bold text-gray-900">
                            {c.title}
                          </h4>
                          {d && d.image ? (
                            <div className="h-28 w-full rounded-2xl overflow-hidden bg-gray-50 border border-amber-200">
                              <img src={d.image} alt="그림일기" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="h-16 w-full rounded-2xl bg-amber-50/50 border border-dashed border-amber-200 flex items-center justify-center text-xs text-amber-800/70 font-dodum">
                              {d ? "📝 작성된 일기 텍스트 보관됨" : "아직 작성된 일기가 없습니다."}
                            </div>
                          )}
                          <p className="font-batang text-xs text-gray-600 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/60 line-clamp-2">
                            {d ? d.content : c.subtitle}
                          </p>
                          <div className="flex gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setArchiveModal({ type: "activity", lessonNo: c.no })}
                              className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-dodum font-bold rounded-xl text-emerald-900 transition"
                            >
                              🎯 활동 보기
                            </button>
                            <button
                              type="button"
                              onClick={() => setArchiveModal({ type: "diary", lessonNo: c.no })}
                              className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-dodum font-bold rounded-xl text-rose-700 transition"
                            >
                              📝 일기 보기
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: 마음에세이 (AI 자기성찰 에세이 변환기 & 문집 인쇄) */}
            {currentTab === "print" && (
              <div className="space-y-6">
                {/* 상단 컨트롤 바 */}
                <div className="no-print bg-white p-5 rounded-3xl border border-purple-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-dodum font-bold flex items-center gap-1">
                        <span>✨</span> AI 자기성찰 마음에세이 변환기
                      </span>
                      <span className="text-xs font-batang text-purple-900 font-bold">
                        감정일기 + 마음친구 대화 기반
                      </span>
                    </div>
                    <h3 className="text-lg font-title font-bold text-gray-900">
                      나의 감정일기와 성찰 대화를 한 편의 깊이 있는 에세이로 완성하세요
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleGenerateEssay(essayEditLesson)}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-dodum font-bold shadow-md transition flex items-center gap-1.5 hover:scale-105"
                    >
                      <span>🔄</span>
                      <span>{essayEditLesson}단계 에세이 변환하기</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs sm:text-sm font-dodum font-bold shadow transition flex items-center gap-1.5 hover:scale-105"
                    >
                      <span>🖨️</span>
                      <span>A4 PDF 인쇄 / 저장</span>
                    </button>
                  </div>
                </div>

                {/* 단계 선택기 탭 바 (1~15단계) */}
                <div className="no-print bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center text-xs font-dodum">
                    <span className="font-bold text-gray-700">에세이 변환할 단계 선택:</span>
                    <span className="text-purple-700 font-bold">선택된 단계: {essayEditLesson}단계</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {CURRICULUM.map(c => {
                      const isSel = essayEditLesson === c.no;
                      const hasDraft = !!essayDrafts[c.no];
                      return (
                        <button
                          key={c.no}
                          type="button"
                          onClick={() => {
                            setEssayEditLesson(c.no);
                            if (essayDrafts[c.no]) {
                              setEssayEditContent(essayDrafts[c.no].essay);
                              setEssayShiftContent(essayDrafts[c.no].emotionalShift);
                              setEssayKeyInsight(essayDrafts[c.no].keyInsight);
                            } else {
                              handleGenerateEssay(c.no);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold whitespace-nowrap transition flex items-center gap-1 shrink-0 ${isSel ? "bg-purple-700 text-white shadow-xs" : "bg-gray-50 text-gray-700 hover:bg-purple-50 border border-gray-200"}`}
                        >
                          <span>{c.no}단계</span>
                          {hasDraft && <span className="text-[10px]">📝</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 에세이 편집/뷰어 카드 */}
                {(() => {
                  const currentDraft = essayDrafts[essayEditLesson] || {
                    essay: essayEditContent || "아직 변환된 에세이가 없습니다. 상단의 '에세이 변환하기' 버튼을 눌러보세요!",
                    emotionalShift: essayShiftContent.first ? essayShiftContent : {
                      first: "불안하고 복잡했던 감정",
                      found: "존중받고 공감받고 싶은 마음",
                      core: "자기이해와 회복력",
                      learned: "모든 감정에는 나를 지키려는 소중한 가치가 담겨 있음을 깨달음"
                    },
                    keyInsight: essayKeyInsight || "어떤 감정이 찾아와도 두려워하지 않고, 내 안의 진실한 목소리를 다정하게 안아줄 수 있게 되었다.",
                    updatedAt: "최근"
                  };

                  return (
                    <div className="space-y-6">
                      {/* 3대 섹션 아티팩트 (웹 인터랙티브 & A4 인쇄 겸용) */}
                      <div className="max-w-[210mm] mx-auto bg-white border border-purple-200 shadow-lg p-8 sm:p-12 rounded-3xl space-y-8 a4-page">
                        
                        {/* 문집 헤더 */}
                        <div className="text-center space-y-2 border-b border-purple-100 pb-6">
                          <span className="text-xs font-mono uppercase text-purple-600 font-bold tracking-widest">
                            2026 MIND PLAY · SELF-REFLECTION ESSAY
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-title font-bold text-gray-900">
                            【{essayEditLesson}단계】 {studentName}의 마음에세이
                          </h2>
                          <p className="font-batang text-base text-gray-600 italic">
                            &quot;구름을 지나 나를 깊이 이해하게 된 열다섯 번의 기록&quot;
                          </p>
                          <div className="pt-2 text-xs font-mono text-purple-800 font-bold flex items-center justify-center gap-3">
                            <span>1학년 3반 15번 (학번: {studentId})</span>
                            <span>·</span>
                            <span>작성자: {studentName}</span>
                            <span>·</span>
                            <span>마음친구: {chatbotName || "마음친구"}</span>
                          </div>
                        </div>

                        {/* 섹션 1: 1인칭 자기성찰 에세이 본문 */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-title text-base sm:text-lg font-bold text-purple-950 flex items-center gap-2">
                              <span>📖</span> 1. 나의 자기성찰 에세이
                            </h3>
                            <div className="no-print flex items-center gap-2">
                              {isEssayEditing ? (
                                <button
                                  type="button"
                                  onClick={handleSaveCustomEssay}
                                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-dodum font-bold shadow-xs transition"
                                >
                                  저장 완료 ✓
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEssayEditContent(currentDraft.essay);
                                    setIsEssayEditing(true);
                                  }}
                                  className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-dodum font-bold border border-purple-200 transition"
                                >
                                  직접 다듬기 ✏️
                                </button>
                              )}
                            </div>
                          </div>

                          {isEssayEditing ? (
                            <textarea
                              rows={12}
                              value={essayEditContent}
                              onChange={(e) => setEssayEditContent(e.target.value)}
                              className="w-full p-4 bg-purple-50/30 rounded-2xl border-2 border-purple-300 font-batang text-sm sm:text-base text-gray-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                          ) : (
                            <div className="p-6 bg-gradient-to-b from-purple-50/30 to-rose-50/20 rounded-2xl border border-purple-100 font-batang text-sm sm:text-base text-gray-800 leading-loose whitespace-pre-line text-justify shadow-inner">
                              {currentDraft.essay}
                            </div>
                          )}
                        </div>

                        {/* 섹션 2: 나의 감정 변화 4요소 */}
                        <div className="space-y-3 pt-2">
                          <h3 className="font-title text-base sm:text-lg font-bold text-purple-950 flex items-center gap-2">
                            <span>🌱</span> 2. 대화를 통해 발견한 나의 감정 변화
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-batang">
                            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-1">
                              <strong className="text-rose-900 font-dodum block text-xs">① 처음에 느꼈던 감정:</strong>
                              <p className="text-gray-800">{currentDraft.emotionalShift.first}</p>
                            </div>
                            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
                              <strong className="text-blue-900 font-dodum block text-xs">② 대화하며 발견한 숨은 감정/욕구:</strong>
                              <p className="text-gray-800">{currentDraft.emotionalShift.found}</p>
                            </div>
                            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
                              <strong className="text-amber-900 font-dodum block text-xs">③ 나에게 가장 중요했던 감정:</strong>
                              <p className="text-gray-800">{currentDraft.emotionalShift.core}</p>
                            </div>
                            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
                              <strong className="text-emerald-900 font-dodum block text-xs">④ 감정을 통해 새롭게 알게 된 점:</strong>
                              <p className="text-gray-800">{currentDraft.emotionalShift.learned}</p>
                            </div>
                          </div>
                        </div>

                        {/* 섹션 3: 나를 이해하게 된 한 문장 */}
                        <div className="p-6 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 text-white rounded-3xl shadow-md space-y-2 text-center">
                          <span className="text-xs font-mono text-purple-200 uppercase tracking-wider font-bold">
                            KEY INSIGHT · 나를 이해하게 된 한 문장
                          </span>
                          <h4 className="text-lg sm:text-xl font-batang font-bold leading-relaxed text-purple-100">
                            &quot;{currentDraft.keyInsight}&quot;
                          </h4>
                        </div>

                        {/* 하단 서명 */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 font-batang">
                          <span>2026 마음플레이 감정일기 마음에세이</span>
                          <span>1학년 3반 {studentName} [확인]</span>
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB 5: TEACHER DASHBOARD (교사용 실시간 학생 현황 및 결과물 대시보드) */}
            {currentTab === "teacher" && (
              <div className="space-y-6">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-indigo-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold flex items-center gap-1">
                        🔒 교사용 실시간 관제 모드
                      </span>
                      <span className="text-xs bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded">
                        1학년 3반 (26명)
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-title font-bold">
                      학급 감정일기 & 단계별 활동 실시간 대시보드
                    </h2>
                    <p className="font-batang text-sm text-teal-100">
                      학생들의 감정 분포, 일기 제출 여부, 나다움 가면 및 위로 엽서 등 활동 결과물을 한눈에 모니터링합니다.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 no-print self-start md:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        triggerConfetti();
                        alert("✨ [실시간 학급 동기화 완료] 학생들의 활동 제출 상태, 감정일기 및 라디오 데이터가 성공적으로 최신화되었습니다!");
                      }}
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-dodum font-bold shadow flex items-center gap-1.5 transition active:scale-95"
                    >
                      <span>🔄</span> 실시간 학급 데이터 동기화
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-dodum font-bold border border-white/30 backdrop-blur"
                    >
                      🖨️ 대시보드 인쇄
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("현재 학급 데이터 26건이 CSV/엑셀 양식으로 내보내기 준비되었습니다.")}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-dodum font-bold shadow"
                    >
                      📊 Excel 다운로드
                    </button>
                  </div>
                </div>

                {/* 📌 교사용 단계별 제출 현황 실시간 필터 & 단계 선택기 */}
                <div className="bg-white rounded-3xl border border-indigo-200 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                    <div>
                      <h3 className="text-base font-title font-bold text-indigo-950 flex items-center gap-2">
                        <span>🎯</span> 단계별 학생 제출 현황 확인 (1~15단계)
                      </h3>
                      <p className="text-xs font-batang text-gray-500">
                        확인하고 싶은 단계를 클릭하면 해당 단계의 제출 인원과 학생별 활동 상태가 즉시 조회됩니다.
                      </p>
                    </div>
                    <span className="text-xs font-dodum font-bold bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-xl border border-indigo-200">
                      현재 확인 중: <strong>{teacherSelectedStage}단계</strong>
                    </span>
                  </div>

                {/* 1~15단계 선택 칩 */}
                <div className="flex gap-2 overflow-x-auto pb-1 items-center">
                  {CURRICULUM.map(c => {
                    const isSelected = teacherSelectedStage === c.no;
                    const realStudentTotal = 26;
                    const submittedCount = c.no === 1 ? 26 : c.no === 2 ? 26 : c.no === 3 ? 25 : c.no === 4 ? 22 : c.no === 5 ? 19 : 0;
                    return (
                      <button
                        key={c.no}
                        type="button"
                        onClick={() => setTeacherSelectedStage(c.no)}
                        className={`px-3.5 py-2 rounded-2xl text-xs font-dodum font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${isSelected ? "bg-indigo-700 text-white shadow-md scale-105" : "bg-gray-50 hover:bg-indigo-50 text-gray-700 border border-gray-200"}`}
                      >
                        <span>{c.no}단계</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white text-indigo-800" : "bg-gray-200 text-gray-600"}`}>
                          {submittedCount}/{realStudentTotal}명
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* KPI Summary Cards (26명 기준 동적 카드) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <span className="text-xs font-dodum text-gray-500">총 학생수 (1학년 3반)</span>
                  <div className="text-2xl font-title font-bold text-gray-800">26명</div>
                  <div className="text-[11px] font-batang text-emerald-600">출석률 100% (26명 전원 등록)</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <span className="text-xs font-dodum text-gray-500">감정일기 제출 현황</span>
                  <div className="text-2xl font-title font-bold text-rose-600">24 / 26명</div>
                  <div className="text-[11px] font-batang text-rose-500">제출률 92.3% (2명 작성 중)</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <span className="text-xs font-dodum text-gray-500">{teacherSelectedStage}단계 활동 제출 현황</span>
                  <div className="text-2xl font-title font-bold text-teal-600">
                    {teacherSelectedStage === 1 ? "26 / 26명" : teacherSelectedStage === 2 ? "26 / 26명" : teacherSelectedStage === 3 ? "25 / 26명" : teacherSelectedStage === 4 ? "22 / 26명" : teacherSelectedStage === 5 ? "19 / 26명" : "0 / 26명"}
                  </div>
                  <div className="text-[11px] font-batang text-teal-600">
                    {teacherSelectedStage <= 2 ? "전원 참여 완료 (100%)" : teacherSelectedStage <= 4 ? "수업 진행 중 (제출 활발)" : "단계 잠금 / 대기 중"}
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <span className="text-xs font-dodum text-gray-500">주요 감정 분포 1위</span>
                  <div className="text-2xl font-title font-bold text-orange-600">뿌듯이 (35%)</div>
                  <div className="text-[11px] font-batang text-gray-500">설렘이(23%) · 편안이(19%)</div>
                </div>
              </div>
                {/* 🔒 교사용 1~15단계 잠금/해제 통합 컨트롤 센터 */}
                <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h3 className="text-base font-title font-bold text-indigo-950 flex items-center gap-2">
                        <span>🔒</span> 1~15단계 학생 접근 잠금 / 해제 관리
                      </h3>
                      <p className="text-xs font-batang text-gray-600">
                        버튼을 클릭하여 수업 진도에 맞춰 학생들에게 단계를 즉시 공개(🔓)하거나 잠금(🔒) 처리할 수 있습니다.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const allOpen = {};
                          for(let i=1; i<=15; i++) allOpen[i] = true;
                          setUnlockedStages(allOpen);
                          localStorage.setItem("mindplay_unlocked_stages", JSON.stringify(allOpen));
                          triggerConfetti();
                        }}
                        className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-dodum font-bold"
                      >
                        모든 단계 열기 🔓
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const only123 = {};
                          for(let i=1; i<=15; i++) only123[i] = (i <= 3);
                          setUnlockedStages(only123);
                          localStorage.setItem("mindplay_unlocked_stages", JSON.stringify(only123));
                          triggerConfetti();
                        }}
                        className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-dodum font-bold"
                      >
                        1~3단계만 열기 🔒
                      </button>
                    </div>
                  </div>

                  {/* 15개 단계 그리드 버튼 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {CURRICULUM.map(c => {
                      const isOpen = unlockedStages[c.no];
                      return (
                        <div
                          key={c.no}
                          onClick={() => handleToggleStageLock(c.no)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2 select-none hover:scale-[1.02] ${isOpen ? "bg-emerald-50/80 border-emerald-400 text-emerald-950 shadow-xs" : "bg-gray-50 border-gray-300 text-gray-500 opacity-75"}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-title font-bold text-xs">{c.no}단계</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-dodum font-bold ${isOpen ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"}`}>
                              {isOpen ? "🔓 공개중" : "🔒 잠김"}
                            </span>
                          </div>
                          <div className="text-[11px] font-batang line-clamp-1">
                            {c.title.split(". ")[1] || c.title}
                          </div>
                          <div className="text-[10px] font-dodum text-right text-gray-500">
                            {isOpen ? "클릭 시 잠금" : "클릭 시 잠금해제"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time Student Submission Matrix Table */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
                    <div>
                      <h3 className="text-base font-title font-bold text-gray-800 flex items-center gap-2">
                        📋 1학년 3반 학생별 【{teacherSelectedStage}단계】 실시간 제출 상태 & 상세 결과물
                      </h3>
                      <p className="text-xs font-batang text-gray-500">
                        학생 이름을 클릭하면 해당 학생이 작성한 일기, {teacherSelectedStage}단계 결과물, 위로 엽서를 즉시 열람할 수 있습니다.
                      </p>
                    </div>
                    <div className="text-xs font-dodum text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border">
                      최근 동기화: 방금 전 (실시간)
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b text-gray-600 font-dodum">
                          <th className="py-3 px-3">학번</th>
                          <th className="py-3 px-3">이름</th>
                          <th className="py-3 px-3">선택 감정</th>
                          <th className="py-3 px-3">감정일기 제출</th>
                          <th className="py-3 px-3">선택한 {teacherSelectedStage}단계 활동 상태</th>
                          <th className="py-3 px-3">매칭 파트너</th>
                          <th className="py-3 px-3 text-center">상세보기</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-batang">
                        {CLASS_STUDENTS.map((st, idx) => {
                          const isDoneDiary = idx !== 6 && idx !== 18; // 2명 제외하고 완료 예시
                          const emotions = ["뿌듯이", "설렘이", "편안이", "용기", "기쁨이", "피곤이", "화남이", "슬픔이"];
                          const emoName = emotions[idx % emotions.length];
                          const partner = getMatchedPartner(st.studentId).targetPartner;

                          // 단계별 제출 상태 텍스트
                          let stageStatusText = "작성 완료 ✨";
                          if (teacherSelectedStage === 1) stageStatusText = "사연 등록 & 위로 엽서 발송 완료 💌";
                          else if (teacherSelectedStage === 2) stageStatusText = "조하리의 창 강점 4대 문장 완성 🪟";
                          else if (teacherSelectedStage === 3) stageStatusText = "다중지능/기질 브랜딩 카드 완성 🎭";
                          else if (teacherSelectedStage === 4) stageStatusText = idx % 5 === 0 ? "인사약 편지 작성 중 ⏳" : "듀얼 편지 발송 완료 💌";
                          else if (teacherSelectedStage >= 5) stageStatusText = idx % 4 === 0 ? "활동 진행 중 ⏳" : `${teacherSelectedStage}단계 퀘스트 클리어 🏅`;

                          return (
                            <tr key={st.studentId} className={`hover:bg-slate-50/80 transition-colors ${st.isDemo ? "bg-emerald-50/40" : ""}`}>
                              <td className="py-3 px-3 font-mono font-bold text-gray-700">
                                {st.studentId}
                                {st.isDemo && <span className="ml-1 text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">체험</span>}
                              </td>
                              <td className="py-3 px-3 font-dodum font-bold text-gray-900">{st.name}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-dodum font-bold ${emoName === "뿌듯이" ? "bg-orange-100 text-orange-800" : emoName === "설렘이" ? "bg-pink-100 text-pink-800" : emoName === "화남이" ? "bg-red-100 text-red-800" : "bg-teal-100 text-teal-800"}`}>
                                  {emoName}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                {isDoneDiary ? (
                                  <span className="text-emerald-700 font-dodum font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 제출 완료
                                  </span>
                                ) : (
                                  <span className="text-amber-600 font-dodum font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> 작성 중
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-gray-800 font-dodum">
                                <span className={stageStatusText.includes("완료") || stageStatusText.includes("클리어") ? "text-emerald-800" : "text-amber-700"}>
                                  {stageStatusText}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-gray-600 font-dodum">
                                🌸 {partner.name} ({partner.studentId})
                              </td>
                              <td className="py-3 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => setTeacherInspectStudent({
                                    student: st,
                                    stage: teacherSelectedStage,
                                    emotion: emoName,
                                    partner: partner,
                                    stageStatus: stageStatusText
                                  })}
                                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-dodum font-bold transition-all hover:scale-105 shadow-2xs"
                                >
                                  열람 🔍
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          {/* 팝업 모달 1: 마이페이지 - 활동 보기 & 일기 보기 전용 모달 */}
          {archiveModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border-2 border-emerald-200 max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setArchiveModal(null)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition"
                >
                  ✕
                </button>

                {archiveModal.type === "activity" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-dodum font-bold">
                        🎯 {archiveModal.lessonNo}단계 마음활동 요약 결과
                      </span>
                      <span className="text-xs font-batang text-gray-500">
                        {CURRICULUM.find(c => c.no === archiveModal.lessonNo)?.area}
                      </span>
                    </div>

                    <h3 className="text-xl font-title font-bold text-gray-900 border-b pb-2">
                      {CURRICULUM.find(c => c.no === archiveModal.lessonNo)?.title}
                    </h3>

                    {/* 단계별 요약 내용 */}
                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3 font-batang text-sm text-emerald-950">
                      <div className="font-bold text-emerald-900 flex items-center gap-2">
                        <span>📌</span> 활동 주제: {CURRICULUM.find(c => c.no === archiveModal.lessonNo)?.subtitle}
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-emerald-200 leading-relaxed text-gray-800 text-xs sm:text-sm">
                        {archiveModal.lessonNo === 1 && (
                          <div className="space-y-3">
                            <p className="font-bold text-emerald-900">
                              📻 1단계 활동: 일상 고민 등록 &amp; 1:1 토닥토닥 마음 위로 엽서
                            </p>
                            
                            {/* 1. 내가 등록한 고민 사연 */}
                            <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1">
                              <span className="text-xs font-dodum font-bold text-rose-800 flex items-center gap-1">
                                <span>📻</span> 내가 등록한 고민 주파수 사연
                              </span>
                              {(() => {
                                const myWorry = studentRealWorries.find(w => w.studentId === studentId);
                                if (myWorry) {
                                  return (
                                    <div className="text-xs font-batang text-gray-800">
                                      <span className="text-rose-700 font-bold">[{myWorry.category} / {myWorry.freq}]</span> &quot;{myWorry.content}&quot;
                                    </div>
                                  );
                                }
                                return (
                                  <div className="text-xs font-batang text-gray-700">
                                    <span className="text-rose-700 font-bold">[경제/소비 고민]</span> &quot;온라인 게임 아이템을 사고 싶은데 용돈이 부족합니다.&quot;
                                  </div>
                                );
                              })()}
                            </div>

                            {/* 2. 내가 친구에게 보낸 3단계 위로 엽서 */}
                            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-dodum font-bold text-emerald-900 flex items-center gap-1">
                                  <span>💌</span> 내가 친구에게 부친 3단계 위로 엽서
                                </span>
                                <span className="text-[11px] font-mono text-emerald-700 font-bold">
                                  {hasSentComfort ? "✓ 발송 완료" : "작성 완료"}
                                </span>
                              </div>
                              <div className="text-xs font-batang text-gray-800 space-y-1 bg-white p-3 rounded-lg border border-emerald-100">
                                <p><strong>① 공감과 감정 읽기:</strong> {mySentComfort?.step1 || comfortStep1 || "새 학기 낯선 교실에서 친구들에게 다가가는 게 많이 긴장되고 외로웠겠구나."}</p>
                                <p><strong>② 존재 인정 &amp; 자책 덜기:</strong> {mySentComfort?.step2 || comfortStep2 || "네가 소심해서가 절대 아니야. 누구나 새로운 시작은 두렵고 서툴 수 있어."}</p>
                                <p><strong>③ 작은 응원과 용기:</strong> {mySentComfort?.step3 || comfortStep3 || "내일 아침 먼저 눈 마주치며 따뜻하게 인사해 보자! 너의 용기를 언제나 응원해."}</p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {(mySentComfort?.stickers || selectedStickers.length > 0 ? selectedStickers : ["넌 충분히 잘하고 있어! 🌟", "토닥토닥 힘내자 💖"]).map((s, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md text-[10px] font-dodum border border-rose-200">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {archiveModal.lessonNo === 2 && "🪟 조하리의 창(Johari Window)을 통해 내가 발견한 나의 강점과 짝꿍이 선물해 준 강점을 교차 분석하여 4대 나다움 문장을 완성했습니다."}
                        {archiveModal.lessonNo === 3 && "🎭 가드너 8대 다중지능 및 Keirsey 4대 기질 검사를 바탕으로 진짜 나다운 가면 프로필과 핵심 브랜딩 카드를 완성했습니다."}
                        {archiveModal.lessonNo === 4 && (
                          <div className="space-y-3">
                            <p className="font-bold text-emerald-900">
                              🍹 4단계 활동: 33종 감정 스펙트럼 칵테일 믹서 &amp; 치유 주크박스 + 듀얼 편지
                            </p>
                            <div className="p-3 bg-pink-50 rounded-xl border border-pink-200 text-xs text-gray-800 space-y-1">
                              <p><strong>① 내 마음의 칵테일 믹스:</strong> {cocktailEmotions.map(e => `${e.word} ${e.percent}%`).join(" + ")}</p>
                              <p><strong>② 공감 챗봇 마음이 대화:</strong> 사건: &quot;{chatbotEventInput}&quot; ➔ 바람: &quot;{chatbotDesireInput}&quot;</p>
                              <p><strong>③ 힐링 주크박스 추천곡:</strong> {jukeboxArtist} - {jukeboxTitle} ({jukeboxTheme})</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-gray-800 space-y-1">
                              <p className="font-bold text-blue-900">💌 [특별활동] 별명 듀얼 마음 엽서 (To. {lesson4TargetNickname})</p>
                              <p>💛 <strong>감사 한 컷:</strong> &quot;{thanksReason}&quot;</p>
                              <p>💚 <strong>인사약 사과:</strong> &quot;{sorryAdmit}&quot; / &quot;{sorryPromise}&quot;</p>
                            </div>
                          </div>
                        )}
                        {archiveModal.lessonNo === 5 && "🫧 4-7-8 마음 안정 호흡 가이드 및 인터랙티브 호흡 사이클(19초)을 완수하여 감정 쿨다운 역량을 강화했습니다."}
                        {archiveModal.lessonNo === 6 && "🃏 비합리적 생각 브레이커 ABCD 카드를 뒤집으며 부정적 자동 사고를 유연하고 합리적인 생각으로 전환했습니다."}
                        {archiveModal.lessonNo === 7 && "🗑️ 내가 통제할 수 없는 걱정과 통제 가능한 행동을 명확히 분리수거하여 행동 실천 다짐을 수립했습니다."}
                        {archiveModal.lessonNo === 8 && "🍀 '오히려 좋아!' 역발상 슬롯머신을 돌려 위기 상황을 긍정의 기회로 바꾸는 감사 한 컷을 기록했습니다."}
                        {archiveModal.lessonNo === 9 && "🤝 학급 친구들과의 취향 밸런스 게임을 통해 서로의 다름을 존중하는 다름 인정 도장을 획득했습니다."}
                        {archiveModal.lessonNo === 10 && "💬 4단계 공감 대화 시뮬레이터를 통해 친구의 고민에 깊이 공감하고 지지하는 소통 역량을 길렀습니다."}
                        {archiveModal.lessonNo === 11 && "🕊️ 너-전달법 대신 '나-전달법(나사감바)'으로 나의 감정과 바람을 공격적이지 않고 진솔하게 전하는 법을 익혔습니다."}
                        {archiveModal.lessonNo === 12 && "🚪 인사약(사과하기)과 공마다(거절하기) 대화법을 통해 친구와의 갈등을 지혜롭게 해결하는 방탈출 미션을 클리어했습니다."}
                        {archiveModal.lessonNo === 13 && "🦋 나의 선택이 가져오는 파급력을 시뮬레이션하는 나비효과를 통해 책임감 있는 의사결정을 실천했습니다."}
                        {archiveModal.lessonNo === 14 && "🏗️ 학급 친구들과 협력하여 마음 레벨업 스킬 카드를 결합하고 7층 마음 타워를 성공적으로 완성했습니다."}
                        {archiveModal.lessonNo === 15 && "🎁 15주간의 마음 성장 여정을 마무리하며 미래의 나에게 보내는 타임캡슐을 봉인하고 롤링페이퍼로 서로를 축복했습니다."}
                      </div>

                      <div className="flex items-center justify-between text-xs font-dodum text-gray-500 pt-2 border-t border-emerald-100">
                        <span>상태: {completedLessons.includes(archiveModal.lessonNo) ? "✓ 활동 완료" : "⏳ 활동 전"}</span>
                        <span>학생: {studentName} ({studentId})</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const lNo = archiveModal.lessonNo;
                          setArchiveModal(null);
                          setCurrentLesson(lNo);
                          setCurrentTab("activity");
                        }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm"
                      >
                        🎯 이 단계 인터랙티브 활동하러 가기
                      </button>
                      <button
                        type="button"
                        onClick={() => setArchiveModal(null)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-dodum font-bold transition"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-dodum font-bold">
                        📝 {archiveModal.lessonNo}단계 감정 그림일기
                      </span>
                      <span className="text-xs font-batang text-gray-500">
                        {diaries[archiveModal.lessonNo]?.date || new Date().toLocaleDateString("ko-KR")}
                      </span>
                    </div>

                    <h3 className="text-xl font-title font-bold text-gray-900 border-b pb-2">
                      {diaries[archiveModal.lessonNo]?.title || `${archiveModal.lessonNo}단계 나의 마음 이야기`}
                    </h3>

                    {/* 그림일기 이미지 및 글 본문 */}
                    <div className="space-y-4 font-batang text-sm">
                      {diaries[archiveModal.lessonNo]?.image ? (
                        <div className="w-full rounded-2xl overflow-hidden border-2 border-amber-200 shadow-sm max-h-72 bg-gray-50 flex items-center justify-center">
                          <img
                            src={diaries[archiveModal.lessonNo].image}
                            alt="감정 그림일기"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="p-6 rounded-2xl bg-amber-50/60 border border-dashed border-amber-300 text-center text-xs text-amber-900 font-dodum space-y-1">
                          <div className="text-2xl">🖼️</div>
                          <div>첨부된 그림일기 이미지가 없습니다.</div>
                        </div>
                      )}

                      <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 leading-relaxed text-gray-800 text-sm whitespace-pre-wrap">
                        {diaries[archiveModal.lessonNo]?.content || "오늘 하루도 내 감정을 온전히 마주하고 따뜻하게 안아주었습니다."}
                      </div>

                      <div className="flex items-center justify-between text-xs font-dodum text-gray-500 pt-2 border-t border-amber-100">
                        <span>작성자: {studentName} ({studentId})</span>
                        <span>날씨: 맑음 ☀️</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const lNo = archiveModal.lessonNo;
                          setArchiveModal(null);
                          setCurrentLesson(lNo);
                          setCurrentTab("diary");
                        }}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm"
                      >
                        📝 일기 수정 / 새로 작성하기
                      </button>
                      <button
                        type="button"
                        onClick={() => setArchiveModal(null)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-dodum font-bold transition"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 팝업 모달 2: 교사용 대시보드 - 학생별 상세 포트폴리오(활동, 일기, 에세이) 열람 모달 */}
          {teacherInspectStudent && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border-2 border-indigo-300 max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setTeacherInspectStudent(null)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition"
                >
                  ✕
                </button>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-2xl font-bold">
                      👨‍🎓
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-mono font-bold">
                          {teacherInspectStudent.student.studentId}
                        </span>
                        <h3 className="text-xl font-title font-bold text-gray-900">
                          {teacherInspectStudent.student.name} 학생
                        </h3>
                        {teacherInspectStudent.student.isDemo && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[11px] font-dodum font-bold">체험 계정</span>
                        )}
                      </div>
                      <p className="text-xs font-batang text-gray-500 mt-0.5">
                        선택 감정: <strong>{teacherInspectStudent.emotion}</strong> · 1:1 매칭 파트너: <strong>{teacherInspectStudent.partner.name} ({teacherInspectStudent.partner.studentId})</strong>
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-dodum font-bold border border-emerald-300">
                    {teacherInspectStudent.stage}단계 열람 중
                  </span>
                </div>

                {/* 3대 섹션: 1) 해당 단계 활동 결과, 2) 감정일기, 3) 마음에세이 요약 */}
                <div className="space-y-4">
                  {/* 섹션 1: 해당 단계 활동 수행 결과 */}
                  <div className="p-5 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2">
                    <h4 className="text-sm font-dodum font-bold text-indigo-950 flex items-center gap-2">
                      <span>🎯</span> {teacherInspectStudent.stage}단계 마음활동 수행 결과물
                    </h4>
                    <div className="p-4 bg-white rounded-xl border border-indigo-100 text-xs sm:text-sm font-batang text-gray-800 leading-relaxed space-y-2">
                      <div className="font-bold text-indigo-900 border-b border-indigo-50 pb-1 flex justify-between items-center">
                        <span>상태: {teacherInspectStudent.stageStatus}</span>
                        <span className="text-xs font-dodum text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">제출 완료</span>
                      </div>
                      
                      {teacherInspectStudent.stage === 1 && (
                        <div className="space-y-2.5">
                          <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1">
                            <span className="text-xs font-dodum font-bold text-rose-800 flex items-center gap-1">
                              <span>📻</span> 등록된 학생 고민 라디오 사연
                            </span>
                            <p className="text-xs text-gray-800">
                              <span className="text-rose-700 font-bold">[경제/소비 고민]</span> &quot;온라인 게임 아이템을 사고 싶은데 용돈이 부족합니다.&quot;
                            </p>
                          </div>
                          
                          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-dodum font-bold text-indigo-900 flex items-center gap-1">
                                <span>💌</span> 짝꿍({teacherInspectStudent.partner.name})에게 부친 3단계 위로 엽서
                              </span>
                              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                                발송 완료 💌
                              </span>
                            </div>
                            <div className="text-xs text-gray-800 space-y-1 bg-white p-2.5 rounded-lg border border-indigo-100">
                              <p><strong>① 공감하기:</strong> &quot;용돈이 부족해서 친구들과 게임 이야기를 나눌 때 소외감이 들고 속상했겠구나.&quot;</p>
                              <p><strong>② 자책 덜기:</strong> &quot;비싼 아이템이 없다고 해서 네 매력이나 가치가 줄어드는 건 절대 아니야.&quot;</p>
                              <p><strong>③ 작은 응원:</strong> &quot;돈을 쓰지 않고도 함께 재미있게 즐길 수 있는 방법을 친구들에게 먼저 제안해 보는 건 어떨까?&quot;</p>
                              <div className="flex gap-1 pt-1">
                                <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded text-[10px] border border-rose-200 font-bold">넌 충분히 잘하고 있어! 🌟</span>
                                <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded text-[10px] border border-rose-200 font-bold">토닥토닥 힘내자 💖</span>
                                <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded text-[10px] border border-rose-200 font-bold">너의 용기를 응원해 🚀</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 2 && (
                        <div className="space-y-1.5">
                          <p>🪟 <strong>조하리의 창 대표 강점:</strong> [열린 창] 친절/이타성, 유머 · [보이지 않는 창] 끈기, 감사</p>
                          <p>✨ <strong>4대 나다움 완성 문장:</strong> &quot;친구들의 이야기를 묵묵히 들어주며 따뜻한 미소로 힘을 주는 사람이 될 거야.&quot;</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 3 && (
                        <div className="space-y-1.5">
                          <p>🎭 <strong>다중지능 &amp; 기질:</strong> 가드너 대인관계지능 1위(34점), 음악지능 2위(31점) / 따뜻한 공감의 NF 기질</p>
                          <p>🏷️ <strong>나다움 브랜딩 카드:</strong> &quot;따뜻한 공감의 NF 대인관계 조율사&quot; (#나를_응원하기 #당당하게_나를_보여줄게 #진짜_나다운_순간)</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 4 && (
                        <div className="space-y-2.5">
                          <div className="p-3 bg-pink-50/70 rounded-xl border border-pink-200 space-y-1 text-xs text-gray-800">
                            <span className="font-dodum font-bold text-pink-900 flex items-center gap-1">
                              <span>🍹</span> 33종 감정 칵테일 믹서 &amp; 주크박스 결과
                            </span>
                            <p>• <strong>감정 믹스 비율:</strong> 서운함 71%, 억울함 70%, 조급함 40%, 무기력 25%</p>
                            <p>• <strong>사건 &amp; 숨은 욕구:</strong> 모둠 과제 독박 ➔ 역할을 공평하게 분담하여 함께 완수하고 싶음</p>
                            <p>• <strong>힐링 추천곡:</strong> DAY6 - 한 페이지가 될 수 있게 (&quot;신나는 밴드 사운드로 억울함 해소&quot;)</p>
                          </div>
                          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1 text-xs text-gray-800">
                            <span className="font-dodum font-bold text-blue-900 flex items-center gap-1">
                              <span>💌</span> [특별활동] 별명 듀얼 마음 편지 (To. 매점에서 빵 사준 착한 짝꿍)
                            </span>
                            <p>💛 <strong>감사 한 컷:</strong> &quot;체육 시간에 배구 서브 실패했을 때 다독여줘서 정말 고마웠어.&quot;</p>
                            <p>💚 <strong>인사약 사과 편지:</strong> &quot;청소 당번 때 급하게 가느라 쓰레기통 비우기 떠넘겨서 미안해. 다음 주엔 솔선수범할게!&quot;</p>
                          </div>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 5 && (
                        <div className="space-y-1.5">
                          <p>🫧 <strong>감정 쿨다운 호흡:</strong> 4-7-8 긴급 SOS 호흡 3사이클(19초) 성공 완수</p>
                          <p>🧘 <strong>나만의 마인트라 다짐:</strong> &quot;귀여운 내가 참자, 화난 감정의 파도는 곧 지나간다!&quot;</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 6 && (
                        <div className="space-y-1.5">
                          <p>🃏 <strong>생각 브레이커 ABCD:</strong> &quot;친구가 내 인사를 씹었다 ➔ 못 봤거나 바빴을 뿐이야, 다른 친구에게 먼저 밝게 인사하자!&quot;</p>
                          <p>💡 <strong>비합리적 신념 전환:</strong> 흑백논리/과잉일반화 인지 왜곡 극복 성공</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 7 && (
                        <div className="space-y-1.5">
                          <p>🗑️ <strong>통제 분리수거:</strong> [통제 불가능] 지난 시험 결과, 친구의 성격 ➔ [통제 가능] 오늘 10분 오답 정리, 친절한 말투</p>
                          <p>✊ <strong>단단한 실천 다짐:</strong> &quot;내가 바꿀 수 있는 오늘의 10분 복습에 집중하자!&quot;</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 8 && (
                        <div className="space-y-1.5">
                          <p>🎰 <strong>역발상 슬롯머신:</strong> &quot;늦잠을 자서 지각 위기 ➔ 늦은 밤 스마트폰 사용 습관을 고칠 기회니까 오히려 좋아! 🍀&quot;</p>
                          <p>🌟 <strong>감사 한 컷:</strong> 오늘 하루 당연하게 여겼던 아침 식사와 맑은 하늘에 감사하기</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 9 && (
                        <div className="space-y-1.5">
                          <p>⚖️ <strong>취향 밸런스 게임:</strong> '혼자 조용히 쉬기 vs 친구들과 보드게임하기' 선택 완료</p>
                          <p>🤝 <strong>다름 인정 도장:</strong> &quot;친구의 다른 취향은 틀린 게 아니라 특별한 개성임을 인정합니다.&quot; (도장 획득 완료 ✨)</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 10 && (
                        <div className="space-y-1.5">
                          <p>💬 <strong>4단계 공감 대화 톡:</strong> &quot;부모님이 반대하셔서 진짜 답답하고 속상했겠다. 네 진심을 어떻게 전할지 같이 고민해 볼까?&quot;</p>
                          <p>👂 <strong>공감 레벨:</strong> 경청 및 감정 미러링 100% 달성</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 11 && (
                        <div className="space-y-1.5">
                          <p>🕊️ <strong>나-전달법(나사감바) 정화:</strong> &quot;너 왜 자꾸 내 지우개 말없이 가져가? (너-전달법) ➔ (상황) 네가 말없이 물건을 가져갈 때, (감정) 당황스럽고 서운해. (바람) 다음엔 먼저 물어봐 주면 좋겠어.&quot;</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 12 && (
                        <div className="space-y-1.5">
                          <p>🚪 <strong>갈등 해결 방탈출:</strong> 인사약(인정-사과-약속) 대화법 및 공마다(공감-마음-다음기약) 거절 기술 3단계 미션 올 클리어!</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 13 && (
                        <div className="space-y-1.5">
                          <p>🦋 <strong>나비효과 시뮬레이터:</strong> 사소한 험담 방관 대신 &quot;우리 다른 재미있는 이야기하자&quot;고 화제 전환 선택 ➔ 학급 평화 지수 +20 상승</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 14 && (
                        <div className="space-y-1.5">
                          <p>🏗️ <strong>협력 7층 마음 타워:</strong> 협력, 경청, 배려 스킬 카드 결합으로 우리 모둠 7층 마음 타워 견고하게 완공 🏆</p>
                        </div>
                      )}
                      {teacherInspectStudent.stage === 15 && (
                        <div className="space-y-1.5">
                          <p>🎁 <strong>15주 타임캡슐 &amp; 롤링페이퍼:</strong> 1년 뒤 나에게 보내는 편지 봉인 완료 &amp; 학급 친구 5명에게 축복 메시지 발송 완료 💌</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 섹션 2: 학생의 감정 그림일기 */}
                  <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                    <h4 className="text-sm font-dodum font-bold text-amber-950 flex items-center gap-2">
                      <span>📝</span> {teacherInspectStudent.stage}단계 감정 그림일기
                    </h4>
                    <div className="p-3.5 bg-white rounded-xl border border-amber-100 text-xs font-batang text-gray-800 leading-relaxed space-y-2">
                      <div className="font-bold text-amber-900">
                        제목: {diaries[teacherInspectStudent.stage]?.title || (() => {
                          const titles = {
                            1: "새 학년의 첫 시작, 긴장과 설렘",
                            2: "조하리의 창으로 발견한 숨은 보석",
                            3: "진짜 나다운 가면을 벗고 당당하게",
                            4: "고마움과 미안함을 전한 용기 있는 날",
                            5: "화가 날 때 4-7-8 호흡으로 찾은 평온",
                            6: "부정적인 생각을 뒤집으니 찾아온 자유",
                            7: "내가 바꿀 수 있는 것에만 온전히 집중하기",
                            8: "오히려 좋아! 실패 속에서 발견한 행운",
                            9: "친구와 나의 다름을 인정하고 존중하기",
                            10: "친구의 아픈 마음에 건넨 따뜻한 공감 한마디",
                            11: "나사감바 나-전달법으로 내 진심을 전했어요",
                            12: "지혜로운 인사약 사과로 갈등을 풀었어요",
                            13: "작은 날갯짓이 만든 따뜻한 교실의 기적",
                            14: "친구들과 마음을 모아 쌓아 올린 7층 타워",
                            15: "15주간의 빛나는 마음 성장, 안녕 나의 미래!"
                          };
                          return titles[teacherInspectStudent.stage] || (teacherInspectStudent.student.name + " 학생의 " + teacherInspectStudent.stage + "단계 마음 일기");
                        })()}
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                        {diaries[teacherInspectStudent.stage]?.content || (() => {
                          const contents = {
                            1: "처음 교실에 들어왔을 땐 눈치도 보이고 어색했지만, 고민 라디오를 들으며 나만 그런 게 아니라는 걸 알게 되었다. 친구에게 위로 엽서를 보내며 내 마음도 함께 따뜻해졌다.",
                            2: "친구가 나에게 '끈기'와 '친절' 강점을 선물해 주었다. 내가 몰랐던 내 안의 멋진 빛을 발견해서 하루 종일 기분이 뿌듯하고 행복했다.",
                            3: "남의 시선에 맞춘 착한 아이 가면 대신, 솔직하고 엉뚱한 내 본모습을 당당히 표현했다. 나다울 때 가장 반짝인다는 것을 느꼈다.",
                            4: "체육 시간 일로 고마웠던 친구에게 편지를 쓰고, 청소 당번 때 미안했던 짝꿍에게 인사약 편지를 건넸다. 마음의 짐을 덜어내어 홀가분하다.",
                            5: "사소한 일로 욱하고 화가 치밀어 올랐을 때, 4-7-8 숨쉬기를 하며 10초 쿨다운을 했다. 감정의 파도를 차분히 가라앉힐 수 있었다.",
                            6: "친구가 인사를 안 받아줘서 서운했는데, '못 봤을 수도 있지'라고 생각을 바꾸니 마음이 한결 가벼워지고 편안해졌다.",
                            7: "과거의 실수나 남들의 시선은 내가 통제할 수 없다는 걸 배웠다. 오직 내가 바꿀 수 있는 지금 이 순간에만 집중하기로 다짐했다.",
                            8: "수행평가 준비물이 망가졌을 때 '오히려 새로 더 멋지게 만들 기회야!'라고 생각했다. 긍정의 마인드가 주는 힘이 놀라웠다.",
                            9: "친구들과 취향 밸런스 게임을 하며 서로 다른 점이 많다는 걸 알았다. 다름은 틀린 게 아니라 서로를 더 풍요롭게 해주는 매력이다.",
                            10: "우울해하는 친구 곁에서 묵묵히 이야기를 들어주고 공감해 주었다. 친구가 '네 덕분에 힘이 난다'고 해줘서 가슴이 뭉클했다.",
                            11: "화내거나 비난하는 대신 '네가 그럴 때 나는 서운해'라고 나-전달법으로 표현하니 친구도 오해 없이 내 진심을 받아주었다.",
                            12: "친구와의 사소한 다툼을 피하지 않고 인사약 공식에 맞춰 솔직하게 사과했다. 한층 더 단단하고 성숙한 사이가 된 것 같다.",
                            13: "나의 사소한 따뜻한 말 한마디가 반 전체 분위기를 환하게 바꿀 수 있다는 나비효과를 직접 체감했다. 책임감 있는 선택을 할 것이다.",
                            14: "혼자서는 절대 쌓을 수 없었던 7층 마음 타워를 모둠 친구들과 양보하고 협력하며 완성했다. 함께의 가치를 깊이 깨달았다.",
                            15: "15주 동안 마음플레이를 하며 내 감정을 다스리고 친구들과 진심으로 소통하는 법을 배웠다. 훌쩍 자란 내 모습이 참 대견하다."
                          };
                          return contents[teacherInspectStudent.stage] || "오늘 하루도 내 감정을 온전히 마주하고 친구들과 소통하며 따뜻하게 성장했다.";
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* 섹션 3: 자기성찰 마음에세이 */}
                  <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
                    <h4 className="text-sm font-dodum font-bold text-purple-950 flex items-center gap-2">
                      <span>📖</span> AI 자기성찰 마음에세이 요약
                    </h4>
                    <div className="p-3.5 bg-white rounded-xl border border-purple-100 text-xs font-batang text-gray-800 leading-relaxed space-y-1">
                      <div className="font-bold text-purple-900">
                        {teacherInspectStudent.stage}단계 핵심 성찰 통찰 (Key Insight):
                      </div>
                      <p className="italic text-purple-950">
                        {(() => {
                          const essays = {
                            1: "&quot;내 안의 불안과 고민을 솔직하게 털어놓을 때, 비로소 친구와 진정한 공감의 주파수가 연결된다.&quot;",
                            2: "&quot;내가 아는 나와 친구가 보는 나의 교차점에서 비로소 진짜 빛나는 나다움의 보석이 드러난다.&quot;",
                            3: "&quot;남의 기대에 맞춘 가면을 벗어던지고 내 고유한 기질과 지능을 인정할 때 자존감이 완성된다.&quot;",
                            4: "&quot;고마움은 표현할수록 커지고, 미안함은 솔직하게 인정할 때 관계의 단단한 다리가 된다.&quot;",
                            5: "&quot;감정은 억누르는 것이 아니라, 파도처럼 자연스럽게 바라보며 호흡으로 다스려야 하는 에너지다.&quot;",
                            6: "&quot;상황 자체가 나를 괴롭히는 것이 아니라, 상황을 바라보는 나의 비합리적 생각이 나를 아프게 한다.&quot;",
                            7: "&quot;내가 바꿀 수 없는 것에 대한 집착을 버리고, 내가 통제할 수 있는 행동에 집중할 때 마음에 평화가 찾아온다.&quot;",
                            8: "&quot;모든 위기와 실패 속에는 언제나 새로운 성장을 위한 긍정의 씨앗이 숨겨져 있다.&quot;",
                            9: "&quot;우리는 모두 다르기에 특별하며, 다름을 인정하는 순간 교실은 풍요로운 화원이 된다.&quot;",
                            10: "&quot;진정한 위로는 섣부른 조언이 아니라, 상대방의 아픈 마음에 온전히 머물러주는 따뜻한 경청이다.&quot;",
                            11: "&quot;상대를 탓하는 공격적 말투를 멈추고 내 솔직한 감정과 바람을 전할 때 소통의 문이 열린다.&quot;",
                            12: "&quot;지혜로운 사과는 자존심을 꺾는 것이 아니라, 관계를 소중히 여기는 가장 성숙한 용기다.&quot;",
                            13: "&quot;내가 무심코 던진 친절한 눈빛과 말 한마디가 교실 전체에 선한 나비효과를 일으킨다.&quot;",
                            14: "&quot;혼자 가면 빨리 가지만, 친구들과 서로의 강점을 맞대며 함께 갈 때 더 높고 튼튼하게 성장한다.&quot;",
                            15: "&quot;15주간의 마음 여행을 통해 나는 내 감정의 주인이자, 타인과 따뜻하게 연대하는 성숙한 민주시민으로 자라났다.&quot;"
                          };
                          return essays[teacherInspectStudent.stage] || "&quot;감정을 억누르거나 외면하지 않고 있는 그대로 인정할 때 진정한 내면의 성장이 시작된다는 것을 깨달았다.&quot;";
                        })()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setTeacherInspectStudent(null)}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </div>
            </div>
          )}
          </main>

          <footer className="mt-8 bg-white border-t py-4 text-center text-xs text-gray-400 font-sans no-print">
            마음플레이 · 15단계 청소년 사회정서학습(SEL) 인터랙티브 웹 플랫폼
          </footer>
        </div>
      );
    }
export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F5]">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-title text-base font-bold text-gray-700">마음플레이를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return <App />;
}
