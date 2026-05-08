'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { JOBS } from '@/lib/data/jobs';

export default function MentorUploadPage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    job_id: 'backend',
    file_url: ''
  });
  const router = useRouter();

  useEffect(() => {
    const checkMentor = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data?.role !== 'MENTOR') {
        alert('멘토 전용 페이지입니다.');
        router.push('/');
      }
      setProfile(data);
    };
    checkMentor();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('mentor_contents').insert([
      {
        ...form,
        mentor_id: profile.id,
        mentor_nickname: profile.nickname
      }
    ]);

    if (error) alert('등록 에러: ' + error.message);
    else {
      alert('자료가 성공적으로 등록되었습니다!');
      router.push('/roadmap?jobId=' + form.job_id);
    }
    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">멘토 창작물 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
        <div>
          <label className="mb-2 block text-sm font-semibold">직업 카테고리</label>
          <select 
            className="w-full rounded-lg border p-2.5"
            value={form.job_id}
            onChange={(e) => setForm({...form, job_id: e.target.value})}
          >
            {JOBS.map(job => <option key={job.id} value={job.id}>{job.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">자료 제목</label>
          <input 
            type="text" required className="w-full rounded-lg border p-2.5"
            placeholder="예: 백엔드 현직자만 아는 포트폴리오 꿀팁"
            value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">판매 가격 (원)</label>
          <input 
            type="number" className="w-full rounded-lg border p-2.5"
            value={form.price} onChange={(e) => setForm({...form, price: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">상세 설명</label>
          <textarea 
            className="h-32 w-full rounded-lg border p-2.5"
            value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
          />
        </div>
        <button 
          disabled={loading}
          className="w-full rounded-lg bg-violet-500 py-4 font-bold text-white hover:bg-violet-600 transition-colors disabled:bg-slate-300"
        >
          {loading ? '등록 중...' : '창작물 출시하기'}
        </button>
      </form>
    </main>
  );
}