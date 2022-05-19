---
title: TransitionEvent, AnimationEvent (1)
date: '2022-05-19'
# description: ''
tags: [TransitionEvent, AnimationEvent, CustomEvent]
---

스타일을 작업할 때 단조로움을 피하기 위해서 transition과 animation 효과를 많이 쓰게 된다.  
그리고 그걸 활용할 수 있는 javascript 기본 API인 TransitionEvent와 AnimationEvent에 대해 알아보려한다.

실은 이 글을 쓸때는 비교적 자주 쓰이는 이벤트 리스너의 transitionstart, transitionend, animationstart, animationend만 다룰려고 했다.  
근데 이왕 글을 쓰는거 다른 이벤트 리스너들도 짤막하게 다루고 넘어가려한다.

_글을 작성하다보니 길어져서 이번 글에선 transition만 다루려고 한다._

1. <a href="https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/TransitionEvent" target="_blank" rel="noreferrer" title="MDN 새창 열기">new TransitionEvent()</a>

   ```js
   new TransitionEvent('type', {
     propertyName: 'PropertyName',
     elapsedTime: 'Float',
     pseudoElement: 'PseudoElementName',
   });
   ```

   MDN을 보면 알겠지만 실험적이라고 쓰여있다. 내가 작업하면서 써본적도 없거니와 이번에 글 쓰면서 처음봤다.
   새로운 TransitionEvent를 뱉는 함수인거같은데 어떻게 활용할 수 있을지는 조금 더 생각해봐야겠다.

2. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionrun_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">transitionrun</a>  
   transition이 생성됐을 때 발동되는 이벤트 리스너이다. 난 이걸 실무에서 써본적이 없다. 거의 transitionstart로 대체해왔는데 남들은 얼마나 쓰는지 구글링을 해봐도 관련 글이 별로 없다.

3. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitioncancel_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">transitioncancel</a>  
   transitionrun과 transitionend 사이에 transition이 취소가 되는 경우에 발생하는 이벤트 리스너인데 실무에서 꽤나 써보려 노력했지만... 내 생각대로 처리를 해주지 않아서 역시나 실무에서 써본적이 없다.

4. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionstart_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">transitionstart</a>  
   transitinrun과 헷갈릴 수 있는데 transitionrun은 딜레이를 포함한 이벤트 리스너이고 transitionstart는 실질적으로 action이 일어났을 때 일어난다.  
   난 이걸 실무에서 transitionend 다음으로 많이 쓰는 편이다.

5. <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event" target="_blank" rel="noreferrer" title="MDN 새창 열기">**_transitionend_**</a>  
    transition 효과가 끝났을 때 이벤트를 주는 이벤트 리스너이다.  
    transition 이벤트 리스너 중에 가장 많이 쓰이는 것 같다. 구글링을 해봐도 관련 글에서 많은 차이가 난다.  
    그리고 transitionend를 쓰게되면 setTimeout을 써야할 곳에 유용하게 대체할 수 있다.  
    예를 들면 _"아코디언이 열리고 얼럿이 뜨게 해주세요"_ 라는 요청을 들을 때가 있다.  
    그럼 transition효과를 준 아코디언에서 저 요구사항을 처리하려고 setTimeout을 쓰는 사람이 있다.
   ```js
   document.querySelector('아코디언 버튼').addEventListener('click', () => {
     setTimeout(() => {
       alert('이렇게 띄우는것 보단...');
     }, 300);
   });
   ```
   transition-duration을 .3s만큼 줬다고치고, setTimeout을 300만큼 주면 어찌저찌 될 수도 있지만... 생각보다 setTimeout은 정확하지 않다.  
   또한, 만약 transition-duration을 변경하게 되면 setTimeout의 딜레이도 수정해줘야만 한다. 그래서 아래처럼 transitionend를 활용할 수 있다.
   ```js
   document.querySelector('열리는 아코디언 컨텐츠').addEventListener('transitionend', () => {
     alert('이렇게 띄우는게 훨씬 좋을 것이다.');
   });
   ```
   위처럼 작성하게되면 transition-duration을 변경하여도 그에 맞춰 스크립트를 수정할 일이 없게 되고, 부정확한 setTimeout보다 훨씬 정확한 타이밍을 얻을 수 있을 것이다.

transition 이벤트 리스너를 써서 만든 내 개인 가이드를 보면 내가 어떤식으로 실무에서 쓰고있는지 아래 링크에서 볼 수 있다.  
링크: <a href="https://sonky740.github.io/Guide_es6/dist/html/accordion.html" target="_blank" rel="noreferrer" title="MDN 새창 열기">SKY.Accordion</a>  
링크를 들어가보면 Events에서 accr.showing처럼 처음보는 이벤트 리스너를 볼 수 있게 되는데 추후에 설명할 CustomEvent와 transition 이벤트 리스너를 조합하여 커스텀 이벤트 리스너를 만든 것이다.

다음글에선 AnimationEvent에 대해서 알아보자.
