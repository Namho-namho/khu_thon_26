'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false); // 가입/로그인 전환 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 로그인/회원가입 처리 함수
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // 1. 회원가입
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname: nickname,}, // SQL 트리거에서 profiles에 저장할 데이터
        },
      });
      if (error) alert('가입 에러: ' + error.message);
      else alert('가입 성공! 이제 로그인 해주세요.');
    } else {
      // 2. 로그인
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert('로그인 에러: ' + error.message);
      else {
        alert('로그인 성공!');
        router.push('/'); // 로그인 후 커뮤니티로 이동
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          {isSignUp ? '회원가입' : '로그인'}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">닉네임</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-violet-500"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">이메일</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">비밀번호</label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-violet-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-500 py-3 font-bold text-white transition-colors hover:bg-violet-600 disabled:bg-slate-300"
          >
            {loading ? '처리 중...' : isSignUp ? '가입하기' : '로그인하기'}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-6 w-full text-sm text-slate-500 hover:text-violet-500"
        >
          {isSignUp ? '이미 계정이 있나요? 로그인' : '처음이신가요? 회원가입'}
        </button>
      </div>
    </main>
  );
}