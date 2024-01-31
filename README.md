## 📓 프로젝트 명

- my wise saying app

![Alt text](image.png)

## 🎫 프로젝트 요약

- 800개가 넘는 명언 목록을 조회하고, 원하는 명언을 커스텀 카드로 생성하여 다운로드 및 공유할 수 있는 웹 사이트

## 📅 개발 기간/유지보수

- (개발기간) 2023년 12월 15일 ~ 2024년 1월 15일
- (유지보수) 2024년 1월 15일 ~

## 🧰 프레임워크 / 라이브러리 / 그 외 도구

### 프론트엔드/백엔드
|사용 스텍 | 선택 이유|
|:---:|:---|
|Typeccript(^5) |(언어) 타입 안정성을 높이고, 코드 가독성 향상 이점 및 Next 팀에서 적용할 것을 권장하는 점을 참고 후 적용 |
| ReactJS(^18) | (SPA) SPA를 통해 빠른 페이지 전환으로 사용자 경험을 향상시키기 위해 적용 |  
| NextJS(^14.1.0) |(리액트 프레임워크) SSR 기반의 RSC의 이점으로 빌드 시 SSG 를 통한 사전 로드를 통한 초기 렌더링 및 번들 사이즈 최적화를 위해 적용|
|Tailwindcss(^3.3.0)|(CSS 프레임워크) 미리 스타일이 정의된 클래스를 기반으로 빠르게 CSS를 프로젝트에 적용하기 위해 적용|
|Zustand(^4.4.7)|(전역 상태관리) 단순한 상태의 전역 관리를 컴포넌트 단위로 쉽고, 빠르게 적용할 수 있는 이점이 있어서 활용|
|React icons(^4.12.0)|다양한 아이콘을 하나의 패키지에서 컴포넌트 형태로 쉽게 적용할 수 있는 이점으로 활용|
|React color(^2.19.3)|다양한 형태의 컬러 선택도구를 쉽게 커스텀하여 활용할 수 있는 이점으로 선택 후 활용|
|Word wrap(^1.2.5)|기존 Canvas API 의 textRect 로 그려진 텍스트의 경우 캔버스의 크기를 벗어나더라도 자동으로 개행해주지 못하는 문제를 개선하기 위해 활용|
gsap(^3.12.3)|(애니메이션) 사용자 로그인창, 헤더 메뉴, 검색창 등 특정 사항에서의 사용자 경험 향상을 목적으로 애니메이션 기능을 적용하기 위해 사용


### 데이터베이스
|사용 스텍 | 선택 이유|
|:---:|:---|
|SQLite(^5.1.6)|(임시 데이터베이스) 데이터베이스 서버 없이 CRUD 처리를 간편하게 할 수 있는 점, 향후 실제 운영 시 다른 데이터베이스로 마이그레이션하기 쉬운 점이 매력적으로 보여서 선택|

### 유효성 검사
|사용 스텍 | 선택 이유|
|:---:|:---|
|Joi(^17.11.0)|(유효성) 회원가입 시 서버에서 전달받은 객체의 유효성 검사를  위해 활용(zod 와 비교 했을 때, 정적 타입 체크를 해주지 않아서 타입안정성이 떨어질 수 있다는 생각이 들었으나, 복잡한 유효성 검사가 목적이 아니므로 joi를 선택)|


### 그 외 도구
|사용 스텍 | 선택 이유|
|:---:|:---|
|Bcrypt(^5.1.1)| (패스워드 암호화) bcrypt 해시 암호화 라이브러리로 회원가입 시 패스워드 암호화를 위해 사용|
|jsonwebtoken(^9.0.2)|(JWT 토큰 발급) AccessToken 기반 로그인 기능 구현을 위해 사용(향후 데이터베이스 변경 및 암호화 라이브러리로 Next-auth 으로 넘어갈 시 빠질 가능성 있음)|
|Postman|(API 관리 및 테스트) 서버단에서 REST API 테스트 및 api 문서화를 위한 용도로 사용|

※ 그 외 필요한 스텍은 향후 개발 방향성에 따라서 추가될 수 있습니다.

## ⚙ 구현된 기능
- 추후 정리 예정


## 🚬트러블 슈팅(이슈)

- 추후 정리 예정(별도 정리중)

---
<br>
<br>
<br>

