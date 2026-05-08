import { ArrowUpRight } from 'lucide-react';
import type { LearningResource } from '@/lib/types';

type Props = { resources: LearningResource[] };

export default function LearningResources({ resources }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-800">추천 학습 자료</h2>
      <div className="space-y-3">
        {resources.map((r, i) => (
          <a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-500 hover:bg-sky-50"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {r.platform}
              </span>
              <span className="text-xs text-slate-500">{r.estimatedHours}</span>
            </div>
            <p className="font-medium leading-snug text-slate-800">{r.title}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-500">
              보러 가기
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
