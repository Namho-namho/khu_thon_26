import type {
  JobId,
  LearningResource,
  RoadmapStep,
  TraitCard,
  TraitDimension,
} from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { ROADMAPS } from '@/lib/data/roadmaps';
import { MODEL, getAnthropicClient } from './client';

type RoadmapAIOutput = {
  timeline: RoadmapStep[];
  learningResources: LearningResource[];
};

const ROADMAP_TOOL = {
  name: 'generate_roadmap',
  description:
    '사용자 성향과 목표 직업에 맞춘 4단계 개인화 로드맵 timeline과 학습 자료를 제출합니다.',
  input_schema: {
    type: 'object' as const,
    properties: {
      timeline: {
        type: 'array',
        minItems: 4,
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            stepNumber: { type: 'integer', minimum: 1, maximum: 4 },
            title: { type: 'string' },
            duration: { type: 'string' },
            description: { type: 'string' },
            tasks: {
              type: 'array',
              minItems: 3,
              maxItems: 3,
              items: { type: 'string' },
            },
          },
          required: [
            'stepNumber',
            'title',
            'duration',
            'description',
            'tasks',
          ],
        },
      },
      learningResources: {
        type: 'array',
        minItems: 3,
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            platform: {
              type: 'string',
              enum: ['인프런', '클래스101', '국비지원', '유튜브'],
            },
            title: { type: 'string' },
            url: { type: 'string' },
            estimatedHours: { type: 'string' },
          },
          required: ['platform', 'title', 'url', 'estimatedHours'],
        },
      },
    },
    required: ['timeline', 'learningResources'],
  },
};

const SYSTEM_PROMPT = `당신은 전직 아이돌의 진로 전환을 돕는 커리어 코치입니다.

사용자의 8차원 성향 카드와 목표 직업이 주어집니다. 다음 원칙으로 4단계 로드맵을 만듭니다:

- 일반론이 아닌 개인화된 가이드를 작성합니다. 사용자의 강점 차원(4.0 이상)과 약점 차원(3.5 이하)을 명시적으로 언급합니다.
- 1~2단계는 강점 활용에 초점을 맞춥니다. 사용자가 이미 가진 자산을 어떻게 직무 경쟁력으로 전환할지 설명합니다.
- 3~4단계는 약점 보강과 안정화에 초점을 맞춥니다. 부족한 차원을 어떤 행동으로 메울지 구체적으로 제시합니다.
- tasks는 측정 가능한 행동으로 작성합니다 (예: "주 3회 1시간 셀프 라이브 진행", "포트폴리오 영상 5편 누적").

[현실 제약 반영 원칙]
사용자는 진로 전환 중인 전직 아이돌입니다. 대부분 현재 어떤 형태든 수입원(아르바이트, 프리랜서, 단발성 행사 등)을 유지하고 있을 가능성이 높습니다. 다음 원칙으로 가이드를 작성합니다:

1. 1~2단계는 현재 수입원을 유지하면서 시작 가능한 행동에 한정합니다. 알바·기존 활동을 그만두라는 가이드는 절대 작성하지 않습니다. 주말, 저녁, 주 1~2회 단발 출강 등 소규모 시간 투자로 시작합니다.
2. 3단계는 새 직무에서 부수입을 만드는 단계입니다. 알바와 병행합니다. "부수입이 알바 시급을 넘으면 비중 전환을 검토한다"는 식으로 명시합니다.
3. 4단계에 비로소 풀타임 전환 가능성을 언급합니다. "이 시점에 안정적 수입이 확보되면 알바를 줄이거나 그만두는 결정 가능" 같이 조건부로 작성합니다.
4. 모든 tasks는 주당 또는 월간 시간 투자량을 명시합니다. 예: "주 2회 저녁 7~10시 보조 강사 (주 6시간)" 또는 "월 1회 주말 오후 워크샵 참여 (월 4시간)".
5. 풀타임 무급 인턴, 풀타임 보조 강사, 매일 출근 같은 현재 수입원과 충돌하는 행동은 가이드에 포함하지 않습니다.

학습 자료의 url은 반드시 아래 검색 페이지 URL 패턴을 따릅니다. 실제 강의 URL을 추측하거나 만들어내지 마세요:

- 인프런: https://www.inflearn.com/courses?s={검색어}
- 클래스101: https://class101.net/search?query={검색어}
- 국비지원: https://www.hrd.go.kr/hrdp/ti/ptiao/PTIAO0100L.do?searchTrprNm={검색어}
- 유튜브: https://www.youtube.com/results?search_query={검색어}

검색어는 직무와 관련된 한국어 키워드입니다. 공백은 + 또는 %20으로 인코딩합니다. 검색어 자체는 한국어 그대로 사용 가능합니다 (URL 인코딩 안 해도 동작합니다).

[학습 자료 큐레이션 원칙]
1. 학습 자료는 목표 직업의 핵심 직무 역량을 직접 기르는 강의여야 합니다. 일반 자기계발 강의(자기관리, 루틴, 습관, 시간관리 등)나 다른 직무의 강의(예: 보컬 트레이너 추천에 인플루언서 마케팅 강의, 1인 크리에이터 영상 제작 강의)는 추천하지 마세요.
2. 학습 자료의 title에는 목표 직업의 핵심 키워드가 반드시 포함되어야 합니다. 예를 들어 목표 직업이 '보컬/댄스 트레이너'라면 title에 "보컬", "댄스", "트레이너", "티칭", "커리큘럼", "레슨" 등의 직무 핵심 키워드가 포함되어야 합니다. 일반적인 자기계발/생산성 키워드("루틴", "습관", "자기관리", "시간관리")만으로 구성된 title은 금지합니다.
3. 약점 보강은 timeline 단계의 description과 tasks로 다룹니다. 학습 자료 추천에서는 약점 보강용 일반 강의 대신 직무 역량 강화 강의에 집중합니다.

언어: 한국어, 존댓말, 간결한 문체.
반드시 generate_roadmap 도구로만 응답합니다.`;

