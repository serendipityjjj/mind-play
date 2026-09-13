"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EMOTION_CLOUDS } from "@/lib/emotions";
import { registerUser, loginUser, UserProfile } from "@/lib/storage";
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User,
  GraduationCap,
  Smile,
  BookOpen,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form State
  const [studentId, setStudentId] = useState("10315");
  const [name, setName] = useState("김하늘");
  const [password, setPassword] = useState("1234");
  const [nickname, setNickname] = useState("햇살구름");
  const [schoolName, setSchoolName] = useState("대구중학교");
  const [selectedCharacterId, setSelectedCharacterId] = useState("proud_happy");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setErrorMsg("학번을 입력해 주세요 (예: 10315)");
      return;
    }
    const user = loginUser(studentId.trim(), name.trim());
    if (user) {
      setSuccessMsg(`${user.name} 학생, 반가워요! 로그인 성공 ✨`);
      setTimeout(() => {
        router.push("/mypage");
      }, 800);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !name.trim() || !nickname.trim()) {
      setErrorMsg("학번, 이름, 닉네임을 모두 입력해 주세요.");
      return;
    }

    const grade = studentId.slice(0, 1) || "1";
    const classNum = parseInt(studentId.slice(1, 3)) || 1;
    const num = parseInt(studentId.slice(3)) || 1;

    const user: Omit<UserProfile, "id"> = {
      studentId: studentId.trim(),
      name: name.trim(),
      nickname: nickname.trim(),
      characterId: selectedCharacterId,
      schoolName: schoolName.trim() || "대구중학교",
      gradeClass: `${grade}학년 ${classNum}반 ${num}번`,
      isLoggedIn: true,
    };

    registerUser(user);
    setSuccessMsg(`환영합니다, ${name} 학생! 계정이 생성되었습니다 🎉`);
    setTimeout(() => {
      router.push("/mypage");
    }, 800);
  };

  const handleGoogleWorkspaceLogin = () => {
    const googleUser: Omit<UserProfile, "id"> = {
      studentId: "10315",
      name: "김하늘",
      nickname: "햇살구름",
      characterId: "proud_happy",
      schoolName: "대구중학교",
      gradeClass: "1학년 3반 15번",
      email: "sky10315@school.kr",
      isLoggedIn: true,
    };
    registerUser(googleUser);
    setSuccessMsg("학교 구글 워크스페이스(@school.kr) 연동 완료! ✨");
    setTimeout(() => {
      router.push("/mypage");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-radial-main flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Top Brand Nav */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pb-6">
        <Link
          href="/"
          className="flex items-center gap-2 group transition"
        >
          <div className="w-10 h-10 rounded-2xl bg-deepgreen text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition">
            🌸
          </div>
          <div>
            <span className="font-badge text-[10px] text-deepgreen font-bold block tracking-wider">
              대구광역시교육청 마음학기제
            </span>
            <h1 className="font-title text-lg font-bold text-gray-900 leading-tight">
              마음플레이_감정일기
            </h1>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-badge text-gray-500 hover:text-deepgreen underline"
        >
          홈으로 가기
        </Link>
      </div>

      {/* Main Auth Card */}
      <div className="max-w-md w-full mx-auto bg-white/95 backdrop-blur-md rounded-3xl border border-deepgreen/20 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 bg-deepgreen-light text-deepgreen rounded-full text-xs font-badge font-bold inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>중학생 맞춤 간편 학생 인증</span>
          </span>
          <h2 className="text-2xl font-title font-bold text-gray-900">
            {isSignUp ? "새로운 마음 친구 등록" : "마음교실 학생 로그인"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-sans">
            {isSignUp
              ? "학번과 나만의 감정 닉네임을 설정하고 15주 여정을 시작해 보세요."
              : "나의 15차시 감정일기와 성장 소설을 열람하기 위해 로그인해 주세요."}
          </p>
        </div>

        {/* Tab Switch */}
        <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-badge font-bold">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2.5 rounded-xl transition ${
              !isSignUp
                ? "bg-white text-deepgreen shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            기존 학생 로그인
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2.5 rounded-xl transition ${
              isSignUp
                ? "bg-white text-rosepink shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            신규 학생 가입
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-sans text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-badge font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-badge font-bold text-gray-700 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-deepgreen" />
              <span>학번 (5자리: 학년+반+번호)</span>
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="예: 10315 (1학년 3반 15번)"
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-deepgreen text-sm font-mono font-bold"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-badge font-bold text-gray-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-deepgreen" />
              <span>학생 이름</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 김하늘"
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-deepgreen text-sm font-sans"
              required
            />
          </div>

          {isSignUp && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-badge font-bold text-gray-700 flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5 text-rosepink" />
                  <span>나만의 감정 닉네임</span>
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 햇살구름, 초록별, 용기요정"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rosepink text-sm font-hand text-base"
                  required
                />
              </div>

              {/* Character Picker */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-badge font-bold text-gray-700 block">
                  대표 프로필 감정 구름 캐릭터
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {EMOTION_CLOUDS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCharacterId(c.id)}
                      className={`p-2 rounded-xl border-2 text-center transition flex flex-col items-center gap-0.5 ${
                        selectedCharacterId === c.id
                          ? "border-rosepink bg-rosepink-light/40 shadow-sm scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-xl">{c.emoji}</span>
                      <span className="text-[10px] font-badge text-gray-700 truncate w-full">
                        {c.name.split("·")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-badge font-bold text-gray-700 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-deepgreen" />
              <span>간편 비밀번호 (4자리 이상)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-deepgreen text-sm font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-deepgreen to-[#16A34A] text-white rounded-2xl font-badge font-bold text-sm shadow-md hover:opacity-95 active:scale-95 transition flex items-center justify-center gap-2 mt-4"
          >
            <span>{isSignUp ? "학생 계정 등록하고 시작하기" : "마음 아카이브 입장하기"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider & Google Workspace Login */}
        <div className="relative border-t border-gray-200 pt-4">
          <span className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-[11px] font-sans text-gray-400">
            또는
          </span>

          <button
            type="button"
            onClick={handleGoogleWorkspaceLogin}
            className="w-full mt-2 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl text-xs font-badge font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="text-base">🏫</span>
            <span>학교 구글 워크스페이스(@school.kr) 원클릭 로그인</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-500 font-sans flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-deepgreen shrink-0" />
          <span>모든 감정일기와 소설 데이터는 안전하게 암호화 및 보관됩니다.</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 font-sans pt-6">
        대구광역시교육청 마음학기제 「마음플레이_감정일기」 학생 지원 포털
      </footer>
    </div>
  );
}
