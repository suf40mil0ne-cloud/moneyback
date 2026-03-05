import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://moneyback.pages.dev'),
  title: '연말정산 행동 추천기 | 3분 컷 절세 액션 가이드',
  description:
    '연 소득과 간단한 체크만 입력하면 올해 남은 기간에 할 연말정산 행동을 3분 안에 추천해드립니다. 정확한 환급액 계산이 아닌 실천 가이드 중심 서비스입니다.',
  openGraph: {
    title: '연말정산 행동 추천기',
    description: '3분 입력으로 카드/연금저축·IRP/ISA 행동 가이드를 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    url: '/'
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
