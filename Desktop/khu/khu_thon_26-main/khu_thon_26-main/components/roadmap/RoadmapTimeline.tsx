import { CheckCircle2 } from 'lucide-react';
import type { RoadmapStep } from '@/lib/types';

type Props = { timeline: RoadmapStep[] };

export default function RoadmapTimeline({ timeline }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold text-slate-800 md:text-3xl">
        4단계 진행 가이드
      </h2>
      <ol className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-violet-200" />
        {timeline.map((step) => (
          <li
            key={step.stepNumber}
            className="relative pl-12 pb-8 last:pb-0"
          >
            <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white shadow-md shadow-violet-500/30">
              {step.stepNumber}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-800">
                  {step.title}
                </h3>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
                  {step.duration}
                </span>
              </div>
              <p className="mb-4 leading-relaxed text-slate-600">
                {step.description}
              </p>
              <ul className="space-y-2">
                {step.tasks.map((task, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                    <span className="leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
