'use client';

type FAQ = {
  q: string;
  a: string;
};

type FaqAccordionProps = {
  items: FAQ[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <section aria-label="자주 묻는 질문" className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer list-none font-semibold text-ink">{item.q}</summary>
          <p className="mt-3 text-sm text-slate-700">{item.a}</p>
        </details>
      ))}
    </section>
  );
}
