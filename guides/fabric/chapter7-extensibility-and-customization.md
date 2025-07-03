# 챕터 7: 확장성과 커스터마이징

## 개요
이 챕터에서는 Fabric.js의 확장성과 커스터마이징 옵션을 탐구합니다. Fabric.js는 플러그인 및 사용자 정의 객체를 추가하여 기능을 확장할 수 있습니다.

## 사용자 정의 객체 생성
Fabric.js는 사용자 정의 객체를 생성할 수 있는 기능을 제공합니다.

### 예제: 사용자 정의 객체
```tsx
fabric.CustomRect = fabric.util.createClass(fabric.Rect, {
  type: 'customRect',

  initialize: function (options) {
    options = options || {};
    this.callSuper('initialize', options);
    this.set('label', options.label || '');
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      label: this.get('label'),
    });
  },

  _render: function (ctx) {
    this.callSuper('_render', ctx);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(this.label, -this.width / 2, -this.height / 2);
  },
});

const customRect = new fabric.CustomRect({
  left: 100,
  top: 100,
  width: 100,
  height: 60,
  fill: 'yellow',
  label: 'Custom',
});
canvas.add(customRect);
```

## 플러그인 추가
Fabric.js는 플러그인을 추가하여 기능을 확장할 수 있습니다.

### 예제: 플러그인 추가
```tsx
fabric.util.addListener(window, 'resize', () => {
  console.log('Window resized');
});
```

## 요약
이 챕터에서는 Fabric.js의 확장성과 커스터마이징 옵션을 탐구했습니다. 다음 챕터에서는 Fabric.js를 활용한 프로젝트 사례를 살펴볼 것입니다.
