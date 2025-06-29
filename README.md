# 📓 wise sayings (위대한 말)
## 👁‍🗨 프로젝트 개요
- 명언 목록을 조회하고, 마음에 드는 명언을 선택해서 음성으로 체험하고, 어려운 명언은 AI가 숨은 의미를 설명해주는 바쁜 일상에 지친 모두를 위한 차분한 느낌의 사이트
- 모바일 친화적으로 만들어져 웹과 모바일에서 이질감없이 이용할 수 있도록 구성
![제목을-입력해주세요_-001](https://github.com/youngwan2/wise-saying/assets/107159871/f08ea653-2f8f-4788-b3b0-25ad7204b403)
<br><br>
## 🎫 프로젝트 목적
- **[목적]** 국내, 국외에도 많은 명언 웹이나 앱이 존재 합니다. 하지만, 너무 번잡하고 광범위한 정보를 다루려다 보니 마음에 드는 명언을 곱심으며 감상하기에는 사용자의 시선을 많이 분산시킵니다. 따라서 저는 마음에 드는 명언을 선택하여 차분한 마음으로 집중할 수 있는 환경을 만들고자 했습니다.
<br><br>
## 📅 개발 기간/유지보수
- (개발기간) 2023년 12월 15일 ~ 2024년 4월 21일
- (유지보수) 2024년 4월 15일 ~
<br><br>
## 📒문서
- [트러블슈팅 <링크>](https://youngwan2.notion.site/1f968acd779b808a8248d9a12bfb741e)
- [배포 히스토리- GithubActions 을 통한 CI 와 AWS CodePipeline (CodeDeploy)을 통한 CD 구축](https://duklook.tistory.com/563?category=1169621)
<br><br>
## 🔥 배포
- 데모(비용 문제로 닫힘): [https://wise-sayings.com](https://wise-sayings.com/)
<br><br>
## 📟 배포 아키텍처
![위대한말 아키텍처](https://github.com/user-attachments/assets/074a67d2-976f-472a-bb42-70cb0aaf3bc2)
<br><br>

## 🖼 데모/핵심 기능
### 홈
![home](https://github.com/user-attachments/assets/b7a2cf19-07b6-466e-a9a5-deff878b46b8)

### 명언 꾸미기
- 명언 카드를 꾸미는 기능은 두 가지가 있습니다. 버전1은 과거에 만든 것으로 실제 사용자가 선택한 명언을 직접 커스텀하여 꾸미기 위해 제공됩니다.
- 버전2는 최근 새로 추가된 기능으로 사용자가 원하는 명언 카드를 버전1에 비해 자유도가 높고, 사용자가 주어진 명언 목록 중 선택한 것과는 별개로 독립적으로 사용할 수 있는 에디터 서비스 입니다.
#### 버전1(Old)
![editor1](https://github.com/user-attachments/assets/02f292dc-8fac-4379-b37e-906f70ac72a7)


#### 버전2(New - 2025.06.29 기준 추가)
- 과거 버전은 편집도구를 기반으로 텍스트 및 도형 편집이 가능했으나, 버전2부터는 마우스 드래그를 통해 동적으로 텍스트 및 도형의 위치 변경과 사이즈 변경이 가능해짐

![editor2](https://github.com/user-attachments/assets/c29d9444-f310-40f8-8b98-7ec72b2b5ddb)


- ※ 참고) 모바일 버전에서는 편집도구의 레이아웃이 아래와 같이 바뀝니다.

![image](https://github.com/user-attachments/assets/0827c725-45d9-48eb-9f9a-2717ddf547de)
<br><br>
### 명언 생성 챗봇
![chat](https://github.com/user-attachments/assets/6e10fa91-f647-4e9f-90cb-46a1dbb59899)
<br><br>

### 무한스크롤 및 명언 확대 기능
![scroll](https://github.com/user-attachments/assets/283542eb-51e5-4983-8371-a7f9273ad988)


### 기타
- access+refresh 토큰 기반의 일반 로그인 북마크, 좋아요, 마이페이지, 댓글/대댓글 등의 기본기능 제공

## 🧰 기술스택
|      사용 스텍       | 비고                                                                                                                                                                                                        |
| :------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    Typeccript(^5.4.2)    | (언어) 타입 안정성을 높이고, 코드 가독성 향상 이점 및 Next 팀에서 적용할 것을 권장하는 점을 참고 후 적용                                                                                                           |
|     ReactJS(^18)     | (SPA) SPA를 통해 빠른 페이지 전환으로 사용자 경험을 향상시키기 위해 적용                                                                                                                                           |
|   NextJS(^14.1.4)    | (리액트 프레임워크) SSR 기반의 RSC의 이점으로 빌드 시 SSG 를 통한 사전 로드를 통한 초기 렌더링 및 번들 사이즈 최적화를 위해 적용                                                                                   |
| Tailwindcss(^3.4.1)  | (CSS 프레임워크) 미리 스타일이 정의된 클래스를 기반으로 빠르게 CSS를 프로젝트에 적용하기 위해 적용                                                                                                                 |
|   Zustand(^4.5.2)    | (전역 상태관리) 단순한 상태의 전역 관리를 컴포넌트 단위로 쉽고, 빠르게 적용할 수 있는 이점이 있어서 활용                                                                                                           |
|     Swr(^2.2.5)      | (서버 상태관리) Tanstack Query/react에 비해 가볍고, NextJS 팀에서 개발하여 기존 프로젝트와의 호환성이나 유지보수 측면에서도 유리할 것으로 판단하였고, 실시간 데이터 처리 및 캐싱처리가 필요한 기능처리를 위해 활용 |
| React icons(^5.0.1) | 아이콘 라이브러리 |
|   Github Actions   | 레포지토리에 저장된 프로젝트 파일을 빌드하고, .zip 으로 압축 후 AWS S3에 배포하는 전 과정을 자동화하기 위해 사용 | 
<br><br>
## 🗂️ 프로젝트 구조
```
📦src
 ┣ 📂app
 ┃ ┣ 📂 (ai) -----------→ AI 명언 생성 챗봇(완료) 및 명언이미지 생성(계획중)
 ┃ ┃ ┗ 📂ai-quote
 ┃ ┣ 📂(gallery) -----------→ 커스텀 명언 카드 갤러리(계획중)
 ┃ ┃ ┗ 📂gallery
 ┃ ┣ 📂(post) --------------→ 포스트 수정 및 업데이트 페이지 그룹
 ┃ ┃ ┣ 📂add-wisesaying
 ┃ ┃ ┗ 📂update-wisesaying
 ┃ ┣ 📂(quotes) ------------→ 명언 관련 페이지 그룹
 ┃ ┃ ┃ 📂search
 ┃ ┃ ┣ 📂quotes
 ┃ ┃ ┃ ┗ 📂populars
 ┃ ┃ ┃ ┗ 📂[category]
 ┃ ┃ ┃   ┗ 📂[name]
 ┃ ┃ ┃     ┣ 📂[id]
 ┃ ┃ ┗ 📂user-quotes
 ┃ ┃   ┗📂[category]
 ┃ ┣ 📂(user) -------------→ 유저 관련 페이지 그룹
 ┃ ┃ ┣ 📂forgot
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂logout
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📂signin
 ┃ ┣ 📂api ----------------→ API Routes
 ┃ ┃ ┣ 📂auth -- 인증
 ┃ ┃ ┃ ┣ 📂access
 ┃ ┃ ┃ ┣ 📂refresh
 ┃ ┃ ┃ ┣ 📂clear-token
 ┃ ┃ ┃ ┣ 📂forgot
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📂signin
 ┃ ┃ ┣ 📂bookmark -- 북마크
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┣ 📂quotes -- 명언
 ┃ ┃ ┃ ┣ 📂authors
 ┃ ┃ ┃ ┃ ┗ 📂[category]
 ┃ ┃ ┃ ┣ 📂random
 ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┣ 📂topics
 ┃ ┃ ┃ ┃ ┗ 📂[category]
 ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┃ ┗ 📂post
 ┃ ┃ ┃ ┃   ┣ 📂categories
 ┃ ┃ ┃ ┃   ┃ ┣ 📂[category]
 ┃ ┃ ┃ ┃   ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃   ┗ 📂comments
 ┃ ┃ ┃   ┃ ┗ 📂reply
 ┃ ┃ ┃   ┗ 📂likes
 ┃ ┃ ┣ 📂sitemap
 ┃ ┃ ┗ 📂users
 ┃ ┃   ┗ 📂mypage
 ┃ ┃     ┣ 📂posts
 ┃ ┃     ┗ 📂upload
 ┃ ┗ 📂quotes-styler
 ┃   ┗ 📂[name]
 ┃     ┗ 📂[id]
 ┣ 📂components -------------→  컴포넌트들
 ┃ ┣ 📂layout
 ┃ ┗ 📂UI
 ┃   ┣ 📂auth
 ┃   ┣ 📂bookmark
 ┃   ┣ 📂comment
 ┃   ┣ 📂common
 ┃   ┣ 📂detail-quote
 ┃   ┣ 📂header
 ┃   ┣ 📂mypage
 ┃   ┣ 📂quote
 ┃   ┣ 📂quote-editor
 ┃   ┣ 📂reply
 ┃   ┣ 📂search
 ┃   ┗ 📂styler
 ┣ 📂configs ----------------→ 프로젝트 환경 설정 관련 처리
 ┣ 📂custom -----------------→ 커스텀 훅
 ┣ 📂services ---------------→ 클라이언트 측 서비스 로직 처리
 ┃ ┣ 📂data
 ┃ ┗ 📂user
 ┣ 📂store ------------------→ Zustand 상태관리
 ┣ 📂types ------------------→ 타입 관리
 ┣ 📂utils ------------------→ 공통 함수 관리
 ┗ 📂validation -------------→ joi 유효성 검사
```
