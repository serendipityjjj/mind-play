export interface TimeCapsuleData {
  currentWorry: string;
  wish: string;
  futureLetter: string;
  isSealed: boolean;
  sealedAt?: string;
  nickname?: string;
  secretWorry?: string;
  letterToFuture?: string;
}

export interface MaskData {
  color: string;
  stickers: string[];
  sentence: string;
  previewImage?: string;
}

export interface ProfileCardData {
  maskTitle: string;
  hashtags: string[];
  callMeWhen: string;
  selfCheer: string;
}

export interface EmotionMonsterData {
  name: string;
  state: string;
  color: string;
  eye: string;
  mouth: string;
  words: string[];
}

export interface CoolDownMantraData {
  brokenSignals: string[];
  mantra: string;
  action: string;
  selectedTemp: number;
}

export interface InteractiveData {
  residents?: string[];
  timeCapsule?: TimeCapsuleData;
  gems?: string[];
  mask?: MaskData;
  expressionType?: string;
  profileCard?: ProfileCardData;
  emotionWords?: string[];
  emotionMonster?: EmotionMonsterData;
  coolDown?: CoolDownMantraData;
  customData?: Record<string, any>;
}

export interface DiaryEntry {
  id?: string;
  studentId?: string;
  studentName?: string;
  lessonNo: number;
  lessonTitle?: string;
  lessonTopic?: string;
  lessonArea?: string;
  date?: string;
  createdAt?: string;
  nickname?: string;
  emotionId: string;
  hashtags: string[];
  diaryText: string;
  imageUrl?: string;
  evalStars: {
    q1: number;
    q2: number;
  };
  interactiveData?: InteractiveData;
  completed?: boolean;
  updatedAt?: string;
}

export interface NovelChapter {
  chapterNo: number;
  lessonNo: number;
  title: string;
  content: string;
  emotionEmoji: string;
  quote: string;
}

export interface NovelData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  genre: string;
  mood: string;
  createdAt: string;
  chapters: NovelChapter[];
  epilogue: string;
  summary: string;
}

export interface UserProfile {
  id: string;
  studentId: string; // e.g. "10315"
  name: string;      // e.g. "김하늘"
  nickname: string;  // e.g. "햇살구름"
  characterId: string; // e.g. "proud_happy"
  schoolName: string; // e.g. "대구중학교"
  gradeClass: string; // e.g. "1학년 3반 15번"
  email?: string;
  isLoggedIn?: boolean;
}

const STORAGE_KEYS = {
  DIARIES: "mind_play_diaries_v2",
  NOVEL: "mind_play_novel_v2",
  AUTH_USER: "mind_play_auth_user_v2",
  USERS_LIST: "mind_play_users_list_v2",
};

export const DEFAULT_USER: UserProfile = {
  id: "user-10315",
  studentId: "10315",
  name: "김하늘",
  nickname: "햇살구름",
  characterId: "proud_happy",
  schoolName: "대구중학교",
  gradeClass: "1학년 3반 15번",
  email: "sky10315@school.kr",
  isLoggedIn: true,
};

