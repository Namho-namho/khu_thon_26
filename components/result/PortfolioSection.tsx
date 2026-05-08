'use client';

import { Download } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import type { Portfolio } from '@/lib/types';

type Props = { portfolios: Portfolio[] };

export default function PortfolioSection({ portfolios }: Props) {
  if (portfolios.length === 0) return null;
  const defaultTab = portfolios[0].targetJob;

  const handleDownload = () => {
    alert('준비 중입니다. 다음 업데이트에서 제공됩니다.');
  };

  return (
    <section
      id="portfolio"
      className="scroll-mt-[120px] rounded-3xl border border-slate-200 bg-white p-8 md:p-10"
    >
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
            직무별 포트폴리오
          </h2>
          <p className="mt-2 text-slate-600">
            5개 직무에 맞춰 위키 텍스트에서 추출·재구성한 포트폴리오입니다.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-violet-500 hover:text-violet-500"
        >
          <Download className="h-4 w-4" />
          포트폴리오 다운로드
        </button>
      </header>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-slate-100 p-1">
          {portfolios.map((p) => (
            <TabsTrigger
              key={p.targetJob}
              value={p.targetJob}
              className="text-xs sm:text-sm data-active:text-violet-500"
            >
              {p.targetJob}
            </TabsTrigger>
          ))}
        </TabsList>

        {portfolios.map((p) => (
          <TabsContent
            key={p.targetJob}
            value={p.targetJob}
            className="mt-6 outline-none"
          >
            <blockquote className="mb-6 rounded-2xl border-l-4 border-violet-500 bg-violet-50 p-5 text-sm leading-relaxed text-slate-700">
              {p.summary}
            </blockquote>
            <div className="space-y-6">
              {p.sections.map((sec) => (
                <div key={sec.title}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-500">
                    {sec.title}
                  </h3>
                  <ul className="space-y-2">
                    {sec.content.map((item, i) => (
                      <li key={i} className="flex gap-2 text-slate-700">
                        <span className="text-violet-500">·</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
