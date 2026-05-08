'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import QAList from '@/components/community/QAList';
import ClassGrid from '@/components/community/ClassGrid';

export default function CommunityPage() {
  const [tab, setTab] = useState<string>('qa');

  const handleNewPost = () => {
    alert('준비 중입니다. Phase 2에서 제공됩니다.');
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
          선배에게 묻기
        </h1>
        <p className="mt-2 text-slate-600">
          먼저 길을 걸어본 선배들의 답변과 클래스를 만나보세요.
        </p>
      </header>

      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <TabsList className="bg-slate-100">
            <TabsTrigger
              value="qa"
              className="px-4 data-active:text-violet-500"
            >
              Q&A
            </TabsTrigger>
            <TabsTrigger
              value="classes"
              className="px-4 data-active:text-violet-500"
            >
              라이브 클래스
            </TabsTrigger>
          </TabsList>

          {tab === 'qa' && (
            <button
              type="button"
              onClick={handleNewPost}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600"
            >
              <Plus className="h-4 w-4" />
              질문 작성하기
            </button>
          )}
        </div>

        <TabsContent value="qa" className="outline-none">
          <QAList />
        </TabsContent>
        <TabsContent value="classes" className="outline-none">
          <ClassGrid />
        </TabsContent>
      </Tabs>
    </main>
  );
}
