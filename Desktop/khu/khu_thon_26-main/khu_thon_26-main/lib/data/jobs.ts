import type { Job } from '@/lib/types';

/**
 * requiredTraits (1.0-5.0): MVP-stage estimates derived from domain analysis of each role's core duties.
 * Production version would derive these from (1) job-posting NLP analysis (Jobkorea/Saramin) and (2) NCS mapping.
 *
 * avgMonthlySalary / growthRate: Sourced from Korean industry reports and job-board data where available; otherwise marked as estimate.
 */
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
    avgMonthlySalary: '월 250~330만원 (초봉 기준)',
    growthRate: '연 15% (시장 규모 성장)',
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
    avgMonthlySalary: '월 250~400만원 (학원 기본급 + 레슨 인센티브)',
    growthRate: '실용음악 학원 시장 안정세',
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
    avgMonthlySalary: '행사당 평균 41만원 (월 환산 약 250만원)',
    growthRate: 'MICE/이벤트 시장 안정 성장',
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
    avgMonthlySalary: '월 300~550만원 (마케터 직군 평균)',
    growthRate: '연 17% (글로벌 인플루언서 마케팅 CAGR)',
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
    avgMonthlySalary: '월 210~280만원 (잡코리아 공고 기준)',
    growthRate: '키즈 사교육 시장 안정세',
  },
  {
    id: 'kpop-choreographer',
    name: 'K-POP 안무가 / 코레오그래퍼',
    description:
      '아이돌 그룹과 솔로 아티스트의 무대 안무를 창작하고 디렉팅하는 직무. 무대 동선·카메라 워크·퍼포먼스 흡인력을 함께 설계하며, 본인의 무대 경험이 가장 직접적으로 자산화되는 트랙이다.',
    requiredTraits: {
      stage_presence: 4.5,
      camera_friendly: 3.0,
      self_management: 4.0,
      fan_communication: 2.5,
      improvisation: 3.5,
      collaboration: 4.5,
      content_planning: 4.5,
      mental_resilience: 4.0,
    },
    avgMonthlySalary: '프로젝트당 100~500만원 (월 환산 변동 큼)',
    growthRate: 'K-POP 글로벌 시장 확대 동반 성장',
  },
  {
    id: 'agency-ar-manager',
    name: '연예기획사 A&R / 캐스팅 매니저',
    description:
      '신인 발굴, 곡 픽, 아티스트 디렉션 등 산업 안쪽에서 콘텐츠를 설계하는 직무. 무대에 직접 서지 않지만 무대 위에서 보고 들은 것이 곧 직무 경쟁력이 되며, 협업과 꾸준한 인내심이 필요하다.',
    requiredTraits: {
      stage_presence: 2.0,
      camera_friendly: 1.5,
      self_management: 3.5,
      fan_communication: 2.5,
      improvisation: 3.0,
      collaboration: 4.5,
      content_planning: 4.5,
      mental_resilience: 4.0,
    },
    avgMonthlySalary: '월 280~450만원 (대형 기획사 정규직 기준)',
    growthRate: 'K-POP 산업 확장 동반 성장',
  },
  {
    id: 'musical-actor',
    name: '뮤지컬 배우',
    description:
      '뮤지컬 작품에 출연해 연기·노래·안무를 통합적으로 수행하는 직무. 보컬과 무대 경험을 가장 직접 연장할 수 있는 트랙이며, 오디션 합격 → 작품 출연의 사이클을 반복하며 커리어를 쌓는다.',
    requiredTraits: {
      stage_presence: 4.8,
      camera_friendly: 2.5,
      self_management: 4.5,
      fan_communication: 3.0,
      improvisation: 3.5,
      collaboration: 4.5,
      content_planning: 2.5,
      mental_resilience: 4.5,
    },
    avgMonthlySalary: '작품당 회당 10~50만원 (주연급 별도)',
    growthRate: '국내 공연 시장 회복기 진입',
  },
  {
    id: 'voice-coach',
    name: '보이스 코치 (방송·연기 발성)',
    description:
      '아나운서·배우·성우 지망생 또는 일반인을 대상으로 발성·발음·전달력을 코칭하는 직무. 본인의 발성 훈련 경험을 방송·연기 영역으로 확장하는 트랙이며, 1:1 레슨 비중이 높다.',
    requiredTraits: {
      stage_presence: 3.5,
      camera_friendly: 2.5,
      self_management: 4.5,
      fan_communication: 3.5,
      improvisation: 3.0,
      collaboration: 3.5,
      content_planning: 4.0,
      mental_resilience: 3.5,
    },
    avgMonthlySalary: '레슨 회당 5~10만원 (월 환산 250~400만원)',
    growthRate: '스피치/보이스 학원 수요 증가세',
  },
  {
    id: 'event-producer',
    name: '이벤트 PD / 공연 기획자',
    description:
      '기업 행사, 콘서트, 페스티벌 등의 큐시트·연출·운영을 책임지는 직무. 무대 위에서 본 경험을 무대 뒤편의 기획으로 전환하는 트랙이며, 다중 이해관계자 조율 능력이 핵심이다.',
    requiredTraits: {
      stage_presence: 2.5,
      camera_friendly: 1.5,
      self_management: 4.0,
      fan_communication: 2.5,
      improvisation: 4.0,
      collaboration: 4.5,
      content_planning: 4.8,
      mental_resilience: 4.5,
    },
    avgMonthlySalary: '월 280~400만원 (이벤트 대행사 정규직 기준)',
    growthRate: 'MICE/공연 시장 회복기 동반 성장',
  },
];
