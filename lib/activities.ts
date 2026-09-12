/**
 * 맘플다이어리(Mind Play Diary) 실시간 공용 활동(Activity) 키 상수 정의
 */

export const ACTIVITIES = {
  // 1차시: 마음 주파수 라디오 & 고민 엽서
  RADIO_STORIES: "radio_stories",
  RADIO_HEARTS: "radio_hearts",
  RADIO_CHANNEL_HEARTS: "radio_channel_hearts",
  RADIO_POSTCARDS: "radio_postcards",

  // 2차시: 조하리의 창
  JOHARI_STEP_A: "johari_step_a",
  JOHARI_STEP_B: "johari_step_b",
  JOHARI_CONTROL: "johari_control",

  // 4차시: 감정 칵테일 & 주크박스 & 마음이 챗봇
  EMOTION_COCKTAIL: "emotion_cocktail",
  JUKEBOX_TRACKS: "jukebox_tracks",
  JUKEBOX: "jukebox",
  JUKEBOX_LIKE: "jukebox_like",
  CHATBOT_DIALOGUE: "chatbot_dialogue",
  MINDI_CHAT_HISTORY: "mindi_chat_history",
  MINDI_RISK_ALERT: "mindi_risk_alert",

  // 6차시: ABCD 인지재구성 연습
  ABCD_PRACTICE: "abcd_practice",
  ABCD_CONTROL: "abcd_control",
  ABCD_FEEDBACK: "abcd_feedback",
} as const;

export type ActivityType = typeof ACTIVITIES[keyof typeof ACTIVITIES];

/**
 * 1~15단계 활동 번호별 Supabase mindplay_live_entries 테이블 activity 키 매핑
 */
export const STAGE_ACTIVITIES: Record<number, string> = {
  1: ACTIVITIES.RADIO_STORIES,
  2: ACTIVITIES.JOHARI_STEP_A,
  3: "stage_3",
  4: ACTIVITIES.EMOTION_COCKTAIL,
  5: "stage_5",
  6: ACTIVITIES.ABCD_PRACTICE,
  7: "stage_7",
  8: "stage_8",
  9: "stage_9",
  10: "stage_10",
  11: "stage_11",
  12: "stage_12",
  13: "stage_13",
  14: "stage_14",
  15: "stage_15",
};

