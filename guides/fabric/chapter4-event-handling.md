# 챕터 4: 이벤트 처리 및 상호작용

## 개요
이 챕터에서는 Fabric.js 캔버스에서 객체 이벤트를 처리하고 상호작용을 추가하는 방법을 배웁니다.

## 객체 이벤트 처리
Fabric.js는 객체에 대해 `selected`, `modified`, `removed`와 같은 다양한 이벤트를 제공합니다.

### 예제: 객체 선택 이벤트
```tsx
const handleObjectSelected = (canvas) => {
  canvas.on('object:selected', (e) => {
    const selectedObject = e.target;
    console.log('선택된 객체:', selectedObject);
  });
};
```

## 사용자 정의 컨트롤 추가
특정 작업을 위한 사용자 정의 컨트롤을 객체에 추가할 수 있습니다.

### 예제: 삭제 컨트롤 추가
```tsx
const addDeleteControl = (canvas) => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 60,
    fill: 'blue',
  });

  rect.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: () => canvas.remove(rect),
  });

  canvas.add(rect);
};
```

## 요약
이 챕터에서는 Fabric.js 캔버스에서 객체 이벤트를 처리하고 상호작용을 추가하는 방법을 배웠습니다. 다음 챕터에서는 애니메이션 및 필터와 같은 고급 기능을 탐구할 것입니다.
