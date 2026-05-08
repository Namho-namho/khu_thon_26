import type { JobId, Portfolio, TraitCard } from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { MOCK_ASSESSMENT_RESULT } from '@/lib/mock/results';
import { MODEL, getAnthropicClient } from './client';

const PORTFOLIO_TOOL = {
  name: 'submit_portfolio',
  description:
    '특정 직무용 포트폴리오의 sections와 summary를 제출합니다. (targetJob은 시스템에서 자동 설정됩니다)',
  input_schema: {
    type: 'object' as const,
    properties: {
      sections: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'array', items: { type: 'string' } },
          },
          required: ['title', 'content'],
        },
      },
      summary: { type: 'string' },
    },
    required: ['sections', 'summary'],
  },
};

function buildSystemPrompt(jobName: string, jobDescription: string): string {
  return `당신은 전직 아이돌의 직무별 포트폴리오 작성자입니다.

원칙:
- 주어진 위키 텍스트에 없는 사실(경력·이력·수치·연도)은 절대 만들지 않습니다.
- 표현을 다듬는 것은 가능하지만, 새로운 사실을 추가하는 것은 금지입니다.
- "${jobName}" 직무에 직접 관련된 경험·강점·어필 포인트만 추출합니다.
- 성향 점수와 reasoning을 강점 섹션의 근거로 활용합니다.
- sections는 "주요 경력", "핵심 강점", "어필 포인트" 3개를 권장합니다. 각 섹션 content는 3~5개의 짧은 불릿입니다.
- summary는 2~3문장 이내.
- 반드시 submit_portfolio 도구로만 응답합니다.

직무 설명: ${jobDescription}`;
}

function findMockPortfolio(jobName: string): Portfolio {
  const mock = MOCK_ASSESSMENT_RESULT.portfolios.find(
    (p) => p.targetJob === jobName
  );
  return mock ?? MOCK_ASSESSMENT_RESULT.portfolios[0];
}

export async function generatePortfolio(
  wikiText: string,
  traitCard: TraitCard,
  jobId: JobId
): Promise<Portfolio> {
  const job = JOBS.find((j) => j.id === jobId);
  if (!job) throw new Error(`Unknown jobId: ${jobId}`);

  if (process.env.USE_MOCK === 'true') {
    return findMockPortfolio(job.name);
  }

  try {
    const client = getAnthropicClient();
    const response = await client.messages.create(
      {
        model: MODEL,
        max_tokens: 4096,
        system: buildSystemPrompt(job.name, job.description),
        messages: [
          {
            role: 'user',
            content: `[위키 텍스트]
${wikiText || '(없음)'}

[8차원 성향 점수]
${JSON.stringify(traitCard.dimensions, null, 2)}

[성향 진단 요약]
${traitCard.summary}

위 정보를 바탕으로 "${job.name}" 직무용 포트폴리오를 submit_portfolio 도구로 제출하세요.`,
          },
        ],
        tools: [PORTFOLIO_TOOL],
        tool_choice: { type: 'tool', name: 'submit_portfolio' },
      },
      { timeout: 60_000 }
    );

    const block = response.content.find((b) => b.type === 'tool_use');
    if (block?.type !== 'tool_use') {
      throw new Error('No tool_use block in response');
    }
    const out = block.input as Pick<Portfolio, 'sections' | 'summary'>;
    return {
      targetJob: job.name,
      sections: out.sections,
      summary: out.summary,
    };
  } catch (err) {
    console.error(
      `[generatePortfolio] failed for ${jobId}, falling back to mock:`,
      err
    );
    return findMockPortfolio(job.name);
  }
}
