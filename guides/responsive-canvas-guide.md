# 반응형 캔버스(Responsive Canvas) 구현 가이드

이 가이드는 명언 카드 에디터에서 다양한 크기의 캔버스(예: 500x500, 1920x1080 등)가 레이아웃을 깨지지 않고 항상 화면에 잘 보이도록 하는 반응형 캔버스 구현 방법을 설명합니다.

---

## 1. 문제 상황
- 사용자가 추천 사이즈(예: 500x500, 1920x1080 등)를 선택하면 캔버스가 너무 커져서 레이아웃을 벗어나거나, 일부가 가려지는 문제가 발생함.
- 실제로는 캔버스의 width/height 속성은 그대로 두고, 화면에 표시되는 크기만 축소해서 보여주면 됨.

---

## 2. 목표
- 어떤 크기의 캔버스도 레이아웃을 벗어나지 않고, 전체가 항상 화면에 보이도록 한다.
- 실제 캔버스의 해상도(다운로드, 렌더링)는 그대로 유지한다.
- 축소 표시 시, 현재 표시 비율(%)도 함께 안내한다.

---

## 3. 구현 방법

### 3-1. 표시 크기 계산 함수 추가
```tsx
const getDisplaySize = () => {
  const maxDisplayWidth = 800;
  const maxDisplayHeight = 600;

  if (width <= maxDisplayWidth && height <= maxDisplayHeight) {
    return { displayWidth: width, displayHeight: height, scale: 1 };
  }

  const scaleX = maxDisplayWidth / width;
  const scaleY = maxDisplayHeight / height;
  const scale = Math.min(scaleX, scaleY);

  return {
    displayWidth: width * scale,
    displayHeight: height * scale,
    scale
  };
};
```
- width, height는 실제 캔버스 크기(상태값)
- 최대 표시 크기(800x600)보다 크면 비율을 계산해 축소

### 3-2. 표시용 크기와 스케일 적용
```tsx
const { displayWidth, displayHeight, scale } = getDisplaySize();
```

### 3-3. 캔버스 렌더링 영역에 적용
```tsx
<article ...>
  <div ...>
    <span>
      {width} × {height} {scale < 1 && `(${Math.round(scale * 100)}% 표시)`}
    </span>
    <div
      style={{
        width: `${displayWidth}px`,
        height: `${displayHeight}px`,
        maxWidth: '100%',
        maxHeight: '70vh',
      }}
      ...
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
        }}
        ...
      />
      ...
    </div>
  </div>
</article>
```
- 실제 캔버스는 width/height 그대로, style로만 축소 표시
- maxWidth, maxHeight로 부모 컨테이너를 벗어나지 않게 함
- scale < 1일 때 몇 %로 축소 표시 중인지 안내

### 3-4. 다운로드 등 기능 영향 없음
- 다운로드 시에는 실제 캔버스 크기로 저장됨 (표시만 축소)

---

## 4. 추가 팁
- 모바일에서는 maxDisplayWidth, maxDisplayHeight 값을 더 작게 조정해도 됨
- 필요시 스크롤 영역으로 감싸서 더 큰 캔버스도 볼 수 있게 할 수 있음

---

## 5. 결과
- 어떤 크기의 캔버스도 항상 전체가 화면에 보이고, 레이아웃이 깨지지 않음
- 사용자는 실제 해상도와 축소 비율을 직관적으로 확인 가능

---

## 6. 예시 스크린샷
(직접 캡처하여 첨부)

---

## 7. 적용 파일
- `src/components/UI/styler/container/CanvasContainer.tsx`

---

## 8. 요약
- 실제 캔버스 크기는 그대로, style로만 축소 표시
- 최대 표시 크기와 비율 계산으로 레이아웃 깨짐 방지
- 다운로드 등 기능에는 영향 없음
