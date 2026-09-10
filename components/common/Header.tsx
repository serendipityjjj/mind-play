"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, User, Heart, Calendar, Printer, Award } from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";

interface HeaderProps {
  currentLessonNo: number;
  onSelectLesson: (lessonNo: number) => void;
  nickname: string;
  onUpdateNickname: (name: string) => void;
  onOpenNovelModal: () => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLessonNo,
  onSelectLesson,
  nickname,
  onUpdateNickname,
  onOpenNovelModal,
  completedCount,
}) => {
  const [isEditingNick, setIsEditingNick] = React.useState(false);
  const [tempNick, setTempNick] = React.useState(nickname);

  const handleNickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempNick.trim()) {
      onUpdateNickname(tempNick.trim());
      setIsEditingNick(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      {/* Main Header Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Slogan */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectLesson(1)}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-title font-bold text-[#1E3A2B] tracking-tight flex items-center gap-1.5">
              마음플레이
              <span className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full font-dodum font-normal ml-1">
                15차시 마음성장
              </span>
            </h1>
          </div>
        </div>

        {/* Action Controls: Lesson Selector, MyPage, Print, Novel Button */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          {/* Lesson Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-deepgreen-light px-3 py-1.5 rounded-xl border border-deepgreen/25 text-xs sm:text-sm font-badge">
            <Calendar className="w-4 h-4 text-deepgreen" />
            <select
              value={currentLessonNo}
              onChange={(e) => onSelectLesson(Number(e.target.value))}
              className="bg-transparent text-deepgreen font-bold text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              {CURRICULUM.map((lesson) => (
                <option key={lesson.lessonNo} value={lesson.lessonNo} className="text-gray-800 font-sans">
                  {lesson.lessonNo}차시: {lesson.topic.split("-")[0]}
                </option>
              ))}
            </select>
          </div>

          {/* MyPage Link */}
          <Link
            href="/mypage"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-badge text-gray-700 hover:bg-gray-50 shadow-2xs transition"
          >
            <Award className="w-3.5 h-3.5 text-rosepink" />
            <span className="font-bold">마이페이지</span>
          </Link>

          {/* Print Portfolio Link */}
          <Link
            href="/print-portfolio"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-badge text-gray-700 hover:bg-gray-50 shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-deepgreen" />
            <span className="font-bold">전시용 PDF</span>
          </Link>

          {/* Nickname Editor / Auth Link */}
          {isEditingNick ? (
            <form onSubmit={handleNickSubmit} className="flex items-center gap-1">
              <input
                type="text"
                value={tempNick}
                onChange={(e) => setTempNick(e.target.value)}
                maxLength={10}
                className="w-24 px-2 py-1 text-xs border rounded-lg border-deepgreen focus:outline-none font-badge"
                autoFocus
              />
              <button
                type="submit"
                className="px-2 py-1 bg-deepgreen text-white text-xs rounded-lg font-badge hover:bg-deepgreen-hover"
              >
                저장
              </button>
            </form>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-badge text-gray-700 hover:bg-gray-50 shadow-2xs transition"
              title="학생 계정 변경 / 로그인"
            >
              <User className="w-3.5 h-3.5 text-deepgreen" />
              <span className="font-bold text-gray-800">{nickname}</span>
              <span className="text-[10px] text-gray-400">👤</span>
            </Link>
          )}

          {/* 15-Lesson Novelizer Button */}
          <button
            type="button"
            onClick={onOpenNovelModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rosepink to-[#D85C72] text-white text-xs sm:text-sm font-badge font-bold shadow-md shadow-rosepink/25 hover:opacity-95 active:scale-95 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">15차시 성장 소설책</span>
            <span className="md:hidden">소설책</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};
