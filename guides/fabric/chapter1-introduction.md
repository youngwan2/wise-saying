# 챕터 1: React에서 Fabric.js 소개

## Fabric.js란 무엇인가요?
Fabric.js는 HTML5 캔버스를 다루기 위한 강력하고 유연한 JavaScript 라이브러리입니다. 이 라이브러리는 캔버스 요소에 대한 객체 모델을 제공하여 도형, 이미지, 텍스트를 쉽게 생성, 조작 및 상호작용할 수 있도록 합니다.

## React에서 Fabric.js를 사용하는 이유
React는 사용자 인터페이스를 구축하기 위한 인기 있는 라이브러리로, Fabric.js와 결합하면 동적이고 상호작용이 가능한 캔버스 기반 애플리케이션을 만들 수 있습니다. Fabric.js는 캔버스 작업을 간소화하고, React는 상태와 컴포넌트를 구조적으로 관리할 수 있는 방법을 제공합니다.

## React 프로젝트에서 Fabric.js 설정하기

### 1단계: Fabric.js 설치
React 프로젝트에서 Fabric.js를 사용하려면 npm을 사용하여 라이브러리를 설치합니다:
```bash
npm install fabric
```

### 2단계: 캔버스 컴포넌트 생성
Fabric.js 캔버스를 초기화하고 관리하기 위한 React 컴포넌트를 생성합니다.

```tsx
import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setWidth(800); // 기본 넓이 설정
    canvas.setHeight(600); // 기본 높이 설정
    canvas.setBackgroundColor('#f3f3f3', canvas.renderAll.bind(canvas)); // 기본 배경색 설정
  }, []);

  return <canvas ref={canvasRef} />;
}
```

### 3단계: 캔버스 컴포넌트 렌더링
React 애플리케이션에서 Canvas 컴포넌트를 사용합니다:

```tsx
import React from 'react';
import Canvas from './Canvas';

function App() {
  return (
    <div>
      <h1>React에서 Fabric.js</h1>
      <Canvas />
    </div>
  );
}

export default App;
```

## 요약
이 챕터에서는 React 프로젝트에 Fabric.js를 통합하는 기본 사항을 배웠습니다. 라이브러리를 설치하고, 캔버스 컴포넌트를 생성하고, 애플리케이션에서 렌더링하는 방법을 배웠습니다. 다음 챕터에서는 텍스트, 도형, 이미지와 같은 객체를 캔버스에 추가하는 방법을 탐구할 것입니다.
