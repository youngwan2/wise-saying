## 📓 프로젝트 명

- my wise saying app

![Alt text](image.png)

## 🎫 프로젝트 요약

- 800개가 넘는 명언 목록을 조회하고, 원하는 명언을 커스텀 카드로 생성하여 다운로드 및 공유할 수 있는 웹 사이트

## 📅 개발 기간/유지보수

- (개발기간) 2023년 12월 15일 ~
- (유지보수) 2024년 1월 15일 ~

## 🧰 프레임워크 / 라이브러리 / 그 외 도구

### 프론트엔드/백엔드

|      사용 스텍       | 선택 이유                                                                                                                             |
| :------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
|    Typeccript(^5)    | (언어) 타입 안정성을 높이고, 코드 가독성 향상 이점 및 Next 팀에서 적용할 것을 권장하는 점을 참고 후 적용                              |
|     ReactJS(^18)     | (SPA) SPA를 통해 빠른 페이지 전환으로 사용자 경험을 향상시키기 위해 적용                                                              |
|   NextJS(^14.1.0)    | (리액트 프레임워크) SSR 기반의 RSC의 이점으로 빌드 시 SSG 를 통한 사전 로드를 통한 초기 렌더링 및 번들 사이즈 최적화를 위해 적용      |
| Tailwindcss(^3.3.0)  | (CSS 프레임워크) 미리 스타일이 정의된 클래스를 기반으로 빠르게 CSS를 프로젝트에 적용하기 위해 적용                                    |
|   Zustand(^4.4.7)    | (전역 상태관리) 단순한 상태의 전역 관리를 컴포넌트 단위로 쉽고, 빠르게 적용할 수 있는 이점이 있어서 활용                              |
| React icons(^4.12.0) | 다양한 아이콘을 하나의 패키지에서 컴포넌트 형태로 쉽게 적용할 수 있는 이점으로 활용                                                   |
| React color(^2.19.3) | 다양한 형태의 컬러 선택도구를 쉽게 커스텀하여 활용할 수 있는 이점으로 선택 후 활용                                                    |
|  Word wrap(^1.2.5)   | 기존 Canvas API 의 textRect 로 그려진 텍스트의 경우 캔버스의 크기를 벗어나더라도 자동으로 개행해주지 못하는 문제를 개선하기 위해 활용 |
|    gsap(^3.12.3)     | (애니메이션) 사용자 로그인창, 헤더 메뉴, 검색창 등 특정 사항에서의 사용자 경험 향상을 목적으로 애니메이션 기능을 적용하기 위해 사용   |

### 데이터베이스

|   사용 스텍    | 선택 이유                                                                                                                                                              |
| :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQLite(^5.1.6) | (임시 데이터베이스) 데이터베이스 서버 없이 CRUD 처리를 간편하게 할 수 있는 점, 향후 실제 운영 시 다른 데이터베이스로 마이그레이션하기 쉬운 점이 매력적으로 보여서 선택 |
|   Postgresql   | (상용 데이터베이스)                                                                                                                                                    |

### 유효성 검사

|   사용 스텍   | 선택 이유                                                                                                                                                                                                                 |
| :-----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Joi(^17.11.0) | (유효성) 회원가입 시 서버에서 전달받은 객체의 유효성 검사를 위해 활용(zod 와 비교 했을 때, 정적 타입 체크를 해주지 않아서 타입안정성이 떨어질 수 있다는 생각이 들었으나, 복잡한 유효성 검사가 목적이 아니므로 joi를 선택) |

### 그 외 도구

|      사용 스텍       | 선택 이유                                                                                                                                              |
| :------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
|    Bcrypt(^5.1.1)    | (패스워드 암호화) bcrypt 해시 암호화 라이브러리로 회원가입 시 패스워드 암호화를 위해 사용                                                              |
| jsonwebtoken(^9.0.2) | (JWT 토큰 발급) AccessToken 기반 로그인 기능 구현을 위해 사용(향후 데이터베이스 변경 및 암호화 라이브러리로 Next-auth 으로 넘어갈 시 빠질 가능성 있음) |
|       Postman        | (API 관리 및 테스트) 서버단에서 REST API 테스트 및 api 문서화를 위한 용도로 사용                                                                       |

※ 그 외 필요한 스텍은 향후 개발 방향성에 따라서 추가될 수 있습니다.

## ⚙ 구현된 기능

- 추후 정리 예정

## 🚬트러블 슈팅(이슈)

- https://duklook.tistory.com/417

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

---
## 현재 적용중인 커밋 메시지 양식(참고용)
``` 
부끄럽지만 부족한 제 저장소 코드를 참고하시거나 클론해 가시는 방문자분들이 생각 보다 많이 있으셔서 이에 대해 참고 하셨으면 해서 남깁니다.

현재 프로젝트 파일의 커밋 규칙은 일관성이 없고, 스스로 판단하기에도 너무 지저분한 상태 입니다.
심지어 타입과는 연관성이 없음에도 사용된 경우도 있습니다. 다양한 기능 수정을 포괄하고자 update 라는 추상적인 타입을 만들어 사용하기도 하였습니다.
그리고 어느 커밋 타입은 단축을 사용하고, 또 어떤 것은 그렇지 않는 등의 문제가 있습니다.

따라서, 이에 대한 참고용도로 남깁니다. 

I'm leaving this note as there seem to be more visitors cloning my repository than I expected, and I hope they find it helpful.

Currently, the commit rules for the project files lack consistency and are too messy for even me to judge.
There are cases where types are used without relevance, and an abstract type like 'update' is employed to encompass various feature modifications
(to the extent that it would be better off nonexistent due to the confusion it causes).
Additionally, there are inconsistencies in the use of abbreviated and full types for commits.

Therefore, I'm leaving this note as a reference. 

```
|타입|설명|비고|
|---|---|---| 
|feature/|기능 추가 시 사용 ||
|update/|기능, 문서 등의 수정이 발생했을 때 사용(수정,삭제 등)| |
|retactor/|코드 구조 개선 시 사용||
|fix/|오류나 기타 문제 수정 시 사용||
|docs/|문서(Readme.md에 한정) 수정 시 사용|update/ 와 혼용되어 사용된 부분이 있음|
|remove/|단일 컴포넌트 및 파일이 삭제된 경우에만 사용||
|update/fix/|문제 수정과 혼합적인 기능 수정이 같이 이루어진 경우 사용||
|chore/|빌드 프로세스 등의 설정 변경 시 사용|chore 가 아닌 경우임에도 사용된 문제가 있음|


|Type|	Description|	Notes|
|---|---|---| 
|feature/|	Used when adding a new feature.	||
|update/|	Used for modifications to features, documents, etc.	Includes modifications, deletions, etc.|
|refactor/|	Used when improving code structure.	||
|fix/|	Used for fixing errors or other issues.	||
|docs/|	Used for documentation changes (limited to Readme.md).|	Occasionally used interchangeably with "update/".|
|remove/|	Used only when a single component or file is deleted.|	|
|update/fix/|	Used when a problem fix and feature modification are combined.|
|chore/|	Used for changes in build processes or other settings.|	Sometimes misused instead of being a specific chore.|

