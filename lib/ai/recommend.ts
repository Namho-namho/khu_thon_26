import type { JobRecommendation, TraitCard } from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { MOCK_ASSESSMENT_RESULT } from '@/lib/mock/results';
import { MODEL, getAnthropicClient } from './client';

const RECOMMEND_TOOL = {
  name: 'submit_recommendations',
  description:
    '주어진 모든 직업의 적합도를 분석한 뒤, matchScore 내림차순으로 상위 5개(1~5위)를 제출합니다.',
  input_schema: {
    type: 'object' as const,
    properties: {
      recommendations: {
        type: 'array',
        minItems: 5,
        maxItems: 5,
        items: {
          type: 'object',
          properties: {
            rank: { type: 'integer', minimum: 1, maximum: 5 },
            jobName: { type: 'string' },
            matchScore: { type: 'integer', minimum: 0, maximum: 100 },
            reason: { type: 'string' },
            avgMonthlySalary: { type: 'string' },
            growthRate: { type: 'string' },
          },
          required: [
            'rank',
            'jobName',
            'matchScore',
            'reason',
            'avgMonthlySalary',
            'growthRate',
          ],
        },
      },
    },
    required: ['recommendations'],
  },
};

const SYSTEM_PROMPT = `당신은 전직 아이돌의 직업 추천 시스템입니다.

원칙:
- 주어진 직업 후보 전체를 평가한 뒤, 적합도가 가장 높은 상위 5개를 선별합니다.
- 사용자의 8차원 성향 점수(traitCard.dimensions)와 각 직업의 requiredTraits를 가중 비교합니다.
- 차원별 부합도, 강점/약점의 직무 영향력을 종합해 0~100 정수의 matchScore를 산출합니다.
- 결과는 matchScore 내림차순으로 정렬해 1위(rank=1)부터 5위(rank=5)까지 반드시 5개를 제출합니다.
- jobName, avgMonthlySalary, growthRate는 입력으로 주어진 값을 그대로 사용합니다 (창작 금지).
- reason은 3문장 이내이며, traitCard 점수를 직접 인용합니다 (예: "팬 소통 4.8, 카메라 친화도 4.7").
- 반드시 submit_recommendations 도구로만 응답합니다.`;

function formatJobs(): string {
  return JOBS.map(
    (j) =>
      `- ${j.name}\n  required: ${JSON.stringify(j.requiredTraits)}\n  salary: ${j.avgMonthlySalary}\n  growth: ${j.growthRate}\n  description: ${j.description}`
  ).join('\n\n');
}

export async function recommendJobs(
  traitCard: TraitCard
): Promise<JobRecommendation[]> {
  if (process.env.USE_MOCK === 'true') {
    return MOCK_ASSESSMENT_RESULT.recommendations;
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
            content: `[사용자 8차원 성향 점수]
${JSON.stringify(traitCard.dimensions, null, 2)}

[성향 진단 요약]
${traitCard.summary}

[직업 후보]
${formatJobs()}

위 정보를 바탕으로 5개 직업의 적합도를 산출해 submit_recommendations 도구로 제출하세요.`,
          },
        ],
        tools: [RECOMMEND_TOOL],
        tool_choice: { type: 'tool', name: 'submit_recommendations' },
      },
      { timeout: 60_000 }
    );

    const block = response.content.find((b) => b.type === 'tool_use');
    if (block?.type !== 'tool_use') {
      throw new Error('No tool_use block in response');
    }
    const out = block.input as { recommendations: JobRecommendation[] };
    return out.recommendations;
  } catch (err) {
    console.error('[recommendJobs] failed, falling back to mock:', err);
    return MOCK_ASSESSMENT_RESULT.recommendations;
  }
}
