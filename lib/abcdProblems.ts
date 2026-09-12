/**
 * 6차시: ABCD 인지재구성 연습 활동 문제 및 발문 데이터
 */

export interface StudentProblemInfo {
  problemNo: number;
  title: string;
  situationA: string;
  category: string;
  tags: string[];
}

export interface TeacherModelAnswer {
  beliefB_analysis: string;
  beliefB_example: string;
  emotionC: string;
  actionC: string;
  disputeD1: string; // 근거 확인
  disputeD2: string; // 다른 시각
  disputeD3: string; // 최악의 확률
  rationalBeliefNewD: string; // 새로운 합리적 신념
}

export interface TeacherQuestioningGuide {
  stepA: string;
  stepB: string;
  stepC: string;
  stepD: string;
}

export interface TeacherProblemInfo extends StudentProblemInfo {
  modelAnswer: TeacherModelAnswer;
  questioningGuide: TeacherQuestioningGuide;
}

/**
 * 1. 학생용 문제 데이터 (모범답안은 클라이언트에 노출되지 않음)
 */
export const ABCD_STUDENT_PROBLEMS: Record<number, StudentProblemInfo> = {
  1: {
    problemNo: 1,
    title: "연습 문제 1. 단톡방 읽씹 사건",
    situationA: "반 단톡방에 수행평가 과제 질문을 올렸는데, 10명이 읽었으나 30분 동안 아무도 답장하지 않았다.",
    category: "교우 관계 / 단톡방",
    tags: ["#단톡방", "#읽씹", "#독심술_오류", "#객관적_근거"],
  },
  2: {
    problemNo: 2,
    title: "연습 문제 2. 발표 중 말 더듬기 사건",
    situationA: "국어 모둠 발표 도중 너무 긴장해서 준비한 문장을 더듬고 단어 발음을 크게 틀렸다.",
    category: "학습 / 발표 불안",
    tags: ["#모둠발표", "#말더듬", "#흑백논리", "#용기와_성장"],
  },
  3: {
    problemNo: 3,
    title: "연습 문제 3. 동아리 면접 탈락 사건",
    situationA: "가장 들어가고 싶었던 1지망 교내 방송부 아나운서 면접에서 불합격 통보를 받았다.",
    category: "진로 / 자존감",
    tags: ["#동아리면접", "#불합격", "#과도한_일반화", "#새로운_기회"],
  },
  4: {
    problemNo: 4,
    title: "연습 문제 4. 성적 하락과 부모님 잔소리",
    situationA: "중간고사 성적이 떨어졌는데, 부모님이 \"노력이 부족하다\"며 크게 꾸중하셨다.",
    category: "학업 스트레스 / 부모님 갈등",
    tags: ["#성적하락", "#부모님꾸중", "#과도한_일반화", "#성장_마인드셋"],
  },
  5: {
    problemNo: 5,
    title: "연습 문제 5. SNS 소외감 사건",
    situationA: "주말에 인스타그램을 켰는데, 나만 빼고 친한 친구들끼리 떡볶이를 먹으러 간 사진을 발견했다.",
    category: "교우 관계 / SNS 소외감",
    tags: ["#SNS소외감", "#인스타그램", "#독심술사_파국화", "#객관적_증거"],
  },
};

/**
 * 2. 교사용 문제 데이터 (모범답안 및 교사용 발문 팁 포함)
 */
