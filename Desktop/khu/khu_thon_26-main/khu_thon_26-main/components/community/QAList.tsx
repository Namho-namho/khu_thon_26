'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface QAListProps {
  posts: any[];
  userRole: string | null;
  fetchPosts: () => void;
}

export default function QAList({ posts, userRole, fetchPosts }: QAListProps) {
  const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});

  const handleAnswerSubmit = async (postId: string) => {
    if (!answerText[postId]) return alert('답변 내용을 입력해주세요.');

    const { error } = await supabase
      .from('qa_posts')
      .update({ answer: answerText[postId] })
      .eq('id', postId);

    if (error) {
      alert('답변 등록 실패: ' + error.message);
    } else {
      alert('답변이 성공적으로 등록되었습니다.');
      setAnswerText(prev => ({ ...prev, [postId]: '' }));
      fetchPosts(); // 부모 컴포넌트 데이터 갱신
    }
  };

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <div key={post.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          {/* 질문 영역 */}
          <div className="mb-4">
            <span className="text-xs font-bold text-violet-500">QUESTION</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{post.title}</h3>
            <p className="text-slate-600 mt-2 text-sm">{post.body}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span>{post.asker}</span>
              <span>•</span>
              <span>{post.asked_at}</span>
            </div>
          </div>

          {/* 답변 영역 */}
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-slate-400">ANSWER</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {post.answer}
            </p>
          </div>

          {/* 멘토 전용 답변 입력창 */}
          {userRole === 'MENTOR' && (
            <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
              <textarea
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-violet-500"
                placeholder="후배를 위한 조언을 남겨주세요..."
                value={answerText[post.id] || ''}
  // 여기서도 prev => ({ ... }) 구조를 사용하여 안전하게 업데이트합니다.
                onChange={(e) => setAnswerText((prev) => ({ ...prev, [post.id]: e.target.value }))}
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleAnswerSubmit(post.id)}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-700"
                >
                  답변 등록
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}