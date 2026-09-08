"use client";

import React, { useState } from "react";
import { NovelData } from "@/lib/storage";
import {
  ChevronLeft,
  ChevronRight,
  Printer,
  X,
  BookOpen,
  Share2,
  Sparkles,
  Bookmark,
} from "lucide-react";

interface FlipbookViewerProps {
  novel: NovelData;
  isOpen: boolean;
  onClose: () => void;
}

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  novel,
  isOpen,
  onClose,
}) => {
  // Page index: 0 = Cover, 1 = Intro / Table of contents, 2..N = Chapters (two chapters or one spread per view), Last = Epilogue & Back Cover
  const [currentPage, setCurrentPage] = useState<number>(0);

  if (!isOpen) return null;

  // Build Pages Array:
  // Page 0: Cover
  // Page 1: Prologue & Table of Contents
  // Page 2..N: Chapters
  // Last: Epilogue & Colophon
  const pages = [
    {
      type: "cover",
      title: novel.title,
      subtitle: novel.subtitle,
      author: novel.author,
      genre: novel.genre,
      mood: novel.mood,
      date: novel.createdAt,
    },
    {
      type: "prologue",
      title: "프롤로그: 마음에 띄우는 편지",
      summary: novel.summary,
      author: novel.author,
      chaptersList: novel.chapters,
    },
    ...novel.chapters.map((ch) => ({
      type: "chapter",
      chapterNo: ch.chapterNo,
      lessonNo: ch.lessonNo,
      title: ch.title,
      content: ch.content,
      emotionEmoji: ch.emotionEmoji,
      quote: ch.quote,
    })),
    {
      type: "epilogue",
      title: "에필로그: 열다섯 계절을 지나며",
      content: novel.epilogue,
      author: novel.author,
    },
  ];

  const totalPages = pages.length;

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrint = () => {
    window.print();
  };

  const page = pages[currentPage];

  return (
    <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-2 sm:p-4 animate-fadeIn">
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between px-4 py-2 text-white/90 mb-3 bg-stone-800/80 rounded-2xl border border-stone-700 shadow-lg">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span className="font-title text-sm font-bold text-white line-clamp-1">
            {novel.title}
          </span>
          <span className="text-xs font-badge text-stone-400 hidden sm:inline">
            ({novel.author} 지음)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Page Jump Select */}
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="bg-stone-700 text-white text-xs font-badge rounded-lg px-2 py-1 border border-stone-600 focus:outline-none"
          >
            {pages.map((p, idx) => (
              <option key={idx} value={idx}>
                {idx === 0
                  ? "표지"
                  : idx === 1
                  ? "프롤로그 / 목차"
                  : idx === totalPages - 1
                  ? "에필로그"
                  : `제${idx - 1}장 (${(p as any).title})`}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1 bg-stone-700 hover:bg-stone-600 text-white text-xs font-badge rounded-lg transition"
            title="인쇄 및 PDF로 내보내기"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">인쇄 / PDF</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Book Spread Frame */}
      <div className="w-full max-w-4xl h-[75vh] sm:h-[80vh] bg-[#FAF6F0] rounded-2xl shadow-book border-4 border-[#E4DBCB] relative overflow-hidden flex flex-col justify-between paper-texture">
        {/* Book Spine Center Gutter */}
        <div className="hidden sm:block absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 book-gutter pointer-events-none z-20 opacity-30" />

        {/* Dynamic Page Content Render */}
        <div className="flex-1 p-6 sm:p-12 overflow-y-auto">
          {/* COVER PAGE */}
          {page.type === "cover" && (
            <div className="h-full flex flex-col items-center justify-between text-center py-6 sm:py-12 animate-fadeIn">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-deepgreen text-white text-xs font-badge rounded-full font-bold">
                  대구광역시교육청 마음학기제 성장 문집
                </span>
                <p className="font-sans text-xs text-stone-500">{page.subtitle}</p>
              </div>

              <div className="space-y-4 my-8 max-w-lg">
                <div className="w-20 h-20 rounded-full bg-rosepink/10 text-rosepink flex items-center justify-center mx-auto text-4xl shadow-sm border border-rosepink/20">
                  📖
                </div>
                <h1 className="font-title text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-snug">
                  {page.title}
                </h1>
                <p className="font-hand text-base text-stone-600 italic">
                  &ldquo; 흔들리며 피어난 열다섯 송이의 마음 꽃 &rdquo;
                </p>
              </div>

              <div className="space-y-2 border-t border-stone-300/70 pt-4 w-full max-w-xs">
                <p className="font-badge text-sm font-bold text-stone-800">
                  지은이: {page.author}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-sans text-stone-500">
                  <span>장르: {page.genre}</span>
                  <span>•</span>
                  <span>{page.date} 발행</span>
                </div>
              </div>
            </div>
          )}

          {/* PROLOGUE & TABLE OF CONTENTS */}
          {page.type === "prologue" && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
              <div className="text-center border-b border-stone-300 pb-4">
                <span className="text-xs font-badge text-deepgreen font-bold">
                  PROLOGUE
                </span>
                <h2 className="font-title text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {page.title}
                </h2>
              </div>

              <div className="p-4 bg-white/70 rounded-2xl border border-stone-200 shadow-2xs font-novel text-lg sm:text-xl text-stone-800 leading-relaxed whitespace-pre-line">
                {page.summary}
              </div>

              {/* Table of contents */}
              <div className="space-y-2 pt-2">
                <h4 className="font-title text-sm font-bold text-stone-800 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-deepgreen" />
                  <span>차례 (목차)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-hand text-stone-700">
                  {(page as any).chaptersList?.map((ch: any) => (
                    <button
                      key={ch.chapterNo}
                      type="button"
                      onClick={() => setCurrentPage(ch.chapterNo + 1)}
                      className="text-left p-2 rounded-lg bg-white/50 hover:bg-deepgreen-light hover:text-deepgreen transition flex items-center justify-between border border-stone-200/50"
                    >
                      <span className="line-clamp-1">{ch.title}</span>
                      <span className="text-stone-400 font-sans ml-1">p.{ch.chapterNo + 2}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER PAGE */}
          {page.type === "chapter" && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-stone-300 pb-3">
                <div>
                  <span className="text-xs font-badge font-bold text-deepgreen">
                    제{(page as any).chapterNo}장
                  </span>
                  <h2 className="font-title text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    {(page as any).title}
                  </h2>
                </div>
                <div className="text-3xl">{(page as any).emotionEmoji || "🌸"}</div>
              </div>

              {/* Quote Ribbon */}
              {(page as any).quote && (
                <div className="p-2.5 bg-deepgreen-light/80 rounded-xl border border-deepgreen/20 text-xs font-badge text-deepgreen text-center">
                  {(page as any).quote}
                </div>
              )}

              {/* Novel Body Content (강원교육새음체) */}
              <div className="font-novel text-xl sm:text-2xl text-stone-800 leading-loose whitespace-pre-line tracking-wide p-2">
                {(page as any).content}
              </div>
            </div>
          )}

          {/* EPILOGUE PAGE */}
          {page.type === "epilogue" && (
            <div className="max-w-2xl mx-auto space-y-6 text-center py-6 animate-fadeIn">
              <div className="border-b border-stone-300 pb-4">
                <span className="text-xs font-badge text-rosepink font-bold">
                  EPILOGUE
                </span>
                <h2 className="font-title text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {page.title}
                </h2>
              </div>

              <div className="p-6 bg-white/80 rounded-3xl border border-stone-200 shadow-sm font-novel text-xl sm:text-2xl text-stone-800 leading-loose whitespace-pre-line text-left">
                {(page as any).content}
              </div>

              <div className="space-y-1 pt-4 text-xs font-hand text-stone-500">
                <p>
                  &ldquo;15차시의 여정을 함께 걸어온 <strong>{page.author}</strong>에게 아낌없는 박수를 보냅니다.&rdquo;
                </p>
                <p className="font-sans text-[11px] text-stone-400">
                  대구광역시교육청 마음학기제 「마음플레이_감정일기」 수료 문집
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pagination & Flip Controls */}
        <div className="bg-[#FAF6F0] border-t border-[#E4DBCB] px-6 py-3 flex items-center justify-between text-xs font-badge text-stone-600">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 장</span>
          </button>

          <span className="font-sans font-semibold">
            {currentPage === 0 ? "표지" : `${currentPage} / ${totalPages - 1}`}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-2xs"
          >
            <span>다음 장</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
