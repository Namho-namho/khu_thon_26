import type { SurveyAnswers, SurveyQuestion } from '@/lib/types';

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q1',
    text: '많은 사람 앞의 무대나 카메라 앞에서 오히려 에너지가 살아납니다.',
    dimension: 'stage_presence',
  },
  {
    id: 'q2',
    text: '카메라 앞에서 자연스럽게 표정을 만들고 흐름을 끌어가는 데 자신이 있습니다.',
    dimension: 'camera_friendly',
  },
  {
    id: 'q3',
    text: '체력 관리, 외모 관리, 일정 관리를 꾸준히 루틴으로 지켜왔습니다.',
    dimension: 'self_management',
  },
  {
    id: 'q4',
    text: '팬 또는 구독자 한 명 한 명을 기억하고 관계를 이어가는 일이 즐겁습니다.',
    dimension: 'fan_communication',
  },
  {
    id: 'q5',
    text: '예상치 못한 상황이나 대본 없는 자리에서도 막힘없이 대응할 수 있습니다.',
    dimension: 'improvisation',
  },
  {
    id: 'q6',
    text: '동료·팀과 함께 하나의 결과물을 만들어내는 과정을 좋아합니다.',
    dimension: 'collaboration',
  },
  {
    id: 'q7',
    text: '콘텐츠나 무대의 흐름을 처음부터 기획하고 구성하는 일에 흥미가 있습니다.',
    dimension: 'content_planning',
  },
  {
    id: 'q8',
    text: '실패나 비판을 겪은 뒤에도 다시 도전할 동기를 스스로 만들어낼 수 있습니다.',
    dimension: 'mental_resilience',
  },
];

export const LIKERT_LABELS: Record<number, string> = {
  1: '매우 아니다',
  2: '아니다',
  3: '보통이다',
  4: '그렇다',
  5: '매우 그렇다',
};

export const DEMO_SURVEY_ANSWERS: SurveyAnswers = {
  q1: 4,
  q2: 5,
  q3: 5,
  q4: 5,
  q5: 4,
  q6: 3,
  q7: 3,
  q8: 4,
};

export const DEMO_FREE_TEXT =
  '가장 기억에 남는 건 팬미팅 중 처음 만난 팬이 우는 모습을 본 순간이었습니다. 무대 위 박수보다 그 한 사람의 눈물이 더 무겁게 느껴졌고, 그날 이후로 "한 명을 기억하는 일"이 제 활동의 기준이 되었습니다. 다음 길에서도 사람을 한 명씩 마주하는 일을 하고 싶습니다.';
