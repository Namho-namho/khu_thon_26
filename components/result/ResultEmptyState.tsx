import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ResultEmptyState() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold text-slate-800">
          아직 분석 결과가 없어요
        </h1>
        <p className="mb-10 text-slate-600">
          먼저 역량 분석을 시작해주세요.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/assess?demo=1"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-12 px-7 text-base bg-sky-500 text-white hover:bg-sky-600 [a]:hover:bg-sky-600'
            )}
          >
            데모로 체험하기
          </Link>
          <Link
            href="/assess"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-12 px-7 text-base border-slate-800 bg-transparent text-slate-800 hover:bg-slate-100'
            )}
          >
            직접 입력하기
          </Link>
        </div>
      </div>
    </div>
  );
}
