"use client";

import React, { useState } from "react";
import { BALANCE_QUESTIONS, BalanceGameAnswer, PeerProfile } from "./BalanceGameModule";

export interface GalleryStudentItem {
  student: {
    studentId: string;
    name: string;
    avatar: string;
  };
  mbti: string;
  intels: string;
  title: string;
  when: string;
  call: string;
  cheer: string;
  balanceAnswers?: { [key: number]: string };
}

interface ClassGalleryModalProps {
  selectedCard: GalleryStudentItem | null;
  onClose: () => void;
  myBalanceAnswers: BalanceGameAnswer;
  myStudentName: string;
}

export const ClassGalleryModal: React.FC<ClassGalleryModalProps> = ({
  selectedCard,
  onClose,
  myBalanceAnswers,
  myStudentName,
}) => {
  const [activeTab, setActiveTab] = useState<"card" | "balance">("card");

  if (!selectedCard) return null;

  // 선택된 친구의 밸런스 취향과 나의 싱크로율 계산
  const peerAns = selectedCard.balanceAnswers || {};
  let sameCount = 0;
  BALANCE_QUESTIONS.forEach((q) => {
    if (myBalanceAnswers[q.id] && peerAns[q.id] && myBalanceAnswers[q.id] === peerAns[q.id]) {
      sameCount++;
    }
  });
  const matchRate = Math.round((sameCount / 11) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border-2 border-emerald-300 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition z-10"
        >
          ✕
        </button>

        {/* 상단 탭 (브랜딩 카드 vs 밸런스 게임 취향) */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 pr-10">
          <button
            type="button"
            onClick={() => setActiveTab("card")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-dodum font-bold transition ${
              activeTab === "card" ? "bg-white text-emerald-900 shadow-2xs" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            🎭 브랜딩 카드
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("balance")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-dodum font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "balance" ? "bg-emerald-700 text-white shadow-2xs" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <span>🕹️ 밸런스 취향 보기</span>
            <span className="text-[10px] bg-white/25 px-1.5 py-0.2 rounded-full font-mono">{matchRate}% 일치</span>
          </button>
        </div>

        {/* 탭 1: 브랜딩 카드 뷰 */}
        {activeTab === "card" && (
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-800 via-teal-800 to-emerald-950 text-white shadow-xl space-y-4 border-2 border-emerald-300/40 relative overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-center text-xs font-mono text-emerald-200 border-b border-white/20 pb-2">
              <span>MIND PLAY BRANDING CARD</span>
              <span>1-3 {selectedCard.student.name}</span>
            </div>
            <div className="text-center py-1">
              <div className="text-3xl mb-1">{selectedCard.student.avatar || "🎭"}</div>
              <div className="text-xs font-dodum text-emerald-300 font-bold">
                {selectedCard.intels}이 발달한
              </div>
              <h5 className="text-xl font-title font-bold text-white mt-0.5">
                {selectedCard.title}
              </h5>
              <span className="text-xs font-batang text-emerald-200">
                1학년 3반 {selectedCard.student.studentId} {selectedCard.student.name}
              </span>
            </div>
            <div className="p-3 bg-black/25 rounded-2xl border border-white/15 space-y-2 text-xs font-batang leading-relaxed">
              <div>
                <strong className="text-emerald-300 block text-[11px] font-dodum">🌿 혼자 있을 때 나다워지는 순간:</strong>
                <p className="text-gray-100">{selectedCard.when}</p>
              </div>
              <div>
                <strong className="text-emerald-300 block text-[11px] font-dodum">⚡ 나를 부르는 순간:</strong>
                <p className="text-gray-100">{selectedCard.call}</p>
              </div>
              <div>
                <strong className="text-emerald-300 block text-[11px] font-dodum">💖 나에게 보내는 응원:</strong>
                <p className="text-gray-100">&quot;{selectedCard.cheer}&quot;</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-dodum text-emerald-200">
              <span>#{selectedCard.mbti}기질</span>
              <span>#1학년3반</span>
              <span>#당당한_나다움</span>
            </div>
          </div>
        )}

        {/* 탭 2: 밸런스 취향 상세 보기 & 싱크로율 비교 */}
        {activeTab === "balance" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-title font-bold text-emerald-950 block">
                  {myStudentName} & {selectedCard.student.name}의 취향 케미
                </span>
                <p className="text-[11px] font-batang text-emerald-700">
                  11가지 질문 중 <strong>{sameCount}가지 질문</strong>에서 같은 선택을 했습니다.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-extrabold text-emerald-700">{matchRate}%</span>
                <span className="block text-[10px] text-gray-500 font-dodum">일치율</span>
              </div>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs">
              {BALANCE_QUESTIONS.map((q) => {
                const myChoice = myBalanceAnswers[q.id];
                const peerChoice = peerAns[q.id];
                const isSame = myChoice && peerChoice && myChoice === peerChoice;
                const peerOpt = q.options.find((o) => o.id === peerChoice);

                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-xl border transition ${
                      isSame ? "bg-emerald-50/60 border-emerald-300" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between font-title font-bold text-gray-800 text-[11px] mb-1">
                      <span>{q.title}</span>
                      {isSame ? (
                        <span className="text-[10px] font-dodum text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full font-bold">
                          ✨ 찌찌뽕 (일치)
                        </span>
                      ) : (
                        <span className="text-[10px] font-dodum text-gray-400">서로 다른 매력</span>
                      )}
                    </div>
                    <div className="text-xs font-batang text-gray-700">
                      👉 <strong>{selectedCard.student.name}의 선택:</strong> {peerOpt ? peerOpt.text : peerChoice || "선택 전"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
