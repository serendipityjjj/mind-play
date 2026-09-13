"use client";

import React from "react";
import { BALANCE_QUESTIONS, BalanceGameAnswer } from "./BalanceGameModule";

interface MyBalanceResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  balanceAnswers: BalanceGameAnswer;
  custom10: string;
  custom11: string;
  studentName: string;
}

export const MyBalanceResultModal: React.FC<MyBalanceResultModalProps> = ({
  isOpen,
  onClose,
  balanceAnswers,
  custom10,
  custom11,
  studentName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border-2 border-emerald-300 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          ✕
        </button>

        <div className="border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕹️</span>
            <div>
              <h4 className="font-title text-base sm:text-lg font-bold text-gray-900">
                {studentName} 학생의 11문항 밸런스 취향 결과표
              </h4>
              <p className="text-xs text-gray-500 font-batang">
                나만의 고유한 성향과 선택을 한눈에 확인해보세요!
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {BALANCE_QUESTIONS.map((q) => {
            const ans = balanceAnswers[q.id];
            const opt = q.options.find((o) => o.id === ans);
            let displayVal = opt ? opt.text : "미선택";
            if (q.id === 10 && ans === "CUSTOM" && custom10) {
              displayVal = `✍️ ${custom10}`;
            } else if (q.id === 11 && ans === "CUSTOM" && custom11) {
              displayVal = `✍️ ${custom11}`;
            }

            return (
              <div key={q.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1 text-xs">
                <div className="flex items-center justify-between font-title font-bold text-gray-900 text-[11px]">
                  <span>{q.title}</span>
                  <span className="font-mono text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-md">
                    {ans || "-"}
                  </span>
                </div>
                <p className="text-xs font-batang text-emerald-950 font-medium">
                  {displayVal}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1F6B38] hover:bg-[#144725] text-white rounded-xl text-xs font-dodum font-bold transition shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
