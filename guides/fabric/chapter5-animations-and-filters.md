# 챕터 5: 애니메이션 및 필터

## 개요
이 챕터에서는 Fabric.js에서 애니메이션과 필터를 사용하는 방법을 배웁니다. 애니메이션을 통해 객체를 움직이거나 변형할 수 있으며, 필터를 사용하여 이미지에 다양한 효과를 적용할 수 있습니다.

## 애니메이션
Fabric.js는 객체의 속성을 변경하여 애니메이션을 구현할 수 있습니다.

### 예제: 객체 이동 애니메이션
```tsx
const animateObject = (object) => {
  object.animate('left', '+=100', {
    onChange: object.canvas.renderAll.bind(object.canvas),
    duration: 1000,
    easing: fabric.util.ease.easeInOutQuad,
  });
};
```

## 필터
Fabric.js는 이미지에 필터를 적용할 수 있는 기능을 제공합니다.

### 예제: 이미지에 필터 적용
```tsx
const applyFilter = (image) => {
  const filter = new fabric.Image.filters.Grayscale();
  image.filters.push(filter);
  image.applyFilters();
  image.canvas.renderAll();
};
```

## 요약
이 챕터에서는 Fabric.js에서 애니메이션과 필터를 사용하는 방법을 배웠습니다. 다음 챕터에서는 캔버스 저장 및 내보내기 기능을 탐구할 것입니다.
