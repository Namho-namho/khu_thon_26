'use client';

import { Star, User } from 'lucide-react';
import { LIVE_CLASSES } from '@/lib/data/community';

const handleEnroll = () => {
  alert('준비 중입니다. Phase 2에서 제공됩니다.');
};

export default function ClassGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {LIVE_CLASSES.map((c) => (
        <article
          key={c.id}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-violet-300"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-600">
              {c.category}
            </span>
            {c.mentor.profileBadge && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {c.mentor.profileBadge}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-800">
            {c.title}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
              <User className="h-4 w-4 text-slate-500" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-700">{c.mentor.stageName}</p>
              <p className="text-xs text-slate-500">{c.mentor.currentJob}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-violet-500 text-violet-500" />
              <span className="font-medium text-slate-700">
                {c.ratingAvg.toFixed(1)}
              </span>
            </div>
            <span>·</span>
            <span>수강생 {c.studentCount}명</span>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-base font-bold text-slate-800">{c.price}</span>
            <button
              type="button"
              onClick={handleEnroll}
              className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600"
            >
              수강 신청
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
