'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  name: string;
  stageName: string;
  onNameChange: (v: string) => void;
  onStageNameChange: (v: string) => void;
  onNext: () => void;
};

export default function SurveyStep1({
  name,
  stageName,
  onNameChange,
  onStageNameChange,
  onNext,
}: Props) {
  const canNext = name.trim().length > 0 && stageName.trim().length > 0;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">기본 정보</h2>
        <p className="text-slate-600">
          진단 결과에 표기될 이름과 활동명을 입력해주세요.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700">
            이름
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="홍길동"
            className="h-11 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stage-name" className="text-slate-700">
            활동명
          </Label>
          <Input
            id="stage-name"
            value={stageName}
            onChange={(e) => onStageNameChange(e.target.value)}
            placeholder="활동명 또는 그룹 내 호칭"
            className="h-11 text-base"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!canNext}
          className="h-11 px-7 text-base bg-violet-500 text-white hover:bg-violet-600 [a]:hover:bg-violet-600"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
