## 프로젝트 명

- my wise saying app

![image](https://github.com/youngwan2/wise-saying/assets/107159871/42dedbca-790b-48d9-86db-200db6c21069)

## 프로젝트 개요

- 다양한 주제별 명언/글귀를 간단한 인터페이스를 사용해서 정리하여 볼 수 있는 웹 사이트 입니다. 사용자가 직접 자신의 명언을 등록할 수 있으며, 자신의 명언 혹은 글귀를 이미지로 생성할 수 있는 AI 서비스를 제공하는 것이 특징입니다.

## 프레임워크 / 라이브러리 / 그 외 도구
### 프론트엔드
<details>
<summary>ReactJS(^18)</summary>
</details>
<details>
<summary>NextJS(^14.0.4)</summary>
</details>
<details>
<summary>Typescript(^5)</summary>
</details>
<details>
<summary>tailwindcss(^3.3.0)</summary>
  - 미리 스타일이 정의된 클래스를 기반으로 빠르게 css를 프로젝트에 적용할 수 있으며, 별도로 css 파일 생성 및 선택자 지정이 필요하지 않다는 이점이 매력적으로 다가와 선택하였습니다.
</details>
<details>
<summary>Gsap(^3.12.3)</summary>
  - css 애니메이션에 있어서 성능 최적화가 잘 되어 있고, 사용방법이 간단하다는 이점이 있어서 선택하였습니다. <br>
  - 사용자가 화면에 띄운 로그인, 회원가입, 글작성 창에 있어서 사용성을 높이기 위해 드래그 이벤트를 적용하는 데 활용하였습니다.
</details>
<details>
<summary>Next-Auth(^4.24.5)</summary>
  - 소셜 로그인 인증을 간편하게 실행하기 위한 목적으로 사용하였습니다.
</details>
<details>
<summary>Zustand(^4.4.7)</summary>
  - 복잡한 전역상태가 아닌 단순한 상태의 전역 관리를 목적으로 사용하였습니다. <br>
  - 리덕스와 마찬가지로 불변성을 중요시 하지만, 리덕스는 루트 컴포넌트인 App 을 랩핑하여 전역적으로 스토어를 관리하기 때문에, 상태가 변경되면 관련된 모든 컴포넌트가 리렌더링 되는 문제가 존재하지만, Zustand 의 경우에는 그럴 필요 없이 해당 컴포넌트만 리렌더링 되므로 성능상 이점에 대한 고민 끝에 선택하게 되었습니다.
</details>
<details>
<summary>React-icons(^4.12.0)</summary>
</details>
</details>
<details>
<summary>React-color(^2.19.3)</summary>

  - 사용자가 명언집을 만들 때, 선택할 수 있는 컬러 선택기 라이브러리 입니다.
  - 3년 전을 이후로 릴리즈되지 않고 있지만, 꾸준히 주간 다운로드 수가 높은 점, ui 가 사용하기 편리하게 되어 있고, import 시 클래스명만 바꿔주면 다양한 이미지 편집도구에서 사용되는 컬러 픽커를 쉽게 사용할 수 있다는 점을 보고 선택하였습니다.
</details>
<details>
<summary>word-wrap(^1.2.5)</summary>
  
  - 기존 Canvas API 의 textRect 로 그려진 텍스트의 경우 캔버스의 크기를 벗어나더라도 자동으로 개행해주지 못하는 문제가 존재하였습니다.
  - 이에, 다양한 라이브러리를 찾아보던 중 명언집에 입력된 글자가 캔버스 화면을 벗어나는 경우 자동으로 개행할 수 있도록 도와주는 라이브러리로 word-wrap 을 찾았습니다.
  - 사용성이 좋고, 패키지 사이즈가 가벼우며, 최근 까지도 릴리즈 하고 있는 점, 꾸준히 사용자가 주 1천만 명 이상 활용하고 있는 것을 확인하고 선택하게 되었습니다.
</details>

### 데이터베이스
<details>
<summary>SQLite3(^5.1.6)</summary>
  - 다른 관계형 데이터베이스에 비해 가볍고, 따로 데이터베이스 서버를 구축하지 않고도 간단한 트렌잭션 처리를 간편하고 쉽게 수행할 수 있다는 이점으로 선택하였습니다. <br>
  - 물론 보안상 좋지 못한 방식이기 때문에, 중요한 정보를 저장하기에는 제약이 따르고, 대규모 트랜잭션 처리에서는 동기적으로 동작하는 특성상 성능상 문제가 발생할 수 있음을 인지하고 있습니다. 그러나 앱의 규모나 확장성, 개발의 목적(개인 활용 목적) 등을 염두에 두었을 때 별도의 데이터베이스 서버 구축이 필요하지 않다고 판단하여 선택하였습니다. <br>
  - 향후 실제 프로덕션에서 운영한다면 다른 관계형 데이터베이스나 NoSQL 로 마이그레이션 할 가능성이 있습니다.
</details>

### 유효성 검사
<details>
<summary>Joi(^17.11.0)</summary>
</details>

### 암호화/로그인 인증
<details>
<summary>Bcrypt(^5.1.1)</summary>
</details>
<details>
<summary>Jsonwebtoken(^9.0.2)</summary>
</details>

### API 개발 및 테스도구
<details>
<summary>Postman</summary>
</details>

## 트러블 이슈

...

---

## 할일목록

### 기능
- [x] 인물별 명언 추가 | 유저는 인물(위인)의 이름 카드를 클릭하면 해당 인물의 명언 목록을 조회할 수 있어야 한다.
- [x] 날씨/계절 명언 추가 | 유저는 날씨 카테고리를 클릭하면 날씨와 계절에 관한 명언 목록을 조회할 수 있어야 한다. 
- [x] 요일별 명언 추가 | 유저는 요일 카테고리를 클릭하면 해당 요일 이름 카드를 조회하고, 각 카드를 클릭하면 해당 요일의 명언 목록을 조회할 수 있어야 한다.
- [x] 감성 명언 추가(-> 23.12.17  | 동기부여 명언 등을 모두 같은 테이블로 병합)
- [x] 명언 담기 기능 | (확장 시)유저가 명언을 선택한다면 개별 명언목록이 생성된다.
- [x] 유저 명언 등록 기능 추가 |  유저가 추가한 명언 목록이 유저명언 페이지에 추가되어 조회할 수 있어야 한다.
- [x] 나만의 명언 꾸미기 기능 추가 | 유저는 자신이 추가한 명언 카드를 수정하여 커스텀 명언 카드를 생성할 수 있어야 한다.
- [x] 명언 이미지 추가 기능 + 유저는 자신이 추가한 이미지를 명언 카드의 배경으로 활용할 수 있어야 한다. 
- [ ] 명언 공유 기능 추가 | 유저는 자신이 생성하고 꾸민 명언 카드를 이미지로 저장하고, SNS 에 공유할 수 있어야 한다.
- [ ] 명언 담기 기능 | 유저가 명언 카드를 담으면, 마이페이지에서 해당 명언 목록을 확인할 수 있어야 한다.
- [ ] 명언 담기 미리보기 | 유저가 명언 카드를 담으면, 우측 상단에 담은 명언 목록을 미리 확인할 수 있어야 한다.
- [x] 인생/사랑/성공/사람/슬픔 등 세부 카테고리별 명언 검색 기능 추가(-> 23.12.17  | 기존 감성 명언 카테고리와 전체 병합)
- [ ] 명언 추천 기능 | 유저가 검색한 키워드, 생성한 명언의 키워드를 바탕으로 관련 명언을 추가적으로 조회할 수 있어야 한다.
- [ ] 이미지 생성 AI 추가 | 유저가 명언을 입력하면, 해당 명언에 대한 이미지를 생성할 수 있어야 한다.
- [x] 회원가입 기능 추가 
- [x] 로그인 기능 추가1(NextAuth)
- [x] 로그인 기능 추가2(JWT)
- [ ] ...

### 관리자
- [ ] 명언 목록 조회/삭제/수정/추가 기능 | 유저가 생성한 명언을 삭제할 수 있어야 하고, 기존에 등록되어 있는 명언 목록을 조회하고 삭제, 수정할 수 있어야 한다.

### 성능
- [ ] ...

### 데이터베이스
- [ ] SQLite3 마이그레이션 -> ???


### 배포
- [ ] ...
