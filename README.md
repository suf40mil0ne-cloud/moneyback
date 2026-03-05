# 연말정산 행동 추천기 (정적 index 구조)

연봉 + 최소 공제 입력 + 현재 사용액(선택)만으로
카드/현금 목표, 연금저축/IRP, ISA 운용 가이드를 3가지 시나리오로 제공합니다.

## 파일 구조

- `index.html`: 단일 페이지 UI + SEO 메타/JSON-LD
- `style.css`: 모바일 우선 스타일
- `main.js`: 상수/추천 로직/탭/체크리스트(localStorage)
- `ads.txt`: AdSense 인증 정보

## 로컬 실행

```bash
python3 -m http.server 8080
```

`http://localhost:8080` 접속

## Cloudflare Pages 배포

1. GitHub 저장소 연결
2. Build command: 비워두기 또는 `echo "static"`
3. Output directory: `/`
4. 브랜치 push 시 자동 배포

## 고지

본 서비스는 참고용 가이드이며, 실제 공제/세액은 개인 상황과 세법 적용 시점에 따라 달라질 수 있습니다.
