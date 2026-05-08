import type { Job } from '@/lib/types';

export const JOBS: Job[] = [
  {
    id: 'live-commerce-host',
    name: '라이브 커머스 쇼호스트',
    description:
      '실시간 라이브 방송에서 제품을 시연·소개하고 시청자와 채팅으로 즉시 소통하며 판매를 이끄는 직무. 카메라 친화도와 즉흥 대응, 팬·시청자와의 능동적 소통 능력이 핵심이다.',
    requiredTraits: {
      stage_presence: 4.0,
      camera_friendly: 4.8,
      self_management: 3.5,
      fan_communication: 4.5,
      improvisation: 4.5,
      collaboration: 3.0,
      content_planning: 3.5,
      mental_resilience: 4.0,
    },
    avgMonthlySalary: '월 평균 350만원 (실적 인센티브 별도)',
    growthRate: '연 25% (2024년 시장 기준)',
  },
  {
    id: 'vocal-dance-trainer',
    name: '보컬/댄스 트레이너',
    description:
      '연습생, 아이돌 지망생, 일반 수강생을 대상으로 보컬과 안무를 가르치는 직무. 본인의 기량 유지뿐 아니라 학생의 성장을 설계하는 커리큘럼 능력과 협업 태도가 중요하다.',
    requiredTraits: {
      stage_presence: 4.0,
      camera_friendly: 2.5,
      self_management: 4.5,
      fan_communication: 3.0,
      improvisation: 3.0,
      collaboration: 4.0,
      content_planning: 3.5,
      mental_resilience: 3.5,
    },
    avgMonthlySalary: '월 평균 280만원',
    growthRate: '연 8%',
  },
  {
    id: 'mc-reporter',
    name: '행사 MC / 리포터',
    description:
      '기업 행사, 페스티벌, 대학 축제, 시상식 등에서 진행과 인터뷰를 맡는 직무. 무대 장악력과 즉흥 입담, 다양한 관객층에 맞춘 톤 조절이 핵심 역량이다.',
    requiredTraits: {
      stage_presence: 4.5,
      camera_friendly: 4.5,
      self_management: 3.5,
      fan_communication: 4.5,
      improvisation: 4.5,
      collaboration: 3.0,
      content_planning: 3.0,
      mental_resilience: 4.0,
    },
    avgMonthlySalary: '행사당 50~200만원 (월 환산 약 250만원)',
    growthRate: '연 5%',
  },
  {
    id: 'influencer-marketer',
    name: '인플루언서 마케터',
    description:
      '본인의 팔로워 기반을 활용해 브랜드 캠페인을 기획·실행하거나, 다른 인플루언서와 협업해 콘텐츠 마케팅을 수행하는 직무. 콘텐츠 기획력, 카메라 친화도, 팬과의 지속적 관계 관리가 핵심이다.',
    requiredTraits: {
      stage_presence: 3.0,
      camera_friendly: 4.5,
      self_management: 4.0,
      fan_communication: 4.5,
      improvisation: 3.0,
      collaboration: 3.5,
      content_planning: 4.5,
      mental_resilience: 3.5,
    },
    avgMonthlySalary: '월 평균 400만원 (광고 단가 별도)',
    growthRate: '연 30%',
  },
  {
    id: 'kids-dance-instructor',
    name: '키즈 댄스 학원 강사',
    description:
      '미취학 아동·초등학생을 대상으로 댄스를 가르치는 직무. 아이의 집중력에 맞춘 수업 설계, 학부모와의 신뢰 관계 구축, 꾸준한 본인 기량 유지가 모두 중요하다.',
    requiredTraits: {
      stage_presence: 3.5,
      camera_friendly: 2.0,
      self_management: 4.0,
      fan_communication: 4.0,
      improvisation: 3.5,
      collaboration: 4.0,
      content_planning: 4.0,
      mental_resilience: 4.0,
    },
    avgMonthlySalary: '월 평균 250만원',
    growthRate: '연 6%',
  },
];
