"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { JourneyTracker } from "@/components/tracker/JourneyTracker";
import { Lesson1Module } from "@/components/lesson/Lesson1Module";
import { Lesson2Module } from "@/components/lesson/Lesson2Module";
import { Lesson3Module } from "@/components/lesson/Lesson3Module";
import { Lesson4Module } from "@/components/lesson/Lesson4Module";
import { Lesson5Module } from "@/components/lesson/Lesson5Module";
import { Lesson6Module } from "@/components/lesson/Lesson6Module";
import { Lesson7Module } from "@/components/lesson/Lesson7Module";
import { Lesson8Module } from "@/components/lesson/Lesson8Module";
import { Lesson9Module } from "@/components/lesson/Lesson9Module";
import { Lesson10Module } from "@/components/lesson/Lesson10Module";
import { Lesson11Module } from "@/components/lesson/Lesson11Module";
import { Lesson12Module } from "@/components/lesson/Lesson12Module";
import { Lesson13Module } from "@/components/lesson/Lesson13Module";
import { Lesson14Module } from "@/components/lesson/Lesson14Module";
import { Lesson15Module } from "@/components/lesson/Lesson15Module";
import { NovelizerModal } from "@/components/novel/NovelizerModal";
import { FlipbookViewer } from "@/components/novel/FlipbookViewer";
import { getLessonByNo } from "@/lib/curriculum";
import {
  DiaryEntry,
  NovelData,
  getStoredDiaries,
  saveDiaryEntry,
  getStoredNovel,
  getStoredNickname,
  saveStoredNickname,
} from "@/lib/storage";
import { BookOpen, Heart } from "lucide-react";

export default function Home() {
  const [currentLessonNo, setCurrentLessonNo] = useState<number>(1);
  const [nickname, setNickname] = useState<string>("마음친구");
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [currentNovel, setCurrentNovel] = useState<NovelData | null>(null);

  // Modals
  const [isNovelModalOpen, setIsNovelModalOpen] = useState<boolean>(false);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState<boolean>(false);

  // Load initial local data
  useEffect(() => {
    const loadedNick = getStoredNickname();
    const loadedDiaries = getStoredDiaries();
    const loadedNovel = getStoredNovel();

    setNickname(loadedNick);
    setDiaries(loadedDiaries);
    if (loadedNovel) {
      setCurrentNovel(loadedNovel);
    }
  }, []);

  const handleUpdateNickname = (newName: string) => {
    setNickname(newName);
    saveStoredNickname(newName);
  };

  const handleSaveDiary = async (entry: DiaryEntry) => {
    const updated = saveDiaryEntry(entry);
    setDiaries(updated);

    // Also fire background sync to /api/diary
    try {
      await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (e) {
      console.warn("API sync background error", e);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonNo < 15) {
      setCurrentLessonNo(currentLessonNo + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentLesson = getLessonByNo(currentLessonNo);
  const currentDiary = diaries.find((d) => d.lessonNo === currentLessonNo);
  const lesson1Entry = diaries.find((d) => d.lessonNo === 1);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-radial-main selection:bg-rosepink-light selection:text-rosepink">
      {/* Top Main Navigation Header */}
      <Header
        currentLessonNo={currentLessonNo}
        onSelectLesson={(no) => {
          setCurrentLessonNo(no);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        nickname={nickname}
        onUpdateNickname={handleUpdateNickname}
        onOpenNovelModal={() => setIsNovelModalOpen(true)}
        completedCount={diaries.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* Floating Quick Action Banner for Existing Novel */}
        {currentNovel && (
          <div className="p-4 bg-gradient-to-r from-[#FFF5F7] via-white to-deepgreen-light rounded-3xl border border-rosepink/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rosepink text-white flex items-center justify-center text-xl shadow-md">
                📖
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-badge text-rosepink font-bold bg-rosepink-light px-2 py-0.5 rounded-full">
                    발간된 성장 소설집
                  </span>
                  <span className="text-xs text-gray-500 font-sans">
                    {currentNovel.createdAt} 완성
                  </span>
                </div>
                <h4 className="font-title text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                  {currentNovel.title}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFlipbookOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-rosepink to-deepgreen text-white rounded-xl text-xs sm:text-sm font-badge font-bold shadow-sm hover:opacity-95 active:scale-95 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>플립북 책 넘겨보기</span>
              </button>
              <button
                type="button"
                onClick={() => setIsNovelModalOpen(true)}
                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-badge font-bold hover:bg-gray-50 transition"
              >
                새로 집필
              </button>
            </div>
          </div>
        )}

        {/* 15-Lesson Interactive Journey Map Tracker */}
        <JourneyTracker
          currentLessonNo={currentLessonNo}
          diaries={diaries}
          onSelectLesson={(no) => {
            setCurrentLessonNo(no);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenNovelModal={() => setIsNovelModalOpen(true)}
        />

        {/* Dynamic Interactive Lesson Module Dispatcher (1~15) */}
        <div className="pt-2">
          {currentLessonNo === 1 && (
            <Lesson1Module
              key={1}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 2 && (
            <Lesson2Module
              key={2}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 3 && (
            <Lesson3Module
              key={3}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 4 && (
            <Lesson4Module
              key={4}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 5 && (
            <Lesson5Module
              key={5}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 6 && (
            <Lesson6Module
              key={6}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 7 && (
            <Lesson7Module
              key={7}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 8 && (
            <Lesson8Module
              key={8}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 9 && (
            <Lesson9Module
              key={9}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 10 && (
            <Lesson10Module
              key={10}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 11 && (
            <Lesson11Module
              key={11}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 12 && (
            <Lesson12Module
              key={12}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 13 && (
            <Lesson13Module
              key={13}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 14 && (
            <Lesson14Module
              key={14}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              onSave={handleSaveDiary}
              onNextLesson={handleNextLesson}
            />
          )}

          {currentLessonNo === 15 && (
            <Lesson15Module
              key={15}
              lesson={currentLesson}
              nickname={nickname}
              initialData={currentDiary}
              diaries={diaries}
              timeCapsuleFromLesson1={lesson1Entry?.interactiveData?.timeCapsule}
              onSave={handleSaveDiary}
              onOpenNovelModal={() => setIsNovelModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Novelizer Creation Modal */}
      <NovelizerModal
        isOpen={isNovelModalOpen}
        onClose={() => setIsNovelModalOpen(false)}
        nickname={nickname}
        diaries={diaries}
        onNovelGenerated={(newNovel) => {
          setCurrentNovel(newNovel);
          setIsFlipbookOpen(true);
        }}
      />

      {/* Book Flipbook Viewer Modal */}
      {currentNovel && (
        <FlipbookViewer
          novel={currentNovel}
          isOpen={isFlipbookOpen}
          onClose={() => setIsFlipbookOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-12 bg-white/80 border-t border-deepgreen/15 py-8 text-center text-xs text-gray-500 font-sans space-y-2">
        <div className="flex items-center justify-center gap-2 font-badge text-deepgreen font-bold">
          <Heart className="w-4 h-4 fill-deepgreen" />
          <span>대구광역시교육청 마음학기제 중학교 워크북 「마음플레이_감정일기」</span>
        </div>
        <p className="font-hand text-sm text-gray-600">
          매주 목요일, 8대 감정 구름과 함께 나를 마주하고 단단하게 자라납니다.
        </p>
        <p className="text-[11px] text-gray-400">
          Powered by Next.js 14, Google Gemini 3.5 Flash &amp; Upstage Solar API
        </p>
      </footer>
    </div>
  );
}
