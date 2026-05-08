import { NextRequest, NextResponse } from 'next/server';
import type { JobId, TraitCard } from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { generateRoadmap } from '@/lib/ai/roadmap';

export const runtime = 'nodejs';
export const maxDuration = 60;

type RoadmapRequest = {
  jobId: JobId;
  traitCard: TraitCard;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RoadmapRequest;

    const job = JOBS.find((j) => j.id === body.jobId);
    if (!job) {
      return NextResponse.json(
        { error: 'Invalid jobId' },
        { status: 400 }
      );
    }

    if (!body.traitCard || !body.traitCard.dimensions) {
      return NextResponse.json(
        { error: 'Missing traitCard' },
        { status: 400 }
      );
    }

    const result = await generateRoadmap(body.traitCard, body.jobId);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[/api/roadmap] failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
