'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import RecommendationCard from '@/components/RecommendationCard';
import TodoChecklist from '@/components/TodoChecklist';
import type { RecommendResult } from '@/lib/recommend';
import { getRecommendations } from '@/lib/recommend';

type FormState = {
  income: string;
  isWorker: boolean;
  hasPension: boolean;
  highCardSpend: boolean;
};

const defaultForm: FormState = {
  income: '',
  isWorker: true,
  hasPension: false,
  highCardSpend: false
};

const formatNumberWithComma = (value: string): string => {
  const digits = value.replace(/[^0-9]/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('ko-KR');
};

export default function LandingClient() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RecommendResult | null>(null);
  const resultRef = useRef<HTMLElement | null>(null);

  const incomeNumber = useMemo(() => Number(form.income.replace(/,/g, '')), [form.income]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.income || Number.isNaN(incomeNumber) || incomeNumber <= 0) {
      setError('연 소득(총급여)을 숫자로 입력해 주세요.');
      return;
    }

    setError('');

    const nextResult = getRecommendations({
      income: incomeNumber,
      isWorker: form.isWorker,
      hasPension: form.hasPension,
      highCardSpend: form.highCardSpend
    });

    setResult(nextResult);

    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-8 rounded-2xl bg-white p-5 shadow-card" aria-label="연말정산 추천 입력">
        <label htmlFor="income" className="text-sm font-semibold text-ink">
          연 소득(총급여, 원)
        </label>
        <input
          id="income"
          name="income"
          inputMode="numeric"
          placeholder="예: 45,000,000"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-accent"
          value={form.income}
          onChange={(e) => setForm((prev) => ({ ...prev, income: formatNumberWithComma(e.target.value) }))}
          aria-invalid={error ? true : undefined}
        />

        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isWorker}
              onChange={(e) => setForm((prev) => ({ ...prev, isWorker: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            근로소득(직장인)입니다
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hasPension}
              onChange={(e) => setForm((prev) => ({ ...prev, hasPension: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            연금저축/IRP를 이미 하고 있어요
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.highCardSpend}
              onChange={(e) => setForm((prev) => ({ ...prev, highCardSpend: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            카드 소비가 많은 편이에요
          </label>
        </div>

        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-ink px-4 py-3 font-bold text-white transition hover:opacity-90"
        >
          추천 받기
        </button>
      </form>

      {result && (
        <section ref={resultRef} className="mt-10 space-y-5" aria-live="polite">
          <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-900">{result.tone}</div>

          <div className="grid gap-4 md:grid-cols-3">
            {result.cards.map((card) => (
              <RecommendationCard key={card.id} card={card} />
            ))}
          </div>

          <TodoChecklist items={result.todayTodos} />
        </section>
      )}
    </>
  );
}
