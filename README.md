## 프로젝트 명

- my wise saying app

![image](https://github.com/youngwan2/wise-saying/assets/107159871/42dedbca-790b-48d9-86db-200db6c21069)

## 프로젝트 개요

- 다양한 주제별 명언/글귀를 간단한 인터페이스를 사용해서 정리하여 볼 수 있는 웹 사이트 입니다. 사용자가 직접 자신의 명언을 등록할 수 있으며, 자신의 명언 혹은 글귀를 이미지로 생성할 수 있는 AI 서비스를 제공하는 것이 특징입니다.

## 프레임워크 / 라이브러리 / 그 외 도구
### 프론트엔드

- ReactJS(v18+)
- NextJS(v14+)
- Typescript(v5+)
- tailwindcss
- Gsap(v3+)
- ...

### 데이터베이스

- SQLite3
- ...

### API 개발 및 테스도구
- Postman

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
- [ ] 유저 명언 등록 기능 추가 |  유저가 추가한 명언 목록이 유저명언 페이지에 추가되어 조회할 수 있어야 한다.
- [ ] 나만의 명언 꾸미기 기능 추가 | 유저는 자신이 추가한 명언 카드를 수정하여 커스텀 명언 카드를 생성할 수 있어야 한다.
- [ ] 명언 공유 기능 추가 | 유저는 자신이 생성하고 꾸민 명언 카드를 이미지로 저장하고, SNS 에 공유할 수 있어야 한다.
- [ ] 인생/사랑/성공/사람/슬픔 등 세부 카테고리별 명언 검색 기능 추가(-> 23.12.17  | 기존 감성 명언 카테고리와 전체 병합)
- [ ] 명언 추천 기능 | 유저가 검색한 키워드, 생성한 명언의 키워드를 바탕으로 관련 명언을 추가적으로 조회할 수 있어야 한다.
- [ ] 이미지 생성 AI 추가 | 유저가 명언을 입력하면, 해당 명언에 대한 이미지를 생성할 수 있어야 한다.
- [ ] 회원가입 기능 추가 
- [ ] 로그인 기능 추가1(NextAuth)
- [ ] 로그인 기능 추가2(JWT)
- [ ] ...

### 관리자
- [ ] 명언 목록 조회/삭제/수정/추가 기능 | 유저가 생성한 명언을 삭제할 수 있어야 하고, 기존에 등록되어 있는 명언 목록을 조회하고 삭제, 수정할 수 있어야 한다.

### 성능
- [ ] ...

### 데이터베이스
- [ ] SQLite3 마이그레이션 -> ???



### 배포
- [ ] ...

