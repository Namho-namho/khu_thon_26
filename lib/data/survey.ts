import type { SurveyAnswers, SurveyQuestion } from '@/lib/types';

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q1',
    text: '나는 큰 무대 위에서 관객 전체의 시선과 분위기를 끌어들이는 흡인력이 있다.',
    dimension: 'stage_presence',
  },
  {
    id: 'q2',
    text: '나는 카메라 앞에서 자연스럽게 감정 표현과 표정을 관리하는 것이 쉽다.',
    dimension: 'camera_friendly',
  },
  {
    id: 'q3',
    text: '나는 일정한 루틴을 유지하며 외형·체력·컨디션을 꾸준히 관리할 수 있다.',
    dimension: 'self_management',
  },
  {
    id: 'q4',
    text: '나는 팬의 작은 디테일(이름, 좋아하는 것 등)을 기억하고, 능동적으로 소통하는 것을 즐긴다.',
    dimension: 'fan_communication',
  },
  {
    id: 'q5',
    text: '나는 무대 사고나 갑작스러운 대본 변경 등 돌발 상황에서도 당황하지 않고 즉각적인 대안을 찾아 실행한 경험이 많다.',
    dimension: 'improvisation',
  },
  {
    id: 'q6',
    text: '나는 팀 내에서 역할 분담을 이해하고 협업을 통해 목표를 달성한 경험이 많다.',
    dimension: 'collaboration',
  },
  {
    id: 'q7',
    text: '나는 SNS, 영상, 사진 등 콘텐츠를 직접 기획하거나 운영하는 것을 좋아한다.',
    dimension: 'content_planning',
  },
  {
    id: 'q8',
    text: '나는 큰 좌절이나 활동 중단을 겪은 후에도, 회복해서 다음 기회를 준비할 수 있다.',
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
  q2: 3,
  q3: 5,
  q4: 3,
  q5: 2,
  q6: 4,
  q7: 3,
  q8: 4,
};

export const DEMO_FREE_TEXT =
  '데뷔 초에 야외 공연 중 폭우로 음향 장비가 멈추는 사고가 있었지만 당황하지 않고 무반주로 끝까지 안무를 완수하며 관객의 호응을 끌어낸 경험이 가장 기억에 남는다. 당시 팀의 메인 댄서로서 대형이 흐트러지지 않도록 멤버들에게 즉각적인 수신호를 보냈고 이 영상은 위기 대응 능력을 증명하는 대표적인 영상으로 화제가 된 적이 있다. 또 매일 12시간 이상의 연습 일정을 3년간 거른 적이 손에 꼽으며 그러한 과정을 통해 나만의 보컬 루틴을 정립했고, 결국 목표했던 고음역대 소화력을 200% 달성하며 성취감을 느꼈다. 팬들과의 실시간 소통 플랫폼에서는 팬들이 선호하는 스타일링과 음악적 취향을 직접 데이터화하여 다음 앨범 컨셉 회의에 제안했고, 실제 반영되어 음원 차트에서 최고 성적을 거두기도 했다. 이 과정에서 나는 단순한 퍼포머를 넘어 대중의 니즈를 분석하고 팀의 성과를 위해 전략적으로 행동하는 기획자 마인드를 기를 수 있었다. 이제는 이러한 카메라 뒤의 치열한 분석과 목표 달성 경험을 바탕으로 기업의 실무 현장에서 성과를 내는 사람이 되고 싶다.';
