import type { Job } from '@/lib/types';

type Props = { job: Job; overview: string };

export default function RoadmapHeader({ job, overview }: Props) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
      <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
        직업 로드맵
      </span>
      <h1 className="mt-2 text-3xl font-bold text-slate-800 md:text-4xl">
        {job.name}
      </h1>
      <p className="mt-4 leading-relaxed text-slate-600">{overview}</p>
      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="text-slate-500">평균 월수입:</dt>
          <dd className="font-medium text-slate-800">{job.avgMonthlySalary}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-slate-500">성장률:</dt>
          <dd className="font-medium text-slate-800">{job.growthRate}</dd>
        </div>
      </dl>
    </header>
  );
}
