---
title: Array => Object 순서 보장
date: '2024-08-19'
# description: ''
keywords: [Object.fromEntries, Map]
---

Array => Object를 변환해야 하는 일은 너무나 빈번하다. 근데 그 와중에 순서를 보장해야 하는 일은 그렇게 빈번하진 않다고 생각한다. (객체로 변환 후 Object.keys 같은 걸 사용하여 순서대로 뽑아야 하는 경우) 이번엔 필자가 겪은 문제와 순서를 보장해야 하는 경우에 관한 얘기를 해보고자 한다.

```ts
const data = [
  ['database', 3],
  ['1뎁스', 2],
  ['추가 테스트', 2],
  ['was 포함', 2],
  ['oracle test', 3],
  ['seoul', 1],
  ['오라클', 2],
  ['22', 9997],
  ['333444', 9999],
  ['11', 9998],
  ['다시 추가', 2],
  ['DB2', 2],
  ['maria', 1],
  ['미그룹', 25],
];

console.log(Object.fromEntries(data));
```

위 코드는 문제를 겪었던 코드 일부를 가져왔으며, 배열을 객체로 변환 후 여러 가공을 한 후 Object.keys를 통해서 순서대로 화면에 나타내야 했었다. 근데 객체로 변환한 결과가 내 예상과는 달랐다.

```ts
{
  '11': 9998,
  '22': 9997,
  '333444': 9999,
  database: 3,
  '1뎁스': 2,
  '추가 테스트': 2,
  'was 포함': 2,
  'oracle test': 3,
  seoul: 1,
  '오라클': 2,
  '다시 추가': 2,
  DB2: 2,
  maria: 1,
  '미그룹': 25
}
```

숫자로만 이루어진 값은 맨 앞으로 당겨진 것이다. fromEntries의 문제인가 싶어서 forEach나 reduce를 통해서 변환해 봐도 마찬가지였고, forEach를 돌릴 때 index를 잡아서 숫자만 있는 곳의 index에서 끊어 봤더니 그 순간 숫자로만 이루어진 값이 맨 앞으로 갔었다. 어이가 없었다.
추측하기에는 Object Key는 특성상 숫자 문자열은 자동으로 숫자로 해석하여 먼저 정렬되는데, 여기서도 그렇게 반영된 듯하다. 위 문제를 잘 설명해 주는 <a href="https://dev.to/frehner/the-order-of-js-object-keys-458d" target="_blank" rel="noreferrer" title="외부 링크 새창 열기">링크</a>를 첨부한다.

아무튼, 배열 => 객체 => 이전 배열의 순서를 보장해야 한다면 Key-Value의 순서를 기억하는 Map을 사용하는 방법 말고는 없었다. 여기서 Map과 Object의 차이는 [MDN](https://developer.mozila.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)에서 확인할 수 있다. 성능적인 차이에 대해 좀 더 설명하자면 아래와 같다.
1. 데이터를 자주 업데이트(추가)할 때는 Object. (순서를 저장하지 않으므로)
2. 데이터를 자주 불러올 때(조회)는 Map이 유리하다. (순차적으로 가져오기만 하면 되므로)
