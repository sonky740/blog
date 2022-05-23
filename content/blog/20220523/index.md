---
title: CustomEvent, dispatchEvent
date: '2022-05-23'
# description: ''
tags: [CustomEvent, dispatchEvent]
---

Javascript의 addEventListener가 기본으로 제공하는 100가지 정도의 이벤트리스너를 말고 이벤트를 직접 만들 수 있는 CustomEvent를 알아보자.  
이전 글들에서 짤막하게 소개했었는데 나는 주로 UI Component를 만들 때 특정 시점에서 콜백 용도로 쓰고 있다.

기본 생성 구문은 이렇다.

```js
// CustomEvent 생성
const 커스텀_변수명 = new CustomEvent('커스텀 이벤트 명', {
    // options
    detail: {
        변수명: 원하는 값
    }, // 기본값 null
    bubbles: boolean, // 기본값: false
    cancelable: boolean // 기본값: false
});
```

이렇게 생성된 CustomEvent를 실행시킬 위치를 정하여 아래의 dispatchEvent를 넣어놔야한다.

```js
타겟.dispatchEvent(커스텀_변수명);
```

그러면 이제 이벤트 리스너로 불러올 수 있다.

```js
타겟.addEventListener('커스텀 이벤트 명', () => {
  console.log(e.detail.변수명); // return: 원하는 값
});
```

이전 글 끝에서 썼듯이 난 실무에서 이런식으로 쓴다. (실제로는 <a href="https://getbootstrap.com/docs/5.0/getting-started/javascript/#events"  target="_blank" rel="noreferrer" title="bootstrap5 새창 열기">EventHandler</a>라는 bootstrap5 유틸리티를 가져와 썼다. 이거에 대해선 다음에 설명하겠다.)

```js
/* 전략 */
const complete = () => {
  /* ... */
  const shown = new CustomEvent('modal.shown', {
    detail: {
      target: this._element, // this._element: [data-modal]
      trigger: this._trigger, // this._trigger: [data-modal-trigger]
    },
  });

  this._element.dispatchEvent(shown);
};
this._element.addEventListener('animationend', () => complete());
/* 후략 */
```

```js
// 화면내의 script
const modal = document.querySelector('[data-modal]');
modal.addEventListener('modal.shown', function (e) {
  console.log(e.detail.target, e.detail.trigger);
});
```

위 코드를 설명하자면 modal이 있는 페이지에서 modal.shown 이벤트 리스너를 호출하면 modal을 여는 버튼을 클릭 했을 때 modal의 animationend가 끝나면 저 커스텀 이벤트가 실행된다.

이렇게 내가 원하는 시점에 콜백을 주기에 용이하게끔 CustomEvent를 사용할 수 있다.

참고로 IE에선 아래의 polyfill없이는 지원하지 않는다.

```js
(function () {
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
```

난 실무에서 webpack같은 번들링을 쓰지 못하는 환경이라면 그냥 CustomEvent를 쓰고,  
번들링을 쓸 수 있는 환경이라면 다음에 설명할 <a href="https://getbootstrap.com/docs/5.0/getting-started/javascript/#events"  target="_blank" rel="noreferrer" title="bootstrap5 새창 열기">EventHandler</a>를 쓴다.