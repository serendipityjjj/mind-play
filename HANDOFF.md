# 마음플레이 (MindPlay Diary) - AI 개발자 인수인계 문서 (HANDOFF.md)

> **문서 목적**: 이 프로젝트를 처음 맡는 AI 또는 개발자가 이 문서 하나만으로 코드베이스의 구조, 데이터 흐름, 실시간 동기화 아키텍처, 과거 발생 버그의 원인 및 재발 방지 규칙을 완벽하게 파악하고 즉시 작업을 이어갈 수 있도록 작성되었습니다.
> **작성 원칙**: 추측 배제, 실제 코드 및 DB 스키마 근거, 파일명 및 줄 번호 명시, 구현 완료와 실서버 E2E 검증 완료 구분, 환경변수 값 노출 금지.

---

## 1. 프로젝트 개요 & 사용 시나리오

### 1.1 서비스 목적
* **대구광역시교육청 중학교 마음학기제 워크북(1~15차시)**을 기반으로 한 **학급 참여형 실시간 마음성장 교육 및 감정일기·성장소설 문집 제작 플랫폼**.
* 교사와 학생들이 교실 수업 중 동시에 접속하여 사연 라디오, 강점 찾기, 밸런스 게임, 감정일기 작성 등을 인터랙티브하게 수행합니다.

### 1.2 사용자 및 사용 환경
1. **학생 (Student)**:
   * 학번(예: `10301`, 5자리 문자열)과 이름으로 로그인하여 입장.
   * 각 차시별 활동 수행 (1차시 고민 사연 등록, 2차시 강점 5개+희망 2개 선택, 3차시 밸런스 게임 및 브랜딩 카드, 1~15차시 감정일기 작성).
   * 교사의 실시간 제어(사연 배정, 짝꿍 매칭, 결과 개방)에 따라 화면이 자동으로 전환됨.
2. **교사 (Teacher / 관리자)**:
   * 학번 `00000` 또는 교사 관리자 모드로 로그인.
   * **교사용 관제 대시보드**(`currentTab === "teacher"`)에서 학생들의 실시간 제출 현황 모니터링, 활동 결과물 열람, 엑셀 다운로드, 인쇄.
   * **활동별 제어**: 비밀번호(`8888`) 인증 후 1단계 사연 1:1 무작위 배정, 2단계 짝 배정 및 조하리의 창 4개 영역 개방 등 실행.

---

## 2. 시스템 아키텍처 & 파일별 역할

### 2.1 기술 스택
* **프론트엔드/풀스택**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti.
* **백엔드/데이터베이스**: Supabase PostgreSQL, Supabase Realtime (WebSockets).
* **배포 환경**: Vercel (`https://mind-play-tan.vercel.app`).
* **테스트 도구**: Playwright E2E.

### 2.2 핵심 디렉토리 및 파일 역할 (위치 및 줄 번호)

