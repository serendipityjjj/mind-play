"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FlipbookViewer } from "@/components/novel/FlipbookViewer";
import { NovelizerModal } from "@/components/novel/NovelizerModal";
import { EMOTION_CLOUDS } from "@/lib/emotions";
import { CURRICULUM } from "@/lib/curriculum";
import {
  getCurrentUser,
  getStoredDiaries,
  getStoredNovel,
  logoutUser,
  fetchStudentProfileFromServer,
  UserProfile,
  DiaryEntry,
  NovelData,
} from "@/lib/storage";
import {
  Sparkles,
  BookOpen,
  Printer,
  Calendar,
  Award,
  Heart,
  ChevronRight,
  User,
  GraduationCap,
  CheckCircle2,
  Lock,
  Unlock,
  Shield,
  Layers,
  Scale,
  LogOut,
  X,
  Edit3,
} from "lucide-react";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [novel, setNovel] = useState<NovelData | null>(null);
  const [activityProfile, setActivityProfile] = useState<any>(null);

  // Modals
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [isNovelModalOpen, setIsNovelModalOpen] = useState(false);

  useEffect(() => {
    const loadedUser = getCurrentUser();
    const loadedDiaries = getStoredDiaries();
    const loadedNovel = getStoredNovel();

    setUser(loadedUser);
    setDiaries(loadedDiaries);
    setNovel(loadedNovel);

    if (loadedUser?.studentId) {
      fetchStudentProfileFromServer(loadedUser.studentId).then((res) => {
        if (res.profile) {
          setActivityProfile(res.profile);
        }
        if (res.diaries && res.diaries.length > 0) {
          // Merge server diaries with local
          setDiaries((prev) => {
            const map = new Map();
            prev.forEach((d) => map.set(d.lessonNo, d));
            res.diaries.forEach((d: DiaryEntry) => map.set(d.lessonNo, d));
            return Array.from(map.values()).sort((a, b) => a.lessonNo - b.lessonNo);
          });
        }
      });
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/auth");
  };

  if (!user) return null;

  const completedCount = diaries.filter((d) => d.completed !== false).length;
  const progressPercent = Math.round((completedCount / 15) * 100);
  const userCharacter =
    EMOTION_CLOUDS.find((c) => c.id === user.characterId) || EMOTION_CLOUDS[0];

  // Emotion count stats
  const emotionStats: Record<string, number> = {};
  diaries.forEach((d) => {
    if (d.emotionId) {
      emotionStats[d.emotionId] = (emotionStats[d.emotionId] || 0) + 1;
    }
  });

  return (
    <div className="min-h-screen bg-radial-main selection:bg-rosepink-light selection:text-rosepink py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Navbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-deepgreen/15">
          <Link href="/" className="flex items-center gap-2 group transition">
            <div className="w-10 h-10 rounded-2xl bg-deepgreen text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition">
              🌸
            </div>
            <div>
              <span className="font-badge text-[10px] text-deepgreen font-bold block tracking-wider">
                대구광역시교육청 마음학기제
              </span>
              <h1 className="font-title text-base sm:text-lg font-bold text-gray-900 leading-tight">
                마음플레이_감정일기
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-badge font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-deepgreen" />
              <span>일기 작성 홈</span>
            </Link>
            <Link
              href="/print-portfolio"
              className="px-3.5 py-2 bg-gradient-to-r from-deepgreen to-rosepink text-white rounded-xl text-xs font-badge font-bold shadow-sm hover:opacity-95 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>전시용 책자 PDF 인쇄</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
              title="로그아웃"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Profile Card & 15-Week Progress */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-deepgreen/20 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-deepgreen-light to-rosepink-light border-2 border-deepgreen/30 flex items-center justify-center text-3xl shadow-md">
                {userCharacter.emoji}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-deepgreen bg-deepgreen-light px-2.5 py-0.5 rounded-full border border-deepgreen/20">
                    {user.schoolName} · {user.gradeClass}
                  </span>
                  <span className="text-xs text-gray-400 font-mono font-bold">
                    학번: {user.studentId}
                  </span>
                </div>
                <h2 className="text-2xl font-title font-bold text-gray-900">
                  {user.name} <span className="text-rosepink font-hand font-normal text-xl">({user.nickname})</span>
                </h2>
                <p className="text-xs text-gray-500 font-sans">
                  &quot;매주 목요일, 8가지 감정 구름과 함께 나를 마주하고 단단하게 자라납니다.&quot;
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  if (novel) setIsFlipbookOpen(true);
                  else setIsNovelModalOpen(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-2xl text-xs font-badge font-bold shadow-md hover:opacity-95 transition flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>성장 소설 플립북 읽기</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-badge">
              <span className="font-bold text-gray-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-deepgreen" />
                <span>15차시 마음학기제 완주율</span>
              </span>
              <span className="font-mono font-bold text-deepgreen">
                {completedCount} / 15 차시 완료 ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-deepgreen via-teal-500 to-rosepink rounded-full transition-all duration-700 shadow-inner"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Emotion Cloud Stamps & Statistics */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-deepgreen" />
              <h3 className="font-title text-base font-bold text-gray-900">
                15주간 나의 감정 구름 캘린더 스탬프
              </h3>
            </div>
            <span className="text-xs font-sans text-gray-500">
              클릭 시 해당 차시 기록을 열람할 수 있습니다.
            </span>
          </div>

          {/* Stamp Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-2">
            {Array.from({ length: 15 }, (_, i) => i + 1).map((no) => {
              const entry = diaries.find((d) => d.lessonNo === no);
              const emotion = entry
                ? EMOTION_CLOUDS.find((c) => c.id === entry.emotionId)
                : null;
              return (
                <button
                  key={no}
                  type="button"
                  onClick={() => entry && setSelectedEntry(entry)}
                  className={`p-2 rounded-2xl border text-center transition flex flex-col items-center justify-between min-h-[76px] ${
                    entry
                      ? "bg-gradient-to-b from-white to-green-50/70 border-deepgreen/40 hover:scale-105 hover:shadow-md cursor-pointer"
                      : "bg-gray-50 border-gray-200 opacity-40 cursor-default"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-gray-500">
                    {no}주차
                  </span>
                  <span className="text-2xl my-0.5">
                    {emotion ? emotion.emoji : "☁️"}
                  </span>
                  <span className="text-[9px] font-badge text-gray-700 truncate w-full">
                    {emotion ? emotion.name.split("·")[0] : "미작성"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Emotion Cloud Frequency Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-badge text-gray-500 font-bold mr-1">
              자주 만난 감정:
            </span>
            {EMOTION_CLOUDS.map((c) => {
              const count = emotionStats[c.id] || 0;
              if (count === 0) return null;
              return (
                <span
                  key={c.id}
                  className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-badge flex items-center gap-1 border border-gray-200"
                >
                  <span>{c.emoji}</span>
                  <span>{c.name.split("·")[0]}</span>
                  <strong className="font-mono text-deepgreen">{count}회</strong>
                </span>
              );
            })}
          </div>
        </div>

        {/* 🌟 마이페이지 영구 저장 특별활동 리포트 (2단계 강점, 3단계 5대 검사·카드, 4단계 주크박스·듀얼편지) */}
        {activityProfile && (activityProfile.lesson2 || activityProfile.lesson3 || activityProfile.lesson4) && (
          <div className="bg-gradient-to-br from-white via-amber-50/20 to-teal-50/20 rounded-3xl border-2 border-deepgreen/30 shadow-lg p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-deepgreen text-white flex items-center justify-center text-lg shadow-sm">
                  💎
                </div>
                <div>
                  <h3 className="font-title text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>나의 마음성장 종합 리포트</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-dodum font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                      서버 영구 보존됨 🔒
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    2·3·4단계에서 학생들이 탐색하고 저장한 핵심 성장 프로필입니다.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-400">
                마지막 갱신: {activityProfile.updatedAt || new Date().toLocaleDateString("ko-KR")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 2단계 강점 리포트 */}
              {activityProfile.lesson2 && (
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                    <span className="text-base">🪞</span>
                    <h4 className="font-title text-sm font-bold text-emerald-950">
                      2단계: 조하리의 창 강점
                    </h4>
                  </div>
                  {activityProfile.lesson2.mine && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-dodum font-bold text-emerald-800 block">
                        ✨ 내가 선택한 강점 5가지:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {activityProfile.lesson2.mine.map((s: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-dodum">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activityProfile.lesson2.hope && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-dodum font-bold text-teal-800 block">
                        🌱 닮고 싶은 희망 강점 2가지:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {activityProfile.lesson2.hope.map((s: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-900 border border-teal-200 rounded-lg text-xs font-dodum">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activityProfile.lesson2.savedAt && (
                    <span className="text-[10px] font-mono text-gray-400 block pt-1">
                      저장: {activityProfile.lesson2.savedAt}
                    </span>
                  )}
                </div>
              )}

              {/* 3단계 5대 검사 및 브랜딩 리포트 */}
              {activityProfile.lesson3 && (
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-indigo-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                    <span className="text-base">🧬</span>
                    <h4 className="font-title text-sm font-bold text-indigo-950">
                      3단계: 다중지능 &amp; 성격 브랜딩
                    </h4>
                  </div>
                  {activityProfile.lesson3.gardner?.top3 && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-dodum font-bold text-indigo-900 block">
                        🧠 다중지능 TOP 3:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {activityProfile.lesson3.gardner.top3.map((g: any, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-lg text-xs font-dodum">
                            {g.name} ({g.score}점)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activityProfile.lesson3.keirsey?.temperament && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-dodum font-bold text-purple-900 block">
                        🎭 성격기질:
                      </span>
                      <span className="px-2 py-0.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg text-xs font-dodum font-bold inline-block">
                        {activityProfile.lesson3.keirsey.temperament.name} ({activityProfile.lesson3.keirsey.temperament.title})
                      </span>
                    </div>
                  )}
                  {activityProfile.lesson3.brandingCard && (
                    <div className="space-y-1 pt-1 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200 text-xs font-dodum">
                      <span className="font-bold text-amber-900 block">
                        🏷️ 슬로건: &quot;{activityProfile.lesson3.brandingCard.slogan}&quot;
                      </span>
                      {activityProfile.lesson3.brandingCard.roleModel && (
                        <p className="text-gray-700 text-[11px]">
                          롤모델: {activityProfile.lesson3.brandingCard.roleModel}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 4단계 주크박스 & 듀얼 편지 리포트 */}
              {activityProfile.lesson4 && (
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-rose-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
                    <span className="text-base">🎵</span>
                    <h4 className="font-title text-sm font-bold text-rose-950">
                      4단계: 치유 주크박스 &amp; 듀얼 마음편지
                    </h4>
                  </div>
                  {activityProfile.lesson4.jukebox && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-dodum font-bold text-rose-800 block">
                        🎧 나의 힐링 추천곡:
                      </span>
                      <div className="p-2 bg-rose-50 rounded-xl border border-rose-200 text-xs font-dodum">
                        <p className="font-bold text-rose-900">{activityProfile.lesson4.jukebox.title} - {activityProfile.lesson4.jukebox.artist}</p>
                        <p className="text-gray-600 text-[11px] italic mt-0.5">&quot;{activityProfile.lesson4.jukebox.reason}&quot;</p>
                      </div>
                    </div>
                  )}
                  {activityProfile.lesson4.dualLetter && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-dodum font-bold text-teal-800 block">
                        💌 To. {activityProfile.lesson4.dualLetter.targetNickname || "소중한 친구"}
                      </span>
                      <div className="p-2.5 bg-teal-50/70 rounded-xl border border-teal-200 text-xs font-dodum space-y-1">
                        {activityProfile.lesson4.dualLetter.thanksReason && (
                          <p className="text-amber-900">
                            <strong>💛 감사:</strong> {activityProfile.lesson4.dualLetter.thanksReason}
                          </p>
                        )}
                        {activityProfile.lesson4.dualLetter.sorryAdmit && (
                          <p className="text-teal-900">
                            <strong>💚 인사약:</strong> {activityProfile.lesson4.dualLetter.sorryAdmit}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {activityProfile.lesson4.dailyMoments && (
                    <div className="pt-1">
                      <span className="text-[11px] font-dodum font-bold text-gray-700 block">
                        📝 일상 감정 상황 체크 완료
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 15-Lesson Archive Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-lg font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-rosepink" />
              <span>1~15차시 활동 기록물 전체 아카이브</span>
            </h3>
            <span className="text-xs text-gray-500 font-sans">
              카드를 클릭하여 상세 활동 내용을 확인하세요.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRICULUM.map((lesson) => {
              const entry = diaries.find((d) => d.lessonNo === lesson.lessonNo);
              const emotion = entry
                ? EMOTION_CLOUDS.find((c) => c.id === entry.emotionId)
                : null;
              const isDone = !!entry?.completed;

              return (
                <div
                  key={lesson.lessonNo}
                  onClick={() => entry && setSelectedEntry(entry)}
                  className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                    isDone
                      ? "bg-white border-deepgreen/20 hover:border-deepgreen hover:shadow-lg hover:scale-[1.01]"
                      : "bg-gray-50 border-gray-200 opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-badge font-bold">
                        {lesson.area.split(" ")[1] || lesson.area}
                      </span>
                      {isDone ? (
                        <span className="text-xs font-badge font-bold text-deepgreen flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 완료
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-gray-400">
                          미완료
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="text-2xl p-1.5 rounded-xl bg-gray-50 border border-gray-100">
                        {emotion ? emotion.emoji : "☁️"}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 block">
                          {lesson.lessonNo}차시 · {entry?.date || "2026.03"}
                        </span>
                        <h4 className="text-sm font-title font-bold text-gray-900 leading-snug">
                          {lesson.topic}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs font-hand text-gray-600 line-clamp-2 leading-relaxed bg-amber-50/30 p-2.5 rounded-xl border border-amber-100/50">
                      {entry?.diaryText || lesson.goal}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 text-[11px] font-sans text-gray-500">
                    <div className="flex gap-1">
                      {entry?.hashtags.slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="text-rosepink font-hand">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-deepgreen font-badge font-bold flex items-center gap-0.5">
                      상세보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Entry Detail Interactive Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp relative">
            <button
              type="button"
              onClick={() => setSelectedEntry(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 border-b pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-deepgreen-light text-deepgreen rounded-full text-xs font-badge font-bold">
                  {selectedEntry.lessonNo}차시 상세 기록
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {selectedEntry.date}
                </span>
              </div>
              <h3 className="text-xl font-title font-bold text-gray-900">
                {selectedEntry.lessonTopic || `${selectedEntry.lessonNo}차시 마음활동`}
              </h3>
            </div>

            {/* Emotion & Hashtags */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {EMOTION_CLOUDS.find((c) => c.id === selectedEntry.emotionId)?.emoji || "🌸"}
                </div>
                <div>
                  <span className="text-xs font-badge font-bold text-gray-800">
                    기록된 감정: {EMOTION_CLOUDS.find((c) => c.id === selectedEntry.emotionId)?.name}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {selectedEntry.hashtags?.map((tag, i) => (
                      <span key={i} className="text-xs font-hand text-rosepink">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-amber-500 text-sm font-mono font-bold">
                ★ {selectedEntry.evalStars?.q1 || 5}/5
              </div>
            </div>

            {/* Activity Specific Data Section */}
            <div className="space-y-3">
              <h4 className="font-title text-sm font-bold text-gray-800">
                🎯 차시별 인터랙티브 활동 결과
              </h4>

              {/* Lesson 1 */}
              {selectedEntry.lessonNo === 1 && selectedEntry.interactiveData?.timeCapsule && (
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2 text-xs font-sans">
                  <p><strong>비밀 고민:</strong> {selectedEntry.interactiveData.timeCapsule.secretWorry}</p>
                  <p className="font-hand text-sm text-gray-800 bg-white p-2.5 rounded-xl border border-amber-200">
                    &quot;{selectedEntry.interactiveData.timeCapsule.letterToFuture}&quot;
                  </p>
                </div>
              )}

              {/* Lesson 2 & 3 */}
              {selectedEntry.lessonNo === 2 && selectedEntry.interactiveData?.gems && (
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5 text-xs font-sans">
                  <p><strong>발견한 강점 보석:</strong> {selectedEntry.interactiveData.gems.join(", ")}</p>
                  <p className="font-hand text-sm text-gray-800 bg-white p-2.5 rounded-xl border border-emerald-200">
                    &quot;{selectedEntry.interactiveData?.mask?.sentence}&quot;
                  </p>
                </div>
              )}

              {selectedEntry.lessonNo === 3 && selectedEntry.interactiveData?.profileCard && (
                <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-1.5 text-xs font-sans">
                  <p><strong>가면 타이틀:</strong> {selectedEntry.interactiveData.profileCard.maskTitle}</p>
                  <p><strong>이럴 때 나를 찾아줘:</strong> {selectedEntry.interactiveData.profileCard.callMeWhen}</p>
                  <p><strong>나만의 당당한 다짐:</strong> {selectedEntry.interactiveData.profileCard.selfCheer}</p>
                </div>
              )}

              {/* Lesson 4 */}
              {selectedEntry.lessonNo === 4 && selectedEntry.interactiveData?.emotionWords && (
                <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-1.5 text-xs font-sans">
                  <p><strong>감정 단어 3가지:</strong> {selectedEntry.interactiveData.emotionWords.join(", ")}</p>
                  <p><strong>감정 몬스터:</strong> {selectedEntry.interactiveData.emotionMonster?.name} ({selectedEntry.interactiveData.emotionMonster?.state})</p>
                </div>
              )}

              {/* Lesson 5 */}
              {selectedEntry.lessonNo === 5 && selectedEntry.interactiveData?.coolDown && (
                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-1.5 text-xs font-sans">
                  <p><strong>기록된 마음 온도:</strong> {selectedEntry.interactiveData.coolDown.selectedTemp}℃</p>
                  <p><strong>나만의 이완 주문:</strong> &quot;{selectedEntry.interactiveData.coolDown.mantra}&quot;</p>
                  <p><strong>실천 행동:</strong> {selectedEntry.interactiveData.coolDown.action}</p>
                </div>
              )}

              {/* Lesson 6 ABCD */}
              {selectedEntry.lessonNo === 6 && selectedEntry.interactiveData?.customData && (
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1 text-xs font-sans">
                  <p><strong>A (사건):</strong> {selectedEntry.interactiveData.customData.activatingEvent}</p>
                  <p className="text-red-600"><strong>B (비합리적 신념):</strong> {selectedEntry.interactiveData.customData.irrationalBelief}</p>
                  <p className="text-green-700 font-bold"><strong>D (합리적 신념):</strong> {selectedEntry.interactiveData.customData.effectiveBelief}</p>
                </div>
              )}

              {/* Other generic customData renderer */}
              {selectedEntry.interactiveData?.customData && selectedEntry.lessonNo > 6 && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1 text-xs font-sans">
                  {Object.entries(selectedEntry.interactiveData.customData).map(([key, val]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {typeof val === "object" ? JSON.stringify(val) : String(val)}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Diary Content */}
            <div className="space-y-2">
              <h4 className="font-title text-sm font-bold text-gray-800">
                📝 작성된 감정일기 본문
              </h4>
              <p className="font-hand text-base text-gray-800 leading-relaxed bg-[#FFFDF0] p-4 rounded-2xl border border-amber-200 whitespace-pre-line">
                {selectedEntry.diaryText}
              </p>
            </div>

            {/* Photo if uploaded */}
            {selectedEntry.imageUrl && (
              <div className="space-y-2">
                <h4 className="font-title text-sm font-bold text-gray-800">
                  📷 활동 인증 사진
                </h4>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedEntry.imageUrl}
                    alt="Activity Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-badge font-bold hover:bg-gray-800 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Flipbook Viewer Modal */}
      {novel && (
        <FlipbookViewer
          novel={novel}
          isOpen={isFlipbookOpen}
          onClose={() => setIsFlipbookOpen(false)}
        />
      )}

      {/* Novelizer Modal */}
      <NovelizerModal
        isOpen={isNovelModalOpen}
        onClose={() => setIsNovelModalOpen(false)}
        nickname={user.nickname}
        diaries={diaries}
        onNovelGenerated={(newNovel) => {
          setNovel(newNovel);
          setIsFlipbookOpen(true);
        }}
      />
    </div>
  );
}
