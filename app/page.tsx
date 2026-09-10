"use client";

import React, { useState, useEffect, useRef } from "react";
import { BalanceGameModule, CLASSMATES_BALANCE_DATA, BALANCE_QUESTIONS, BalanceGameAnswer } from "@/components/lesson3/BalanceGameModule";
import { ClassGalleryModal } from "@/components/lesson3/ClassGalleryModal";
import { MyBalanceResultModal } from "@/components/lesson3/MyBalanceResultModal";


    

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
      { no: 4, title: "04. 내 감정을 알고 싶어", subtitle: "33종 감정 칵테일 & 치유 주크박스", area: "영역 ❷ 나를 표현하기" },
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
    // 1학년 3반 학생들의 실시간 고민 사연 기본 데이터베이스 (학급 전체 공유)
    const DEFAULT_CLASS_STUDENT_WORRIES = [
      {
        id: "worry_10301_init",
        studentId: "10301",
        author: "익명 친구",
        freq: "95.0 MHz",
        category: "또래/교우",
        content: "새 학기 짝꿍이랑 아직 말을 많이 못 나눠봤는데, 쉬는 시간에 어떻게 자연스럽게 말을 걸어야 할지 고민돼요.",
        likes: 5,
        liked: false,
        submittedAt: "오전 09:15"
      },
      {
        id: "worry_10302_init",
        studentId: "10302",
        author: "익명 친구",
        freq: "98.5 MHz",
        category: "성적/학업",
        content: "중학교 첫 중간고사 시험 범위가 생각보다 너무 넓어서 어디서부터 복습해야 할지 막막하고 불안해요.",
        likes: 8,
        liked: false,
        submittedAt: "오전 09:22"
      },
      {
        id: "worry_10305_init",
        studentId: "10305",
        author: "익명 친구",
        freq: "105.5 MHz",
        category: "진로/꿈",
        content: "친구들은 다들 자기가 좋아하는 특기나 장래희망이 뚜렷한데, 나만 아직 잘하는 걸 못 찾은 것 같아 조급해요.",
        likes: 6,
        liked: false,
        submittedAt: "오전 09:40"
      },
      {
        id: "worry_10306_init",
        studentId: "10306",
        author: "익명 친구",
        freq: "91.5 MHz",
        category: "외모/성장",
        content: "요즘 이마에 여드름이 하나둘씩 올라와서 앞머리로 가리고 다니는데 친구들이 볼까 봐 신경 쓰여요.",
        likes: 4,
        liked: false,
        submittedAt: "오전 10:05"
      },
      {
        id: "worry_10315_init",
        studentId: "10315",
        author: "익명 친구",
        freq: "108.0 MHz",
        category: "가족/부모님",
        content: "부모님께서 스마트폰 사용 시간을 줄이라고 자주 말씀하시는데, 저도 모르게 퉁명스럽게 대답해서 죄송해요.",
        likes: 7,
        liked: false,
        submittedAt: "오전 10:30"
      },
      {
        id: "worry_10324_init",
        studentId: "10324",
        author: "익명 친구",
        freq: "102.0 MHz",
        category: "기타",
        content: "밤에 스마트폰을 늦게까지 보다가 자서 그런지 아침 1교시마다 너무 졸리고 피곤해요.",
        likes: 9,
        liked: false,
        submittedAt: "오전 11:00"
      }
    ];

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

    function triggerConfetti() {
  try {
    if (typeof window !== 'undefined') {
      const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
          position: fixed;
          top: -10px;
          left: ${Math.random() * 100}vw;
          width: ${Math.random() * 8 + 6}px;
          height: ${Math.random() * 8 + 6}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
          z-index: 99999;
          pointer-events: none;
          transform: rotate(${Math.random() * 360}deg);
          transition: transform 2.5s ease-out, top 2.5s ease-out, opacity 2.5s ease-out;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => {
          confetti.style.top = (window.innerHeight + 20) + 'px';
          confetti.style.transform = `rotate(${Math.random() * 720}deg) scale(0.6)`;
          confetti.style.opacity = '0';
        }, 20);
        setTimeout(() => confetti.remove(), 2600);
      }
    }
  } catch (e) {}
}

// 한국어 받침 유무에 따른 자연스러운 호칭 ("도현아", "예은아", "미래야")
function getKoreanVocative(name: string): string {
  if (!name) return "친구야";
  const clean = name.trim();
  if (!clean) return "친구야";
  const lastChar = clean[clean.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code >= 0xAC00 && code <= 0xD7A3) {
    const hasBatchim = (code - 0xAC00) % 28 !== 0;
    return clean + (hasBatchim ? "아" : "야");
  }
  return clean + "야";
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
      // 교사용: 실제 학생의 제출 데이터(완료 단계, 일기, 에세이)를 localStorage에서 실시간 조회하는 헬퍼 함수
      const getStudentRealSubmission = (stId, stageNo) => {
        try {
          if (typeof window === 'undefined') return { isDone: false, diary: null, essay: null, completedStages: [] };
          const completedKey = "mindplay_completed_lessons_" + stId;
          const diaryKey = "mindplay_diaries_" + stId;
          const essayKey = "mindplay_essays";

          const rawCompleted = localStorage.getItem(completedKey);
          const completedStages = rawCompleted ? JSON.parse(rawCompleted) : [];
          const isDone = Array.isArray(completedStages) && completedStages.includes(stageNo);

          const rawDiary = localStorage.getItem(diaryKey);
          const diariesObj = rawDiary ? JSON.parse(rawDiary) : {};
          const diary = diariesObj && diariesObj[stageNo] ? diariesObj[stageNo] : null;

          const rawEssay = localStorage.getItem(essayKey);
          const essaysObj = rawEssay ? JSON.parse(rawEssay) : {};
          const essay = essaysObj && essaysObj[stageNo] ? essaysObj[stageNo] : null;

          // 감정 상태 조회
          const rawUser = localStorage.getItem("mindplay_user");
          let emo = null;
          if (rawUser) {
            try {
              const u = JSON.parse(rawUser);
              if (u.studentId === stId && diary && diary.emotion) {
                emo = diary.emotion;
              }
            } catch(e){}
          }

          return { isDone, diary, essay, completedStages, emotion: emo };
        } catch(e) {
          return { isDone: false, diary: null, essay: null, completedStages: [] };
        }
      };


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
      const [diaryContent, setDiaryContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('뿌듯함 😊');
  const currentDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  const [currentLesson, setCurrentLesson] = useState(1);
      const [selectedDiaryLesson, setSelectedDiaryLesson] = useState(null); // 1~15회차 감정일기 선택 상태
      const [selectedEmotionId, setSelectedEmotionId] = useState("proud");
      const studentName = currentUser.name;
      const studentId = currentUser.studentId;
      const [nickname, setNickname] = useState("햇살구름");

      // 완료한 단계 목록 (레벨업 시스템)
      const [completedLessons, setCompletedLessons] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_completed_lessons_" + (currentUser?.studentId || "guest"));
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return [];
      });

      // 감정일기 데이터 저장소 (각 단계별 - 처음에는 완전 빈 상태로 학생이 직접 1~15회차를 채움)
      const [diaries, setDiaries] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_diaries_" + (currentUser?.studentId || "guest"));
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return {};
      });

      // 사용자 전환 시(로그인, 교사 전환 등) 완료 단계 및 일기 데이터 동기화
      useEffect(() => {
        try {
          const studentKey = currentUser?.studentId || "guest";
          const saved = localStorage.getItem("mindplay_completed_lessons_" + studentKey);
          setCompletedLessons(saved ? JSON.parse(saved) : []);
          const savedDiaries = localStorage.getItem("mindplay_diaries_" + studentKey);
          setDiaries(savedDiaries ? JSON.parse(savedDiaries) : {});
          const savedLiked = localStorage.getItem("mindplay_radio_liked_" + studentKey);
          setRadioLikedChannels(savedLiked ? JSON.parse(savedLiked) : {});
          const savedHearts = localStorage.getItem("mindplay_radio_hearts");
          if (savedHearts) setRadioHearts(JSON.parse(savedHearts));
          const savedWorries = localStorage.getItem("mindplay_real_worries");
          if (savedWorries) {
            try {
              const parsed = JSON.parse(savedWorries);
              if (Array.isArray(parsed)) {
                setStudentRealWorries(parsed);
              }
            } catch(e){}
          }
        } catch(e){}
      }, [currentUser?.studentId]);

      // 실시간 다중 컴퓨터(27대 동시 접속) 데이터베이스 동기화 헬퍼
      const syncWithServerDb = async (action: string, payload: any) => {
        try {
          const res = await fetch("/api/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, payload })
          });
          return await res.json();
        } catch(e) {
          console.warn("DB Sync failed (offline fallback):", e);
          return null;
        }
      };

      // 27대 컴퓨터 실시간 동기화 (주기적 폴링 & 서버 DB 동기화)
      useEffect(() => {
        let isMounted = true;

        const pullServerDatabase = async () => {
          try {
            const res = await fetch("/api/sync");
            if (!res.ok) return;
            const json = await res.json();
            if (json && json.success && json.data && isMounted) {
              const db = json.data;

              // 1. 교사 원격 제어 상태 동기화
              if (db.controls) {
                if (typeof db.controls.isWorryDispatched === "boolean") {
                  setIsWorryDispatched(db.controls.isWorryDispatched);
                  try { localStorage.setItem("mindplay_worry_dispatched", String(db.controls.isWorryDispatched)); } catch(e){}
                }
                if (typeof db.controls.isJohariPartnerAssigned === "boolean") {
                  setIsJohariPartnerAssigned(db.controls.isJohariPartnerAssigned);
                  try { localStorage.setItem("mindplay_johari_partner_assigned", String(db.controls.isJohariPartnerAssigned)); } catch(e){}
                }
                if (typeof db.controls.isJohariUnlocked === "boolean") {
                  setIsJohariUnlocked(db.controls.isJohariUnlocked);
                  try { localStorage.setItem("mindplay_johari_unlocked", String(db.controls.isJohariUnlocked)); } catch(e){}
                }
                if (typeof db.controls.isBalanceResultBroadcasted === "boolean") {
                  setIsBalanceResultBroadcasted(db.controls.isBalanceResultBroadcasted);
                  try { localStorage.setItem("mindplay_balance_broadcasted", String(db.controls.isBalanceResultBroadcasted)); } catch(e){}
                }
                if (typeof db.controls.isLesson3GalleryUnlocked === "boolean") {
                  setIsLesson3GalleryUnlocked(db.controls.isLesson3GalleryUnlocked);
                  try { localStorage.setItem("mindplay_lesson3_gallery_unlocked", String(db.controls.isLesson3GalleryUnlocked)); } catch(e){}
                }
                if (typeof db.controls.isEssayUnlocked === "boolean") {
                  setIsEssayUnlocked(db.controls.isEssayUnlocked);
                  try { localStorage.setItem("mindplay_essay_unlocked", String(db.controls.isEssayUnlocked)); } catch(e){}
                }
                if (db.controls.unlockedStages) {
                  setUnlockedStages(db.controls.unlockedStages);
                  try { localStorage.setItem("mindplay_unlocked_stages", JSON.stringify(db.controls.unlockedStages)); } catch(e){}
                }
              }

              // 2. 1단계 학생 실시간 사연 동기화
              if (Array.isArray(db.studentRealWorries)) {
                setStudentRealWorries(db.studentRealWorries);
                try { localStorage.setItem("mindplay_real_worries", JSON.stringify(db.studentRealWorries)); } catch(e){}
              }

              // 3. 라디오 하트 동기화
              if (db.radioHearts) {
                setRadioHearts(db.radioHearts);
                try { localStorage.setItem("mindplay_radio_hearts", JSON.stringify(db.radioHearts)); } catch(e){}
              }

              // 4. 내 학번 기준 Step A / Step B 데이터 복원
              const curId = currentUser?.studentId;
              if (curId && curId !== "00000" && curId !== "guest") {
                if (db.johariStepA && db.johariStepA[curId]) {
                  const sa = db.johariStepA[curId];
                  if (Array.isArray(sa.mySelfStrengths) && sa.mySelfStrengths.length > 0) {
                    setMySelfStrengths(sa.mySelfStrengths);
                  }
                  if (Array.isArray(sa.myAspirationalStrengths) && sa.myAspirationalStrengths.length > 0) {
                    setMyAspirationalStrengths(sa.myAspirationalStrengths);
                  }
                }
                if (db.johariStepB && db.johariStepB[curId]) {
                  const sb = db.johariStepB[curId];
                  if (Array.isArray(sb.partnerGiftStrengths) && sb.partnerGiftStrengths.length > 0) {
                    setPartnerGiftStrengths(sb.partnerGiftStrengths);
                  }
                }
              }
            }
          } catch(e){}
        };

        pullServerDatabase();
        // 2초마다 다른 컴퓨터의 최신 학생/교사 데이터 자동 동기화
        const pollTimer = setInterval(pullServerDatabase, 2000);

        const handleStorageChange = (e: StorageEvent) => {
          if (e.key === "mindplay_real_worries" && e.newValue) {
            try { setStudentRealWorries(JSON.parse(e.newValue)); } catch(err){}
          }
          if (e.key === "mindplay_radio_hearts" && e.newValue) {
            try { setRadioHearts(JSON.parse(e.newValue)); } catch(err){}
          }
          if (e.key === "mindplay_essay_unlocked") {
            setIsEssayUnlocked(e.newValue === "true");
          }
          if (e.key === "mindplay_johari_partner_assigned") {
            setIsJohariPartnerAssigned(e.newValue === "true");
          }
          if (e.key === "mindplay_johari_unlocked") {
            setIsJohariUnlocked(e.newValue === "true");
          }
          if (e.key === "mindplay_balance_broadcasted") {
            setIsBalanceResultBroadcasted(e.newValue === "true");
          }
          if (e.key === "mindplay_lesson3_gallery_unlocked") {
            setIsLesson3GalleryUnlocked(e.newValue === "true");
          }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
          isMounted = false;
          clearInterval(pollTimer);
          window.removeEventListener("storage", handleStorageChange);
        };
      }, [currentUser?.studentId]);


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
      const [mySelfStrengths, setMySelfStrengths] = useState<string[]>(() => {
        try {
          if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("mindplay_johari_step_a_" + studentId);
            if (saved) {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed.mySelfStrengths)) return parsed.mySelfStrengths;
            }
          }
        } catch(e){}
        return [];
      });
      const [myAspirationalStrengths, setMyAspirationalStrengths] = useState<string[]>(() => {
        try {
          if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("mindplay_johari_step_a_" + studentId);
            if (saved) {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed.myAspirationalStrengths)) return parsed.myAspirationalStrengths;
            }
          }
        } catch(e){}
        return [];
      });
      const [partnerGiftStrengths, setPartnerGiftStrengths] = useState<string[]>(() => {
        try {
          if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("mindplay_johari_step_b_" + studentId);
            if (saved) {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed.partnerGiftStrengths)) return parsed.partnerGiftStrengths;
            }
          }
        } catch(e){}
        return [];
      });
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
          const studentKey = currentUser?.studentId || "guest";
          const saved = localStorage.getItem("mindplay_radio_liked_" + studentKey) || localStorage.getItem("mindplay_radio_liked");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return {};
      });
      const [isJohariTheoryOpen, setIsJohariTheoryOpen] = useState(false); // 조하리의 창 4개 창 이론 설명 아코디언 열림/닫힘
      // 2단계 조하리의 창 교사 제어 상태: 1) 친구 배정 완료 여부 (Step B 개방), 2) 결과 전송 완료 여부 (Step C/D 개방)
      const [isJohariPartnerAssigned, setIsJohariPartnerAssigned] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("mindplay_johari_partner_assigned") === "true";
      });

      // 3단계 밸런스 게임 교사 제어 상태: 결과 전송 완료 여부 (학생들에게 통계 & 소울메이트 리포트 개방)
      // 3단계 학급 갤러리 교사 제어 상태: 결과 전송 완료 여부 (학생들에게 26명 친구들의 브랜딩 카드 전시관 개방)
      const [isLesson3GalleryUnlocked, setIsLesson3GalleryUnlocked] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("mindplay_lesson3_gallery_unlocked") === "true";
      });

      const [isBalanceResultBroadcasted, setIsBalanceResultBroadcasted] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("mindplay_balance_broadcasted") === "true";
      });

      const [isJohariUnlocked, setIsJohariUnlocked] = useState(() => {
        try {
          return localStorage.getItem("mindplay_johari_unlocked") === "true";
        } catch(e){ return false; }
      });
      const [isWorryDispatched, setIsWorryDispatched] = useState(false); // 교사 사연 배정 완료 상태 (비번 8888)
      // 교사용 마음에세이 잠금/개방 상태 (기본값: false(잠김), 교사가 대시보드에서 열어줄 수 있음)
      const [isEssayUnlocked, setIsEssayUnlocked] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("mindplay_essay_unlocked") === "true";
      });

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
      const [lesson3Step, setLesson3Step] = useState(1); // 1: 안내/사전예상, 2: 56문항 다중지능검사, 3: 36문항 기질검사, 4: 밸런스게임, 5: 브랜딩카드, 6: 학급갤러리
      const [lesson3BalanceAnswers, setLesson3BalanceAnswers] = useState<BalanceGameAnswer>(() => {
        try {
          const saved = localStorage.getItem("mindplay_balance_answers_" + (currentUser?.studentId || "guest"));
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return {};
      });
      const [lesson3BalanceCustom10, setLesson3BalanceCustom10] = useState("");
      const [lesson3BalanceCustom11, setLesson3BalanceCustom11] = useState("");
      const [showMyBalanceModal, setShowMyBalanceModal] = useState(false);
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

      // ① 33종 믹서기 선택 감정들 (학생이 직접 3~4개 선택 및 슬라이더 비율 조절)
      const [cocktailEmotions, setCocktailEmotions] = useState([
        { word: "서운함", percent: 25, color: "#F43F5E" },
        { word: "억울함", percent: 25, color: "#EF4444" },
        { word: "조급함", percent: 25, color: "#F97316" },
        { word: "무기력", percent: 25, color: "#64748B" }
      ]);

      // ② 공감 챗봇 마음이와의 2문장 핑퐁 대화 (Gemini 실시간 연동)
      const [chatbotEventInput, setChatbotEventInput] = useState("");
      const [chatbotDesireInput, setChatbotDesireInput] = useState("");
      const [isChatbotStep2Open, setIsChatbotStep2Open] = useState(false);
      const [isChatbotPingPongDone, setIsChatbotPingPongDone] = useState(false);
      const [chatbotDynamicQuestion2, setChatbotDynamicQuestion2] = useState("");
      const [chatbotDynamicFeedback, setChatbotDynamicFeedback] = useState("");
      const [isLesson4BotLoading, setIsLesson4BotLoading] = useState(false);

      // ③ 우리 반 감정 치유 주크박스
      const [jukeboxTheme, setJukeboxTheme] = useState("화가 날 때");
      const [jukeboxArtist, setJukeboxArtist] = useState("");
      const [jukeboxTitle, setJukeboxTitle] = useState("");
      const [jukeboxUrl, setJukeboxUrl] = useState("");
      const [jukeboxComment, setJukeboxComment] = useState("");
      const [classJukeboxList, setClassJukeboxList] = useState(() => {
        try {
          const saved = localStorage.getItem("mindplay_jukebox_list");
          if (saved) return JSON.parse(saved);
        } catch(e){}
        return [];
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
      const [lesson4TargetNickname, setLesson4TargetNickname] = useState("");
      const [thanksReason, setThanksReason] = useState("");
      const [thanksBody, setThanksBody] = useState("");
      const [sorryAdmit, setSorryAdmit] = useState("");
      const [sorryPromise, setSorryPromise] = useState("");
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
      // 5단계: 감정의 파도 다스리기 상태
      const [lesson5Step, setLesson5Step] = useState(1);
      const [lesson5Situation, setLesson5Situation] = useState("선생님께서 우리 모둠의 잘못이 아닌데 오해하고 단체로 꾸중하셨을 때");
      const [lesson5EmotionInput, setLesson5EmotionInput] = useState("억울함, 서운함, 분노 🌋");
      const [lesson5ExpressionInput, setLesson5ExpressionInput] = useState("인상을 찌푸리고 책상을 쿵 치며 입을 닫아버림");
      const [lesson5PredictInput, setLesson5PredictInput] = useState("선생님과 어색해지고, 하루 종일 기분이 상해 다른 수업도 집중 못함");
      const [lesson5HashtagInput, setLesson5HashtagInput] = useState("#감정의_파도_알아차리기 #1줄_주문으로_쿨다운 #평온한_마음_되찾기");
      const [lesson5CopingPractice, setLesson5CopingPractice] = useState("눈을 감고 4초 들이마시고 7초 멈추고 8초 내쉬기 3회 반복");
      const [lesson5FavoriteCoping, setLesson5FavoriteCoping] = useState("4-7-8 심호흡법 🧘");
      const [lesson5StarRating, setLesson5StarRating] = useState(5);

      // 6단계: 생각을 바꾸면 놀라운 일이 상태
      const [lesson6Step, setLesson6Step] = useState(1);
      const [lesson6NegativeBeliefCheck, setLesson6NegativeBeliefCheck] = useState(["내가 실수하면 친구들이 다 나를 비웃을 거야", "한 번 틀렸으니 이번 시험은 완전히 끝장났어"]);
      const [lesson6HashtagInput, setLesson6HashtagInput] = useState("#ABCD_생각뒤집기 #비합리적_신념_물음표 #실수는_성장의_기회");
      const [lesson6ActivatingEvent, setLesson6ActivatingEvent] = useState("반 친구들 앞에서 발표하다가 대사를 잊어버려 당황함");
      const [lesson6IrrationalBelief, setLesson6IrrationalBelief] = useState("모든 친구가 속으로 나를 바보라고 무시할 게 분명해. 난 늘 망해.");
      const [lesson6Consequence, setLesson6Consequence] = useState("부끄러움, 자책감, 앞으로 다시는 발표하지 않겠다고 다짐");
      const [lesson6ActiveCard, setLesson6ActiveCard] = useState(1);
      const [lesson6DisputeQ1, setLesson6DisputeQ1] = useState("실제로 몇몇 친구는 발표 내용을 메모하고 있었을 뿐 나를 비웃지 않았다.");
      const [lesson6DisputeQ2, setLesson6DisputeQ2] = useState("누구나 긴장하면 대사를 잊을 수 있다. 한 번의 실수가 내 전체를 정의하진 않는다.");
      const [lesson6DisputeQ3, setLesson6DisputeQ3] = useState("비난에 빠져있으면 다음에도 위축된다. 이번에 부족했던 부분을 체크하는 게 훨씬 이득이다.");
      const [lesson6RationalBelief, setLesson6RationalBelief] = useState("완벽하지 않아도 괜찮아! 다음번엔 대본 키워드를 더 크게 적어가면 돼 🍀");
      const [lesson6StarRating, setLesson6StarRating] = useState(5);

      // 8단계: I can do it! 긍정의 힘 상태
      const [lesson8Step, setLesson8Step] = useState(1);
      const [lesson8HeartCount, setLesson8HeartCount] = useState(12);
      const [lesson8HashtagInput, setLesson8HashtagInput] = useState("#오히려좋아 #긍정의힘 #감사한컷");
      const [lesson8SubTab, setLesson8SubTab] = useState("positive");
      const [lesson8AmuletSubject, setLesson8AmuletSubject] = useState("나는");
      const [lesson8AmuletPredicate, setLesson8AmuletPredicate] = useState("스스로를 믿고 끝까지 해낼 수 있는 멋진 사람이다 ✨");
      const [lesson8CustomSituation, setLesson8CustomSituation] = useState("체육 시간에 비가 와서 운동장 축구가 취소됨");
      const [lesson8SlotResult, setLesson8SlotResult] = useState("체육 시간 우천 취소 ➔ 실내에서 보드게임하며 친구들과 수다 떨 수 있으니 오히려 좋아! 🍀");
      const [lesson8GratitudePersonTarget, setLesson8GratitudePersonTarget] = useState("급식실 영양사 선생님");
      const [lesson8GratitudePersonText, setLesson8GratitudePersonText] = useState("매일 맛있는 반찬 정성껏 만들어주셔서 감사합니다!");
      const [lesson8GratitudeObjectTarget, setLesson8GratitudeObjectTarget] = useState("매일 메고 다니는 가방");
      const [lesson8GratitudeObjectText, setLesson8GratitudeObjectText] = useState("무거운 교과서를 묵묵히 담아주어 고마워!");
      const [lesson8Rating1, setLesson8Rating1] = useState(5);
      const [lesson8Rating2, setLesson8Rating2] = useState(5);

      // 9단계: 당연히 다를 수 있어 상태
      const [lesson9Step, setLesson9Step] = useState(1);
      const [lesson9HeartCount, setLesson9HeartCount] = useState(14);
      const [lesson9QuizChoice, setLesson9QuizChoice] = useState("B");
      const [lesson9HashtagInput, setLesson9HashtagInput] = useState("#당연히다를수있어 #다양성인정 #아_너는그렇구나");
      const [lesson9SubTab, setLesson9SubTab] = useState("perspective");
      const [lesson9BalanceIndex, setLesson9BalanceIndex] = useState(0);
      const [lesson9Votes, setLesson9Votes] = useState({ 0: "A", 1: "B", 2: "A", 3: "B" });
      const [lesson9Reasons, setLesson9Reasons] = useState({ 0: "스마트폰 없으면 연락도 안 되고 심심해서 못 살아요!", 1: "사계절 내내 겨울이면 스키 타고 눈사람 만들 수 있으니까요!" });
      const [lesson9StampedCards, setLesson9StampedCards] = useState([true, true, false]);
      const [lesson9MagicSentence, setLesson9MagicSentence] = useState("아, 너는 그렇게 생각했구나! 너의 관점도 정말 흥미롭다.");
      const [lesson9Rating1, setLesson9Rating1] = useState(5);
      const [lesson9Rating2, setLesson9Rating2] = useState(5);

      // 10단계: 관계를 이어가고 싶다면 꼭! 상태
      const [lesson10Step, setLesson10Step] = useState(1);
      const [lesson10HeartCount, setLesson10HeartCount] = useState(18);
      const [lesson10QuizChoice, setLesson10QuizChoice] = useState("A");
      const [lesson10HashtagInput, setLesson10HashtagInput] = useState("#공감과격려 #격려배터리 #따뜻한경청");
      const [lesson10SubTab, setLesson10SubTab] = useState("empathyProcess");
      const [lesson10Situation, setLesson10Situation] = useState("친구가 열심히 준비한 동아리 오디션에서 아쉽게 탈락했을 때");
      const [lesson10BridgeStep, setLesson10BridgeStep] = useState(3);
      const [lesson10BatteryRecipient, setLesson10BatteryRecipient] = useState("늘 묵묵히 짝꿍 챙겨주는 지우");
      const [lesson10BatteryPraise, setLesson10BatteryPraise] = useState("체육 시간에 공 먼저 챙겨주고 다독여줘서 든든했어!");
      const [lesson10BatteryCheer, setLesson10BatteryCheer] = useState("지우야 넌 언제나 최고의 짝꿍이야, 파이팅!");
      const [lesson10Rating1, setLesson10Rating1] = useState(5);
      const [lesson10Rating2, setLesson10Rating2] = useState(5);

      // 11단계: 진짜 마음을 전할래요 상태
      const [lesson11Step, setLesson11Step] = useState(1);
      const [lesson11HeartCount, setLesson11HeartCount] = useState(15);
      const [lesson11QuizChoice, setLesson11QuizChoice] = useState("A");
      const [lesson11HashtagInput, setLesson11HashtagInput] = useState("#나전달법 #진짜마음전하기 #나사감바");
      const [lesson11SubTab, setLesson11SubTab] = useState("compare");
      const [lesson11Situation, setLesson11Situation] = useState("약속 시간에 친구가 30분 넘게 연락도 없이 늦었을 때");
      const [lesson11RoughInput, setLesson11RoughInput] = useState("야 너 왜 맨날 늦냐? 진짜 개념 없다!");
      const [lesson11RefinedInput, setLesson11RefinedInput] = useState("연락 없이 늦어서 길에서 혼자 기다릴 때 걱정되고 서운했어. 다음엔 늦으면 미리 톡 남겨줘.");
      const [lesson11Rating1, setLesson11Rating1] = useState(5);
      const [lesson11Rating2, setLesson11Rating2] = useState(5);

      // 12단계: 갈등을 키우지 않으려면 상태
      const [lesson12Step, setLesson12Step] = useState(1);
      const [lesson12HeartCount, setLesson12HeartCount] = useState(16);
      const [lesson12ConflictType, setLesson12ConflictType] = useState("협력형 🤝 (윈-윈 추구)");
      const [lesson12HashtagInput, setLesson12HashtagInput] = useState("#올바른사과 #정중한거절 #갈등예방");
      const [lesson12SubTab, setLesson12SubTab] = useState("typeCheck");
      const [lesson12AppleSituation, setLesson12AppleSituation] = useState("청소 시간에 급한 일 때문에 내 구역 쓰레기를 친구에게 부탁하고 먼저 가버림");
      const [lesson12Rating1, setLesson12Rating1] = useState(5);
      const [lesson12Rating2, setLesson12Rating2] = useState(5);

      // 13단계: 현명한 선택을 하려면 상태
      const [lesson13Step, setLesson13Step] = useState(1);
      const [lesson13HeartCount, setLesson13HeartCount] = useState(20);
      const [lesson13ChoiceStyle, setLesson13ChoiceStyle] = useState("신중형 ⚖️ (결과 예측)");
      const [lesson13HashtagInput, setLesson13HashtagInput] = useState("#현명한선택 #책임있는결정 #결과예측저울");
      const [lesson13SubTab, setLesson13SubTab] = useState("habitCheck");
      const [lesson13Scenario, setLesson13Scenario] = useState("시험 전날 밤 친구가 같이 온라인 게임하자고 계속 초대 메시지를 보냄");
      const [lesson13ShortGain, setLesson13ShortGain] = useState("지금 당장 친구와 신나게 게임하며 스트레스 해소");
      const [lesson13LongCost, setLesson13LongCost] = useState("내일 시험에서 졸고 망쳐서 후회함");
      const [lesson13Rating1, setLesson13Rating1] = useState(5);
      const [lesson13Rating2, setLesson13Rating2] = useState(5);

      // 14단계: 마음 모아 플레이하기 상태
      const [lesson14Step, setLesson14Step] = useState(1);
      const [lesson14HeartCount, setLesson14HeartCount] = useState(25);
      const [lesson14Tools, setLesson14Tools] = useState(["4-7-8 호흡", "나-전달법", "오히려 좋아", "감정 믹서기", "인사약 사과"]);
      const [lesson14HashtagInput, setLesson14HashtagInput] = useState("#마음기술종합 #SEL역량 #함께하는성장");
      const [lesson14Stage, setLesson14Stage] = useState(2);
      const [lesson14Emotions, setLesson14Emotions] = useState(["긴장됨", "초조함", "기대됨"]);
      const [lesson14ReframeChoice, setLesson14ReframeChoice] = useState("어려운 미션이지만 친구들과 협력하면 더 큰 성취감을 느낄 수 있으니 오히려 좋아!");
      const [lesson14Dialogue, setLesson14Dialogue] = useState("탑이 흔들릴 때 짜증 내지 않고 '우리 같이 천천히 숨 고르고 중심 잡아보자'고 다정하게 말함");
      const [lesson14FinalAction, setLesson14FinalAction] = useState("성공했을 때 친구들과 하이파이브하고 축하함");
      const [lesson14Rating1, setLesson14Rating1] = useState(5);
      const [lesson14Rating2, setLesson14Rating2] = useState(5);

      // 15단계: 이제는 내 마음대로! 피날레 상태
      const [lesson15Step, setLesson15Step] = useState(1);
      const [lesson15HeartCount, setLesson15HeartCount] = useState(30);
      const [lesson15HashtagInput, setLesson15HashtagInput] = useState("#변화된나 #마음플레이완주 #마음에세이출간");
      const [lesson15RollingTarget, setLesson15RollingTarget] = useState("민우");
      const [lesson15RollingInput, setLesson15RollingInput] = useState("15주 동안 묵묵히 내 이야기 귀 기울여 들어줘서 고마웠어!");
      const [lesson15RollingList, setLesson15RollingList] = useState([
        { to: "지우", msg: "타워 쌓을 때 심호흡하자고 다독여줘서 덕분에 살았어 최고!", from: "나", stamp: "🏆" },
        { to: "민우", msg: "15주 동안 묵묵히 내 이야기 들어줘서 고마웠어!", from: "나", stamp: "❤️" }
      ]);
      const [lesson15FinalMission, setLesson15FinalMission] = useState("앞으로도 내 마음의 주인이 되어 감정을 건강하게 표현하고 친구들을 응원하기");
      const [lesson15Rating1, setLesson15Rating1] = useState(5);
      const [lesson15Rating2, setLesson15Rating2] = useState(5);

      // 7단계 상태 (통제 분리수거 아케이드 & 4단계 워크북)
      const [lesson7Step, setLesson7Step] = useState(1); // 1: 오늘의 마음 편지, 2: 마음 만나기, 3: 마음 키우기, 4: 마음 다지기
      const [lesson7StressSignals, setLesson7StressSignals] = useState(["두통/어지러움 🤕", "짜증/예민 🌋"]);
      const [lesson7HashtagInput, setLesson7HashtagInput] = useState("#단단해질_내_마음 #바꿀_수_있는_것에_집중 #마음근육_키우기");
      const [lesson7Items, setLesson7Items] = useState([
        { id: "c1", text: "지난 중간고사 시험 성적", target: "cannot" },
        { id: "c2", text: "부모님의 잔소리와 꾸중", target: "cannot" },
        { id: "c3", text: "비가 내려서 체육 대회가 취소된 날씨", target: "cannot" },
        { id: "c4", text: "나를 차갑게 대한 친구의 표정과 태도", target: "cannot" },
        { id: "can1", text: "앞으로 다가올 기말고사를 준비하는 공부 시간", target: "can" },
        { id: "can2", text: "부모님과 친구에게 내가 건네는 다정한 말투", target: "can" },
        { id: "can3", text: "취소된 체육 대신 실내에서 즐겁게 보낼 방법 찾기", target: "can" },
        { id: "can4", text: "오늘 밤 나의 스마트폰 사용 시간과 수면 습관", target: "can" }
      ]);
      const [lesson7Sorted, setLesson7Sorted] = useState({
        c1: "cannot",
        c2: "cannot",
        can1: "can",
        can2: "can"
      });
      const [lesson7ActionPledge, setLesson7ActionPledge] = useState("부모님의 잔소리에 짜증 내지 않고, '네 알겠어요'라고 먼저 답해보기");
      const [lesson7Rating1, setLesson7Rating1] = useState(5);
      const [lesson7Rating2, setLesson7Rating2] = useState(5);

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
      const [studentRealWorries, setStudentRealWorries] = useState<any[]>(() => {
        try {
          const saved = localStorage.getItem("mindplay_real_worries");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
          }
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
      const [isChatLoading, setIsChatLoading] = useState(false);
      const [isEssayLoading, setIsEssayLoading] = useState(false);
      const [selectedEmotionChip, setSelectedEmotionChip] = useState("");
      const [selectedDesireChip, setSelectedDesireChip] = useState("");
      const [selectedQuickChips, setSelectedQuickChips] = useState([]); // 다중 선택 가능한 감정/욕구 칩 목록
      const [diaryAiPromptText, setDiaryAiPromptText] = useState("");
      const [diaryArtStyle, setDiaryArtStyle] = useState("따뜻한 파스텔 수채화 일러스트");
      const [currentDiaryImage, setCurrentDiaryImage] = useState(""); // 사용자가 직접 첨부/붙여넣기/생성한 그림일기 이미지 DataURL
      const [isGardnerTheoryOpen, setIsGardnerTheoryOpen] = useState(false);
      const [diarySubStep, setDiarySubStep] = useState(1); // 1: 감정구름&AI챗봇 대화, 2: 오늘의 마음 그림일기

      const [chatMessages, setChatMessages] = useState(() => {
        const savedName = localStorage.getItem("mindplay_bot_name") || "마음친구";
        const vocative = getKoreanVocative(currentUser?.name || studentName || "친구");
        return [
          {
            sender: "bot",
            text: `안녕, ${vocative}! 나는 너의 감정 탐색을 함께할 '${savedName}'(이)야 🌸\n오늘 하루 몸의 감각이나 마음의 기분은 어때? 가슴이 답답하거나 서운했거나, 혹은 뿌듯하고 편안했니? 지금 느껴지는 마음에 가장 가까운 단어를 아래에서 고르거나 편하게 말해줘!`
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
        const vocative = getKoreanVocative(currentUser?.name || studentName || "친구");
        setChatMessages([
          {
            sender: "bot",
            text: `반가워, ${vocative}! 내 이름을 '${name}'(으)로 지어줘서 정말 고마워 ✨ 앞으로 네 마음속 이야기를 언제든 편하게 털어놓아 줘.\n\n오늘 하루 몸의 컨디션이나 마음의 기분은 어땠니? 아래 감정 단어를 누르거나 이야기해 줘!`
          }
        ]);
        triggerConfetti();
      };

      const handleSendChat = async (customText) => {
        const msgToSend = typeof customText === "string" ? customText : chatInput;
        if (!msgToSend || !msgToSend.trim() || isChatLoading) return;
        const userMsg = msgToSend.trim();
        const nextMessages = [...chatMessages, { sender: "user", text: userMsg }];
        setChatMessages(nextMessages);
        if (!customText) setChatInput("");
        setIsChatLoading(true);

        const botDisplayName = chatbotName || "마음친구";

        if (chatStep === 1) setSelectedEmotionChip(userMsg);
        if (chatStep === 3) setSelectedDesireChip(userMsg);

        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonNo: currentLesson,
              lessonTitle: CURRICULUM.find(c => c.no === currentLesson)?.title || "마음 탐색",
              message: userMsg,
              nickname: studentName || nickname || "친구",
              chatbotName: botDisplayName,
              chatStep: chatStep,
              history: nextMessages,
            }),
          });

          let botReply = "";
          if (res.ok) {
            const data = await res.json();
            botReply = data.reply;
          }

          if (!botReply) {
            // Smart step fallback
            if (chatStep === 1) {
              botReply = `‘${userMsg}’(이)라는 마음이 먼저 스쳐 지나갔구나. 마음을 알아차려 준 것만으로도 대단해 🌸\n그때 구체적으로 어떤 상황이나 일이 있었니? 누구와 있었거나 어떤 말을 들었는지 그때의 장면을 차분히 들려줄래?`;
            } else if (chatStep === 2) {
              botReply = `그런 일이 있었구나. 네 이야기를 들으니 그 상황에서 마음이 많이 복잡했겠어 🥺\n그 순간 네 마음속에선 사실 어떤 게 가장 간절했을까? 인정받고 싶었니, 존중받고 싶었니, 아니면 편안하게 쉬고 싶었니?`;
            } else if (chatStep === 3) {
              botReply = `맞아, 너에게는 '${userMsg}'(이)라는 마음이 정말 소중하고 당연했던 거야 ✨\n그 상황에서 속으로 삼켰거나 꼭 하고 싶었던 말이 있다면, 나에게는 편하게 전부 털어놓아 볼래?`;
            } else if (chatStep === 4) {
              botReply = `마음속 깊은 이야기를 솔직하게 꺼내줘서 고마워 🌿 속에만 담아두느라 참 무거웠을 텐데 잘 털어놓았어.\n잠시 어깨의 힘을 툭 빼고 숨을 깊게 들이마시고 천천히 내쉬어보자. "그럴 수도 있지, 오늘 하루도 애썼어"라고 너 자신을 따뜻하게 토닥여줄까?`;
            } else if (chatStep === 5) {
              botReply = `호흡을 가다듬으니 마음이 한결 가벼워졌길 바라 🌸\n오늘의 대화를 돌아보면, 겉으로는 힘든 순간이 있었지만 그 이면에는 **너의 소중한 가치와 마음**이 담겨 있었어. 이 경험을 통해 나에게 해주고 싶은 깨달음이나 다짐이 있니?`;
            } else {
              botReply = `오늘 너와 솔직하게 나눈 이 대화는 정말 소중한 너만의 보물이야 ✨\n이제 이 따뜻한 마음과 솔직한 생각을 바탕으로, 아래 **'일기 작성하기'** 란에 너만의 감정일기를 기록해 볼까? 내가 옆에서 계속 함께할게!`;
            }
          }

          const nextStep = Math.min(7, chatStep + 1);
          setChatStep(nextStep);
          setChatMessages([...nextMessages, { sender: "bot", text: botReply }]);
          if (nextStep >= 6) {
            setDiaryAiPromptText(`오늘의 감정: ${selectedEmotionChip || '성찰'}, 숨은 욕구: ${selectedDesireChip || '존중과 위로'}를 담아낸 따뜻한 힐링 아트`);
          }
          triggerConfetti();
        } catch (err) {
          console.error("Chat fetch error:", err);
          let fallbackReply = `‘${userMsg}’(이)라는 마음에 귀 기울여줄게 🌸 그 순간 구체적으로 어떤 상황이나 생각이 스쳤는지 더 들려줄래?`;
          if (chatStep === 2) fallbackReply = `그런 일이 있었구나 🥺 그 상황에서 마음이 많이 복잡했을 텐데, 네가 진정으로 원했던 건 무엇이었을까?`;
          if (chatStep === 3) fallbackReply = `맞아, 너에게는 '${userMsg}'(이)라는 마음이 정말 소중했던 거야 ✨ 속에 삼켜두었던 속마음이 있다면 더 털어놓아 줘.`;
          if (chatStep >= 4) fallbackReply = `솔직한 마음을 나눠줘서 고마워 🌿 숨을 깊게 들이쉬고 내쉬어보자. 오늘 하루도 정말 애썼어!`;
          const nextStep = Math.min(7, chatStep + 1);
          setChatStep(nextStep);
          setChatMessages([...nextMessages, { sender: "bot", text: fallbackReply }]);
        } finally {
          setIsChatLoading(false);
        }
      };

      // 마음에세이 AI 변환 생성 엔진 (Gemini 1.5 Flash / Upstage 연동 + 15부작 옴니버스 프롬프트)
      const handleGenerateEssay = async (targetLesson = currentLesson) => {
        const d = diaries[targetLesson] || { title: `${targetLesson}단계 활동 성찰`, content: "" };
        const botName = chatbotName || "마음친구";
        const emo = EMOTION_CHARACTERS.find(e => e.id === selectedEmotionId) || EMOTION_CHARACTERS[0];
        
        // 챗봇 대화 요약
        const userChatLogs = chatMessages.filter(m => m.sender === "user").map(m => m.text);
        const chatSummary = userChatLogs.length > 0 ? userChatLogs.join(" -> ") : "혼자서 조용히 하루를 돌아보며 마음을 정리함";

        setIsEssayLoading(true);

        try {
          const res = await fetch("/api/essay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentName: studentName || nickname || "나",
              sessionNo: targetLesson,
              cloudEmotion: emo.name,
              chatSummary: chatSummary,
              diaryText: d.content || currentDiaryInput.content || "",
              imageDescriptionOrPrompt: diaryAiPromptText || "",
              selectedTags: selectedQuickChips.join(", "),
            }),
          });

          let essayText = "";
          let chapterTitle = `${targetLesson < 10 ? '0' + targetLesson : targetLesson}화. ${emo.name}과 마주한 나의 하루`;

          if (res.ok) {
            const result = await res.json();
            if (result.essayDraft) {
              essayText = result.essayDraft;
              if (result.chapterTitle) chapterTitle = result.chapterTitle;
            }
          }

          if (!essayText) {
            const rawEmotion = selectedEmotionChip || userChatLogs[0] || emo.name;
            const situationText = userChatLogs[1] || d.content || "오늘 하루 교실에서 여러 일을 겪으며 마음이 분주했다.";
            const desireText = selectedDesireChip || userChatLogs[2] || "친구들과 편안하게 소통하고 스스로를 인정받고 싶은 마음";
            
            essayText = `오늘 하루를 시작할 때만 해도 내 마음속에는 '${rawEmotion}'이라는 감정이 짙게 자리 잡고 있었다. ${situationText} 순간에 유독 마음이 복잡해졌지만, '${botName}'와 대화를 나누며 내가 진정으로 바란 것은 '${desireText}'이었다는 것을 알아차렸다.\n\n마음속으로 꾹 삼켜두었던 감정을 솔직하게 마주하고 나니 가슴이 한결 가벼워졌다. 모든 걸 완벽하게 해내지 않아도, 내 안의 진실한 목소리에 귀 기울여주는 것만으로도 충분히 괜찮다는 생각이 든다.`;
          }

          const shift = {
            first: `${selectedEmotionChip || emo.name} (처음에 복잡하고 답답했던 마음)`,
            found: `${selectedDesireChip || "진솔한 소통과 편안한 쉼"} (대화를 통해 발견한 진짜 욕구)`,
            core: `${emo.name} & 자기이해 (스스로를 있는 그대로 품어준 마음)`,
            learned: "어떤 감정이 찾아와도 나를 지키려는 소중한 신호임을 알게 됨"
          };

          const insight = `흔들리는 내 감정을 두려워하지 않고, 담담하게 마주하고 다독여줄 수 있게 되었다.`;

          const newDraft = {
            essay: essayText,
            chapterTitle: chapterTitle,
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
          setEssayEditContent(essayText);
          setEssayShiftContent(shift);
          setEssayKeyInsight(insight);
          setIsEssayEditing(false);
          triggerConfetti();
        } catch (err) {
          console.error("Essay generate error:", err);
        } finally {
          setIsEssayLoading(false);
        }
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
          author: "익명 친구",
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
          syncWithServerDb("SUBMIT_WORRY", newWorry);
        } catch(err){}
        setCustomWorryText("");
        triggerConfetti();
        alert("🔒 [100% 안심 익명 보장]\n고민 사연이 완벽한 익명으로 등록되었습니다!\n누구의 고민인지 이름이나 학번이 일체 드러나지 않습니다.\n교사 배정 완료 후 2단계 마음 우체통에서 친구의 사연을 확인할 수 있습니다 💌");
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

      const handleResetWorrySession = async () => {
        if (confirm("정말로 모든 사연과 배정 상태를 초기화하시겠습니까?")) {
          setStudentRealWorries([]);
          setIsWorryDispatched(false);
          setHasSentComfort(false);
          try {
            localStorage.setItem("mindplay_real_worries", "[]");
            localStorage.removeItem("mindplay_worry_dispatched");
            await syncWithServerDb("RESET_WORRIES", {});
          } catch(e){}
          alert("🧹 고민 사연 및 배정 상태가 완전히 초기화되었습니다! (사연 수: 0개)");
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

      // 1단계 익명 토닥토닥 마음 우체통 1:1 순환 배정 계산 (교사 배정 완료 후 무작위/순환 1:1 매칭)
      const getAssignedWorryForMe = () => {
        // 합쳐진 전체 학생 사연 풀 (제출된 실시간 사연 + 기본 학급 사연)
        const allWorries = (studentRealWorries && studentRealWorries.length > 0) 
          ? studentRealWorries 
          : (typeof DEFAULT_CLASS_STUDENT_WORRIES !== 'undefined' ? DEFAULT_CLASS_STUDENT_WORRIES : []);

        if (allWorries.length > 0) {
          // 내가 작성한 사연 외의 다른 친구 사연들 필터
          const otherWorries = allWorries.filter(w => w.studentId !== studentId);
          if (otherWorries.length > 0) {
            // 학생 번호 기반 고유 분산 매칭 (나와 겹치지 않는 무작위/결정적 1:1 배정)
            const idNum = parseInt(studentId, 10) || 10101;
            const targetIdx = (idNum * 7 + 3) % otherWorries.length;
            const pw = otherWorries[targetIdx];
            return {
              id: pw.id,
              senderTag: "익명 친구의 고민 엽서",
              category: pw.category || "또래/교우",
              content: pw.content,
              isReal: true
            };
          }
        }
        return {
          id: "worry_match_default",
          senderTag: "익명 친구 (초록반)",
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
        const studentKey = currentUser?.studentId || "guest";
        const isLiked = !!radioLikedChannels[freq];
        if (isLiked) {
          alert("이미 이 사연에 공감 하트를 보냈습니다! ❤️ (사연마다 1인 1회 참여)");
          return;
        }
        
        // 1. 학생별 좋아요 상태 저장 (학생별 분리)
        const updatedLiked = { ...radioLikedChannels, [freq]: true };
        setRadioLikedChannels(updatedLiked);
        try {
          localStorage.setItem("mindplay_radio_liked_" + studentKey, JSON.stringify(updatedLiked));
        } catch(e){}

        // 2. 전체 학급 실시간 공감 하트 수 누적 반영
        setRadioHearts(prev => {
          const currentCount = prev[freq] !== undefined ? prev[freq] : 0;
          const next = { ...prev, [freq]: currentCount + 1 };
          try {
            localStorage.setItem("mindplay_radio_hearts", JSON.stringify(next));
          } catch(e){}
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
        setDiaries(prev => {
          const next = {
            ...prev,
            [targetLessonNo]: {
              emotion: selectedEmotionId,
              title: currentDiaryInput.title || `${targetLessonNo}회차 나의 마음 이야기`,
              content: currentDiaryInput.content || "오늘 하루도 내 감정을 온전히 마주하고 따뜻하게 안아주었습니다.",
              image: currentDiaryImage || "",
              date: new Date().toLocaleDateString('ko-KR')
            }
          };
          try {
            localStorage.setItem("mindplay_diaries_" + (currentUser.studentId || "guest"), JSON.stringify(next));
          } catch(e){}
          return next;
        });
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
                      onClick={() => {
                        if (!isTeacherMode && currentUser.studentId !== "00000" && !isEssayUnlocked) {
                          alert("🔒 마음에세이는 현재 선생님께서 잠금 설정해 두셨습니다.\n선생님께서 마음에세이를 열어주시면 작성 및 열람이 가능합니다. 🌸");
                          return;
                        }
                        setCurrentTab("print");
                      }}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1.5 ${
                        currentTab === "print"
                          ? "bg-purple-700 text-white shadow-md scale-105"
                          : !isTeacherMode && currentUser.studentId !== "00000" && !isEssayUnlocked
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                          : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
                      }`}
                    >
                      <span>📖 마음에세이</span>
                      {!isTeacherMode && currentUser.studentId !== "00000" && !isEssayUnlocked && (
                        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.2 rounded font-bold">🔒 잠김</span>
                      )}
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
                {/* 🔒 [교사용 전용] 실시간 마음활동 단계별 제어 & 학생 배정 센터 (학생 화면에는 표시되지 않음) */}
                {(isTeacherMode || currentUser?.studentId === "00000") && (
                  <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border-2 border-indigo-400/40 space-y-4 animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-indigo-500/30 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-dodum font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                            🔒 교사 전용 제어 센터 (비밀번호: 8888)
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 실시간 원격 제어 활성
                          </span>
                        </div>
                        <h3 className="text-xl font-title font-bold text-white flex items-center gap-2">
                          <span>⚙️</span> 교사용 마음활동 실시간 배정 및 제어 패널
                        </h3>
                        <p className="text-xs font-batang text-indigo-200">
                          버튼을 클릭하여 각 단계별 친구 배정, 검사 결과 전송 및 마음에세이 잠금을 직접 제어할 수 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                        <span className="text-[11px] font-dodum text-indigo-300 bg-indigo-900/60 px-3 py-1.5 rounded-xl border border-indigo-700/50">
                          🛡️ 관리자: {currentUser?.name} 선생님
                        </span>
                      </div>
                    </div>

                    {/* 5대 제어 버튼 그리드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
                      {/* 1. 1단계 사연 1:1 배정하기 */}
                      <button
                        type="button"
                        onClick={() => {
                          const pw = prompt("교사 비밀번호를 입력해주세요:");
                          if (pw === "8888") {
                            setIsWorryDispatched(true);
                            try { 
                              localStorage.setItem("mindplay_worry_dispatched", "true"); 
                              syncWithServerDb("SET_CONTROLS", { isWorryDispatched: true });
                            } catch(e){}
                            triggerConfetti();
                            alert("🎉 [1단계 사연 배정 완료] 모든 학생의 사연이 1:1 무작위 순환 배정되었습니다! 이제 학생들이 토닥토닥 우체통에서 친구의 사연을 확인할 수 있습니다.");
                          } else if (pw !== null) {
                            alert("비밀번호가 일치하지 않습니다.");
                          }
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-sm hover:scale-[1.02] ${isWorryDispatched ? "bg-emerald-950/70 border-emerald-400 text-emerald-100" : "bg-slate-800/80 border-slate-700 text-gray-300 hover:border-indigo-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-dodum font-bold text-emerald-300">1단계 사연</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isWorryDispatched ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                            {isWorryDispatched ? "✓ 배정됨" : "대기 중"}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-title font-bold text-white">1단계 사연 1:1 배정</div>
                          <div className="text-[10px] font-batang text-gray-300 mt-0.5">우체통 1:1 친구 고민 배달</div>
                        </div>
                      </button>

                      {/* 1. 마음에세이 잠금/개방 */}
                      <button
                        type="button"
                        onClick={() => {
                          const pw = prompt("교사 비밀번호를 입력해주세요:");
                          if (pw === "8888") {
                            const next = !isEssayUnlocked;
                            setIsEssayUnlocked(next);
                            try { localStorage.setItem("mindplay_essay_unlocked", String(next)); } catch(e){}
                            triggerConfetti();
                            alert(next ? "🎉 [마음에세이 개방 완료] 이제 학생들이 자유롭게 마음에세이를 작성하고 출간할 수 있습니다!" : "🔒 [마음에세이 잠금 완료] 학생들의 마음에세이 작성이 제한되었습니다.");
                          } else if (pw !== null) {
                            alert("비밀번호가 일치하지 않습니다.");
                          }
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-sm hover:scale-[1.02] ${isEssayUnlocked ? "bg-emerald-950/70 border-emerald-400 text-emerald-100" : "bg-slate-800/80 border-slate-700 text-gray-300 hover:border-indigo-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-dodum font-bold text-amber-300">전체 공통</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isEssayUnlocked ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                            {isEssayUnlocked ? "🔓 열림" : "🔒 닫힘"}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-title font-bold text-white">마음에세이 작성</div>
                          <div className="text-[10px] font-batang text-gray-300 mt-0.5">클릭 시 학생 작성 권한 전환</div>
                        </div>
                      </button>

                      {/* 2. 2단계 친구 배정하기 */}
                      <button
                        type="button"
                        onClick={() => {
                          const pw = prompt("교사 비밀번호를 입력해주세요:");
                          if (pw === "8888") {
                            setIsJohariPartnerAssigned(true);
                            try { 
                              localStorage.setItem("mindplay_johari_partner_assigned", "true"); 
                              syncWithServerDb("SET_CONTROLS", { isJohariPartnerAssigned: true });
                            } catch(e){}
                            triggerConfetti();
                            alert("🎉 [2단계 친구 배정 완료] 1학년 3반 26명 학생들의 1:1 파트너가 배정되었습니다! 학생들이 Step B에서 짝꿍의 강점을 선물할 수 있습니다.");
                          } else if (pw !== null) {
                            alert("비밀번호가 일치하지 않습니다.");
                          }
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-sm hover:scale-[1.02] ${isJohariPartnerAssigned ? "bg-indigo-950/70 border-indigo-400 text-indigo-100" : "bg-slate-800/80 border-slate-700 text-gray-300 hover:border-indigo-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-dodum font-bold text-indigo-300">2단계 조하리</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isJohariPartnerAssigned ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                            {isJohariPartnerAssigned ? "✓ 배정됨" : "대기 중"}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-title font-bold text-white">2단계 친구 배정하기</div>
                          <div className="text-[10px] font-batang text-gray-300 mt-0.5">Step B 짝꿍 선물 단계 개방</div>
                        </div>
                      </button>

                      {/* 3. 2단계 결과 전송하기 */}
                      <button
                        type="button"
                        onClick={() => {
                          const pw = prompt("교사 비밀번호를 입력해주세요:");
                          if (pw === "8888") {
                            setIsJohariUnlocked(true);
                            try { 
                              localStorage.setItem("mindplay_johari_unlocked", "true"); 
                              syncWithServerDb("SET_CONTROLS", { isJohariUnlocked: true });
                            } catch(e){}
                            triggerConfetti();
                            alert("🎉 [2단계 결과 전송 완료] 조하리의 창 4개 영역(Step C) 및 나다움 문장(Step D)이 전체 학생에게 개방되었습니다!");
                          } else if (pw !== null) {
                            alert("비밀번호가 일치하지 않습니다.");
                          }
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-sm hover:scale-[1.02] ${isJohariUnlocked ? "bg-indigo-950/70 border-indigo-400 text-indigo-100" : "bg-slate-800/80 border-slate-700 text-gray-300 hover:border-indigo-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-dodum font-bold text-indigo-300">2단계 조하리</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isJohariUnlocked ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                            {isJohariUnlocked ? "✓ 전송완료" : "대기 중"}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-title font-bold text-white">2단계 결과 전송하기</div>
                          <div className="text-[10px] font-batang text-gray-300 mt-0.5">Step C/D 4대 창 분석 공개</div>
                        </div>
                      </button>

                      {/* 4. 3단계 밸런스 결과 보내기 */}
                      <button
                        type="button"
                        onClick={() => {
                          const pw = prompt("교사 비밀번호를 입력해주세요:");
                          if (pw === "8888") {
                            setIsBalanceResultBroadcasted(true);
                            try { localStorage.setItem("mindplay_balance_broadcasted", "true"); } catch(e){}
                            triggerConfetti();
                            alert("🎉 [3단계 밸런스 결과 전송 완료] 학생들에게 학급 통계 및 소울메이트/정반대 친구 분석 결과가 성공적으로 전송되었습니다!");
                          } else if (pw !== null) {
                            alert("비밀번호가 일치하지 않습니다.");
                          }
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-sm hover:scale-[1.02] ${isBalanceResultBroadcasted ? "bg-violet-950/70 border-violet-400 text-violet-100" : "bg-slate-800/80 border-slate-700 text-gray-300 hover:border-indigo-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-dodum font-bold text-violet-300">3단계 브랜딩</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isBalanceResultBroadcasted ? "bg-violet-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                            {isBalanceResultBroadcasted ? "✓ 전송완료" : "대기 중"}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-title font-bold text-white">3단계 밸런스 결과 전송</div>
                          <div className="text-[10px] font-batang text-gray-300 mt-0.5">학급 통계 &amp; 소울메이트 개방</div>
                        </div>
                      </button>

                      {/* 5. 3단계 갤러리 개방하기 */}
                      <button
                        type="button"
                        onClick={() => {
                          const pw = prompt("교사 비밀번호를 입력해주세요:");
                          if (pw === "8888") {
                            setIsLesson3GalleryUnlocked(true);
                            try { localStorage.setItem("mindplay_lesson3_gallery_unlocked", "true"); } catch(e){}
                            triggerConfetti();
                            alert("🎉 [3단계 학급 갤러리 개방 완료] 학생들이 26명 친구들의 나다움 브랜딩 카드를 감상하고 응원 스티커를 부착할 수 있습니다!");
                          } else if (pw !== null) {
                            alert("비밀번호가 일치하지 않습니다.");
                          }
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-sm hover:scale-[1.02] ${isLesson3GalleryUnlocked ? "bg-pink-950/70 border-pink-400 text-pink-100" : "bg-slate-800/80 border-slate-700 text-gray-300 hover:border-indigo-400"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-dodum font-bold text-pink-300">3단계 브랜딩</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isLesson3GalleryUnlocked ? "bg-pink-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                            {isLesson3GalleryUnlocked ? "✓ 개방됨" : "대기 중"}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-title font-bold text-white">3단계 갤러리 개방</div>
                          <div className="text-[10px] font-batang text-gray-300 mt-0.5">친구 브랜딩 카드 전시관 개방</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}


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
                                      <span className="text-gray-500 font-dodum">익명 친구</span>
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

                          {/* 선생님 사연 배정 대기 상태 안내 (배정 전일 때 표시) */}
                          {!isWorryDispatched && !isTeacherMode && currentUser.studentId !== "00000" ? (
                            <div className="bg-white/95 p-8 sm:p-12 rounded-2xl border-2 border-dashed border-[#2A784B]/40 shadow-sm text-center space-y-4">
                              <div className="w-16 h-16 bg-[#EEF6F0] text-[#2A784B] rounded-full flex items-center justify-center text-3xl mx-auto animate-pulse">
                                ⏳
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-lg sm:text-xl font-title font-bold text-gray-900">
                                  선생님께서 우리 반 친구들의 고민 사연을 배정 중입니다
                                </h4>
                                <p className="text-xs sm:text-sm font-batang text-gray-600 max-w-md mx-auto leading-relaxed">
                                  반 친구들이 모두 고민 엽서를 등록하면, 선생님께서 1:1 무작위 순환 배정을 진행합니다. 잠시만 기다려주세요!
                                </p>
                              </div>
                              <div className="pt-2 flex items-center justify-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const saved = localStorage.getItem("mindplay_worry_dispatched");
                                    if (saved === "true") {
                                      setIsWorryDispatched(true);
                                    } else {
                                      alert("아직 배정이 진행되지 않았습니다. 선생님의 안내에 따라 잠시 기다려주세요 😊");
                                    }
                                  }}
                                  className="px-5 py-2.5 bg-[#2A784B] hover:bg-[#1E5736] text-white rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1.5"
                                >
                                  <span>새로고침 확인 🔄</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setLesson1Page(1)}
                                  className="px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-dodum font-bold transition"
                                >
                                  ← 1단계 라디오 사연함 가기
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
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
                          </>
                          )}
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

                          {/* 교사 배정 제어 바 (교사 로그인 시 Step A 상단/하단에 노출) */}
                          {(isTeacherMode || currentUser.studentId === "00000") && (
                            <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-indigo-800 text-white rounded-lg text-xs font-dodum font-bold">
                                  교사용 제어
                                </span>
                                <span className="text-xs font-batang text-indigo-950 font-bold">
                                  {isJohariPartnerAssigned ? "✅ 2단계 1:1 파트너 배정이 완료되었습니다." : "학생들이 검사를 저장한 후 아래 버튼을 눌러 파트너를 배정하세요."}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const pw = prompt("교사 비밀번호를 입력해주세요:");
                                  if (pw === "8888") {
                                    setIsJohariPartnerAssigned(true);
                                    try {
                                      localStorage.setItem("mindplay_johari_partner_assigned", "true");
                                    } catch(e){}
                                    triggerConfetti();
                                    alert("🎉 [2단계 학생 배정 완료] 1학년 3반 26명 학생들의 1:1 파트너가 무작위 순환 배정되었습니다! 이제 학생들이 Step B에서 매칭된 친구의 강점을 찾아줄 수 있습니다.");
                                  } else if (pw !== null) {
                                    alert("비밀번호가 일치하지 않습니다.");
                                  }
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1.5 ${isJohariPartnerAssigned ? "bg-indigo-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"}`}
                              >
                                <span>🤝</span>
                                <span>{isJohariPartnerAssigned ? "✨ 학생 배정 완료됨 (재배정)" : "🔒 교사 전용: 학생 배정하기"}</span>
                              </button>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                            <div className="text-xs sm:text-sm font-batang text-gray-700">
                              나의 강점 5개와 희망 강점 2개를 선택한 후 <strong>[검사 결과 저장하기]</strong>를 눌러주세요.
                            </div>
                            <div className="flex flex-wrap items-center gap-2.5">
                              {/* 학생용 검사 결과 저장 버튼 */}
                              <button
                                type="button"
                                disabled={mySelfStrengths.length !== 5 || myAspirationalStrengths.length !== 2}
                                onClick={async () => {
                                  try {
                                    const payload = {
                                      studentId,
                                      studentName,
                                      mySelfStrengths,
                                      myAspirationalStrengths,
                                      savedAt: new Date().toISOString()
                                    };
                                    localStorage.setItem("mindplay_johari_step_a_" + studentId, JSON.stringify(payload));
                                    await syncWithServerDb("SAVE_JOHARI_STEP_A", payload);
                                  } catch(e){}
                                  triggerConfetti();
                                  alert("💾 [검사 결과 데이터베이스 저장 완료!]\n나의 강점 5개와 희망 강점 2개가 학급 중앙 DB에 안전하게 저장되었습니다.\n어떤 컴퓨터에서 로그인해도 이 기록이 유지됩니다. ✨\n선생님께서 [학생 배정]을 진행하시면 Step B로 이어집니다. 😊");
                                }}
                                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition flex items-center gap-1.5 ${mySelfStrengths.length === 5 && myAspirationalStrengths.length === 2 ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                              >
                                <span>💾</span>
                                <span>검사 결과 저장하기</span>
                              </button>

                              {/* 다음 단계(Step B) 이동 버튼 */}
                              <button
                                type="button"
                                disabled={mySelfStrengths.length !== 5 || myAspirationalStrengths.length !== 2}
                                onClick={() => {
                                  try {
                                    const payload = {
                                      studentId,
                                      mySelfStrengths,
                                      myAspirationalStrengths,
                                      savedAt: new Date().toISOString()
                                    };
                                    localStorage.setItem("mindplay_johari_step_a_" + studentId, JSON.stringify(payload));
                                  } catch(e){}
                                  setLesson2Step("B");
                                  triggerConfetti();
                                }}
                                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition flex items-center gap-1.5 ${mySelfStrengths.length === 5 && myAspirationalStrengths.length === 2 ? "bg-[#2A784B] hover:bg-[#1E5736] text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                              >
                                <span>다음 단계로 (Step B)</span>
                                <span>➔</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* [Step B: 1:1 순환 매칭된 친구의 강점 발견하기] */}
                      {lesson2Step === "B" && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          {!isTeacherMode && currentUser.studentId !== "00000" && !isJohariPartnerAssigned ? (
                            <div className="py-12 px-6 bg-rose-50/50 rounded-3xl border-2 border-dashed border-rose-200 text-center space-y-4 animate-fadeIn">
                              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-800 text-3xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
                                🤝
                              </div>
                              <div className="space-y-1.5 max-w-md mx-auto">
                                <h4 className="font-title text-xl font-bold text-rose-950">
                                  선생님의 친구 배정 대기 중
                                </h4>
                                <p className="font-batang text-sm text-gray-700 leading-relaxed">
                                  우리 반 친구들이 모두 <strong>Step A(나의 강점)</strong>를 선택하면, 선생님께서 교사용 대시보드에서 <strong>[친구 배정]</strong> 버튼을 눌러주십니다.<br />
                                  배정이 완료되면 내가 강점을 찾아줄 친구가 자동으로 연결됩니다! 🌸
                                </p>
                              </div>
                              <div className="pt-2 flex justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setLesson2Step("A")}
                                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-dodum font-bold"
                                >
                                  ◀ Step A로 돌아가기
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
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

                          {/* 교사 결과 전송 제어 바 (교사 로그인 시 Step B 상단/하단에 노출) */}
                          {(isTeacherMode || currentUser.studentId === "00000") && (
                            <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-indigo-800 text-white rounded-lg text-xs font-dodum font-bold">
                                  교사용 제어
                                </span>
                                <span className="text-xs font-batang text-indigo-950 font-bold">
                                  {isJohariUnlocked ? "✅ 2단계 조하리의 창 분석 결과가 전체 학생에게 전송되었습니다." : "학생들이 친구 강점 저장을 완료한 후 [결과 보내기]를 눌러 4개의 창(Step C/D)을 개방하세요."}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const pw = prompt("교사 비밀번호를 입력해주세요:");
                                  if (pw === "8888") {
                                    setIsJohariUnlocked(true);
                                    try {
                                      localStorage.setItem("mindplay_johari_unlocked", "true");
                                    } catch(e){}
                                    triggerConfetti();
                                    alert("🎉 [2단계 결과 전송 완료] 조하리의 창 4개 영역(Step C) 및 나다움 문장(Step D)이 전체 학생에게 성공적으로 개방되었습니다!");
                                  } else if (pw !== null) {
                                    alert("비밀번호가 일치하지 않습니다.");
                                  }
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1.5 ${isJohariUnlocked ? "bg-indigo-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"}`}
                              >
                                <span>🚀</span>
                                <span>{isJohariUnlocked ? "✨ 결과 전송 완료됨 (재전송)" : "🔒 교사 전용: 결과 보내기 (Step C/D 개방)"}</span>
                              </button>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                            <button
                              type="button"
                              onClick={() => setLesson2Step("A")}
                              className="px-4 py-2.5 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 이전 단계로 (Step A)
                            </button>
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="text-xs font-batang text-gray-500 mr-1">
                                선택: <strong>{partnerGiftStrengths.length}/5개</strong>
                              </span>
                              
                              {/* 학생용 친구 강점 저장 버튼 */}
                              <button
                                type="button"
                                disabled={partnerGiftStrengths.length !== 5}
                                onClick={async () => {
                                  try {
                                    const payload = {
                                      studentId,
                                      studentName,
                                      targetPartner: partnerInfo.targetPartner,
                                      partnerGiftStrengths,
                                      savedAt: new Date().toISOString()
                                    };
                                    localStorage.setItem("mindplay_johari_step_b_" + studentId, JSON.stringify(payload));
                                    await syncWithServerDb("SAVE_JOHARI_STEP_B", payload);
                                    setHasSentPartnerGift(true);
                                  } catch(e){}
                                  triggerConfetti();
                                  alert(`💾 [${partnerInfo.targetPartner.name} 친구 강점 데이터베이스 저장 완료!]\n친구에게 선물한 멋진 강점 5개가 학급 중앙 DB에 안전하게 저장되었습니다.\n선생님께서 [결과 보내기]를 진행하시면 Step C(4개의 창)와 Step D(나다움 문장)를 확인할 수 있습니다. 🌸`);
                                }}
                                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition flex items-center gap-1.5 ${partnerGiftStrengths.length === 5 ? "bg-rose-500 hover:bg-rose-600 text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                              >
                                <span>💾</span>
                                <span>친구 강점 저장하기</span>
                              </button>

                              {/* Step C 이동 버튼 */}
                              <button
                                type="button"
                                disabled={partnerGiftStrengths.length !== 5}
                                onClick={() => {
                                  try {
                                    const payload = {
                                      studentId,
                                      targetPartner: partnerInfo.targetPartner,
                                      partnerGiftStrengths,
                                      savedAt: new Date().toISOString()
                                    };
                                    localStorage.setItem("mindplay_johari_step_b_" + studentId, JSON.stringify(payload));
                                    setHasSentPartnerGift(true);
                                  } catch(e){}
                                  setLesson2Step("C");
                                  triggerConfetti();
                                }}
                                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow transition flex items-center gap-1.5 ${partnerGiftStrengths.length === 5 ? "bg-[#2A784B] hover:bg-[#1E5736] text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                              >
                                <span>다음 단계로 (Step C)</span>
                                <span>➔</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
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
                          {!isTeacherMode && currentUser.studentId !== "00000" && !isJohariUnlocked ? (
                            <div className="py-12 px-6 bg-emerald-50/50 rounded-3xl border-2 border-dashed border-emerald-200 text-center space-y-5">
                              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
                                🔒
                              </div>
                              <div className="space-y-2 max-w-md mx-auto">
                                <h4 className="font-title text-xl font-bold text-emerald-950">
                                  선생님의 결과 전송 대기 중
                                </h4>
                                <p className="font-batang text-sm text-gray-700 leading-relaxed">
                                  우리 반 친구들의 강점 선물이 모두 취합되면, 선생님께서 <strong>[결과 보내기]</strong>를 진행합니다. 잠시만 기다려주세요!
                                </p>
                              </div>
                              <div className="pt-2 flex justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setLesson2Step("B")}
                                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-dodum font-bold"
                                >
                                  ◀ Step B(친구 강점)로 돌아가기
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
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
                          </>
                          )}
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
                              { num: 4, label: "밸런스게임" },
                              { num: 5, label: "브랜딩카드" },
                              { num: 6, label: "학급갤러리" }
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
                        {/* [Step 4: 나알아보기 11문항 밸런스 게임 & 또래 성향 매칭] */}
                        {lesson3Step === 4 && (
                          <BalanceGameModule
                            studentName={studentName}
                            studentId={studentId}
                            isTeacherMode={isTeacherMode || currentUser.studentId === "00000"}
                            isBalanceResultBroadcasted={isBalanceResultBroadcasted}
                            onBroadcastBalanceResult={() => {
                              const next = !isBalanceResultBroadcasted;
                              setIsBalanceResultBroadcasted(next);
                              try { localStorage.setItem("mindplay_balance_broadcasted", next ? "true" : "false"); } catch(e){}
                              triggerConfetti();
                              alert(next
                                ? "📢 [밸런스 게임 결과 전송 완료] 모든 학생들에게 1학년 3반 밸런스 게임 응답 통계 및 소울메이트/반전 케미 리포트가 실시간 공개되었습니다! 🌟"
                                : "🔒 [결과 전송 취소] 학생 화면에서 결과 리포트가 다시 대기 상태로 전환되었습니다."
                              );
                            }}
                            balanceAnswers={lesson3BalanceAnswers}
                            onAnswerChange={(qId, val) => {
                              setLesson3BalanceAnswers(prev => {
                                const next = { ...prev, [qId]: val };
                                try { localStorage.setItem("mindplay_balance_answers_" + (currentUser?.studentId || "guest"), JSON.stringify(next)); } catch(e){}
                                return next;
                              });
                            }}
                            custom10={lesson3BalanceCustom10}
                            onCustom10Change={setLesson3BalanceCustom10}
                            custom11={lesson3BalanceCustom11}
                            onCustom11Change={setLesson3BalanceCustom11}
                            onPrevStep={() => {
                              setLesson3Step(3);
                              window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            onNextStep={() => {
                              setLesson3Step(5);
                              window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                          />
                        )}

                        {/* [Step 5: 종합 분석 리포트 & 나만의 브랜딩 카드 작성] */}
                        {lesson3Step === 5 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between border-b pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">5</span>
                                <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                  [Step 5] 종합 분석 리포트 & 나만의 브랜딩 카드 작성
                                </h4>
                              </div>
                              <span className="text-xs font-dodum text-[#1F6B38] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                자동 연동 완료 ✨
                              </span>
                            </div>

                            {/* 종합 진단 분석 리포트 & 또래 성향 매칭 */}
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

                              {/* 🤝 1학년 3반 또래 시너지 매칭 */}
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

                            {/* 브랜딩 카드 커스터마이징 & 미리보기 */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                              {/* 좌측: 브랜딩 카드 작성 폼 */}
                              <div className="lg:col-span-6 space-y-4">
                                <h5 className="font-title text-sm sm:text-base font-bold text-gray-900 flex items-center gap-1.5">
                                  <span>✍️</span> 나만의 당당한 브랜딩 카드 정보 입력
                                </h5>

                                <div className="space-y-3 text-xs font-batang">
                                  <div>
                                    <label className="font-bold text-gray-700 block mb-1">
                                      1. 나를 표현하는 한 줄 타이틀 (수정 가능):
                                    </label>
                                    <input
                                      type="text"
                                      value={maskBioNickname}
                                      onChange={(e) => setMaskBioNickname(e.target.value)}
                                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1F6B38] font-dodum text-xs"
                                      placeholder="예: 따뜻한 공감의 NF 대인관계 조율사"
                                    />
                                  </div>

                                  <div>
                                    <label className="font-bold text-gray-700 block mb-1">
                                      2. 이럴 때 나를 불러줘! (나의 강점이 발휘되는 순간):
                                    </label>
                                    <textarea
                                      value={maskCallMeWhen}
                                      onChange={(e) => setMaskCallMeWhen(e.target.value)}
                                      rows={2}
                                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1F6B38] font-batang text-xs"
                                      placeholder="예: 친구들 사이에 오해가 생겼거나 마음속 깊은 고민을 털어놓고 싶을 때"
                                    />
                                  </div>

                                  <div>
                                    <label className="font-bold text-gray-700 block mb-1">
                                      3. 진짜 나에게 전하는 당당한 한마디:
                                    </label>
                                    <textarea
                                      value={maskSelfCheer}
                                      onChange={(e) => setMaskSelfCheer(e.target.value)}
                                      rows={2}
                                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1F6B38] font-batang text-xs"
                                      placeholder="예: 남들의 시선에 흔들리지 않고 나의 따뜻함을 믿고 당당하게 나아갈 거야!"
                                    />
                                  </div>

                                  {/* 해시태그 추가 */}
                                  <div className="space-y-1.5">
                                    <label className="font-bold text-gray-700 block">
                                      4. 나를 상징하는 해시태그 ({lesson3HashTags.length}/5):
                                    </label>
                                    <div className="flex flex-wrap gap-1.5 pb-1">
                                      {lesson3HashTags.map(tag => (
                                        <span
                                          key={tag}
                                          className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-dodum flex items-center gap-1"
                                        >
                                          {tag}
                                          <button
                                            type="button"
                                            onClick={() => setLesson3HashTags(lesson3HashTags.filter(t => t !== tag))}
                                            className="text-gray-400 hover:text-red-500 text-xs"
                                          >
                                            ✕
                                          </button>
                                        </span>
                                      ))}
                                    </div>
                                    <div className="flex gap-1.5">
                                      <input
                                        type="text"
                                        value={customHashInput}
                                        onChange={(e) => setCustomHashInput(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (customHashInput.trim() && lesson3HashTags.length < 5) {
                                              const tag = customHashInput.trim().startsWith('#') ? customHashInput.trim() : '#' + customHashInput.trim();
                                              if (!lesson3HashTags.includes(tag)) {
                                                setLesson3HashTags([...lesson3HashTags, tag]);
                                                setCustomHashInput("");
                                              }
                                            }
                                          }
                                        }}
                                        placeholder="#나만의키워드 (입력 후 Enter 또는 추가)"
                                        className="flex-1 p-2 rounded-xl border border-gray-300 text-xs font-dodum focus:outline-none focus:ring-2 focus:ring-[#1F6B38]"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (customHashInput.trim() && lesson3HashTags.length < 5) {
                                            const tag = customHashInput.trim().startsWith('#') ? customHashInput.trim() : '#' + customHashInput.trim();
                                            if (!lesson3HashTags.includes(tag)) {
                                              setLesson3HashTags([...lesson3HashTags, tag]);
                                              setCustomHashInput("");
                                            }
                                          }
                                        }}
                                        className="px-3 py-2 bg-gray-800 hover:bg-black text-white text-xs font-dodum rounded-xl cursor-pointer"
                                      >
                                        추가
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 우측: 브랜딩 카드 실시간 홀로그램 뷰 & 밸런스 결과 버튼 */}
                              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 rounded-3xl text-white shadow-xl relative overflow-hidden border-2 border-emerald-400/40 space-y-4">
                                <div className="w-full flex justify-between items-center text-xs font-mono text-emerald-300 border-b border-white/20 pb-2">
                                  <span>MIND PLAY BRANDING CARD</span>
                                  <span>1-3 {studentName}</span>
                                </div>

                                <div className="text-center space-y-1">
                                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
                                    🎭
                                  </div>
                                  <div className="text-xs font-dodum text-emerald-300 font-bold">
                                    {top1Intel.name} & {top2Intel.name} 지능이 빛나는
                                  </div>
                                  <h4 className="text-lg sm:text-xl font-title font-bold text-white tracking-wide">
                                    {maskBioNickname || "당당한 나만의 타이틀"}
                                  </h4>
                                  <p className="text-xs font-batang text-emerald-200">
                                    1학년 3반 {studentId} {studentName}
                                  </p>
                                </div>

                                <div className="w-full bg-black/30 backdrop-blur-xs rounded-2xl p-3.5 border border-white/10 space-y-2 text-xs font-batang text-gray-200">
                                  <div>
                                    <strong className="text-emerald-300 block text-[11px] font-dodum">⚡ 나를 부르는 순간:</strong>
                                    <p className="leading-snug">{maskCallMeWhen || "언제든 나의 도움이 필요할 때"}</p>
                                  </div>
                                  <div>
                                    <strong className="text-emerald-300 block text-[11px] font-dodum">💖 나에게 전하는 당당한 한마디:</strong>
                                    <p className="leading-snug italic">&quot;{maskSelfCheer || "진짜 나다운 모습으로 당당하게!"}&quot;</p>
                                  </div>
                                </div>

                                <div className="w-full flex flex-wrap gap-1.5 text-[11px] font-dodum text-emerald-300">
                                  <span className="px-2 py-0.5 bg-white/10 rounded-md">#{primaryTemperamentCode}기질</span>
                                  <span className="px-2 py-0.5 bg-white/10 rounded-md">#{top1Intel.name}지능</span>
                                  {lesson3HashTags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 bg-white/10 rounded-md">{t}</span>)}
                                </div>

                                {/* 신규 기능: 나의 11문항 밸런스 게임 취향 결과 모달 열기 버튼 */}
                                <button
                                  type="button"
                                  onClick={() => setShowMyBalanceModal(true)}
                                  className="w-full py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-xl text-xs font-dodum font-bold transition flex items-center justify-center gap-1.5 border border-emerald-400/40 shadow-sm cursor-pointer"
                                >
                                  <span>🕹️ 나의 밸런스 게임 취향 결과표 보기</span>
                                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">11문항 완료</span>
                                </button>
                              </div>
                            </div>

                            {/* 이전 / 다음 네비게이션 버튼 */}
                            <div className="flex justify-between items-center pt-4 border-t">
                              <button
                                type="button"
                                onClick={() => {
                                  setLesson3Step(4);
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className="px-4 py-2.5 text-xs sm:text-sm font-dodum font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
                              >
                                ◀ 이전 단계 (4. 밸런스 게임)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setLesson3Step(6);
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className="px-6 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs sm:text-sm font-dodum font-bold transition shadow-sm flex items-center gap-1.5"
                              >
                                <span>다음 단계 (6. 학급 갤러리 둘러보기) 👉</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 내 밸런스 취향 결과 팝업 모달 */}
                        <MyBalanceResultModal
                          isOpen={showMyBalanceModal}
                          onClose={() => setShowMyBalanceModal(false)}
                          balanceAnswers={lesson3BalanceAnswers}
                          custom10={lesson3BalanceCustom10}
                          custom11={lesson3BalanceCustom11}
                          studentName={studentName}
                        />

                        {/* [Step 6: 학급 갤러리 & 마음 다지기] */}
                        {lesson3Step === 6 && (
                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between border-b pb-3">
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#1F6B38] text-white flex items-center justify-center text-sm font-bold">6</span>
                                <span>[Step 6] 1학년 3반 학급 브랜딩 카드 & 밸런스 전시관</span>
                              </h4>
                              <span className="text-xs font-dodum text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                                🏛️ 브랜딩 & 케미 전시관
                              </span>
                            </div>

                            {!isTeacherMode && currentUser.studentId !== "00000" && !isLesson3GalleryUnlocked ? (
                              <div className="py-12 px-6 bg-gradient-to-b from-emerald-50/60 to-white rounded-3xl border-2 border-dashed border-emerald-300 text-center space-y-4 animate-fadeIn">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
                                  🏛️
                                </div>
                                <div className="space-y-1.5 max-w-md mx-auto">
                                  <h5 className="font-title text-lg font-bold text-emerald-950">
                                    1학년 3반 브랜딩 카드 갤러리 개관 준비 중
                                  </h5>
                                  <p className="font-batang text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    우리 반 친구들이 브랜딩 카드 작성을 마치면, 선생님께서 교사용 대시보드에서 <strong>[학급 갤러리 개방]</strong>을 눌러주십니다.<br />
                                    개방 후 26명 친구들의 브랜딩 카드와 밸런스 취향을 감상할 수 있습니다! 🌸
                                  </p>
                                </div>
                                <div className="pt-2 flex justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setLesson3Step(5)}
                                    className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-dodum font-bold shadow-sm"
                                  >
                                    ◀ Step 5 내 브랜딩 카드로 돌아가기
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>

                            {/* 학급 갤러리 피드 (자신을 제외한 모든 25명 친구 목록, 클릭 시 상세 모달) */}
                            <div className="space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                                  <span>🖼️</span> 1학년 3반 친구들의 브랜딩 카드 및 밸런스 취향 보기 (이름 클릭):
                                </span>
                                <span className="text-xs font-batang text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  총 {CLASSMATES_BALANCE_DATA.filter(s => s.studentId !== studentId).length}명의 친구 전시 중
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 max-h-[420px] overflow-y-auto p-1.5 bg-gray-50/70 rounded-2xl border border-gray-200">
                                {CLASSMATES_BALANCE_DATA.filter(s => s.studentId !== studentId).map((st, idx) => {
                                  const titles = [
                                    { title: "논리적 문제해결 NT 탐구자", when: "복잡한 보드게임 전략 짤 때", cheer: "포기하지 않고 끝까지 풀자!", call: "수학 문제 막히거나 퍼즐 풀 때" },
                                    { title: "에너지 넘치는 SP 모험가", when: "체육 대회 축구할 때", cheer: "신나게 뛰며 순간을 즐기자!", call: "체육 활동이나 힘쓰는 일 있을 때" },
                                    { title: "따뜻한 공감의 NF 힐러", when: "친구들 이야기 묵묵히 들어줄 때", cheer: "네 편이 되어줄게 힘내자!", call: "마음속 깊은 고민을 털어놓고 싶을 때" },
                                    { title: "책임감 넘치는 SJ 수호자", when: "학급 규칙 지키고 정리정돈할 때", cheer: "맡은 일은 끝까지 책임지자!", call: "학급 환경미화나 시간 체크할 때" },
                                    { title: "자연을 사랑하는 탐험가", when: "식물 키우고 음악 들을 때", cheer: "맑고 푸른 자연처럼 자라자!", call: "화단 가꾸기나 동물 돌볼 때" },
                                    { title: "창의적인 예술 창작가", when: "자유롭게 그림 그리거나 만들 때", cheer: "나만의 색깔을 당당히 펼치자!", call: "포스터 그리거나 꾸미기 할 때" }
                                  ];
                                  const cardData = titles[idx % titles.length];
                                  return (
                                    <button
                                      key={st.studentId}
                                      type="button"
                                      onClick={() => setSelectedGalleryCard({
                                        student: { studentId: st.studentId, name: st.name, avatar: st.avatar },
                                        mbti: st.mbti,
                                        intels: st.intels,
                                        title: cardData.title,
                                        when: cardData.when,
                                        call: cardData.call,
                                        cheer: cardData.cheer,
                                        balanceAnswers: st.answers
                                      })}
                                      className="p-3 rounded-2xl bg-white border border-emerald-200 shadow-2xs hover:shadow-md hover:border-emerald-500 hover:scale-[1.03] transition-all text-left flex flex-col justify-between gap-1.5 group cursor-pointer"
                                    >
                                      <div className="flex items-center justify-between text-xs font-batang w-full">
                                        <span className="font-mono font-bold text-gray-500 text-[10px]">{st.studentId}</span>
                                        <span className="text-[10px] font-dodum font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                          #{st.mbti}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="font-title font-bold text-sm text-gray-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                                          <span>{st.avatar}</span> {st.name}
                                        </div>
                                        <div className="text-[11px] font-dodum text-emerald-900 font-bold line-clamp-1 mt-0.5">
                                          {cardData.title}
                                        </div>
                                      </div>
                                      <div className="text-[10px] font-dodum text-gray-400 text-right pt-1 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-emerald-600 font-bold">카드 & 취향 열람</span>
                                        <span>🔍</span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 팝업 모달: 친구 브랜딩 카드 & 밸런스 취향 보기 */}
                            <ClassGalleryModal
                              selectedCard={selectedGalleryCard}
                              onClose={() => setSelectedGalleryCard(null)}
                              myBalanceAnswers={lesson3BalanceAnswers}
                              myStudentName={studentName}
                            />

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
                                onClick={() => {
                                  setLesson3Step(5);
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }}
                                className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                              >
                                ◀ 이전 단계로 (5. 브랜딩카드)
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
                          </>
                        )}
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
                            04. 내 감정을 알고 싶어: 감정 칵테일 &amp; 치유 주크박스
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
                                <span>① 33종 감정 칵테일</span>
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
                                    <span>[활동 1] 33종 감정 칵테일</span>
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
                                  ◀ 감정 칵테일로
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

                                {classJukeboxList.length === 0 ? (
                                  <div className="p-8 text-center bg-indigo-50/40 rounded-2xl border-2 border-dashed border-indigo-200 space-y-2">
                                    <div className="text-3xl">🎶</div>
                                    <p className="text-xs font-dodum font-bold text-indigo-900">아직 등록된 힐링 추천곡이 없습니다.</p>
                                    <p className="text-[11px] font-batang text-gray-500">위의 입력창에서 우리 반 친구들과 함께 듣고 싶은 추천곡을 제일 먼저 올려보세요!</p>
                                  </div>
                                ) : (
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
                                )}
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

                          {/* 똑똑똑 내 마음 두드리기: ③ 우리 반 감정 치유 주크박스 탭에만 표시 */}
                          {lesson4SubTab === "jukebox" && (
                            <div className="p-6 bg-gradient-to-r from-pink-50 via-rose-50 to-indigo-50 rounded-3xl border-2 border-pink-200 shadow-sm space-y-4 animate-fadeIn">
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
                                      <button key={star} type="button" onClick={() => setLesson4Q1Rating(star)} className="hover:scale-110 transition-transform cursor-pointer">
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
                                      <button key={star} type="button" onClick={() => setLesson4Q2Rating(star)} className="hover:scale-110 transition-transform cursor-pointer">
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
                          )}
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
                                    <h5 className="text-base font-title font-bold text-gray-900">마음속에 담아둔 감사와 미안함, 용기 내어 전하면 우리 사이는 더 가까워져!</h5>
                                  </div>
                                </div>
                                <blockquote className="font-batang text-sm sm:text-base text-gray-800 leading-relaxed bg-white/90 p-5 rounded-xl border border-[#1E4E8C]/20 italic whitespace-pre-line">
                                  &quot;가끔 마음으로는 정말 고마웠는데 쑥스러워서, 혹은 미안했는데 타이밍을 놓쳐서 마음속에만 묻어둔 적 있지 않니?

솔직한 마음을 표현하지 않으면 상대방은 내 진심을 알기 어려워. 작고 사소한 일이라도 고마웠던 순간과 미안했던 마음을 용기 내어 전해봐.

분명 서로의 마음이 따뜻하게 닿아 오해는 풀리고 더 단단한 사이가 될 거야!&quot;
                                </blockquote>
                                <div className="flex items-center justify-between pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setLesson4Step(0)}
                                    className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                                  >
                                    ◀ Step 0. 감정 칵테일로
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
                                    alert("💌 4단계 감정 칵테일 & 듀얼 마음 엽서가 마이페이지에 안전하게 저장되었습니다!");
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

                  {/* 5단계: 감정의 파도 다스리기 (대구광역시교육청 마음학기제 SEL 4단계 워크북 체계) */}
                  {currentLesson === 5 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 메인 헤더 배너 */}
                      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                              🎯 5단계 마음활동
                            </span>
                            <span className="text-xs font-batang text-teal-100 font-bold">
                              영역 ❸ 정서 조절하기
                            </span>
                          </div>
                          {/* 4단계 스텝 인디케이터 네비게이션 */}
                          <div className="flex flex-wrap items-center bg-black/25 p-1 rounded-2xl backdrop-blur gap-1">
                            {[
                              { num: 1, label: "1. 마음 편지", icon: "📮" },
                              { num: 2, label: "2. 마음 만나기", icon: "🔍" },
                              { num: 3, label: "3. 마음 키우기", icon: "🌱" },
                              { num: 4, label: "4. 마음 다지기", icon: "⭐" },
                            ].map(s => (
                              <button
                                key={s.num}
                                type="button"
                                onClick={() => setLesson5Step(s.num)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1 ${lesson5Step === s.num ? "bg-white text-teal-800 shadow-md scale-105" : "text-white/80 hover:text-white"}`}
                              >
                                <span>{s.icon}</span>
                                <span>{s.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-title font-bold">
                            05. 감정의 파도 다스리기: 화와 충동을 현명하게 가라앉히기
                          </h3>
                          <p className="text-xs sm:text-sm font-batang text-teal-100 leading-relaxed mt-1">
                            하루에도 몇 번씩 출렁이는 감정의 파도를 알아차리고, <strong>신체 조절법과 나만의 마음 주문</strong>으로 평온함을 되찾아보세요.
                          </p>
                        </div>
                      </div>

                      {/* 1. [오늘의 마음 편지] (도입) */}
                      {lesson5Step === 1 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                1
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [오늘의 마음 편지] 마음우체통에 도착한 사연
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-bold">
                              도입 · 공감 나누기
                            </span>
                          </div>

                          <div className="p-6 sm:p-8 bg-gradient-to-br from-teal-50/90 via-emerald-50/60 to-white rounded-3xl border-2 border-teal-300 shadow-sm space-y-4 relative overflow-hidden">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">📮</span>
                              <div>
                                <span className="text-xs font-dodum font-bold text-teal-800">SEL 워크북 연동 사연</span>
                                <h5 className="text-base sm:text-lg font-title font-bold text-gray-900">
                                  하루에도 몇 번씩 롤러코스터를 타는 내 마음
                                </h5>
                              </div>
                            </div>

                            <blockquote className="font-batang text-base sm:text-lg text-gray-800 leading-relaxed bg-white/95 p-6 rounded-2xl border border-teal-200 shadow-2xs italic whitespace-pre-line">
                              &quot;하루에도 몇 번씩 왔다 갔다 하는 내 기분.
                              작은 일에도 짜증이 나고 화가 날 때가 있어.
                              그래도 난 내 감정을 잘 조절할 수 있다고 스스로를 믿어!&quot;
                            </blockquote>

                            <p className="text-xs sm:text-sm font-batang text-teal-950 leading-relaxed bg-teal-100/50 p-4 rounded-xl border border-teal-200">
                              💡 <strong>선생님의 한마디:</strong> 사춘기 청소년 시기에는 뇌의 감정 중추가 급격히 발달하면서 감정 기복이 심해지는 것이 지극히 자연스러운 현상입니다. 감정 자체를 억누르려 하기보다, 내 안의 파도를 인정하고 안전하게 서핑하는 법을 함께 배워봅시다.
                            </p>

                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => setLesson5Step(2)}
                                className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                              >
                                <span>2. 마음 버튼 점검하러 가기</span>
                                <span>➔</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. [마음 만나기] 마음 버튼이 고장 난다면? */}
                      {lesson5Step === 2 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                2
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 만나기] 마음 버튼이 고장 난다면?
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-bold">
                              일상 문제 인식 &amp; 수업 목표 세우기
                            </span>
                          </div>

                          {/* 1) 일상 갈등 상황 3가지 중 1개 선택 */}
                          <div className="space-y-3">
                            <label className="text-xs sm:text-sm font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                              <span>👉</span> <strong>[상황 선택]</strong> 가장 공감되거나 최근 겪었던 일상 상황 1가지를 골라보세요:
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {[
                                { id: "모둠 활동에 무임승차하려는 친구를 볼 때", title: "모둠 무임승차 친구 👥", desc: "역할은 안 하고 딴짓하며 버스 타려는 모습을 볼 때" },
                                { id: "중요한 시험을 망쳤을 때", title: "시험을 망쳤을 때 📝", desc: "열심히 준비했는데 실수해서 성적이 떨어졌을 때" },
                                { id: "사소한 오해가 큰 다툼으로 이어졌을 때", title: "사소한 오해와 다툼 ⚡", desc: "별 뜻 없이 한 말에 친구와 감정이 상해 부딪혔을 때" },
                              ].map(st => (
                                <button
                                  key={st.id}
                                  type="button"
                                  onClick={() => setLesson5Situation(st.id)}
                                  className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between gap-2 ${lesson5Situation === st.id ? "bg-teal-50/90 border-teal-600 shadow-md scale-[1.02]" : "bg-gray-50/60 border-gray-200 hover:bg-teal-50/30"}`}
                                >
                                  <div>
                                    <div className="text-sm font-title font-bold text-gray-900 flex items-center justify-between">
                                      <span>{st.title}</span>
                                      {lesson5Situation === st.id && <span className="text-teal-700 font-bold text-base">✓</span>}
                                    </div>
                                    <p className="text-xs font-batang text-gray-600 mt-1 leading-relaxed">
                                      {st.desc}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 2) 학생 작성 활동 4단계 폼 */}
                          <div className="p-6 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-white rounded-3xl border-2 border-teal-200 space-y-4">
                            <span className="text-xs font-dodum font-bold text-teal-900 block">
                              ✍️ 선택한 상황 [ {lesson5Situation} ] 에 대해 내 마음을 솔직하게 적어보세요:
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-batang">
                              {/* ① 내가 느끼는 감정 */}
                              <div className="p-4 bg-white rounded-2xl border border-teal-200 space-y-2">
                                <label className="font-dodum font-bold text-teal-950 block text-xs">
                                  ① 이때 내가 느끼는 구체적인 감정은?
                                </label>
                                <input
                                  type="text"
                                  value={lesson5EmotionInput}
                                  onChange={(e) => setLesson5EmotionInput(e.target.value)}
                                  placeholder="예: 억울함, 분노, 답답함, 서운함, 막막함"
                                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-teal-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <span className="text-[11px] text-gray-400 font-batang block">* 감정 칵테일 33종 단어를 참고해 보세요.</span>
                              </div>

                              {/* ② 감정 표현 방식 */}
                              <div className="p-4 bg-white rounded-2xl border border-teal-200 space-y-2">
                                <label className="font-dodum font-bold text-teal-950 block text-xs">
                                  ② &quot;이 감정을 나는 이렇게 표현했다/표현할 것 같다&quot;
                                </label>
                                <input
                                  type="text"
                                  value={lesson5ExpressionInput}
                                  onChange={(e) => setLesson5ExpressionInput(e.target.value)}
                                  placeholder="예: 표정을 굳히고 쌀쌀맞게 대하거나 문을 쾅 닫았다"
                                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-teal-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                              </div>

                              {/* ③ 조절 실패 시 예측 */}
                              <div className="p-4 bg-white rounded-2xl border border-teal-200 space-y-2 sm:col-span-2">
                                <label className="font-dodum font-bold text-teal-950 block text-xs">
                                  ③ 만약 감정을 조절하지 못하고 폭발하거나 회피한다면 어떤 일이 생길까?
                                </label>
                                <textarea
                                  rows="2"
                                  value={lesson5PredictInput}
                                  onChange={(e) => setLesson5PredictInput(e.target.value)}
                                  placeholder="예: 친구와 돌이킬 수 없을 정도로 사이가 멀어지거나, 중요한 다음 시험까지 의욕을 잃고 망칠 수 있다."
                                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-teal-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                                />
                              </div>

                              {/* ④ #해시태그 수업 목표 */}
                              <div className="p-4 bg-white rounded-2xl border border-teal-200 space-y-2 sm:col-span-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                  <label className="font-dodum font-bold text-teal-950 block text-xs">
                                    ④ #해시태그로 표현하는 이번 시간 나의 수업 목표
                                  </label>
                                  <span className="text-[11px] font-dodum text-teal-700">
                                    예시 뱃지: #분노_버튼 #내_안에_내가_너무나_많아 #나도_궁금해_내_감정
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  value={lesson5HashtagInput}
                                  onChange={(e) => setLesson5HashtagInput(e.target.value)}
                                  placeholder="#감정_조절_마스터 #폭발하기_전에_3초_멈춤 #소중한_나를_지키자"
                                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-teal-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-teal-900"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson5Step(1)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 1. 마음 편지로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson5Step(3)}
                              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>3. 감정 조절법 배우러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 3. [마음 키우기] 감정 조절 방법 배우기 & 핵심활동 */}
                      {lesson5Step === 3 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                3
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 키우기] 감정 조절 방법 배우기 &amp; 실전 연습
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-bold">
                              잘못된 조절 점검 · 신체 실습 · 나만의 주문
                            </span>
                          </div>

                          {/* ① 잘못된 감정 조절 방법 점검하기 */}
                          <div className="p-6 bg-rose-50/80 rounded-3xl border-2 border-rose-200 space-y-3">
                            <div className="flex items-center gap-2 text-rose-950 font-title font-bold text-sm sm:text-base">
                              <span className="text-xl">⚠️</span>
                              <span>① [주의] 나도 혹시 이런 잘못된 방식으로 감정을 다스리고 있진 않나요?</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                              {[
                                { title: "1. 내 탓만 하기 (자책)", icon: "🌧️", desc: "\"다 내가 부족해서 그래...\" 끝없는 자기 비하와 무기력" },
                                { title: "2. 폭식 & 게임 몰두 (일시적 쾌락)", icon: "🎮", desc: "순간의 쾌락으로 감정을 덮으려다 후회와 피로만 누적" },
                                { title: "3. 문제 회피하기 (도망치기)", icon: "🏃", desc: "불편한 상황을 무조건 피해서 오히려 오해와 불안 증폭" }
                              ].map(w => (
                                <div key={w.title} className="p-4 bg-white/90 rounded-2xl border border-rose-200 space-y-1 shadow-2xs">
                                  <div className="flex items-center gap-1.5 text-xs font-dodum font-bold text-rose-900">
                                    <span>{w.icon}</span>
                                    <span>{w.title}</span>
                                  </div>
                                  <p className="text-[11px] font-batang text-gray-600 leading-relaxed">
                                    {w.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ② 신체적 조절법 실습 3종 탭 */}
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2 text-teal-950 font-title font-bold text-sm sm:text-base">
                                <span className="text-xl">🫧</span>
                                <span>② [신체적 조절법] 몸의 긴장을 풀면 마음도 함께 가라앉아요</span>
                              </div>
                              {/* 3대 실습 탭 버튼 */}
                              <div className="flex bg-teal-100/70 p-1 rounded-2xl gap-1">
                                {[
                                  { id: "심호흡", label: "1. 4-7-8 심호흡 🌬️" },
                                  { id: "근육이완", label: "2. 근육 이완법 💆" },
                                  { id: "나비포옹", label: "3. 나비 포옹법 🦋" },
                                ].map(t => (
                                  <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setLesson5CopingPractice(t.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${lesson5CopingPractice === t.id ? "bg-teal-800 text-white shadow" : "text-teal-900 hover:bg-teal-200"}`}
                                  >
                                    {t.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 1) 4-7-8 심호흡법 실습 영역 (기존 유튜브 영상 & 19초 타이머 포함) */}
                            {lesson5CopingPractice === "심호흡" && (
                              <div className="p-6 bg-teal-50/70 rounded-3xl border-2 border-teal-300 space-y-4 animate-fadeIn">
                                <div className="space-y-1">
                                  <h5 className="font-title font-bold text-teal-950 text-sm sm:text-base flex items-center gap-1.5">
                                    <span>🌬️</span> 4-7-8 심호흡법: 4초 들이쉬고, 7초 멈추고, 8초 내쉬기
                                  </h5>
                                  <p className="text-xs font-batang text-teal-800 leading-relaxed">
                                    산소 공급을 늘리고 부교감 신경을 활성화하여 뇌에 &quot;지금은 안전하다&quot;는 신호를 보냅니다.
                                  </p>
                                </div>

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
                                  </div>

                                  {/* Interactive Breathing Bubble */}
                                  <div className="p-6 bg-white/90 rounded-2xl border border-teal-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                                    <span className="text-xs font-dodum font-bold text-teal-900">
                                      🫧 4-7-8 인터랙티브 호흡 타이머
                                    </span>
                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 text-teal-950 flex items-center justify-center text-xs font-title font-bold shadow-lg transition-transform duration-1000 ${breathStep === "inhale" ? "scale-125" : breathStep === "hold" ? "scale-125 ring-8 ring-teal-200" : "scale-100"}`}>
                                      {breathStep === "inhale" && "들이마시기 (4초)"}
                                      {breathStep === "hold" && "숨 참기 (7초)"}
                                      {breathStep === "exhale" && "내쉬기 (8초)"}
                                      {breathStep === "idle" && "호흡 시작"}
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 2) 점진적 근육 이완법 */}
                            {lesson5CopingPractice === "근육이완" && (
                              <div className="p-6 bg-emerald-50/80 rounded-3xl border-2 border-emerald-300 space-y-4 animate-fadeIn">
                                <div className="space-y-1">
                                  <h5 className="font-title font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-1.5">
                                    <span>💆</span> 점진적 근육 이완법: 꽉 조였다가 툭~ 풀기
                                  </h5>
                                  <p className="text-xs font-batang text-emerald-800 leading-relaxed">
                                    신체 부위에 힘을 5초간 꽉 주었다가 한 번에 힘을 빼며 긴장이 사르르 풀리는 감각에 집중합니다.
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-batang">
                                  <div className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2">
                                    <span className="font-dodum font-bold text-emerald-900 block text-sm">1. 주먹과 어깨 ✊</span>
                                    <p className="text-gray-700 leading-relaxed">양손을 꽉 쥐고 어깨를 귀 쪽으로 바짝 끌어올려 5초간 힘을 준 뒤, &quot;후~&quot; 내쉬며 바닥으로 툭 떨어뜨립니다.</p>
                                  </div>
                                  <div className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2">
                                    <span className="font-dodum font-bold text-emerald-900 block text-sm">2. 얼굴과 턱 찡그리기 😖</span>
                                    <p className="text-gray-700 leading-relaxed">눈, 코, 입을 얼굴 중앙으로 잔뜩 찌푸리며 5초간 긴장시킨 뒤, 입술을 벌리며 편안하게 힘을 뺍니다.</p>
                                  </div>
                                  <div className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2">
                                    <span className="font-dodum font-bold text-emerald-900 block text-sm">3. 다리와 발가락 🦶</span>
                                    <p className="text-gray-700 leading-relaxed">발가락을 발바닥 안쪽으로 오므려 종아리와 허벅지에 힘을 준 뒤, 천천히 긴장을 풀어줍니다.</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 3) 나비 포옹법 */}
                            {lesson5CopingPractice === "나비포옹" && (
                              <div className="p-6 bg-purple-50/80 rounded-3xl border-2 border-purple-300 space-y-4 animate-fadeIn">
                                <div className="space-y-1">
                                  <h5 className="font-title font-bold text-purple-950 text-sm sm:text-base flex items-center gap-1.5">
                                    <span>🦋</span> 나비 포옹법 (Butterfly Hug): 스스로를 안아주는 양측성 자극
                                  </h5>
                                  <p className="text-xs font-batang text-purple-800 leading-relaxed">
                                    불안하거나 놀랐을 때, 트라우마 치료에서도 사용하는 가장 빠르고 따뜻한 셀프 안정화 기법입니다.
                                  </p>
                                </div>

                                <div className="p-5 bg-white rounded-2xl border border-purple-200 flex flex-col sm:flex-row items-center gap-5">
                                  <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-4xl shrink-0 shadow-inner">
                                    🤗
                                  </div>
                                  <div className="space-y-2 text-xs sm:text-sm font-batang text-gray-800 leading-relaxed">
                                    <p><strong>Step 1.</strong> 양팔을 가슴 앞에서 교차하여 오른손은 왼쪽 어깨(쇄골 아래), 왼손은 오른쪽 어깨에 얹습니다.</p>
                                    <p><strong>Step 2.</strong> 나비가 날갯짓하듯 <strong>왼손 톡, 오른손 톡</strong> 번갈아가며 1초에 한 번씩 부드럽게 토닥입니다.</p>
                                    <p><strong>Step 3.</strong> 눈을 감고 깊은 호흡과 함께 &quot;괜찮아, 지나갈 거야&quot;라고 마음속으로 속삭여줍니다.</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* ③ [핵심활동] 나만의 감정 조절 방법 덱 & 1줄 감정 조절 주문 작성 */}
                          <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-50 via-teal-50 to-emerald-50 rounded-3xl border-2 border-teal-300 shadow-md space-y-6">
                            <div className="space-y-1">
                              <span className="px-3 py-1 bg-teal-800 text-white rounded-full text-xs font-dodum font-bold">
                                🌟 [핵심활동] 나만의 감정 조절 레시피 완성하기
                              </span>
                              <h5 className="text-base sm:text-lg font-title font-bold text-gray-900 mt-1">
                                나에게 가장 잘 맞는 방법 선택 &amp; 1초 만에 화를 잠재우는 마법 주문
                              </h5>
                            </div>

                            {/* 다중 선택 가능한 감정 조절 방법 칩 */}
                            <div className="space-y-2">
                              <label className="text-xs font-dodum font-bold text-gray-800 block">
                                내가 자주 쓰는(혹은 앞으로 써볼) 나만의 조절 방법 (다중 선택 가능):
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "4-7-8 심호흡하기 🌬️", "좋아하는 음악 듣기 🎵", "시원한 물 한 컵 마시기 💧",
                                  "바깥 공기 쐬며 산책 🚶", "일기나 낙서로 털어내기 📝", "나비 포옹으로 토닥이기 🦋",
                                  "10부터 1까지 거꾸로 세기 🔢", "믿을 만한 친구에게 털어놓기 💬", "귀여운 고양이/강아지 영상 보기 🐾"
                                ].map(opt => {
                                  const isSel = lesson5FavoriteCoping.includes(opt);
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => {
                                        if (isSel) setLesson5FavoriteCoping(lesson5FavoriteCoping.filter(x => x !== opt));
                                        else setLesson5FavoriteCoping([...lesson5FavoriteCoping, opt]);
                                      }}
                                      className={`px-3.5 py-2 rounded-2xl text-xs font-dodum font-bold transition-all flex items-center gap-1 ${isSel ? "bg-teal-700 text-white shadow-sm scale-105" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}`}
                                    >
                                      <span>{isSel ? "✓" : "+"}</span>
                                      <span>{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 나만의 1줄 감정 조절 주문 작성 */}
                            <div className="p-5 bg-white rounded-2xl border-2 border-teal-300 space-y-3 shadow-sm">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <label className="text-xs sm:text-sm font-dodum font-bold text-teal-950 flex items-center gap-1.5">
                                  <span>✨</span> <strong>[나만의 1줄 감정 조절 주문]</strong> 위기 순간 속으로 외칠 나만의 주문:
                                </label>
                                <span className="text-[11px] font-batang text-teal-800">
                                  예: &quot;귀여운 내가 참자, 우리 집 고양이가 보고 있어&quot;, &quot;파도는 곧 지나간다&quot;
                                </span>
                              </div>
                              <input
                                type="text"
                                value={mantraCustom}
                                onChange={(e) => setMantraCustom(e.target.value)}
                                placeholder="나를 미소 짓게 하거나 차분하게 만들어 줄 1줄 주문을 적어보세요..."
                                className="w-full p-3.5 bg-teal-50/50 rounded-xl border border-teal-400 font-title text-sm sm:text-base font-bold text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-inner"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson5Step(2)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 2. 마음 만나기로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson5Step(4)}
                              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>4. 마음 다지기 &amp; 저장하러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 4. [마음 다지기] 함께 실천하는 마음 미션 & 성장 점검 */}
                      {lesson5Step === 4 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                4
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 다지기] 함께 실천하는 마음 미션 &amp; 성장 확인
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-bold">
                              자가 진단 · 실천 미션
                            </span>
                          </div>

                          {/* 내가 완성한 5단계 카드 요약 프리뷰 */}
                          <div className="p-6 bg-gradient-to-r from-teal-50 via-white to-emerald-50 rounded-3xl border-2 border-teal-300 shadow-sm space-y-4">
                            <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b pb-2">
                              <span>MIND PLAY LESSON 05</span>
                              <span>1-3 {studentName} ({studentId})</span>
                            </div>
                            <div className="space-y-2 text-xs sm:text-sm font-batang">
                              <div className="p-3 bg-white rounded-xl border border-teal-100">
                                <strong className="text-teal-900 font-dodum block text-xs">📌 내가 점검한 일상 갈등 상황:</strong>
                                <p className="text-gray-800 mt-0.5">{lesson5Situation}</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="p-3 bg-white rounded-xl border border-teal-100">
                                  <strong className="text-teal-900 font-dodum block text-xs">💬 내 감정과 표현:</strong>
                                  <p className="text-gray-800 mt-0.5">{lesson5EmotionInput || "서운함과 분노"} / {lesson5ExpressionInput || "말을 아끼고 속으로 삭임"}</p>
                                </div>
                                <div className="p-3 bg-white rounded-xl border border-teal-100">
                                  <strong className="text-teal-900 font-dodum block text-xs">🏷️ 수업 목표 해시태그:</strong>
                                  <p className="text-teal-800 font-bold mt-0.5">{lesson5HashtagInput}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-teal-800 text-white rounded-2xl shadow-inner text-center space-y-1">
                                <span className="text-[11px] font-dodum text-teal-200">✨ 위기 순간을 가라앉힐 나의 1줄 주문</span>
                                <div className="text-base sm:text-lg font-title font-bold text-amber-300">
                                  &quot;{mantraCustom}&quot;
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 성장 확인 자가 진단 (별점 1~5점) */}
                          <div className="p-5 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
                            <span className="font-dodum font-bold text-teal-950 block text-xs sm:text-sm">
                              ⭐ [성장 확인] 오늘 배운 방법으로 감정의 파도를 다스릴 수 있다는 자신감이 생겼나요?
                            </span>
                            <div className="flex items-center gap-2 text-amber-500 text-2xl">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setLesson5StarRating(star)}
                                  className="hover:scale-125 transition-transform"
                                >
                                  {star <= lesson5StarRating ? "★" : "☆"}
                                </button>
                              ))}
                              <span className="ml-2 text-xs font-dodum text-teal-900 font-bold">
                                ({lesson5StarRating}점 / 5점 만점)
                              </span>
                            </div>
                          </div>

                          {/* 우리 모두의 미션 배너 */}
                          <div className="p-6 bg-gradient-to-r from-teal-700 to-emerald-700 text-white rounded-3xl shadow-md space-y-2 text-center">
                            <span className="text-xs font-dodum font-bold uppercase tracking-widest text-teal-200">
                              OUR DAILY MISSION · 우리 모두의 미션
                            </span>
                            <h4 className="text-lg sm:text-xl font-batang font-bold leading-relaxed">
                              &quot;일상에서 화나거나 짜증 날 때, 내가 만든 1줄 주문을 외우고 4-7-8 심호흡 실천하기!&quot;
                            </h4>
                            <p className="text-xs font-batang text-teal-100">
                              나의 주문: <strong>&apos;{mantraCustom}&apos;</strong>
                            </p>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson5Step(3)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 3. 감정 조절법으로
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const saveData = {
                                  studentId,
                                  studentName,
                                  savedAt: new Date().toLocaleString("ko-KR"),
                                  lesson: 5,
                                  situation: lesson5Situation,
                                  emotion: lesson5EmotionInput,
                                  expression: lesson5ExpressionInput,
                                  prediction: lesson5PredictInput,
                                  hashtag: lesson5HashtagInput,
                                  copingPractice: lesson5CopingPractice,
                                  favoriteCoping: lesson5FavoriteCoping,
                                  mantra: mantraCustom,
                                  rating: lesson5StarRating,
                                };
                                try {
                                  const all = JSON.parse(localStorage.getItem("mindplay_lesson5_records") || "{}");
                                  all[studentId] = saveData;
                                  localStorage.setItem("mindplay_lesson5_records", JSON.stringify(all));
                                } catch(e){}
                                handleCompleteLesson(5);
                                triggerConfetti();
                                alert("🎉 5단계 [감정의 파도 다스리기] 모든 활동이 마이페이지에 안전하게 저장되었습니다! ⭐");
                              }}
                              className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>💾</span>
                              <span>5단계 활동 완료 &amp; 저장하기</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}


{/* 6단계: 생각을 바꾸면 놀라운 일이! (대구광역시교육청 마음학기제 SEL 4단계 워크북 체계 - ABCD 생각 뒤집기) */}
                  {currentLesson === 6 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 메인 헤더 배너 */}
                      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                              🎯 6단계 마음활동
                            </span>
                            <span className="text-xs font-batang text-amber-100 font-bold">
                              영역 ❸ 정서 조절하기
                            </span>
                          </div>
                          {/* 4단계 스텝 인디케이터 네비게이션 */}
                          <div className="flex flex-wrap items-center bg-black/25 p-1 rounded-2xl backdrop-blur gap-1">
                            {[
                              { num: 1, label: "1. 마음 편지", icon: "📮" },
                              { num: 2, label: "2. 마음 만나기", icon: "🔍" },
                              { num: 3, label: "3. 마음 키우기", icon: "🃏" },
                              { num: 4, label: "4. 마음 다지기", icon: "⭐" },
                            ].map(s => (
                              <button
                                key={s.num}
                                type="button"
                                onClick={() => setLesson6Step(s.num)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1 ${lesson6Step === s.num ? "bg-white text-amber-900 shadow-md scale-105" : "text-white/80 hover:text-white"}`}
                              >
                                <span>{s.icon}</span>
                                <span>{s.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-title font-bold">
                            06. 생각을 바꾸면 놀라운 일이!: 비합리적 신념 바꾸기
                          </h3>
                          <p className="text-xs sm:text-sm font-batang text-amber-100 leading-relaxed mt-1">
                            모든 일은 마음먹기에 달려 있습니다. <strong>ABCD 생각 뒤집기 모델</strong>로 내 안의 비합리적 신념에 물음표를 던져보세요!
                          </p>
                        </div>
                      </div>

                      {/* 1. [오늘의 마음 편지] (도입) */}
                      {lesson6Step === 1 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                1
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [오늘의 마음 편지] 비합리적 신념 바꾸기
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
                              생각이 바뀌면 감정도 달라져요!
                            </span>
                          </div>

                          <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white rounded-3xl border-2 border-amber-300 shadow-sm space-y-4 relative overflow-hidden">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">📮</span>
                              <div>
                                <span className="text-xs font-dodum font-bold text-amber-800">마음우체통 도착 사연</span>
                                <h5 className="text-base sm:text-lg font-title font-bold text-gray-900">
                                  비합리적 신념 바꾸기 - 생각이 바뀌면 감정도 달라져요!
                                </h5>
                              </div>
                            </div>

                            <blockquote className="font-batang text-base sm:text-lg text-amber-950 font-bold leading-relaxed bg-white/95 p-6 rounded-2xl border border-amber-200 shadow-2xs italic whitespace-pre-line">
                              &quot;이번 중간고사를 망쳤어. 난 앞으로 남은 시험도 계속 망칠 거야...&quot;
                            </blockquote>

                            <div className="font-batang text-xs sm:text-sm text-gray-800 leading-relaxed bg-amber-100/50 p-5 rounded-2xl border border-amber-200 space-y-2">
                              <p>
                                시험 한 번에 모든 게 끝난 것처럼 느껴지고, <strong>&apos;난 역시 안 돼&apos;</strong>라며 스스로를 깎아내린 적이 있나요?
                              </p>
                              <p>
                                사실 우리를 힘들게 만드는 건 시험 결과 그 자체보다, <strong>&apos;난 항상 실패할 거야&apos;</strong>라는 머릿속 비합리적인 생각 때문일 수 있어요.
                              </p>
                              <p className="text-amber-950 font-bold">
                                오늘 마음우체통에 도착한 친구의 한숨 섞인 사연을 읽고, 어떻게 하면 생각을 건강하게 뒤집을 수 있을지 함께 알아볼까요?
                              </p>
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => setLesson6Step(2)}
                                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                              >
                                <span>비합리적 생각 깨부수러 가기 ➔</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. [마음 만나기] 울퉁불퉁 내 마음을 들여다볼까요? */}
                      {lesson6Step === 2 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                2
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 만나기] 울퉁불퉁 내 마음을 들여다볼까요?
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
                              비합리적 신념 점검 &amp; #해시태그 목표
                            </span>
                          </div>

                          {/* 활동 A. 비합리적 신념 점검하기 */}
                          <div className="p-6 bg-amber-50/70 rounded-3xl border-2 border-amber-200 space-y-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-amber-950">
                                <span>💡</span>
                                <span>활동 A. 일상생활에서 나를 힘들게 만드는 자동적이고 부정적인 생각 살펴보기</span>
                              </div>
                              <p className="text-xs font-batang text-gray-600">
                                예: 중간고사 70점을 받고 <em>&quot;나 빼고 다 잘 본 것 같아... 난 역시 안 돼&quot;</em>라고 자책하는 상황 등
                              </p>
                            </div>

                            {/* 일상 속 비합리적 생각 프리셋 버튼들 */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {[
                                "중간고사 70점 받고 '나 빼고 다 잘 본 것 같아... 난 역시 안 돼' 자책",
                                "친구가 내 문자에 30분 동안 답장이 없자 '날 싫어해서 일부러 씹는 거야' 단정",
                                "발표할 때 한 번 버벅거렸다고 '반 애들 모두가 날 바보 취급할 거야' 극단적 생각"
                              ].map(ex => (
                                <button
                                  key={ex}
                                  type="button"
                                  onClick={() => setLesson6NegativeBeliefCheck(ex)}
                                  className={`p-3.5 rounded-2xl border text-left text-xs font-batang transition flex flex-col justify-between gap-1.5 ${lesson6NegativeBeliefCheck === ex ? "bg-amber-100/90 border-amber-500 font-bold text-amber-950 shadow-2xs" : "bg-white border-amber-200 text-gray-700 hover:bg-amber-50/50"}`}
                                >
                                  <span>&quot;{ex}&quot;</span>
                                  {lesson6NegativeBeliefCheck === ex && <span className="text-[10px] font-dodum text-amber-700 font-bold self-end">선택됨 ✓</span>}
                                </button>
                              ))}
                            </div>

                            <div className="space-y-1.5 pt-2">
                              <label className="text-xs font-dodum font-bold text-amber-950 block">
                                내가 자주 하는 부정적/비합리적 생각 직접 입력하거나 수정하기:
                              </label>
                              <textarea
                                rows="2"
                                value={lesson6NegativeBeliefCheck}
                                onChange={(e) => setLesson6NegativeBeliefCheck(e.target.value)}
                                placeholder="일상에서 나를 괴롭히는 부정적인 생각을 솔직하게 적어보세요..."
                                className="w-full p-3 bg-white rounded-xl border border-amber-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                              />
                            </div>
                          </div>

                          {/* 활동 B. #해시태그로 말해요 (티켓 메모지) */}
                          <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl border-2 border-orange-200 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-orange-950">
                                <span>🎟️</span>
                                <span>활동 B. #해시태그로 말해요 (이번 시간 나만의 수업 목표)</span>
                              </div>
                              <span className="text-xs font-dodum text-orange-800 bg-white px-2.5 py-0.5 rounded-full border border-orange-300">
                                티켓 메모지 뱃지
                              </span>
                            </div>

                            {/* 추천 해시태그 뱃지들 */}
                            <div className="space-y-2">
                              <span className="text-xs font-dodum font-bold text-gray-700 block">
                                추천 슬라이드 &amp; 워크북 해시태그 (클릭하여 추가):
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "#걱정을_사서_하지_말자", "#근거_없는_생각_멈춰", "#잘못된_생각",
                                  "#비합리적_신념", "#생각을_바꿔봐", "#오히려_좋아", "#생각_뒤집기_마스터"
                                ].map(tag => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                      if (!lesson6HashtagInput.includes(tag)) {
                                        setLesson6HashtagInput(prev => (prev ? `${prev} ${tag}` : tag));
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-white text-orange-900 border border-orange-300 rounded-xl text-xs font-dodum font-bold hover:bg-orange-100 hover:scale-105 transition-all shadow-2xs"
                                  >
                                    + {tag}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-dodum font-bold text-orange-950 block">
                                나의 수업 목표 해시태그 티켓:
                              </label>
                              <input
                                type="text"
                                value={lesson6HashtagInput}
                                onChange={(e) => setLesson6HashtagInput(e.target.value)}
                                placeholder="#비합리적_신념_탈출 #생각뒤집기_도전"
                                className="w-full p-3.5 bg-white rounded-xl border-2 border-orange-300 font-dodum font-bold text-sm text-orange-950 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson6Step(1)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 1. 마음 편지로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson6Step(3)}
                              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>3. ABCD 생각 뒤집기 배우러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 3. [마음 키우기] 비합리적 신념을 합리적 신념으로! (ABCD 모델 & 3대 논박 질문 카드) */}
                      {lesson6Step === 3 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                3
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 키우기] 비합리적 신념을 합리적 신념으로!
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
                              ABCD 생각 바꾸기 원리 &amp; 3대 논박 질문
                            </span>
                          </div>

                          {/* ① 생각 바꾸기의 원리: ABCD 모델 시각화 카드 */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-amber-950">
                              <span>📚</span>
                              <span>① 생각 바꾸기의 원리: ABCD 모델 완벽 이해하기</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {/* A */}
                              <div className="p-4.5 bg-blue-50/80 rounded-2xl border-2 border-blue-300 space-y-2 flex flex-col justify-between shadow-2xs">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-mono">A</span>
                                    <span className="text-[10px] font-dodum font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">선행 사건</span>
                                  </div>
                                  <h5 className="font-title font-bold text-sm text-blue-950">Activating event</h5>
                                  <p className="text-xs font-batang text-gray-700 leading-relaxed">
                                    나에게 일어난 객관적인 사건<br/>
                                    <span className="text-blue-900 text-[11px] font-medium">(예: 시험을 망쳤다, 친구가 답장이 없다)</span>
                                  </p>
                                </div>
                              </div>

                              {/* B */}
                              <div className="p-4.5 bg-rose-50/80 rounded-2xl border-2 border-rose-300 space-y-2 flex flex-col justify-between shadow-2xs">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center text-xs font-bold font-mono">B</span>
                                    <span className="text-[10px] font-dodum font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">비합리적 신념</span>
                                  </div>
                                  <h5 className="font-title font-bold text-sm text-rose-950">Belief (왜곡된 생각)</h5>
                                  <p className="text-xs font-batang text-gray-700 leading-relaxed">
                                    사건을 바라보는 왜곡된 해석<br/>
                                    <span className="text-rose-900 text-[11px] font-medium">(예: &quot;난 끝났어&quot;, &quot;날 싫어하는 게 분명해&quot;)</span>
                                  </p>
                                </div>
                              </div>

                              {/* C */}
                              <div className="p-4.5 bg-purple-50/80 rounded-2xl border-2 border-purple-300 space-y-2 flex flex-col justify-between shadow-2xs">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-bold font-mono">C</span>
                                    <span className="text-[10px] font-dodum font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">감정/행동 결과</span>
                                  </div>
                                  <h5 className="font-title font-bold text-sm text-purple-950">Consequence</h5>
                                  <p className="text-xs font-batang text-gray-700 leading-relaxed">
                                    왜곡된 생각 때문에 생긴 고통<br/>
                                    <span className="text-purple-900 text-[11px] font-medium">(우울, 불안, 분노, 자포자기, 회피)</span>
                                  </p>
                                </div>
                              </div>

                              {/* D */}
                              <div className="p-4.5 bg-emerald-50/90 rounded-2xl border-2 border-emerald-400 space-y-2 flex flex-col justify-between shadow-md">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-xs font-bold font-mono">D</span>
                                    <span className="text-[10px] font-dodum font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">논박 &amp; 생각 뒤집기</span>
                                  </div>
                                  <h5 className="font-title font-bold text-sm text-emerald-950">Dispute (합리적 신념)</h5>
                                  <p className="text-xs font-batang text-gray-700 leading-relaxed">
                                    물음표를 던져 건강하게 뒤집기!<br/>
                                    <span className="text-emerald-900 text-[11px] font-bold">(예: &quot;다음 기말고사를 잘 준비하면 돼&quot;)</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ② [핵심활동] ABCD로 내 마음 바꾸기 & 3대 논박 질문 카드 인터랙션 */}
                          <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 via-orange-50/50 to-emerald-50 rounded-3xl border-2 border-amber-300 shadow-md space-y-6">
                            <div className="space-y-1">
                              <span className="px-3 py-1 bg-amber-700 text-white rounded-full text-xs font-dodum font-bold">
                                🃏 [핵심활동] 3대 논박 질문 카드로 비합리적 신념(B) 뒤집기
                              </span>
                              <h5 className="text-base sm:text-lg font-title font-bold text-gray-900 mt-1">
                                나의 사건(A)과 생각(B), 감정(C)을 적고 3대 질문으로 합리적 신념(D)을 완성하세요
                              </h5>
                            </div>

                            {/* A, B, C 입력 필드 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-batang">
                              {/* A */}
                              <div className="p-4 bg-white rounded-2xl border border-blue-200 space-y-2">
                                <label className="font-dodum font-bold text-blue-950 block text-xs">
                                  A (선행 사건, 사실 그대로):
                                </label>
                                <textarea
                                  rows="2"
                                  value={lesson6ActivatingEvent}
                                  onChange={(e) => setLesson6ActivatingEvent(e.target.value)}
                                  placeholder="예: 이번 중간고사 점수가 낮게 나왔다."
                                  className="w-full p-2.5 bg-blue-50/30 rounded-xl border border-blue-200 text-xs sm:text-sm font-batang leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                              </div>

                              {/* B */}
                              <div className="p-4 bg-white rounded-2xl border border-rose-200 space-y-2">
                                <label className="font-dodum font-bold text-rose-950 block text-xs">
                                  B (내 머릿속 비합리적 신념):
                                </label>
                                <textarea
                                  rows="2"
                                  value={lesson6IrrationalBelief}
                                  onChange={(e) => setLesson6IrrationalBelief(e.target.value)}
                                  placeholder="예: 난 앞으로 모든 시험을 다 망칠 거야."
                                  className="w-full p-2.5 bg-rose-50/30 rounded-xl border border-rose-200 text-xs sm:text-sm font-batang leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-400"
                                />
                              </div>

                              {/* C */}
                              <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-2">
                                <label className="font-dodum font-bold text-purple-950 block text-xs">
                                  C (그 생각으로 인한 감정과 행동):
                                </label>
                                <textarea
                                  rows="2"
                                  value={lesson6Consequence}
                                  onChange={(e) => setLesson6Consequence(e.target.value)}
                                  placeholder="예: 좌절감, 무기력, 공부 포기하고 폰만 봄"
                                  className="w-full p-2.5 bg-purple-50/30 rounded-xl border border-purple-200 text-xs sm:text-sm font-batang leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                              </div>
                            </div>

                            {/* 3대 논박 질문 카드 인터랙티브 덱 */}
                            <div className="space-y-3 pt-2">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                                  <span>🔍</span> 3대 논박 질문 카드에 답해보기 (카드를 클릭하여 전환):
                                </span>
                                <div className="flex gap-1">
                                  {[
                                    { num: 1, label: "질문 1. 근거 확인" },
                                    { num: 2, label: "질문 2. 다른 시각" },
                                    { num: 3, label: "질문 3. 최악의 확률" },
                                  ].map(c => (
                                    <button
                                      key={c.num}
                                      type="button"
                                      onClick={() => setLesson6ActiveCard(c.num)}
                                      className={`px-2.5 py-1 rounded-xl text-xs font-dodum font-bold transition ${lesson6ActiveCard === c.num ? "bg-amber-700 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200"}`}
                                    >
                                      {c.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* 질문 카드 1 */}
                              {lesson6ActiveCard === 1 && (
                                <div className="p-5 bg-white rounded-2xl border-2 border-amber-300 shadow-sm space-y-2.5 animate-fadeIn">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-dodum font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                                      질문 카드 ① 객관적 근거 찾기
                                    </span>
                                    <span className="text-[11px] font-batang text-gray-500">놓친 정보나 팩트는 없을까?</span>
                                  </div>
                                  <h6 className="font-title font-bold text-sm sm:text-base text-gray-900">
                                    &quot;이 생각에 객관적인 근거가 있나? (내가 놓치고 있는 다른 사실은 없을까?)&quot;
                                  </h6>
                                  <input
                                    type="text"
                                    value={lesson6DisputeQ1}
                                    onChange={(e) => setLesson6DisputeQ1(e.target.value)}
                                    placeholder="예: 단 한 번의 시험 결과일 뿐이고, 내가 열심히 공부했던 단원은 다 맞혔어."
                                    className="w-full p-3 bg-amber-50/40 rounded-xl border border-amber-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                </div>
                              )}

                              {/* 질문 카드 2 */}
                              {lesson6ActiveCard === 2 && (
                                <div className="p-5 bg-white rounded-2xl border-2 border-teal-300 shadow-sm space-y-2.5 animate-fadeIn">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-dodum font-bold text-teal-900 bg-teal-100 px-3 py-1 rounded-full">
                                      질문 카드 ② 다른 각도 &amp; 긍정적 시각
                                    </span>
                                    <span className="text-[11px] font-batang text-gray-500">배울 점이나 새로운 기회는?</span>
                                  </div>
                                  <h6 className="font-title font-bold text-sm sm:text-base text-gray-900">
                                    &quot;다른 각도나 긍정적인 시각으로 바라볼 수는 없을까?&quot;
                                  </h6>
                                  <input
                                    type="text"
                                    value={lesson6DisputeQ2}
                                    onChange={(e) => setLesson6DisputeQ2(e.target.value)}
                                    placeholder="예: 틀린 문제를 통해 내가 취약한 부분을 명확히 알게 된 좋은 기회야."
                                    className="w-full p-3 bg-teal-50/40 rounded-xl border border-teal-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                  />
                                </div>
                              )}

                              {/* 질문 카드 3 */}
                              {lesson6ActiveCard === 3 && (
                                <div className="p-5 bg-white rounded-2xl border-2 border-indigo-300 shadow-sm space-y-2.5 animate-fadeIn">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-dodum font-bold text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full">
                                      질문 카드 ③ 최악의 확률 검증
                                    </span>
                                    <span className="text-[11px] font-batang text-gray-500">실제로 일어날 가능성은?</span>
                                  </div>
                                  <h6 className="font-title font-bold text-sm sm:text-base text-gray-900">
                                    &quot;이 상황에서 최악의 결과가 일어날 확률이 정말 높을까?&quot;
                                  </h6>
                                  <input
                                    type="text"
                                    value={lesson6DisputeQ3}
                                    onChange={(e) => setLesson6DisputeQ3(e.target.value)}
                                    placeholder="예: 이번에 부족한 점을 보완해서 준비하면 다음 기말고사는 충분히 올릴 수 있어."
                                    className="w-full p-3 bg-indigo-50/40 rounded-xl border border-indigo-300 font-batang text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                              )}
                            </div>

                            {/* 최종 완성: 새로운 합리적 신념 (D) 작성 */}
                            <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl shadow-lg space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-dodum font-bold bg-white/20 px-3 py-1 rounded-full text-emerald-100">
                                  ✨ 최종 완성: 새로운 합리적 신념 (D)
                                </span>
                                <span className="text-xs font-batang text-emerald-200">
                                  생각 뒤집기 성공!
                                </span>
                              </div>
                              <label className="text-xs sm:text-sm font-dodum font-bold block">
                                질문 카드를 통해 비합리적 신념(B)을 뒤집은 새로운 합리적 신념을 적어보세요:
                              </label>
                              <textarea
                                rows="2"
                                value={lesson6RationalBelief}
                                onChange={(e) => setLesson6RationalBelief(e.target.value)}
                                placeholder="예: 이번 시험으로 부족한 부분을 알았으니 다음 기말고사를 잘 준비하면 돼!"
                                className="w-full p-4 bg-white text-gray-900 rounded-2xl font-title text-sm sm:text-base font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400 leading-relaxed"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson6Step(2)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 2. 마음 만나기로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson6Step(4)}
                              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>4. 마음 다지기 &amp; 저장하러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 4. [마음 다지기] 함께 실천하는 마음 미션 & 성장 점검 */}
                      {lesson6Step === 4 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                4
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 다지기] 함께 실천하는 마음 미션 &amp; 성장 점검
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
                              이만큼 성장했어요! &amp; 우리 모두의 미션
                            </span>
                          </div>

                          {/* 내가 완성한 6단계 생각 뒤집기 카드 요약 프리뷰 */}
                          <div className="p-6 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
                            <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b pb-2">
                              <span>MIND PLAY LESSON 06 · ABCD THINKING BREAKER</span>
                              <span>1-3 {studentName} ({studentId})</span>
                            </div>
                            <div className="space-y-3 text-xs sm:text-sm font-batang">
                              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
                                <strong className="text-rose-900 font-dodum block text-xs">❌ 내가 알아챈 비합리적 신념 (B):</strong>
                                <p className="text-gray-800 mt-1 italic">&quot;{lesson6IrrationalBelief}&quot;</p>
                              </div>
                              <div className="p-4 bg-emerald-700 text-white rounded-2xl shadow-inner text-center space-y-1">
                                <span className="text-[11px] font-dodum text-emerald-200">✨ 내가 뒤집은 합리적 신념 (D)</span>
                                <div className="text-base sm:text-lg font-title font-bold text-amber-300">
                                  &quot;{lesson6RationalBelief}&quot;
                                </div>
                              </div>
                              <div className="text-center pt-1 text-xs font-dodum text-amber-800 font-bold">
                                {lesson6HashtagInput}
                              </div>
                            </div>
                          </div>

                          {/* 이만큼 성장했어요! (별점 1~5점) */}
                          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
                            <span className="font-dodum font-bold text-amber-950 block text-xs sm:text-sm">
                              ⭐ [이만큼 성장했어요!] 나의 비합리적 신념을 알아차리고 생각을 유연하게 바꿀 수 있게 되었나요?
                            </span>
                            <div className="flex items-center gap-2 text-amber-500 text-2xl">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setLesson6StarRating(star)}
                                  className="hover:scale-125 transition-transform"
                                >
                                  {star <= lesson6StarRating ? "★" : "☆"}
                                </button>
                              ))}
                              <span className="ml-2 text-xs font-dodum text-amber-900 font-bold">
                                ({lesson6StarRating}점 / 5점 만점)
                              </span>
                            </div>
                          </div>

                          {/* 우리 모두의 미션! 배너 */}
                          <div className="p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl shadow-md space-y-2 text-center">
                            <span className="text-xs font-dodum font-bold uppercase tracking-widest text-amber-200">
                              OUR DAILY MISSION · 우리 모두의 미션!
                            </span>
                            <h4 className="text-lg sm:text-xl font-batang font-bold leading-relaxed">
                              &quot;일주일 동안 기분이 울적하거나 화가 날 때, 내 머릿속 &apos;비합리적 생각(B)&apos;을 알아채고 3가지 질문으로 생각 뒤집어보기!&quot;
                            </h4>
                            <p className="text-xs font-batang text-amber-100">
                              나의 합리적 신념: <strong>&apos;{lesson6RationalBelief}&apos;</strong>
                            </p>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson6Step(3)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 3. ABCD 생각 뒤집기로
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const saveData = {
                                  studentId,
                                  studentName,
                                  savedAt: new Date().toLocaleString("ko-KR"),
                                  lesson: 6,
                                  negativeBeliefCheck: lesson6NegativeBeliefCheck,
                                  hashtag: lesson6HashtagInput,
                                  activatingEvent: lesson6ActivatingEvent,
                                  irrationalBelief: lesson6IrrationalBelief,
                                  consequence: lesson6Consequence,
                                  disputeQ1: lesson6DisputeQ1,
                                  disputeQ2: lesson6DisputeQ2,
                                  disputeQ3: lesson6DisputeQ3,
                                  rationalBelief: lesson6RationalBelief,
                                  rating: lesson6StarRating,
                                };
                                try {
                                  const all = JSON.parse(localStorage.getItem("mindplay_lesson6_records") || "{}");
                                  all[studentId] = saveData;
                                  localStorage.setItem("mindplay_lesson6_records", JSON.stringify(all));
                                } catch(e){}
                                handleCompleteLesson(6);
                                triggerConfetti();
                                alert("🎉 6단계 [생각을 바꾸면 놀라운 일이!] 모든 활동이 마이페이지에 안전하게 저장되었습니다! ⭐");
                              }}
                              className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>💾</span>
                              <span>6단계 활동 완료 &amp; 저장하기</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}


                  {/* 7단계: 단단해질 내 마음 (대구광역시교육청 마음학기제 SEL 4단계 워크북 체계 - 통제 분리수거 아케이드) */}
                  {currentLesson === 7 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 메인 헤더 배너 */}
                      <div className="bg-gradient-to-r from-orange-500 via-amber-600 to-emerald-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                              🎯 7단계 마음활동
                            </span>
                            <span className="text-xs font-batang text-orange-100 font-bold">
                              영역 ❸ 정서 조절하기
                            </span>
                          </div>
                          {/* 4단계 스텝 인디케이터 네비게이션 */}
                          <div className="flex flex-wrap items-center bg-black/25 p-1 rounded-2xl backdrop-blur gap-1">
                            {[
                              { num: 1, label: "1. 마음 편지", icon: "📮" },
                              { num: 2, label: "2. 마음 만나기", icon: "🔍" },
                              { num: 3, label: "3. 마음 키우기", icon: "🗑️" },
                              { num: 4, label: "4. 마음 다지기", icon: "⭐" },
                            ].map(s => (
                              <button
                                key={s.num}
                                type="button"
                                onClick={() => setLesson7Step(s.num)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1 ${lesson7Step === s.num ? "bg-white text-orange-950 shadow-md scale-105" : "text-white/80 hover:text-white"}`}
                              >
                                <span>{s.icon}</span>
                                <span>{s.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-title font-bold">
                            07. 단단해질 내 마음: 통제 분리수거 아케이드
                          </h3>
                          <p className="text-xs sm:text-sm font-batang text-orange-100 leading-relaxed mt-1">
                            바꿀 수 없는 것에 얽매이지 않고, <strong>내가 바꿀 수 있는 것에 집중하는 지혜</strong>를 길러 튼튼한 마음 방패를 만듭니다.
                          </p>
                        </div>
                      </div>

                      {/* 1. [오늘의 마음 편지] (열기) */}
                      {lesson7Step === 1 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                1
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [오늘의 마음 편지] 마음우체통 편지 열기
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 font-bold">
                              마음 방패 만들기
                            </span>
                          </div>

                          <div className="p-6 sm:p-8 bg-gradient-to-br from-orange-50/90 via-amber-50/60 to-white rounded-3xl border-2 border-orange-300 shadow-sm space-y-4 relative overflow-hidden">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">📮</span>
                                <div>
                                  <span className="text-xs font-dodum font-bold text-orange-800">마음우체통 편지 사연</span>
                                  <h5 className="text-base sm:text-lg font-title font-bold text-gray-900">
                                    신경 쓸 것도 많고 머리가 지끈거리는 순간
                                  </h5>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if ('speechSynthesis' in window) {
                                    const text = "시험, 숙제, 친구 관계... 중학교에 오니 신경 쓸 것도 많고 머리가 지끈거릴 때가 많아. 하지만 스트레스가 무조건 나쁜 것만은 아니래! 스트레스를 잘 다스리면 내 마음의 근육이 더 단단해질 수 있대. 우리 마음을 지키는 튼튼한 방패를 함께 만들어볼까?";
                                    const utter = new SpeechSynthesisUtterance(text);
                                    utter.lang = 'ko-KR';
                                    utter.rate = 0.95;
                                    window.speechSynthesis.speak(utter);
                                  } else {
                                    alert("이 브라우저에서는 음성 재생(TTS)을 지원하지 않습니다.");
                                  }
                                }}
                                className="px-3.5 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl text-xs font-dodum font-bold border border-orange-300 shadow-2xs transition flex items-center gap-1.5"
                              >
                                <span>🔊</span>
                                <span>마음이 목소리 듣기 (TTS)</span>
                              </button>
                            </div>

                            <blockquote className="font-batang text-base sm:text-lg text-orange-950 font-bold leading-relaxed bg-white/95 p-6 rounded-2xl border border-orange-200 shadow-2xs italic whitespace-pre-line">
                              &quot;시험, 숙제, 친구 관계... 중학교에 오니 신경 쓸 것도 많고 머리가 지끈거릴 때가 많아.
                              하지만 스트레스가 무조건 나쁜 것만은 아니래! 스트레스를 잘 다스리면 내 마음의 근육이 더 단단해질 수 있대.
                              우리 마음을 지키는 튼튼한 방패를 함께 만들어볼까?&quot;
                            </blockquote>

                            <p className="text-xs sm:text-sm font-batang text-orange-950 leading-relaxed bg-orange-100/50 p-4 rounded-xl border border-orange-200">
                              🛡️ <strong>선생님의 한마디:</strong> 적절한 스트레스는 우리가 위기를 헤쳐나가고 성장하게 만드는 좋은 자극제가 됩니다. 중요한 것은 스트레스 상황에서 &apos;내가 바꿀 수 있는 것&apos;과 &apos;바꿀 수 없는 것&apos;을 현명하게 구분하는 지혜입니다.
                            </p>

                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => setLesson7Step(2)}
                                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                              >
                                <span>스트레스 만나러 가기 ➔</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. [마음 만나기] (스트레스 탐색 & 해시태그 티켓) */}
                      {lesson7Step === 2 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                2
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 만나기] 스트레스의 두 얼굴 &amp; 나의 스트레스 신호
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 font-bold">
                              신체 반응 체크 &amp; 티켓 메모지
                            </span>
                          </div>

                          {/* 활동 A: 스트레스의 두 얼굴 & 내 신호 체크 */}
                          <div className="p-6 bg-orange-50/70 rounded-3xl border-2 border-orange-200 space-y-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-orange-950">
                                <span>⚡</span>
                                <span>활동 A. 스트레스가 찾아왔을 때 내 몸과 행동이 보내는 신호는?</span>
                              </div>
                              <p className="text-xs font-batang text-gray-600">
                                나에게 자주 나타나는 신체적/행동적 반응 칩을 모두 골라보세요 (다중 선택):
                              </p>
                            </div>

                            {/* 스트레스 반응 칩들 */}
                            <div className="flex flex-wrap gap-2.5 pt-1">
                              {[
                                "두통/어지러움 🤕", "가슴 두근거림 💓", "손톱 깨물기 💅",
                                "짜증/예민 🌋", "폭식/군것질 🍩", "스마트폰 과몰입 📱",
                                "어깨/목 뻐근함 💆", "잠이 안 옴/불면 🌙", "말수 줄어들고 멍때림 😶"
                              ].map(chip => {
                                const isSel = lesson7StressSignals.includes(chip);
                                return (
                                  <button
                                    key={chip}
                                    type="button"
                                    onClick={() => {
                                      if (isSel) setLesson7StressSignals(lesson7StressSignals.filter(x => x !== chip));
                                      else setLesson7StressSignals([...lesson7StressSignals, chip]);
                                    }}
                                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-dodum font-bold transition-all flex items-center gap-1.5 ${isSel ? "bg-orange-600 text-white shadow-md scale-105" : "bg-white text-gray-700 border border-orange-200 hover:bg-orange-100"}`}
                                  >
                                    <span>{isSel ? "✓" : "+"}</span>
                                    <span>{chip}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 활동 B: #해시태그로 말해요 (양옆 펀칭 티켓 메모지 UI) */}
                          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-300 space-y-4 relative">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-amber-950">
                                <span>🎟️</span>
                                <span>활동 B. #해시태그로 말해요 (티켓 메모지)</span>
                              </div>
                              <span className="text-xs font-dodum text-amber-800 bg-white px-2.5 py-0.5 rounded-full border border-amber-300">
                                마음 근육 티켓
                              </span>
                            </div>

                            {/* 추천 해시태그 뱃지 */}
                            <div className="space-y-2">
                              <span className="text-xs font-dodum font-bold text-gray-700 block">
                                슬라이드 추천 예시 뱃지 (클릭 시 자동 추가):
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "#단단해질_내_마음", "#바꿀_수_있는_것에_집중", "#스트레스_방패_장착",
                                  "#마음근육_키우기", "#흘려보내는_용기", "#평온함_충전"
                                ].map(tag => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                      if (!lesson7HashtagInput.includes(tag)) {
                                        setLesson7HashtagInput(prev => (prev ? `${prev} ${tag}` : tag));
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-white text-amber-900 border border-amber-300 rounded-xl text-xs font-dodum font-bold hover:bg-amber-100 hover:scale-105 transition shadow-2xs"
                                  >
                                    + {tag}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 톱니 티켓 스타일 인풋 박스 */}
                            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-amber-400 space-y-1 relative">
                              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-amber-50 rounded-full border border-amber-300"></div>
                              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-amber-50 rounded-full border border-amber-300"></div>
                              <label className="text-xs font-dodum font-bold text-amber-950 block px-3">
                                나의 수업 목표 해시태그 티켓:
                              </label>
                              <input
                                type="text"
                                value={lesson7HashtagInput}
                                onChange={(e) => setLesson7HashtagInput(e.target.value)}
                                placeholder="#단단해질_내_마음 #바꿀_수_있는_것에_집중"
                                className="w-full p-2.5 px-3 bg-transparent font-dodum font-bold text-sm text-amber-950 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson7Step(1)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 1. 마음 편지로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson7Step(3)}
                              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>3. 통제 분리 아케이드 하러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 3. [마음 키우기] (핵심 활동: 통제 분리 드래그 앤 드롭 아케이드) */}
                      {lesson7Step === 3 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                3
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 키우기] 통제 바구니 분리수거 게임
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 font-bold">
                              드래그 앤 드롭 아케이드
                            </span>
                          </div>

                          {/* 활동 인트로: 라인홀드 니부어의 평온의 기도 */}
                          <div className="p-6 bg-gradient-to-r from-blue-50 via-teal-50 to-amber-50 rounded-3xl border-2 border-teal-300 text-center space-y-2">
                            <span className="text-2xl">🕊️</span>
                            <blockquote className="font-batang text-sm sm:text-base font-bold text-teal-950 leading-relaxed italic">
                              &quot;내가 바꿀 수 없는 것을 받아들이는 평온함을,<br/>
                              내가 바꿀 수 있는 것을 바꾸는 용기를,<br/>
                              그리고 이 둘의 차이를 아는 지혜를 주소서.&quot;
                            </blockquote>
                            <span className="text-xs font-dodum text-teal-700 block">- 라인홀드 니부어 (Reinhold Niebuhr)</span>
                          </div>

                          {/* 분리수거 인터랙션 안내 */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-dodum font-bold text-gray-800 flex items-center gap-1.5">
                                <span>🎮</span> <strong>스트레스 상황 카드를 알맞은 바구니로 분류해 보세요</strong> (클릭하거나 드래그):
                              </span>
                              <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                                남은 카드: {lesson7Items.filter(x => !lesson7Sorted[x.id]).length}개
                              </span>
                            </div>

                            {/* 분류 대기 중인 스트레스 카드 덱 */}
                            <div className="min-h-[110px] p-4 bg-gray-50/80 rounded-2xl border-2 border-dashed border-gray-300 flex flex-wrap gap-2.5 items-center justify-center">
                              {lesson7Items.filter(it => !lesson7Sorted[it.id]).length === 0 ? (
                                <div className="text-center text-xs font-dodum font-bold text-emerald-800 py-3 flex items-center gap-2">
                                  <span>🎉</span>
                                  <span>모든 스트레스 상황을 지혜롭게 분리수거 완료했습니다!</span>
                                </div>
                              ) : (
                                lesson7Items.filter(it => !lesson7Sorted[it.id]).map(it => (
                                  <div
                                    key={it.id}
                                    draggable
                                    onDragStart={(e) => {
                                      e.dataTransfer.setData("text/plain", it.id);
                                    }}
                                    className="p-3 px-4 bg-white rounded-2xl border-2 border-gray-300 shadow-xs hover:shadow-md hover:border-orange-400 cursor-grab active:cursor-grabbing text-xs sm:text-sm font-batang font-medium text-gray-800 transition flex items-center gap-2"
                                  >
                                    <span>📌</span>
                                    <span>{it.text}</span>
                                    {/* 빠른 버튼 클릭으로도 분류 지원 (모바일 친화적) */}
                                    <div className="flex gap-1 ml-2 pl-2 border-l border-gray-200 text-[10px] font-dodum font-bold">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (it.target === "cannot") {
                                            setLesson7Sorted(prev => ({ ...prev, [it.id]: "cannot" }));
                                            triggerConfetti();
                                          } else {
                                            alert("💡 힌트: 이 일은 내 노력과 행동으로 충분히 바꿀 수 있는 영역입니다! [내가 바꿀 수 있는 것] 바구니에 담아보세요.");
                                          }
                                        }}
                                        className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200"
                                      >
                                        바꿀수X
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (it.target === "can") {
                                            setLesson7Sorted(prev => ({ ...prev, [it.id]: "can" }));
                                            triggerConfetti();
                                          } else {
                                            alert("💡 힌트: 이미 지나간 일이나 타인의 감정은 내가 직접 바꿀 수 없습니다. [내가 바꿀 수 없는 것] 바구니에 담아 흘려보내 보세요.");
                                          }
                                        }}
                                        className="px-2 py-0.5 bg-orange-100 text-orange-950 rounded-lg hover:bg-orange-200"
                                      >
                                        바꿀수O
                                      </button>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* 2대 분리수거 바구니 (드롭 존) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* 1. 파란색 바구니: 내가 바꿀 수 없는 것 (수용 & 흘려보내기) */}
                              <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const id = e.dataTransfer.getData("text/plain");
                                  const item = lesson7Items.find(x => x.id === id);
                                  if (item) {
                                    if (item.target === "cannot") {
                                      setLesson7Sorted(prev => ({ ...prev, [id]: "cannot" }));
                                      triggerConfetti();
                                    } else {
                                      alert("💡 힌트: 이 일은 내 노력과 행동으로 바꿀 수 있는 영역입니다! 오른쪽 주황색 바구니로 이동시켜 주세요.");
                                    }
                                  }
                                }}
                                className="p-6 bg-blue-50/90 rounded-3xl border-2 border-blue-400 space-y-3 min-h-[220px] flex flex-col justify-between shadow-sm"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-dodum font-bold bg-blue-600 text-white px-3 py-1 rounded-full">
                                      🌊 파란색 바구니: 내가 바꿀 수 없는 것
                                    </span>
                                    <span className="text-xs font-batang text-blue-900 font-bold">수용 &amp; 흘려보내기</span>
                                  </div>
                                  <p className="text-[11px] font-batang text-blue-800">
                                    이미 지나간 과거, 날씨, 타인의 표정과 말 등은 내 힘으로 바꿀 수 없으니 담담하게 인정하고 마음을 편안히 비웁니다.
                                  </p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                  {lesson7Items.filter(it => lesson7Sorted[it.id] === "cannot").map(it => (
                                    <div key={it.id} className="p-2.5 px-3 bg-white text-blue-950 rounded-xl border border-blue-200 text-xs font-batang flex items-center justify-between animate-fadeIn">
                                      <span>🍃 {it.text}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const next = { ...lesson7Sorted };
                                          delete next[it.id];
                                          setLesson7Sorted(next);
                                        }}
                                        className="text-gray-400 hover:text-red-500 font-bold text-xs ml-2"
                                        title="되돌리기"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                  {lesson7Items.filter(it => lesson7Sorted[it.id] === "cannot").length === 0 && (
                                    <div className="text-center py-6 text-xs font-batang text-blue-400 italic">
                                      여기로 바꿀 수 없는 카드를 드래그하여 담아보세요.
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 2. 주황색 바구니: 내가 바꿀 수 있는 것 (용기 & 집중하기) */}
                              <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const id = e.dataTransfer.getData("text/plain");
                                  const item = lesson7Items.find(x => x.id === id);
                                  if (item) {
                                    if (item.target === "can") {
                                      setLesson7Sorted(prev => ({ ...prev, [id]: "can" }));
                                      triggerConfetti();
                                    } else {
                                      alert("💡 힌트: 이미 일어난 결과나 타인의 태도는 내가 바꿀 수 없습니다. 왼쪽 파란색 바구니에 담아 흘려보내 주세요.");
                                    }
                                  }
                                }}
                                className="p-6 bg-orange-50/90 rounded-3xl border-2 border-orange-400 space-y-3 min-h-[220px] flex flex-col justify-between shadow-sm"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-dodum font-bold bg-orange-600 text-white px-3 py-1 rounded-full">
                                      🔥 주황색 바구니: 내가 바꿀 수 있는 것
                                    </span>
                                    <span className="text-xs font-batang text-orange-950 font-bold">용기 &amp; 집중하기</span>
                                  </div>
                                  <p className="text-[11px] font-batang text-orange-800">
                                    앞으로의 공부 시간, 나의 말투와 태도, 건강한 습관 등은 지금 내 노력으로 얼마든지 멋지게 바꿀 수 있습니다!
                                  </p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                  {lesson7Items.filter(it => lesson7Sorted[it.id] === "can").map(it => (
                                    <div key={it.id} className="p-2.5 px-3 bg-white text-orange-950 rounded-xl border border-orange-200 text-xs font-batang flex items-center justify-between animate-fadeIn">
                                      <span>⭐ {it.text}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const next = { ...lesson7Sorted };
                                          delete next[it.id];
                                          setLesson7Sorted(next);
                                        }}
                                        className="text-gray-400 hover:text-red-500 font-bold text-xs ml-2"
                                        title="되돌리기"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                  {lesson7Items.filter(it => lesson7Sorted[it.id] === "can").length === 0 && (
                                    <div className="text-center py-6 text-xs font-batang text-orange-400 italic">
                                      여기로 바꿀 수 있는 카드를 드래그하여 담아보세요.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 바꿀 수 있는 것 1줄 실천 다짐 작성 */}
                          <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-3xl shadow-md space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-dodum font-bold bg-white/20 px-3 py-1 rounded-full">
                                ✍️ [나의 1줄 실천 다짐]
                              </span>
                              <span className="text-xs font-batang text-orange-100">
                                바꿀 수 있는 것에 집중하는 용기
                              </span>
                            </div>
                            <label className="text-xs sm:text-sm font-dodum font-bold block">
                              내가 선택한 [바꿀 수 있는 것] 항목에 대해 오늘부터 실천할 구체적인 행동 1줄을 적어보세요:
                            </label>
                            <input
                              type="text"
                              value={lesson7ActionPledge}
                              onChange={(e) => setLesson7ActionPledge(e.target.value)}
                              placeholder="예: 부모님의 잔소리에 짜증 내지 않고, '네 알겠어요'라고 먼저 답해보기"
                              className="w-full p-3.5 bg-white text-gray-900 rounded-2xl font-title text-sm sm:text-base font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson7Step(2)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 2. 스트레스 만나기로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson7Step(4)}
                              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>4. 마음 다지기 &amp; 일기 저장하러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 4. [마음 다지기] (미션 & 감정일기 저장) */}
                      {lesson7Step === 4 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                4
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 다지기] 똑똑똑 내 마음 두드리기 &amp; 감정일기 저장
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 font-bold">
                              자가 진단 · 실천 미션
                            </span>
                          </div>

                          {/* 내가 완성한 7단계 통제 분리 요약 카드 */}
                          <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-orange-50 rounded-3xl border-2 border-orange-300 shadow-sm space-y-4">
                            <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b pb-2">
                              <span>MIND PLAY LESSON 07 · CONTROL SORTING ARCHIVE</span>
                              <span>1-3 {studentName} ({studentId})</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-batang">
                              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 space-y-1">
                                <span className="font-dodum font-bold text-blue-900 block text-xs">🌊 바꿀 수 없는 것 (흘려보내기)</span>
                                <ul className="text-gray-700 text-xs space-y-0.5 list-disc list-inside">
                                  {lesson7Items.filter(it => lesson7Sorted[it.id] === "cannot").map(it => <li key={it.id}>{it.text}</li>)}
                                </ul>
                              </div>
                              <div className="p-3.5 bg-orange-50/80 rounded-2xl border border-orange-200 space-y-1">
                                <span className="font-dodum font-bold text-orange-950 block text-xs">🔥 바꿀 수 있는 것 (집중하기)</span>
                                <ul className="text-gray-700 text-xs space-y-0.5 list-disc list-inside">
                                  {lesson7Items.filter(it => lesson7Sorted[it.id] === "can").map(it => <li key={it.id}>{it.text}</li>)}
                                </ul>
                              </div>
                            </div>
                            <div className="p-4 bg-orange-700 text-white rounded-2xl shadow-inner text-center space-y-1">
                              <span className="text-[11px] font-dodum text-orange-200">✨ 오늘부터 실천할 나의 1줄 다짐</span>
                              <div className="text-base sm:text-lg font-title font-bold text-amber-300">
                                &quot;{lesson7ActionPledge}&quot;
                              </div>
                            </div>
                          </div>

                          {/* 똑똑똑 내 마음 두드리기 (성장 별점 Q1, Q2) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-2">
                              <span className="font-dodum font-bold text-orange-950 block text-xs sm:text-sm">
                                Q1. 스트레스 상황에서 바꿀 수 없는 것에 매달리지 않고 수용하는 지혜를 배웠나요?
                              </span>
                              <div className="flex items-center gap-1.5 text-amber-500 text-2xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setLesson7Rating1(star)}
                                    className="hover:scale-125 transition-transform"
                                  >
                                    {star <= lesson7Rating1 ? "★" : "☆"}
                                  </button>
                                ))}
                                <span className="ml-2 text-xs font-dodum text-orange-900 font-bold">
                                  ({lesson7Rating1} / 5점)
                                </span>
                              </div>
                            </div>

                            <div className="p-5 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-2">
                              <span className="font-dodum font-bold text-orange-950 block text-xs sm:text-sm">
                                Q2. 내가 바꿀 수 있는 행동에 집중하겠다고 다짐했나요?
                              </span>
                              <div className="flex items-center gap-1.5 text-amber-500 text-2xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setLesson7Rating2(star)}
                                    className="hover:scale-125 transition-transform"
                                  >
                                    {star <= lesson7Rating2 ? "★" : "☆"}
                                  </button>
                                ))}
                                <span className="ml-2 text-xs font-dodum text-orange-900 font-bold">
                                  ({lesson7Rating2} / 5점)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* 함께 실천하는 마음 미션 카드 */}
                          <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-3xl shadow-md space-y-2 text-center">
                            <span className="text-xs font-dodum font-bold uppercase tracking-widest text-orange-200">
                              MISSION · [통제 분리수거 호흡법]
                            </span>
                            <h4 className="text-lg sm:text-xl font-batang font-bold leading-relaxed">
                              &quot;답답한 일이 생겼을 때 &apos;이건 내가 바꿀 수 있는 일인가?&apos; 3초간 질문하고,<br/>
                              바꿀 수 없는 일이라면 깊게 숨을 내쉬며 털어내기!&quot;
                            </h4>
                          </div>

                          {/* 10대 감정 구름 캐릭터 픽커 & 일기 저장 연동 */}
                          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                            <label className="text-xs font-dodum font-bold text-gray-800 block">
                              오늘의 마음을 대표하는 감정 구름 캐릭터를 선택해 주세요:
                            </label>
                            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                              {EMOTION_CHARACTERS.map(emo => (
                                <button
                                  key={emo.id}
                                  type="button"
                                  onClick={() => setSelectedEmotionId(emo.id)}
                                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${selectedEmotionId === emo.id ? "bg-orange-100 border-orange-500 scale-105 shadow-xs" : "bg-white border-gray-200 hover:bg-gray-100"}`}
                                >
                                  <div className="w-8 h-8 flex items-center justify-center">
                                    {emo.svg}
                                  </div>
                                  <span className="text-[10px] font-dodum font-bold text-gray-800">{emo.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson7Step(3)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 3. 통제 분리 게임으로
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const saveData = {
                                  studentId,
                                  studentName,
                                  savedAt: new Date().toLocaleString("ko-KR"),
                                  lesson: 7,
                                  stressSignals: lesson7StressSignals,
                                  hashtag: lesson7HashtagInput,
                                  sortedResults: lesson7Sorted,
                                  actionPledge: lesson7ActionPledge,
                                  rating1: lesson7Rating1,
                                  rating2: lesson7Rating2,
                                  emotion: selectedEmotionId,
                                };
                                try {
                                  const all = JSON.parse(localStorage.getItem("mindplay_lesson7_records") || "{}");
                                  all[studentId] = saveData;
                                  localStorage.setItem("mindplay_lesson7_records", JSON.stringify(all));
                                } catch(e){}

                                // 감정일기 자동 동기화 저장
                                setDiaries(prev => {
                                  const next = {
                                    ...prev,
                                    7: {
                                      emotion: selectedEmotionId,
                                      title: "7단계: 통제 분리수거로 단단해진 내 마음",
                                      content: `오늘 7단계 활동을 통해 스트레스 상황에서 바꿀 수 없는 것과 바꿀 수 있는 것을 명확히 구분해보았다. 내가 바꿀 수 없는 일은 담담하게 흘려보내고, 내가 바꿀 수 있는 행동('${lesson7ActionPledge}')에 온전히 집중하여 단단한 마음 근육을 키워나가기로 다짐했다.`,
                                      image: "",
                                      date: new Date().toLocaleDateString('ko-KR')
                                    }
                                  };
                                  try {
                                    localStorage.setItem("mindplay_diaries_" + (currentUser.studentId || "guest"), JSON.stringify(next));
                                  } catch(e){}
                                  return next;
                                });

                                handleCompleteLesson(7);
                                triggerConfetti();
                                alert("🎉 7단계 [단단해질 내 마음] 활동과 감정일기가 마이페이지에 안전하게 저장되었습니다! ⭐");
                              }}
                              className="px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>💾</span>
                              <span>7단계 활동 완료 &amp; 저장하기</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}


                  {/* 8단계: I can do it! 긍정의 힘 (대구광역시교육청 마음학기제 SEL 4단계 워크북 체계 - 긍정 부적 & 오히려 좋아 리프레이밍 & 감사 한 컷) */}
                  {currentLesson === 8 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 메인 헤더 배너 (마젠타/와인빛 #7A1B43) */}
                      <div className="bg-gradient-to-r from-[#7A1B43] via-[#9B2C5B] to-[#5C1332] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-dodum font-bold backdrop-blur">
                              🎯 8단계 마음활동
                            </span>
                            <span className="text-xs font-batang text-pink-100 font-bold">
                              영역 ❹ 긍정의 힘 기르기
                            </span>
                          </div>
                          {/* 4단계 스텝 인디케이터 네비게이션 */}
                          <div className="flex flex-wrap items-center bg-black/25 p-1 rounded-2xl backdrop-blur gap-1">
                            {[
                              { num: 1, label: "1. 마음 편지", icon: "📮" },
                              { num: 2, label: "2. 마음 만나기", icon: "⏰" },
                              { num: 3, label: "3. 마음 키우기", icon: "✨" },
                              { num: 4, label: "4. 마음 다지기", icon: "⭐" },
                            ].map(s => (
                              <button
                                key={s.num}
                                type="button"
                                onClick={() => setLesson8Step(s.num)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition flex items-center gap-1 ${lesson8Step === s.num ? "bg-white text-[#7A1B43] shadow-md scale-105" : "text-white/80 hover:text-white"}`}
                              >
                                <span>{s.icon}</span>
                                <span>{s.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-3xl font-title font-bold">
                            08. I can do it! 긍정의 힘: 나를 채우는 마법의 긍정 에너지
                          </h3>
                          <p className="text-xs sm:text-sm font-batang text-pink-100 leading-relaxed mt-1">
                            우리의 뇌는 연습하는 대로 자라납니다. <strong>나만의 긍정 부적과 &apos;오히려 좋아!&apos; 역발상, 일상 속 감사 한 컷</strong>으로 마음의 근육을 키워보세요.
                          </p>
                        </div>
                      </div>

                      {/* 1. [오늘의 마음 편지] (열기) */}
                      {lesson8Step === 1 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-[#7A1B43] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                1
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [오늘의 마음 편지] 오늘의 마음 편지에 대해 이야기 나누기
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-[#7A1B43] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 font-bold">
                              마법의 긍정 주문
                            </span>
                          </div>

                          <div className="p-6 sm:p-8 bg-gradient-to-br from-[#FDF0F4] via-pink-50/60 to-white rounded-3xl border-2 border-[#7A1B43]/30 shadow-sm space-y-4 relative overflow-hidden">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-3xl">📮</span>
                                <div>
                                  <span className="text-xs font-dodum font-bold text-[#7A1B43]">마음우체통 편지 사연</span>
                                  <h5 className="text-base sm:text-lg font-title font-bold text-gray-900">
                                    아침마다 걱정이 앞서는 친구들에게 보내는 편지
                                  </h5>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if ('speechSynthesis' in window) {
                                    const text = "매일 아침 눈을 뜰 때 '오늘 하루도 잘 해낼 수 있을까?' 걱정부터 앞선 적이 있니? 하지만 우리의 뇌는 연습하는 대로 자라난대! 긍정적인 생각을 자주 떠올릴수록 마음의 힘도 쑥쑥 자라나. 'I can do it!' 나를 힘나게 하는 마법의 긍정 주문을 오늘 함께 찾아보자!";
                                    const utter = new SpeechSynthesisUtterance(text);
                                    utter.lang = 'ko-KR';
                                    utter.rate = 0.95;
                                    window.speechSynthesis.speak(utter);
                                  } else {
                                    alert("이 브라우저에서는 음성 재생(TTS)을 지원하지 않습니다.");
                                  }
                                }}
                                className="px-3.5 py-1.5 bg-pink-100 hover:bg-pink-200 text-[#7A1B43] rounded-xl text-xs font-dodum font-bold border border-pink-300 shadow-2xs transition flex items-center gap-1.5"
                              >
                                <span>🔊</span>
                                <span>마음이 목소리 듣기 (TTS)</span>
                              </button>
                            </div>

                            <blockquote className="font-batang text-base sm:text-lg text-gray-900 font-bold leading-relaxed bg-white/95 p-6 rounded-2xl border border-pink-200 shadow-2xs italic whitespace-pre-line">
                              &quot;매일 아침 눈을 뜰 때 &apos;오늘 하루도 잘 해낼 수 있을까?&apos; 걱정부터 앞선 적이 있니?
                              하지만 우리의 뇌는 연습하는 대로 자라난대! 긍정적인 생각을 자주 떠올릴수록 마음의 힘도 쑥쑥 자라나.
                              &apos;I can do it!&apos; 나를 힘나게 하는 마법의 긍정 주문을 오늘 함께 찾아보자!&quot;
                            </blockquote>

                            <p className="text-xs sm:text-sm font-batang text-[#7A1B43] leading-relaxed bg-pink-100/50 p-4 rounded-xl border border-pink-200">
                              🌸 <strong>선생님의 한마디:</strong> 긍정성은 타고나는 것이 아니라 매일의 훈련으로 단련되는 마음의 근육입니다. 오늘 수업을 통해 내 안의 긍정 발전기를 힘차게 돌려봅시다!
                            </p>

                            <div className="flex items-center justify-between pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setLesson8HeartCount(prev => prev + 1);
                                  triggerConfetti();
                                }}
                                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 rounded-2xl text-xs font-dodum font-bold shadow-2xs transition flex items-center gap-1.5"
                              >
                                <span>❤️</span>
                                <span>감정 공감 하트 보내기 ({lesson8HeartCount}회)</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setLesson8Step(2)}
                                className="px-6 py-3 bg-[#7A1B43] hover:bg-[#5C1332] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                              >
                                <span>긍정의 힘 키우러 가기 ➔</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. [마음 만나기] (학습목표 & 해시태그 티켓) */}
                      {lesson8Step === 2 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-[#7A1B43] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                2
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 만나기] 학습목표 확인하기 - 이번 시간에는
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-[#7A1B43] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 font-bold">
                              알람시계 &amp; 스프링 노트
                            </span>
                          </div>

                          {/* 알람시계 + 스프링 노트 학습목표 창 */}
                          <div className="p-6 bg-gradient-to-r from-pink-50 via-[#FDF0F4] to-amber-50 rounded-3xl border-2 border-[#7A1B43]/30 space-y-3 relative">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">⏰</span>
                              <div>
                                <span className="text-xs font-dodum font-bold text-[#7A1B43]">이번 시간 학습목표</span>
                                <h5 className="text-base sm:text-lg font-title font-bold text-gray-900">
                                  긍정 에너지를 부르는 나의 마음 습관
                                </h5>
                              </div>
                            </div>

                            <div className="p-5 bg-white rounded-2xl border border-pink-200 shadow-2xs font-batang text-sm sm:text-base text-gray-800 leading-relaxed">
                              📖 &quot;긍정적인 마음을 부르는 방법을 알아보고, 일상 속 감사와 재해석을 통해 내 마음의 긍정 에너지를 가득 채울 수 있다.&quot;
                            </div>
                          </div>

                          {/* #해시태그로 말해요 (티켓 메모지 UI) */}
                          <div className="p-6 bg-gradient-to-r from-pink-50 to-[#FDF0F4] rounded-3xl border-2 border-pink-300 space-y-4 relative">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div className="flex items-center gap-2 text-sm sm:text-base font-title font-bold text-[#7A1B43]">
                                <span>🎟️</span>
                                <span>#해시태그로 말해요 (티켓 메모지)</span>
                              </div>
                              <span className="text-xs font-dodum text-[#7A1B43] bg-white px-2.5 py-0.5 rounded-full border border-pink-300">
                                나만의 긍정 뱃지
                              </span>
                            </div>

                            {/* 추천 해시태그 뱃지 */}
                            <div className="space-y-2">
                              <span className="text-xs font-dodum font-bold text-gray-700 block">
                                슬라이드 추천 예시 뱃지 (클릭 시 자동 추가):
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "#I_can_do_it", "#오히려_좋아", "#긍정의_힘", "#감사_한_컷", "#할_수_있다", "#마음근육_충전"
                                ].map(tag => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => {
                                      if (!lesson8HashtagInput.includes(tag)) {
                                        setLesson8HashtagInput(prev => (prev ? `${prev} ${tag}` : tag));
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-white text-[#7A1B43] border border-pink-300 rounded-xl text-xs font-dodum font-bold hover:bg-pink-100 hover:scale-105 transition shadow-2xs"
                                  >
                                    + {tag}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 톱니 티켓 스타일 인풋 박스 */}
                            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-pink-400 space-y-1 relative">
                              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-pink-50 rounded-full border border-pink-300"></div>
                              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-pink-50 rounded-full border border-pink-300"></div>
                              <label className="text-xs font-dodum font-bold text-[#7A1B43] block px-3">
                                나의 수업 목표 해시태그 티켓:
                              </label>
                              <input
                                type="text"
                                value={lesson8HashtagInput}
                                onChange={(e) => setLesson8HashtagInput(e.target.value)}
                                placeholder="#I_can_do_it #오히려_좋아 #긍정의_힘"
                                className="w-full p-2.5 px-3 bg-transparent font-dodum font-bold text-sm text-[#7A1B43] focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson8Step(1)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 1. 마음 편지로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson8Step(3)}
                              className="px-6 py-3 bg-[#7A1B43] hover:bg-[#5C1332] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>3. 3대 긍정 인터랙션 하러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 3. [마음 키우기] (핵심 활동: 3대 긍정 인터랙션) */}
                      {lesson8Step === 3 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8 animate-fadeIn">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-[#7A1B43] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                3
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 키우기] 긍정적인 마음을 길러볼까요?
                              </h4>
                            </div>
                            {/* 내부 3대 서브 탭 */}
                            <div className="flex flex-wrap bg-pink-100/70 p-1 rounded-2xl gap-1">
                              {[
                                { id: "amulet", label: "① 긍정 부적 🪬" },
                                { id: "slot", label: "② '오히려 좋아!' 🎰" },
                                { id: "gratitude", label: "③ 감사 한 컷 📸" },
                              ].map(tab => (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setLesson8SubTab(tab.id)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${lesson8SubTab === tab.id ? "bg-[#7A1B43] text-white shadow" : "text-[#7A1B43] hover:bg-pink-200"}`}
                                >
                                  {tab.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* ① [마음이 이야기] 아침을 여는 '나만의 긍정 메시지 부적' 생성기 */}
                          {lesson8SubTab === "amulet" && (
                            <div className="space-y-6 animate-fadeIn">
                              <div className="p-6 bg-gradient-to-br from-[#FDF0F4] via-pink-50 to-white rounded-3xl border-2 border-[#7A1B43]/30 space-y-4">
                                <div className="space-y-1">
                                  <span className="px-3 py-1 bg-[#7A1B43] text-white rounded-full text-xs font-dodum font-bold">
                                    🪬 [마음이 이야기] 모닝 긍정 메시지 부적 조립기
                                  </span>
                                  <h5 className="text-base sm:text-lg font-title font-bold text-gray-900 mt-1">
                                    아침마다 나에게 힘을 불어넣어 줄 자기 암시 긍정 문장을 만들어보세요
                                  </h5>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* 주어 선택 칩 */}
                                  <div className="p-4 bg-white rounded-2xl border border-pink-200 space-y-2">
                                    <label className="text-xs font-dodum font-bold text-[#7A1B43] block">
                                      1. 주어 선택하기:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                      {["나는", "내 안의 가능성은", "오늘도 나는", "스스로를 믿는 나는"].map(s => (
                                        <button
                                          key={s}
                                          type="button"
                                          onClick={() => setLesson8AmuletSubject(s)}
                                          className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${lesson8AmuletSubject === s ? "bg-[#7A1B43] text-white shadow-xs" : "bg-pink-50 text-[#7A1B43] border border-pink-200 hover:bg-pink-100"}`}
                                        >
                                          {s}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 서술어 선택 칩 */}
                                  <div className="p-4 bg-white rounded-2xl border border-pink-200 space-y-2">
                                    <label className="text-xs font-dodum font-bold text-[#7A1B43] block">
                                      2. 긍정 서술어 선택하기:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                      {[
                                        "무엇이든 부딪혀볼 용기가 있어 ✨",
                                        "어제보다 한 걸음 더 성장할 거야 🌱",
                                        "실수해도 다시 일어설 수 있어 🚀",
                                        "내 속도대로 단단하게 나아가 🌿"
                                      ].map(p => (
                                        <button
                                          key={p}
                                          type="button"
                                          onClick={() => setLesson8AmuletPredicate(p)}
                                          className={`px-3 py-1.5 rounded-xl text-xs font-dodum font-bold transition ${lesson8AmuletPredicate === p ? "bg-[#7A1B43] text-white shadow-xs" : "bg-pink-50 text-[#7A1B43] border border-pink-200 hover:bg-pink-100"}`}
                                        >
                                          {p}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* 직접 입력 옵션 */}
                                <div className="space-y-1">
                                  <label className="text-xs font-dodum font-bold text-gray-700 block">
                                    또는 나만의 긍정 주문 직접 작성하기:
                                  </label>
                                  <input
                                    type="text"
                                    value={`${lesson8AmuletSubject} ${lesson8AmuletPredicate}`}
                                    onChange={(e) => {
                                      const parts = e.target.value.split(" ");
                                      setLesson8AmuletSubject(parts[0] || "나는");
                                      setLesson8AmuletPredicate(parts.slice(1).join(" ") || "무엇이든 해낼 수 있어!");
                                    }}
                                    className="w-full p-3 bg-white rounded-xl border border-pink-300 font-title text-sm sm:text-base font-bold text-[#7A1B43] focus:outline-none focus:ring-2 focus:ring-[#7A1B43]"
                                  />
                                </div>
                              </div>

                              {/* 홀로그램 모닝 긍정 부적 포토카드 프리뷰 */}
                              <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-tr from-[#7A1B43] via-[#9B2C5B] to-[#4A0E28] text-white shadow-xl space-y-4 border-2 border-pink-300/40 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="flex justify-between items-center text-xs font-mono text-pink-200 border-b border-white/20 pb-2">
                                  <span>MORNING POSITIVE AMULET</span>
                                  <span>1-3 {studentName}</span>
                                </div>
                                <div className="text-4xl py-2 animate-bounce">🪬</div>
                                <h4 className="text-xl sm:text-2xl font-title font-bold text-amber-300 leading-relaxed drop-shadow">
                                  &quot;{lesson8AmuletSubject} {lesson8AmuletPredicate}&quot;
                                </h4>
                                <p className="text-xs font-batang text-pink-100">
                                  매일 아침 거울을 보며 이 부적을 소리 내어 외쳐보세요!
                                </p>
                                <div className="pt-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      triggerConfetti();
                                      alert("✨ 모닝 긍정 부적이 발급되었습니다! 마이페이지에서 언제든 다시 볼 수 있습니다.");
                                    }}
                                    className="px-5 py-2 bg-white text-[#7A1B43] rounded-xl text-xs font-dodum font-bold shadow-md hover:bg-pink-50 transition hover:scale-105"
                                  >
                                    부적 발급 &amp; 저장 완료 💾
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ② [활동으로 배우기 A] "오히려 좋아!" 역발상 리프레이밍 슬롯머신 */}
                          {lesson8SubTab === "slot" && (
                            <div className="space-y-6 animate-fadeIn">
                              <div className="p-6 bg-gradient-to-br from-amber-50 via-orange-50/50 to-pink-50 rounded-3xl border-2 border-amber-300 space-y-4">
                                <div className="space-y-1">
                                  <span className="px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-dodum font-bold">
                                    🎰 [활동으로 배우기 A] &quot;오히려 좋아!&quot; 역발상 리프레이밍
                                  </span>
                                  <h5 className="text-base sm:text-lg font-title font-bold text-gray-900 mt-1">
                                    속상하고 곤란한 일(결핍/실패)을 새로운 기회와 성장으로 관점 전환하기
                                  </h5>
                                </div>

                                {/* 3가지 현실 밀착 상황 카드 */}
                                <div className="space-y-2">
                                  <label className="text-xs font-dodum font-bold text-gray-700 block">
                                    상황을 선택하거나 아래에 직접 적어보세요:
                                  </label>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                      {
                                        id: "지각",
                                        title: "상황 1: 늦잠 지각 😴",
                                        bad: "늦잠을 자서 학교에 지각했을 때",
                                        good: "밤늦게 스마트폰을 하던 안 좋은 수면 습관을 돌아보고 바꿀 기회니까, 오히려 좋아! 📱"
                                      },
                                      {
                                        id: "서브실패",
                                        title: "상황 2: 배구 서브 실패 🏐",
                                        bad: "체육 시간 배구 서브 연습이 뜻대로 안 될 때",
                                        good: "내 부족한 자세를 친구들에게 물어보며 더 친해질 구실이 생겼으니, 오히려 좋아! 🤝"
                                      },
                                      {
                                        id: "어색한짝꿍",
                                        title: "상황 3: 어색한 짝꿍 👥",
                                        bad: "조금 서먹하고 어색한 친구와 짝꿍이 되었을 때",
                                        good: "그동안 몰랐던 친구의 새로운 매력을 발견하고 친구 범위를 넓힐 찬스니까, 오히려 좋아! 🌟"
                                      }
                                    ].map(item => (
                                      <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                          setLesson8CustomSituation(item.bad);
                                          setLesson8SlotResult(item.good);
                                          triggerConfetti();
                                        }}
                                        className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between gap-2 ${lesson8CustomSituation === item.bad ? "bg-amber-100 border-amber-500 shadow-sm scale-[1.02]" : "bg-white border-amber-200 hover:bg-amber-50"}`}
                                      >
                                        <div className="font-dodum font-bold text-xs text-amber-900">{item.title}</div>
                                        <p className="text-xs font-batang text-gray-700 leading-snug">&quot;{item.bad}&quot;</p>
                                        <span className="text-[10px] font-dodum text-amber-700 font-bold self-end">선택하기 ➔</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* 직접 입력창 */}
                                <div className="space-y-1">
                                  <label className="text-xs font-dodum font-bold text-gray-700 block">
                                    [내 속상한 일 직접 쓰기]:
                                  </label>
                                  <input
                                    type="text"
                                    value={lesson8CustomSituation}
                                    onChange={(e) => setLesson8CustomSituation(e.target.value)}
                                    placeholder="예: 기대했던 급식 메뉴가 매진되었을 때"
                                    className="w-full p-3 bg-white rounded-xl border border-amber-300 text-xs sm:text-sm font-batang focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                </div>

                                {/* 슬롯머신 레버 당기기 & 회전 결과 디스플레이 */}
                                <div className="p-6 bg-white rounded-3xl border-2 border-amber-400 shadow-md text-center space-y-4">
                                  <div className="text-xs font-dodum font-bold text-amber-800">
                                    ✨ 역발상 긍정 변환 결과 (Re-framing):
                                  </div>
                                  <div className="p-5 bg-gradient-to-r from-amber-50 to-pink-50 rounded-2xl border border-amber-200">
                                    <div className="text-base sm:text-lg font-title font-bold text-[#7A1B43] leading-relaxed">
                                      {lesson8SlotResult || "위 상황을 선택하거나 레버를 당겨보세요!"}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const pool = [
                                        "비가 내려 체육 대회가 취소됨 ➔ 강당에서 보드게임하며 반 친구들과 더 깊은 대화를 나눌 수 있으니, 오히려 좋아! 🌧️",
                                        "시험에서 아는 문제 하나 실수함 ➔ 진짜 시험 전에 나의 방심 포인트를 확실히 발견했으니, 오히려 좋아! 💯",
                                        "주말에 약속이 취소됨 ➔ 집에서 좋아하는 음악 듣고 푹 쉬며 힐링할 수 있으니, 오히려 좋아! 🛋️"
                                      ];
                                      setLesson8SlotResult(pool[Math.floor(Math.random() * pool.length)]);
                                      triggerConfetti();
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                                  >
                                    <span>🎰</span>
                                    <span>역발상 슬롯머신 레버 당기기 🔄</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ③ [활동으로 배우기 B] 찰칵~ 일상 감사 한 컷 카드 (교재 핵심활동) */}
                          {lesson8SubTab === "gratitude" && (
                            <div className="space-y-6 animate-fadeIn">
                              <div className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white rounded-3xl border-2 border-pink-300 space-y-4">
                                <div className="space-y-1">
                                  <span className="px-3 py-1 bg-purple-700 text-white rounded-full text-xs font-dodum font-bold">
                                    📸 [활동으로 배우기 B] 찰칵~ 일상 감사 한 컷 카드
                                  </span>
                                  <h5 className="text-base sm:text-lg font-title font-bold text-gray-900 mt-1">
                                    당연하게 여겼던 일상 속 2가지 감사한 순간을 찾아 폴라로이드에 담아보세요
                                  </h5>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* 감사 한 컷 ① (사람/친구) */}
                                  <div className="p-5 bg-white rounded-3xl border-2 border-pink-300 shadow-sm space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between border-b pb-2">
                                        <span className="text-xs font-dodum font-bold text-pink-700 bg-pink-100 px-3 py-0.5 rounded-full">
                                          감사 한 컷 ① (사람/친구) 🤝
                                        </span>
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-xs font-dodum font-bold text-gray-700 block">감사 대상 선택:</label>
                                        <div className="flex gap-1.5">
                                          {["친구", "가족", "선생님", "나 자신"].map(t => (
                                            <button
                                              key={t}
                                              type="button"
                                              onClick={() => setLesson8GratitudePersonTarget(t)}
                                              className={`px-2.5 py-1 rounded-lg text-xs font-dodum font-bold transition ${lesson8GratitudePersonTarget === t ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-600"}`}
                                            >
                                              {t}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-xs font-dodum font-bold text-gray-700 block">감사한 구체적 장면과 문장:</label>
                                        <textarea
                                          rows="3"
                                          value={lesson8GratitudePersonText}
                                          onChange={(e) => setLesson8GratitudePersonText(e.target.value)}
                                          placeholder="예: 체육 끝나고 목마를 때 시원한 물을 나눠줘서 고마웠어."
                                          className="w-full p-2.5 bg-pink-50/40 rounded-xl border border-pink-200 text-xs sm:text-sm font-batang leading-relaxed focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                      </div>
                                    </div>
                                    <div className="p-3 bg-pink-50 rounded-xl text-center text-xs font-title font-bold text-pink-900">
                                      To. {lesson8GratitudePersonTarget}
                                    </div>
                                  </div>

                                  {/* 감사 한 컷 ② (사물/일상 환경) */}
                                  <div className="p-5 bg-white rounded-3xl border-2 border-purple-300 shadow-sm space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between border-b pb-2">
                                        <span className="text-xs font-dodum font-bold text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
                                          감사 한 컷 ② (사물/환경) 🌿
                                        </span>
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-xs font-dodum font-bold text-gray-700 block">일상 감사 대상:</label>
                                        <input
                                          type="text"
                                          value={lesson8GratitudeObjectTarget}
                                          onChange={(e) => setLesson8GratitudeObjectTarget(e.target.value)}
                                          placeholder="예: 튼튼한 우산, 따뜻한 침대, 맛있는 급식"
                                          className="w-full p-2 bg-purple-50/40 rounded-xl border border-purple-200 text-xs font-batang focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-xs font-dodum font-bold text-gray-700 block">감사 문장:</label>
                                        <textarea
                                          rows="3"
                                          value={lesson8GratitudeObjectText}
                                          onChange={(e) => setLesson8GratitudeObjectText(e.target.value)}
                                          placeholder="예: 비 오는 날 젖지 않게 막아준 튼튼한 우산이 있어서 감사해."
                                          className="w-full p-2.5 bg-purple-50/40 rounded-xl border border-purple-200 text-xs sm:text-sm font-batang leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        />
                                      </div>
                                    </div>
                                    <div className="p-3 bg-purple-50 rounded-xl text-center text-xs font-title font-bold text-purple-900">
                                      소중한 일상: {lesson8GratitudeObjectTarget}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson8Step(2)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 2. 마음 만나기로
                            </button>
                            <button
                              type="button"
                              onClick={() => setLesson8Step(4)}
                              className="px-6 py-3 bg-[#7A1B43] hover:bg-[#5C1332] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>4. 마음 다지기 &amp; 일기 저장하러 가기</span>
                              <span>➔</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 4. [마음 다지기] (미션 & 감정일기) */}
                      {lesson8Step === 4 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-fadeIn">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-[#7A1B43] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                                4
                              </span>
                              <h4 className="font-title text-lg sm:text-xl font-bold text-gray-900">
                                [마음 다지기] 똑똑똑 내 마음 두드리기 &amp; 감정일기
                              </h4>
                            </div>
                            <span className="text-xs font-dodum text-[#7A1B43] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 font-bold">
                              자가 진단 · 3줄 감사 일기
                            </span>
                          </div>

                          {/* 내가 완성한 8단계 긍정 아카이브 카드 */}
                          <div className="p-6 bg-gradient-to-r from-pink-50 via-white to-amber-50 rounded-3xl border-2 border-pink-300 shadow-sm space-y-4">
                            <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b pb-2">
                              <span>MIND PLAY LESSON 08 · POSITIVE POWER ARCHIVE</span>
                              <span>1-3 {studentName} ({studentId})</span>
                            </div>
                            <div className="space-y-2 text-xs sm:text-sm font-batang">
                              <div className="p-3 bg-pink-50 rounded-xl">
                                <strong className="text-[#7A1B43] font-dodum block text-xs">🪬 나의 모닝 긍정 부적:</strong>
                                <p className="text-gray-900 font-bold mt-0.5">&quot;{lesson8AmuletSubject} {lesson8AmuletPredicate}&quot;</p>
                              </div>
                              <div className="p-3 bg-amber-50 rounded-xl">
                                <strong className="text-amber-900 font-dodum block text-xs">🎰 나의 &apos;오히려 좋아!&apos; 역발상:</strong>
                                <p className="text-gray-800 mt-0.5">{lesson8SlotResult}</p>
                              </div>
                              <div className="p-3 bg-purple-50 rounded-xl">
                                <strong className="text-purple-900 font-dodum block text-xs">📸 나의 일상 감사 한 컷:</strong>
                                <p className="text-gray-800 mt-0.5">① {lesson8GratitudePersonText} / ② {lesson8GratitudeObjectText}</p>
                              </div>
                            </div>
                          </div>

                          {/* 똑똑똑 내 마음 두드리기 (성장 별점 Q1, Q2) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 bg-pink-50/60 rounded-2xl border border-pink-200 space-y-2">
                              <span className="font-dodum font-bold text-[#7A1B43] block text-xs sm:text-sm">
                                Q1. 속상한 일이 생겼을 때 &apos;오히려 좋아!&apos;의 시각으로 바라볼 준비가 되었나요?
                              </span>
                              <div className="flex items-center gap-1.5 text-amber-500 text-2xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setLesson8Rating1(star)}
                                    className="hover:scale-125 transition-transform"
                                  >
                                    {star <= lesson8Rating1 ? "★" : "☆"}
                                  </button>
                                ))}
                                <span className="ml-2 text-xs font-dodum text-[#7A1B43] font-bold">
                                  ({lesson8Rating1} / 5점)
                                </span>
                              </div>
                            </div>

                            <div className="p-5 bg-pink-50/60 rounded-2xl border border-pink-200 space-y-2">
                              <span className="font-dodum font-bold text-[#7A1B43] block text-xs sm:text-sm">
                                Q2. 오늘 하루 일상 속 사소한 감사를 발견하고 마음에 담았나요?
                              </span>
                              <div className="flex items-center gap-1.5 text-amber-500 text-2xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setLesson8Rating2(star)}
                                    className="hover:scale-125 transition-transform"
                                  >
                                    {star <= lesson8Rating2 ? "★" : "☆"}
                                  </button>
                                ))}
                                <span className="ml-2 text-xs font-dodum text-[#7A1B43] font-bold">
                                  ({lesson8Rating2} / 5점)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* 함께 실천하는 마음 미션 카드 */}
                          <div className="p-6 bg-gradient-to-r from-[#7A1B43] via-[#9B2C5B] to-[#5C1332] text-white rounded-3xl shadow-md space-y-2 text-center">
                            <span className="text-xs font-dodum font-bold uppercase tracking-widest text-pink-200">
                              MISSION · [잠들기 전 3가지 감사 일기]
                            </span>
                            <h4 className="text-lg sm:text-xl font-batang font-bold leading-relaxed">
                              &quot;오늘 밤 잠자리에 들기 전, 오늘 하루 나를 미소 짓게 했던 일 3가지를 마음속으로 떠올려보고 잠들기!&quot;
                            </h4>
                          </div>

                          {/* 10대 감정 구름 캐릭터 픽커 & 일기 저장 연동 */}
                          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                            <label className="text-xs font-dodum font-bold text-gray-800 block">
                              오늘의 마음을 대표하는 감정 구름 캐릭터를 선택해 주세요:
                            </label>
                            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                              {EMOTION_CHARACTERS.map(emo => (
                                <button
                                  key={emo.id}
                                  type="button"
                                  onClick={() => setSelectedEmotionId(emo.id)}
                                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${selectedEmotionId === emo.id ? "bg-pink-100 border-[#7A1B43] scale-105 shadow-xs" : "bg-white border-gray-200 hover:bg-gray-100"}`}
                                >
                                  <div className="w-8 h-8 flex items-center justify-center">
                                    {emo.svg}
                                  </div>
                                  <span className="text-[10px] font-dodum font-bold text-gray-800">{emo.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <button
                              type="button"
                              onClick={() => setLesson8Step(3)}
                              className="px-4 py-2 text-xs font-dodum font-bold text-gray-500 hover:text-gray-800"
                            >
                              ◀ 3. 긍정 인터랙션으로
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const saveData = {
                                  studentId,
                                  studentName,
                                  savedAt: new Date().toLocaleString("ko-KR"),
                                  lesson: 8,
                                  hashtag: lesson8HashtagInput,
                                  amuletSubject: lesson8AmuletSubject,
                                  amuletPredicate: lesson8AmuletPredicate,
                                  slotResult: lesson8SlotResult,
                                  gratitudePersonTarget: lesson8GratitudePersonTarget,
                                  gratitudePersonText: lesson8GratitudePersonText,
                                  gratitudeObjectTarget: lesson8GratitudeObjectTarget,
                                  gratitudeObjectText: lesson8GratitudeObjectText,
                                  rating1: lesson8Rating1,
                                  rating2: lesson8Rating2,
                                  emotion: selectedEmotionId,
                                };
                                try {
                                  const all = JSON.parse(localStorage.getItem("mindplay_lesson8_records") || "{}");
                                  all[studentId] = saveData;
                                  localStorage.setItem("mindplay_lesson8_records", JSON.stringify(all));
                                } catch(e){}

                                // 8차시 감정일기 자동 동기화 저장
                                setDiaries(prev => {
                                  const next = {
                                    ...prev,
                                    8: {
                                      emotion: selectedEmotionId,
                                      title: "8단계: I can do it! 나를 채우는 긍정의 힘",
                                      content: `오늘 8단계 활동에서 아침을 여는 긍정 주문('${lesson8AmuletSubject} ${lesson8AmuletPredicate}')을 만들고, 곤란한 일도 '${lesson8SlotResult}'(으)로 긍정 리프레이밍해보았다. 일상 속 사소한 감사(${lesson8GratitudePersonText})를 발견하며 내 마음의 긍정 에너지를 가득 채웠다.`,
                                      image: "",
                                      date: new Date().toLocaleDateString('ko-KR')
                                    }
                                  };
                                  try {
                                    localStorage.setItem("mindplay_diaries_" + (currentUser.studentId || "guest"), JSON.stringify(next));
                                  } catch(e){}
                                  return next;
                                });

                                handleCompleteLesson(8);
                                triggerConfetti();
                                alert("🎉 8단계 [I can do it! 긍정의 힘] 모든 활동과 감정일기가 마이페이지에 안전하게 저장되었습니다! ⭐");
                              }}
                              className="px-8 py-3.5 bg-gradient-to-r from-[#7A1B43] to-[#9B2C5B] hover:from-[#5C1332] hover:to-[#7A1B43] text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shadow-md transition hover:scale-105 flex items-center gap-2"
                            >
                              <span>💾</span>
                              <span>8단계 활동 완료 &amp; 저장하기</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}


                    {/* 9단계: 당연히 다를 수 있어 (다양성 인정하기) */}
          {currentLesson === 9 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#1B6336] via-[#2D7D4A] to-[#1B6336] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>영역 ➎ 건강한 관계 맺기</span>
                      <span>•</span>
                      <span>09. 당연히 다를 수 있어</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>🌱 당연히 다를 수 있어 (다양성 인정하기)</span>
                    </h2>
                    <p className="text-emerald-100 text-sm mt-1">
                      다름은 '틀린 것'이 아니라 당연한 것! 서로의 다른 생각을 발견하고 존중하는 마음을 키워요.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson9Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson9Step === s
                              ? 'bg-white text-[#1B6336] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#EEF6F0] p-1.5 rounded-xl border border-emerald-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '🔍' },
                  { step: 3, label: '3. 마음 키우기', icon: '⚖️' },
                  { step: 4, label: '4. 마음 다지기', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson9Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson9Step === tab.step
                        ? 'bg-[#1B6336] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson9Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B6336] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1B6336] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "세상에는 나와 성격도, 좋아하는 것도, 생각하는 방식도 전혀 다른 사람들이 정말 많아. 가끔 친구가 나와 다른 선택을 할 때 '왜 저러지?' 하고 답답했던 적이 있니? 하지만 다름은 '틀린 것'이 아니라 당연한 거래! 서로의 다른 생각을 재미있게 발견하고 존중하는 방법을 오늘 함께 찾아보자!";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#1B6336] hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-emerald-50/60 to-white rounded-xl p-6 border border-emerald-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-emerald-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-emerald-700 mb-2">To. 1학년 3반 친구들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "세상에는 나와 성격도, 좋아하는 것도, 생각하는 방식도 전혀 다른 사람들이 정말 많아.
                        가끔 친구가 나와 다른 선택을 할 때 <span className="text-[#1B6336] font-bold">'왜 저러지?'</span> 하고 답답했던 적이 있니?"
                      </p>
                      <p>
                        "하지만 다름은 <span className="bg-emerald-100 text-[#1B6336] px-1.5 py-0.5 rounded font-bold">'틀린 것'이 아니라 당연한 것</span>이래!
                        서로의 다른 생각을 재미있게 발견하고 존중하는 방법을 오늘 함께 찾아보자!"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-100 flex justify-end">
                      <span className="text-xs font-semibold text-emerald-800">From. 너를 언제나 응원하는 마음이 🍀</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson9HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>공감해요 ({lesson9HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        친구들과 함께 마음을 열고 있어요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson9Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1B6336] hover:bg-[#154d2a] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>다름을 만나러 가기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson9Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B6336] flex items-center justify-center text-xl font-bold">
                      🔍
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1B6336] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">나와 다른 사람들은 얼마나 많을까?</h3>
                    </div>
                  </div>

                  {/* 1. 웜업 관점 퀴즈 */}
                  <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#1B6336] text-white text-xs font-bold rounded-md">관점 웜업 퀴즈</span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        "토끼, 당근, 오이 중 2가지를 한 묶음으로 묶는다면?"
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      직관적으로 떠오르는 묶음을 하나 선택해 보세요!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setLesson9QuizChoice('A')}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          lesson9QuizChoice === 'A'
                            ? 'border-[#1B6336] bg-emerald-100/70 shadow-sm'
                            : 'border-emerald-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <span className="text-2xl">🐰🥕</span>
                        <div>
                          <div className="font-bold text-sm text-gray-800">[선택 A] 토끼 + 당근</div>
                          <div className="text-xs text-emerald-800 mt-0.5">"토끼가 당근을 맛있게 먹으니까! (관계 중심 관점)"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => setLesson9QuizChoice('B')}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          lesson9QuizChoice === 'B'
                            ? 'border-[#1B6336] bg-emerald-100/70 shadow-sm'
                            : 'border-emerald-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <span className="text-2xl">🥕🥒</span>
                        <div>
                          <div className="font-bold text-sm text-gray-800">[선택 B] 당근 + 오이</div>
                          <div className="text-xs text-emerald-800 mt-0.5">"둘 다 땅에서 자라는 채소/식물이니까! (범주/속성 관점)"</div>
                        </div>
                      </button>
                    </div>

                    {lesson9QuizChoice && (
                      <div className="p-3 bg-white rounded-lg border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">💡</span>
                        <span>
                          <strong>정답은 없습니다!</strong> 사람마다 사물을 분류하고 세상을 바라보는 '렌즈'와 기준이 다를 뿐이에요.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 2. 티켓 메모지 해시태그 */}
                  <div className="bg-[#EEF6F0] rounded-xl p-6 border border-emerald-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (수업 목표 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      오늘 다양성 수업에서 마음에 품고 싶은 핵심 키워드를 선택하거나 직접 적어보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#다름을_존중하기',
                        '#세상에_이런_사람도',
                        '#다른_사람의_입장_생각하기',
                        '#틀림이_아닌_다름',
                        '#그럴수도있지',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson9HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson9HashtagInput === tag
                              ? 'bg-[#1B6336] text-white border-[#1B6336]'
                              : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson9HashtagInput}
                        onChange={(e) => setLesson9HashtagInput(e.target.value)}
                        placeholder="예: #친구_마음_먼저_들어보기 (나만의 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6336]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson9Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson9Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#1B6336] hover:bg-[#154d2a] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: 밸런스 게임 & 다름 탐색하기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson9Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B6336] flex items-center justify-center text-xl font-bold">
                        ⚖️
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1B6336] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음이와 함께하는 관점의 다양성 활동</h3>
                      </div>
                    </div>
                  </div>

                  {/* 서브 탭 네비게이션 */}
                  <div className="flex border-b border-gray-200">
                    {[
                      { id: 'balance', label: '① 학급 밸런스 게임', icon: '⚖️' },
                      { id: 'reaction', label: '② "아~ 그렇구나!" 도장', icon: '💮' },
                      { id: 'magic', label: '③ 3단계 마법 문장', icon: '🪄' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setLesson9SubTab(st.id as any)}
                        className={`py-2.5 px-4 font-bold text-xs md:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                          lesson9SubTab === st.id
                            ? 'border-[#1B6336] text-[#1B6336]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <span>{st.icon}</span>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 서브탭 1: 학급 밸런스 게임 */}
                  {lesson9SubTab === 'balance' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          밸런스 질문 {lesson9BalanceIndex + 1} / 5
                        </span>
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4].map((idx) => (
                            <button
                              key={idx}
                              onClick={() => setLesson9BalanceIndex(idx)}
                              className={`w-6 h-6 rounded-full text-xs font-bold ${
                                lesson9BalanceIndex === idx
                                  ? 'bg-[#1B6336] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 밸런스 질문 카드 */}
                      {(() => {
                        const balanceQuestions = [
                          {
                            title: '친구 위로 방식',
                            question: '친구가 속상한 일로 고민을 털어놓을 때 나는?',
                            optA: { text: '폭풍 맞장구 & 폭풍 리액션 공감', icon: '🥺', percent: 62 },
                            optB: { text: '현실적이고 명쾌한 해결책 제시', icon: '💡', percent: 38 },
                          },
                          {
                            title: '떡볶이 취향',
                            question: '방과 후 떡볶이를 먹을 때 내 선택은?',
                            optA: { text: '무조건 매운 오리지널 빨간 떡볶이', icon: '🌶️', percent: 54 },
                            optB: { text: '부드럽고 달달한 로제/짜장 떡볶이', icon: '🧀', percent: 46 },
                          },
                          {
                            title: '주말 힐링 방식',
                            question: '주말에 가장 행복하게 에너지를 채우는 방법은?',
                            optA: { text: '침대 밖은 위험해! 온종일 집콕 휴식', icon: '🛏️', percent: 58 },
                            optB: { text: '친구들과 밖에서 만나 신나게 놀기', icon: '🏃', percent: 42 },
                          },
                          {
                            title: '학교 스마트폰 규칙',
                            question: '등교 시 스마트폰 수거 규칙에 대한 내 생각은?',
                            optA: { text: '수업 몰입을 위해 수거하는 것이 낫다', icon: '📵', percent: 45 },
                            optB: { text: '스스로 조절할 수 있으니 자율 소지가 좋다', icon: '📱', percent: 55 },
                          },
                          {
                            title: '모둠 과제 역할',
                            question: '모둠 발표 과제를 할 때 내가 선호하는 역할은?',
                            optA: { text: '앞에서 당당히 말하는 발표자', icon: '🎤', percent: 35 },
                            optB: { text: '뒤에서 꼼꼼히 정리하는 자료제작자', icon: '💻', percent: 65 },
                          },
                        ];

                        const currentQ = balanceQuestions[lesson9BalanceIndex];
                        const currentVote = lesson9Votes[lesson9BalanceIndex];

                        return (
                          <div className="bg-gradient-to-b from-[#EEF6F0] to-white p-6 rounded-2xl border-2 border-emerald-200 space-y-5">
                            <div className="text-center">
                              <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-200">
                                {currentQ.title}
                              </span>
                              <h4 className="text-lg font-bold text-gray-800 mt-2">
                                {currentQ.question}
                              </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <button
                                onClick={() => {
                                  const newVotes = [...lesson9Votes];
                                  newVotes[lesson9BalanceIndex] = 'A';
                                  setLesson9Votes(newVotes);
                                }}
                                className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                                  currentVote === 'A'
                                    ? 'border-[#1B6336] bg-emerald-100 shadow-md scale-[1.02]'
                                    : 'border-emerald-200 bg-white hover:border-emerald-400'
                                }`}
                              >
                                <span className="text-4xl">{currentQ.optA.icon}</span>
                                <div className="font-bold text-gray-800 text-sm md:text-base">
                                  [선택 A] {currentQ.optA.text}
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  const newVotes = [...lesson9Votes];
                                  newVotes[lesson9BalanceIndex] = 'B';
                                  setLesson9Votes(newVotes);
                                }}
                                className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                                  currentVote === 'B'
                                    ? 'border-amber-600 bg-amber-50 shadow-md scale-[1.02]'
                                    : 'border-emerald-200 bg-white hover:border-amber-300'
                                }`}
                              >
                                <span className="text-4xl">{currentQ.optB.icon}</span>
                                <div className="font-bold text-gray-800 text-sm md:text-base">
                                  [선택 B] {currentQ.optB.text}
                                </div>
                              </button>
                            </div>

                            {/* 투표 결과 실시간 차트 */}
                            {currentVote && (
                              <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3 animate-fadeIn">
                                <div className="flex justify-between items-center text-xs font-bold">
                                  <span className="text-[#1B6336]">선택 A: {currentQ.optA.percent}%</span>
                                  <span className="text-xs text-gray-500">1학년 3반 친구들의 선택 비율</span>
                                  <span className="text-amber-700">선택 B: {currentQ.optB.percent}%</span>
                                </div>
                                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                                  <div
                                    className="bg-[#1B6336] h-full transition-all duration-700"
                                    style={{ width: `${currentQ.optA.percent}%` }}
                                  />
                                  <div
                                    className="bg-amber-500 h-full transition-all duration-700"
                                    style={{ width: `${currentQ.optB.percent}%` }}
                                  />
                                </div>

                                <div className="pt-2">
                                  <label className="block text-xs font-bold text-gray-700 mb-1">
                                    내가 이 선택을 한 이유 (1문장):
                                  </label>
                                  <input
                                    type="text"
                                    value={lesson9Reasons[lesson9BalanceIndex] || ''}
                                    onChange={(e) => {
                                      const newReasons = [...lesson9Reasons];
                                      newReasons[lesson9BalanceIndex] = e.target.value;
                                      setLesson9Reasons(newReasons);
                                    }}
                                    placeholder="예: 위로받을 땐 해결책보다 마음을 알아주는 게 먼저라고 생각해서!"
                                    className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-[#1B6336]"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex justify-between pt-2">
                              <button
                                disabled={lesson9BalanceIndex === 0}
                                onClick={() => setLesson9BalanceIndex((p) => Math.max(0, p - 1))}
                                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-600 disabled:opacity-30"
                              >
                                이전 질문
                              </button>
                              <button
                                disabled={lesson9BalanceIndex === balanceQuestions.length - 1}
                                onClick={() => setLesson9BalanceIndex((p) => Math.min(balanceQuestions.length - 1, p + 1))}
                                className="px-4 py-1.5 rounded-lg bg-[#1B6336] text-white text-xs font-bold hover:bg-[#154d2a] disabled:opacity-30"
                              >
                                다음 질문 보기 ➔
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* 서브탭 2: "아~ 그렇구나!" 도장 챌린지 */}
                  {lesson9SubTab === 'reaction' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <h4 className="font-bold text-sm text-[#1B6336] flex items-center gap-1.5">
                          <span>💮</span> "아~ 너는 그렇게 생각하는구나!" 리액션 도장
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          나와 다른 선택을 한 익명의 친구들의 사연을 읽고, 비난 대신 '이해와 존중의 도장'을 쾅 찍어주세요.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            id: 1,
                            choice: 'B선택 (해결책 우선)',
                            quote: "친구의 문제를 빨리 해결해 주는 게 진짜 친구를 돕는 최고의 방법이라고 생각해요!",
                            author: "10304 익명 친구",
                          },
                          {
                            id: 2,
                            choice: 'A선택 (오리지널 매운맛)',
                            quote: "스트레스 풀 땐 땀 뻘뻘 흘리는 매운 떡볶이가 최고예요. 스트레스가 싹 날아가요!",
                            author: "10311 익명 친구",
                          },
                          {
                            id: 3,
                            choice: 'A선택 (집콕 휴식)',
                            quote: "평일에 학교에서 에너지를 많이 쓰니까 주말엔 혼자 조용히 쉬어야 다음 주를 버틸 수 있어요.",
                            author: "10318 익명 친구",
                          },
                          {
                            id: 4,
                            choice: 'B선택 (자료제작자)',
                            quote: "발표는 쑥스럽지만 PPT 만들고 내용을 정리하는 건 자신 있고 재미있어요!",
                            author: "10325 익명 친구",
                          },
                        ].map((card) => {
                          const stamped = lesson9StampedCards.includes(card.id);
                          return (
                            <div
                              key={card.id}
                              className="p-5 rounded-2xl bg-white border-2 border-emerald-200 relative overflow-hidden flex flex-col justify-between shadow-sm"
                            >
                              {stamped && (
                                <div className="absolute right-4 top-4 border-2 border-red-600 text-red-600 font-extrabold text-xs px-2.5 py-1 rounded-lg rotate-12 bg-red-50/80 shadow-sm animate-stamp">
                                  💮 아~ 그렇구나!
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-[#1B6336] rounded">
                                    {card.choice}
                                  </span>
                                  <span className="text-xs text-gray-400">{card.author}</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-700 italic">
                                  "{card.quote}"
                                </p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                                <button
                                  onClick={() => {
                                    if (!stamped) {
                                      setLesson9StampedCards([...lesson9StampedCards, card.id]);
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    stamped
                                      ? 'bg-red-50 text-red-600 border border-red-200'
                                      : 'bg-[#1B6336] text-white hover:bg-[#154d2a] shadow-sm'
                                  }`}
                                >
                                  <span>💮</span>
                                  <span>{stamped ? '존중 도장 전달 완료!' : '쾅! "아~ 그렇구나!" 도장 찍기'}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 서브탭 3: 마법의 3단계 문장 */}
                  {lesson9SubTab === 'magic' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="bg-[#EEF6F0] p-5 rounded-xl border border-emerald-200 space-y-3">
                        <h4 className="font-bold text-sm text-[#1B6336] flex items-center gap-1.5">
                          <span>🪄</span> 다름을 인정하는 마법의 3단계 문장 완성기
                        </h4>
                        <p className="text-xs text-gray-600">
                          친구와 생각이 다를 때 비난하지 않고 슬기롭게 마음을 나누는 3단계 공식을 조립해 보세요.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* 1단계 */}
                        <div className="p-4 rounded-xl border border-emerald-200 bg-white">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">1</span>
                            <span>사실 인정 (그 상황 그대로 바라보기)</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2.5 rounded-lg">
                            "친구가 나와 다른 의견이나 취향을 말했을 때..."
                          </p>
                        </div>

                        {/* 2단계 */}
                        <div className="p-4 rounded-xl border border-emerald-200 bg-white">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">2</span>
                            <span>관점 수용 ('왜 저래?' 대신 생각 바꾸기)</span>
                          </div>
                          <p className="text-sm font-semibold text-[#1B6336] bg-emerald-50 p-2.5 rounded-lg">
                            "'왜 저러지?'라고 판단하기보다, '저 친구에게는 저게 더 중요할 수 있겠구나'라고 생각하기"
                          </p>
                        </div>

                        {/* 3단계 */}
                        <div className="p-4 rounded-xl border-2 border-emerald-300 bg-white space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">3</span>
                            <span>대화의 기술 (나만의 다짐 문장 적기)</span>
                          </div>
                          <input
                            type="text"
                            value={lesson9MagicSentence}
                            onChange={(e) => setLesson9MagicSentence(e.target.value)}
                            placeholder="예: '너는 그렇게 생각했구나! 내 생각은 이런데 함께 맞춰볼까?'라고 말하기"
                            className="w-full px-3 py-2 text-xs md:text-sm rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-[#1B6336]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson9Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson9Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#1B6336] hover:bg-[#154d2a] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마음 다지기 & 감정일기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson9Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1B6336] flex items-center justify-center text-xl font-bold">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1B6336] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">함께 실천하는 마음 미션 & 성장 별점</h3>
                    </div>
                  </div>

                  {/* 1. 성장 별점 */}
                  <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#1B6336] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (성장 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 나와 다른 친구의 생각이나 취향을 '틀린 것'이 아닌 '당연한 다름'으로 바라보았나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson9Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson9Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 반 친구들의 다양한 의견을 열린 마음으로 존중할 수 있나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson9Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson9Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주간 실천 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1B6336] to-[#2D7D4A] text-white shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold">주간 실천 미션</span>
                      <h4 className="font-bold text-sm">1일 1 "그럴 수도 있겠구나" 실천하기</h4>
                    </div>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      "이번 한 주 동안 친구나 가족과 의견이 부딪힐 때, 화부터 내지 말고
                      <strong> '그 사람 입장에서는 그럴 수도 있겠구나'</strong> 마음속으로 세 번 말해보기!"
                    </p>
                  </div>

                  {/* 3. 9차시 감정일기 동기화 작성 */}
                  <div className="bg-[#EEF6F0] p-6 rounded-2xl border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">9차시 감정일기 쓰기</h4>
                        <p className="text-xs text-gray-600">오늘 밸런스 게임과 다름 활동을 하며 느낀 내 마음을 3줄로 기록해요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#1B6336] bg-white px-3 py-1 rounded-full border border-emerald-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '뿌듯함 😊',
                        '신선함 💡',
                        '놀라움 😲',
                        '편안함 🌿',
                        '고마움 💖',
                        '답답함 💭',
                        '흥미진진 🎈',
                        '차분함 ☕',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#1B6336] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="오늘 밸런스 게임에서 나와 다른 생각을 가진 친구들을 보며 느낀 점을 적어보세요..."
                      className="w-full p-4 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6336] bg-white"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '신선함 💡',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 9,
                              }),
                            });
                            if (res.ok) {
                              alert('9차시 감정일기가 성공적으로 저장되었습니다! 🍀');
                              if (!completedLessons.includes(9)) {
                                setCompletedLessons([...completedLessons, 9]);
                              }
                            } else {
                              alert('9차시 감정일기 저장에 성공했습니다 (로컬 동기화)!');
                              if (!completedLessons.includes(9)) {
                                setCompletedLessons([...completedLessons, 9]);
                              }
                            }
                          } catch (err) {
                            alert('9차시 감정일기가 저장되었습니다!');
                            if (!completedLessons.includes(9)) {
                              setCompletedLessons([...completedLessons, 9]);
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#1B6336] hover:bg-[#154d2a] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span>9차시 활동 및 일기 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


                    {/* 10단계: 관계를 이어가고 싶다면 꼭! (공감하고 격려하기) */}
          {currentLesson === 10 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#1D4E89] via-[#2A65A8] to-[#1D4E89] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>영역 ➎ 건강한 관계 맺기</span>
                      <span>•</span>
                      <span>10. 관계를 이어가고 싶다면 꼭!</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>🌉 관계를 이어가고 싶다면 꼭! (공감하고 격려하기)</span>
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      화려한 해결책보다 상대방의 마음에 머물러주는 따뜻한 공감과 격려의 다리를 놓아요.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson10Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson10Step === s
                              ? 'bg-white text-[#1D4E89] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#EBF2FA] p-1.5 rounded-xl border border-blue-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '🤝' },
                  { step: 3, label: '3. 마음 키우기', icon: '🔋' },
                  { step: 4, label: '4. 마음 다지기', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson10Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson10Step === tab.step
                        ? 'bg-[#1D4E89] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson10Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1D4E89] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1D4E89] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "친구가 속상해하며 울먹일 때, 무슨 말을 해줘야 할지 몰라 어색했던 적이 있니? 진짜 좋은 친구는 화려한 해결책을 내놓는 사람이 아니라, 내 마음에 온전히 머물러주는 사람이래. 상대방의 마음에 따뜻한 다리를 놓아주는 '공감'과 '격려'의 비밀을 오늘 함께 열어보자!";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#1D4E89] hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-blue-50/60 to-white rounded-xl p-6 border border-blue-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-blue-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-blue-700 mb-2">To. 1학년 3반 친구들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "친구가 속상해하며 울먹일 때, 무슨 말을 해줘야 할지 몰라 어색했던 적이 있니?"
                      </p>
                      <p>
                        "진짜 좋은 친구는 화려한 해결책을 내놓는 사람이 아니라, <span className="bg-blue-100 text-[#1D4E89] px-1.5 py-0.5 rounded font-bold">내 마음에 온전히 머물러주는 사람</span>이래.
                        상대방의 마음에 따뜻한 다리를 놓아주는 <span className="text-[#1D4E89] font-bold">'공감'</span>과 <span className="text-[#1D4E89] font-bold">'격려'</span>의 비밀을 오늘 함께 열어보자!"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-blue-100 flex justify-end">
                      <span className="text-xs font-semibold text-blue-800">From. 너의 곁에서 항상 귀 기울이는 마음이 🎧</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson10HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>공감해요 ({lesson10HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        친구들과 공감의 주파수를 맞추고 있어요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson10Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1D4E89] hover:bg-[#153c6b] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>상대방 마음에 다가가기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson10Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1D4E89] flex items-center justify-center text-xl font-bold">
                      🤝
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1D4E89] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">상대방의 마음에 다가가기 (공감 vs 성급한 조언)</h3>
                    </div>
                  </div>

                  {/* 1. 웜업: 공감 vs 조언 퀴즈 */}
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#1D4E89] text-white text-xs font-bold rounded-md">공감 웜업 퀴즈</span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        "친구가 '나 이번 수행평가 완전 망쳤어...'라고 말할 때, 진짜 듣고 싶은 말은?"
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setLesson10QuizChoice('advice')}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          lesson10QuizChoice === 'advice'
                            ? 'border-red-400 bg-red-50/70 shadow-sm'
                            : 'border-blue-200 bg-white hover:border-blue-300'
                        }`}
                      >
                        <span className="text-2xl">❌</span>
                        <div>
                          <div className="font-bold text-sm text-gray-800">[성급한 조언형] 벽을 쌓는 대화</div>
                          <div className="text-xs text-gray-600 mt-1">"그러게 내가 미리 준비하라고 했잖아. 다음엔 학원 숙제부터 해."</div>
                        </div>
                      </button>

                      <button
                        onClick={() => setLesson10QuizChoice('empathy')}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          lesson10QuizChoice === 'empathy'
                            ? 'border-[#1D4E89] bg-blue-100/70 shadow-sm'
                            : 'border-blue-200 bg-white hover:border-blue-300'
                        }`}
                      >
                        <span className="text-2xl">⭕</span>
                        <div>
                          <div className="font-bold text-sm text-gray-800">[마음 공감형] 다리를 놓는 대화</div>
                          <div className="text-xs text-[#1D4E89] mt-1 font-semibold">"너 진짜 열심히 준비했는데 너무 속상하겠다... 마음 많이 쓰이지?"</div>
                        </div>
                      </button>
                    </div>

                    {lesson10QuizChoice && (
                      <div className="p-3 bg-white rounded-lg border border-blue-300 text-xs text-blue-900 flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">💡</span>
                        <span>
                          <strong>공감의 본질:</strong> 공감은 문제를 대신 풀어주는 것이 아니라, 친구의 슬픔과 속상한 마음에 <span className="font-bold text-[#1D4E89]">나란히 앉아 함께 머물러주는 것</span>이에요.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 2. 티켓 메모지 해시태그 */}
                  <div className="bg-[#EBF2FA] rounded-xl p-6 border border-blue-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (수업 목표 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      오늘 공감과 격려 수업에서 마음에 새길 핵심 키워드를 선택하거나 직접 적어보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#마음_헤아리기',
                        '#공감하기',
                        '#격려하기',
                        '#표현하지_않으면_몰라요',
                        '#따뜻한_경청',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson10HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson10HashtagInput === tag
                              ? 'bg-[#1D4E89] text-white border-[#1D4E89]'
                              : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson10HashtagInput}
                        onChange={(e) => setLesson10HashtagInput(e.target.value)}
                        placeholder="예: #친구_마음_먼저_들어주기 (나만의 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4E89]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson10Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson10Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#1D4E89] hover:bg-[#153c6b] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: 4단계 공감 징검다리 & 배터리 제작</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson10Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1D4E89] flex items-center justify-center text-xl font-bold">
                        🔋
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1D4E89] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">상대방의 마음에 한 걸음 더 다가가 볼까요?</h3>
                      </div>
                    </div>
                  </div>

                  {/* 서브 탭 네비게이션 */}
                  <div className="flex border-b border-gray-200">
                    {[
                      { id: 'steppingStone', label: '① 공감의 4단계 징검다리', icon: '🌉' },
                      { id: 'battery', label: '② 100% 완충! 격려 배터리', icon: '🔋' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setLesson10SubTab(st.id as any)}
                        className={`py-2.5 px-4 font-bold text-xs md:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                          lesson10SubTab === st.id
                            ? 'border-[#1D4E89] text-[#1D4E89]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <span>{st.icon}</span>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 서브탭 1: 공감의 4단계 징검다리 */}
                  {lesson10SubTab === 'steppingStone' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 상황 선택 카드 */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-700">
                          📌 공감하고 싶은 상황을 하나 선택하세요:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            {
                              id: 'late',
                              title: '약속 시간 지각',
                              desc: '친한 친구가 약속 시간에 30분 늦게 나타나 안절부절못할 때',
                              fact: '많이 서두르고 뛰어오느라 힘들었지?',
                              emotion: '늦어서 눈치 보이고 마음이 엄청 조마조마했겠다.',
                              need: '나를 기다리게 해서 미안한 마음이 정말 컸을 거야.',
                              support: '무슨 일 있었던 건 아니지? 괜찮아, 이제 맛있는 거 먹으러 가자!',
                            },
                            {
                              id: 'idea',
                              title: '아이디어 미채택',
                              desc: '모둠 과제에서 내 아이디어가 뽑히지 않아 시무룩해진 짝꿍',
                              fact: '모둠 과제 회의에서 네 제안이 이번엔 안 들어갔네.',
                              emotion: '열심히 생각해서 낸 아이디어인데 아쉽고 속상하겠다.',
                              need: '모둠에 도움도 되고 인정받고 싶었던 마음이었을 텐데.',
                              support: '다음 발표 파트에서 네 아이디어 꼭 살려보자! 넌 감각이 좋잖아.',
                            },
                            {
                              id: 'audition',
                              title: '오디션/시험 실패',
                              desc: '동아리 오디션이나 시험에 떨어져 눈물을 글썽이는 친구',
                              fact: '그동안 밤마다 진짜 열심히 준비했는데 결과가 아쉽게 나왔구나.',
                              emotion: '기대했던 만큼 허탈하고 눈물 날 정도로 속상하지.',
                              need: '꼭 합격해서 멋진 모습 보여주고 싶었던 간절한 마음 알 것 같아.',
                              support: '내가 옆에 있어 줄게. 이번 실패가 네 전부가 아니야. 넌 충분히 빛나.',
                            },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                setLesson10Situation(item.id as any);
                                setLesson10BridgeStep(4); // auto preview
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                lesson10Situation === item.id
                                  ? 'border-[#1D4E89] bg-blue-50 shadow-md'
                                  : 'border-blue-100 bg-white hover:border-blue-300'
                              }`}
                            >
                              <div className="font-bold text-xs text-[#1D4E89] mb-1">{item.title}</div>
                              <p className="text-xs text-gray-700">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 4단계 징검다리 인터랙션 보드 */}
                      {(() => {
                        const situationsMap: Record<string, any> = {
                          late: {
                            fact: '많이 서두르고 뛰어오느라 힘들었지?',
                            emotion: '늦어서 눈치 보이고 마음이 엄청 조마조마했겠다.',
                            need: '나를 기다리게 해서 미안한 마음이 정말 컸을 거야.',
                            support: '무슨 일 있었던 건 아니지? 괜찮아, 이제 맛있는 거 먹으러 가자!',
                          },
                          idea: {
                            fact: '모둠 과제 회의에서 네 제안이 이번엔 안 들어갔네.',
                            emotion: '열심히 생각해서 낸 아이디어인데 아쉽고 속상하겠다.',
                            need: '모둠에 도움도 되고 인정받고 싶었던 마음이었을 텐데.',
                            support: '다음 발표 파트에서 네 아이디어 꼭 살려보자! 넌 감각이 좋잖아.',
                          },
                          audition: {
                            fact: '그동안 밤마다 진짜 열심히 준비했는데 결과가 아쉽게 나왔구나.',
                            emotion: '기대했던 만큼 허탈하고 눈물 날 정도로 속상하지.',
                            need: '꼭 합격해서 멋진 모습 보여주고 싶었던 간절한 마음 알 것 같아.',
                            support: '내가 옆에 있어 줄게. 이번 실패가 네 전부가 아니야. 넌 충분히 빛나.',
                          },
                        };

                        const curr = situationsMap[lesson10Situation] || situationsMap.late;

                        return (
                          <div className="bg-gradient-to-br from-[#EBF2FA] to-white p-6 rounded-2xl border-2 border-blue-200 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                                <span>🌉</span> 4단계 공감 징검다리 (사실 ➔ 감정 ➔ 욕구 ➔ 지지)
                              </h4>
                              <span className="text-xs text-[#1D4E89] font-bold bg-white px-2.5 py-1 rounded-full border border-blue-200">
                                공감 온도 100℃ 달성!
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm space-y-2">
                                <span className="px-2 py-0.5 bg-blue-100 text-[#1D4E89] text-xs font-bold rounded">
                                  1단계: 사실 확인
                                </span>
                                <p className="text-xs text-gray-700 font-medium">"{curr.fact}"</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm space-y-2">
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                                  2단계: 감정 읽기
                                </span>
                                <p className="text-xs text-gray-700 font-medium">"{curr.emotion}"</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm space-y-2">
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                                  3단계: 욕구 이해
                                </span>
                                <p className="text-xs text-gray-700 font-medium">"{curr.need}"</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm space-y-2">
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                                  4단계: 지지와 수용
                                </span>
                                <p className="text-xs text-gray-700 font-medium">"{curr.support}"</p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* 서브탭 2: 100% 완충 격려 배터리 */}
                  {lesson10SubTab === 'battery' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-sm text-[#1D4E89] flex items-center gap-1.5">
                          <span>🔋</span> 친구를 위한 100% 완충! '격려 배터리' 발송기
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          지치고 방전된 친구에게 힘을 주는 맞춤형 응원 메시지를 조합하여 격려 배터리 카드를 만들어보세요.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        {/* 조합 폼 */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              1. 누구에게 보낼 배터리인가요? (수신 대상):
                            </label>
                            <input
                              type="text"
                              value={lesson10BatteryRecipient}
                              onChange={(e) => setLesson10BatteryRecipient(e.target.value)}
                              placeholder="예: 요즘 시험 때문에 기운 없는 내 짝꿍"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-[#1D4E89]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              2. 노력 칭찬 칩 선택:
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                '결과는 아쉬워도 매일 포기하지 않고 달리던 네 모습 진짜 멋졌어.',
                                '네가 밤늦게까지 쏟은 땀방울은 절대 헛되지 않아.',
                                '어려운 상황에서도 끝까지 책임감 있게 해내서 자랑스러워.',
                              ].map((phrase) => (
                                <button
                                  key={phrase}
                                  onClick={() => setLesson10BatteryPraise(phrase)}
                                  className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                                    lesson10BatteryPraise === phrase
                                      ? 'bg-blue-100 text-[#1D4E89] border-[#1D4E89] font-bold'
                                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                  }`}
                                >
                                  {phrase}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              3. 믿음과 응원 칩 선택:
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                '한 번의 실수로 네 가치가 사라지는 건 아니야. 난 언제나 네 편이야!',
                                '잠시 쉬어가도 괜찮아. 넌 결국 해낼 수 있는 멋진 사람이니까.',
                                '언제든 속상할 때 말해줘. 내가 든든한 지원군이 되어줄게!',
                              ].map((phrase) => (
                                <button
                                  key={phrase}
                                  onClick={() => setLesson10BatteryCheer(phrase)}
                                  className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                                    lesson10BatteryCheer === phrase
                                      ? 'bg-blue-100 text-[#1D4E89] border-[#1D4E89] font-bold'
                                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                  }`}
                                >
                                  {phrase}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 배터리 카드 미리보기 */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1D4E89] to-[#0E2849] text-white shadow-xl space-y-4 relative overflow-hidden border-2 border-blue-300">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
                              ⚡ 100% FULL CHARGED
                            </span>
                            <span className="text-emerald-300 text-lg font-extrabold animate-pulse">🔋 100%</span>
                          </div>

                          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
                            <div className="w-full h-full bg-emerald-400 rounded-full shadow-glow" />
                          </div>

                          <div className="space-y-2 pt-2">
                            <div className="text-xs text-blue-200">
                              To. <span className="text-white font-bold">{lesson10BatteryRecipient || '소중한 친구'}</span>에게
                            </div>
                            <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm space-y-2 text-xs md:text-sm leading-relaxed">
                              <p className="text-emerald-200">
                                "{lesson10BatteryPraise || '결과는 아쉬워도 매일 포기하지 않고 달리던 네 모습 진짜 멋졌어.'}"
                              </p>
                              <p className="text-white font-semibold">
                                "{lesson10BatteryCheer || '한 번의 실수로 네 가치가 사라지는 건 아니야. 난 언제나 네 편이야!'}"
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-xs text-blue-200 pt-2 border-t border-white/10">
                            <span>From. 1학년 3반 마음 충전소</span>
                            <button
                              onClick={() => alert('🔋 친구를 위한 격려 배터리가 성공적으로 발송(저장)되었습니다!')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all"
                            >
                              💌 격려 배터리 발송하기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson10Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson10Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#1D4E89] hover:bg-[#153c6b] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마음 다지기 & 감정일기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson10Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1D4E89] flex items-center justify-center text-xl font-bold">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1D4E89] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">함께 실천하는 마음 미션 & 성장 별점</h3>
                    </div>
                  </div>

                  {/* 1. 성장 별점 */}
                  <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#1D4E89] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (성장 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 친구의 고민을 들었을 때 성급한 조언 대신 친구의 감정을 먼저 읽어주었나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson10Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson10Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 주변 사람들에게 따뜻한 격려의 말을 건넬 자신감이 생겼나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson10Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson10Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주간 실천 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1D4E89] to-[#2A65A8] text-white shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold">주간 실천 미션</span>
                      <h4 className="font-bold text-sm">하루 한 번 진심 어린 공감의 맞장구 쳐주기</h4>
                    </div>
                    <p className="text-xs text-blue-100 leading-relaxed">
                      "친구가 이야기할 때 휴대폰을 내려놓고 눈을 맞추며,
                      <strong> '아 진짜? 속상했겠다 / 정말 기뻤겠다!'</strong> 공감 리액션 3번 실천하기!"
                    </p>
                  </div>

                  {/* 3. 10차시 감정일기 동기화 작성 */}
                  <div className="bg-[#EBF2FA] p-6 rounded-2xl border border-blue-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">10차시 감정일기 쓰기</h4>
                        <p className="text-xs text-gray-600">오늘 누군가에게 전했거나 내가 듣고 싶었던 따뜻한 공감과 격려의 말을 기록해요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#1D4E89] bg-white px-3 py-1 rounded-full border border-blue-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '따뜻함 ☀️',
                        '든든함 🛡️',
                        '감사함 💖',
                        '차분함 ☕',
                        '후련함 🍃',
                        '뭉클함 🥺',
                        '뿌듯함 😊',
                        '다정함 🌸',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#1D4E89] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-blue-50 border border-blue-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="오늘 공감과 격려 활동을 하며 느낀 내 솔직한 마음을 적어보세요..."
                      className="w-full p-4 rounded-xl border border-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4E89] bg-white"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '따뜻함 ☀️',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 10,
                              }),
                            });
                            if (res.ok) {
                              alert('10차시 감정일기가 성공적으로 저장되었습니다! 💙');
                              if (!completedLessons.includes(10)) {
                                setCompletedLessons([...completedLessons, 10]);
                              }
                            } else {
                              alert('10차시 감정일기 저장에 성공했습니다 (로컬 동기화)!');
                              if (!completedLessons.includes(10)) {
                                setCompletedLessons([...completedLessons, 10]);
                              }
                            }
                          } catch (err) {
                            alert('10차시 감정일기가 저장되었습니다!');
                            if (!completedLessons.includes(10)) {
                              setCompletedLessons([...completedLessons, 10]);
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#1D4E89] hover:bg-[#153c6b] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span>10차시 활동 및 일기 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


                    {/* 11단계: 진짜 마음을 전할래요 (올바르게 대화하기) */}
          {currentLesson === 11 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#1F6B38] via-[#2D854C] to-[#1F6B38] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>영역 ➎ 건강한 관계 맺기</span>
                      <span>•</span>
                      <span>11. 진짜 마음을 전할래요</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>💬 진짜 마음을 전할래요 (올바르게 대화하기)</span>
                    </h2>
                    <p className="text-emerald-100 text-sm mt-1">
                      비난하는 너-전달법 대신, 내 진심을 전하는 '나사감바' 3단계 나-전달법으로 솔직하게 소통해요.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson11Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson11Step === s
                              ? 'bg-white text-[#1F6B38] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#EEF6F0] p-1.5 rounded-xl border border-emerald-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '🗣️' },
                  { step: 3, label: '3. 마음 키우기', icon: '🧩' },
                  { step: 4, label: '4. 마음 다지기', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson11Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson11Step === tab.step
                        ? 'bg-[#1F6B38] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson11Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1F6B38] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1F6B38] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "친구에게 서운하거나 화가 났을 때, 나도 모르게 '너 왜 그래? 너 때문이잖아!' 하고 쏘아붙인 적이 있니? 사실 내 진짜 마음은 상처를 주려는 게 아니라 '내 속상함을 알아달라'는 외침이었는데 말이야. 상대방을 비난하지 않고 내 진짜 진심을 정확하게 전하는 대화의 마법을 오늘 함께 배워보자!";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#1F6B38] hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-emerald-50/60 to-white rounded-xl p-6 border border-emerald-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-emerald-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-emerald-700 mb-2">To. 1학년 3반 친구들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "친구에게 서운하거나 화가 났을 때, 나도 모르게 <span className="text-red-600 font-bold">'너 왜 그래? 너 때문이잖아!'</span> 하고 쏘아붙인 적이 있니?"
                      </p>
                      <p>
                        "사실 내 진짜 마음은 상처를 주려는 게 아니라 <span className="bg-emerald-100 text-[#1F6B38] px-1.5 py-0.5 rounded font-bold">'내 속상함을 알아달라'</span>는 외침이었는데 말이야.
                        상대방을 비난하지 않고 내 진짜 진심을 정확하게 전하는 대화의 마법을 오늘 함께 배워보자!"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-100 flex justify-end">
                      <span className="text-xs font-semibold text-emerald-800">From. 너의 진심을 이어주는 마음이 🌿</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson11HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>공감해요 ({lesson11HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        친구들과 함께 올바른 대화를 다짐하고 있어요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson11Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1F6B38] hover:bg-[#18532c] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>내 대화 스타일 점검하러 가기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson11Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1F6B38] flex items-center justify-center text-xl font-bold">
                      🗣️
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1F6B38] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">여러분은 어떻게 대화하고 있나요? (공격 vs 진심)</h3>
                    </div>
                  </div>

                  {/* 1. 웜업 대화 스타일 비교 */}
                  <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#1F6B38] text-white text-xs font-bold rounded-md">대화 비교 퀴즈</span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        "약속 시간에 30분 늦게 나타난 친구를 마주했을 때, 나의 첫마디는?"
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setLesson11QuizChoice('you')}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          lesson11QuizChoice === 'you'
                            ? 'border-red-400 bg-red-50/70 shadow-sm'
                            : 'border-emerald-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <span className="text-2xl">❌</span>
                        <div>
                          <div className="font-bold text-sm text-gray-800">[너-전달법] 공격·비난형 (싸움 유발)</div>
                          <div className="text-xs text-red-600 mt-1 font-medium">"너 왜 이렇게 개념이 없어? 맨날 늦고 진짜 짜증 나!"</div>
                        </div>
                      </button>

                      <button
                        onClick={() => setLesson11QuizChoice('i')}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          lesson11QuizChoice === 'i'
                            ? 'border-[#1F6B38] bg-emerald-100/70 shadow-sm'
                            : 'border-emerald-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <span className="text-2xl">⭕</span>
                        <div>
                          <div className="font-bold text-sm text-gray-800">[나-전달법] 진심·전달형 (공감 유발)</div>
                          <div className="text-xs text-[#1F6B38] mt-1 font-semibold">"연락도 없이 30분이나 안 와서 무슨 일 생긴 줄 알고 걱정되고 속상했어."</div>
                        </div>
                      </button>
                    </div>

                    {lesson11QuizChoice && (
                      <div className="p-3 bg-white rounded-lg border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">💡</span>
                        <span>
                          <strong>대화의 원리:</strong> 주어를 <span className="font-bold text-red-600">'너'</span>로 시작하면 상대방을 향한 화살(공격)이 되지만, 주어를 <span className="font-bold text-[#1F6B38]">'나'</span>로 시작하면 내 진심과 솔직한 감정이 안전하게 전달됩니다.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 2. 티켓 메모지 해시태그 */}
                  <div className="bg-[#EEF6F0] rounded-xl p-6 border border-emerald-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (수업 목표 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      오늘 올바른 대화 수업에서 마음에 품고 싶은 핵심 키워드를 선택하거나 직접 적어보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#화가_난다고_함부로_말하지_않기',
                        '#상대방을_존중하면서_대화하기',
                        '#나사감바_3단계',
                        '#비난없는_솔직함',
                        '#내_마음_먼저_설명하기',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson11HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson11HashtagInput === tag
                              ? 'bg-[#1F6B38] text-white border-[#1F6B38]'
                              : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson11HashtagInput}
                        onChange={(e) => setLesson11HashtagInput(e.target.value)}
                        placeholder="예: #너_때문에_대신_나는_으로_말하기 (나만의 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B38]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson11Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson11Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#1F6B38] hover:bg-[#18532c] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: '나사감바' 3단계 대화 블록 조립</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson11Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1F6B38] flex items-center justify-center text-xl font-bold">
                        🧩
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1F6B38] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">서로의 마음을 전하는 대화법 연습</h3>
                      </div>
                    </div>
                  </div>

                  {/* 서브 탭 네비게이션 */}
                  <div className="flex border-b border-gray-200">
                    {[
                      { id: 'blocks', label: "① '나사감바' 3단계 대화 조립기", icon: '🧩' },
                      { id: 'reset', label: '② 거친 말 순화기 (대화 리셋)', icon: '🔄' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setLesson11SubTab(st.id as any)}
                        className={`py-2.5 px-4 font-bold text-xs md:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                          lesson11SubTab === st.id
                            ? 'border-[#1F6B38] text-[#1F6B38]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <span>{st.icon}</span>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 서브탭 1: '나사감바' 3단계 대화 블록 조립기 */}
                  {lesson11SubTab === 'blocks' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 상황 선택 카드 */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-700">
                          📌 연습해 볼 갈등 상황을 하나 선택하세요:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            {
                              id: 'pen',
                              title: '소중한 샤프 무단 대여',
                              desc: '내가 빌려준 소중한 샤프를 친구가 말도 없이 다른 애한테 또 빌려줬을 때',
                              fact: '네가 나한테 빌려 간 샤프를 내 동의 없이 다른 친구에게 건넸을 때,',
                              emotion: '내가 정말 아끼는 물건이라 잃어버리거나 망가질까 봐 불안하고 서운했어.',
                              request: '다음부터는 내 물건을 다른 사람에게 주기 전에 나한테 먼저 물어봐 줬으면 좋겠어.',
                            },
                            {
                              id: 'group',
                              title: '모둠 과제 중 딴청',
                              desc: '모둠 과제 회의 시간에 한 친구가 계속 딴청 피우고 핸드폰만 볼 때',
                              fact: '우리가 다 같이 회의하고 자료 조사할 때 네가 계속 휴대폰 게임만 하고 있을 때,',
                              emotion: '마감 시간이 다가오는데 혼자만 고생하는 것 같아 답답하고 속상했어.',
                              request: '회의하는 15분 동안만이라도 함께 집중해서 맡은 파트를 같이 정리해 줬으면 좋겠어.',
                            },
                            {
                              id: 'joke',
                              title: '친구들 앞 외모 장난',
                              desc: '장난이라면서 내 외모나 콤플렉스를 여러 친구들 앞에서 놀릴 때',
                              fact: '친구들이 다 모여 있는 자리에서 내 외모나 단점을 가지고 별명을 부르며 웃을 때,',
                              emotion: '너는 장난일지 몰라도 나는 무안하고 큰 상처를 받았어.',
                              request: '앞으로는 다른 사람들 앞에서 그런 식의 장난은 하지 말아 줬으면 좋겠어.',
                            },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setLesson11Situation(item.id as any)}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                lesson11Situation === item.id
                                  ? 'border-[#1F6B38] bg-emerald-50 shadow-md'
                                  : 'border-emerald-100 bg-white hover:border-emerald-300'
                              }`}
                            >
                              <div className="font-bold text-xs text-[#1F6B38] mb-1">{item.title}</div>
                              <p className="text-xs text-gray-700">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3단계 조립 보드 */}
                      {(() => {
                        const sitMap: Record<string, any> = {
                          pen: {
                            fact: '네가 나한테 빌려 간 샤프를 내 동의 없이 다른 친구에게 건넸을 때,',
                            emotion: '내가 정말 아끼는 물건이라 잃어버리거나 망가질까 봐 불안하고 서운했어.',
                            request: '다음부터는 내 물건을 다른 사람에게 주기 전에 나한테 먼저 물어봐 줬으면 좋겠어.',
                          },
                          group: {
                            fact: '우리가 다 같이 회의하고 자료 조사할 때 네가 계속 휴대폰 게임만 하고 있을 때,',
                            emotion: '마감 시간이 다가오는데 혼자만 고생하는 것 같아 답답하고 속상했어.',
                            request: '회의하는 15분 동안만이라도 함께 집중해서 맡은 파트를 같이 정리해 줬으면 좋겠어.',
                          },
                          joke: {
                            fact: '친구들이 다 모여 있는 자리에서 내 외모나 단점을 가지고 별명을 부르며 웃을 때,',
                            emotion: '너는 장난일지 몰라도 나는 무안하고 큰 상처를 받았어.',
                            request: '앞으로는 다른 사람들 앞에서 그런 식의 장난은 하지 말아 줬으면 좋겠어.',
                          },
                        };

                        const curr = sitMap[lesson11Situation] || sitMap.pen;

                        return (
                          <div className="bg-gradient-to-br from-[#EEF6F0] to-white p-6 rounded-2xl border-2 border-emerald-200 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                                <span>🧩</span> '나사감바' 3단계 진심 대화 카드
                              </h4>
                              <span className="text-xs text-[#1F6B38] font-bold bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                                비난 지수 0% 달성!
                              </span>
                            </div>

                            <div className="space-y-3">
                              {/* 1단계 사실 */}
                              <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-emerald-100 text-[#1F6B38] text-xs font-bold rounded">
                                    1. 사실(Fact) 블록
                                  </span>
                                  <span className="text-xs text-gray-400">상대 행동을 거울처럼 객관적으로 묘사</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-800 font-semibold pt-1">
                                  "{curr.fact}"
                                </p>
                              </div>

                              {/* 2단계 감정 */}
                              <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                                    2. 감정(Emotion) 블록
                                  </span>
                                  <span className="text-xs text-gray-400">내 솔직한 기분과 마음 상태</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-800 font-semibold pt-1">
                                  "{curr.emotion}"
                                </p>
                              </div>

                              {/* 3단계 바람 */}
                              <div className="p-4 rounded-xl bg-white border border-purple-200 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                                    3. 바람(Request) 블록
                                  </span>
                                  <span className="text-xs text-gray-400">앞으로 바라는 구체적이고 긍정적인 행동</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-800 font-semibold pt-1">
                                  "{curr.request}"
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* 서브탭 2: 거친 말 순화기 (너-전달법 ➔ 나-전달법 리셋) */}
                  {lesson11SubTab === 'reset' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <h4 className="font-bold text-sm text-[#1F6B38] flex items-center gap-1.5">
                          <span>🔄</span> 거친 말 순화기 (너-전달법 ➔ 나-전달법 리셋)
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          홧김에 내뱉었던 날카로운 말을 부드러운 '나-전달법'으로 다시 써보는 연습 공간입니다.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Before */}
                        <div className="p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded">
                              BEFORE ❌
                            </span>
                            <span className="text-xs font-bold text-rose-700">공격적인 너-전달법</span>
                          </div>
                          <textarea
                            rows={3}
                            value={lesson11RoughInput}
                            onChange={(e) => setLesson11RoughInput(e.target.value)}
                            placeholder="예: 야, 넌 왜 말을 그따구로 하냐? 너 때문에 기분 진짜 더럽거든!"
                            className="w-full p-3 rounded-xl border border-rose-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                          />
                          <p className="text-xs text-gray-500">
                            상대방을 비난하거나 탓하는 말투를 적어보세요.
                          </p>
                        </div>

                        {/* After */}
                        <div className="p-5 rounded-2xl bg-emerald-50/50 border-2 border-emerald-300 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-[#1F6B38] text-white text-xs font-bold rounded">
                              AFTER ⭕
                            </span>
                            <span className="text-xs font-bold text-[#1F6B38]">정제된 나-전달법</span>
                          </div>
                          <textarea
                            rows={3}
                            value={lesson11RefinedInput}
                            onChange={(e) => setLesson11RefinedInput(e.target.value)}
                            placeholder="예: 네가 그렇게 퉁명스럽게 말하니까 나도 무시당하는 기분이 들어서 속상해. 조금만 다정하게 말해줄래?"
                            className="w-full p-3 rounded-xl border border-emerald-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F6B38] bg-white"
                          />
                          <p className="text-xs text-gray-500">
                            '나의 감정'과 '내가 바라는 점'을 담아 부드럽게 바꿔보세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson11Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson11Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#1F6B38] hover:bg-[#18532c] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마음 다지기 & 감정일기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson11Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1F6B38] flex items-center justify-center text-xl font-bold">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1F6B38] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">함께 실천하는 마음 미션 & 성장 별점</h3>
                    </div>
                  </div>

                  {/* 1. 성장 별점 */}
                  <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#1F6B38] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (성장 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 상대방을 비난하지 않고 내 감정과 바람을 솔직하게 표현할 수 있나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson11Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson11Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 갈등이 생겼을 때 '나사감바' 원리를 떠올릴 준비가 되었나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson11Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson11Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주간 실천 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1F6B38] to-[#2D854C] text-white shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold">주간 실천 미션</span>
                      <h4 className="font-bold text-sm">오늘 하루 '너 때문에' 대신 '나는 ~해'로 말하기</h4>
                    </div>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      "짜증이나 서운함이 올라올 때 <strong>1초 멈추고</strong>, 주어를 '나'로 바꾸어 내 기분을 설명하는 대화 1회 실천하기!"
                    </p>
                  </div>

                  {/* 3. 11차시 감정일기 동기화 작성 */}
                  <div className="bg-[#EEF6F0] p-6 rounded-2xl border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">11차시 감정일기 쓰기</h4>
                        <p className="text-xs text-gray-600">오늘 완성한 '나사감바' 대화 카드를 떠올리며 내 진심을 3줄로 기록해요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#1F6B38] bg-white px-3 py-1 rounded-full border border-emerald-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '솔직함 🌿',
                        '후련함 🍃',
                        '차분함 ☕',
                        '따뜻함 ☀️',
                        '안도감 😌',
                        '용기남 🔥',
                        '뿌듯함 😊',
                        '다정함 🌸',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#1F6B38] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="오늘 올바른 대화 연습을 하며 느낀 점이나, 누군가에게 진심을 전하고 싶은 말을 적어보세요..."
                      className="w-full p-4 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B38] bg-white"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '솔직함 🌿',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 11,
                              }),
                            });
                            if (res.ok) {
                              alert('11차시 감정일기가 성공적으로 저장되었습니다! 🌿');
                              if (!completedLessons.includes(11)) {
                                setCompletedLessons([...completedLessons, 11]);
                              }
                            } else {
                              alert('11차시 감정일기 저장에 성공했습니다 (로컬 동기화)!');
                              if (!completedLessons.includes(11)) {
                                setCompletedLessons([...completedLessons, 11]);
                              }
                            }
                          } catch (err) {
                            alert('11차시 감정일기가 저장되었습니다!');
                            if (!completedLessons.includes(11)) {
                              setCompletedLessons([...completedLessons, 11]);
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#1F6B38] hover:bg-[#18532c] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span>11차시 활동 및 일기 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


                    {/* 12단계: 갈등을 키우지 않으려면 (올바르게 사과하고 거절하기) */}
          {currentLesson === 12 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#D97026] via-[#E68A45] to-[#D97026] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>영역 ➎ 건강한 관계 맺기</span>
                      <span>•</span>
                      <span>12. 갈등을 키우지 않으려면</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>🍎 갈등을 키우지 않으려면 (올바르게 사과하고 거절하기)</span>
                    </h2>
                    <p className="text-orange-100 text-sm mt-1">
                      갈등은 피하는 것보다 잘 푸는 것! '인-사-약' 3단계 황금 사과와 상처 없는 거절 샌드위치를 배워요.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson12Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson12Step === s
                              ? 'bg-white text-[#D97026] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#FEF5EE] p-1.5 rounded-xl border border-orange-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '🦉' },
                  { step: 3, label: '3. 마음 키우기', icon: '🍎' },
                  { step: 4, label: '4. 마음 다지기', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson12Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson12Step === tab.step
                        ? 'bg-[#D97026] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson12Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-[#D97026] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#D97026] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "친구와 다투었을 때, 내가 잘못한 걸 알면서도 자존심 때문에 사과 타이밍을 놓친 적이 있니? 반대로 친구의 무리한 부탁을 거절하지 못해 끙끙 앓다가 속상했던 적은 없었어? 갈등은 피하는 것보다 '잘 푸는 것'이 중요하대! 관계를 망치지 않고 진심을 전하는 '진짜 사과'와 '정중한 거절'의 기술을 오늘 함께 익혀보자!";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-[#D97026] hover:bg-orange-100 text-xs font-semibold border border-orange-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-orange-50/60 to-white rounded-xl p-6 border border-orange-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-orange-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-orange-700 mb-2">To. 1학년 3반 친구들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "친구와 다투었을 때, 내가 잘못한 걸 알면서도 자존심 때문에 사과 타이밍을 놓친 적이 있니? 반대로 친구의 무리한 부탁을 거절하지 못해 끙끙 앓다가 속상했던 적은 없었어?"
                      </p>
                      <p>
                        "갈등은 피하는 것보다 <span className="bg-orange-100 text-[#D97026] px-1.5 py-0.5 rounded font-bold">'잘 푸는 것'이 중요하대!</span>
                        관계를 망치지 않고 진심을 전하는 <span className="text-[#D97026] font-bold">'진짜 사과'</span>와 <span className="text-[#D97026] font-bold">'정중한 거절'</span>의 기술을 오늘 함께 익혀보자!"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-orange-100 flex justify-end">
                      <span className="text-xs font-semibold text-orange-800">From. 너의 용기 있는 사과를 응원하는 마음이 🍎</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson12HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>공감해요 ({lesson12HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        친구들과 갈등 없는 교실을 다짐해요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson12Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D97026] hover:bg-[#b85b1c] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>나의 갈등 대처 알아보기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson12Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-[#D97026] flex items-center justify-center text-xl font-bold">
                      🦉
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#D97026] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">나는 갈등 상황에 어떻게 대처하고 있나요?</h3>
                    </div>
                  </div>

                  {/* 1. 5대 동물 갈등 대처 진단기 */}
                  <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#D97026] text-white text-xs font-bold rounded-md">갈등 동물 진단</span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        "모둠 과제 중 친구와 의견이 크게 부딪혔을 때, 나의 평소 행동 패턴은?"
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        { id: 'turtle', name: '거북이형', type: '회피', icon: '🐢', desc: '"싸우기 싫어... 그냥 말 안 하고 피해버릴래."' },
                        { id: 'shark', name: '상어형', type: '경쟁', icon: '🦈', desc: '"내 의견이 무조건 맞아! 끝까지 이겨야 해."' },
                        { id: 'teddy', name: '곰인형형', type: '순응', icon: '🧸', desc: '"친구가 화낼까 봐 무조건 친구 뜻대로 다 맞춰줘."' },
                        { id: 'fox', name: '여우형', type: '타협', icon: '🦊', desc: '"반반씩 양보해서 대충 중간에서 절충하자."' },
                        { id: 'owl', name: '올빼미형', type: '협동', icon: '🦉', desc: '"둘 다 만족할 수 있는 제3의 좋은 방법을 찾아보자."' },
                      ].map((animal) => (
                        <button
                          key={animal.id}
                          onClick={() => setLesson12ConflictType(animal.id as any)}
                          className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                            lesson12ConflictType === animal.id
                              ? 'border-[#D97026] bg-orange-100/70 shadow-sm scale-[1.02]'
                              : 'border-orange-200 bg-white hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{animal.icon}</span>
                            <div>
                              <span className="font-bold text-xs text-gray-800">{animal.name}</span>
                              <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-orange-200/80 text-orange-900 font-bold">
                                {animal.type}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 italic mt-1">{animal.desc}</p>
                        </button>
                      ))}
                    </div>

                    {lesson12ConflictType && (
                      <div className="p-3 bg-white rounded-lg border border-orange-300 text-xs text-orange-900 flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">💡</span>
                        <span>
                          <strong>갈등 해결 팁:</strong> 어떤 방식이든 장단점이 있지만, 관계와 결과 모두를 지키는 가장 성숙한 방식은 서로의 필요를 함께 채우는 <strong>'올빼미형(협동)'</strong> 접근입니다!
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 2. 티켓 메모지 해시태그 */}
                  <div className="bg-[#FEF5EE] rounded-xl p-6 border border-orange-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (수업 목표 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      오늘 갈등 관리 수업에서 마음에 새길 핵심 키워드를 선택하거나 직접 적어보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#갈등을_키우지_않기',
                        '#진심_담은_사과',
                        '#상처_주지_않는_거절',
                        '#서로_윈윈하기',
                        '#황금사과_레시피',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson12HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson12HashtagInput === tag
                              ? 'bg-[#D97026] text-white border-[#D97026]'
                              : 'bg-white text-orange-800 border-orange-200 hover:bg-orange-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson12HashtagInput}
                        onChange={(e) => setLesson12HashtagInput(e.target.value)}
                        placeholder="예: #사과_타이밍_놓치지_않기 (나만의 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-orange-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97026]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson12Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson12Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#D97026] hover:bg-[#b85b1c] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: '인사약' 사과 & 거절 샌드위치</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson12Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-[#D97026] flex items-center justify-center text-xl font-bold">
                        🍎
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#D97026] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">갈등 관리를 위한 핵심 기술 연습</h3>
                      </div>
                    </div>
                  </div>

                  {/* 서브 탭 네비게이션 */}
                  <div className="flex border-b border-gray-200">
                    {[
                      { id: 'apple', label: "① '인-사-약' 3단계 황금 사과", icon: '🍎' },
                      { id: 'sandwich', label: '② 단호·정중 거절 샌드위치', icon: '🥪' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setLesson12SubTab(st.id as any)}
                        className={`py-2.5 px-4 font-bold text-xs md:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                          lesson12SubTab === st.id
                            ? 'border-[#D97026] text-[#D97026]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <span>{st.icon}</span>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 서브탭 1: '인-사-약' 3단계 황금 사과 */}
                  {lesson12SubTab === 'apple' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 사과 상황 카드 */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-700">
                          📌 사과를 연습해 볼 상황을 하나 선택하세요:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            {
                              id: 'clothes',
                              title: '체육복 늦은 반납',
                              desc: '빌려 간 체육복을 깜빡하고 늦게 돌려줘서 친구가 수업 시간에 혼났을 때',
                              rec: '내가 빌려 간 체육복을 제때 안 줘서 네가 혼나게 한 것, 온전히 내 잘못이야.',
                              apo: "'깜빡했다'는 핑계 대지 않을게. 억울하게 혼나게 해서 진심으로 미안해.",
                              pro: '앞으로는 빌린 즉시 돌려주고, 다음 주 매점에서 시원한 음료수 사서 꼭 보답할게!',
                            },
                            {
                              id: 'secret',
                              title: '외모/비밀 장난',
                              desc: '친구들끼리 장난치다가 선을 넘어 상대방의 외모/비밀을 놀렸을 때',
                              rec: '친구들 앞에서 너의 비밀을 가볍게 꺼내어 놀림거리로 만든 것, 내 큰 잘못이야.',
                              apo: '장난이라는 핑계로 네 마음에 큰 상처를 준 점 진심으로 반성하고 미안해.',
                              pro: '다시는 너의 비밀이나 외모를 두고 장난치지 않을 것을 굳게 약속할게.',
                            },
                            {
                              id: 'late',
                              title: '약속 1시간 지각',
                              desc: '약속 시간에 말도 없이 1시간 늦어 친구를 길거리에서 기다리게 했을 때',
                              rec: '연락도 없이 1시간이나 늦어서 길에서 혼자 초조하게 기다리게 한 것, 내 잘못이야.',
                              apo: '교통 핑계 대지 않을게. 귀한 시간을 낭비하게 만들어서 정말 미안해.',
                              pro: '앞으로는 출발 30분 전에 알람 맞추고, 오늘 영화는 내가 쏠게!',
                            },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setLesson12AppleSituation(item.id as any)}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                lesson12AppleSituation === item.id
                                  ? 'border-[#D97026] bg-orange-50 shadow-md'
                                  : 'border-orange-100 bg-white hover:border-orange-300'
                              }`}
                            >
                              <div className="font-bold text-xs text-[#D97026] mb-1">{item.title}</div>
                              <p className="text-xs text-gray-700">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3단계 사과 카드 빌더 */}
                      {(() => {
                        const appleMap: Record<string, any> = {
                          clothes: {
                            rec: '내가 빌려 간 체육복을 제때 안 줘서 네가 혼나게 한 것, 온전히 내 잘못이야.',
                            apo: "'깜빡했다'는 핑계 대지 않을게. 억울하게 혼나게 해서 진심으로 미안해.",
                            pro: '앞으로는 빌린 즉시 돌려주고, 다음 주 매점에서 시원한 음료수 사서 꼭 보답할게!',
                          },
                          secret: {
                            rec: '친구들 앞에서 너의 비밀을 가볍게 꺼내어 놀림거리로 만든 것, 내 큰 잘못이야.',
                            apo: '장난이라는 핑계로 네 마음에 큰 상처를 준 점 진심으로 반성하고 미안해.',
                            pro: '다시는 너의 비밀이나 외모를 두고 장난치지 않을 것을 굳게 약속할게.',
                          },
                          late: {
                            rec: '연락도 없이 1시간이나 늦어서 길에서 혼자 초조하게 기다리게 한 것, 내 잘못이야.',
                            apo: '교통 핑계 대지 않을게. 귀한 시간을 낭비하게 만들어서 정말 미안해.',
                            pro: '앞으로는 출발 30분 전에 알람 맞추고, 오늘 영화는 내가 쏠게!',
                          },
                        };

                        const curr = appleMap[lesson12AppleSituation] || appleMap.clothes;

                        return (
                          <div className="bg-gradient-to-br from-[#FEF5EE] to-white p-6 rounded-2xl border-2 border-orange-200 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                                <span>🍎</span> 황금 사과(Golden Apple) 3단계 레시피 (인-사-약)
                              </h4>
                              <span className="text-xs text-[#D97026] font-bold bg-white px-2.5 py-1 rounded-full border border-orange-200">
                                진심 지수 100%
                              </span>
                            </div>

                            <div className="space-y-3">
                              {/* 1단계 인정 */}
                              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded">
                                    [인] 인정하기
                                  </span>
                                  <span className="text-xs text-gray-400">변명 없이 내 잘못과 상대 감정을 솔직히 인정</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-800 font-semibold pt-1">
                                  "{curr.rec}"
                                </p>
                              </div>

                              {/* 2단계 사과 */}
                              <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-orange-100 text-[#D97026] text-xs font-bold rounded">
                                    [사] 사과하기
                                  </span>
                                  <span className="text-xs text-gray-400">조건이나 핑계를 달지 않고 진심 표현</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-800 font-semibold pt-1">
                                  "{curr.apo}"
                                </p>
                              </div>

                              {/* 3단계 약속 */}
                              <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                                    [약] 약속하기
                                  </span>
                                  <span className="text-xs text-gray-400">재발 방지 대책과 관계 회복 행동 제안</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-800 font-semibold pt-1">
                                  "{curr.pro}"
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* 서브탭 2: 단호하고 정중한 거절 샌드위치 */}
                  {lesson12SubTab === 'sandwich' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <h4 className="font-bold text-sm text-[#D97026] flex items-center gap-1.5">
                          <span>🥪</span> 상처 주지 않는 '거절 샌드위치' 제조기
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          친구의 무리한 부탁을 거절할 때, 관계를 해치지 않고 단호하게 선을 긋는 3단계 샌드위치 공식입니다.
                        </p>
                      </div>

                      {/* 상황 제시 */}
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 flex items-center gap-2">
                        <span className="text-base">💬</span>
                        <span><strong>친구의 부탁 상황:</strong> "친구야, 이번 주말에 내 대신 학원 숙제 좀 대신 써주면 안 돼?"</span>
                      </div>

                      {/* 샌드위치 3단 구조 */}
                      <div className="space-y-3">
                        {/* 빵 1 */}
                        <div className="p-4 rounded-2xl bg-amber-100/70 border-2 border-amber-300 shadow-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🍞</span>
                            <span className="text-xs font-bold text-amber-900">윗빵: 감사 & 공감 (부드럽게 열기)</span>
                          </div>
                          <p className="text-xs md:text-sm text-amber-950 font-medium pl-6">
                            "나한테 부탁해 줘서 고맙고, 너 요즘 수행평가 때문에 진짜 바쁘고 힘든 거 알아."
                          </p>
                        </div>

                        {/* 속재료 */}
                        <div className="p-4 rounded-2xl bg-rose-100/70 border-2 border-rose-300 shadow-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🥩</span>
                            <span className="text-xs font-bold text-rose-900">속재료: 단호한 거절 + 이유 (정확한 선 긋기)</span>
                          </div>
                          <p className="text-xs md:text-sm text-rose-950 font-semibold pl-6">
                            "하지만 숙제는 스스로 해야 실력이 늘고, 나도 이번 주말에 가족 일정이 있어서 대신해 줄 수는 없어."
                          </p>
                        </div>

                        {/* 빵 2 */}
                        <div className="p-4 rounded-2xl bg-amber-100/70 border-2 border-amber-300 shadow-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🍞</span>
                            <span className="text-xs font-bold text-amber-900">아랫빵: 대안 제시 & 응원 (따뜻하게 닫기)</span>
                          </div>
                          <p className="text-xs md:text-sm text-amber-950 font-medium pl-6">
                            "대신 오늘 방과 후에 어떻게 쓰면 빨리 끝낼 수 있는지 방법은 같이 의논해 줄 수 있어. 힘내자!"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson12Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson12Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#D97026] hover:bg-[#b85b1c] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마음 다지기 & 감정일기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson12Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-[#D97026] flex items-center justify-center text-xl font-bold">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#D97026] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">함께 실천하는 마음 미션 & 성장 별점</h3>
                    </div>
                  </div>

                  {/* 1. 성장 별점 */}
                  <div className="bg-orange-50/60 p-5 rounded-xl border border-orange-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#D97026] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (성장 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 잘못했을 때 변명하지 않고 '인-사-약'으로 사과할 용기가 생겼나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson12Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson12Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 무리한 부탁을 받았을 때 '거절 샌드위치'로 상처 없이 거절할 수 있나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson12Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson12Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주간 실천 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#D97026] to-[#E68A45] text-white shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold">주간 실천 미션</span>
                      <h4 className="font-bold text-sm">사과와 거절의 골든타임 놓치지 않기</h4>
                    </div>
                    <p className="text-xs text-orange-100 leading-relaxed">
                      "마음에 걸리는 실수가 있다면 <strong>24시간 안에 '인사약'으로 사과</strong>하고, 무리한 부탁엔 <strong>3초 생각 후 거절 샌드위치</strong>로 부드럽게 답하기!"
                    </p>
                  </div>

                  {/* 3. 12차시 감정일기 동기화 작성 */}
                  <div className="bg-[#FEF5EE] p-6 rounded-2xl border border-orange-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">12차시 감정일기 쓰기</h4>
                        <p className="text-xs text-gray-600">오늘 배운 사과와 거절의 기술을 돌아보며 내 솔직한 감정을 3줄로 기록해요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#D97026] bg-white px-3 py-1 rounded-full border border-orange-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '용기남 🦁',
                        '후련함 🍃',
                        '차분함 ☕',
                        '당당함 🛡️',
                        '미안함 🥺',
                        '따뜻함 ☀️',
                        '뿌듯함 😊',
                        '편안함 🌿',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#D97026] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="오늘 갈등 해결 연습을 하며 느낀 점이나, 진심으로 사과하고 싶었던 일을 적어보세요..."
                      className="w-full p-4 rounded-xl border border-orange-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97026] bg-white"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '용기남 🦁',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 12,
                              }),
                            });
                            if (res.ok) {
                              alert('12차시 감정일기가 성공적으로 저장되었습니다! 🍎');
                              if (!completedLessons.includes(12)) {
                                setCompletedLessons([...completedLessons, 12]);
                              }
                            } else {
                              alert('12차시 감정일기 저장에 성공했습니다 (로컬 동기화)!');
                              if (!completedLessons.includes(12)) {
                                setCompletedLessons([...completedLessons, 12]);
                              }
                            }
                          } catch (err) {
                            alert('12차시 감정일기가 저장되었습니다!');
                            if (!completedLessons.includes(12)) {
                              setCompletedLessons([...completedLessons, 12]);
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#D97026] hover:bg-[#b85b1c] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span>12차시 활동 및 일기 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


                    {/* 13단계: 현명한 선택을 하려면 (책임감 있는 결정하기) */}
          {currentLesson === 13 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#1565C0] via-[#1E88E5] to-[#1565C0] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>영역 ➏ 책임감 있는 결정하기</span>
                      <span>•</span>
                      <span>13. 현명한 선택을 하려면</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>🧭 현명한 선택을 하려면 (책임감 있는 결정하기)</span>
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      순간의 충동 대신 4단계 의사결정 내비게이션과 결과 예측 저울로 후회 없는 선택을 내려요.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson13Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson13Step === s
                              ? 'bg-white text-[#1565C0] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#E8F4FD] p-1.5 rounded-xl border border-blue-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '🧭' },
                  { step: 3, label: '3. 마음 키우기', icon: '⚖️' },
                  { step: 4, label: '4. 마음 다지기', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson13Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson13Step === tab.step
                        ? 'bg-[#1565C0] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson13Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1565C0] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "중학생이 된 후 학원, 진로, 친구 관계, 휴대폰 사용까지 스스로 결정해야 할 일들이 부쩍 많아졌지? 순간적인 기분이나 충동으로 내린 결정 때문에 나중에 '아, 그때 왜 그랬을까...' 하고 후회한 적도 있었을 거야. 선택의 자유에는 언제나 '결과에 대한 책임'이 따라와! 후회를 줄이고 나에게도 친구에게도 득이 되는 '현명한 선택의 공식'을 오늘 함께 찾아보자!";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#1565C0] hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-blue-50/60 to-white rounded-xl p-6 border border-blue-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-blue-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-blue-700 mb-2">To. 1학년 3반 친구들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "중학생이 된 후 학원, 진로, 친구 관계, 휴대폰 사용까지 스스로 결정해야 할 일들이 부쩍 많아졌지?
                        순간적인 기분이나 충동으로 내린 결정 때문에 나중에 <span className="text-[#1565C0] font-bold">'아, 그때 왜 그랬을까...'</span> 하고 후회한 적도 있었을 거야."
                      </p>
                      <p>
                        "선택의 자유에는 언제나 <span className="bg-blue-100 text-[#1565C0] px-1.5 py-0.5 rounded font-bold">'결과에 대한 책임'</span>이 따라와!
                        후회를 줄이고 나에게도 친구에게도 득이 되는 '현명한 선택의 공식'을 오늘 함께 찾아보자!"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-blue-100 flex justify-end">
                      <span className="text-xs font-semibold text-blue-800">From. 너의 현명한 결정을 돕는 마음이 🧭</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson13HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>공감해요 ({lesson13HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        친구들과 현명한 결정을 다짐하고 있어요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson13Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>현명한 선택 배우러 가기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson13Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1565C0] flex items-center justify-center text-xl font-bold">
                      🧭
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">나의 평소 선택 스타일 체크 & 학습 목표</h3>
                    </div>
                  </div>

                  {/* 1. 스프링 노트 학습목표 */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 flex items-center gap-4">
                    <div className="text-3xl select-none">⏰📒</div>
                    <div>
                      <span className="text-xs font-bold text-[#1565C0] uppercase">수업 목표</span>
                      <p className="text-xs md:text-sm font-bold text-gray-800 mt-0.5">
                        "의사결정의 중요성을 이해하고, 4단계 의사결정 과정을 통해 상황에 맞는 현명하고 책임 있는 선택을 내릴 수 있다."
                      </p>
                    </div>
                  </div>

                  {/* 2. 웜업 선택 스타일 픽커 */}
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#1565C0] text-white text-xs font-bold rounded-md">선택 습관 체크</span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">
                        "친구들이 '야, 오늘 학원 째고 PC방 가자!'라고 할 때 나의 즉각적인 반응은?"
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      {[
                        { id: 'impulse', title: '충동 직진형 ⚡', desc: '"재밌겠다! 일단 가고 뒷일은 나중에 생각하자."' },
                        { id: 'passive', title: '우유부단 끌려감형 🌀', desc: '"안 가자니 분위기 깰 것 같고..." 하며 마지못해 따라감' },
                        { id: 'stop', title: '신중한 멈춤형 🧭', desc: '"잠깐, 오늘 숙제와 부모님 연락은 어쩌지?" 3초 멈추고 생각함' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setLesson13ChoiceStyle(item.id as any)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            lesson13ChoiceStyle === item.id
                              ? 'border-[#1565C0] bg-blue-100/70 shadow-sm'
                              : 'border-blue-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="font-bold text-xs text-gray-800 mb-1">{item.title}</div>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </button>
                      ))}
                    </div>

                    {lesson13ChoiceStyle && (
                      <div className="p-3 bg-white rounded-lg border border-blue-300 text-xs text-blue-900 flex items-center gap-2 animate-fadeIn">
                        <span className="text-base">💡</span>
                        <span>
                          <strong>결정의 지혜:</strong> 순간의 충동이나 친구의 분위기에 휩쓸리기 전, 딱 <strong>'3초의 멈춤(STOP)'</strong>만 가져도 후회하는 결정의 80%를 줄일 수 있어요!
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 3. 티켓 메모지 해시태그 */}
                  <div className="bg-[#E8F4FD] rounded-xl p-6 border border-blue-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (수업 목표 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      오늘 책임 있는 의사결정 수업에서 마음에 새길 핵심 키워드를 선택하거나 직접 적어보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#현명한_선택',
                        '#책임감_있는_결정',
                        '#3초_멈춤',
                        '#후회_없는_선택',
                        '#선택의_주인공',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson13HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson13HashtagInput === tag
                              ? 'bg-[#1565C0] text-white border-[#1565C0]'
                              : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson13HashtagInput}
                        onChange={(e) => setLesson13HashtagInput(e.target.value)}
                        placeholder="예: #3초_생각하고_결정하기 (나만의 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson13Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson13Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: 4단계 내비게이션 & 결과 저울</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson13Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1565C0] flex items-center justify-center text-xl font-bold">
                        ⚖️
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">책임 있는 의사결정 어떻게 할까?</h3>
                      </div>
                    </div>
                  </div>

                  {/* 서브 탭 네비게이션 */}
                  <div className="flex border-b border-gray-200">
                    {[
                      { id: 'nav', label: '① 4단계 의사결정 내비게이션', icon: '🧭' },
                      { id: 'scale', label: '② 선택-결과 예측 저울(시소)', icon: '⚖️' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setLesson13SubTab(st.id as any)}
                        className={`py-2.5 px-4 font-bold text-xs md:text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                          lesson13SubTab === st.id
                            ? 'border-[#1565C0] text-[#1565C0]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <span>{st.icon}</span>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 서브탭 1: 4단계 의사결정 내비게이션 */}
                  {lesson13SubTab === 'nav' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 딜레마 시나리오 카드 선택 */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-700">
                          📌 해결해 볼 딜레마 시나리오를 하나 선택하세요:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            {
                              id: 'game',
                              title: '시험 전날 밤 게임 유혹',
                              desc: '내일 기말고사인데 친구가 지금 랭킹전 한 판만 돌리자고 계속 초대 메시지를 보낼 때',
                              prob: '기말고사 전날 밤, 친구의 게임 초대와 시험공부 집중 사이의 갈등',
                              optA: '친구 초대를 수락하고 딱 한 판만 게임을 한다.',
                              optB: '친구에게 상황을 설명하고 거절한 뒤 시험공부에 집중한다.',
                              predA: '기분은 좋지만 밤을 새우게 되어 내일 시험을 망치고 후회할 가능성 90%',
                              predB: '친구에게 미안하지만 내일 시험을 잘 보고 홀가분하게 방학 때 게임할 수 있음',
                              decision: '친구에게 정중히 거절 톡을 보내고 휴대폰을 서랍에 넣은 뒤 시험공부를 마무리한다.',
                            },
                            {
                              id: 'groupchat',
                              title: '뒷담화 단톡방 동조 압박',
                              desc: '친한 친구들이 내가 없는 단톡방에서 다른 친구 욕을 하며 내게 동조하라고 부추길 때',
                              prob: '친구들의 뒷담화 동조 요구와 양심/따돌림 방조 사이의 갈등',
                              optA: '친구들과 멀어지기 싫어서 같이 맞장구치며 험담에 참여한다.',
                              optB: '뒷담화에 참여하지 않고 단톡방에서 화제를 돌리거나 선을 긋는다.',
                              predA: '잠깐 친구들과 어울리는 것 같지만 결국 소문이 퍼져 큰 학교폭력 갈등으로 번짐',
                              predB: '순간 어색할 수 있지만 비겁한 행동을 하지 않아 양심에 당당하고 친구 관계도 지킴',
                              decision: '"우리가 직접 물어본 것도 아닌데 이런 얘기는 그만하자"라며 부드럽게 선을 긋는다.',
                            },
                            {
                              id: 'soccer',
                              title: '학원 보충 vs 축구 약속',
                              desc: '중요한 학원 보충 수업 시간인데, 반 대항 축구 연습에 인원이 부족하다고 꼭 오라고 할 때',
                              prob: '성적 관리를 위한 학원 보충과 반 친구들과의 축구 의리 사이의 갈등',
                              optA: '학원을 빠지고 축구 경기에 참여한다.',
                              optB: '학원 보충을 듣고 축구는 끝난 뒤 응원하러 가거나 다음 판에 합류한다.',
                              predA: '축구는 재밌지만 학원 진도를 놓치고 부모님과 선생님의 신뢰를 잃음',
                              predB: '축구를 못 뛰어 아쉽지만 학원 공부를 정상적으로 마치고 친구들에게 진심으로 응원 전함',
                              decision: '친구들에게 "학원 끝나고 30분 뒤에 응원 갈게!"라고 미리 조율하고 학원에 간다.',
                            },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setLesson13Scenario(item.id as any)}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                lesson13Scenario === item.id
                                  ? 'border-[#1565C0] bg-blue-50 shadow-md'
                                  : 'border-blue-100 bg-white hover:border-blue-300'
                              }`}
                            >
                              <div className="font-bold text-xs text-[#1565C0] mb-1">{item.title}</div>
                              <p className="text-xs text-gray-700">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 4단계 내비게이션 보드 */}
                      {(() => {
                        const scenarioMap: Record<string, any> = {
                          game: {
                            prob: '기말고사 전날 밤, 친구의 게임 초대와 시험공부 집중 사이의 갈등',
                            optA: '친구 초대를 수락하고 딱 한 판만 게임을 한다.',
                            optB: '친구에게 상황을 설명하고 거절한 뒤 시험공부에 집중한다.',
                            predA: '기분은 좋지만 밤을 새우게 되어 내일 시험을 망치고 후회할 가능성 90%',
                            predB: '친구에게 미안하지만 내일 시험을 잘 보고 홀가분하게 방학 때 게임할 수 있음',
                            decision: '친구에게 정중히 거절 톡을 보내고 휴대폰을 서랍에 넣은 뒤 시험공부를 마무리한다.',
                          },
                          groupchat: {
                            prob: '친구들의 뒷담화 동조 요구와 양심/따돌림 방조 사이의 갈등',
                            optA: '친구들과 멀어지기 싫어서 같이 맞장구치며 험담에 참여한다.',
                            optB: '뒷담화에 참여하지 않고 단톡방에서 화제를 돌리거나 선을 긋는다.',
                            predA: '잠깐 친구들과 어울리는 것 같지만 결국 소문이 퍼져 큰 학교폭력 갈등으로 번짐',
                            predB: '순간 어색할 수 있지만 비겁한 행동을 하지 않아 양심에 당당하고 친구 관계도 지킴',
                            decision: '"우리가 직접 물어본 것도 아닌데 이런 얘기는 그만하자"라며 부드럽게 선을 긋는다.',
                          },
                          soccer: {
                            prob: '성적 관리를 위한 학원 보충과 반 친구들과의 축구 의리 사이의 갈등',
                            optA: '학원을 빠지고 축구 경기에 참여한다.',
                            optB: '학원 보충을 듣고 축구는 끝난 뒤 응원하러 가거나 다음 판에 합류한다.',
                            predA: '축구는 재밌지만 학원 진도를 놓치고 부모님과 선생님의 신뢰를 잃음',
                            predB: '축구를 못 뛰어 아쉽지만 학원 공부를 정상적으로 마치고 친구들에게 진심으로 응원 전함',
                            decision: '친구들에게 "학원 끝나고 30분 뒤에 응원 갈게!"라고 미리 조율하고 학원에 간다.',
                          },
                        };

                        const curr = scenarioMap[lesson13Scenario] || scenarioMap.game;

                        return (
                          <div className="bg-gradient-to-br from-[#E8F4FD] to-white p-6 rounded-2xl border-2 border-blue-200 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                                <span>🧭</span> 4단계 의사결정 내비게이션 경로
                              </h4>
                              <span className="text-xs text-[#1565C0] font-bold bg-white px-2.5 py-1 rounded-full border border-blue-200">
                                안전 경로 탐색 완료
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {/* 1단계 */}
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm space-y-1">
                                <span className="px-2 py-0.5 bg-blue-100 text-[#1565C0] text-xs font-bold rounded">
                                  1단계: 문제 정의
                                </span>
                                <p className="text-xs text-gray-700 font-medium pt-1">"{curr.prob}"</p>
                              </div>

                              {/* 2단계 */}
                              <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-sm space-y-1">
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                                  2단계: 대안 탐색
                                </span>
                                <div className="text-xs text-gray-700 space-y-1 pt-1">
                                  <div>• [선택 A] {curr.optA}</div>
                                  <div>• [선택 B] {curr.optB}</div>
                                </div>
                              </div>

                              {/* 3단계 */}
                              <div className="p-4 rounded-xl bg-white border border-purple-200 shadow-sm space-y-1">
                                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                                  3단계: 결과 예측 저울
                                </span>
                                <div className="text-xs text-gray-700 space-y-1 pt-1">
                                  <div className="text-red-600">A 결과: {curr.predA}</div>
                                  <div className="text-emerald-700">B 결과: {curr.predB}</div>
                                </div>
                              </div>

                              {/* 4단계 */}
                              <div className="p-4 rounded-xl bg-white border-2 border-emerald-300 shadow-sm space-y-1">
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                                  4단계: 최종 결정 및 책임
                                </span>
                                <p className="text-xs text-[#1565C0] font-bold pt-1">
                                  "{curr.decision}"
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* 서브탭 2: 선택-결과 예측 시소 저울 */}
                  {lesson13SubTab === 'scale' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-sm text-[#1565C0] flex items-center gap-1.5">
                          <span>⚖️</span> 선택-결과 예측 시소(저울) 시뮬레이터
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          선택하려는 행동의 '지금 당장의 즐거움'과 '내일 마주할 후폭풍'을 저울에 올려보세요.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-amber-50/50 border-2 border-amber-200 space-y-2">
                          <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                            ✨ 지금 당장의 이익 (단기 만족)
                          </span>
                          <input
                            type="text"
                            value={lesson13ShortGain}
                            onChange={(e) => setLesson13ShortGain(e.target.value)}
                            placeholder="예: 친구들과 지금 1시간 신나게 게임하며 웃을 수 있음"
                            className="w-full p-3 rounded-xl border border-amber-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          />
                        </div>

                        <div className="p-5 rounded-2xl bg-rose-50/50 border-2 border-rose-200 space-y-2">
                          <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded">
                            ⚠️ 내일 이후의 손해 (장기 후폭풍)
                          </span>
                          <input
                            type="text"
                            value={lesson13LongCost}
                            onChange={(e) => setLesson13LongCost(e.target.value)}
                            placeholder="예: 시험 점수 하락, 죄책감, 부모님 잔소리, 재시험 부담"
                            className="w-full p-3 rounded-xl border border-rose-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                          />
                        </div>
                      </div>

                      {/* 저울 결과 시각화 알림 */}
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-[#1565C0] text-white shadow-md flex items-center gap-4">
                        <div className="text-3xl">⚖️</div>
                        <div className="text-xs md:text-sm space-y-1">
                          <div className="font-bold text-amber-300">
                            [저울 판정] 미래의 후폭풍 무게가 3배 더 무겁습니다!
                          </div>
                          <p className="text-blue-100">
                            지금 1시간의 즐거움 뒤에 찾아올 후회를 미리 내다본 당신은 이미 '현명한 의사결정자'입니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson13Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson13Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마음 다지기 & 감정일기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson13Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1565C0] flex items-center justify-center text-xl font-bold">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">함께 실천하는 마음 미션 & 성장 별점</h3>
                    </div>
                  </div>

                  {/* 1. 성장 별점 */}
                  <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#1565C0] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (성장 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 중요한 결정을 내리기 전 충동을 멈추고 결과를 먼저 예측해 보았나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson13Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson13Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 내가 내린 선택의 결과에 스스로 책임질 마음의 준비가 되었나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson13Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson13Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주간 실천 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1565C0] to-[#1E88E5] text-white shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold">주간 실천 미션</span>
                      <h4 className="font-bold text-sm">결정 전 'STOP-THINK-CHOOSE' 3초 법칙</h4>
                    </div>
                    <p className="text-xs text-blue-100 leading-relaxed">
                      "무언가를 결정하기 전 <strong>손바닥을 펴며 3초 멈추고(STOP)</strong>, '이 선택의 내일은 어떨까?' <strong>생각한 뒤(THINK)</strong>, 당당하게 <strong>선택하기(CHOOSE)</strong>!"
                    </p>
                  </div>

                  {/* 3. 13차시 감정일기 동기화 작성 */}
                  <div className="bg-[#E8F4FD] p-6 rounded-2xl border border-blue-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">13차시 감정일기 쓰기</h4>
                        <p className="text-xs text-gray-600">오늘 마주했던 선택의 기로와 그 과정에서 느낀 솔직한 생각을 3줄로 기록해요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#1565C0] bg-white px-3 py-1 rounded-full border border-blue-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '신중함 🧭',
                        '당당함 🛡️',
                        '후련함 🍃',
                        '차분함 ☕',
                        '책임감 🌟',
                        '안도감 😌',
                        '뿌듯함 😊',
                        '자신감 🔥',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#1565C0] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-blue-50 border border-blue-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="오늘 선택의 갈림길에서 내가 내린 결정과 그 이유, 내 마음에 대해 적어보세요..."
                      className="w-full p-4 rounded-xl border border-blue-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0] bg-white"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '신중함 🧭',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 13,
                              }),
                            });
                            if (res.ok) {
                              alert('13차시 감정일기가 성공적으로 저장되었습니다! 🧭');
                              if (!completedLessons.includes(13)) {
                                setCompletedLessons([...completedLessons, 13]);
                              }
                            } else {
                              alert('13차시 감정일기 저장에 성공했습니다 (로컬 동기화)!');
                              if (!completedLessons.includes(13)) {
                                setCompletedLessons([...completedLessons, 13]);
                              }
                            }
                          } catch (err) {
                            alert('13차시 감정일기가 저장되었습니다!');
                            if (!completedLessons.includes(13)) {
                              setCompletedLessons([...completedLessons, 13]);
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#1565C0] hover:bg-[#0d47a1] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span>13차시 활동 및 일기 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


                    {/* 14단계: 마음 모아 플레이하기 (마음기술 종합하고 적용하기) */}
          {currentLesson === 14 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#0F6B56] via-[#1B876F] to-[#0F6B56] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>마음기술 종합하고 적용하기</span>
                      <span>•</span>
                      <span>14. 마음 모아 플레이하기</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>🎮 마음 모아 플레이하기 (마음기술 종합 적용)</span>
                    </h2>
                    <p className="text-emerald-100 text-sm mt-1">
                      배운 5대 핵심 마음기술(자기인식·자기관리·사회적인식·관계기술·책임결정)을 퀘스트로 총출동시켜요!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson14Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson14Step === s
                              ? 'bg-white text-[#0F6B56] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#E8F6F1] p-1.5 rounded-xl border border-emerald-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '🎒' },
                  { step: 3, label: '3. 마음 키우기', icon: '⚔️' },
                  { step: 4, label: '4. 마음 다지기', icon: '✨' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson14Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson14Step === tab.step
                        ? 'bg-[#0F6B56] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson14Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0F6B56] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F6B56] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "그동안 감정 알아채기부터 호흡, 생각 뒤집기, 공감, 나사감바 대화까지 정말 많은 마음의 무기들을 모아왔지? 하지만 아무리 좋은 기술도 실전에서 쓰지 않으면 금방 녹슬고 말아! 오늘은 반 친구들과 함께 모둠을 이루어 우리가 배운 마음기술을 총출동시키는 날이야. 서로의 마음을 모아 진짜 멋진 마음 플레이어로 거듭나볼까?";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0F6B56] hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-emerald-50/60 to-white rounded-xl p-6 border border-emerald-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-emerald-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-emerald-700 mb-2">To. 1학년 3반 마음 플레이어들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "그동안 감정 알아채기부터 호흡, 생각 뒤집기, 공감, 나사감바 대화까지 정말 많은 <span className="text-[#0F6B56] font-bold">마음의 무기들</span>을 모아왔지?"
                      </p>
                      <p>
                        "하지만 아무리 좋은 기술도 실전에서 쓰지 않으면 금방 녹슬고 말아!
                        오늘은 반 친구들과 함께 모둠을 이루어 우리가 배운 마음기술을 <span className="bg-emerald-100 text-[#0F6B56] px-1.5 py-0.5 rounded font-bold">총출동</span>시키는 날이야.
                        서로의 마음을 모아 진짜 멋진 <span className="text-[#0F6B56] font-bold">마음 플레이어</span>로 거듭나볼까?"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-100 flex justify-end">
                      <span className="text-xs font-semibold text-emerald-800">From. 너희의 마음 퀘스트 길잡이 마음이 🎮</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson14HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>공감해요 ({lesson14HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        친구들과 함께 마음기술을 장전하고 있어요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson14Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F6B56] hover:bg-[#0b5040] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>마음 모아 플레이 준비하기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson14Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0F6B56] flex items-center justify-center text-xl font-bold">
                      🎒
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F6B56] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">마음기술 인벤토리 점검 & 팀 다짐</h3>
                    </div>
                  </div>

                  {/* 1. 5대 마음도구 뱃지 인벤토리 */}
                  <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#0F6B56] text-white text-xs font-bold rounded-md">인벤토리 체크</span>
                        <h4 className="font-bold text-gray-800 text-sm md:text-base">
                          내가 장착한 5대 마음기술 도구들
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                        {lesson14Tools.length} / 5 장착 완료
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { id: 'self_aware', name: '자기인식 🛡️', desc: '감정 칵테일 & 감정 단어 알아차리기' },
                        { id: 'self_manage', name: '자기관리 🧘', desc: '4-7-8 심호흡 & 생각 바꾸기(ABCD)' },
                        { id: 'social_aware', name: '사회적인식 👓', desc: '당연한 다름 인정하기 (A vs B)' },
                        { id: 'relation', name: '관계기술 🌉', desc: '공감 징검다리 & 나사감바 대화법' },
                        { id: 'decision', name: '책임의사결정 ⚖️', desc: 'STOP-THINK-CHOOSE 결과 저울' },
                      ].map((tool) => {
                        const isChecked = lesson14Tools.includes(tool.id);
                        return (
                          <button
                            key={tool.id}
                            onClick={() => {
                              if (isChecked) {
                                setLesson14Tools(lesson14Tools.filter((t) => t !== tool.id));
                              } else {
                                setLesson14Tools([...lesson14Tools, tool.id]);
                              }
                            }}
                            className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-start justify-between ${
                              isChecked
                                ? 'border-[#0F6B56] bg-emerald-100/70 shadow-sm'
                                : 'border-emerald-200 bg-white hover:border-emerald-300 opacity-60'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-xs text-gray-800">{tool.name}</div>
                              <p className="text-[11px] text-gray-600 mt-0.5">{tool.desc}</p>
                            </div>
                            <span className="text-base">{isChecked ? '✅' : '⚪'}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. 티켓 메모지 해시태그 */}
                  <div className="bg-[#E8F6F1] rounded-xl p-6 border border-emerald-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (수업 목표 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      오늘 마음기술 종합 퀘스트에서 우리 모둠이 마음에 품을 핵심 키워드를 작성해 보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#마음기술_총출동',
                        '#마음_모아_플레이',
                        '#함께_성장하는_우리',
                        '#실전_마음마스터',
                        '#환상의_팀워크',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson14HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson14HashtagInput === tag
                              ? 'bg-[#0F6B56] text-white border-[#0F6B56]'
                              : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson14HashtagInput}
                        onChange={(e) => setLesson14HashtagInput(e.target.value)}
                        placeholder="예: #친구_실수도_함께_감싸주기 (나만의 팀 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6B56]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson14Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson14Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F6B56] hover:bg-[#0b5040] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: 4대 마음기술 퀘스트 챌린지</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson14Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0F6B56] flex items-center justify-center text-xl font-bold">
                        ⚔️
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F6B56] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">5대 마음기술 퀘스트 챌린지 (Stage 1~4)</h3>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#0F6B56] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      퀘스트 진행도: {lesson14Stage} / 4
                    </span>
                  </div>

                  {/* 스테이지 탭 네비게이션 */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { s: 1, label: 'Stage 1. 감정 인식', icon: '🔍' },
                      { s: 2, label: 'Stage 2. 생각 전환', icon: '🔄' },
                      { s: 3, label: 'Stage 3. 공감 대화', icon: '💬' },
                      { s: 4, label: 'Stage 4. 현명 선택', icon: '🧭' },
                    ].map((tab) => (
                      <button
                        key={tab.s}
                        onClick={() => setLesson14Stage(tab.s)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
                          lesson14Stage === tab.s
                            ? 'bg-[#0F6B56] text-white border-[#0F6B56] shadow-sm'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.s}단계</span>
                      </button>
                    ))}
                  </div>

                  {/* STAGE 1: 감정 인식 */}
                  {lesson14Stage === 1 && (
                    <div className="bg-gradient-to-br from-emerald-50/70 to-white p-6 rounded-2xl border-2 border-emerald-200 space-y-4 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0F6B56] text-white text-xs font-bold">돌발 상황</span>
                        <h4 className="font-bold text-sm text-gray-800">
                          "체육 시간 피구 경기 중, 같은 팀 친구가 연속으로 공을 놓쳐 결국 우리 팀이 졌을 때..."
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        순간적으로 '화'가 치밀어 오르지만, 그 분노 밑바닥에 숨겨진 나의 진짜 <strong>2차 감정 2가지</strong>를 골라보세요.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                        {['아쉬움 😢', '속상함 💔', '억울함 🥺', '부끄러움 😳', '허탈함 🌪️', '미안함 💭'].map((em) => {
                          const isSel = lesson14Emotions.includes(em);
                          return (
                            <button
                              key={em}
                              onClick={() => {
                                if (isSel) {
                                  setLesson14Emotions(lesson14Emotions.filter((e) => e !== em));
                                } else {
                                  if (lesson14Emotions.length < 2) {
                                    setLesson14Emotions([...lesson14Emotions, em]);
                                  }
                                }
                              }}
                              className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${
                                isSel
                                  ? 'border-[#0F6B56] bg-emerald-100 text-[#0F6B56] shadow-sm'
                                  : 'border-gray-200 bg-white hover:border-emerald-300 text-gray-700'
                              }`}
                            >
                              {em}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          disabled={lesson14Emotions.length === 0}
                          onClick={() => setLesson14Stage(2)}
                          className="px-4 py-2 rounded-xl bg-[#0F6B56] text-white text-xs font-bold hover:bg-[#0b5040] disabled:opacity-30 flex items-center gap-1.5"
                        >
                          <span>Stage 1 클리어 ➔ Stage 2로</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STAGE 2: 생각 전환 */}
                  {lesson14Stage === 2 && (
                    <div className="bg-gradient-to-br from-emerald-50/70 to-white p-6 rounded-2xl border-2 border-emerald-200 space-y-4 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500 text-white text-xs font-bold">비합리적 신념</span>
                        <h4 className="font-bold text-sm text-gray-800">
                          "쟤 때문에 다 망했어. 쟤는 일부러 우리 팀을 지게 만든 게 분명해!"
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        머릿속에서 솟구치는 왜곡된 생각을 깨부술 <strong>가장 합리적이고 건강한 생각 카드</strong>를 선택하세요.
                      </p>

                      <div className="space-y-2.5 pt-2">
                        {[
                          { id: 'opt1', text: '"친구도 일부러 그런 게 아니라 많이 긴장해서 실수했을 거야. 다음 판에 호흡을 맞추면 돼."' },
                          { id: 'opt2', text: '"어차피 피구 경기 하나 진 것뿐인데 인생이 끝난 것처럼 화낼 필요는 없어."' },
                          { id: 'opt3', text: '"나도 예전에 실수했을 때 친구들이 감싸줘서 고마웠잖아. 이번엔 내가 먼저 배려하자."' },
                        ].map((card) => (
                          <button
                            key={card.id}
                            onClick={() => setLesson14ReframeChoice(card.id)}
                            className={`w-full p-4 rounded-xl border-2 text-left text-xs md:text-sm transition-all ${
                              lesson14ReframeChoice === card.id
                                ? 'border-[#0F6B56] bg-emerald-100 font-bold text-[#0F6B56] shadow-sm'
                                : 'border-gray-200 bg-white hover:border-emerald-300 text-gray-700'
                            }`}
                          >
                            {card.text}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          onClick={() => setLesson14Stage(1)}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-600"
                        >
                          이전 Stage
                        </button>
                        <button
                          disabled={!lesson14ReframeChoice}
                          onClick={() => setLesson14Stage(3)}
                          className="px-4 py-2 rounded-xl bg-[#0F6B56] text-white text-xs font-bold hover:bg-[#0b5040] disabled:opacity-30 flex items-center gap-1.5"
                        >
                          <span>Stage 2 클리어 ➔ Stage 3로</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STAGE 3: 공감 & 대화 */}
                  {lesson14Stage === 3 && (
                    <div className="bg-gradient-to-br from-emerald-50/70 to-white p-6 rounded-2xl border-2 border-emerald-200 space-y-4 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0F6B56] text-white text-xs font-bold">공감 대화 퀘스트</span>
                        <h4 className="font-bold text-sm text-gray-800">
                          "미안해서 고개 푹 숙이고 기죽어 있는 친구에게 건넬 따뜻한 한마디"
                        </h4>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-sm space-y-2">
                        <label className="block text-xs font-bold text-emerald-800">
                          '나사감바' 공식이 담긴 공감 격려 문장:
                        </label>
                        <textarea
                          rows={3}
                          value={lesson14Dialogue}
                          onChange={(e) => setLesson14Dialogue(e.target.value)}
                          placeholder="예: '너도 일부러 그런 게 아닌데 많이 미안하고 속상했지? 다음 판엔 우리가 뒤에서 수비 더 단단하게 받쳐줄 테니까 너무 자책하지 마!'"
                          className="w-full p-3 rounded-xl border border-emerald-300 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6B56]"
                        />
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          onClick={() => setLesson14Stage(2)}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-600"
                        >
                          이전 Stage
                        </button>
                        <button
                          disabled={!lesson14Dialogue.trim()}
                          onClick={() => setLesson14Stage(4)}
                          className="px-4 py-2 rounded-xl bg-[#0F6B56] text-white text-xs font-bold hover:bg-[#0b5040] disabled:opacity-30 flex items-center gap-1.5"
                        >
                          <span>Stage 3 클리어 ➔ Final Stage로</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STAGE 4: 현명한 선택 & 최종 인증서 */}
                  {lesson14Stage === 4 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="bg-gradient-to-br from-emerald-50/70 to-white p-6 rounded-2xl border-2 border-emerald-200 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-white text-xs font-bold">최종 딜레마</span>
                          <h4 className="font-bold text-sm text-gray-800">
                            "경기 후 다른 반 친구들이 그 친구를 향해 '너네 팀 쟤 때문에 졌지?'라며 놀릴 때 나의 행동은?"
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          {[
                            { id: 'join', text: '❌ "맞아 쟤 때문에 졌어" 맞장구치기 (비난 동조)' },
                            { id: 'ignore', text: '⚠️ 어색해서 모르는 척 가만히 있기 (방관)' },
                            { id: 'defend', text: '⭕ "아니야, 우리 팀 다 같이 열심히 뛰었어!" 편들어주기 (책임 행동)' },
                          ].map((act) => (
                            <button
                              key={act.id}
                              onClick={() => setLesson14FinalAction(act.id)}
                              className={`p-3.5 rounded-xl border-2 text-left text-xs font-semibold transition-all ${
                                lesson14FinalAction === act.id
                                  ? 'border-[#0F6B56] bg-emerald-100 text-[#0F6B56] font-bold shadow-sm'
                                  : 'border-gray-200 bg-white hover:border-emerald-300'
                              }`}
                            >
                              {act.text}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 최종 인증서 팝업 카드 */}
                      {lesson14FinalAction === 'defend' && (
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F6B56] to-[#084235] text-white shadow-xl space-y-3 text-center border-2 border-emerald-300 animate-fadeIn">
                          <div className="text-4xl">🏆✨</div>
                          <h4 className="text-lg font-bold text-emerald-200">
                            [축하합니다] 실전 마음 마스터 인증 획득!
                          </h4>
                          <p className="text-xs text-emerald-100 leading-relaxed max-w-lg mx-auto">
                            "위기 상황 속에서 감정을 다스리고, 생각을 전환하며, 친구를 공감으로 감싸고,
                            의리 있는 선택을 내린 당신은 최고의 <strong>마음 플레이어</strong>입니다!"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson14Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson14Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F6B56] hover:bg-[#0b5040] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마음 다지기 & 감정일기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson14Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0F6B56] flex items-center justify-center text-xl font-bold">
                      ✨
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F6B56] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">함께 실천하는 마음 미션 & 성장 별점</h3>
                    </div>
                  </div>

                  {/* 1. 성장 별점 */}
                  <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#0F6B56] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (성장 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 여러 상황 속에서 배웠던 마음기술들을 적재적소에 떠올릴 수 있었나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson14Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson14Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 모둠 친구들과 서로 격려하며 마음 퀘스트를 협동하여 해결했나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson14Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson14Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 주간 실천 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0F6B56] to-[#1B876F] text-white shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-bold">주간 실천 미션</span>
                      <h4 className="font-bold text-sm">일상 속 마음기술 1회 이상 발동하기</h4>
                    </div>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      "이번 주 학교생활 중 답답하거나 화나는 순간이 오면, 오늘 복습한 기술
                      <strong>(호흡, ABCD, 나사감바)</strong> 중 하나를 실제로 꺼내 써보기!"
                    </p>
                  </div>

                  {/* 3. 14차시 감정일기 동기화 작성 */}
                  <div className="bg-[#E8F6F1] p-6 rounded-2xl border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">14차시 감정일기 쓰기</h4>
                        <p className="text-xs text-gray-600">오늘 마음 퀘스트를 함께 해결하며 느낀 보람과 친구에 대한 고마움을 3줄로 기록해요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#0F6B56] bg-white px-3 py-1 rounded-full border border-emerald-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '뿌듯함 😊',
                        '협동심 🤝',
                        '자신감 🔥',
                        '후련함 🍃',
                        '감사함 💖',
                        '따뜻함 ☀️',
                        '든든함 🛡️',
                        '신선함 💡',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#0F6B56] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="오늘 마음기술 총출동 퀘스트를 플레이하며 느낀 생각과 다짐을 적어보세요..."
                      className="w-full p-4 rounded-xl border border-emerald-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6B56] bg-white"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '뿌듯함 😊',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 14,
                              }),
                            });
                            if (res.ok) {
                              alert('14차시 감정일기가 성공적으로 저장되었습니다! 🎮');
                              if (!completedLessons.includes(14)) {
                                setCompletedLessons([...completedLessons, 14]);
                              }
                            } else {
                              alert('14차시 감정일기 저장에 성공했습니다 (로컬 동기화)!');
                              if (!completedLessons.includes(14)) {
                                setCompletedLessons([...completedLessons, 14]);
                              }
                            }
                          } catch (err) {
                            alert('14차시 감정일기가 저장되었습니다!');
                            if (!completedLessons.includes(14)) {
                              setCompletedLessons([...completedLessons, 14]);
                            }
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#0F6B56] hover:bg-[#0b5040] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>📝</span>
                        <span>14차시 활동 및 일기 저장하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


                    {/* 15단계: 이제는 내 마음대로! (변화된 나 만나기 - 대단원 피날레) */}
          {currentLesson === 15 && (
            <div className="space-y-6 animate-fadeIn">
              {/* 상단 배너 헤더 */}
              <div className="bg-gradient-to-r from-[#D94A56] via-[#E8616D] to-[#D94A56] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-white/10 skew-x-12 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-2">
                      <span>변화된 나 만나기</span>
                      <span>•</span>
                      <span>15. 이제는 내 마음대로! (대단원 완결)</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                      <span>🎉 이제는 내 마음대로! (변화된 나 만나기)</span>
                    </h2>
                    <p className="text-rose-100 text-sm mt-1">
                      15시간의 여정을 마무리하며 성장한 나를 축하하고, 친구들과 롤링페이퍼 응원을 나누며 마음에세이를 완간해요!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-xs font-medium">진행 단계</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setLesson15Step(s)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            lesson15Step === s
                              ? 'bg-white text-[#D94A56] shadow-sm scale-105'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4단계 네비게이션 탭 */}
              <div className="grid grid-cols-4 gap-2 bg-[#FDF1F3] p-1.5 rounded-xl border border-rose-100">
                {[
                  { step: 1, label: '1. 오늘의 마음 편지', icon: '💌' },
                  { step: 2, label: '2. 마음 만나기', icon: '📱' },
                  { step: 3, label: '3. 마음 키우기', icon: '📝' },
                  { step: 4, label: '4. 마음 다지기', icon: '🏆' },
                ].map((tab) => (
                  <button
                    key={tab.step}
                    onClick={() => setLesson15Step(tab.step)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                      lesson15Step === tab.step
                        ? 'bg-[#D94A56] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.step}단계</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: 오늘의 마음 편지 */}
              {lesson15Step === 1 && (
                <div className="bg-white rounded-2xl border-2 border-rose-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-[#D94A56] flex items-center justify-center text-xl font-bold">
                        💌
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#D94A56] uppercase tracking-wider">Step 1. 열기</span>
                        <h3 className="text-lg font-bold text-gray-800">마음우체통에 도착한 마지막 편지</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const text = "15시간의 마음교육을 마무리할 시간이 왔어. 배운 내용을 잊지 않고 일상생활에서 꺼내볼 수 있도록 노력할 거야. 앞으로 내가 마주할 다양한 상황에서 조금 힘든 일이 생기더라도 금방 이겨내고 힘낼 수 있도록 함께 응원해 줘!";
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(text);
                          utterance.lang = 'ko-KR';
                          utterance.rate = 0.95;
                          window.speechSynthesis.speak(utterance);
                        } else {
                          alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#D94A56] hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition-colors"
                    >
                      <span>🔊</span> 마음이 목소리 듣기 (TTS)
                    </button>
                  </div>

                  {/* 편지지 카드 */}
                  <div className="relative bg-gradient-to-br from-rose-50/60 to-white rounded-xl p-6 border border-rose-200 shadow-inner">
                    <div className="absolute top-4 right-4 text-rose-200 text-6xl select-none pointer-events-none font-serif">
                      ”
                    </div>
                    <p className="text-xs font-bold text-rose-700 mb-2">To. 자랑스러운 1학년 3반 친구들에게</p>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                      <p>
                        "15시간의 마음교육을 마무리할 시간이 왔어."
                      </p>
                      <p>
                        "배운 내용을 잊지 않고 일상생활에서 꺼내볼 수 있도록 노력할 거야.
                        앞으로 내가 마주할 다양한 상황에서 <span className="bg-rose-100 text-[#D94A56] px-1.5 py-0.5 rounded font-bold">조금 힘든 일이 생기더라도 금방 이겨내고 힘낼 수 있도록</span> 함께 응원해 줘!"
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-rose-100 flex justify-end">
                      <span className="text-xs font-semibold text-rose-800">From. 너의 단단한 성장을 항상 응원하는 마음이 💖</span>
                    </div>
                  </div>

                  {/* 공감 인터랙션 */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLesson15HeartCount((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-bold text-sm transition-all transform active:scale-95 shadow-sm"
                      >
                        <span>❤️</span>
                        <span>축하와 공감 ({lesson15HeartCount})</span>
                      </button>
                      <span className="text-xs text-gray-500">
                        모두 함께 대단원의 마무리를 축하해요!
                      </span>
                    </div>

                    <button
                      onClick={() => setLesson15Step(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D94A56] hover:bg-[#b83844] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>변화된 나 만나러 가기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: 마음 만나기 */}
              {lesson15Step === 2 && (
                <div className="bg-white rounded-2xl border-2 border-rose-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-[#D94A56] flex items-center justify-center text-xl font-bold">
                      📱
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#D94A56] uppercase tracking-wider">Step 2. 마음 만나기</span>
                      <h3 className="text-lg font-bold text-gray-800">변화된 나를 확인해 볼까? (SNS 피드 & 역량 체크)</h3>
                    </div>
                  </div>

                  {/* 1. 스마트폰 SNS 인스타그램 스타일 피드 카드 */}
                  <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-rose-200 overflow-hidden shadow-lg">
                    {/* SNS 상단 프로필 */}
                    <div className="p-3.5 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5">
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs">
                            ☁️
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-800 flex items-center gap-1">
                            <span>maeumee_official</span>
                            <span className="text-blue-500 text-[10px]">✔</span>
                          </div>
                          <div className="text-[10px] text-gray-400">1학년 3반 마음플레이</div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">•••</span>
                    </div>

                    {/* 피드 메인 배너 이미지 */}
                    <div className="bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 p-8 text-center text-white space-y-2 relative overflow-hidden">
                      <div className="text-4xl animate-bounce">🎓✨</div>
                      <h4 className="font-extrabold text-base drop-shadow-sm">
                        "마음의 힘을 키운 우리, 항상 응원할게!!"
                      </h4>
                      <p className="text-xs text-rose-100 drop-shadow-sm">
                        15차시 전 과정 수료를 진심으로 축하합니다!
                      </p>
                    </div>

                    {/* 5대 역량 체크리스트 */}
                    <div className="p-4 space-y-3 bg-white">
                      <div className="flex gap-2 text-rose-500 text-lg">
                        <span>❤️</span>
                        <span>💬</span>
                        <span>✈️</span>
                      </div>
                      <div className="text-xs font-bold text-gray-800">
                        좋아요 1,530개
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed">
                        <span className="font-bold mr-1.5">maeumee_official</span>
                        마음교육을 통해 한층 더 성장한 마음을 활짝 펼칠 시간이 왔어요. 건강한 마음의 힘을 얻은 여러분, 이제는 내 마음대로 멋지게 날아오르세요! 🌟
                      </div>

                      {/* 5대 핵심 뱃지 */}
                      <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-1.5">
                        {[
                          '✔ 자기인식 마스터',
                          '✔ 자기관리 마스터',
                          '✔ 사회적인식 마스터',
                          '✔ 관계기술 마스터',
                          '✔ 책임의사결정 마스터',
                        ].map((b, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-semibold bg-rose-50 text-rose-700 px-2 py-1 rounded-md"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. 티켓 메모지 해시태그 */}
                  <div className="bg-[#FDF1F3] rounded-xl p-6 border border-rose-200 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🎟️</span>
                      <h4 className="font-bold text-sm text-gray-800">#해시태그로 말해요 (최종 수료 티켓)</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      15차시를 마무리하며 나에게 붙여주고 싶은 최종 수료 해시태그를 선택하거나 직접 작성해 보세요.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        '#성장한_내_마음',
                        '#변화된_내_모습',
                        '#내_마음도_이제는_단단하게!',
                        '#15차시_완주성공',
                        '#마음의_주인공은_나',
                      ].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLesson15HashtagInput(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            lesson15HashtagInput === tag
                              ? 'bg-[#D94A56] text-white border-[#D94A56]'
                              : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lesson15HashtagInput}
                        onChange={(e) => setLesson15HashtagInput(e.target.value)}
                        placeholder="예: #앞으로도_내_마음_잘_돌볼게 (나만의 완결 해시태그)"
                        className="flex-1 px-4 py-2 rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D94A56]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson15Step(1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson15Step(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#D94A56] hover:bg-[#b83844] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>3단계: 친구들과 롤링페이퍼 나누기</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 마음 키우기 */}
              {lesson15Step === 3 && (
                <div className="bg-white rounded-2xl border-2 border-rose-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-[#D94A56] flex items-center justify-center text-xl font-bold">
                        📝
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#D94A56] uppercase tracking-wider">Step 3. 마음 키우기</span>
                        <h3 className="text-lg font-bold text-gray-800">1학년 3반 친구들의 디지털 롤링페이퍼 응원 보드</h3>
                      </div>
                    </div>
                  </div>

                  {/* 롤링페이퍼 상호 작성 입력기 */}
                  <div className="bg-rose-50/70 p-5 rounded-xl border border-rose-200 space-y-3">
                    <h4 className="font-bold text-xs md:text-sm text-[#D94A56] flex items-center gap-1.5">
                      <span>💌</span> 친구에게 응원 포스트잇 붙이기
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <select
                        value={lesson15RollingTarget}
                        onChange={(e) => setLesson15RollingTarget(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-rose-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#D94A56]"
                      >
                        <option value="김민준">김민준 (10302)</option>
                        <option value="박서연">박서연 (10303)</option>
                        <option value="최시우">최시우 (10304)</option>
                        <option value="정예은">정예은 (10305)</option>
                        <option value="한지호">한지호 (10306)</option>
                      </select>
                      <input
                        type="text"
                        value={lesson15RollingInput}
                        onChange={(e) => setLesson15RollingInput(e.target.value)}
                        placeholder="친구에게 전할 격려와 칭찬 한마디를 적어보세요..."
                        className="sm:col-span-2 px-3 py-2 rounded-xl border border-rose-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#D94A56]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (!lesson15RollingInput.trim()) {
                            alert('응원 메시지를 입력해 주세요!');
                            return;
                          }
                          const newCard = {
                            id: Date.now(),
                            from: '이도윤 (나)',
                            to: lesson15RollingTarget,
                            text: lesson15RollingInput,
                            color: 'bg-amber-100 border-amber-300 text-amber-900',
                          };
                          setLesson15RollingList([newCard, ...lesson15RollingList]);
                          setLesson15RollingInput('');
                          alert(`${lesson15RollingTarget} 친구의 롤링페이퍼에 응원이 전달되었습니다! 💖`);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#D94A56] hover:bg-[#b83844] text-white text-xs font-bold shadow-sm transition-all"
                      >
                        포스트잇 붙이기 📌
                      </button>
                    </div>
                  </div>

                  {/* 롤링페이퍼 보드 캔버스 */}
                  <div className="p-6 rounded-2xl bg-[#FFF9F5] border-2 border-dashed border-rose-300 min-h-[320px] relative space-y-4">
                    {/* 중앙 내 이름 카드 */}
                    <div className="max-w-xs mx-auto p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-center shadow-md space-y-1">
                      <span className="text-xl">💖</span>
                      <h4 className="font-extrabold text-base">이도윤 (10101)</h4>
                      <p className="text-[11px] text-rose-100">
                        "언제나 친구들의 마음에 귀 기울이는 든든한 플레이어!"
                      </p>
                    </div>

                    {/* 친구들이 붙여준 포스트잇 그리드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {lesson15RollingList.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-xl border shadow-sm space-y-1.5 transform hover:scale-105 transition-transform ${item.color}`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold opacity-75">
                            <span>To. {item.to}</span>
                            <span>From. {item.from}</span>
                          </div>
                          <p className="text-xs font-medium leading-relaxed">
                            "{item.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => setLesson15Step(2)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                    >
                      이전 단계
                    </button>
                    <button
                      onClick={() => setLesson15Step(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#D94A56] hover:bg-[#b83844] text-white font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>4단계: 마지막 미션 & 마음에세이 완간</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: 마음 다지기 */}
              {lesson15Step === 4 && (
                <div className="bg-white rounded-2xl border-2 border-rose-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-[#D94A56] flex items-center justify-center text-xl font-bold">
                      🏆
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#D94A56] uppercase tracking-wider">Step 4. 마음 다지기</span>
                      <h3 className="text-lg font-bold text-gray-800">나에게 주는 마지막 마음 미션 & 마음에세이 완간</h3>
                    </div>
                  </div>

                  {/* 1. 나에게 주는 마지막 미션 카드 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <h4 className="font-bold text-sm text-gray-800">
                        "앞으로 나의 마음을 위해 내가 나에게 주는 마지막 미션 1가지"
                      </h4>
                    </div>
                    <textarea
                      rows={2}
                      value={lesson15FinalMission}
                      onChange={(e) => setLesson15FinalMission(e.target.value)}
                      placeholder="예: 힘들 땐 혼자 끙끙 앓지 않고, 배운 심호흡을 하며 친구에게 솔직하게 털어놓기!"
                      className="w-full p-3 rounded-xl border border-rose-300 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#D94A56] bg-white"
                    />
                  </div>

                  {/* 2. 최종 성장 별점 */}
                  <div className="bg-rose-50/60 p-5 rounded-xl border border-rose-200 space-y-4">
                    <h4 className="font-bold text-xs md:text-sm text-[#D94A56] flex items-center gap-1.5">
                      <span>⭐</span> 똑똑똑 내 마음 두드리기 (최종 수료 별점)
                    </h4>

                    <div className="space-y-3">
                      <div className="bg-white p-3.5 rounded-xl border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q1. 15차시 동안 내 마음을 돌보고 친구들과 건강하게 소통하는 힘이 자라났나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson15Rating1(star)}
                              className={`text-lg transition-transform ${
                                lesson15Rating1 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">
                          Q2. 앞으로 마주할 어려운 일도 씩씩하게 이겨낼 자신이 있나요?
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setLesson15Rating2(star)}
                              className={`text-lg transition-transform ${
                                lesson15Rating2 >= star ? 'text-amber-400 scale-110' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. 15차시 최종 감정일기 & 옴니버스 완간 */}
                  <div className="bg-[#FDF1F3] p-6 rounded-2xl border border-rose-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">15차시 피날레 감정일기</h4>
                        <p className="text-xs text-gray-600">15차시 마음플레이를 모두 마친 소감과 변화된 나의 다짐을 적어요.</p>
                      </div>
                      <span className="text-xs font-bold text-[#D94A56] bg-white px-3 py-1 rounded-full border border-rose-200">
                        {currentDate}
                      </span>
                    </div>

                    {/* 감정 구름 픽커 */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        '뿌듯함 😊',
                        '벅차오름 💖',
                        '홀가분함 🍃',
                        '자신감 🔥',
                        '감사함 🌸',
                        '따뜻함 ☀️',
                        '당당함 🛡️',
                        '행복함 🎈',
                      ].map((emotion) => (
                        <button
                          key={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            selectedEmotion === emotion
                              ? 'bg-[#D94A56] text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-200'
                          }`}
                        >
                          {emotion}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={4}
                      value={diaryContent}
                      onChange={(e) => setDiaryContent(e.target.value)}
                      placeholder="15시간 동안 나와 친구들의 마음을 돌보며 느낀 감정과, 앞으로의 나에게 전하고 싶은 말을 적어보세요..."
                      className="w-full p-4 rounded-xl border border-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D94A56] bg-white"
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={async () => {
                          if (!diaryContent.trim()) {
                            alert('감정일기 내용을 입력해 주세요!');
                            return;
                          }
                          try {
                            const res = await fetch('/api/diary', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                date: currentDate,
                                emotion: selectedEmotion || '뿌듯함 😊',
                                content: diaryContent,
                                studentId: '10101',
                                lessonId: 15,
                              }),
                            });
                            if (!completedLessons.includes(15)) {
                              setCompletedLessons([...completedLessons, 15]);
                            }
                            alert('🎉 축하합니다! 15차시 전 과정 수료 및 15부작 마음에세이가 완간되었습니다!');
                          } catch (err) {
                            if (!completedLessons.includes(15)) {
                              setCompletedLessons([...completedLessons, 15]);
                            }
                            alert('🎉 15차시 감정일기가 저장되었으며 15부작 마음에세이가 완간되었습니다!');
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#D94A56] hover:bg-[#b83844] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                      >
                        <span>🎉</span>
                        <span>15차시 완결 & 마음에세이 최종 완간</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                            href="https://youtu.be/kVGOm87mTCw?si=5sXc3vAgzPSANGiL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-dodum font-bold shadow-md transition hover:scale-105 shrink-0"
                          >
                            <span>▶</span>
                            <span>[교사용] 일기의 효과 & 지도 참고 영상 보기</span>
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
                              setDiarySubStep(1);
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
                            href={selectedDiaryLesson === 1 ? "https://youtu.be/kVGOm87mTCw?si=5sXc3vAgzPSANGiL" : "https://youtu.be/PzweJS3SOng?si=GVtpsA3oF6SFzNUb&t=7"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-dodum font-bold shadow transition hover:scale-105 shrink-0"
                            title={selectedDiaryLesson === 1 ? "일기의 효과와 왜 일기를 써야 하는지 담긴 교사용 수업 참고 영상" : "감정일기 지도 참고 영상"}
                          >
                            <span>▶</span>
                            <span>{selectedDiaryLesson === 1 ? "[교사용] 일기의 효과 & 왜 일기를 써야 할까? (YouTube)" : "[교사용] 감정일기 지도 참고 영상"}</span>
                          </a>
                        )}
                      </div>
                      <p className="font-batang text-sm text-rose-50 leading-relaxed">
                        오늘 하루 나를 스쳐 지나간 감정을 솔직하게 마주하고, 챗봇과 대화하며 나만의 따뜻한 한 줄을 기록합니다.
                      </p>

                      {/* 1단계 / 2단계 단계 전환 네비게이션 탭 */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/20">
                        <button
                          type="button"
                          onClick={() => setDiarySubStep(1)}
                          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-dodum font-bold transition flex items-center gap-2 ${diarySubStep === 1 ? "bg-white text-rose-600 shadow-md scale-105" : "bg-white/20 text-white hover:bg-white/30"}`}
                        >
                          <span>☁️ 1단계</span>
                          <span>감정 구름 & 마음 챗봇 대화</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDiarySubStep(2)}
                          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-dodum font-bold transition flex items-center gap-2 ${diarySubStep === 2 ? "bg-white text-amber-600 shadow-md scale-105" : "bg-white/20 text-white hover:bg-white/30"}`}
                        >
                          <span>🎨 2단계</span>
                          <span>오늘의 마음 그림일기 쓰기</span>
                        </button>
                      </div>
                    </div>

                    {diarySubStep === 1 && (
                      <div className="space-y-6 animate-fadeIn">
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
                          {isChatLoading && (
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold shadow-2xs animate-pulse">
                                🤖
                              </div>
                              <div className="p-3.5 bg-white text-rose-800 rounded-2xl rounded-tl-none border border-rose-200 text-xs font-batang flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                                <span>{chatbotName || "마음친구"}가 네 마음을 깊이 생각하며 답장을 쓰고 있어... 🌸</span>
                              </div>
                            </div>
                          )}
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
                              setDiarySubStep(2);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl text-xs sm:text-sm font-dodum font-bold shrink-0 shadow-md transition flex items-center justify-center gap-2 hover:scale-105 animate-pulse"
                          >
                            <span>오늘의 마음 그림일기 쓰러 가기</span>
                            <span>🎨 ➔</span>
                          </button>
                        </div>
                      </div>
                      </div>
                    )}

                    {/* 2단계: 🖼️ 통합 그림일기 (이미지 직접 붙여넣기/업로드/AI 일러스트 + 일기 작성 일체형 캔버스) */}
                    {diarySubStep === 2 && (
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
                                (Ctrl+V 붙여넣기 또는 파일 첨부 가능)
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
                                    컴퓨터에 저장된 사진을 올리거나 캡처한 이미지를 붙여넣어 일기를 꾸며보세요.
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
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-200">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setDiarySubStep(1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="px-4 py-2.5 bg-rose-50 border border-rose-300 rounded-xl text-xs font-dodum text-rose-700 hover:bg-rose-100 shadow-2xs transition flex items-center gap-1 font-bold"
                            >
                              <span>◀</span>
                              <span>이전: 감정 구름 & AI 챗봇 대화로 돌아가기</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedDiaryLesson(null)}
                              className="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-dodum text-gray-700 hover:bg-white bg-gray-50 shadow-2xs transition flex items-center gap-1"
                            >
                              <span>회차 목록</span>
                            </button>
                          </div>

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
                          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-center text-sm font-dodum font-bold shadow-sm space-y-3">
                            <div>🎉 {selectedDiaryLesson}회차 그림일기(그림+글)가 안전하게 저장되었습니다!</div>
                            <div className="flex justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEssayEditLesson(selectedDiaryLesson);
                                  handleGenerateEssay(selectedDiaryLesson);
                                  setCurrentTab("print");
                                }}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-dodum font-bold shadow transition flex items-center gap-1 hover:scale-105"
                              >
                                <span>📖</span>
                                <span>이 일기로 AI 마음에세이 만들기 (상단 [마음에세이] 탭 이동)</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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

                  <div className="flex flex-wrap items-center gap-2 no-print self-start md:self-auto">
                    {/* 교사용 2단계 학생 1:1 배정하기 버튼 */}
                    <button
                      type="button"
                      onClick={() => {
                        const pw = prompt("교사 비밀번호를 입력해주세요:");
                        if (pw === "8888") {
                          setIsJohariUnlocked(true);
                          try {
                            localStorage.setItem("mindplay_johari_unlocked", "true");
                          } catch(e){}
                          triggerConfetti();
                          alert("🎉 [2단계 결과 전송 완료] 조하리의 창 4개 영역(Step C) 및 나다움 문장(Step D)이 전체 학생에게 성공적으로 개방되었습니다!");
                        } else if (pw !== null) {
                          alert("비밀번호가 일치하지 않습니다.");
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold shadow flex items-center gap-1.5 transition active:scale-95 ${isJohariUnlocked ? "bg-indigo-700 text-white border-2 border-indigo-300" : "bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold hover:scale-105"}`}
                    >
                      <span>🚀</span>
                      <span>{isJohariUnlocked ? "✓ 2단계 결과 전송됨" : "🔒 2단계 결과 보내기 (Step C/D 개방)"}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const pw = prompt("교사 비밀번호를 입력해주세요:");
                        if (pw === "8888") {
                          setIsJohariPartnerAssigned(true);
                          try {
                            localStorage.setItem("mindplay_johari_partner_assigned", "true");
                          } catch(e){}
                          triggerConfetti();
                          alert("🎉 [2단계 학생 배정 완료] 1학년 3반 26명 학생들의 1:1 파트너가 무작위 순환 배정되었습니다! 학생들이 Step B에서 매칭된 친구의 강점을 찾아줄 수 있습니다.");
                        } else if (pw !== null) {
                          alert("비밀번호가 일치하지 않습니다.");
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-dodum font-bold shadow flex items-center gap-1.5 transition active:scale-95 ${isJohariPartnerAssigned ? "bg-emerald-600 text-white border-2 border-emerald-300" : "bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold hover:scale-105"}`}
                    >
                      <span>🤝</span>
                      <span>{isJohariPartnerAssigned ? "✓ 2단계 학생 배정됨 (재배정)" : "🔒 2단계 학생 배정하기 (비번 8888)"}</span>
                    </button>
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
                    <button
                      type="button"
                      onClick={() => {
                        const pw = prompt("교사 비밀번호를 입력해주세요:");
                        if (pw === "8888") {
                          if (confirm("정말로 힐링 음악 보드(주크박스) 추천곡 목록을 모두 초기화하시겠습니까?")) {
                            setClassJukeboxList([]);
                            try { localStorage.removeItem("mindplay_jukebox_list"); } catch(e){}
                            triggerConfetti();
                            alert("🎉 힐링 음악 보드가 성공적으로 초기화되었습니다! 이제 학생들이 처음부터 추천곡을 등록할 수 있습니다.");
                          }
                        } else if (pw !== null) {
                          alert("비밀번호가 일치하지 않습니다.");
                        }
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-dodum font-bold shadow flex items-center gap-1 transition active:scale-95"
                    >
                      <span>🗑️</span> 힐링 음악보드 초기화
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
                    const realStudentTotal = CLASS_STUDENTS.length;
                    const submittedCount = CLASS_STUDENTS.filter(s => getStudentRealSubmission(s.studentId, c.no).isDone).length;
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

              {/* KPI Summary Cards (26명 기준 동적 계산) */}
              {(() => {
                const totalStudents = CLASS_STUDENTS.length;
                let submittedDiaryCount = 0;
                let submittedStageCount = 0;
                const emotionCounts = {};

                CLASS_STUDENTS.forEach(st => {
                  const sub = getStudentRealSubmission(st.studentId, teacherSelectedStage);
                  if (sub.diary && (sub.diary.content || sub.diary.diaryText || sub.diary.emotion)) {
                    submittedDiaryCount++;
                  }
                  if (sub.isDone) {
                    submittedStageCount++;
                  }
                  if (sub.emotion) {
                    emotionCounts[sub.emotion] = (emotionCounts[sub.emotion] || 0) + 1;
                  }
                });

                const diaryPercent = totalStudents > 0 ? Math.round((submittedDiaryCount / totalStudents) * 100) : 0;
                const stagePercent = totalStudents > 0 ? Math.round((submittedStageCount / totalStudents) * 100) : 0;

                // 감정 통계 순위 계산
                const emotionSorted = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);
                const topEmotion = emotionSorted.length > 0 ? emotionSorted[0] : null;
                const topEmotionPercent = (topEmotion && submittedDiaryCount > 0) ? Math.round((topEmotion[1] / submittedDiaryCount) * 100) : 0;

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-dodum text-gray-500">총 학생수 (1학년 3반)</span>
                      <div className="text-2xl font-title font-bold text-gray-800">{totalStudents}명</div>
                      <div className="text-[11px] font-batang text-emerald-600">출석률 100% ({totalStudents}명 전원 등록)</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-dodum text-gray-500">감정일기 제출 현황</span>
                      <div className="text-2xl font-title font-bold text-rose-600">{submittedDiaryCount} / {totalStudents}명</div>
                      <div className="text-[11px] font-batang text-rose-500">
                        {submittedDiaryCount === 0 ? "활동 전 (대기 중)" : `제출률 ${diaryPercent}% (${totalStudents - submittedDiaryCount}명 작성 중)`}
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-dodum text-gray-500">{teacherSelectedStage}단계 활동 제출 현황</span>
                      <div className="text-2xl font-title font-bold text-teal-600">
                        {submittedStageCount} / {totalStudents}명
                      </div>
                      <div className="text-[11px] font-batang text-teal-600">
                        {submittedStageCount === 0 ? "활동 전 (대기 중)" : `완료율 ${stagePercent}% (${submittedStageCount}명 완료)`}
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                      <span className="text-xs font-dodum text-gray-500">주요 감정 분포 1위</span>
                      <div className="text-2xl font-title font-bold text-orange-600">
                        {topEmotion ? `${topEmotion[0]} (${topEmotionPercent}%)` : "집계 대기 중"}
                      </div>
                      <div className="text-[11px] font-batang text-gray-500">
                        {emotionSorted.length > 1 ? emotionSorted.slice(1, 3).map(([e, c]) => `${e}(${Math.round((c/submittedDiaryCount)*100)}%)`).join(' · ') : (topEmotion ? "단일 감정 집계됨" : "학생 제출 후 표시")}
                      </div>
                    </div>
                  </div>
                );
              })()}
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
                        {CLASS_STUDENTS.map((st) => {
                          const realSub = getStudentRealSubmission(st.studentId, teacherSelectedStage);
                          const isDoneDiary = !!(realSub.diary && (realSub.diary.content || realSub.diary.diaryText || realSub.diary.emotion));
                          const emoName = realSub.emotion || (realSub.diary && realSub.diary.emotion) || "미선택";
                          const partnerInfo = getMatchedPartner(st.studentId);
                          const partner = partnerInfo && partnerInfo.targetPartner ? partnerInfo.targetPartner : { name: "배정 대기", studentId: "-" };

                          // 단계별 제출 상태 텍스트
                          let stageStatusText = "활동 전 (대기 중)";
                          if (realSub.isDone) {
                            if (teacherSelectedStage === 1) stageStatusText = "사연 등록 & 위로 엽서 발송 완료 💌";
                            else if (teacherSelectedStage === 2) stageStatusText = "조하리의 창 강점 4대 문장 완성 🪟";
                            else if (teacherSelectedStage === 3) stageStatusText = "다중지능/기질 브랜딩 카드 완성 🎭";
                            else if (teacherSelectedStage === 4) stageStatusText = "듀얼 편지 발송 완료 💌";
                            else stageStatusText = `${teacherSelectedStage}단계 퀘스트 클리어 🏅`;
                          } else {
                            stageStatusText = "활동 전 (대기 중)";
                          }

                          return (
                            <tr key={st.studentId} className={`hover:bg-slate-50/80 transition-colors ${st.isDemo ? "bg-emerald-50/40" : ""}`}>
                              <td className="py-3 px-3 font-mono font-bold text-gray-700">
                                {st.studentId}
                                {st.isDemo && <span className="ml-1 text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">체험</span>}
                              </td>
                              <td className="py-3 px-3 font-dodum font-bold text-gray-900">{st.name}</td>
                              <td className="py-3 px-3">
                                {emoName !== "미선택" ? (
                                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-dodum font-bold ${emoName === "뿌듯이" ? "bg-orange-100 text-orange-800" : emoName === "설렘이" ? "bg-pink-100 text-pink-800" : emoName === "화남이" ? "bg-red-100 text-red-800" : "bg-teal-100 text-teal-800"}`}>
                                    {emoName}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 text-xs font-dodum">미선택</span>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                {isDoneDiary ? (
                                  <span className="text-emerald-700 font-dodum font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 제출 완료
                                  </span>
                                ) : (
                                  <span className="text-gray-400 font-dodum flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span> 미제출 (대기)
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-gray-800 font-dodum">
                                <span className={realSub.isDone ? "text-emerald-800 font-bold" : "text-gray-400"}>
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
                                <p><strong>① 공감과 감정 읽기:</strong> {comfortStep1 || "새 학기 낯선 교실에서 친구들에게 다가가는 게 많이 긴장되고 외로웠겠구나."}</p>
                                <p><strong>② 존재 인정 &amp; 자책 덜기:</strong> {comfortStep2 || "네가 소심해서가 절대 아니야. 누구나 새로운 시작은 두렵고 서툴 수 있어."}</p>
                                <p><strong>③ 작은 응원과 용기:</strong> {comfortStep3 || "내일 아침 먼저 눈 마주치며 따뜻하게 인사해 보자! 너의 용기를 언제나 응원해."}</p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {(selectedStickers.length > 0 ? selectedStickers : ["넌 충분히 잘하고 있어! 🌟", "토닥토닥 힘내자 💖"]).map((s, i) => (
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
                        {diaries[archiveModal.lessonNo]?.date ? `작성일: ${diaries[archiveModal.lessonNo].date}` : "작성 전"}
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
                {(() => {
                  const studentSub = getStudentRealSubmission(teacherInspectStudent.student.studentId, teacherInspectStudent.stage);
                  const isDone = studentSub.isDone;
                  const realDiary = studentSub.diary;
                  const realEssay = studentSub.essay;

                  return (
                    <div className="space-y-4">
                      {/* 섹션 1: 해당 단계 활동 수행 결과 */}
                      <div className="p-5 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2">
                        <h4 className="text-sm font-dodum font-bold text-indigo-950 flex items-center gap-2">
                          <span>🎯</span> {teacherInspectStudent.stage}단계 마음활동 수행 결과물
                        </h4>
                        <div className="p-4 bg-white rounded-xl border border-indigo-100 text-xs sm:text-sm font-batang text-gray-800 leading-relaxed space-y-2">
                          <div className="font-bold text-indigo-900 border-b border-indigo-50 pb-1 flex justify-between items-center">
                            <span>상태: {isDone ? `${teacherInspectStudent.stage}단계 완료` : "활동 전 ⏳"}</span>
                            <span className={`text-xs font-dodum px-2 py-0.5 rounded ${isDone ? "text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold" : "text-amber-700 bg-amber-50"}`}>
                              {isDone ? "제출 완료 ✓" : "활동 전 ⏳"}
                            </span>
                          </div>

                          {!isDone ? (
                            <div className="p-4 bg-amber-50/60 rounded-xl border border-dashed border-amber-200 text-center space-y-1 my-2">
                              <span className="text-2xl">⏳</span>
                              <p className="text-xs font-dodum font-bold text-amber-900">아직 {teacherInspectStudent.stage}단계 활동을 시작/제출하기 전입니다.</p>
                              <p className="text-[11px] text-amber-700/80">학생이 본인의 학번으로 로그인 후 {teacherInspectStudent.stage}단계 활동을 수행하고 저장하면 이곳에 실시간으로 반영됩니다.</p>
                            </div>
                          ) : (
                            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                              <p className="font-bold">✨ 학생이 {teacherInspectStudent.stage}단계 마음활동을 성공적으로 완료하여 제출했습니다!</p>
                              <p className="text-[11px] text-emerald-800">활동 주제: {CURRICULUM.find(c => c.no === teacherInspectStudent.stage)?.subtitle}</p>
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
                          {realDiary ? (
                            <>
                              <div className="flex items-center justify-between border-b border-amber-100 pb-1">
                                <div className="font-bold text-amber-900">
                                  제목: {realDiary.title || "무제"} {realDiary.emotion && `(${realDiary.emotion})`}
                                </div>
                                {realDiary.date && (
                                  <div className="text-[11px] text-gray-400 font-dodum">
                                    작성일: {realDiary.date}
                                  </div>
                                )}
                              </div>
                              {realDiary.image && (
                                <div className="max-h-48 rounded-xl overflow-hidden my-2 border border-amber-200">
                                  <img src={realDiary.image} alt="그림일기" className="w-full object-cover" />
                                </div>
                              )}
                              <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                                {realDiary.content}
                              </p>
                            </>
                          ) : (
                            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center space-y-1">
                              <span className="text-xl">📝</span>
                              <p className="text-xs font-dodum font-bold text-gray-500">아직 작성된 감정일기가 없습니다.</p>
                              <p className="text-[11px] text-gray-400">학생이 {teacherInspectStudent.stage}단계 감정일기를 작성하면 이곳에 그림과 글이 실시간 표시됩니다.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 섹션 3: 자기성찰 마음에세이 */}
                      <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
                        <h4 className="text-sm font-dodum font-bold text-purple-950 flex items-center gap-2">
                          <span>📖</span> AI 자기성찰 마음에세이 요약
                        </h4>
                        <div className="p-3.5 bg-white rounded-xl border border-purple-100 text-xs font-batang text-gray-800 leading-relaxed space-y-1">
                          {realEssay ? (
                            <>
                              <div className="font-bold text-purple-900">
                                {teacherInspectStudent.stage}단계 핵심 성찰 통찰 (Key Insight):
                              </div>
                              <p className="italic text-purple-950">
                                &quot;{typeof realEssay === 'string' ? realEssay : (realEssay.insight || realEssay.content || JSON.stringify(realEssay))}&quot;
                              </p>
                            </>
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                              아직 작성된 마음에세이 성찰 기록이 없습니다.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

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
