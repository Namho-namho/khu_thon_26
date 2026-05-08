'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import QAList from '@/components/community/QAList';
import ClassGrid from '@/components/community/ClassGrid';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function CommunityPage() {
  const [tab, setTab] = useState<string>('qa');
  const [qaPosts, setQaPosts] = useState<any[]>([]);
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // 모달(입력창) 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', asker: '' });

  // 데이터 불러오기 함수
  async function fetchData() {
    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, nickname')
          .eq('id', user.id)
          .single();
        setRole(profile?.role || 'USER');
        // 로그인한 유저의 닉네임을 기본 작성자로 세팅
        if (profile?.nickname) {
          setNewPost(prev => ({ ...prev, asker: profile.nickname }));
        }
      }

      const { data: qaData, error: qaError } = await supabase
        .from('qa_posts')
        .select('*, mentor:mentors(*)')
        .order('created_at', { ascending: false });

      if (qaError) throw qaError;

      const { data: classData, error: classError } = await supabase
        .from('mentor_contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (classError) throw classError;

      setQaPosts(qaData || []);
      setLiveClasses(classData || []);
    } catch (error: any) {
      console.error('데이터 로딩 에러:', error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.body) return alert('내용을 입력해주세요.');

    const { error } = await supabase
      .from('qa_posts')
      .insert([
        {
          title: newPost.title,
          body: newPost.body,
          asker: newPost.asker || '익명',
          asked_at: '방금 전',
          // 초기 질문 생성 시에는 답변 대기 상태로 설정
          answer: '멘토가 답변을 준비 중입니다.',
          rating: 0,
          helpful_count: 0
        }
      ]);

    if (error) {
      alert('저장 실패: ' + error.message);
    } else {
      setIsModalOpen(false);
      setNewPost({ title: '', body: '', asker: newPost.asker });
      fetchData();
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">선배에게 묻기</h1>
          <p className="mt-2 text-slate-600">먼저 길을 걸어본 선배들의 답변과 클래스를 만나보세요.</p>
        </div>

        {role === 'MENTOR' && (
          <Link
            href="/mentor/upload"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700"
          >
            + 자료 및 클래스 등록하기
          </Link>
        )}
      </header>

      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="qa" className="px-4 data-[state=active]:text-violet-500">Q&A</TabsTrigger>
            <TabsTrigger value="classes" className="px-4 data-[state=active]:text-violet-500">라이브 클래스</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            {role === 'MENTOR' && (
              <Link
                href="/mentor/upload"
                className="md:hidden inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-violet-200"
              >
                등록
              </Link>
            )}
            
            {/* 멘토는 질문을 작성할 수 없도록 USER 권한일 때만 노출 가능 (선택 사항) */}
            {tab === 'qa' && role === 'USER' && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600"
              >
                <Plus className="h-4 w-4" />
                질문 작성하기
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">데이터를 불러오는 중입니다...</div>
        ) : (
          <>
            <TabsContent value="qa" className="outline-none">
              {/* QAList에 권한과 갱신 함수 전달 */}
              <QAList 
                posts={qaPosts} 
                userRole={role} 
                fetchPosts={fetchData} 
              />
            </TabsContent>
            <TabsContent value="classes" className="outline-none">
              <ClassGrid classes={liveClasses} />
            </TabsContent>
          </>
        )}
      </Tabs>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">새 질문 작성</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">닉네임</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-violet-500 bg-slate-50"
                  value={newPost.asker}
                  readOnly // 로그인 유저 닉네임 고정
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">질문 제목</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-violet-500"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">상세 내용</label>
                <textarea 
                  className="h-32 w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-violet-500"
                  value={newPost.body}
                  onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full rounded-lg bg-violet-500 py-2.5 text-sm font-bold text-white hover:bg-violet-600"
              >
                질문 등록하기
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}