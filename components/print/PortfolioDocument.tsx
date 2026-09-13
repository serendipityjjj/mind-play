"use client";

import React from "react";
import { UserProfile, DiaryEntry, NovelData } from "@/lib/storage";
import { EMOTION_CLOUDS } from "@/lib/emotions";
import { Sparkles, Heart, Award, Shield, Layers, Scale, Calendar } from "lucide-react";

interface PortfolioDocumentProps {
  user: UserProfile;
  diaries: DiaryEntry[];
  novel?: NovelData | null;
}

export const PortfolioDocument: React.FC<PortfolioDocumentProps> = ({
  user,
  diaries,
  novel,
}) => {
  // Find entries
  const getEntry = (no: number) => diaries.find((d) => d.lessonNo === no);

  const e1 = getEntry(1);
  const e2 = getEntry(2);
  const e3 = getEntry(3);
  const e4 = getEntry(4);
  const e5 = getEntry(5);
  const e6 = getEntry(6);
  const e7 = getEntry(7);
  const e8 = getEntry(8);
  const e9 = getEntry(9);
  const e10 = getEntry(10);
  const e11 = getEntry(11);
  const e12 = getEntry(12);
  const e13 = getEntry(13);
  const e14 = getEntry(14);
  const e15 = getEntry(15);

  const userCharacter =
    EMOTION_CLOUDS.find((c) => c.id === user.characterId) || EMOTION_CLOUDS[0];

  return (
    <div className="portfolio-print-root bg-white text-gray-900 font-sans mx-auto">
      {/* ========================================================================= */}
      {/* PAGE 1: 표지 & UPSTAGE SOLAR 단편 성장 소설 */}
      {/* ========================================================================= */}
      <div className="a4-page p-10 flex flex-col justify-between border border-gray-300 shadow-sm relative mb-8">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-deepgreen via-rosepink to-amber-500" />

        {/* Cover Header */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b-2 border-deepgreen/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <div>
                <span className="text-[11px] font-badge text-deepgreen font-bold block tracking-wider">
                  대구광역시교육청 마음학기제 중학교 워크북
                </span>
                <span className="text-xs font-mono text-gray-500">
                  2026 러닝 페어 공식 출판물
                </span>
              </div>
            </div>
            <span className="px-3 py-1 bg-deepgreen-light text-deepgreen text-xs font-badge font-bold rounded-full border border-deepgreen/20">
              미니 성장 문집 Vol. 1
            </span>
          </div>

          <div className="text-center py-4 space-y-2">
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
              Mind Play Emotion Portfolio
            </span>
            <h1 className="text-3xl font-title font-bold text-gray-900 leading-tight">
              2026 마음플레이 마음성장 포트폴리오
            </h1>
            <p className="text-sm font-hand text-gray-600 text-base">
              &quot;15주간의 목요일, 8가지 감정 구름을 지나 단단해진 나의 이야기&quot;
            </p>
          </div>

          {/* Student Profile Ribbon */}
          <div className="bg-gradient-to-r from-deepgreen-light via-white to-rosepink-light p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                {userCharacter.emoji}
              </div>
              <div>
                <span className="text-[11px] font-mono text-gray-500 block">
                  {user.schoolName} · {user.gradeClass}
                </span>
                <h3 className="text-base font-title font-bold text-gray-900">
                  {user.name} <span className="text-rosepink font-hand font-normal">({user.nickname})</span>
                </h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-badge text-gray-400 block">완주 상태</span>
              <span className="text-xs font-badge font-bold text-deepgreen bg-white px-2.5 py-1 rounded-full border border-deepgreen/30">
                15차시 전 과정 수료 🎓
              </span>
            </div>
          </div>
        </div>

        {/* Upstage Solar Novel Body Section */}
        <div className="my-4 p-6 bg-[#FCFBF7] rounded-2xl border border-amber-200/70 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <div className="flex items-center gap-2 text-amber-900 font-title font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Upstage Solar AI 집필 성장 소설: 「{novel?.title || "열다섯 번의 목요일, 구름을 지나 단단해진 나"}」</span>
            </div>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              {novel?.genre || "청소년 성장소설"}
            </span>
          </div>

          {/* Novel Chapters Excerpt Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs font-sans leading-relaxed text-gray-800">
            {novel?.chapters ? (
              novel.chapters.slice(0, 4).map((chap, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-amber-100 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between font-title font-bold text-amber-950 text-xs">
                    <span>{chap.emotionEmoji} {chap.title}</span>
                  </div>
                  <p className="font-novel text-xs text-gray-700 line-clamp-4 text-justify">
                    {chap.content}
                  </p>
                  <span className="block text-[10px] font-hand text-rosepink italic">
                    &quot;{chap.quote}&quot;
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-6 text-gray-500 font-hand text-sm">
                15차시 감정 일기를 바탕으로 집필된 감동적인 성장 소설이 수록되었습니다.
              </div>
            )}
          </div>

          {/* Epilogue */}
          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-gray-600 font-hand">
            <span>&quot;{novel?.epilogue || "내 안의 8가지 감정 구름들과 함께 오늘도 나만의 하늘을 아름답게 그려나갈 것이다."}&quot;</span>
            <span className="font-mono text-gray-400">집필일: {novel?.createdAt || "2026.06.18"}</span>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[11px] text-gray-400 font-mono">
          <span>대구광역시교육청 마음학기제 「마음플레이_감정일기」</span>
          <span>- 1 / 4 -</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 2: 내면 탐색 및 감정 인식 편 (1~4차시) */}
      {/* ========================================================================= */}
      <div className="a4-page p-10 flex flex-col justify-between border border-gray-300 shadow-sm relative mb-8">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-deepgreen to-teal-500" />

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <h2 className="text-lg font-title font-bold text-gray-900">
                파트 1. 내면 탐색과 감정 인식 (1~4차시)
              </h2>
            </div>
            <span className="text-xs font-badge text-deepgreen bg-deepgreen-light px-2.5 py-0.5 rounded-full">
              영역 ❶ 나와 마주하기 &amp; ❷ 나를 표현하기
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 1차시 카드 */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-amber-900">01. 마음, 그게 궁금해!</span>
                <span className="text-lg">🏺</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>마음 첫 주민:</strong> {e1?.interactiveData?.residents?.join(", ") || "설렘, 두근거림"}</p>
                <p><strong>타임캡슐 비밀 고민:</strong> {e1?.interactiveData?.timeCapsule?.secretWorry || "친구들과 어색함 없이 잘 어울릴까?"}</p>
                <p className="font-hand text-sm text-gray-800 italic bg-white p-2 rounded-lg border border-amber-200">
                  &quot;{e1?.interactiveData?.timeCapsule?.letterToFuture || "15주 뒤의 나야, 참 자랑스러워!"}&quot;
                </p>
              </div>
            </div>

            {/* 2차시 카드 */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-emerald-900">02. 내 안의 숨은 보석 찾기</span>
                <span className="text-lg">💎</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>발견한 강점 보석:</strong> {e2?.interactiveData?.gems?.join(", ") || "경청왕, 약속 지킴이, 솔직함"}</p>
                <p className="font-hand text-sm text-gray-800 bg-white p-2 rounded-lg border border-emerald-200">
                  &quot;{e2?.interactiveData?.mask?.sentence || "나는 친구의 아픔에 조용히 곁을 지켜주는 사람이다."}&quot;
                </p>
              </div>
            </div>

            {/* 3차시 카드 */}
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-sky-900">03. 나다움 가면 소개서</span>
                <span className="text-lg">🎭</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>가면 타이틀:</strong> {e3?.interactiveData?.profileCard?.maskTitle || "조용한 경청 요정 민들레"}</p>
                <p><strong>이럴 때 나를 찾아줘:</strong> {e3?.interactiveData?.profileCard?.callMeWhen || "속상한 일로 위로받고 싶을 때"}</p>
                <p><strong>나만의 당당한 다짐:</strong> {e3?.interactiveData?.profileCard?.selfCheer || "주눅 들지 않고 내 생각을 말하기"}</p>
              </div>
            </div>

            {/* 4차시 카드 */}
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-purple-900">04. 내 감정을 알고 싶어</span>
                <span className="text-lg">🔍</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>발견한 감정 단어:</strong> {e4?.interactiveData?.emotionWords?.join(", ") || "벅참, 서운함, 조마조마함"}</p>
                <div className="bg-white p-2 rounded-lg border border-purple-200 flex items-center gap-2">
                  <span className="text-2xl">👾</span>
                  <div>
                    <strong className="block text-[11px] text-purple-950">{e4?.interactiveData?.emotionMonster?.name || "몽글이"}</strong>
                    <span className="text-[10px] text-gray-600">{e4?.interactiveData?.emotionMonster?.state || "따뜻하지만 조마조마한 상태"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 15-Week Emotion Cloud Stamp Visualizer */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-title font-bold text-gray-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-deepgreen" />
                <span>15주간 매주 만난 8대 감정 구름 캘린더 스탬프</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500">1~15주 타임라인</span>
            </div>
            <div className="grid grid-cols-15 gap-1 pt-1">
              {Array.from({ length: 15 }, (_, i) => i + 1).map((no) => {
                const entry = getEntry(no);
                const em = entry ? EMOTION_CLOUDS.find((c) => c.id === entry.emotionId) : null;
                return (
                  <div key={no} className="p-1 rounded-lg bg-white border border-gray-200 text-center text-[9px]">
                    <span className="block font-mono text-gray-400">{no}</span>
                    <span className="text-sm">{em ? em.emoji : "☁️"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[11px] text-gray-400 font-mono">
          <span>대구광역시교육청 마음학기제 「마음플레이_감정일기」</span>
          <span>- 2 / 4 -</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 3: 감정 조절과 회복 편 (5~8차시) */}
      {/* ========================================================================= */}
      <div className="a4-page p-10 flex flex-col justify-between border border-gray-300 shadow-sm relative mb-8">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-teal-500 to-rosepink" />

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌊</span>
              <h2 className="text-lg font-title font-bold text-gray-900">
                파트 2. 감정 조절과 긍정 회복 (5~8차시)
              </h2>
            </div>
            <span className="text-xs font-badge text-rosepink bg-rosepink-light px-2.5 py-0.5 rounded-full">
              영역 ❸ 정서 조절하기 &amp; ❹ 긍정의 힘 기르기
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 5차시 카드 */}
            <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-teal-900">05. 감정의 파도 다스리기</span>
                <span className="text-lg">🧘</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>마음 온도 기록:</strong> {e5?.interactiveData?.coolDown?.selectedTemp || 80}℃</p>
                <p><strong>나만의 이완 주문:</strong> &quot;{e5?.interactiveData?.coolDown?.mantra || "파도는 곧 지나간다"}&quot;</p>
                <p><strong>실천 행동:</strong> {e5?.interactiveData?.coolDown?.action || "뒤돌아서 깊게 숨 3번 쉬고 찬물 마시기"}</p>
              </div>
            </div>

            {/* 6차시 ABCD 카드 */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-amber-900">06. 생각을 바꾸면 놀라운 일이! (ABCD)</span>
                <span className="text-lg">🔄</span>
              </div>
              <div className="text-[11px] font-sans text-gray-700 space-y-1">
                <p><strong>A(사건):</strong> {e6?.interactiveData?.customData?.activatingEvent || "수행평가 계산 실수로 감점"}</p>
                <p className="text-red-600"><strong>B(비합리적):</strong> {e6?.interactiveData?.customData?.irrationalBelief || "난 항상 망쳐"}</p>
                <p className="text-green-700 font-bold"><strong>D(합리적 신념):</strong> {e6?.interactiveData?.customData?.effectiveBelief || "실수는 성장의 과정이야!"}</p>
              </div>
            </div>

            {/* 7차시 스트레스 분리수거 */}
            <div className="p-4 rounded-2xl bg-green-50/50 border border-green-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-green-900">07. 스트레스 날려버리기</span>
                <span className="text-lg">🧺</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>🚫 바꿀 수 없는 것:</strong> 시험 난이도, 남의 시선</p>
                <p className="text-deepgreen font-bold"><strong>✅ 내가 바꿀 수 있는 것 실천:</strong> 문제집 3쪽 풀기, 10분 산책 루틴, 11시 취침</p>
              </div>
            </div>

            {/* 8차시 감사 한 컷 */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-title font-bold text-rose-900">08. 감사 한 컷 (&apos;오히려 좋아!&apos;)</span>
                <span className="text-lg">🍀</span>
              </div>
              <div className="text-xs font-sans text-gray-700 space-y-1">
                <p><strong>오히려 좋아 리프레이밍:</strong> {e8?.interactiveData?.customData?.reframingCase || "체육 취소 -> 교실 수다 타임!"}</p>
                <p className="font-hand text-sm text-rosepink bg-white p-2 rounded-lg border border-rose-200">
                  &quot;오늘 점심 맛있는 국, 짝꿍의 필기구 배려, 예쁜 노을 하늘에 감사해!&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[11px] text-gray-400 font-mono">
          <span>대구광역시교육청 마음학기제 「마음플레이_감정일기」</span>
          <span>- 3 / 4 -</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 4: 소통과 성장 편 & 디지털 마음 상장 (9~15차시) */}
      {/* ========================================================================= */}
      <div className="a4-page p-10 flex flex-col justify-between border border-gray-300 shadow-sm relative">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-rosepink via-purple-600 to-amber-500" />

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤝</span>
              <h2 className="text-lg font-title font-bold text-gray-900">
                파트 3. 소통, 관계, 그리고 완성 (9~15차시)
              </h2>
            </div>
            <span className="text-xs font-badge text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              영역 ❺, ❻, ❼ 소통과 성장
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-sans">
            {/* 9~10차시 */}
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1">
              <span className="font-title font-bold text-blue-900 block">09~10. 다름 &amp; 공감</span>
              <p>• 다양성 인정 도장 쾅! 💮</p>
              <p className="font-hand text-xs text-blue-800 truncate">&quot;{e10?.interactiveData?.customData?.empathyLetter || "끝까지 해낸 네가 진짜 멋졌어!"}&quot;</p>
            </div>

            {/* 11~12차시 */}
            <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-1">
              <span className="font-title font-bold text-indigo-900 block">11~12. 나-전달법 &amp; 사과</span>
              <p>• 나사감바: 사실+감정+바람</p>
              <p>• 인사약 황금 사과 레시피 🍎</p>
            </div>

            {/* 13~14차시 */}
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1">
              <span className="font-title font-bold text-emerald-900 block">13~14. 선택 &amp; 협동 타워</span>
              <p>• 가치관 저울 결정 완료 ⚖️</p>
              <p>• 7층 마음 카드 타워 완공 🏰</p>
            </div>
          </div>

          {/* Gold Certificate Final Badge */}
          <div className="bg-gradient-to-b from-[#FFFDF0] via-[#FFF9DB] to-[#FFFDF0] border-2 border-[#D4AF37] rounded-2xl p-6 text-center space-y-3 relative shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-amber-800 uppercase font-bold">
                Certificate of Emotional Growth
              </span>
              <h3 className="text-xl font-title font-bold text-amber-950">
                마음 성장 대상 (수료 상장)
              </h3>
            </div>

            <div className="py-1 border-y border-amber-300/60 max-w-md mx-auto space-y-1 text-xs">
              <p className="font-sans text-amber-900">
                성명: <strong className="text-base font-title underline">{user.name}</strong> ({user.nickname})
              </p>
              <p className="font-hand text-sm text-gray-800 leading-relaxed">
                위 학생은 대구광역시교육청 중학교 마음학기제 「마음플레이_감정일기」
                15차시 전 과정을 성실히 완주하고, 8대 감정 구름과 함께 단단하고 따뜻한 마음 근육을 길렀기에 이 상장을 수여합니다.
              </p>
            </div>

            <div className="flex items-center justify-between max-w-xs mx-auto text-[10px] font-sans text-amber-900 pt-1">
              <span>수여일: 2026. 06. 18</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold">대구광역시교육감</span>
                <div className="w-7 h-7 rounded-full border border-red-600 bg-red-50 text-red-700 flex items-center justify-center text-[8px] font-bold font-title">
                  직인
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 4 Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[11px] text-gray-400 font-mono">
          <span>대구광역시교육청 마음학기제 「마음플레이_감정일기」</span>
          <span>- 4 / 4 (완결) -</span>
        </div>
      </div>
    </div>
  );
};
