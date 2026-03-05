import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import FaqAccordion from '@/components/FaqAccordion';
import LandingClient from '@/components/LandingClient';
import { faqItems } from '@/lib/faq';

export const metadata: Metadata = {
  title: '연말정산 행동 추천기 | 올해 남은 기간 절세 체크리스트',
  description:
    '복잡한 계산 없이 연 소득과 3가지 체크로 올해 남은 기간에 바로 실행할 연말정산 행동 추천을 받아보세요.',
  keywords: [
    '연말정산',
    '연말정산 추천',
    '연금저축 IRP',
    '현금영수증',
    'ISA',
    '절세 체크리스트',
    '직장인 절세'
  ]
};

const siteUrl = 'https://moneyback.pages.dev';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '연말정산 행동 추천기',
  url: siteUrl,
  inLanguage: 'ko-KR',
  description: '입력 3분으로 확인하는 연말정산 행동 가이드'
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a
    }
  }))
};

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-8 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="rounded-3xl bg-gradient-to-br from-cyan-100 via-white to-emerald-100 p-6 shadow-card md:p-10">
        <p className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">3분 컷</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-ink md:text-4xl">연말정산 행동 추천기</h1>
        <p className="mt-3 text-sm text-slate-700 md:text-base">
          정확한 환급액 계산 대신, 올해 남은 기간에 바로 실행할 카드/연금/ISA 액션을 간단히 추천합니다.
        </p>
      </header>

      <section className="mt-6" aria-label="상단 광고 자리">
        <AdSlot label="상단 광고" size="banner" />
      </section>

      <LandingClient />

      <section className="mt-8" aria-label="하단 광고 자리">
        <AdSlot label="하단 광고" size="rectangle" />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold text-ink">자주 묻는 질문</h2>
        <p className="mt-2 text-sm text-slate-600">연말정산 준비 시 많이 검색하는 질문을 간단히 정리했습니다.</p>
        <div className="mt-4">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <aside className="fixed bottom-0 left-0 right-0 border-t border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
        본 서비스는 참고용 시뮬레이션이며, 실제 공제는 개인 상황 및 세법 적용 시점에 따라 달라질 수 있습니다.
      </aside>
    </main>
  );
}
