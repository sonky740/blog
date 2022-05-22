---
title: TransitionEvent, AnimationEvent (2)
date: '2022-05-20'
# description: ''
tags: [TransitionEvent, AnimationEvent, CustomEvent]
---

이전 글에 이어 이번 글에선 AnimationEvent에 대해 알아보자.

TransitionEvent와 거의 비슷하나, 개인적으로 AnimationEvent를 선호한다.  
실무에서 썼을 때 transitionEvent의 경우 동작 중에 이벤트 방지 기능을 안 걸어두고 다시 클릭하거나 취소를 시키면 실행하던 transition을 멈추고 사이드 이펙트가 생기지만 _(이로 인해 Accordion같은 UI 컴포넌트를 제작할 땐 이벤트 방지 기능을 안 걸면 불안정했다.)_, AnimationEvent는 한번 실행한 animation은 끝까지 실행하여 transition보다 안정적이었다.

그래서 animation으로 작업할 수 있는 건 AnimationEvent를 활용하였다.

1. <a href="https://developer.mozilla.org/ko/docs/Web/API/AnimationEvent/AnimationEvent" target="_blank" rel="noreferrer" title="MDN 새창 열기">new AnimationEvent</a>

   ```js
   new AnimationEvent('type', {
     animationName: 'aPropertyName',
     elapsedTime: aFloat,
     pseudoElement: 'aPseudoElementName',
   });
   ```

   TransitionEvent와는 다르게 실험적이라는 문구가 없다. 하지만 이 역시 실무에서 써본 적이 없다.

2. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationiteration_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">animationiteration</a>  
   TransitionEvent에는 없는 이벤트 리스너이다. animation이 반복될 때마다 실행하는 이벤트 리스너이다. animation-iteration-count이 **2** 이상이어야지만 동작한다. 구글링 해보면 다른 사람들은 많이 쓰는 것 같긴 한데, 나는 아직 실무에서 쓸 일이 없었다.

3. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationcancel_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">animationcancel</a>  
   transitioncancel과는 달리 실험적이라는 문구가 있다. 이번에 찾아보면서 놀랐던 게 <a href="https://caniuse.com/?search=animationcancel" target="_blank" rel="noreferrer" title="caniuse 새창 열기">caniuse</a>에서 쳐봤을 때 지원되는 브라우저의 버전이 꽤 높다는 것이다. 실무에서 충분히 써볼 만한 기능인데, animation을 cancel할 일이 없어서 써본 적은 없다.

4. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationstart_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">animationstart</a>  
   animation이 실행되면 동작하는 이벤트 리스너이다. transitionstart와 마찬가지로 animation-delay는 포함하지 않는다. _(왜 그런지는 모르겠는데 TransitionEvent에는 transition-delay를 포함하는 transitionrun이 있지만, AnimationEvent에도 animation-delay가 있는데 animationrun이라는 이벤트 리스너는 없다.)_  
   실무에서 animationend 다음으로 많이 썼었다.

5. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">**_animationend_**</a>  
   나는 실무에서 transitionend와 마찬가지로 AnimationEvent 이벤트 리스너 중에 가장 많이 썼다. 보통 기획, 디자이너의 요구사항이 _~~가 열리면 ~~를 실행해주세요._ 라는 요청이 많기도 했고, UI Component(Modal, Tab, Tooltip 등등...)의 인터랙션을 처리 할 때 end처리에서 할 게 좀 있어서 그런 것 같다.

마지막으로 TransitionEvent와 마찬가지로 animation을 여러 개 줬을 때 _(transition은 이런 경우가 많지만, animation은 많진 않았다.)_ 주의할 점이 있는데

```scss
// scss
.test {
  width: 200px;
  height: 200px;
  background: red;

  @keyframes test {
    0% {
      width: 200px;
      background: red;
    }

    100% {
      width: 300px;
      background: blue;
    }
  }

  @keyframes test2 {
    0% {
      height: 200px;
    }

    100% {
      height: 300px;
    }
  }

  &.on {
    animation: test 0.3s forwards, test2 0.6s forwards;
  }
}
```

```js
document.querySelector('.test').addEventListener('animationstart', function (e) {
    console.log(e);
  });
document.querySelector('.test').addEventListener('animationend', function (e) {
  console.log(e);
});
```

아래처럼 console이 각각 2개씩 찍히게 된다.

```js
// animationstart
AnimationEvent {isTrusted: true, animationName: 'test', elapsedTime: 0, pseudoElement: '', type: 'animationstart', …}
AnimationEvent {isTrusted: true, animationName: 'test2', elapsedTime: 0, pseudoElement: '', type: 'animationstart', …}
// animationend
AnimationEvent {isTrusted: true, animationName: 'test', elapsedTime: 0.3, pseudoElement: '', type: 'animationend', …}
AnimationEvent {isTrusted: true, animationName: 'test2', elapsedTime: 0.6, pseudoElement: '', type: 'animationend', …}
```

이 역시 transition과 마찬가지로

```js
document.querySelector('.test').addEventListener('animationstart', function (e) {
  if (e.animationName === 'test') {
    console.log(e);
  }
});
document.querySelector('.test').addEventListener('animationend', function (e) {
  if (e.animationName === 'test ') {
    console.log(e);
  }
});
```

위처럼 if 문으로 animationName을 지정하여 처리하면 된다.

animation 이벤트 리스너를 써서 만든 내 개인 가이드를 보면 내가 어떤 식으로 실무에서 쓰고 있는지 아래 링크에서 볼 수 있다.  
링크: <a href="https://sonky740.github.io/Guide_es6/dist/html/modal.html" target="_blank" rel="noreferrer" title="SKY 가이드 새창 열기">SKY.Modal</a>  
여기도 TransitionEvent 글과 마찬가지로 modal.showing처럼 쓰인 게 있는데, CustomEvent와 animation 이벤트 리스너를 조합하여 커스텀 이벤트를 만든 것이다. CustomEvent는 다음에 작성할 예정이다.