export const INITIAL_MOCK_NOVEL: NovelData = {
  id: "novel-sample",
  title: "열다섯 번의 목요일, 구름을 지나 단단해진 나",
  subtitle: "대구광역시교육청 마음학기제 성장 이야기",
  author: "김하늘 (햇살구름)",
  genre: "서정적 청소년 성장소설",
  mood: "따뜻하고 희망찬 어조",
  createdAt: "2026. 06. 18",
  summary: "낯설고 서툴렀던 3월의 첫 목요일부터, 마음의 파도를 다스리고 친구들과 손잡으며 눈부시게 성장해간 15주의 기록.",
  chapters: [
    {
      chapterNo: 1,
      lessonNo: 1,
      title: "1장: 마음의 문을 두드리다",
      emotionEmoji: "🌸",
      content: "3월의 찬 바람이 가시지 않은 교실, 책상 위에 놓인 마음 일기장은 낯설기만 했다. 내 마음에 8가지 색깔의 구름이 산다는 이야기를 들었을 때, 가슴 한구석에서 조용한 설렘이 피어올랐다.",
      quote: "내 마음의 첫 번째 주민은 '설렘'이었다.",
    },
    {
      chapterNo: 2,
      lessonNo: 6,
      title: "2장: 생각을 뒤집는 마법",
      emotionEmoji: "🔄",
      content: "수행평가 실수에 '난 늘 망쳐'라며 주저앉던 날, '한 번의 실수가 내 전부는 아니야'라고 생각을 바꾸자 먹구름 뒤로 파란 하늘이 드러났다. 생각의 렌즈를 바꾸는 순간 감정도 행동도 거짓말처럼 달라졌다.",
      quote: "생각을 바꾸면, 세상의 색깔이 바뀐다.",
    },
    {
      chapterNo: 3,
      lessonNo: 11,
      title: "3장: 상처 주지 않고 전하는 진심",
      emotionEmoji: "💬",
      content: "친구에게 서운했던 날, 뾰족한 비난 대신 '네가 늦어서 나는 많이 걱정됐어'라며 나-전달법으로 이야기했다. 부드럽게 건넨 내 진심은 친구의 마음에 닿아 따스한 화해의 다리가 되었다.",
      quote: "말 한마디에 담긴 온도가 관계의 계절을 바꾼다.",
    },
    {
      chapterNo: 4,
      lessonNo: 15,
      title: "4장: 15번째 목요일의 수료식",
      emotionEmoji: "🎓",
      content: "15주 전 굳게 잠가두었던 타임캡슐을 열어보았다. 걱정 많던 아이는 온데간데없고, 이제는 어떤 감정도 다정하게 품어줄 수 있는 단단한 내가 서 있었다. 나의 열다섯 번째 목요일은 찬란했다.",
      quote: "흔들리며 자란 내 마음은 이제 어떤 바람 앞에서도 꺾이지 않는다.",
    },
  ],
  epilogue: "이 책은 완성이 아닌 새로운 시작이다. 내 안의 8가지 감정 구름들과 함께, 나는 오늘도 나만의 하늘을 아름답게 그려나갈 것이다.",
};

