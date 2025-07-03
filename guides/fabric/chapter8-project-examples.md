# 챕터 8: 프로젝트 사례

## 개요
이 챕터에서는 Fabric.js를 활용한 실제 프로젝트 사례를 살펴봅니다. Fabric.js는 다양한 캔버스 기반 애플리케이션을 구축하는 데 사용될 수 있습니다.

## 사례 1: 명언 카드 생성기
Fabric.js를 사용하여 사용자 정의 명언 카드를 생성할 수 있습니다.

### 주요 기능
- 텍스트 추가 및 스타일 변경
- 배경 색상 및 이미지 설정
- 카드 저장 및 내보내기

### 코드 예제
```tsx
const createQuoteCard = (canvas) => {
  const text = new fabric.IText('명언을 입력하세요', {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fontSize: 24,
    fill: '#000',
    fontFamily: 'NanumGothic',
    originX: 'center',
    originY: 'center',
  });
  canvas.add(text);
};
```

## 사례 2: 이미지 편집기
Fabric.js를 사용하여 이미지 편집 애플리케이션을 구축할 수 있습니다.

### 주요 기능
- 이미지 추가 및 필터 적용
- 객체 크기 조정 및 회전
- 사용자 정의 컨트롤 추가

### 코드 예제
```tsx
const addImageEditorFeatures = (canvas) => {
  fabric.Image.fromURL('path/to/image.jpg', (img) => {
    img.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    canvas.add(img);
  });
};
```

## 사례 3: 인터랙티브 다이어그램 생성기
Fabric.js를 사용하여 인터랙티브 다이어그램을 생성할 수 있습니다.

### 주요 기능
- 도형 추가 및 연결
- 객체 그룹화 및 이동
- 이벤트 처리 및 상호작용

### 코드 예제
```tsx
const createInteractiveDiagram = (canvas) => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 60,
    fill: 'blue',
  });
  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: 'red',
  });
  canvas.add(rect);
  canvas.add(circle);
};
```

## 요약
이 챕터에서는 Fabric.js를 활용한 다양한 프로젝트 사례를 살펴보았습니다. 다음 챕터에서는 Fabric.js의 성능 최적화 방법을 탐구할 것입니다.
