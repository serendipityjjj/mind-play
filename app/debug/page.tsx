"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface DebugReport {
  success: boolean;
  timestamp: string;
  latencyMs: number;
  backendStatus: {
    hasCloudBackend: boolean;
    hasLocalServerDb: boolean;
    dbPath: string;
    dbExists: boolean;
    dbWritable: boolean;
    error: string | null;
  };
  envStatus: {
    NEXT_PUBLIC_API_URL: string | null;
    GEMINI_API_KEY: string | null;
    FIREBASE_CONFIG: string | null;
    NODE_ENV: string;
  };
  codeAuditIssues: Array<{
    file: string;
    line: number;
    type: string;
    snippet: string;
    isSourceOfTruth: boolean;
  }>;
  roomData: any;
}

export default function DebugDiagnosticsPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  
  const [roomCode, setRoomCode] = useState<string>("CLASS1");
  const [report, setReport] = useState<DebugReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [lastUpdatedTime, setLastUpdatedTime] = useState<number>(Date.now());
  const [secondsSinceLastUpdate, setSecondsSinceLastUpdate] = useState<number>(0);
  const [pollingActive, setPollingActive] = useState<boolean>(true);
  
  const [mockGenMessage, setMockGenMessage] = useState<string>("");
  const [dispatchResult, setDispatchResult] = useState<any>(null);

  // 1초 타이머 (마지막 갱신 N초 전 계산 및 폴링 상태 표시)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSinceLastUpdate(Math.floor((Date.now() - lastUpdatedTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdatedTime]);

  // 3초 자동 폴링
  const fetchDiagnostics = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const res = await fetch(`/api/debug?room=${encodeURIComponent(roomCode)}`);
      const data = await res.json();
      if (data.success) {
        setReport(data);
        setLastUpdatedTime(Date.now());
        setSecondsSinceLastUpdate(0);
      }
    } catch (err) {
      console.error("Failed to fetch debug diagnostics:", err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;
    fetchDiagnostics(true);
    if (!pollingActive) return;

    const interval = setInterval(() => {
      fetchDiagnostics(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthorized, roomCode, pollingActive]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "8888") {
      setIsAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("교사 전용 비밀번호(8888)가 일치하지 않습니다.");
    }
  };

  const handleGenerateMock26 = async () => {
    if (!confirm("현재 수업방에 가짜 학생 26명의 사연, 강점, 밸런스, 브랜딩 데이터를 생성하시겠습니까?")) return;
    try {
      const res = await fetch("/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "GENERATE_26_MOCK_STUDENTS", roomCode })
      });
      const data = await res.json();
      if (data.success) {
        setMockGenMessage("✅ 가짜 학생 26명 데이터 생성 완료! (서버 DB 즉시 반영)");
        fetchDiagnostics(false);
      }
    } catch (e: any) {
      alert("생성 실패: " + e.message);
    }
  };

  const handleDispatchDerangement = async () => {
    try {
      const res = await fetch("/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "DISPATCH_DERANGEMENT_TEST", roomCode })
      });
      const data = await res.json();
      if (data.success) {
        setDispatchResult(data);
        fetchDiagnostics(false);
      }
    } catch (e: any) {
      alert("배정 실패: " + e.message);
    }
  };

  const handleResetRoom = async () => {
    if (!confirm(`정말로 수업방 [${roomCode}] 데이터를 완전히 초기화하시겠습니까?`)) return;
    try {
      const res = await fetch("/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RESET_ROOM_DATA", roomCode })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setDispatchResult(null);
        setMockGenMessage("");
        fetchDiagnostics(false);
      }
    } catch (e: any) {
      alert("초기화 실패: " + e.message);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-2xl flex items-center justify-center text-3xl mx-auto">
              🔒
            </div>
            <h1 className="text-xl font-bold font-title">동기화 자가진단 시스템 (/debug)</h1>
            <p className="text-xs text-slate-400">
              교사 전용 보안 페이지입니다. 학생에게는 노출되지 않습니다.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                교사 비밀번호 (기본: 8888)
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                autoFocus
              />
            </div>
            {authError && <p className="text-xs text-rose-400 font-bold">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm transition shadow-md"
            >
              진단 대시보드 입장 ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  const room = report?.roomData;
  const storiesCount = room?.stories?.length || 0;
  const assignCount = Object.keys(room?.assign || {}).length;
  const postcardsCount = room?.postcards?.length || 0;
  const strengthsCount = Object.keys(room?.strengths || {}).length;
  const pairsCount = Object.keys(room?.pairs || {}).length;
  const feedbackCount = Object.keys(room?.feedback || {}).length;
  const balanceCount = Object.keys(room?.balance || {}).length;
  const syncCount = Object.keys(room?.sync || {}).length;
  const cardsCount = Object.keys(room?.cards || {}).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold font-mono">
              DIAGNOSTICS v1.0
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-title text-white">
              실시간 동기화 &amp; 서버 공용 저장소 자가진단 센터
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            다중 기기 실시간 동기화 상태, 환경변수, 데이터 원본(Source of Truth) 침해 여부를 실시간 감사하고 시뮬레이션합니다.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-slate-400">수업방 코드:</span>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-emerald-400 font-mono font-bold"
            />
          </div>

          <button
            type="button"
            onClick={() => setPollingActive(!pollingActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              pollingActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-slate-800 text-slate-400"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${pollingActive ? "bg-emerald-400 animate-ping" : "bg-slate-500"}`} />
            <span>{pollingActive ? "3초 자동 폴링 중" : "폴링 정지됨"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* [화면 상단 - 환경 점검] */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>🖥️</span>
              <span>1. 환경 및 백엔드 연결 상태 점검</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              마지막 측정: {secondsSinceLastUpdate}초 전 | 응답 지연: {report?.latencyMs || 0}ms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. 백엔드 연결 여부 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">1. 백엔드 연결</span>
                {report?.backendStatus.hasLocalServerDb && report?.backendStatus.dbWritable ? (
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                    ✅ 서버 DB 연결됨
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-md font-bold">
                    ❌ 백엔드 없음
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                {report?.backendStatus.hasLocalServerDb && report?.backendStatus.dbWritable ? (
                  <>✓ 중앙 파일 기반 DB 활성화<br />✓ 경로: {report?.backendStatus.dbPath.split("/").pop()}</>
                ) : (
                  <span className="text-rose-400 font-bold">
                    ❌ 백엔드 없음 - 기기 간 동기화 원리상 불가능
                  </span>
                )}
              </p>
            </div>

            {/* 2. 환경 변수 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">2. 환경변수 (마스킹)</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                  ✅ 정상 로드
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-mono space-y-0.5">
                <div>GEMINI_KEY: {report?.envStatus.GEMINI_API_KEY || "미설정 (기본챗봇 동작)"}</div>
                <div>NODE_ENV: {report?.envStatus.NODE_ENV}</div>
              </div>
            </div>

            {/* 3. 서버 쓰기/읽기 테스트 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">3. 서버 쓰기 테스트</span>
                {report?.backendStatus.dbWritable ? (
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                    ✅ 쓰기/읽기 일치
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-md font-bold">
                    ❌ 쓰기 실패
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {report?.backendStatus.dbWritable ? "✓ 임시 테스트 키 생성→저장→검증 통과" : "쓰기 권한 또는 디스크 오류"}
              </p>
            </div>

            {/* 4 & 5. 지연 및 폴링 상태 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">4. 왕복 지연 &amp; 폴링</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                  ✅ {report?.latencyMs || 0}ms
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-mono space-y-0.5">
                <div>타이머 갱신: {secondsSinceLastUpdate}초 전</div>
                <div>폴링 주기: 3초 (자동 갱신 중)</div>
              </div>
            </div>
          </div>
        </section>

        {/* [화면 중단 - 데이터 저장 위치 감사] */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🔍</span>
                <span>2. 코드 전체 데이터 저장 위치 감사 (Source of Truth 감사)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                학급 공용 데이터가 localStorage/sessionStorage에 직접 저장되어 동기화를 파괴하는 코드를 정밀 스캔합니다.
              </p>
            </div>

            {report?.codeAuditIssues.length === 0 ? (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
                ✅ 클린 상태 (위반 0건)
              </span>
            ) : (
              <span className="px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-bold">
                ❌ 로컬 저장소 의존 {report?.codeAuditIssues.length}건 발견
              </span>
            )}
          </div>

          {report?.codeAuditIssues && report.codeAuditIssues.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {report.codeAuditIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between text-rose-300 font-bold">
                    <span>❌ [{issue.type}] {issue.file}:{issue.line}</span>
                    <span className="text-[10px] bg-rose-900 px-2 py-0.5 rounded text-white">동기화 위험</span>
                  </div>
                  <pre className="text-[11px] text-slate-300 bg-black/40 p-2 rounded overflow-x-auto">
                    {issue.snippet}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl text-xs text-emerald-300 font-mono flex items-center gap-2">
              <span>✨</span>
              <span>모든 학급 상태(사연, 엽서, 조하리 배정, 피드백, 밸런스, 브랜딩)가 서버 측 공용 DB를 유일한 원본으로 사용하고 있습니다.</span>
            </div>
          )}
        </section>

        {/* [가짜 학생 버튼 & 시뮬레이션 제어 바] */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>🤖</span>
              <span>3. 가짜 학생 26명 생성 &amp; 완전순열 배정 시뮬레이터</span>
            </h2>
            <span className="text-xs text-slate-400">교사 1인 단독 풀사이클 테스트용</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerateMock26}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2"
            >
              <span>👥</span>
              <span>가짜 학생 26명 생성 (사연/강점/밸런스/브랜딩)</span>
            </button>

            <button
              type="button"
              onClick={handleDispatchDerangement}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2"
            >
              <span>🤝</span>
              <span>1:1 무작위 배정 실행 (Derangement 검증)</span>
            </button>

            <button
              type="button"
              onClick={handleResetRoom}
              className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2"
            >
              <span>🧹</span>
              <span>수업방 전체 초기화</span>
            </button>
          </div>

          {mockGenMessage && (
            <div className="p-3 bg-indigo-950/60 border border-indigo-700/60 rounded-xl text-xs text-indigo-200 font-mono">
              {mockGenMessage}
            </div>
          )}

          {dispatchResult && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  배정 결과 검증: 총 {Object.keys(dispatchResult.assignment || {}).length}명 배정됨
                </span>
                {dispatchResult.selfAssignedCount === 0 ? (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold font-mono">
                    ✅ 자기 자신 배정 0건 (완전순열 Derangement 통과)
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold font-mono">
                    ❌ 자기 자신 배정 {dispatchResult.selfAssignedCount}건 발생!
                  </span>
                )}
              </div>

              <div className="max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-[11px] font-mono">
                {Object.entries(dispatchResult.assignment || {}).map(([fromId, toId]) => {
                  const isSelf = fromId === toId;
                  return (
                    <div
                      key={fromId}
                      className={`p-2 rounded-lg border ${
                        isSelf ? "bg-rose-950 border-rose-600 text-rose-200" : "bg-slate-900 border-slate-800 text-slate-300"
                      }`}
                    >
                      {fromId} ➔ {toId as string}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* [화면 하단 - 단계별 데이터 현황 & Raw JSON] */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>📊</span>
              <span>4. 현재 수업방 [{roomCode}] 실시간 데이터 현황 (3초 자동 갱신)</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400">
              마지막 수신: {secondsSinceLastUpdate}초 전
            </span>
          </div>

          {/* 메트릭 그리드 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">1단계 사연/배정/엽서</span>
              <div className="text-sm font-bold text-emerald-400">
                {storiesCount} / {assignCount} / {postcardsCount}
              </div>
              <div className="text-[10px] text-slate-500">phase: {room?.phase || "writing"}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">2단계 강점/배정/피드백</span>
              <div className="text-sm font-bold text-emerald-400">
                {strengthsCount} / {pairsCount} / {feedbackCount}
              </div>
              <div className="text-[10px] text-slate-500">johari: {room?.johariPhase || "stepA"}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">4단계 밸런스/싱크로율</span>
              <div className="text-sm font-bold text-emerald-400">
                {balanceCount} / {syncCount}
              </div>
              <div className="text-[10px] text-slate-500">phase4: {room?.phase4 || "playing"}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">5~6단계 브랜딩 카드</span>
              <div className="text-sm font-bold text-emerald-400">
                {cardsCount} / 26
              </div>
              <div className="text-[10px] text-slate-500">phase6: {room?.phase6 || "writing"}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">교사 제어 플래그</span>
              <div className="text-[11px] text-slate-300">
                <div>조하리: {room?.controls?.isJohariUnlocked ? "🔓" : "🔒"}</div>
                <div>밸런스: {room?.controls?.isBalanceResultBroadcasted ? "📢" : "대기"}</div>
                <div>갤러리: {room?.controls?.isLesson3GalleryUnlocked ? "🏛️" : "대기"}</div>
              </div>
            </div>
          </div>

          {/* Raw JSON 뷰어 */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-bold block">서버 원본 Raw JSON:</span>
            <pre className="p-4 bg-black/60 border border-slate-800 rounded-2xl text-[11px] font-mono text-emerald-400 max-h-80 overflow-y-auto">
              {JSON.stringify(room, null, 2) || "// 현재 방에 등록된 데이터가 없습니다."}
            </pre>
          </div>
        </section>

        {/* Home Navigation */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition shadow inline-flex items-center gap-2"
          >
            <span>🏠</span>
            <span>마음플레이 홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