export const INITIAL_MOCK_ENTRIES: DiaryEntry[] = [
  {
    id: "entry-1",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 1,
    lessonTopic: "01. 마음, 그게 궁금해!",
    lessonArea: "영역 ❶ 나와 마주하기",
    date: "2026-03-05",
    createdAt: "2026-03-05",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#새로운_시작", "#진짜_내_마음_알아보기", "#마음아_반가워"],
    diaryText: "첫 수업이라 낯설었지만, 내 마음에 이렇게 많은 감정들이 살고 있다는 걸 알게 되었다. 15주 동안 나 자신과 더 친해지고 싶다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      residents: ["설렘", "두근거림", "새로운 친구"],
      timeCapsule: {
        currentWorry: "새 학기 반에서 친구들과 어색하지 않게 잘 어울릴 수 있을까?",
        wish: "사소한 말에 상처받지 않고 쿨하게 넘길 수 있는 단단한 마음을 갖고 싶어.",
        futureLetter: "15주 뒤의 나야, 감정을 회피하지 않고 마주한 네 용기가 참 자랑스러워!",
        isSealed: true,
        sealedAt: "2026-03-05",
        nickname: "햇살구름",
        secretWorry: "친구들에게 솔직한 내 생각을 똑 부러지게 말하지 못하는 것",
        letterToFuture: "친구들과 사이좋게 지내고 내 감정을 잘 조절하는 멋진 내가 되어 있길 바라!",
      },
    },
    completed: true,
  },
  {
    id: "entry-2",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 2,
    lessonTopic: "02. 진짜 나를 알아볼까?(1) - 강점 발견",
    lessonArea: "영역 ❶ 나와 마주하기",
    date: "2026-03-12",
    createdAt: "2026-03-12",
    nickname: "햇살구름",
    emotionId: "joy",
    hashtags: ["#나의_강점_찾아봐야지", "#있는_그대로_나를_사랑할_거야", "#경청왕"],
    diaryText: "남들과 비교하느라 잊고 있던 내 강점 '친구 이야기 묵묵히 들어주기'를 발견했다. 나도 꽤 괜찮은 보석을 가졌구나!",
    evalStars: { q1: 5, q2: 4 },
    interactiveData: {
      gems: ["경청왕 💎", "약속 지킴이 💎", "솔직 담백 💎"],
      mask: {
        color: "#10B981",
        stickers: ["경청왕", "약속 지킴이", "솔직 담백"],
        sentence: "나는 친구가 우울할 때 곁에서 조용히 빵을 건넬 줄 아는 다정한 사람이다.",
      },
    },
    completed: true,
  },
  {
    id: "entry-3",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 3,
    lessonTopic: "03. 진짜 나를 알아볼까?(2) - 나다움 표현",
    lessonArea: "영역 ❷ 나를 표현하기",
    date: "2026-03-19",
    createdAt: "2026-03-19",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#나다운_당당함", "#솔직하게_나를_표현하기", "#진짜_내_모습"],
    diaryText: "나다움 소개서를 쓰며 쑥스러웠지만 친구들에게 내 장점을 당당히 소개했다. 솔직하게 표현하니 마음이 한결 가벼워졌다.",
    evalStars: { q1: 4, q2: 5 },
    interactiveData: {
      expressionType: "똑똑한 당당형(목표)",
      profileCard: {
        maskTitle: "조용한 경청 요정 민들레",
        hashtags: ["#친구_이야기_잘_들어줌", "#약속_10분_전_도착"],
        callMeWhen: "점심시간에 같이 밥 먹을 친구가 없거나 속상한 일로 위로받고 싶을 때",
        selfCheer: "남의 눈치 보느라 주눅 들지 않고 내 생각을 당당하게 말할 줄 아는 멋진 나",
      },
    },
    completed: true,
  },
  {
    id: "entry-4",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 4,
    lessonTopic: "04. 내 감정을 알고 싶어 - 감정 인식",
    lessonArea: "영역 ❷ 나를 표현하기",
    date: "2026-03-26",
    createdAt: "2026-03-26",
    nickname: "햇살구름",
    emotionId: "peace",
    hashtags: ["#감정_알아차리기", "#내_마음의_날씨", "#감정_이름_붙여주기"],
    diaryText: "단순히 '짜증 난다'가 아니라 '서운함'과 '조마조마함'이라는 세부 감정을 배웠다. 내 마음의 신호등을 잘 관찰해야겠다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      emotionWords: ["벅참", "서운함", "조마조마함"],
      emotionMonster: {
        name: "몽글이",
        state: "따뜻하지만 살짝 조마조마한 상태",
        color: "#60A5FA",
        eye: "👀",
        mouth: "😊",
        words: ["벅참", "서운함", "조마조마함"],
      },
    },
    completed: true,
  },
  {
    id: "entry-5",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 5,
    lessonTopic: "05. 감정의 파도 다스리기 - 분노와 불안 조절",
    lessonArea: "영역 ❸ 정서 조절하기",
    date: "2026-04-02",
    createdAt: "2026-04-02",
    nickname: "햇살구름",
    emotionId: "peace",
    hashtags: ["#심호흡_세번", "#감정의_파도타기", "#마음_온도_36.5도"],
    diaryText: "욱할 때 4-7-8 호흡법과 '파도는 곧 지나간다' 주문을 외우니 가라앉았다. 감정에 휩쓸리지 않는 서퍼가 될 거다.",
    evalStars: { q1: 5, q2: 4 },
    interactiveData: {
      coolDown: {
        brokenSignals: ["심장이 쿵쾅쿵쾅", "말투가 퉁명스러워짐"],
        mantra: "파도는 곧 지나간다",
        action: "뒤돌아서 깊게 숨 3번 쉬고 찬물 한 잔 마시기",
        selectedTemp: 80,
      },
    },
    completed: true,
  },
  {
    id: "entry-6",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 6,
    lessonTopic: "06. 생각을 바꾸면 놀라운 일이! - 비합리적 신념 바꾸기",
    lessonArea: "영역 ❸ 정서 조절하기",
    date: "2026-04-09",
    createdAt: "2026-04-09",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#생각_뒤집기", "#근거없는_걱정_멈춰", "#다시_해볼_수_있어"],
    diaryText: "수행평가 실수에 '난 항상 망쳐'라던 생각을 '실수는 배움의 과정이야'로 바꾸니 불안이 사라지고 용기가 났다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        activatingEvent: "수학 수행평가에서 계산 실수로 감점을 받았다.",
        irrationalBelief: "나는 항상 중요한 순간에 바보같이 망쳐.",
        consequenceEmotion: "자책감, 극심한 우울과 무기력",
        disputation: "이번 한 번 실수했다고 내 모든 능력이 사라진 건 아니야. 틀린 오답을 복습하면 다음엔 안 틀려!",
        effectiveBelief: "실수는 성장하는 과정의 일부일 뿐이야!",
      },
    },
    completed: true,
  },
  {
    id: "entry-7",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 7,
    lessonTopic: "07. 스트레스 날려버리기 - 스트레스 대처하기",
    lessonArea: "영역 ❸ 정서 조절하기",
    date: "2026-04-16",
    createdAt: "2026-04-16",
    nickname: "햇살구름",
    emotionId: "peace",
    hashtags: ["#바꿀_수_있는_것에_집중", "#나만의_스트레스_해소법", "#마음_환기하기"],
    diaryText: "남의 시선이나 지나간 일은 통제할 수 없지만, 오늘 나의 수면과 휴식은 내가 바꿀 수 있다. 10분 산책 루틴을 정했다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        cannotControl: ["시험 문제 난이도", "선생님의 기분", "지나간 어제의 실수"],
        canControl: ["오늘 내가 문제집 3쪽 풀기", "스마트폰 끄고 11시 취침", "친구에게 먼저 사과 건네기"],
      },
    },
    completed: true,
  },
  {
    id: "entry-8",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 8,
    lessonTopic: "08. 감사 한 컷 - 긍정적인 마음 가지기",
    lessonArea: "영역 ❹ 긍정의 힘 기르기",
    date: "2026-04-23",
    createdAt: "2026-04-23",
    nickname: "햇살구름",
    emotionId: "joy",
    hashtags: ["#I_can_do_it", "#오히려_좋아", "#감사_한_컷", "#작은_행복_찾기"],
    diaryText: "비가 와서 체육이 취소되었을 때 '오히려 좋아! 교실에서 친구들과 보드게임하며 이야기할 수 있잖아'라고 외쳤다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        gratitude1: "점심시간에 따뜻한 미역국이 맛있게 나왔던 것",
        gratitude2: "수업 시간 필기구를 빌려준 짝꿍의 친절",
        gratitude3: "하교 때 노을이 예쁘게 물든 하늘을 본 것",
        reframingCase: "체육 취소 -> 교실 수다 타임으로 오히려 좋아!",
      },
    },
    completed: true,
  },
  {
    id: "entry-9",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 9,
    lessonTopic: "09. 다름을 존중해 - 다양성 인정하기",
    lessonArea: "영역 ❺ 타인과 소통하고 공감하기",
    date: "2026-04-30",
    createdAt: "2026-04-30",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#다름을_존중하기", "#틀림이_아닌_다름", "#다채로운_우리"],
    diaryText: "취향이 나와 정반대인 짝꿍을 보며 '틀린 게 아니라 다채로운 거구나'를 깨달았다. 인정 도장을 쾅 찍어주었다.",
    evalStars: { q1: 5, q2: 4 },
    interactiveData: {
      customData: {
        differenceReflection: "모든 사람이 나와 같다면 세상은 지루했을 것이다. 짝꿍의 활발함 덕분에 우리 모둠이 밝아진다.",
        balanceStamp: "인정 도장 쾅! 💮",
      },
    },
    completed: true,
  },
  {
    id: "entry-10",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 10,
    lessonTopic: "10. 마음 헤아리기 - 공감하고 격려하기",
    lessonArea: "영역 ❺ 타인과 소통하고 공감하기",
    date: "2026-05-07",
    createdAt: "2026-05-07",
    nickname: "햇살구름",
    emotionId: "joy",
    hashtags: ["#마음_헤아리기", "#손하트_공감", "#따스한_위로"],
    diaryText: "속상해하는 친구에게 섣부른 훈계 대신 '많이 속상했겠다, 네 곁에 있을게'라고 마음을 건네니 친구 눈시울이 붉어졌다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        empathyLetter: "민우야, 발표 때 긴장해서 목소리가 떨렸다고 너무 속상해하지 마. 끝까지 해낸 네가 진짜 멋졌어! ❤️",
        empathyLevel: "4단계 진심 공감 완료",
      },
    },
    completed: true,
  },
  {
    id: "entry-11",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 11,
    lessonTopic: "11. 나-전달법으로 톡톡 - 올바르게 대화하기",
    lessonArea: "영역 ❺ 타인과 소통하고 공감하기",
    date: "2026-05-14",
    createdAt: "2026-05-14",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#나전달법", "#상처_없는_대화", "#진짜_마음_전하기"],
    diaryText: "'너 왜 늦었어?'(비난) 대신 '네가 30분 늦어서 사고 났을까 봐 걱정되고 서운했어'(나-전달법)로 말하니 싸우지 않고 풀렸다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        fact: "약속 시간보다 30분 늦게 도착했을 때",
        feeling: "혹시 안 좋은 일이 생겼을까 봐 걱정되고 나 혼자 기다려 서운했어",
        wish: "다음엔 늦을 것 같으면 미리 문자 한 통 남겨줬으면 좋겠어",
      },
    },
    completed: true,
  },
  {
    id: "entry-12",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 12,
    lessonTopic: "12. 손 내미는 용기 - 갈등 해결하기",
    lessonArea: "영역 ❻ 갈등 해결과 성숙한 관계",
    date: "2026-05-21",
    createdAt: "2026-05-21",
    nickname: "햇살구름",
    emotionId: "peace",
    hashtags: ["#먼저_손내밀기", "#화해의_용기", "#지혜로운_사과"],
    diaryText: "갈등이 생겼을 때 회피하지 않고 '인사약'(인정-사과-약속) 레시피로 먼저 다가갔다. 어색함이 눈 녹듯 사라졌다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        conflictType: "부엉이형 (통찰과 지혜로운 대화)",
        appleRecipe: "내가 너의 상황을 미처 헤아리지 못하고 장난쳐서 미안해. 앞으론 기분 먼저 살필게.",
      },
    },
    completed: true,
  },
  {
    id: "entry-13",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 13,
    lessonTopic: "13. 내 선택의 주인공 - 책임감 있는 결정하기",
    lessonArea: "영역 ❻ 갈등 해결과 성숙한 관계",
    date: "2026-05-28",
    createdAt: "2026-05-28",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#현명한_선택", "#내_결정에_책임지기", "#후회없는_걸음"],
    diaryText: "당장의 유혹보다 장기적인 내 성장을 선택했다. 저울에 올려보니 과제를 끝내고 마음 편히 노는 쪽이 훨씬 가치 있었다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        scaleChoice: "B안 (1시간 집중 과제 후 당당하게 게임하기)",
        decisionStamp: "당당한 주인공 결정 완료 ⚖️",
      },
    },
    completed: true,
  },
  {
    id: "entry-14",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 14,
    lessonTopic: "14. 함께하는 시너지 - 종합 및 협동",
    lessonArea: "영역 ❼ 마음 모아 성장하기",
    date: "2026-06-04",
    createdAt: "2026-06-04",
    nickname: "햇살구름",
    emotionId: "joy",
    hashtags: ["#마음_모아_플레이", "#협동의_힘", "#시너지_폭발"],
    diaryText: "모둠 친구들과 7층 카드 타워를 완성하며 위기 속에서도 서로 탓하지 않고 심호흡과 배려로 멋진 시너지를 이뤄냈다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        equippedSkillIds: [4, 9, 10],
        towerFloor: 7,
        thankCouponRecipient: "우리 3모둠 친구들",
        thankCouponMoment: "카드가 흔들렸을 때 비난하지 않고 다 같이 숨 고르며 지탱해 주었을 때",
        thankCouponStamp: "든든한 최고의 파트너 🏆",
      },
    },
    completed: true,
  },
  {
    id: "entry-15",
    studentId: "10315",
    studentName: "김하늘",
    lessonNo: 15,
    lessonTopic: "15. 단단해진 내 마음 - 변화된 나 만나기 (수료식)",
    lessonArea: "영역 ❼ 마음 모아 성장하기",
    date: "2026-06-11",
    createdAt: "2026-06-11",
    nickname: "햇살구름",
    emotionId: "proud_happy",
    hashtags: ["#단단해진_내_마음", "#성장한_나에게_박수", "#15주_완주_성공"],
    diaryText: "15주의 목요일 동안 내 마음의 정원을 가꾸어왔다. 어떤 감정도 부끄러운 게 아니라 나의 소중한 신호등임을 이제는 안다.",
    evalStars: { q1: 5, q2: 5 },
    interactiveData: {
      customData: {
        isCapsuleUnlocked: true,
        growthReflection: "과거엔 작은 실수에도 자책하고 불안해했지만, 이제는 4-7-8 호흡과 생각 뒤집기로 스스로를 다독일 수 있다.",
        futurePromise: "앞으로 어떤 바람이 불어와도 내 감정을 존중하고 친구들과 따뜻하게 소통할 것이다!",
      },
    },
    completed: true,
  },
];

