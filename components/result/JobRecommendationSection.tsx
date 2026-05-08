import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { JobRecommendation } from '@/lib/types';
import { JOBS } from '@/lib/data/jobs';
import { cn } from '@/lib/utils';

type Props = { recommendations: JobRecommendation[] };

function jobIdFromName(name: string): string {
  return JOBS.find((j) => j.name === name)?.id ?? 'live-commerce-host';
}

export default function JobRecommendationSection({ recommendations }: Props) {
  return (
    <section
      id="recommendations"
      className="scroll-mt-[120px] rounded-3xl border border-slate-200 bg-white p-8 md:p-10"
    >
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
          당신에게 맞는 직업 Top 5
        </h2>
        <p className="mt-2 text-slate-600">
          성향 점수와 직무 요구 역량을 가중 비교한 결과입니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec) => {
          const isFirst = rec.rank === 1;
          const jobId = jobIdFromName(rec.jobName);
          return (
            <article
              key={rec.rank}
              className={cn(
                'flex flex-col rounded-2xl bg-slate-50 p-6',
                isFirst
                  ? 'border-2 border-violet-500 shadow-lg shadow-violet-500/10'
                  : 'border border-slate-200'
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold',
                    isFirst
                      ? 'bg-violet-500 text-white'
                      : 'bg-slate-200 text-slate-700'
                  )}
                >
                  {rec.rank}
                </span>
                {isFirst && (
                  <span className="text-xs font-semibold text-violet-500">
                    최적 매칭
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                {rec.jobName}
              </h3>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-violet-500">
                  {rec.matchScore}
                </span>
                <span className="text-sm text-slate-500">% 매칭</span>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {rec.reason}
              </p>

              <dl className="mt-5 space-y-1 border-t border-slate-200 pt-4 text-xs text-slate-500">
                <div className="flex justify-between">
                  <dt>평균 월수입</dt>
                  <dd className="text-slate-700">{rec.avgMonthlySalary}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>성장률</dt>
                  <dd className="text-slate-700">{rec.growthRate}</dd>
                </div>
              </dl>

              <Link
                href={`/roadmap?jobId=${jobId}`}
                className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-violet-500 hover:text-violet-500"
              >
                이 직업으로 가는 길 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
