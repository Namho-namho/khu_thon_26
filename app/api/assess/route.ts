import { NextRequest, NextResponse } from 'next/server';
import type { AssessmentRequest, AssessmentResult } from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { PERSONA_WIKI_TEXT } from '@/lib/mock/persona';
import { fetchWikiFromUrl } from '@/lib/crawler/wiki';
import { generateTraitCard } from '@/lib/ai/trait';
import { generatePortfolio } from '@/lib/ai/portfolio';
import { recommendJobs } from '@/lib/ai/recommend';

export const runtime = 'nodejs';
export const maxDuration = 60;

async function getWikiText(body: AssessmentRequest): Promise<string> {
  if (body.useDemo) return PERSONA_WIKI_TEXT;
  if (body.wikiUrl && process.env.USE_MOCK !== 'true') {
    try {
      return await fetchWikiFromUrl(body.wikiUrl);
    } catch (e) {
      console.warn('Wiki fetch failed:', e);
      return '';
    }
  }
  return '';
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AssessmentRequest;
    const wikiText = await getWikiText(body);

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
