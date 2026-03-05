# 연말정산 행동 추천기 (MVP)

한국 사용자 대상 연말정산 행동 가이드 웹페이지입니다.
정밀 환급액 계산 대신, 입력 3분 내 실행 가능한 추천(카드/연금저축·IRP/ISA + 오늘 할 일 3개)을 제공합니다.

## 기술 스택

- Next.js (App Router)
- TypeScript
- TailwindCSS
- 정적 배포: `output: 'export'`

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

정적 결과물은 `out` 디렉터리에 생성됩니다.

## Cloudflare Pages 배포

1. GitHub 저장소를 Cloudflare Pages에 연결
2. Framework preset: `Next.js (Static HTML Export)` 또는 사용자 지정
3. Build command: `npm run build`
4. Output directory: `out`
5. Node 버전 권장: `20` 이상
6. 브랜치 푸시 시 자동 배포

## 스크립트

- `npm run dev`: 개발 서버
- `npm run build`: 프로덕션 빌드 + 정적 export
- `npm run start`: Next 서버 실행(로컬 확인용)
- `npm run export`: build와 동일(정적 결과 생성)

## 고지

본 서비스는 참고용 시뮬레이션입니다. 실제 공제 결과는 개인별 상황과 세법에 따라 달라질 수 있습니다.

## AdSense 최적화 반영 포인트

아래 정책/가이드 방향을 반영해 MVP를 구성했습니다.

- 콘텐츠 우선: 입력 직후 바로 행동 추천 콘텐츠(카드 3개 + 체크리스트 + FAQ)를 제공
- 광고 과밀 회피: 상단/하단 2개 placeholder만 배치하고 본문 흐름을 방해하지 않음
- 문맥 일치: 광고 영역을 정보 섹션 사이에 배치해 사용자 탐색 맥락 유지
- 체류시간 개선: FAQ 아코디언, 체크리스트 localStorage 저장으로 재방문/재사용성 강화
- 신뢰성: 환급액 단정 대신 참고용 고지를 상시 표기
