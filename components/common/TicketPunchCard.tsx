"use client";

import React, { useState } from "react";
import { Hash, Plus, X, Tag } from "lucide-react";

interface TicketPunchCardProps {
  hashtags: string[];
  suggestedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  guideText?: string;
}

export const TicketPunchCard: React.FC<TicketPunchCardProps> = ({
  hashtags,
  suggestedTags,
  onAddTag,
  onRemoveTag,
  guideText = "오늘 수업을 통해서 변화하고 싶은 나의 모습이 있나요? 이번 시간 나만의 수업 목표를 해시태그로 작성해 봅시다.",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputValue.trim().replace(/^#+/, "");
    if (clean) {
      onAddTag(`#${clean}`);
      setInputValue("");
    }
  };

  return (
    <div className="relative ticket-card p-6 my-4 transition hover:shadow-lg bg-gradient-to-b from-white to-[#FAFDFB]">
      {/* Left and right punch holes */}
      <div className="ticket-punch-left" />
      <div className="ticket-punch-right" />

      {/* Header with Ticket Label */}
      <div className="flex items-center justify-between border-b border-dashed border-deepgreen/30 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-deepgreen text-white rounded-lg">
            <Hash className="w-4 h-4" />
          </div>
          <h4 className="font-title font-bold text-deepgreen text-base sm:text-lg">
            #해시태그로 말해요
          </h4>
        </div>
        <span className="text-[11px] font-badge text-deepgreen bg-deepgreen-light px-2.5 py-0.5 rounded-full border border-deepgreen/20">
          마음 티켓 발권
        </span>
      </div>

      {/* Guide text from workbook */}
      <p className="font-hand text-sm text-gray-700 leading-relaxed mb-4">
        {guideText}
      </p>

      {/* Suggested Tags (Click to Add) */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-badge mb-2">
          <Tag className="w-3 h-3 text-deepgreen" />
          <span>추천 예시 해시태그 (클릭하여 추가):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedTags.map((tag, idx) => {
            const isAdded = hashtags.includes(tag);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isAdded && onAddTag(tag)}
                disabled={isAdded}
                className={`text-xs px-3 py-1.5 rounded-xl font-badge transition-all flex items-center gap-1 border ${
                  isAdded
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-deepgreen-light text-deepgreen border-deepgreen/30 hover:bg-deepgreen hover:text-white active:scale-95 shadow-xs"
                }`}
              >
                <span>{tag}</span>
                {!isAdded && <Plus className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Active Tags Display */}
      <div className="min-h-[48px] p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex flex-wrap items-center gap-2 mb-3">
        {hashtags.length === 0 ? (
          <span className="text-xs text-gray-400 font-hand">
            등록된 해시태그가 없습니다. 아래 입력창이나 추천 태그를 눌러보세요.
          </span>
        ) : (
          hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-deepgreen border border-deepgreen/40 rounded-full text-xs font-badge font-bold shadow-xs animate-scale-in"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="hover:text-red-500 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Manual Tag Input Form */}
      <form onSubmit={handleInputSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold font-title">
            #
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="나만의 해시태그 직접 입력하기 (엔터)"
            className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-deepgreen focus:ring-1 focus:ring-deepgreen font-hand"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-deepgreen text-white text-xs sm:text-sm font-badge font-bold rounded-xl hover:bg-deepgreen-hover transition shadow-sm active:scale-95"
        >
          추가
        </button>
      </form>
    </div>
  );
};