// --- AUTH & USER STORAGE HELPERS ---
export const getCurrentUser = (): UserProfile => {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
};

export const saveCurrentUser = (user: UserProfile): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  }
};

export const getStoredUsers = (): UserProfile[] => {
  if (typeof window === "undefined") return [DEFAULT_USER];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_USER];
  }
};

export const registerUser = (data: Omit<UserProfile, "id">): UserProfile => {
  const users = getStoredUsers();
  const newUser: UserProfile = {
    ...data,
    id: `user-${data.studentId}-${Date.now()}`,
    isLoggedIn: true,
  };
  const updated = [...users.filter((u) => u.studentId !== data.studentId), newUser];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(newUser));
  }
  return newUser;
};

export const loginUser = (studentId: string, name: string): UserProfile | null => {
  const users = getStoredUsers();
  const found = users.find((u) => u.studentId === studentId && (u.name === name || !name));
  if (found) {
    const loggedIn = { ...found, isLoggedIn: true };
    saveCurrentUser(loggedIn);
    return loggedIn;
  }
  // Auto register if new student ID
  const created: UserProfile = {
    id: `user-${studentId}`,
    studentId,
    name: name || "학생",
    nickname: `${name || "마음"}구름`,
    characterId: "proud_happy",
    schoolName: "대구중학교",
    gradeClass: `${studentId.slice(0, 1)}학년 ${studentId.slice(1, 3)}반 ${studentId.slice(3)}번`,
    isLoggedIn: true,
  };
  registerUser(created);
  return created;
};

