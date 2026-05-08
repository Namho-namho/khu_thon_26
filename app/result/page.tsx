'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { AssessmentResult } from '@/lib/types';

import ResultEmptyState from '@/components/result/ResultEmptyState';
import ResultPageNav from '@/components/result/ResultPageNav';
import PortfolioSection from '@/components/result/PortfolioSection';
import JobRecommendationSection from '@/components/result/JobRecommendationSection';

const TraitCardSection = dynamic(
  () => import('@/components/result/TraitCardSection'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
    ),
  }
);

type Meta = { name: string; stageName: string; isDemo: boolean };

export default function ResultPage() {
  const [result, setResult] = useState<AssessmentResult | null | undefined>(
    undefined
  );
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    try {
      const r = sessionStorage.getItem('assessResult');
      const m = sessionStorage.getItem('assessMeta');
      if (r) {
        setResult(JSON.parse(r) as AssessmentResult);
      } else {
        setResult(null);
      }
      if (m) setMeta(JSON.parse(m) as Meta);
    } catch (err) {
      console.error('[result] sessionStorage parse failed:', err);
      setResult(null);
    }
  }, []);

  if (result === undefined) return null;
  if (!result) return <ResultEmptyState />;

  const displayName = meta?.name?.trim() || '당신';

  return (
    <>
      <ResultPageNav />
      <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
        <TraitCardSection traitCard={result.traitCard} name={displayName} />
        <PortfolioSection portfolios={result.portfolios} />
        <JobRecommendationSection recommendations={result.recommendations} />
      </main>
    </>
  );
}
