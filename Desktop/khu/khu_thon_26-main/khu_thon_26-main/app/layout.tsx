'use client'; // 상태 확인을 위해 상단에 추가

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. 현재 세션 확인
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // 2. 프로필 정보(닉네임, 역할) 가져오기
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    };
    getUser();

    // 인증 상태 변경 감지 (로그인/로그아웃 시 즉시 반영)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) setProfile(null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-800"
            >
              After Stage
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link
                href="/community"
                className="text-sm font-medium text-slate-700 transition-colors hover:text-violet-500"
              >
                커뮤니티
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold text-violet-600">
                      {profile?.role === 'MENTOR' ? '멘토 선배' : '후배님'}
                    </span>
                    <span className="text-sm font-medium text-slate-900">
                      {profile?.nickname || user.email?.split('@')[0]}님
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="rounded-full bg-slate-200 px-4 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-300"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full bg-violet-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-violet-600 shadow-md shadow-violet-200"
                >
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl space-y-1 px-6 py-6 text-xs text-slate-500">
            <p>위키 텍스트 출처: 나무위키, 위키백과 (CC BY-NC-SA 2.0 KR)</p>
            <p>© 2026 After Stage — Hackathon Demo</p>
          </div>
        </footer>
      </body>
    </html>
  );
}