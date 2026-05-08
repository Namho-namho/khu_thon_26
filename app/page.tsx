import Link from "next/link";
import { FileText, FilePen, Sparkles, Star, Target } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HOW_IT_WORKS = [
  {
    Icon: Sparkles,
    step: 1,
    title: "진단",
    desc: "8가지 차원으로 당신의 강점 분석",
  },
  {
    Icon: FilePen,
    step: 2,
    title: "변환",
    desc: "활동 기록을 직무별 포트폴리오로",
  },
  {
    Icon: Target,
    step: 3,
    title: "추천",
    desc: "당신에게 맞는 직업 Top 5",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-slate-800 md:text-6xl">
              무대 위 경력을,
              <br />
              사회의 언어로
            </h1>
            <p className="mt-6 text-lg text-slate-600 md:text-xl">
              AI가 당신의 활동 기록을 읽고, 다음 길을 안내합니다
            </p>

            <blockquote className="mt-10 max-w-md rounded-2xl bg-slate-800 p-6 text-slate-100">
              <p className="text-lg italic leading-relaxed">
                &ldquo;내가 뭘 할 수 있는지 모르겠다.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-slate-400">
                — 29세, 6인조 걸그룹 출신
              </footer>
            </blockquote>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/assess?demo=1"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-7 text-base bg-sky-500 text-white hover:bg-sky-600 [a]:hover:bg-sky-600"
                )}
              >
                데모로 체험하기
              </Link>
              <Link
                href="/assess"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-7 text-base border-slate-800 bg-transparent text-slate-800 hover:bg-slate-100"
                )}
              >
                직접 입력하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-800 md:text-4xl">
            팬들이 이미 써둔 당신의 경력
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <FileText className="mb-4 h-10 w-10 text-slate-400" />
              <h3 className="mb-4 text-xl font-semibold text-slate-800">
                일반 취준생
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li>· 자소서를 본인이 작성</li>
                <li>· 자기 진술 의존</li>
                <li>· 본인이 기억하는 것만</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-sky-500 bg-white p-8 shadow-lg shadow-sky-500/10">
              <Star className="mb-4 h-10 w-10 text-sky-500" />
              <h3 className="mb-4 text-xl font-semibold text-slate-800">
                전직 아이돌
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li>· 팬들이 이미 위키에 작성</li>
                <li>· 객관적 기록 존재</li>
                <li>· 활동 디테일 풍부</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-800 md:text-4xl">
            3단계로 당신의 다음 길을 찾습니다
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ Icon, step, title, desc }) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-200 bg-white p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-sky-500/10 p-2">
                    <Icon className="h-6 w-6 text-sky-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    STEP {step}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-800">
                  {title}
                </h3>
                <p className="text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
