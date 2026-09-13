"use client";

import React, { useState } from "react";
import { DiaryEntry, NovelData, saveStoredNovel } from "@/lib/storage";
import { Sparkles, BookOpen, X, Loader2, CheckCircle, Wand2, Feather } from "lucide-react";

interface NovelizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  diaries: DiaryEntry[];
  onNovelGenerated: (novel: NovelData) => void;
}

export const NovelizerModal: React.FC<NovelizerModalProps> = ({
  isOpen,
  onClose,
  nickname,
  diaries,
  onNovelGenerated,
}) => {
  const [genre, setGenre] = useState("서정적 청소년 성장소설");
  const [mood, setMood] = useState("따뜻하고 희망찬 어조");
  const [customProtagonist, setCustomProtagonist] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  if (!isOpen) return null;

  const genres = [
    { id: "growth", label: "서정적 청소년 성장소설", icon: "🌱", desc: "사춘기의 고민과 내면의 성장을 섬세하게 그린 문학" },
    { id: "essay", label: "따뜻한 일상 감성 에세이", icon: "☕", desc: "매주 목요일의 마음을 담담하고 포근하게 엮은 산문" },
    { id: "fantasy", label: "마음 구름 모험 판타지", icon: "✨", desc: "8대 감정 구름 캐릭터들과 함께 떠나는 마음 여행기" },
    { id: "retro", label: "레트로 학원 청춘물", icon: "🎒", desc: "친구들과의 우정과 학교생활의 생생한 에피소드" },
  ];

  const moods = [
    "따뜻하고 희망찬 어조",
    "솔직하고 당당한 어조",
    "서정적이고 포근한 어조",
    "유쾌하고 발랄한 어조",
  ];

  const handleGenerateNovel = async () => {
    setIsLoading(true);
    setStatusMessage("1~15차시 감정일기와 활동 데이터를 종합하는 중...");

    try {
      setTimeout(() => {
        setStatusMessage("Upstage Solar AI가 감정선과 문학적 복선을 구성하는 중...");
      }, 1500);

      const res = await fetch("/api/novel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: customProtagonist.trim() || nickname,
          genre,
          mood,
          diaries,
        }),
      });

      const data = await res.json();
      if (data.novel) {
        saveStoredNovel(data.novel);
        onNovelGenerated(data.novel);
        onClose();
      } else {
        throw new Error(data.error || "Failed to generate novel");
      }
    } catch (err) {
      console.error(err);
      // Fallback generator client-side if API fails
      const fallbackNovel: NovelData = {
        id: `novel-${Date.now()}`,
        title: `${nickname}의 열다섯 번의 계절`,
        subtitle: `마음학기제 15차시 감정일기로 엮은 단편 성장 소설집`,
        author: nickname,
        genre,
        mood,
        createdAt: new Date().toISOString().split("T")[0],
        chapters: diaries.map((d, idx) => ({
          chapterNo: idx + 1,
          lessonNo: d.lessonNo,
          title: `제${idx + 1}장. ${d.lessonTitle}`,
          content: `${d.createdAt}의 기록.\n${d.diaryText}\n\n그날의 ${nickname}의 마음에는 ${d.emotionId} 구름이 조용히 피어올랐다. 흔들리는 파도 앞에서도 멈추지 않고 한 걸음씩 내디딘 그 시간들이 모여 단단한 나를 만들어가고 있었다.`,
          emotionEmoji: "🌸",
          quote: d.hashtags.join(" "),
        })),
        epilogue: `15주간의 마음 여행을 마치며, ${nickname}은 이제 어떤 감정의 파도가 밀려와도 자신만의 서핑보드를 탈 수 있는 멋진 사람이 되었다.`,
        summary: `8대 감정 구름과 함께 15주 동안 스스로를 마주하며 단단해진 ${nickname}의 마음 성장 서사.`,
      };
      saveStoredNovel(fallbackNovel);
      onNovelGenerated(fallbackNovel);
      onClose();
    } finally {
      setIsLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border-2 border-rosepink/30 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rosepink-light text-rosepink flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-xl font-bold text-gray-900">
                15차시 성장 소설집 집필하기 (Novelizer)
              </h3>
              <p className="font-sans text-xs text-gray-500">
                Upstage Solar API 기반 • 학생 신상 익명화 및 서정적 문학 각색
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Data Status Summary */}
        <div className="p-4 bg-deepgreen-light rounded-2xl border border-deepgreen/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-deepgreen" />
            <span className="text-xs sm:text-sm font-badge font-bold text-deepgreen">
              누적 일기 데이터: {diaries.length}개 차시 감정 기록 연동됨
            </span>
          </div>
          <span className="text-[11px] font-sans text-gray-600">
            주인공: <strong className="text-deepgreen">{nickname}</strong>
          </span>
        </div>

        {/* Form Options */}
        <div className="space-y-4">
          {/* Genre Selection */}
          <div>
            <label className="block text-xs font-badge font-bold text-gray-800 mb-2">
              ① 소설 장르 선택
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {genres.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGenre(g.label)}
                  className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                    genre === g.label
                      ? "border-rosepink bg-rosepink-light ring-2 ring-rosepink/20"
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{g.icon}</span>
                  <div>
                    <span className="text-xs font-title font-bold text-gray-900 block">
                      {g.label}
                    </span>
                    <span className="text-[11px] font-hand text-gray-600 block mt-0.5">
                      {g.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-xs font-badge font-bold text-gray-800 mb-2">
              ② 문체 및 서체 분위기
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-badge font-bold transition ${
                    mood === m
                      ? "bg-rosepink text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Protagonist Alias */}
          <div>
            <label className="block text-xs font-badge font-bold text-gray-800 mb-1">
              ③ 소설 속 주인공 가명 (선택 - 비워두면 닉네임 사용)
            </label>
            <input
              type="text"
              value={customProtagonist}
              onChange={(e) => setCustomProtagonist(e.target.value)}
              placeholder="예: 은우, 서연, 푸른솔 등"
              className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-rosepink font-hand"
            />
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2 animate-fadeIn">
            <Loader2 className="w-6 h-6 text-amber-600 animate-spin mx-auto" />
            <p className="font-badge text-xs sm:text-sm font-bold text-amber-900">
              {statusMessage}
            </p>
            <p className="font-hand text-xs text-amber-700">
              잠시만 기다려 주세요. 15차시의 감정 여정이 소설로 엮이고 있습니다...
            </p>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-badge hover:bg-gray-200"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleGenerateNovel}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rosepink to-[#D85C72] text-white rounded-xl text-xs sm:text-sm font-badge font-bold shadow-md hover:opacity-95 disabled:opacity-50 transition active:scale-95"
          >
            <Wand2 className="w-4 h-4" />
            <span>성장 소설 문집 집필 시작</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
