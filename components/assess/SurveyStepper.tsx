'use client';

const STEP_LABELS = ['기본 정보', '성향 진단', '자유 서술'] as const;

type Props = { step: 1 | 2 | 3 };

export default function SurveyStepper({ step }: Props) {
  const pct = (step / 3) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-800">
          STEP {step}. {STEP_LABELS[step - 1]}
        </span>
        <span className="text-slate-500">{step}/3</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