| 파일 경로 | 주요 역할 및 핵심 함수/컴포넌트 |
| :--- | :--- |
| `app/page.tsx` | **메인 단일 페이지 애플리케이션 (SPA)**<br>• `L2362` `handleAddCustomWorry`: 사연 등록 및 Supabase 저장<br>• `L2416` `handleTeacherDispatchWorries`: 교사 사연 1:1 무작위 배정<br>• `L4622` `handleTeacherUnlockJohari`: 2단계 조하리의 창 개방<br>• `L1280` `pullRadioLiveEntries`: 실시간 사연 및 엽서 목록 동기화<br>• `L15643` 교사용 실시간 관제 대시보드 렌더링 |
| `lib/live.ts` | **단일 Row 단위 실시간 DB 연동 및 웹소켓 엔진**<br>• `L26` `saveLiveEntry`: `mindplay_live_entries` 테이블에 개별 Row upsert<br>• `L69` `loadLiveEntries`: 활동별 데이터 조회 (`reset_at` 필터링 지원)<br>• `L106` `getTeacherState` / `L137` `setTeacherState`: 교사 제어 상태 관리<br>• `L168` `subscribeLiveRoom`: Supabase Realtime 채널 구독 및 이벤트 리스너 |
| `lib/supabase.ts` | **Supabase 클라이언트 초기화** (`createClient`) |
| `lib/storage.ts` | **데이터 타입 정의 및 로컬 스토리지 헬퍼**<br>• `DiaryEntry`, `InteractiveData`, `NovelData` 인터페이스 정의 |
| `lib/curriculum.ts` | 1~15차시 교육과정 메타데이터 (주제, 영역, 편지 내용, 자기평가 문항) |
| `app/api/diary/route.ts` | **감정일기 및 학생 프로필 REST API**<br>• `GET`: 학생별/학급 전체 일기 및 프로필 조회 (`mindplay_diaries`, `mindplay_profiles`)<br>• `POST`: 일기(`SAVE_DIARY`) 및 특별활동 프로필(`SAVE_ACTIVITY_PROFILE`) upsert |
| `app/api/sync/route.ts` | **학급 룸 전체 동기화 REST API** (`mindplay_rooms` 테이블 연동) |
| `components/lesson/Lesson1Module.tsx` ~ `Lesson15Module.tsx` | 1차시~15차시 개별 모듈 컴포넌트 |
| `components/lesson3/BalanceGameModule.tsx` | 3차시 11개 밸런스 게임 문항 및 실시간 학급 통계/소울메이트 매칭 |
| `scripts/clean-test.mjs` | E2E 테스트 후 `room_code = 'TEST'` 데이터 안전 초기화 스크립트 |

---

## 3. 데이터 저장 및 조회 아키텍처 (DB 스키마)

Supabase PostgreSQL 데이터베이스는 다음 4개의 핵심 테이블로 구성됩니다:

### 3.1 `mindplay_live_entries` (핵심 실시간 테이블)
* **용도**: 사연 라디오, 엽서/하트, 강점 선택, 조하리의 창, 밸런스 게임, 교사 제어 상태 등 모든 실시간 인터랙션 저장.
* **복합 유니크 제약(Unique Constraint)**: `(room_code, activity, entry_key)`
* **컬럼 구조**:
  * `id` (bigint, PK)
  * `room_code` (text, e.g. `"CLASS1"`, `"TEST"`)
  * `activity` (text, e.g. `"radio_stories"`, `"radio_postcards"`, `"johari_step_a"`, `"radio_stories__teacher"`, `"johari_control__teacher"`)
  * `entry_key` (text, e.g. `"10301_1789111042"`, `"state"`, `"10301"`)
  * `student_id` (text, nullable)
  * `student_name` (text, nullable)
  * `payload` (jsonb, 실제 데이터 객체)
  * `created_at` / `updated_at` (timestamptz)

### 3.2 `mindplay_diaries` (감정일기 아카이브)
* **용도**: 학생이 작성한 1~15차시 감정일기 및 평가 저장.
* **컬럼 구조**:
  * `id` (text, PK, e.g. `"10301_1"`)
  * `student_id` (text)
  * `student_name` (text)
  * `lesson_no` (integer)
  * `data` (jsonb, 일기 본문, 감정 캐릭터 ID, 해시태그, 별점 평가, 이미지 URL 등)
  * `created_at` (timestamptz)

### 3.3 `mindplay_profiles` (학생 종합 프로필)
* **용도**: 학생별 15차시 전체 활동 요약, 나다움 가면, 강점 결과, 브랜딩 카드 등 마이페이지/문집 제작용 종합 데이터.
* **컬럼 구조**:
  * `student_id` (text, PK)
  * `student_name` (text)
  * `profile` (jsonb, `lesson2`, `lesson3`, `lesson4`, `customMaster` 등 통합 객체)
  * `updated_at` (timestamptz)