## 프로젝트 구조(참고용)
```
📦src
 ┣ 📂app
 ┃ ┣ 📂(gallery) -----------→ 커스텀 명언 카드 갤러리(준비중)
 ┃ ┃ ┗ 📂gallery
 ┃ ┣ 📂(post) --------------→ 포스트 수정 및 업데이트 페이지 그룹
 ┃ ┃ ┣ 📂add-wisesaying
 ┃ ┃ ┗ 📂update-wisesaying
 ┃ ┣ 📂(quotes) ------------→ 명언 관련 페이지 그룹
 ┃ ┃ ┣ 📂quotes
 ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┗ 📂[category]
 ┃ ┃ ┃ ┃ ┣ 📂[name]
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┣ 📂user-quotes
 ┃ ┃ ┃ ┣ 📂[category]
 ┃ ┣ 📂(user) -------------→ 유저 관련 페이지 그룹
 ┃ ┃ ┣ 📂login 
 ┃ ┃ ┣ 📂logout
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📂signin
 ┃ ┣ 📂api ----------------→ API Routes
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📂signin
 ┃ ┃ ┣ 📂bookmark
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┣ 📂quotes
 ┃ ┃ ┃ ┣ 📂all
 ┃ ┃ ┃ ┣ 📂authors
 ┃ ┃ ┃ ┃ ┗ 📂[category]
 ┃ ┃ ┃ ┣ 📂random
 ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┃ ┗ 📂post
 ┃ ┃ ┃ ┃ ┃ ┣ 📂categories
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂[category]
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📂comments
 ┃ ┃ ┣ 📂revalidate
 ┃ ┃ ┗ 📂users
 ┃ ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┃ ┗ 📂upload
 ┃ ┣ 📂quotes-styler
 ┃ ┃ ┗ 📂[name]
 ┃ ┃ ┃ ┗ 📂[id]
 ┣ 📂components -------------→  컴포넌트들
 ┃ ┣ 📂layout  
 ┃ ┗ 📂UI
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂bookmark
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┣ 📂quote
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┗ 📂styler
 ┣ 📂configs ----------------→ 프로젝트 환경 설정 관련 처리
 ┣ 📂custom -----------------→ 커스텀 훅
 ┣ 📂services ---------------→ 클라이언트 측 서비스 로직 처리
 ┃ ┣ 📂data
 ┃ ┗ 📂user
 ┣ 📂store ------------------→ Zustand 상태관리
 ┣ 📂types ------------------→ 타입 관리
 ┗ 📂utils ------------------→ 공통 함수 관리 

```





 ## ✏ 할일목록(참고용)

<details>
<summary>참고 리스트</summary>

- [x] 인물별 명언 추가 | 유저는 인물(위인)의 이름 카드를 클릭하면 해당 인물의 명언 목록을 조회할 수 있어야 한다.
- [x] 날씨/계절 명언 추가 | 유저는 날씨 카테고리를 클릭하면 날씨와 계절에 관한 명언 목록을 조회할 수 있어야 한다.
- [x] 요일별 명언 추가 | 유저는 요일 카테고리를 클릭하면 해당 요일 이름 카드를 조회하고, 각 카드를 클릭하면 해당 요일의 명언 목록을 조회할 수 있어야 한다.
- [x] 명언 북마크 기능 | 유저는 선택한 명언 카드를 북마크 리스트에 추가할 수 있다.
- [x] 유저 명언 등록 기능 추가 | 유저가 추가한 명언 목록이 유저명언 페이지에 추가되어 조회할 수 있어야 한다.
- [x] 나만의 명언 꾸미기 기능 추가 | 유저는 자신이 추가한 명언 카드를 수정하여 커스텀 명언 카드를 생성할 수 있어야 한다.
- [x] 명언 이미지 추가 기능 | 유저는 자신이 추가한 이미지를 명언 카드의 배경으로 활용할 수 있어야 한다.
- [ ] 명언 공유 기능 추가 | 유저는 자신이 생성하고 꾸민 명언 카드를 이미지로 저장하고, SNS 에 공유할 수 있어야 한다.
- [x] 명언 담기 기능 | 유저가 명언 카드를 북마크 리스트에 담으면, 마이페이지에서 해당 명언 목록을 개별적으로 확인할 수 있어야 한다.
- [x] 명언 북마크 미리보기 | 유저가 명언 카드를 담으면, 우측 상단에 담은 명언 목록을 미리 확인할 수 있어야 한다.
- [x] 인생/사랑/성공/사람/슬픔 등 세부 카테고리별 명언 검색 기능 추가(-> 23.12.17 | 기존 감성 명언 카테고리와 전체 병합)
- [ ] 명언 추천 기능 | 유저가 검색한 키워드, 생성한 명언의 키워드를 바탕으로 관련 명언을 추가적으로 조회할 수 있어야 한다.
- [ ] 이미지 생성 AI 추가 | 유저가 명언을 입력하면, 해당 명언에 대한 이미지를 생성할 수 있어야 한다.
- [x] 회원가입 기능 추가 | 유저는 이메일, 닉네임, 패스워드, 패스워드 재확인을 입력 후 회원가입 버튼을 클릭하면 회원가입 할 수 있어야 한다.
- [x] 로그인 기능 추가1(NextAuth) | 기존 로그인 기능과 충돌로 보류
- [x] 로그인 기능 추가2(JWT) | 이메일 및 패스워드를 입력하면, API 서버에서 검증 후 accessToken 발급 처리
</details>
