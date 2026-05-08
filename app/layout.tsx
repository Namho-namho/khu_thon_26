import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "After Stage — 전직 아이돌 진로 전환 AI 플랫폼",
  description: "AI가 당신의 활동 기록을 읽고, 다음 길을 안내합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
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
            <nav>
              <Link
                href="/community"
                className="text-sm text-slate-700 transition-colors hover:text-violet-500"
              >
                커뮤니티
              </Link>
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
