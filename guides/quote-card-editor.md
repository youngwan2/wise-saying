# 명언 카드 편집기 기능 구현

## 주요 변경 사항

### 1. Fabric.js 통합
- `fabric` 및 `@types/fabric` 패키지 설치.
- Fabric.js를 사용하여 캔버스 기반 편집 기능 구현.

### 2. 명언 카드 편집기 구현
- **컴포넌트 개발**:
  - `EditorCanvas`: 캔버스 초기화 및 상태 관리.
  - `QuotePanel`: 샘플 명언 선택 및 사용자 정의 명언 입력.
  - `BackgroundPanel`: 배경 색상, 그라디언트 및 패턴 설정.
  - `TemplatePanel`: 미리 정의된 템플릿 추가.
  - `LayerPanel`: 레이어 관리 기능 (가시성 토글, 순서 변경, 삭제).
- **기능 추가**:
  - 텍스트, 도형, 이미지 추가.
  - 배경 사용자 정의.
  - 레이어 관리.
  - 미리 정의된 템플릿.

### 3. 반응형 디자인
- 화면 너비 1024px 이하에서 반응형 레이아웃 구현.
- 모바일 화면에서 하단 모달 및 플로팅 액션 버튼 추가.

### 4. 코드 최적화
- 인증, 알림, 좋아요 기능 관련 서비스 함수 개선.
- API 경로 설정 통합.

### 5. 개발 서버
- 개발 서버를 성공적으로 시작: `http://localhost:3000/canvas-editor`.

### 6. 가이드 생성
- 모든 변경 사항 요약 및 `guides/quote-card-editor.md` 파일에 저장.

## 새로 생성된 파일
- `src/app/(canvas-editor)/canvas-editor/page.tsx`
- `src/app/(canvas-editor)/_components/EditorCanvas.tsx`
- `src/app/(canvas-editor)/_components/QuotePanel.tsx`
- `src/app/(canvas-editor)/_components/BackgroundPanel.tsx`
- `src/app/(canvas-editor)/_components/LayerPanel.tsx`
- `src/app/(canvas-editor)/_components/TemplatePanel.tsx`
- `src/custom/useWindowSize.ts`

## 수정된 파일
- `package.json` 및 `package-lock.json`: Fabric.js 관련 종속성 추가.
- `src/app/globals.css`: 모달 애니메이션 및 텍스트 생략 스타일 추가.
- 서비스 파일 (`auth.service.ts`, `like-count.service.ts`, `quotes.service.ts`): 기능 개선.

## 주요 기능

### EditorCanvas 컴포넌트
- **상태 관리**:
  - `textColor`, `backgroundColor`, `activeTab` 등.
- **캔버스 초기화**:
  - 반응형 크기 계산.
  - 객체 선택 이벤트 처리.
- **객체 추가**:
  - 텍스트, 도형, 이미지 추가.
- **객체 속성 변경**:
  - 선택된 객체의 폰트, 색상, 정렬 등 변경.
- **캔버스 저장/내보내기**:
  - PNG 형식으로 다운로드.

### QuotePanel 컴포넌트
- 샘플 명언 선택 또는 사용자 정의 명언 입력.

### BackgroundPanel 컴포넌트
- 배경 색상, 그라디언트 및 패턴 설정.

### TemplatePanel 컴포넌트
- 미리 정의된 템플릿 추가.

### LayerPanel 컴포넌트
- 레이어 가시성 토글, 순서 변경, 삭제 기능.

### 반응형 디자인
- 모바일 화면에서 하단 모달 및 플로팅 액션 버튼 추가.

## 테스트 및 향후 개선 사항
- 다양한 기기 및 브라우저에서 모든 기능 테스트 필요.
- 추가 템플릿 및 고급 레이어 관리 기능 구현 가능성.
