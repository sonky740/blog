---
title: scss(sass) mixin의 함정
date: '2023-09-03'
# description: ''
keywords: [scss, sass, mixin]
---

우린 js를 쓸 때 함수를 잘게 쪼개서 재사용성을 높이곤 한다. 그리고 css의 전처리기인 scss에도 스타일을 재사용하고 코드 중복을 줄이기 위한 mixin이 존재하는데, js와는 다르게 mixin을 오용하면 다음과 같은 함정에 빠질 수 있다.

1. 중복된 css 생성  
   scss는 css의 전처리기이다. mixin을 썼을 때 css로 어떻게 컴파일되는지 확인 해야 한다.
   아래는 간단한 mixin의 예제이다.

   ```scss
   @mixin icon($name, $size) {
     background-image: url('/icons/#{$name}.svg');
     background-size: contain;
     width: $size;
     height: $size;
   }

   .icon {
     &-time {
       @include icon('time', 16px);
     }

     &-user {
       @include icon('user', 20px);
     }
   }
   ```

   위의 코드는 js와 유사한 관점에서 바라본다면 문제가 없어 보일 수 있다. 하지만 컴파일된 css를 보면 다음과 같다.

   ```css
   .icon-time {
     background-image: url('/icons/time.svg');
     background-size: contain;
     width: 16px;
     height: 16px;
   }

   .icon-user {
     background-image: url('/icons/user.svg');
     background-size: contain;
     width: 20px;
     height: 20px;
   }
   ```

   width, height, background-size가 중복되어 나타난다. 위의 코드는 유틸성 css로 간단히 해결할 수 있다.

   ```scss
   .icon {
     background-size: contain;

     &--small {
       width: 16px;
       height: 16px;
     }

     &--medium {
       width: 20px;
       height: 20px;
     }

     &--large {
       width: 24px;
       height: 24px;
     }

     &-time {
       background-image: url('/icons/time.svg');
     }

     &-user {
       background-image: url('/icons/user.svg');
     }
   }
   ```
   위와 같이 쓰면 비록 html에서 .icon.icon-time.icon--small 이런 식으로 class명이 길어지겠지만 css의 중복되는 코드를 피할 수 있다. 또한, css를 쪼개면서 재사용성 및 조합성도 높일 수 있다.

2. 유지 보수의 어려움  
   이건 js에서도 마찬가지이다. 함수를 잘게 쪼개면 코드의 재사용성은 높아지지만, 호출하는 곳을 찾기가 어려워질 수 있다. 그렇지만 js에서는 재사용성의 이점이 워낙 크기에 이런 단점을 감수하고 함수를 잘게 쪼개는 것이다. 하지만 scss의 mixin은 그렇지 않다. mixin이 많아질수록 컴파일 속도는 느려지고, css의 중복이 늘어난다. 이런 단점을 감수하면서까지 mixin을 무분별하게 사용하는 것은 비효율적이다.

예전에 MPA 방식으로 개발했을 때는 scss가 컴파일된 css를 항상 확인했었다. 근데 SPA 방식으로 넘어오면서 컴파일된 css를 확인하는 것을 잊고 있었고, 최근 동료 개발자가 mixin을 너무 많이 쓰고 있길래, 나도 다시 한번 상기하고자 이 글을 쓴다.