export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    const user = getCurrentUser();
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify({ ...user, isLoggedIn: false }));
  }
};

// --- DIARY & NOVEL STORAGE HELPERS ---
export const getStoredDiaries = (): DiaryEntry[] => {
  if (typeof window === "undefined") return INITIAL_MOCK_ENTRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIARIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DIARIES, JSON.stringify(INITIAL_MOCK_ENTRIES));
      return INITIAL_MOCK_ENTRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load diaries from localStorage", e);
    return INITIAL_MOCK_ENTRIES;
  }
};

export const saveDiaryEntry = (entry: DiaryEntry): DiaryEntry[] => {
  const current = getStoredDiaries();
  const currentUser = getCurrentUser();
  const enhancedEntry: DiaryEntry = {
    ...entry,
    studentId: entry.studentId || currentUser.studentId,
    studentName: entry.studentName || currentUser.name,
    nickname: entry.nickname || currentUser.nickname,
  };

  const index = current.findIndex((d) => d.lessonNo === entry.lessonNo);
  let updated: DiaryEntry[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = enhancedEntry;
  } else {
    updated = [...current, enhancedEntry].sort((a, b) => a.lessonNo - b.lessonNo);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.DIARIES, JSON.stringify(updated));
  }
  return updated;
};

export const getStoredNovel = (): NovelData | null => {
  if (typeof window === "undefined") return INITIAL_MOCK_NOVEL;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOVEL);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOVEL, JSON.stringify(INITIAL_MOCK_NOVEL));
      return INITIAL_MOCK_NOVEL;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MOCK_NOVEL;
  }
};

