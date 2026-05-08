import { NextRequest, NextResponse } from 'next/server';
import type { AssessmentResult, SurveyAnswers } from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { PERSONA_WIKI_TEXT } from '@/lib/mock/persona';
import { generateTraitCard } from '@/lib/ai/trait';
import { generatePortfolio } from '@/lib/ai/portfolio';
import { recommendJobs } from '@/lib/ai/recommend';

export const runtime = 'nodejs';
export const maxDuration = 60;

type AssessBody = {
  surveyAnswers: SurveyAnswers;
  freeText: string;
  useDemo: boolean;
  name?: string;
  stageName?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AssessBody;
    const wikiText = body.useDemo ? PERSONA_WIKI_TEXT : '';

    const traitCard = await generateTraitCard(
      body.surveyAnswers,
      body.freeText ?? '',
      wikiText
    );

    const portfolios = await Promise.all(
      JOBS.map((j) => generatePortfolio(wikiText, traitCard, j.id))
    );

    const recommendations = await recommendJobs(traitCard);

    const result: AssessmentResult = {
      traitCard,
      portfolios,
      recommendations,
    };
    return NextResponse.json(result);
  } catch (err) {
    console.error('[/api/assess] failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
