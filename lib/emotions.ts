export interface EmotionCloud {
  id: string;
  name: string;
  emoji: string;
  quote: string;
  color: string;
  bgLight: string;
  borderColor: string;
  badgeBg: string;
  description: string;
}

export const EMOTION_CLOUDS: EmotionCloud[] = [
  {
    id: "proud_happy",
    name: "뿌듯·행복",
    emoji: "🌸",
    quote: "오늘 하루도 만족스러워요!",
    color: "#E11D48",
    bgLight: "#FFF1F2",
    borderColor: "#FDA4AF",
    badgeBg: "bg-rose-500",
    description: "스스로가 대견하고 가슴이 벅차오르는 따스한 순간",
  },
  {
    id: "joy",
    name: "기쁨이",
    emoji: "✨",
    quote: "산다는 건 신나고 즐거워!",
    color: "#D97706",
    bgLight: "#FFFBEB",
    borderColor: "#FCD34D",
    badgeBg: "bg-amber-500",
    description: "친구들과 신나게 웃고 에너지가 퐁퐁 솟아나는 날",
  },
  {
    id: "peace",
    name: "평온이",
    emoji: "🍃",
    quote: "마음이 평안하고 무탈해요",
    color: "#059669",
    bgLight: "#ECFDF5",
    borderColor: "#6EE7B7",
    badgeBg: "bg-emerald-500",
    description: "큰 걱정 없이 바람처럼 잔잔하고 편안한 마음",
  },
  {
    id: "just_neutral",
    name: "그냥이",
    emoji: "☁️",
    quote: "나는 아무 생각이 없다",
    color: "#4B5563",
    bgLight: "#F3F4F6",
    borderColor: "#D1D5DB",
    badgeBg: "bg-gray-500",
    description: "좋지도 싫지도 않은 멍하니 흘러가는 보통의 하루",
  },
  {
    id: "tired",
    name: "피곤이",
    emoji: "💤",
    quote: "자고 싶다.. 자고 싶다..",
    color: "#6D28D9",
    bgLight: "#F5F3FF",
    borderColor: "#C4B5FD",
    badgeBg: "bg-purple-600",
    description: "학업과 일상에 지쳐 푹 쉬고 싶은 방전 상태",
  },
  {
    id: "sad",
    name: "슬픔이",
    emoji: "💧",
    quote: "하염없이 눈물이 나요",
    color: "#2563EB",
    bgLight: "#EFF6FF",
    borderColor: "#93C5FD",
    badgeBg: "bg-blue-600",
    description: "마음 한구석이 콕콕 쑤시고 위로가 필요한 시간",
  },
  {
    id: "anxious",
    name: "불안이",
    emoji: "💭",
    quote: "잠 못 이루는 밤..o_O",
    color: "#D946EF",
    bgLight: "#FDF4FF",
    borderColor: "#F0ABFC",
    badgeBg: "bg-fuchsia-500",
    description: "다가올 일이나 관계 때문에 조마조마한 두근거림",
  },
  {
    id: "angry",
    name: "화남이",
    emoji: "😡",
    quote: "답답하고 짜증난다..후",
    color: "#DC2626",
    bgLight: "#FEF2F2",
    borderColor: "#FCA5A5",
    badgeBg: "bg-red-600",
    description: "내 뜻대로 되지 않아 속에서 열불이 치솟는 상태",
  },
];

export const getEmotionById = (id?: string): EmotionCloud => {
  const found = EMOTION_CLOUDS.find((e) => e.id === id);
  return found || EMOTION_CLOUDS[0];
};
