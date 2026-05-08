import type { SurveyAnswers, TraitCard } from '@/lib/types';
import { LIKERT_LABELS, SURVEY_QUESTIONS } from '@/lib/data/survey';
import { MOCK_ASSESSMENT_RESULT } from '@/lib/mock/results';
import { MODEL, getAnthropicClient } from './client';

const TRAIT_TOOL = {
  name: 'submit_trait_card',
  description:
    '8개 차원의 성향 점수(0.0~5.0 Float)와 각 차원별 reasoning, 종합 summary를 제출합니다.',
  input_schema: {
    type: 'object' as const,
    properties: {
      dimensions: {
        type: 'object',
        properties: {
          stage_presence: { type: 'number', minimum: 0, maximum: 5 },
          camera_friendly: { type: 'number', minimum: 0, maximum: 5 },
          self_management: { type: 'number', minimum: 0, maximum: 5 },
          fan_communication: { type: 'number', minimum: 0, maximum: 5 },
          improvisation: { type: 'number', minimum: 0, maximum: 5 },
          collaboration: { type: 'number', minimum: 0, maximum: 5 },
          content_planning: { type: 'number', minimum: 0, maximum: 5 },
          mental_resilience: { type: 'number', minimum: 0, maximum: 5 },
        },
        required: [
          'stage_presence',
          'camera_friendly',
          'self_management',
          'fan_communication',
          'improvisation',
          'collaboration',
          'content_planning',
          'mental_resilience',
        ],
      },
      reasoning: {
        type: 'object',
        properties: {
          stage_presence: { type: 'string' },
          camera_friendly: { type: 'string' },
          self_management: { type: 'string' },
          fan_communication: { type: 'string' },
          improvisation: { type: 'string' },
          collaboration: { type: 'string' },
          content_planning: { type: 'string' },
          mental_resilience: { type: 'string' },
        },
        required: [
          'stage_presence',
          'camera_friendly',
          'self_management',
          'fan_communication',
          'improvisation',
          'collaboration',
          'content_planning',
          'mental_resilience',
        ],
      },
      summary: { type: 'string' },
    },
    required: ['dimensions', 'reasoning', 'summary'],
  },
};

const SYSTEM_PROMPT = `당신은 전직 아이돌의 사회 복귀를 돕는 객관적 진단 전문가입니다.

판단 원칙:
- 위키 텍스트는 "외부 평가/객관적 사실", 설문 응답은 "자기 인식"으로 해석합니다.
- 두 정보가 일치할수록 점수의 신뢰도가 큽니다.
- 두 정보가 충돌하면 위키의 구체적 일화를 우선합니다.
- 점수는 0.0~5.0 Float이며, 0.5 또는 0.1 단위로 표기 가능합니다.
- 각 차원의 reasoning은 위키 텍스트의 구체적 표현·일화를 직접 인용해 작성합니다 (예: "...을 한 명씩 호명한 일화"). 인용할 자료가 없으면 "위키에서 직접 근거를 확인하기 어려움"을 명시합니다.
- summary는 강점 2~3개와 보완 영역 1~2개를 한 단락으로 압축합니다.
- 반드시 submit_trait_card 도구로만 응답합니다.`;

function formatAnswers(answers: SurveyAnswers): string {
  return SURVEY_QUESTIONS.map((q) => {
    const score = answers[q.id];
    const label = score ? LIKERT_LABELS[score] : '응답 없음';
    return `- (${q.dimension}) ${q.text} → ${score ?? '-'}점 (${label})`;
  }).join('\n');
}

export async function generateTraitCard(
  answers: SurveyAnswers,
  freeText: string,
  wikiText: string
): Promise<TraitCard> {
  if (process.env.USE_MOCK === 'true') {
    return MOCK_ASSESSMENT_RESULT.traitCard;
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
            content: `[설문 응답]
${formatAnswers(answers)}

[자유 서술]
${freeText || '(없음)'}

[위키 텍스트]
${wikiText || '(없음)'}

위 정보를 바탕으로 8개 차원의 성향 진단을 submit_trait_card 도구로 제출하세요.`,
          },
        ],
        tools: [TRAIT_TOOL],
        tool_choice: { type: 'tool', name: 'submit_trait_card' },
      },
      { timeout: 60_000 }
    );

    const block = response.content.find((b) => b.type === 'tool_use');
    if (block?.type !== 'tool_use') {
      throw new Error('No tool_use block in response');
    }
    return block.input as TraitCard;
  } catch (err) {
    console.error('[generateTraitCard] failed, falling back to mock:', err);
    return MOCK_ASSESSMENT_RESULT.traitCard;
  }
}
