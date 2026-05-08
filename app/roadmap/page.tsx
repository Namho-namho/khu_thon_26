'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type {
  AssessmentResult,
  LearningResource,
  RoadmapStep,
  TraitCard,
} from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { ROADMAPS } from '@/lib/data/roadmaps';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import LearningResources from '@/components/roadmap/LearningResources';
import LoadingScreen from '@/components/assess/LoadingScreen';

function RoadmapEmptyState() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-slate-800">
          어떤 직업의 로드맵을 볼지 선택해주세요
        </h1>
        <p className="mb-10 text-slate-600">
          분석 결과 페이지에서 직업 카드를 클릭하시면 해당 직업의 로드맵으로
          이동합니다.
        </p>
        <div className="flex justify-center">
          <Link
            href="/result"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-12 px-7 text-base bg-violet-500 text-white hover:bg-violet-600 [a]:hover:bg-violet-600'
            )}
          >
            결과 페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}

function RoadmapInner() {
  const sp = useSearchParams();
  const jobId = sp.get('jobId');
  const job = JOBS.find((j) => j.id === jobId);
  const fallback = ROADMAPS.find((r) => r.jobId === jobId);

  const [timeline, setTimeline] = useState<RoadmapStep[] | null>(null);
  const [learningResources, setLearningResources] = useState<
    LearningResource[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId || !fallback) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const raw = sessionStorage.getItem('assessResult');

    if (!raw) {
      setTimeline(fallback.timeline);
      setLearningResources(fallback.learningResources);
      setLoading(false);
      return;
    }

    let traitCard: TraitCard;
    try {
      const parsed = JSON.parse(raw) as AssessmentResult;
      traitCard = parsed.traitCard;
    } catch {
      setTimeline(fallback.timeline);
      setLearningResources(fallback.learningResources);
      setLoading(false);
      return;
    }

    fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, traitCard }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('roadmap api failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setTimeline(data.timeline);
        setLearningResources(data.learningResources);
      })
      .catch((err) => {
        console.warn('[roadmap] AI generation failed, using fallback:', err);
        if (cancelled) return;
        setTimeline(fallback.timeline);
        setLearningResources(fallback.learningResources);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [jobId, fallback]);

  if (!jobId || !job || !fallback) return <RoadmapEmptyState />;

  if (loading) {
    return (
      <LoadingScreen
        messages={[
          '당신의 강점을 분석하는 중...',
          '직무 핵심 역량과 매칭 중...',
          '맞춤 로드맵을 설계하는 중...',
          '추천 학습 자료를 정리하는 중...',
        ]}
      />
    );
  }

  if (!timeline || !learningResources) return <RoadmapEmptyState />;

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <RoadmapHeader job={job} overview={fallback.overview} />
      <RoadmapTimeline timeline={timeline} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <LearningResources resources={learningResources} />
      </div>
    </main>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-slate-500">
          로딩 중...
        </div>
      }
    >
      <RoadmapInner />
    </Suspense>
  );
}
