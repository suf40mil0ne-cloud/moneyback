'use client';

import { useEffect, useMemo, useState } from 'react';

type TodoChecklistProps = {
  items: string[];
};

const STORAGE_KEY = 'moneyback-todos-v1';

export default function TodoChecklist({ items }: TodoChecklistProps) {
  const initialState = useMemo(() => items.map(() => false), [items]);
  const [checked, setChecked] = useState<boolean[]>(initialState);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setChecked(initialState);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as boolean[];
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecked(parsed);
      } else {
        setChecked(initialState);
      }
    } catch {
      setChecked(initialState);
    }
  }, [initialState, items.length]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleItem = (idx: number) => {
    setChecked((prev) => prev.map((value, index) => (index === idx ? !value : value)));
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-card">
      <h3 className="text-lg font-bold text-ink">오늘 할 일 3개</h3>
      <ul className="mt-3 space-y-3">
        {items.map((item, idx) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
            <input
              id={`todo-${idx}`}
              type="checkbox"
              checked={checked[idx] ?? false}
              onChange={() => toggleItem(idx)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            <label htmlFor={`todo-${idx}`} className={checked[idx] ? 'line-through text-slate-400' : ''}>
              {item}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
