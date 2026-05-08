'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { Star, StarHalf } from 'lucide-react';
import type { TraitCard, TraitDimension } from '@/lib/types';

const DIMENSION_LABELS: Record<TraitDimension, string> = {
  stage_presence: '무대 장악력',
  camera_friendly: '카메라 친화도',
  self_management: '자기관리',
  fan_communication: '팬 소통',
  improvisation: '즉흥 대응',
  collaboration: '협업력',
  content_planning: '콘텐츠 기획',
  mental_resilience: '회복 탄력성',
};

const DIMENSION_ORDER: TraitDimension[] = [
  'stage_presence',
  'camera_friendly',
  'self_management',
  'fan_communication',
  'improvisation',
  'collaboration',
  'content_planning',
  'mental_resilience',
];

const VIOLET_500 = '#8B5CF6';
const SLATE_200 = '#E2E8F0';
const SLATE_600 = '#475569';

function StarRating({ score }: { score: number }) {
  const rounded = Math.round(score * 2) / 2;
  const fullStars = Math.floor(rounded);
  const hasHalf = rounded - fullStars === 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`f${i}`}
          className="h-4 w-4 fill-violet-500 text-violet-500"
        />
      ))}
      {hasHalf && (
        <StarHalf className="h-4 w-4 fill-violet-500 text-violet-500" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 text-slate-300" />
      ))}
      <span className="ml-2 text-sm font-medium text-slate-700">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

type Props = { traitCard: TraitCard; name: string };

export default function TraitCardSection({ traitCard, name }: Props) {
  const radarData = DIMENSION_ORDER.map((d) => ({
    dimension: DIMENSION_LABELS[d],
    score: traitCard.dimensions[d],
  }));

  return (
    <section
      id="trait-card"
      className="scroll-mt-[120px] rounded-3xl border border-slate-200 bg-white p-8 md:p-10"
    >
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
          {name}님의 성향 카드
        </h2>
        <p className="mt-2 text-slate-600">
          위키 텍스트와 설문 응답을 종합해 산출한 8차원 성향 점수입니다. 각
          항목에 마우스를 올리면 근거를 볼 수 있습니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke={SLATE_200} />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 12, fill: SLATE_600 }}
              />
              <PolarRadiusAxis
                domain={[0, 5]}
                angle={90}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="score"
                dataKey="score"
                stroke={VIOLET_500}
                strokeWidth={2}
                fill={VIOLET_500}
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-3">
          {DIMENSION_ORDER.map((d) => (
            <li
              key={d}
              title={traitCard.reasoning[d]}
              className="flex cursor-help items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:border-violet-300 hover:bg-violet-50"
            >
              <span className="text-sm font-medium text-slate-700">
                {DIMENSION_LABELS[d]}
              </span>
              <StarRating score={traitCard.dimensions[d]} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl bg-violet-500 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-100">
          종합 진단
        </p>
        <p className="mt-2 leading-relaxed">{traitCard.summary}</p>
      </div>
    </section>
  );
}