### 3.4 `mindplay_rooms` (레거시 룸 통합 테이블)
* **용도**: 레거시 호환 및 방 전체 상태 스냅샷 (`code`, `data`, `updated_at`).

---

## 4. 실시간 동기화 & 교사-학생 상태 전환 작동 원리

### 4.1 데이터 저장 흐름 (Row-Level Upsert)
1. 학생이 UI에서 저장/제출 버튼 클릭 (예: 사연 등록하기).
2. API 라우트를 거치지 않고 브라우저에서 `saveLiveEntry()` (`lib/live.ts:26`)를 통해 Supabase `mindplay_live_entries`에 직접 `upsert` 수행.
3. 복합 키(`room_code, activity, entry_key`)에 의해 동시 접속 충돌 없이 학생별 데이터가 안전하게 저장됨.

### 4.2 실시간 브로드캐스트 & 화면 전환 흐름
1. 교사가 제어 버튼(예: [1:1 사연 배정], [조하리의 창 결과 전송]) 클릭 -> 비밀번호 `8888` 입력.
2. `setTeacherState()` (`lib/live.ts:137`)가 `activity__teacher` 엔트리의 `state`를 갱신 (예: `{ phase: "assigned", assignMap: {...} }`).
3. Supabase Realtime 웹소켓 채널(`subscribeLiveRoom`, `lib/live.ts:168`)이 모든 학생 브라우저에 `postgres_changes` 이벤트를 전달.
4. 학생 화면의 상태 Hook(`setRoomPhase`, `setIsJohariUnlocked`)이 트리거되어 배달된 사연 보기 화면이나 조하리의 창 4개 영역으로 **새로고침 없이 즉시 자동 전환**.

---

## 5. 과거 발생 버그의 근본 원인 분석 & 재발 방지 수칙

### 5.1 발생했던 버그들과 진짜 원인
1. **빈 사연 카드 24개 덮어쓰기 버그**:
   * *원인*: `pullServerDatabase()` 함수가 주기적(15초)으로 `mindplay_rooms` 테이블을 폴링하며, 과거 초기화되어 있던 빈 사연 24개 배열을 가져와 최신 실시간 상태(`studentRealWorries`)를 덮어썼음.
   * *해결*: `pullServerDatabase()` 내 사연/하트 덮어쓰기 로직을 완전 삭제하고, 빈 텍스트 사연은 UI에 렌더링되지 않도록 필터링 적용.
2. **로컬 스토리지 캐시 간섭**:
   * *원인*: `localStorage.getItem("mindplay_real_worries")`에 남아있던 오래된 캐시가 새로고침 시 빈 카드를 복원시킴.
   * *해결*: 로컬스토리지 사연 캐시 로직 제거.
3. **Vercel 환경변수 타입 불일치 및 배포 누락**:
   * *원인*: Vercel 대시보드에서 `NEXT_PUBLIC_...` 접두사가 붙은 공개 변수를 `Secret` 타입으로 등록하려다 차단되거나, 로컬 테스트만 통과한 채 Vercel 재배포(Redeploy)를 하지 않아 실제 배포 주소에는 구버전 코드가 동작했음.
   * *해결*: Vercel 환경변수를 `Config` 타입으로 등록하고 Redeploy 수행.

### 5.2 ⚠️ 절대 어기면 안 되는 개발 수칙 (Strict Rules)
1. **단일 거대 JSON으로 방 전체를 덮어쓰지 말 것**:
   * 반드시 `lib/live.ts`의 `saveLiveEntry()`를 사용하여 **개별 학생/활동 단위의 Row로 저장**할 것.
2. **하드코딩된 빈 템플릿(24개 빈 배열 등)으로 실시간 상태를 초기화하지 말 것**.
3. **학생 개인정보(실제 이름, 일기 내용)를 콘솔 로그나 터미널, 커밋에 절대 출력하지 말 것**.
4. **테스트 시 실제 학급 데이터를 건드리지 말 것**:
   * 반드시 `room_code = "TEST"` 및 가짜 학번 `99901~99930`만 사용할 것.
