'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { JOBS } from '@/lib/data/jobs';
import { ROADMAPS } from '@/lib/data/roadmaps';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import LearningResources from '@/components/roadmap/LearningResources';

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
  const roadmap = ROADMAPS.find((r) => r.jobId === jobId);
  const job = JOBS.find((j) => j.id === jobId);

  if (!roadmap || !job) return <RoadmapEmptyState />;

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <RoadmapHeader job={job} overview={roadmap.overview} />
      <RoadmapTimeline timeline={roadmap.timeline} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <LearningResources resources={roadmap.learningResources} />
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
