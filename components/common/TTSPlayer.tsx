"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface TTSPlayerProps {
  text: string;
  label?: string;
  themeColor?: string;
}

export const TTSPlayer: React.FC<TTSPlayerProps> = ({
  text,
  label = "마음이 목소리로 듣기",
  themeColor = "#2A784B",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!isSupported || typeof window === "undefined") return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 0.95;
      utterance.pitch = 1.15; // friendly, gentle voice

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleToggleSpeech}
      style={{
        backgroundColor: isPlaying ? "#FCEDF0" : "#FFFFFF",
        borderColor: isPlaying ? "#C44D62" : themeColor + "40",
        color: isPlaying ? "#C44D62" : themeColor,
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-badge font-bold shadow-xs hover:shadow transition-all active:scale-95"
      title="편지 본문을 음성으로 듣습니다"
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 animate-pulse" />
          <span>듣기 멈춤</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>{label}</span>
          <Sparkles className="w-3 h-3 opacity-70" />
        </>
      )}
    </button>
  );
};