export const ABCD_TEACHER_PROBLEMS: Record<number, TeacherProblemInfo> = {
  1: {
    ...ABCD_STUDENT_PROBLEMS[1],
    modelAnswer: {
      beliefB_analysis: "독심술사의 오류, 파국화 (친구들의 속마음을 부정적으로 단정함)",
      beliefB_example: "애들이 날 무시하고 은따시키는 게 분명해. 나는 교실에서 투명인간이야.",
      emotionC: "두근거림, 초조함, 비참함, 소외감",
      actionC: "단톡방을 계속 들락거리며 폰을 놓지 못함, 다음 날 등교하기 싫어짐",
      disputeD1: "다들 학원 수업 중이거나 이동 중이라 톡을 확인할 겨를이 없었을 수 있다.",
      disputeD2: "물어본 과제 답을 다른 친구들도 아직 몰라서 조용할 수도 있다.",
      disputeD3: "답장 속도가 내 전체 인간관계나 가치를 결정하지 않는다.",
      rationalBeliefNewD: "답장이 늦는 건 각자 바쁘거나 답을 몰라서일 뿐이다. 급하면 친한 친구에게 개인 톡으로 물어보면 된다.",
    },
    questioningGuide: {
      stepA: "단톡방에서 '숫자 1이 사라졌는데 답장이 없다'는 객관적 사실 상황에 집중해봅시다.",
      stepB: "우리가 친구들의 속마음을 직접 열어보지 않고도 100% 알 수 있을까요? (독심술의 오류)",
      stepC: "그런 생각이 들었을 때 몸에서는 어떤 반응(심장 두근거림 등)이 일어나고 어떤 행동을 하게 되었나요?",
      stepD: "친구가 답장을 못 한 다른 현실적인 이유(학원, 밥 먹는 중, 답을 모름 등)는 무엇이 있을까요?",
    },
  },
  2: {
    ...ABCD_STUDENT_PROBLEMS[2],
    modelAnswer: {
      beliefB_analysis: "흑백논리, 엄격한 코치의 오류 (완벽하지 않으면 전부 실패라고 생각함)",
      beliefB_example: "완벽했어야 했는데 다 망쳤어. 애들이 날 바보라고 비웃을 거야.",
      emotionC: "얼굴이 화끈거림, 수치심, 자책감",
      actionC: "자리에 엎드림, 이후 발표와 질문 손들기를 회피함",
      disputeD1: "친구들은 필기하거나 자기 발표 준비 중이라 내 작은 실수에 큰 관심이 없었다.",
      disputeD2: "긴장하면 누구나 말을 더듬는다. 중요한 건 발표를 끝까지 해냈다는 점이다.",
      disputeD3: "한두 번 틀렸어도 전체 발표 내용을 끝까지 전달했다. 발표 한 번으로 내 실력이 평가절하되지 않는다.",
      rationalBeliefNewD: "중요한 건 완벽함이 아니라 끝까지 전달한 용기다. 다음엔 키워드 카드를 크게 적어가면 된다.",
    },
    questioningGuide: {
      stepA: "발표 도중 너무 긴장해서 단어를 더듬고 발음을 틀렸던 순간에 집중해봅시다.",
      stepB: "'100점 아니면 0점'이라는 흑백논리에 빠져있는 것은 아닐까요?",
      stepC: "수치심 때문에 엎드려 있으면 다음 발표에는 어떤 영향을 줄까요?",
      stepD: "다른 친구가 발표할 때 실수했던 적을 떠올려보세요. 여러분은 그 친구를 바보라고 비웃었나요?",
    },
  },
  3: {
    ...ABCD_STUDENT_PROBLEMS[3],
    modelAnswer: {
      beliefB_analysis: "과도한 일반화, 점쟁이의 오류 (한 번의 결과를 미래 전체로 확대해석함)",
      beliefB_example: "난 잘하는 게 하나도 없어. 앞으로 뭘 해도 다 떨어질 거야.",
      emotionC: "무기력감, 열등감, 우울감",
      actionC: "방과 후 활동 신청 취소, 다른 부서나 활동에도 지원하지 않음",
      disputeD1: "경쟁률이 높았고 선발 기준과 내 스타일이 달랐을 뿐이다.",
      disputeD2: "면접을 열심히 준비하고 실전에서 말해본 소중한 경험을 쌓았다.",
      disputeD3: "방송부 하나 탈락했다고 내 학교생활이나 다른 분야 가능성이 사라지지 않는다.",
      rationalBeliefNewD: "이번 동아리와 맞지 않았을 뿐 내 가치가 부정된 게 아니다. 내 개성을 살릴 다른 활동을 찾아보자.",
    },
    questioningGuide: {
      stepA: "1지망 교내 방송부 면접 불합격 통보를 받았던 객관적 사건에 집중해봅시다.",
      stepB: "한 번의 불합격으로 앞으로의 모든 시도가 실패할 거라고 예언하는 '점쟁이의 오류'는 아닐까요?",
      stepC: "무기력감에 빠져 다른 기회까지 모두 포기해버리면 누구에게 손해일까요?",
      stepD: "방송부 외에 나의 끼와 열정을 펼칠 수 있는 2지망, 3지망 동아리나 취미는 무엇이 있을까요?",
    },
  },
  4: {
    ...ABCD_STUDENT_PROBLEMS[4],
    modelAnswer: {
      beliefB_analysis: "과도한 일반화, 개인화 (부모님이 나를 한심하게 여기고 내 노력을 완전히 무시한다고 단정함)",
      beliefB_example: "부모님은 내 노력은 하나도 몰라주고 나를 한심하게만 생각해. 난 역시 안 되는 사람이야.",
      emotionC: "억울함, 분노, 자책감, 반항심",
      actionC: "방문을 세게 닫고 들어감, 공부를 아예 포기하고 침대에 눕거나 게임에 몰두함",
      disputeD1: "부모님은 내 성적이 걱정되어 하신 말씀이지 나라는 사람 전체를 미워하시는 게 아니다.",
      disputeD2: "이번 성적 결과가 아쉽더라도 그동안 작성했던 오답 노트와 공부했던 시간이 사라지는 것은 아니다.",
      disputeD3: "이번 한 번 시험 성적이 떨어졌다고 해서 내 인생 전체가 망하거나 실패자로 결정되는 것은 아니다.",
      rationalBeliefNewD: "속상하지만 이번 결과를 인정하고 틀린 문제를 다시 보자. 다음엔 더 잘할 수 있어!",
    },
    questioningGuide: {
      stepA: "중간고사 성적이 떨어지고 부모님께 꾸중을 들은 객관적 상황에 집중해봅시다.",
      stepB: "부모님의 우려가 '나라는 존재 전체를 거부하는 것'으로 확대해석되지는 않았나요?",
      stepC: "억울하다고 공부를 포기하면 결국 누구에게 가장 큰 손해가 될까요?",
      stepD: "이번 성적 하락을 내 약점을 보완하고 더 성장할 수 있는 기회로 바꾸려면 어떻게 생각해야 할까요?",
    },
  },
  5: {
    ...ABCD_STUDENT_PROBLEMS[5],
    modelAnswer: {
      beliefB_analysis: "독심술사의 오류, 파국화 (사진 한 장으로 따돌림과 은따를 단정짓고 미래를 절망함)",
      beliefB_example: "애들이 나를 싫어해서 일부러 따돌린 게 틀림없어. 난 이제 완전 외톨이야.",
      emotionC: "심한 배신감, 외로움, 우울함, 수치심",
      actionC: "학교에 가서 친구들에게 말도 걸지 않고 혼자 엎드려 있음, 친구들 톡을 회피함",
      disputeD1: "내가 주말에 학원에 가거나 가족 일정이 있다는 것을 이미 알아서 부담 줄까 봐 부르지 않았을 수 있다.",
      disputeD2: "갑자기 우연히 만난 친구들끼리 떡볶이를 먹게 된 것일 수도 있다.",
      disputeD3: "사진 한 장이 나에 대한 친구들의 전체 마음이나 우정의 깊이를 결정짓는 객관적 증거는 아니다.",
      rationalBeliefNewD: "혼자 상상하며 우울해하지 말고, 자연스럽게 '너희끼리 맛있었어? 다음엔 나도 같이 가!'라고 말해보자.",
    },
    questioningGuide: {
      stepA: "인스타그램에서 친구들이 함께 모여 찍은 떡볶이 사진을 본 객관적 사실에 집중해봅시다.",
      stepB: "친구들이 일부러 나를 따돌린 것이라고 100% 확신할 명확한 근거가 있나요?",
      stepC: "배신감 때문에 학교에서 말을 닫고 혼자 엎드려 있으면 오해가 풀어질까요?",
      stepD: "친구들에게 부담 없이 솔직하고 가볍게 물어볼 수 있는 유연한 방법은 무엇이 있을까요?",
    },
  },
};
