import type { EducationTrack } from '@/lib/types';

type Props = { tracks: EducationTrack[] };

export default function EducationTracks({ tracks }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-800">학력 보완 트랙</h2>
      <div className="space-y-3">
        {tracks.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <span className="inline-block rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-600">
              {t.type}
            </span>
            <p className="mt-3 leading-relaxed text-slate-700">
              {t.description}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">추천 대상:</span>{' '}
              {t.recommendedFor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
