'use client';

import { Star } from 'lucide-react';
import { QA_POSTS } from '@/lib/data/community';

const handleClick = () => {
  alert('준비 중입니다. Phase 2에서 제공됩니다.');
};

export default function QAList() {
  return (
    <ul className="space-y-4">
      {QA_POSTS.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            onClick={handleClick}
            className="block w-full rounded-2xl border border-slate-200 bg-white p-6 text-left transition-colors hover:border-sky-300"
          >
            <h3 className="text-lg font-semibold text-slate-800">{p.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
              {p.body}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>{p.asker}</span>
              <span>·</span>
              <span>{p.askedAt}</span>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
                  멘토 답변
                </span>
                <span className="text-xs text-slate-500">
                  {p.mentor.stageName} · 현재 {p.mentor.currentJob},{' '}
                  {p.mentor.yearsInJob}년차
                </span>
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-700">
                {p.answer}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-sky-500 text-sky-500" />
                  <span className="font-medium text-slate-700">
                    {p.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-slate-500">
                  도움이 됐어요 {p.helpfulCount}
                </span>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
