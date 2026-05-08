'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // <--- 이 줄을 추가하세요!
import { supabase } from '@/lib/supabase';
import { JOBS } from '@/lib/data/jobs';
import { ROADMAPS } from '@/lib/data/roadmaps';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import LearningResources from '@/components/roadmap/LearningResources';

function RoadmapEmptyState() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-slate-800">
          어떤 직업의 로드맵을 볼지 선택해주세요
        </h1>
        <p className="mb-10 text-slate-600">
          분석 결과 페이지에서 직업 카드를 클릭하시면 해당 직업의 로드맵으로
          이동합니다.
        </p>
        <div className="flex justify-center">
          <Link
            href="/result"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-violet-500 px-7 text-base font-bold text-white hover:bg-violet-600 transition-colors"
          >
            결과 페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}

function RoadmapInner() {
  const sp = useSearchParams();
  const jobId = sp.get('jobId');
  const roadmap = ROADMAPS.find((r) => r.jobId === jobId);
  const job = JOBS.find((j) => j.id === jobId);

  // 1. 권한 확인 로직 추가
  const [role, setRole] = useState<'USER' | 'MENTOR' | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(data?.role);
      }
    };
    checkRole();
  }, []);

  if (!roadmap || !job) return <RoadmapEmptyState />;

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <RoadmapHeader job={job} overview={roadmap.overview} />
      
      {/* 멘토인 경우에만 상단에 관리 도구 노출 (옵션) */}
      {role === 'MENTOR' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-800">
            💡 멘토님, 이 직업에 대한 본인만의 **유료 학습 자료**를 등록해 수익을 창출해보세요!
          </p>
        </div>
      )}

      <RoadmapTimeline timeline={roadmap.timeline} />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <LearningResources resources={roadmap.learningResources} />
        
        {/* 2. 멘토 창작물 섹션 (비즈니스 로직) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">멘토의 시크릿 자료실</h2>
          <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded bg-violet-100 px-2 py-1 text-xs font-bold text-violet-600">PREMIUM</span>
              <span className="text-sm font-bold text-slate-900">₩ 15,000</span>
            </div>
            <h3 className="mb-2 font-bold text-slate-800">현직 멘토가 직접 쓴 실무 로드맵 PDF</h3>
            <p className="mb-6 text-sm text-slate-500">실제 현장에서만 배울 수 있는 A to Z 가이드를 공개합니다.</p>
            
            {/* 유저가 멘토가 아닐 때만 구매 버튼 활성화 */}
            {role !== 'MENTOR' ? (
              <button className="w-full rounded-lg bg-violet-500 py-3 font-bold text-white hover:bg-violet-600 transition-all">
                자료 구매하기
              </button>
            ) : (
              <button className="w-full rounded-lg bg-slate-100 py-3 font-bold text-slate-400 cursor-not-allowed">
                본인 자료는 구매할 수 없습니다
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">로딩 중...</div>}>
      <RoadmapInner />
    </Suspense>
  );
}