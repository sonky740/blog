---
title: EventHandler (feat. bootstrap 5)
date: '2022-05-23 16:00:00'
# description: ''
keywords: [bootstrap5, EventHandler, addEventListener, CustomEvent]
---

<a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank" rel="noreferrer" title="bootstrap5 새창 열기">bootstrap 5</a>를 써본 사람은 알겠지만 내가 만든 <a href="https://sonky740.github.io/Guide_es6/dist/html/" target="_blank" rel="noreferrer" title="SKY_Guide 새창 열기">UI Component</a>가 비슷하다는 것을 알 것이다.  
왜냐하면... 내가 그걸 참고 해서 만들었으니까!

부트스트랩 라이브러리를 사용했다는 건 아니고 거기에 쓰인 Components들을 보고 참고하여 만들었다.  
부트스트랩의 UI Component들은 접근성도 신경 쓰고 인터랙션도 신경 쓴 아주 예쁜 친구들이다. 그래서 소스를 다운받아서 참고하여 만들었는데 그중에 유용한 유틸리티를 하나 소개하고자 글을 쓴다.

바로 <a href="https://github.com/twbs/bootstrap/blob/main/js/src/dom/event-handler.js" target="_blank" rel="noreferrer" title="EventHandler 소스 새창 열기">**EventHandler**</a>다.

구글링해도 정보를 얻을 수 없는 부트스트랩만의 작은 유틸리티이다.  
정확히 무슨 기능을 하냐면 addEventListener, removeEventListener, CustomEvent를 대체하는 유틸리티이다.

간단하게 많이 쓰이는 addEventListener와 비교하여 나타내자면

```js
// addEventListener
Element.addEventListener(type, listener, options);

// EventHandler
EventHandler.on(Element, type, listener);
EventHandler.one(Element, type, listener); // once: true
```

EventHandler는 이벤트 타겟도 함수 안에서 선언해준다. 이걸 보자면 jQuery과 비슷한 구조를 되어 있다.  
실제로 아래 EventHandler의 4가지 기능 모두 사용법이 jQuery와 유사하다.  
또한 내부적으로 jQuery도 지원해줘서 같이 사용할 수 있다.

```js
// event-handler.js에서 발췌
const EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },

  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },

  off(element, originalTypeEvent, handler, delegationFunction) {
    // ...
  },

  trigger(element, event, args) {
    // ...
  },
};
```

하나하나 설명해보자면

1. on은 기본 addEventListener다.

2. one은 addEventListener의 options 중에 once: true가 걸린 기능이다. 거의 이거 때문에 EventHandler를 썼다. 내 UI Component에도 one을 쓴 게 있는데 스크립트를 한 번씩만 실행해야 하는 경우가 있다. 물론 EventHandler를 안 쓰고 아래처럼 해결할 수도 있다.

   ```js
   /* 첫번째 방법... */
   Element.addEventListener(
     'transitionend',
     () => {
       /* ... */
       Element.removeEventListener('transitionend', transitionend);
     },
     { once: true }
   );

   /* 두번째 방법 */
   Element.addEventListener('transitionend', function transitionend() {
     /* ... */
     Element.removeEventListener('transitionend', transitionend);
   });
   ```

   첫 번째 방법은 options의 once: true를 사용한 것인데, 나도 이걸 쓰고 싶었으나... 아직 IE를 지원해야 하는 사이트가 많아서 불가능했다. 이거는 polyfill도 없더라...

   두 번째 방법은 addEventListener안에서 removeEventListener를 선언하는 것인데... 이게 무슨 문제가 있었는데... 기억이 안 난다. 그리고 무엇보다 마음에 안 든다.

3. off는 removeEventListener와 같다.

4. trigger는 이전 글 주제였던 CustomEvent이다.

   ```js
   /* CustomEvent */
   const 변수명 = new CustomEvent('커스텀 이벤트 명', {
     detail: {
       임의값: 임의값1,
     },
   });
   타겟.dispatchEvent(변수명);

   /* EventHandler */
   EventHandler.trigger(타겟, '커스텀 이벤트 명', {
     임의값: 임의값1,
   });
   ```

   차이점은 보다시피 이벤트 세부 정보를 지정할 때 detail을 쓸 필요 없고,  
   dispatchEvent로 따로 안 붙여도 된다. EventHandler.trigger()를 선언한 곳에서 바로 dispatch된다. 그래서 CustomEvent 변수를 따로 지정할 필요도 없다.

결과적으로 러닝 커브도 굉장히 낮은 편이고, 나름 생산성을 높여주는 유틸리티라고 볼 수 있다. 그냥 jQuery를 쓰면 되지 않느냐고 할 수 있지만 addEventListener 때문에 jQuery를 쓰는 건 너무 낭비이다. 그리고 나는 jQuery를 선호하지 않는다.

글을 쓰는 지금 2022년 5월 23일 기준으로는 굳이... EventHandler를 쓸 이유가 적어지고 있다. 왜냐하면, EventHandler를 썼던 가장 큰 이유가 IE에서 못 쓰는 걸 지원하기 위해서였는데 IE가 2022년 6월 15일부터 지원 종료된다는 소식에 프로젝트들도 차츰차츰 IE를 소홀히 하기 시작하였기 때문이다. _(새로 구축 시에 아예 배제하는 건 아니더라... 제발 좀 완전히 버렸으면 좋겠는데!)_  
물론 IE 호환이 아니어도 꽤 매력적인 유틸리티라고 생각한다. 용량도 굉장히 작고(300줄, min: 4kb) 생산성도 좋아진다. 프론트엔드 프레임워크 위에서는 안 쓰겠지만, 그 외 번들링 위에서 작업하는 MPA라면 당분간은 계속 쓸 것 같다.
