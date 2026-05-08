'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  '위키에서 활동 기록 분석 중...',
  '당신만의 성향 카드 생성 중...',
  '직무별 포트폴리오 작성 중...',
  '최적 직업 매칭 중...',
] as const;

export default function LoadingScreen() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-violet-500" />
      </div>
      <ul className="mt-10 space-y-3 text-center">
        {MESSAGES.map((msg, i) => {
          if (i > idx) return null;
          const isCurrent = i === idx;
          return (
            <li
              key={i}
              className={
                isCurrent
                  ? 'text-lg font-medium text-violet-500'
                  : 'text-sm text-slate-400'
              }
            >
              {msg}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
