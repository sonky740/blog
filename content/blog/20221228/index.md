---
title: Vue watch의 세번째 인자 "flush"
date: '2022-12-28'
# description: ''
keywords: [vue3 watch, watch flush]
---

최근 vue3에서 watch를 사용하면서 겪은 시행착오를 적어본다.

결론부터 말하자면  
watch의 세 번째 인자인 flush로 callback의 발생 타이밍을 조절할 수 있다.

아래는 내가 겪은 상황이다.

---

1. api로 데이터를 받아와서 pinia(빈 배열)에 넣었음.
2. watch로 pinia의 데이터를 감지하고 DOM을 업데이트하려고 했음.  
   _(A라는 돔 안에 v-for를 돌려서 B를 채워넣고, 첫 번째 B를 자동 선택하는 기능을 watch 함수의 callback으로 넣었음.)_
3. B가 채워지긴 했는데 자동 선택하는 기능이 실행되지 않았음.
   1. 타이밍 문제인 거 같아서 setTimeout 안에 넣어보니 실행됨.
   2. 근데 아무리 봐도 setTimeout으로 해결하는 건 별로 좋지 않은 선택이라고 생각함.
   3. <a href="https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing" target="_blank" rel="noreferrer" title="Vue Watch Guide 새창 열기">Vue Watch Guide</a>를 보니 callback의 발생 타이밍을 조절 가능한 옵션이 있었음.
4. flush: 'post' 옵션을 주어 해결함. _=> callback이 DOM 업데이트 이후에 실행됨._
   ```js
   watch(source, callback, {
     ...,
     flush: 'post',
   });
   ```

---

기존 watch의 세 번째 인자에서 많이 쓰는  
immediate(_watch 즉시 콜백_), deep(_깊은 변경감시 === 배열, 객체 내부 변경 감시_) 말고 flush라는 옵션은 처음 봤다.
flush는 'pre', 'post', 'sync'가 있는데, 각각의 옵션에 대한 설명은 아래와 같다.

- 'pre' = 기본값이다. callback이 DOM 업데이트 이전에 실행됨.
- 'post' = callback이 DOM 업데이트 이후에 실행됨.
- 'sync' = callback이 DOM 업데이트와 동시에 실행됨.

이 옵션을 몰라서 시간을 낭비했다. 다시금 내가 쓰려는 도구의 문서를 잘 살펴봐야겠다는 다짐을 한다.