5. **로컬 테스트 통과만으로 배포 완료로 단정하지 말 것**:
   * 실제 운영 URL(`https://mind-play-tan.vercel.app`)을 대상으로 E2E 테스트를 돌려 검증할 것.

---

## 6. 완성도 현황 매트릭스 (구현 vs 실서버 E2E 검증 구분)

| 기능 영역 | 구현 상태 | 실서버 Vercel E2E 검증 여부 | 비고 |
| :--- | :---: | :---: | :--- |
| **1차시 사연 등록 & 실시간 수신** | 완료 | **검증 완료 ✅** (`prod-full-interactive-verify.spec.ts`) | 2개 이상 브라우저 실시간 동기화 확인 |
| **1차시 교사 1:1 사연 무작위 배정** | 완료 | **검증 완료 ✅** (`prod-full-interactive-verify.spec.ts`) | 교사 비번(8888) 인증 및 실시간 화면 전환 |
| **2차시 강점 검사(Step A) 영구 저장** | 완료 | **검증 완료 ✅** (`prod-full-interactive-verify.spec.ts`) | Supabase `johari_step_a` DB 생성 확인 |
| **2차시 교사 짝 배정 & 조하리의 창 개방** | 완료 | **검증 완료 ✅** (`prod-full-interactive-verify.spec.ts`) | 교사 비번(8888) 인증 및 Step C/D 실시간 개방 |
| **교사용 실시간 관제 대시보드** | 완료 | **검증 완료 ✅** (`prod-full-interactive-verify.spec.ts`) | 단계별 학생 제출 현황 테이블 렌더링 확인 |
| **1~15차시 감정일기 작성/저장** | 완료 | **검증 완료 ✅** (`persistence.spec.ts`) | Supabase `mindplay_diaries` 연동 |
| **3차시 밸런스 게임 & 브랜딩 카드** | 완료 | **구현 완료 (실서버 다중 인터랙션 일부 미검증)** | 단독 밸런스 게임 로직 및 UI 구현 완료 |
| **4~15차시 개별 심화 활동 모듈** | 완료 | **구현 완료 (실서버 다중 동시 접속 미검증)** | 개별 모듈 UI 및 일기 저장 로직 구현 완료 |
| **성장소설 문집 자동 생성 (Novelizer)** | 완료 | **구현 완료 (단일 브라우저 검증)** | `components/novel/NovelizerModal.tsx` |

---

## 7. 환경변수 요구사항

다음 2개의 환경변수가 프로젝트 루트의 `.env.local` 및 Vercel 프로젝트 설정(**Settings -> Environment Variables**, Type: `Config`)에 반드시 등록되어 있어야 합니다:

* `NEXT_PUBLIC_SUPABASE_URL`
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`

*(※ 보안 원칙에 따라 실제 키 값은 이 문서에 기재하지 않음)*

---

## 8. 다음에 이어서 해야 할 작업 (Roadmap)

1. **3차시 밸런스 게임 실서버 3개 브라우저 동시 제출 & 소울메이트 실시간 산출 E2E 테스트 작성**:
   * 학생 A, B가 11개 밸런스 문항을 제출했을 때 학급 통계 및 소울메이트 일치율이 실시간 계산되는지 검증.
2. **4~15차시 특별활동 모듈의 교사 대시보드 상세 뷰 연동 점검**:
   * 학생이 4~15차시 활동을 완료했을 때 교사용 대시보드 팝업(`teacherInspectStudent`)에서 활동 결과물이 완벽히 렌더링되는지 점검.
3. **대규모 동시 접속 부하 테스트 (28명 가상 시뮬레이션)**:
   * TEST 방에서 교사용 대시보드의 [가짜 학생 28명 실시간 시뮬레이션] 실행 시 DB 부하 및 UI 반응 속도 모니터링.