const DIMENSION_LABELS: Record<TraitDimension, string> = {
  stage_presence: '무대 장악력',
  camera_friendly: '카메라 친화도',
  self_management: '자기관리',
  fan_communication: '팬 소통',
  improvisation: '즉흥 대응',
  collaboration: '협업력',
  content_planning: '콘텐츠 기획',
  mental_resilience: '회복 탄력성',
};

const DIMENSION_KEYS = Object.keys(DIMENSION_LABELS) as TraitDimension[];

function findFallback(jobId: JobId): RoadmapAIOutput {
  const r = ROADMAPS.find((rd) => rd.jobId === jobId);
  if (!r) {
    return {
      timeline: ROADMAPS[0].timeline,
      learningResources: ROADMAPS[0].learningResources,
    };
  }
  return { timeline: r.timeline, learningResources: r.learningResources };
}

function formatDimensions(traitCard: TraitCard): string {
  return DIMENSION_KEYS.map(
    (d) =>
      `- ${DIMENSION_LABELS[d]} (${d}): ${traitCard.dimensions[d].toFixed(1)}/5.0`
  ).join('\n');
}

function formatStrengths(traitCard: TraitCard): string {
  const items = DIMENSION_KEYS.filter(
    (d) => traitCard.dimensions[d] >= 4.0
  ).map(
    (d) =>
      `- ${DIMENSION_LABELS[d]} (${traitCard.dimensions[d].toFixed(1)}): ${traitCard.reasoning[d]}`
  );
  return items.length > 0 ? items.join('\n') : '(해당 없음)';
}

function formatWeaknesses(traitCard: TraitCard): string {
  const items = DIMENSION_KEYS.filter(
    (d) => traitCard.dimensions[d] <= 3.5
  ).map(
    (d) =>
      `- ${DIMENSION_LABELS[d]} (${traitCard.dimensions[d].toFixed(1)}): ${traitCard.reasoning[d]}`
  );
  return items.length > 0 ? items.join('\n') : '(해당 없음)';
}

function formatJobCoreTraits(jobId: JobId): string {
  const job = JOBS.find((j) => j.id === jobId);
  if (!job) return '(해당 없음)';
  const items = DIMENSION_KEYS.filter(
    (d) => job.requiredTraits[d] >= 4.0
  ).map(
    (d) => `- ${DIMENSION_LABELS[d]} (${job.requiredTraits[d].toFixed(1)})`
  );
  return items.length > 0 ? items.join('\n') : '(해당 없음)';
}

export async function generateRoadmap(
  traitCard: TraitCard,
  jobId: JobId
): Promise<RoadmapAIOutput> {
  const job = JOBS.find((j) => j.id === jobId);
  if (!job) throw new Error(`Unknown jobId: ${jobId}`);

  if (process.env.USE_MOCK === 'true') {
    return findFallback(jobId);
  }

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create(
      {
        model: MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `다음 사용자에게 '${job.name}' 직업으로의 전환 로드맵을 만들어주세요.

[사용자 8차원 성향]
${formatDimensions(traitCard)}

[성향 분석 요약]
${traitCard.summary}

[강점 차원] (4.0 이상)
${formatStrengths(traitCard)}

[약점 차원] (3.5 이하)
${formatWeaknesses(traitCard)}

[목표 직업]
- 이름: ${job.name}
- 설명: ${job.description}
- 직무 핵심 역량 (4.0 이상):
${formatJobCoreTraits(jobId)}

위 정보를 바탕으로 사용자의 강점을 활용하고 약점을 보강하는 개인화된 4단계 로드맵을 generate_roadmap 도구로 제출해주세요.`,
          },
        ],
        tools: [ROADMAP_TOOL],
        tool_choice: { type: 'tool', name: 'generate_roadmap' },
      },
      { timeout: 60_000 }
    );

    const block = response.content.find((b) => b.type === 'tool_use');
    if (block?.type !== 'tool_use') {
      throw new Error('No tool_use block in response');
    }
    const out = block.input as RoadmapAIOutput;
    return {
      timeline: out.timeline,
      learningResources: out.learningResources,
    };
  } catch (err) {
    console.error(
      `[generateRoadmap] failed for ${jobId}, falling back to static:`,
      err
    );
    return findFallback(jobId);
  }
}
