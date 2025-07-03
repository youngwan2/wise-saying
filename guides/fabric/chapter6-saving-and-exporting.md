# 챕터 6: 캔버스 저장 및 내보내기

## 개요
이 챕터에서는 Fabric.js 캔버스를 저장하고 내보내는 방법을 배웁니다. 캔버스를 이미지로 내보내거나 JSON 형식으로 저장할 수 있습니다.

## 캔버스 이미지로 내보내기
Fabric.js는 캔버스를 PNG 또는 JPEG 이미지로 내보낼 수 있는 기능을 제공합니다.

### 예제: PNG로 내보내기
```tsx
const exportToPNG = (canvas) => {
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1,
  });

  const link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = dataURL;
  link.click();
};
```

## 캔버스 JSON으로 저장하기
Fabric.js는 캔버스 상태를 JSON 형식으로 저장할 수 있습니다.

### 예제: JSON으로 저장
```tsx
const saveToJSON = (canvas) => {
  const json = canvas.toJSON();
  console.log('Canvas JSON:', json);
};
```

## 요약
이 챕터에서는 Fabric.js 캔버스를 저장하고 내보내는 방법을 배웠습니다. 다음 챕터에서는 Fabric.js의 확장성과 커스터마이징 옵션을 탐구할 것입니다.
