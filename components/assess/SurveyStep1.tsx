'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  name: string;
  stageName: string;
  wikiUrl: string;
  onNameChange: (v: string) => void;
  onStageNameChange: (v: string) => void;
  onWikiUrlChange: (v: string) => void;
  onNext: () => void;
};

const ALLOWED_HOSTS = ['namu.wiki', 'ko.wikipedia.org'];

function isValidWikiUrl(url: string): boolean {
  if (!url.startsWith('https://')) return false;
  try {
    const parsed = new URL(url);
    return ALLOWED_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

export default function SurveyStep1({
  name,
  stageName,
  wikiUrl,
  onNameChange,
  onStageNameChange,
  onWikiUrlChange,
  onNext,
}: Props) {
  const wikiUrlTrimmed = wikiUrl.trim();
  const wikiUrlValid =
    wikiUrlTrimmed === '' || isValidWikiUrl(wikiUrlTrimmed);
  const showWikiError = wikiUrlTrimmed !== '' && !wikiUrlValid;
  const canNext =
    name.trim().length > 0 &&
    stageName.trim().length > 0 &&
    wikiUrlValid;

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
        <div className="space-y-2">
          <Label htmlFor="wiki-url" className="text-slate-700">
            본인 위키 URL{' '}
            <span className="font-normal text-slate-400">(선택)</span>
          </Label>
          <Input
            id="wiki-url"
            value={wikiUrl}
            onChange={(e) => onWikiUrlChange(e.target.value)}
            placeholder="https://namu.wiki/w/..."
            className="h-11 text-base"
          />
          {showWikiError ? (
            <p className="text-xs text-red-500">
              나무위키 또는 위키백과 URL만 지원합니다 (https://로 시작)
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              입력하면 활동 기록 기반 정확한 분석을 제공합니다. 나무위키, 위키백과 URL만 지원.
            </p>
          )}
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
