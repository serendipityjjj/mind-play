"use client";

import React from "react";
import { EMOTION_CLOUDS, EmotionCloud } from "@/lib/emotions";
import { Sparkles, Check } from "lucide-react";

interface EmotionCloudPickerProps {
  selectedId: string;
  onSelect: (emotion: EmotionCloud) => void;
  title?: string;
  subtitle?: string;
}

export const EmotionCloudPicker: React.FC<EmotionCloudPickerProps> = ({
  selectedId,
  onSelect,
  title = "오늘 내 마음에 뜬 8대 감정 구름 캐릭터",
  subtitle = "지금 내 마음에 가장 짙게 머물고 있는 감정 구름을 콕 터치해 보세요!",
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-deepgreen/15 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-title text-base sm:text-lg text-gray-900 font-bold flex items-center gap-2">
            <span>☁️</span>
            <span>{title}</span>
          </h3>
          <p className="font-sans text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-badge text-deepgreen bg-deepgreen-light px-2.5 py-1 rounded-full border border-deepgreen/20">
          <Sparkles className="w-3 h-3 text-deepgreen" />
          <span>8대 감정 캐릭터</span>
        </div>
      </div>

      {/* Grid of 8 Emotion Clouds */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {EMOTION_CLOUDS.map((cloud) => {
          const isSelected = selectedId === cloud.id;
          return (
            <button
              key={cloud.id}
              type="button"
              onClick={() => onSelect(cloud)}
              style={{
                backgroundColor: isSelected ? cloud.bgLight : "#FAFAFA",
                borderColor: isSelected ? cloud.color : "#E5E7EB",
              }}
              className={`relative flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all duration-200 group hover:shadow-md ${
                isSelected
                  ? "scale-105 shadow-md ring-2 ring-offset-1 ring-deepgreen/30"
                  : "hover:scale-102 hover:border-gray-300"
              }`}
            >
              {/* Checkmark badge */}
              {isSelected && (
                <div
                  style={{ backgroundColor: cloud.color }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white flex items-center justify-center shadow-md animate-bounce"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              {/* Cloud Emoji & Face Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-2 transition transform group-hover:scale-110 bg-white/80 shadow-inner">
                {cloud.emoji}
              </div>

              {/* Character Name */}
              <span
                style={{ color: isSelected ? cloud.color : "#374151" }}
                className="font-badge font-bold text-sm tracking-wide"
              >
                {cloud.name}
              </span>

              {/* Signature Quote */}
              <p className="font-hand text-xs text-gray-600 mt-1 line-clamp-1 italic px-1">
                &ldquo;{cloud.quote}&rdquo;
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
