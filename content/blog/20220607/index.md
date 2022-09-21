---
title: IOS Safari css rotate bug
date: '2022-06-07'
# description: ''
keywords: [ios, safari, rotate]
---

이번에 간단한 프로모션 페이지를 작업하는데 예상치 못한 버그가 있었다.
IOS Safari에서만 발견된 문제였는데 css의 transform: rotate를 animation(_transition도 마찬가지_)을 걸었을 때 position: fixed된 영역을 가린다는 것이다.
설명만으로는 이해가 힘들 테니 이미지로 보자.

![버그 해결 전](./bug.gif)

위 이미지를 보면 밑에 초록색이 fixed된 영역이고 스크롤 했을 때 특정 요소가 rotateY(180deg)에서 rotateY(0)으로 animation 효과를 걸어놨다.
안드로이드에서는 문제가 없지만, IOS의 safari에서 위 이미지처럼 rotate될 때 fixed된 영역을 가리는 현상이 나타났다.
처음엔 z-index도 바꿔보고 position도 다르게 바꿔보고 했는데 결국 스택 오버플로에서 해결법을 찾았다.

<a href="https://stackoverflow.com/questions/18146511/bug-in-css3-rotatey-transition-on-safari" target="_blank" rel="noreferrer" title="스택오버플로 새창 열기">bug-in-css3-rotatey-transition-on-safari</a> 여기로 들어가보면 나와 비슷한 문제인데 답글에 해결법이 2가지였다.

1. rotate가 아닌 scale을 써서 뒤집는 효과를 내거나,
2. rotate 되는 요소의 부모요소에게 transform: translateZ(0); 을 주라는 것이다.

첫 번째 방법은 속도가 다르기도 하고 원래 쓰려 했던 rotate를 쓰고자 하여 2번으로 해결하였다.  
아래가 해결된 결과다.

![버그 해결 후](./fixed.gif)

IOS에서 왜 이렇게 되는지는 모르겠다. 구글링을해도 국내엔 관련 글이 안 보이고 해외에도 저렇게 하라는 답만 있지 왜 이런 버그가 생기는 것인지는 안 나와 있으나 추측해보자면... rotate가 될 때 Z축을 많이 넘어가는 게 아닐까? 그래서 translateZ를 0으로 주면 되는게 아닐까 싶다... 나중에 이유를 찾게 되면 글을 수정하겠다.
