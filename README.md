# 연말정산 행동 추천기 (정적 index 버전)

한국 사용자 대상 연말정산 행동 가이드 웹페이지입니다.
정밀 환급액 계산 대신, 입력 3분 내 실행 가능한 추천(카드/연금저축·IRP/ISA + 오늘 할 일 3개)을 제공합니다.

## 구조

- `index.html`: 단일 랜딩 페이지(SEO 메타/OG/JSON-LD 포함)
- `style.css`: 모바일 우선 스타일
- `main.js`: 추천 규칙, FAQ 렌더링, 체크리스트 localStorage

## 실행

정적 파일이라 빌드 없이 바로 실행 가능합니다.

```bash
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속.

## Cloudflare Pages 배포

1. GitHub 저장소를 Cloudflare Pages에 연결
2. Build command: 비워두기(없음) 또는 `echo "static"`
3. Output directory: `/` (루트)
4. 브랜치 푸시 시 자동 배포

## AdSense 최적화 반영 포인트

- 콘텐츠 우선: 입력 후 바로 행동 추천/FAQ 제공
- 광고 과밀 회피: 상단/하단 2개 placeholder만 배치
- 문맥 일치: 본문 흐름 사이 광고 영역 배치
- 체류시간 개선: 체크리스트 저장(localStorage), FAQ 아코디언
- 신뢰성: 참고용 서비스 고지 고정 노출

## 고지

본 서비스는 참고용 시뮬레이션이며, 실제 공제는 개인 상황 및 세법 적용 시점에 따라 달라질 수 있습니다.
