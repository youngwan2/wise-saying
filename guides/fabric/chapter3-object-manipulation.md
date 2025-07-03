# 챕터 3: 캔버스에서 객체 조작하기

## 개요
이 챕터에서는 Fabric.js 캔버스에서 객체를 조작하는 방법을 배웁니다. 여기에는 크기 조정, 회전, 속성 변경이 포함됩니다.

## 객체 크기 조정 및 회전
Fabric.js는 객체의 크기 조정 및 회전을 위한 기본 컨트롤을 제공합니다.

### 예제: 컨트롤 활성화
```tsx
const enableControls = (canvas) => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 60,
    fill: 'green',
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
};
```

## 객체 속성 변경
색상, 위치, 크기와 같은 속성을 동적으로 변경할 수 있습니다.

### 예제: 색상 변경
```tsx
const changeColor = (object, color) => {
  object.set('fill', color);
  object.canvas.renderAll();
};
```

## 객체 그룹화
Fabric.js는 여러 객체를 그룹화할 수 있는 기능을 제공합니다.

### 예제: 객체 그룹화
```tsx
const groupObjects = (canvas) => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 60,
    fill: 'blue',
  });
  const circle = new fabric.Circle({
    left: 150,
    top: 150,
    radius: 30,
    fill: 'red',
  });
  const group = new fabric.Group([rect, circle], {
    left: 200,
    top: 200,
  });
  canvas.add(group);
};
```

## 요약
이 챕터에서는 Fabric.js 캔버스에서 객체를 조작하는 방법을 배웠습니다. 여기에는 크기 조정, 회전, 속성 변경 및 객체 그룹화가 포함됩니다. 다음 챕터에서는 이벤트 처리 및 상호작용을 탐구할 것입니다.
