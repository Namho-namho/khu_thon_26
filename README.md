# NXTAGE

전직 아이돌의 사회 복귀를 돕는 AI 진로 전환 플랫폼. 나무위키 텍스트와 설문 답변을 분석해 (1) 성향 카드, (2) 직무별 포트폴리오, (3) 직업 추천 Top 5를 자동 생성합니다.

2026 해커톤 출품작 — 12시간 안에 구현된 MVP.

## 데모 사용법

1. 랜딩 페이지에서 "데모로 체험하기" 클릭
2. 자동으로 페르소나 김○○ (29세, 6인조 걸그룹 출신)의 답변이 채워진 상태로 진행
3. "분석 시작" 클릭 → 6초 후 결과 페이지

## 실제 위키 URL 분석 (선택)

데모 페르소나 외에, 본인의 나무위키 또는 위키백과 URL을 입력하면 활동 기록 기반의 정확한 분석을 받을 수 있습니다.

1. 랜딩 페이지에서 "직접 입력하기" 클릭
2. Step 1에서 "본인 위키 URL" 항목에 URL 입력
   예: https://namu.wiki/w/...
3. 8문항 설문 + 자유 서술 작성 후 "분석 시작"
4. AI가 위키 텍스트를 실시간 분석해 결과 생성

## 기술 스택

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (base-ui)
- Anthropic Claude API (claude-sonnet-4-5) + Tool Use
- recharts (레이더 차트)

## 환경변수

`.env.local` 파일 생성 후:

```
ANTHROPIC_API_KEY=sk-ant-...
USE_MOCK=true
```

- `USE_MOCK=true`: mock 데이터 즉시 반환 (개발/시연용, 비용 0원)
- `USE_MOCK=false`: Claude API 실제 호출 (호출 1회 약 $0.10)

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000

## 배포

Vercel에 GitHub 연결 후 자동 배포. 환경변수는 Vercel 대시보드에 등록 필요.

## Phase 2 (이후 계획)

- 멘토 매칭 + 실제 커뮤니티 운영
- 기업 컨택 시스템
- PDF 포트폴리오 다운로드
- 학습 진척도 추적

## 라이선스

위키 텍스트 출처: 나무위키, 위키백과 (CC BY-NC-SA 2.0 KR)
