'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LIKERT_LABELS, SURVEY_QUESTIONS } from '@/lib/data/survey';
import type { SurveyAnswers } from '@/lib/types';

type Props = {
  answers: SurveyAnswers;
  onChange: (qid: string, value: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const LIKERT_VALUES = [1, 2, 3, 4, 5] as const;

export default function SurveyStep2({
  answers,
  onChange,
  onPrev,
  onNext,
}: Props) {
  const allAnswered = SURVEY_QUESTIONS.every(
    (q) => answers[q.id] !== undefined
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">성향 진단</h2>
        <p className="text-slate-600">
          무대 활동을 떠올리며 8개 문항에 답해주세요. 외부 평가가 아닌 본인의
          자기 인식을 묻는 질문입니다.
        </p>
      </div>

      <div className="space-y-6">
        {SURVEY_QUESTIONS.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <p className="mb-5 text-base font-medium text-slate-800">
              <span className="mr-2 text-sky-500">Q{idx + 1}.</span>
              {q.text}
            </p>
            <RadioGroup
              value={answers[q.id]?.toString() ?? ''}
              onValueChange={(v) => onChange(q.id, Number(v))}
              className="flex flex-row justify-between gap-2"
            >
              {LIKERT_VALUES.map((score) => {
                const id = `${q.id}-${score}`;
                return (
                  <div
                    key={score}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <RadioGroupItem value={String(score)} id={id} />
                    <Label
                      htmlFor={id}
                      className="cursor-pointer text-center text-xs text-slate-500"
                    >
                      {LIKERT_LABELS[score]}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className="h-11 px-6 border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100"
        >
          이전
        </Button>
        <Button
          onClick={onNext}
          disabled={!allAnswered}
          className="h-11 px-7 text-base bg-sky-500 text-white hover:bg-sky-600 [a]:hover:bg-sky-600"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
