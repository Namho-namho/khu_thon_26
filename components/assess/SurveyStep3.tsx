'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const MIN_CHARS = 50;

type Props = {
  freeText: string;
  onChange: (v: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
};

export default function SurveyStep3({
  freeText,
  onChange,
  onPrev,
  onSubmit,
}: Props) {
  const charCount = freeText.trim().length;
  const canSubmit = charCount >= MIN_CHARS;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">자유 서술</h2>
        <p className="text-slate-600">
          가장 인상 깊었던 활동, 본인이 강점이라고 생각하는 영역, 다음 길에서
          하고 싶은 일 등 자유롭게 적어주세요.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="free-text" className="text-slate-700">
          자유 서술
        </Label>
        <Textarea
          id="free-text"
          value={freeText}
          onChange={(e) => onChange(e.target.value)}
          placeholder="예: 데뷔 직후 첫 단독 콘서트에서 객석을 한 명씩 호명했던 순간이 가장 기억에 남습니다..."
          className="min-h-40 text-base"
        />
        <div className="flex justify-between text-xs">
          <span
            className={
              charCount < MIN_CHARS ? 'text-slate-400' : 'text-sky-500'
            }
          >
            최소 {MIN_CHARS}자 이상
          </span>
          <span
            className={
              charCount < MIN_CHARS ? 'text-slate-400' : 'text-sky-500'
            }
          >
            {charCount}자
          </span>
        </div>
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
          onClick={onSubmit}
          disabled={!canSubmit}
          className="h-11 px-7 text-base bg-sky-500 text-white hover:bg-sky-600 [a]:hover:bg-sky-600"
        >
          분석 시작
        </Button>
      </div>
    </div>
  );
}
