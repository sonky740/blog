---
title: vuex vs pinia
date: '2022-11-08'
# description: ''
keywords: [pinia]
---

작년만까지만 해도 react와는 다르게 vue는 상태관리를 위한 라이브러리가 "vuex" 단 한 가지 밖에 없었다.  
그러나 vuex가 5.x를 앞둔 상태에서 <a href="https://vuex.vuejs.org/" target="_blank" rel="noreferrer" title="vuex 공식 문서 새창 열기">vuex 공식 문서</a>에서 pinia가 vue의 새로운 공식 상태 관리 라이브러리로 변경되었다고 하고, Vue의 개발자, <a href="https://twitter.com/youyuxi/status/1463429442076745730?lang=eu" target="_blank" rel="noreferrer" title="Evan You 트위터 새창 열기">Evan You</a>도 pinia는 사실상 vuex5라고 언급하였다. 그래서 새로운 프로젝트를 pinia로 진행하면서 알게 된 걸 정리하고자 한다.

### pinia 뜻

스페인어로 파인애플이라는 단어의 영어 발음과 가장 비슷하다. 파인애플은 여러 개의 과일을 만들기 위해 여러 꽃의 그룹인데, 스토어도 비슷하게 각각 독립적이지만 모두 연결되어 있다는 걸 의미하기 위해 피니아로 지었다고 한다.

![피니아 로고](pinia_logo.svg)

### vuex와의 차이점

1. vuex의 mutations, actions가 actions 하나로 통합되었다.  
   기존 matations로 state를 변경하고, actions로 비동기 처리를 하던 방식에서 pinia는 $patch로 state를 변경하거나, actions로 state를 변경할 수 있다.

   ```ts
   // pinia store = count.ts
   import { defineStore } from 'pinia';

   export const useCount = defineStore('count', {
     state: () => ({
       count: 0,
     }),
     actions: {
       setCount(number: number) {
         this.$patch({ count: number });
       },
     },
   });
   ```

   ```js
   // 컴포넌트
   import { useCount } from '@/store';

   const store = useCount();

   store.$patch({ count: 24 });
   // or
   store.setCount(24);
   ```

2. pinia는 무조건 모듈식으로 작성해야 한다.  
   위 예시 코드로 보면 알겠지만 모듈식이다. vuex는 내부에 여러 개의 모듈을 가질 수 있는 단일 store였지만, pinia는 단일 모듈만 가질 수 있다. 나는 여기서 살짝 불편함을 느껴서 어떻게 했냐면, index.ts에서 모든 모듈을 import해서 하나의 store로 만들어서 내보내는 방식을 사용했다.

   ```ts
   // index.ts
   export { useSave } from './save';
   export { useCount } from './count';
   ```

   ```ts
   // 컴포넌트
   import { useCount, useSave } from '@/store';

   const countStore = useCount();
   const saveStore = useSave();
   ```

3. Composition API를 지원한다.  
   첫 번째 예시 코드를 아래와 같이 변경할 수 있다.

   ```ts
   import { defineStore } from 'pinia';
   import { ref } from 'vue';

   export const useCount = defineStore('count', () => {
     const count = ref(0);

     function setCount(number: number) {
       count.value = number;
     }

     return { count, setCount };
   });
   ```

   난 기존에 react를 하다가 넘어와서 그런건지, vue의 Composition API 방식을 선호한다. pinia에서도 같은 방식을 지원하여 반가웠다.

4. vuex보다 훨씬 쉽고 완전한 typescript를 지원한다.  
   vuex에서 typescript를 쓰려면 아래와 같이 복잡스런 방식을 써야 했다.

   ```ts
   // vuex.d.ts
   import { Store } from 'vuex';

   declare module '@vue/runtime-core' {
     interface State {
       count: number;
     }

     interface ComponentCustomProperties {
       $store: Store<State>;
     }
   }
   ```

   ```ts
   // store.ts
   import { InjectionKey } from 'vue';
   import { createStore, useStore as baseUseStore, Store } from 'vuex';

   export interface State {
     count: number;
   }

   export const key: InjectionKey<Store<State>> = Symbol();

   export const store = createStore<State>({
     state: {
       count: 0,
     },
   });

   export function useStore() {
     return baseUseStore(key);
   }
   ```

   ```ts
   // import { useStore } from 'vuex';
   import { useStore } from '@/store'; //  type 지원을 받기 위해 store.ts에서 export한 useStore를 사용한다.
   ```

   하지만 pinia는 defineStore라는 함수를 이용하여 각각의 파일마다 module의 기능을 대신해줘서 타입 추론에 대한 부가적인 작업이 필요하지 않다. 예시 코드로만 작성하여도 타입 추론이 잘되는 것을 확인할 수 있다.

새 프로젝트를 진행하면서 처음엔 vuex를 쓰다가 pinia로 수정하였는데, 정말 편리하고 쉽게 사용할 수 있었다. 본인이 Composition API를 선호하거나, typescript를 사용한다면 vuex보단 pinia가 낫다고 생각한다. 하지만 그렇지 않더라도 pinia는 vue2, vue3도 지원하기에 레거시 코드에서도 쓸 수 있다. 심지어 vuex와 pinia를 같이 쓸 수도 있다.(_그런 경우는 없겠지 아마..._) 또한 devtools에서도 공식지원한다. 그리고 vuex에서 pinia로 변경하면서 느낀건데 다행히도 vuex에서 pinia로 변경하기가 어렵지 않았다. 실제로 vuex5와 pinia 사이의 전환이 매우 쉬울 것이라고 말하기도 했으니 react와는 다르게 vue에서는 상태관리 라이브러리를 바꾸기가 쉬울 것 같다.

아무튼 결론은 vue도 vuex와 pinia 2개의 상태관리 라이브러리가 생겼다.
