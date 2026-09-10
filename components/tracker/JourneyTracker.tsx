"use client";

import React from "react";
import { CURRICULUM } from "@/lib/curriculum";
import { DiaryEntry } from "@/lib/storage";
import { getEmotionById } from "@/lib/emotions";
import { CheckCircle2, Circle, Clock, Lock, Sparkles, BookOpen } from "lucide-react";

interface JourneyTrackerProps {
  currentLessonNo: number;
  diaries: DiaryEntry[];
  onSelectLesson: (lessonNo: number) => void;
  onOpenNovelModal: () => void;
}

export const JourneyTracker: React.FC<JourneyTrackerProps> = ({
  currentLessonNo,
  diaries,
  onSelectLesson,
  onOpenNovelModal,
}) => {
  const completedLessonNos = diaries.map((d) => d.lessonNo);
  const totalCount = CURRICULUM.length;
  const completedCount = completedLessonNos.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-deepgreen/15 shadow-sm space-y-4">
      {/* Progress Top Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h3 className="font-title text-base sm:text-lg font-bold text-gray-900">
              15차시 마음성장 여정 맵 (Curriculum Tracker)
            </h3>
          </div>
          <p className="font-sans text-xs text-gray-500 mt-0.5">
            매주 목요일 차시를 선택하여 감정을 마주하고 기록을 채워가세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
            <div
              className="bg-gradient-to-r from-deepgreen to-rosepink h-full transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="font-badge font-bold text-xs text-deepgreen">
            {completedCount}/{totalCount} 완료 ({percentage}%)
          </span>
        </div>
      </div>

      {/* Grid of 15 Lessons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {CURRICULUM.map((lesson) => {
          const isCurrent = lesson.lessonNo === currentLessonNo;
          const isCompleted = completedLessonNos.includes(lesson.lessonNo);
          const diary = diaries.find((d) => d.lessonNo === lesson.lessonNo);
          const emotion = diary ? getEmotionById(diary.emotionId) : null;

          return (
            <button
              key={lesson.lessonNo}
              type="button"
              onClick={() => onSelectLesson(lesson.lessonNo)}
              className={`text-left p-3 rounded-2xl border transition-all duration-200 relative group flex flex-col justify-between ${
                isCurrent
                  ? "bg-deepgreen-light border-deepgreen ring-2 ring-deepgreen/30 shadow-md scale-102"
                  : isCompleted
                  ? "bg-white border-emerald-300 hover:border-emerald-400 hover:shadow-xs"
                  : "bg-gray-50/70 border-gray-200 hover:border-gray-300 hover:bg-white"
              }`}
            >
              {/* Top Row: Lesson Number & Status */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[11px] font-badge font-bold px-2 py-0.5 rounded-md ${
                    isCurrent
                      ? "bg-deepgreen text-white"
                      : isCompleted
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {lesson.lessonNo}차시
                </span>

                {isCompleted ? (
                  <span className="text-base" title={emotion?.name}>
                    {emotion?.emoji || "✅"}
                  </span>
                ) : (
                  <Circle className="w-3.5 h-3.5 text-gray-300" />
                )}
              </div>

              {/* Lesson Topic Title */}
              <p
                className={`font-title font-bold text-xs line-clamp-1 mt-1 ${
                  isCurrent ? "text-deepgreen" : "text-gray-800"
                }`}
              >
                {lesson.topic.split("-")[0].replace(/^\d+\.\s*/, "")}
              </p>

              {/* Subtitle / Hashtag badge */}
              <div className="mt-1.5 flex items-center justify-between text-[10px] font-hand text-gray-500">
                <span className="line-clamp-1">{lesson.hashtags[0]}</span>
                {lesson.lessonNo === 1 && (
                  <span title="디지털 타임캡슐 연동">⏳</span>
                )}
                {lesson.lessonNo === 15 && (
                  <span title="수료 및 소설집 발간">🎓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Milestone Callout */}
      <div className="p-3.5 bg-gradient-to-r from-[#FFF5F7] to-[#FAF8F5] rounded-2xl border border-rosepink/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-700 font-hand">
          <Sparkles className="w-4 h-4 text-rosepink flex-shrink-0" />
          <span>
            15차시의 기록이 쌓이면 언제든 <strong className="font-bold text-rosepink">나만의 성장 소설책</strong>을 새로 집필하고 인쇄할 수 있습니다!
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenNovelModal}
          className="flex-shrink-0 px-4 py-1.5 bg-rosepink text-white rounded-xl font-badge font-bold hover:bg-rosepink-hover transition shadow-xs"
        >
          소설책 뷰어 열기 ➔
        </button>
      </div>
    </div>
  );
};
