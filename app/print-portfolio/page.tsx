"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioDocument } from "@/components/print/PortfolioDocument";
import {
  getCurrentUser,
  getStoredDiaries,
  getStoredNovel,
  UserProfile,
  DiaryEntry,
  NovelData,
} from "@/lib/storage";
import { Printer, ArrowLeft, BookOpen, Sparkles, Home } from "lucide-react";

export default function PrintPortfolioPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [novel, setNovel] = useState<NovelData | null>(null);

  useEffect(() => {
    const loadedUser = getCurrentUser();
    const loadedDiaries = getStoredDiaries();
    const loadedNovel = getStoredNovel();

    setUser(loadedUser);
    setDiaries(loadedDiaries);
    setNovel(loadedNovel);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      {/* Top Floating Print Control Header (Hidden in Print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-4 z-50 animate-fadeIn">
        <div className="flex items-center gap-3">
          <Link
            href="/mypage"
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-badge font-bold transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>마이페이지</span>
          </Link>
          <Link
            href="/"
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-badge font-bold transition flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>홈으로</span>
          </Link>
          <div className="hidden md:block">
            <span className="text-xs font-badge font-bold text-deepgreen flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>러닝 페어 전시용 4페이지 포트폴리오</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-deepgreen to-rosepink text-white rounded-xl text-xs sm:text-sm font-badge font-bold shadow-md hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ 전시용 책자 PDF로 내려받기 / 인쇄</span>
          </button>
        </div>
      </div>

      {/* Main A4 Document Preview Container */}
      <div className="max-w-[210mm] mx-auto print:m-0 print:p-0">
        <PortfolioDocument user={user} diaries={diaries} novel={novel} />
      </div>

      {/* Print Instructions Helper (Hidden in Print) */}
      <div className="no-print max-w-2xl mx-auto mt-8 text-center text-xs text-gray-500 font-sans space-y-1">
        <p>💡 <strong>인쇄 안내:</strong> 인쇄 창에서 대상 프린터를 <strong>&apos;PDF로 저장&apos;</strong>으로 선택하고, 배경 그래픽 포함 옵션을 체크해 주세요.</p>
        <p>A4 세로 규격으로 정확히 4페이지 분량의 미니 문집 책자가 생성됩니다.</p>
      </div>
    </div>
  );
}
