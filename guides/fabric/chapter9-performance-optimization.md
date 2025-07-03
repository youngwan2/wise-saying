# 챕터 9: 성능 최적화

## 개요
이 챕터에서는 Fabric.js 애플리케이션의 성능을 최적화하는 방법을 탐구합니다. 성능 최적화는 대규모 캔버스 또는 복잡한 객체를 처리할 때 중요합니다.

## 렌더링 최적화
Fabric.js는 캔버스 렌더링을 효율적으로 관리할 수 있는 기능을 제공합니다.

### 예제: 렌더링 일시 중지
```tsx
const optimizeRendering = (canvas) => {
  canvas.renderOnAddRemove = false;

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 60,
    fill: 'blue',
  });
  canvas.add(rect);

  canvas.renderAll();
};
```

## 객체 관리
객체 수가 많을 경우, 객체를 그룹화하거나 비활성화하여 성능을 개선할 수 있습니다.

### 예제: 객체 그룹화
```tsx
const groupObjectsForPerformance = (canvas) => {
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
  const group = new fabric.Group([rect, circle]);
  canvas.add(group);
};
```

## 이벤트 최적화
이벤트 리스너를 최소화하거나 제거하여 성능을 개선할 수 있습니다.

### 예제: 이벤트 제거
```tsx
const removeEventListeners = (canvas) => {
  canvas.off('object:selected');
};
```

## 요약
이 챕터에서는 Fabric.js 애플리케이션의 성능을 최적화하는 방법을 배웠습니다. 이상 모든 가이드를 마칩니다. 고생하셨습니다.