export const saveStoredNovel = (novel: NovelData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.NOVEL, JSON.stringify(novel));
  }
};

export const getStoredNickname = (): string => {
  if (typeof window === "undefined") return DEFAULT_USER.nickname;
  return getCurrentUser().nickname || "마음친구";
};

export const saveStoredNickname = (name: string): void => {
  const user = getCurrentUser();
  saveCurrentUser({ ...user, nickname: name });
};

// --- 서버 영구 DB 연동 헬퍼 ---
export async function saveDiaryToServer(entry: DiaryEntry): Promise<boolean> {
  try {
    const res = await fetch("/api/diary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "SAVE_DIARY",
        studentId: entry.studentId,
        studentName: entry.studentName,
        payload: entry
      })
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error("Failed to save diary to server DB:", err);
    return false;
  }
}

export async function saveActivityProfileToServer(studentId: string, studentName: string, profilePayload: { lesson2?: any; lesson3?: any }): Promise<boolean> {
  try {
    const res = await fetch("/api/diary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "SAVE_ACTIVITY_PROFILE",
        studentId,
        studentName,
        payload: profilePayload
      })
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error("Failed to save activity profile to server DB:", err);
    return false;
  }
}

export async function fetchStudentProfileFromServer(studentId: string) {
  try {
    const res = await fetch(`/api/diary?studentId=${encodeURIComponent(studentId)}`);
    const data = await res.json();
    if (data.success) {
      return {
        diaries: data.diaries || [],
        profile: data.profile || {}
      };
    }
  } catch (err) {
    console.error("Failed to fetch student profile from server DB:", err);
  }
  return { diaries: [], profile: {} };
}
