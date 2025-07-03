# 챕터 2: 캔버스에 객체 추가하기

## 개요
이 챕터에서는 Fabric.js 캔버스에 텍스트, 도형, 이미지를 추가하는 방법을 배웁니다.

## 텍스트 추가하기
Fabric.js는 캔버스에 텍스트를 추가하기 위해 `fabric.Text` 및 `fabric.IText` 클래스를 제공합니다.

### 예제: 텍스트 추가
```tsx
const addText = (canvas) => {
  const text = new fabric.IText('안녕하세요, Fabric.js!', {
    left: 100,
    top: 100,
    fontSize: 24,
    fill: '#000',
    fontFamily: 'Arial',
  });
  canvas.add(text);
};
```

## 도형 추가하기
Fabric.js는 사각형, 원형, 다각형과 같은 다양한 도형을 지원합니다.

### 예제: 사각형 추가
```tsx
const addRectangle = (canvas) => {
  const rect = new fabric.Rect({
    left: 150,
    top: 150,
    width: 100,
    height: 60,
    fill: 'blue',
  });
  canvas.add(rect);
};
```

### 예제: 원형 추가
```tsx
const addCircle = (canvas) => {
  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: 'red',
  });
  canvas.add(circle);
};
```

## 이미지 추가하기
Fabric.js는 `fabric.Image` 클래스를 사용하여 캔버스에 이미지를 추가할 수 있습니다.

### 예제: 이미지 추가
```tsx
const addImage = (canvas, imageUrl) => {
  fabric.Image.fromURL(imageUrl, (img) => {
    img.set({
      left: 250,
      top: 250,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    canvas.add(img);
  });
};
```

## 요약
이 챕터에서는 Fabric.js 캔버스에 텍스트, 도형, 이미지를 추가하는 방법을 배웠습니다. 다음 챕터에서는 이러한 객체를 조작하고 상호작용하는 방법을 탐구할 것입니다.
