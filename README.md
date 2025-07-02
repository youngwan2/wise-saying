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
  명언을 감정적으로 체험(TTS)하고, 어려운 명언은 AI로 해석해주며, 나만의 카드로 꾸며 저장하거나 공유할 수 있는 기능을 통해  
  **심리적 안정, 자기성찰, 감성 커뮤니케이션** 기회를 제공합니다.
<br><br>
## 📅 개발 기간 및 유지보수
- **개발 기간**: 2023.12.15 ~ 2024.04.21  
- **유지보수**: 2024.04.15 ~
<br><br>
## 🧱 핵심 기능 데모 (GIF)
### 🏠 홈

![home](https://github.com/user-attachments/assets/b7a2cf19-07b6-466e-a9a5-deff878b46b8)

### 🖌 명언 꾸미기

#### 버전1 (Old)

![editor1](https://github.com/user-attachments/assets/02f292dc-8fac-4379-b37e-906f70ac72a7)

#### 버전2 (New - 2025.06.29 추가)

- 마우스 드래그 기반 자유 편집
- 위치/사이즈 동적 조절 가능

![editor2](https://github.com/user-attachments/assets/c29d9444-f310-40f8-8b98-7ec72b2b5ddb)

📱 모바일 대응:

![image](https://github.com/user-attachments/assets/0827c725-45d9-48eb-9f9a-2717ddf547de)

### 💬 AI 명언 생성 챗봇

![chat](https://github.com/user-attachments/assets/6e10fa91-f647-4e9f-90cb-46a1dbb59899)

### 📜 무한스크롤 및 확대 기능

![scroll](https://github.com/user-attachments/assets/283542eb-51e5-4983-8371-a7f9273ad988)

<br><br>
## 📟 배포 및 아키텍처

- **배포 주소**: [https://wise-sayings.com](https://wise-sayings.com) (※ 현재 닫힘)  
- **CI/CD**: Github Actions + AWS CodePipeline  
- **서버/클라이언트 분리형 아키텍처**

![아키텍처](https://github.com/user-attachments/assets/074a67d2-976f-472a-bb42-70cb0aaf3bc2)

<br><br>
## 🔧 기술스택

| 기술/라이브러리       | 설명 |
|----------------------|------|
| TypeScript (^5.4.2)  | 정적 타입 도입으로 유지보수성과 안정성 향상 |
| React (^18)          | SPA 기반 UI 구현 |
| Next.js (^14.1.4)    | SSR, SSG, RSC 최적화 적용 |
| TailwindCSS (^3.4.1) | 빠른 UI 스타일링 |
| Zustand (^4.5.2)     | 전역 상태 관리 |
| SWR (^2.2.5)         | 서버 상태 관리 및 캐싱 |
| React Icons (^5.0.1) | 아이콘 활용 |
| Github Actions       | CI/CD 자동화 도구로 사용 |

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

