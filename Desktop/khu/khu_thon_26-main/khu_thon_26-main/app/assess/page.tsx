'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { AssessmentResult, SurveyAnswers } from '@/lib/types';
import { DEMO_FREE_TEXT, DEMO_SURVEY_ANSWERS } from '@/lib/data/survey';
import SurveyStepper from '@/components/assess/SurveyStepper';
import SurveyStep1 from '@/components/assess/SurveyStep1';
import SurveyStep2 from '@/components/assess/SurveyStep2';
import SurveyStep3 from '@/components/assess/SurveyStep3';
import LoadingScreen from '@/components/assess/LoadingScreen';

const MIN_LOADING_MS = 6000;
const TIMEOUT_MS = 90_000;

function AssessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === '1';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [stageName, setStageName] = useState('');
  const [wikiUrl, setWikiUrl] = useState('');
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [freeText, setFreeText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (isDemo && !initRef.current) {
      initRef.current = true;
      setName('김○○');
      setStageName('○○');
      setAnswers(DEMO_SURVEY_ANSWERS);
      setFreeText(DEMO_FREE_TEXT);
      setStep(3);
    }
  }, [isDemo]);

  const handleAnswerChange = (qid: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const start = Date.now();

    try {
      const fetchPromise = fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyAnswers: answers,
          freeText,
          useDemo: isDemo,
          wikiUrl,
          name,
          stageName,
        }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as AssessmentResult;
      });

      const timeoutPromise = new Promise<never>((_, rej) =>
        setTimeout(() => rej(new Error('timeout')), TIMEOUT_MS)
      );

      const result = await Promise.race([fetchPromise, timeoutPromise]);

      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_MS - elapsed;
      if (remaining > 0) {
        await new Promise((r) => setTimeout(r, remaining));
      }

      sessionStorage.setItem('assessResult', JSON.stringify(result));
      sessionStorage.setItem(
        'assessMeta',
        JSON.stringify({ name, stageName, isDemo })
      );
      router.push('/result');
    } catch (err) {
      console.error('[assess submit] failed:', err);
      alert('분석 실패, 잠시 후 다시 시도');
      setIsSubmitting(false);
      setStep(1);
    }
  };

  if (isSubmitting) return <LoadingScreen />;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <SurveyStepper step={step} />
      <div className="mt-10">
        {step === 1 && (
          <SurveyStep1
            name={name}
            stageName={stageName}
            wikiUrl={wikiUrl}
            onNameChange={setName}
            onStageNameChange={setStageName}
            onWikiUrlChange={setWikiUrl}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SurveyStep2
            answers={answers}
            onChange={handleAnswerChange}
            onPrev={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <SurveyStep3
            freeText={freeText}
            onChange={setFreeText}
            onPrev={() => setStep(2)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default function AssessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-6 py-12 text-center text-slate-500">
          로딩 중...
        </div>
      }
    >
      <AssessInner />
    </Suspense>
  );
}
