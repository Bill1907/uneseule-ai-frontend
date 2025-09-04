# Uneseule AI 프론트엔드

[Next.js 15](https://nextjs.org)를 기반으로 구축된 AI 기반 언어 학습 플랫폼입니다.

## 기술 스택

- **프레임워크**: Next.js 15 (App Router, Turbopack)
- **인증**: Clerk (Supabase 인증 통합)
- **데이터베이스**: Supabase (PostgreSQL, RLS)
- **스타일링**: Tailwind CSS 4, Radix UI (shadcn/ui)
- **음성 AI**: ElevenLabs websocket 통합
- **지원 언어**: 한국어 (기본), 영어, 스페인어

## 시작하기

### 필수 환경 변수

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 코드 품질 검사
npm run lint
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 프로젝트 구조

```
app/[locale]/          # 다국어 지원 페이지
├── auth/             # 인증 페이지 (로그인, 회원가입)
├── onboarding/       # 사용자 온보딩 프로세스
└── service/product/  # 메인 서비스 페이지

actions/              # 서버 액션 (데이터 처리)
components/           # 재사용 가능한 UI 컴포넌트
lib/                  # 핵심 유틸리티
├── supabase.ts      # Supabase 클라이언트
├── translations.ts   # 번역 유틸리티
└── database.types.ts # TypeScript 타입 정의

supabase/functions/   # Edge Functions (외부 API 통합)
messages/            # 다국어 번역 파일
```

## 주요 페이지 구조

### 인증 흐름
- `/auth/sign-in` - 로그인 페이지
- `/auth/sign-up` - 회원가입 페이지
- `/auth/sso-callback` - SSO 콜백 처리

### 온보딩 프로세스
1. `/onboarding` - 사용자 정보 수집
2. `/onboarding/language` - 학습 언어 선택
3. `/onboarding/goals` - 학습 목표 설정
4. `/onboarding/confirmation` - 설정 확인 및 완료

### 메인 서비스
- `/service/product` - 대시보드 (학습 진행 상황)
- `/service/product/library` - 학습 콘텐츠 라이브러리
- `/service/product/class/[id]` - 개별 수업 페이지 (AI 대화)
- `/service/product/chat` - AI 채팅 인터페이스

## 주요 기능

### 인증 및 데이터베이스

- Clerk JWT 토큰 기반 Supabase RLS 정책
- 클라이언트: `useSupabaseClient()` 훅 사용
- 서버: `getSupabaseServerClient()` 사용

### 다국어 지원

- URL 기반 라우팅: `/ko/...`, `/en/...`, `/es/...`
- 동적 번역 시스템
- 언어 전환 컴포넌트

### AI 음성 대화

- ElevenLabs WebRTC 실시간 음성 통합
- 자연스러운 대화형 학습 경험
- Edge Functions를 통한 API 통합

## 개발 가이드

### 컴포넌트 작성

```tsx
// shadcn/ui 컴포넌트 사용
import { Button } from "@/components/ui/button";

// 다국어 지원
import { useTranslations } from "next-intl";
const t = useTranslations("Common");
```

### 데이터베이스 작업

```tsx
// 인증된 클라이언트 사용
const supabase = useSupabaseClient();
const { data, error } = await supabase.from("table_name").select("*");
```

## 배포

### Vercel 배포 (권장)

[Vercel Platform](https://vercel.com)을 통한 자동 배포가 가장 간단합니다.

### 환경 설정
1. Vercel 프로젝트에 환경 변수 설정
2. Supabase 프로젝트 연결
3. Clerk 애플리케이션 연결

## 개발 팀

프로젝트 개선에 참여하고 싶으시다면:
1. 이슈를 확인하거나 생성해주세요
2. 풀 리퀘스트를 제출해주세요
3. 코드 스타일 가이드를 준수해주세요

## 라이선스

이 프로젝트는 내부 사용을 위한 비공개 프로젝트입니다.

## 추가 정보

- [Next.js 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Clerk 문서](https://clerk.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
