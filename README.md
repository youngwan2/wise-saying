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
## ⚙ 기능
- #### Access + Refresh 기반 JWT 로그인
  - json-web-token 을 사용하여 구현된 로그인 기능입니다. accessToken 이 만료 되기 1분 전에 refreshToken 을 서버로 전송하여 토큰을 재발급하도록 구현하였습니다. 만일 요청이 늦어 사용자가 현재 하는 작업을 이어갈 수 없을 경우를 대비하여 수동으로 토큰을 재발급할 수 있도록 별도 요청 버튼을 추가하였습니다.
    ![image](https://github.com/user-attachments/assets/de150192-ccef-46a4-9bbe-1835163d6c09)
    ![image](https://github.com/user-attachments/assets/f0829847-2c72-4154-a39e-937a7283f458)

- #### 공지사항 기능(24.08.25 추가)
  - 일반적인 공지사항 게시판 입니다. Editor.js 를 이용해 편집기를 구현하였습니다. 관리자 권한을 가진 경우에만 등록, 수정 등이 가능하도록 제한을 두었습니다.
  ![image](https://github.com/user-attachments/assets/64b711db-7c54-449a-b05f-123f69934ae9)
  ![image](https://github.com/user-attachments/assets/ad70a435-683d-4013-adfb-47295dfd2c4c)

- #### 버튼형 무한 스크롤
  - SWR 의 useInfiniteQuery 를 사용하여 구현되었습니다.
  - 조회된 명언의 끝 지점에 도달하면, 더보기 버튼을 클릭하여 추가 목록을 불러오도록 구현되어 있습니다. 해당 기능은 목록을 조회하는 모든 페이지에 공통되게 적용됩니다. 마지막 페이지에 도달하면 '종착지'라 텍스트가 변경됩니다.
  ![image](https://github.com/user-attachments/assets/e939c913-ba1d-45c8-bfcb-51fd95034b67)
  ![image](https://github.com/user-attachments/assets/99f9ed9b-a97c-440b-b191-efee4f9f0584)

- #### 명언 TTS
  - HTML5 스피치 API 를 사용하여 구현되었습니다.
  - 각 명언을 음성으로 들을 수 있고, 현재 음성의 진행도를 시각적으로 확인할 수도록 하여 사용성을 높였습니다.
  ![image](https://github.com/user-attachments/assets/7315df89-bde4-43d4-b8b9-7d1c62615caa)

- #### 명언 꾸미기 및 다운로드
  - 마음에 드는 명언을 선택하여 꾸밀 수 있습니다. HTML5 의 Canvas API 를 사용하여 구현되었으며, 각 편집 도구의 상태를 전역 관리하기 위해 Zustand 를 사용하였습니다.
  - 24개의 기본 이미지를 통해 카드의 배경을 만들 수 있으며, 사용자가 원한다면 추가적인 이미지를 업로드하여 사용할 수 있습니다.
  - 완성된 명언은 .png 형식으로 다운로드할 수 있습니다.
  ![image](https://github.com/user-attachments/assets/295648cd-5603-4f8b-91dd-e26e7df9b926)
  ![image](https://github.com/user-attachments/assets/13f48a9d-4061-405a-a475-796175587e37)

- #### 명언 확대 기능
  - 보다 분위기 있는 상태에서 명언을 감상하기 위해 별도의 확대 기능을 제공합니다. 
  - 확대 시 리스트에 있는 명언 카드가 사라지고, 어두워진 화면에 카드가 나타나며 분절된 텍스트가 순차적으로 렌더링 되며 밑줄이 끄어지는 애니메이션이 보여집니다.
    ![image](https://github.com/user-attachments/assets/cdf06010-d5b7-4745-b7a5-496fd2b797e0)
    ![image](https://github.com/user-attachments/assets/7104adb3-ffd5-433f-821c-8fd91aec5592)

- #### 명언 좋아요
  - 사용자는 자신이 원하는 명언을 발견하면, 좋아요 기능을 통해 평가할 수 있습니다.

- #### 댓글과 대댓글 기능
  - 명언 세부 페이지에 접속하면, 해당 명언에 대한 감상을 댓글로 남길 수 있고, 다른 유저가 해당 댓글에 대댓글을 남길 수 있습니다. 원본 댓 사용자가 댓글을 삭제하면, 대댓글 유저의 댓글도 데이터베이스에서 연쇄적으로 삭제됩니다.

- #### 명언 북마크 기능
  - 사용자는 자신이 원하는 명언을 선택하여 북마크에 저장할 수 있습니다. 저장된 명언을 클릭하면, 해당 명언의 세부 페이지로 이동합니다.

- #### AI 명언 해석 기능/욕설 필터링 기능/명언 챗봇 기능
  - **AI 명언 해석 기능**: GPT 4o mini 를 연동하여, 현재 사용자가 감상하고 있는 명언이 어떤 의미인지 궁금하다면 해석된 데이터를 받아볼 수 있습니다.
    ![image](https://github.com/user-attachments/assets/83b01321-881d-484f-b495-280504527408)
  - **명언 챗봇 기능**:  GPT 4o mini 를 연동하여, 사용자가 원하는 주제의 명언을 생성하여 받아볼 수 있습니다.
    ![image](https://github.com/user-attachments/assets/554e163f-ab20-4b35-a1e9-3bcd8d3588f0)

- #### 회원가입/비밀번호 찾기 기능
  - ##### 회원가입
    - 회원가입 시 본인인증을 위해 이메일 인증을 거쳐야 합니다. 이메일의 도메인의 유효성 및 DNS 조회를 통해 유효한 경우에만 4자리 번호를 사용자의 이메일로 전송합니다.
    - 시간 제한이 있고, 해당 시간 내에 인증을 완료하지 못하면, 인증번호가 메모리 상(Redis 메모리)에서 제거되므로 재인증 요청을 해야 합니다.
    ![image](https://github.com/user-attachments/assets/471c3c09-4a0c-4468-a12c-a63d4be0c5c9)

  - ##### 비밀번호 찾기 기능
    - 비밀번호 찾기 기능 시 DB에 저장이 되어 있고, 유효한 이메일 도메인인 경우에 해당 이메일로 비밀번호를 재설정할 수 있는 주소를 전달합니다.
    - 임시 토큰 형태(accessToklen 을 재사용한 형태)로 7분 이내 만료하지 못하면, 토큰이 만료되어 인증 절차를 재시도해야 합니다.
    ![image](https://github.com/user-attachments/assets/7774197c-30eb-4102-bcdc-8a11caec1a6d)
<br><br>
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
