# 🌟 wise sayings (위대한 말)

## 👁‍🗨 프로젝트 개요

- **주제**: 명언 큐레이션 및 감성 체험 플랫폼  
- **기능 요약**: 명언 조회, 음성 듣기(TTS), AI 해석, 명언 카드 꾸미기, 챗봇 기반 생성 기능 제공  
- **타깃 사용자**: 바쁜 일상 속에서 잠시나마 감정 정돈이 필요한 일반 사용자  
- **디자인 포인트**: 차분한 분위기 / 모바일-웹 통합 경험 최적화  

![메인 이미지](https://github.com/youngwan2/wise-saying/assets/107159871/f08ea653-2f8f-4788-b3b0-25ad7204b403)

<br><br>

## 🎯 기획 배경 및 목적

- **왜 만들었나?**  
  국내외에 명언 앱이나 사이트는 많지만, 대부분 번잡하고 광고나 부가 콘텐츠가 과다해 "명언 자체에 집중하기 어렵다"는 피드백이 많았습니다.  
  이 프로젝트는 **명언 그 자체에 집중하고 몰입할 수 있는 환경**을 제공하고자 했습니다.

- **사용자에게 어떤 가치를 주는가?**  
  명언을 감정적으로 체험(TTS)하고, 어려운 명언은 AI로 해석해주며, 나만의 카드로 꾸며 저장하거나 공유할 수 있는 기능을 통해 **심리적 안정, 자기성찰, 감성 커뮤니케이션** 기회를 제공합니다.

<br><br>
## 📅 개발 기간 및 유지보수
- **개발 기간**: 2023.12.15 ~ 2024.04.21  
- **유지보수**: 2024.04.15 ~
<br><br>
## 🧱 핵심 기능 데모 (GIF)

아래는 주요 기능별 데모와 실제 구현 방식 요약입니다.

### 🏠 홈

- **명언 리스트, 무한스크롤, 검색**: `src/app/(main)/page.tsx`, `src/app/(main)/_components/QuoteList.tsx` 등에서 SWR 기반 데이터 패칭과 무한스크롤 구현.

---

### 🔊 명언 TTS (음성 듣기)

- **명언 TTS(음성 듣기)**: 각 명언 카드, 오늘의 명언, 상세/AI 대화 등에서 Web Speech API 기반 커스텀 훅(`useTTS`) 사용
    - 사용 컴포넌트: `QuoteCard`, `TodayQuoteList`, `DetailPageControlButtons`, `ConversationList`
    - 구현 파일: `src/components/UI/quote/card/QuoteCard.tsx`, `src/components/UI/quote/list/TodayQuoteList.tsx`, `src/components/UI/detail-quote/button/DetailPageControlButtons.tsx`, `src/components/UI/ai-quote/ConversationList.tsx`
    - 커스텀 훅: `src/custom/useTTS.tsx` (Web Speech API로 음성합성, 진행률, 재생상태 등 제공)
    - [TTS(음성 듣기) 기능 구현 가이드 보기](./guides/tts-guide.md)

---

### 🖌 명언 꾸미기 (카드 에디터)

#### 버전1 (Old)
- 기본 텍스트/배경 편집, 단순 스타일 적용(`src/app/(canvas-editor)/_components/EditorCanvas.tsx` 등)

![editor1](https://github.com/user-attachments/assets/02f292dc-8fac-4379-b37e-906f70ac72a7)

#### 버전2 (New - 2025.06.29 추가)
- **모듈화/반응형**: ToolPanel, SizeSelector, ShapeToolsPanel 등으로 분리(`src/app/(canvas-editor)/_components/`)
- **모바일 대응**: MobileToolModal, MobileFloatingButtons 등으로 하단 시트/모달 UI(`src/app/(canvas-editor)/_components/`)
- **드래그/사이즈 조절**: fabric.js 기반 자유 편집, 모바일 드래그 핸들(`EditorCanvas.tsx`)
- **추천 사이즈/프리셋**: SizeSelector, RecommandSizeList에서 data-attribute 기반 robust 이벤트 처리
- **다운로드**: DownloadButton이 캔버스 헤더에 고정, SSR-safe 처리(`DownloadButton.tsx`)
- **SSR 호환**: isMounted 패턴으로 document 접근 안전하게 처리(`page.tsx`)

![editor2](https://github.com/user-attachments/assets/c29d9444-f310-40f8-8b98-7ec72b2b5ddb)

📱 **모바일 대응**: 모바일 환경에서도 하단 시트, 드래그 핸들, 퀵 버튼 등으로 편리하게 사용할 수 있도록 UX를 최적화하였습니다.

![image](https://github.com/user-attachments/assets/0827c725-45d9-48eb-9f9a-2717ddf547de)

### 💬 AI 명언 생성 챗봇
- OpenAI API와 연동하여 대화형으로 명언을 생성할 수 있도록 구현하였습니다. (`src/app/(main)/_components/QuoteChatBot.tsx`)

![chat](https://github.com/user-attachments/assets/6e10fa91-f647-4e9f-90cb-46a1dbb59899)

### 📜 무한스크롤 및 확대 기능
- SWR을 활용한 무한스크롤과, fabric.js를 이용한 캔버스 확대/축소 기능을 제공합니다. (`EditorCanvas.tsx`)

![scroll](https://github.com/user-attachments/assets/283542eb-51e5-4983-8371-a7f9273ad988)

---

### 🆕 그 외
- **명언 AI 해석**: 명언이 어려운 경우 AI가 해석을 제공해 드립니다. (`src/app/(main)/_components/QuoteCard.tsx`)
- **카드 이미지 업로드/배경 변경**: StylerImageUploadForm, BackgroundSizeStyler 등에서 이미지 업로드 및 배경 스타일링을 지원합니다.
- **추천 사이즈/프리셋**: SizeSelector, RecommandSizeList에서 인스타그램, 유튜브 등 다양한 소셜미디어 프리셋을 제공합니다.
- **상태관리**: Zustand를 기반으로 전역 상태를 관리합니다. (`src/store/stylerStore.ts`)
- **Redis 연동**: Next.js 서버에서 redis를 활용하여 세션 및 캐시를 관리합니다. (`src/utils/redis.ts`)
- **SSR 안전성**: 모든 document, window 접근은 isMounted 등 클라이언트 체크 후에만 처리하여 SSR 환경에서도 안전하게 동작합니다.
- **가이드 문서**: guides/ 폴더에 모바일, 반응형, Redis 등 상세 구현 가이드를 제공하고 있습니다.

<br><br>
## 📟 배포 및 아키텍처

- **배포 주소**: [https://wise-sayings.com](https://wise-sayings.com) (※ 현재 닫힘)  
- **CI/CD**: Github Actions + AWS CodePipeline  
- **서버/클라이언트 분리형 아키텍처**

![아키텍처](https://github.com/user-attachments/assets/074a67d2-976f-472a-bb42-70cb0aaf3bc2)

<br><br>
## 🔧 기술스택

> ### 📅 버전 변경 이력
> - **2024.04.21 이전:**
>   - Next.js 14.x, React 18.x, TailwindCSS 3.4.x, Zustand 4.x, 기타 주요 라이브러리 구버전 사용
>   - 일부 의존성은 최신 안정화 버전이 아님
> - **2025.07.03 기준:**
>   - Next.js ^15.1.3, React ^19, TypeScript ^5.7.2, TailwindCSS ^3.4.17, Zustand ^5.0.2 등 최신 버전으로 업그레이드
>   - @nextui-org/react, framer-motion, react-icons 등 UI/UX 라이브러리도 최신화
>   - fabric, gsap 등 캔버스/그래픽 관련 라이브러리 최신화
>   - 백엔드/서버, 빌드/테스트, 기타 유틸리티 라이브러리 모두 최신 버전 반영

| 구분 | 기술/라이브러리 | 설명 |
|------|----------------|------|
| **프레임워크/런타임** | Next.js (^15.1.3) | SSR, SSG, RSC 지원 React 기반 프레임워크 |
|  | React (^19) | SPA 기반 UI 구현 |
|  | TypeScript (^5.7.2) | 정적 타입, 유지보수성 향상 |
| **스타일링** | TailwindCSS (^3.4.17) | 빠른 UI 스타일링 |
|  | tailwindcss-3d (^1.0.7) | 3D 효과 Tailwind 플러그인 |
| **상태관리/데이터** | Zustand (^5.0.2) | 전역 상태 관리 |
|  | SWR (^2.3.0) | 서버 상태 관리 및 캐싱 |
| **UI/UX** | @nextui-org/react (^2.6.10) | UI 컴포넌트 라이브러리 |
|  | framer-motion (^11.15.0) | 모션/애니메이션 |
|  | react-icons (^5.4.0) | 아이콘 활용 |
|  | react-color (^2.19.3) | 컬러 피커 |
|  | react-hot-toast (^2.5.1) | 토스트 알림 |
|  | react-toastify (^11.0.2) | 토스트 알림 |
|  | react-spinners (^0.15.0) | 로딩 스피너 |
| **캔버스/그래픽** | fabric (^6.5.4) | 캔버스 기반 에디터 구현 |
|  | gsap (^3.12.5) | 고급 애니메이션 |
| **백엔드/서버** | next-auth (^5.0.0-beta.5) | 인증/인가 |
|  | openai (^4.77.0) | AI 명언 생성 |
|  | redis (^4.7.0) | 세션/캐시 관리 |
|  | pg (^8.13.1) | PostgreSQL 연동 |
|  | aws-sdk (^2.1692.0) | AWS S3/SES 연동 |
|  | nodemailer (^6.9.16) | 이메일 발송 |
| **빌드/테스트** | vitest (^3.2.4) | 테스트 러너 |
|  | @testing-library/react (^16.1.0) | 테스트 도구 |
|  | prettier (^3.4.2) | 코드 포매터 |
|  | eslint (^9.17.0) | 린트 |
| **기타** | uuid (^11.0.3) | 고유 ID 생성 |
|  | joi (^17.13.3) | 입력 유효성 검사 |
|  | sharp (^0.33.5) | 이미지 변환 |
|  | word-wrap (^1.2.5) | 텍스트 줄바꿈 |

<br><br>
## 🗂️ 디렉토리 구조 (요약)
```
📦src
┣ 📂app → 라우팅 그룹 (페이지 단위)
┣ 📂components → 공통 UI 컴포넌트
┣ 📂configs → 환경 설정
┣ 📂custom → 커스텀 훅
┣ 📂services → 클라이언트 서비스 로직
┣ 📂store → Zustand 전역 상태 관리
┣ 📂types → 전역 타입 관리
┣ 📂utils → 유틸리티 함수
┗ 📂validation → 입력 유효성 검사
```

<br><br>

## 📎 문서 및 참고 링크

- [트러블슈팅 및 개발기록 (Notion)](https://youngwan2.notion.site/1f968acd779b808a8248d9a12bfb741e)
- [CI/CD 구축기 - Tistory](https://duklook.tistory.com/563?category=1169621)

<br><br>
## 📌 기여도 및 회고

- **기획 100%**, **프론트엔드 100%**, **백엔드 100%**, **AWS 배포 및 유지보수 전체 담당**
- **성공 요인**: 감성 중심의 단순한 UX에 집중한 설계
- **아쉬운 점**: 명언 품질 보완 및 챗봇 기반 명언 생성 퀄리티 개선 필요

