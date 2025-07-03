# 모바일 드래그 업(Drag-up) 바텀시트 스타일러 패널 구현 가이드

이 가이드는 React(Next.js) + Tailwind CSS 환경에서 모바일에서 드래그로 높이 조절이 가능한 바텀시트(편집툴) 패널을 구현하는 방법을 단계별로 설명합니다. 실제 구현 예시는 `StylerContainer.tsx` 파일을 참고하세요.

---

## 1. 기본 구조 설계

- **패널은 모바일에선 fixed bottom, 데스크탑에선 sidebar**
- **패널 높이는 state로 관리 (vh 단위)**
- **드래그 핸들(Handle) 추가**

```tsx
const [panelHeight, setPanelHeight] = useState(70); // vh 단위
const [isDragging, setIsDragging] = useState(false);
const [dragStartY, setDragStartY] = useState(0);
const [dragStartHeight, setDragStartHeight] = useState(70);
```

---

## 2. 드래그 핸들 UI 추가

- 패널 상단에 드래그용 핸들(작은 바)을 추가합니다.
- 모바일에서만 보이도록 `lg:hidden` 사용.

```tsx
<div
  className="lg:hidden flex justify-center mb-2 cursor-grab active:cursor-grabbing py-2 -mx-4 px-4"
  onMouseDown={handleDragStart}
  onTouchStart={handleDragStart}
>
  <div className={`w-10 h-1 rounded-full transition-colors duration-200 ${isDragging ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
</div>
```

---

## 3. 드래그 이벤트 핸들러 구현

- **드래그 시작**: 마우스/터치 위치와 패널 높이 저장, 드래그 상태 true
- **드래그 중**: 이동 거리만큼 패널 높이 조절 (vh 변환)
- **드래그 종료**: 드래그 상태 false, 스냅(snap) 효과 적용

```tsx
// 드래그 시작
const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
  setIsDragging(true);
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  setDragStartY(clientY);
  setDragStartHeight(panelHeight);
  document.body.style.userSelect = 'none'; // 텍스트 선택 방지
};

// 드래그 중
const handleDragMove = (e: TouchEvent | MouseEvent) => {
  if (!isDragging) return;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  const deltaY = dragStartY - clientY;
  const viewportHeight = window.innerHeight;
  const heightChange = (deltaY / viewportHeight) * 100;
  let newHeight = dragStartHeight + heightChange;
  newHeight = Math.max(30, Math.min(90, newHeight)); // 30~90vh 제한
  setPanelHeight(newHeight);
};

// 드래그 종료
const handleDragEnd = () => {
  setIsDragging(false);
  document.body.style.userSelect = 'auto';
  // 스냅 효과
  if (Math.abs(panelHeight - 50) < 10) setPanelHeight(50);
  else if (Math.abs(panelHeight - 70) < 10) setPanelHeight(70);
};
```

---

## 4. 드래그 이벤트 리스너 등록

- 드래그 중일 때만 document에 mousemove/touchmove/up/end 리스너 등록
- touchmove는 passive: false로 등록 (preventDefault 필요)

```tsx
useEffect(() => {
  if (isDragging) {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
    const handleTouchMove = (e: TouchEvent) => { e.preventDefault(); handleDragMove(e); };
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }
}, [isDragging, dragStartY, dragStartHeight, panelHeight]);
```

---

## 5. 패널 스타일 및 위치 지정

- 모바일: `fixed bottom-0 left-0 w-full`, 데스크탑: `relative lg:w-80 xl:w-96`
- 높이: 모바일은 `style={{ height: panelHeight + 'vh' }}`
- 트랜지션: `transition-transform`, 드래그 중엔 `transition-none`

```tsx
<div
  ref={panelRef}
  className={`... fixed lg:relative bottom-0 ... transition-transform duration-300 ... ${isDragging ? 'transition-none' : ''}`}
  style={{ height: window.innerWidth >= 1024 ? 'auto' : `${panelHeight}vh` }}
>
  {/* ... */}
</div>
```

---

## 6. 퀵 버튼(절반/기본/확장) 추가 (선택)

- 모바일에서 패널 높이를 빠르게 변경하는 버튼

```tsx
{isShowStyler && (
  <div className="lg:hidden flex items-center gap-2">
    <button onClick={() => setPanelHeight(50)}>절반</button>
    <button onClick={() => setPanelHeight(70)}>기본</button>
    <button onClick={() => setPanelHeight(90)}>확장</button>
  </div>
)}
```

---

## 7. 오버레이 및 토글

- 패널이 열려있을 때 배경 오버레이 추가, 클릭 시 패널 닫기
- 모바일에서만 보이도록 `lg:hidden` 사용

```tsx
{isShowStyler && (
  <div
    className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
    onClick={() => setIsShowStyler(false)}
  />
)}
```

---

## 8. 접근성 및 UX 개선 팁

- 드래그 중 텍스트 선택 방지 (`user-select: none`)
- 드래그 핸들에 시각적 피드백(색상 변화)
- 패널 높이 min/max/snap, 트랜지션 부드럽게
- z-index, 오버레이, 포커스 등 세심하게 조정

---

## 9. 전체 예시 파일 참고

- 실제 구현 예시는 `src/components/UI/styler/container/StylerContainer.tsx` 파일을 참고하세요.

---

## 10. 확장 아이디어

- 패널 내부에 탭, 색상 선택, 이미지 업로드 등 다양한 편집 도구 추가
- 데스크탑/모바일 반응형 레이아웃
- 바텀시트 애니메이션, 진동 등 추가 UX 개선

---

이 가이드대로 따라하면 모바일 친화적이고 드래그로 높이 조절이 가능한 바텀시트 스타일 편집툴 패널을 구현할 수 있습니다.
