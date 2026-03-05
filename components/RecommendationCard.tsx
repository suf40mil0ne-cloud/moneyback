'use client';

import { useState } from 'react';
import type { StrategyCard } from '@/lib/recommend';

type RecommendationCardProps = {
  card: StrategyCard;
};

export default function RecommendationCard({ card }: RecommendationCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-2xl bg-white p-5 shadow-card">
      <header className="mb-4 flex items-center gap-2">
        <span className="text-2xl" aria-hidden>
          {card.icon}
        </span>
        <h3 className="text-lg font-bold text-ink">{card.title}</h3>
      </header>

      <ul className="space-y-2 text-sm text-slate-700">
        {card.bullets.slice(0, 3).map((line) => (
          <li key={line}>• {line}</li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl bg-soft p-3 text-sm text-slate-700">
        <p>{card.monthlyGuide.conservative}</p>
        <p className="mt-1 font-medium text-ink">{card.monthlyGuide.taxFocused}</p>
        <p className="mt-2 text-xs text-slate-600">개인 상황에 따라 무리하지 않는 선에서 조정하세요.</p>
      </div>

      <button
        type="button"
        className="mt-4 text-sm font-semibold text-accent"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {open ? '근거 접기' : '근거 펼치기'}
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          {card.rationale.map((line) => (
            <p key={line} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
