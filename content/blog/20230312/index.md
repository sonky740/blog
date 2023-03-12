---
title: node patch-package
date: '2023-03-12'
# description: ''
keywords: [nodejs, npm, patch-package]
---

예전에 patch-package에 대한 글을 보았는데, "서드 파티 라이브러리를 영구적으로 커스텀할 수 있는 도구" 라길래 그때 들었던 생각은 보통 서드 파티 라이브러리에서 구현이 안 되는 기능은 기획 의도를 변경하거나 다른 라이브러리를 써야 하는 게 맞지 않나? 라는 생각이었다. 그런데... 내가 이 패키지를 쓰게 될줄은...

쓰게 된 상황은 이렇다.

1. 내 프로젝트에 사내 차트 라이브러리를 사용해야 했다.
2. 하지만 현재 사내 라이브러리로는 기획 의도 사항에 적합하지 않았다.
3. 라이브러리를 관리하는 개발자에게 해당 기능이 필요하다고 요청할 수 없었다.  
   왜? 이건 사내 공통으로 쓸만한 기능이 아니었기 때문.  
   _(우리는 보통 PC에서만 사용하는 웹 앱을 만들기 때문에, 내가 작업하는 환경인 모바일은 고려 대상이 아니였다.)_
4. 그러면 내가 해야지 뭐...

그래서, 내가 사용한 방법은 이렇다. 일단 내 작업 환경이 node version은 18이었고, 사내 라이브러리는 14에서 구동되었다.  
자세한 사용법은 <a href="https://github.com/ds300/patch-package#readme" target="_blank" rel="noreferrer" title="patch-package github 새창 열기">patch-package</a> 여기를 참고하자.
일단은 설치 후
```bash
npm i patch-package
```
```json
// package.json
"scripts": {
  "postinstall": "patch-package"
}
```
1. <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noreferrer" title="nvm github 새창 열기">nvm</a>을 사용해서 내 작업 환경을 14버전으로 변경한다.
2. 사내 라이브러리를 따로 clone하여 수정하고 build 한다.
3. 수정한 사내 라이브러리를 내가 사용하는 프로젝트의 node_modules에 복사한다.
4. "npx patch-package @사내-라이브러리-이름"을 실행하고(_이 과정에서 patches라는 폴더가 생기고 그 안에 .patch 파일이 생긴다._)  
   내 node_modules와 package_lock.json을 삭제 후 node version을 18로 바꾸고 npm install을 한다.(*node_modules를 안 지우고 하려고 했는데 내 프로젝트의 빌드 툴인 vite는 node_modules>.vite에 반영돼있는 소스를 적용하기에, 다 지우고 설치해야지 개발 환경에 반영되었다.*)

이렇게 하면 내가 수정한 사내 라이브러리가 내 프로젝트에 적용된다. 또한, 다른 사람과도 공유할 수 있다.

근데 주의할 점이 있는데 package.json에서 캐럿(^)을 사용하면, 내가 수정한 사내 라이브러리가 마이너 업데이트되는 경우가 있어서 내가 수정한 사항이 반영이 안 된다. 그래서 나는 캐럿을 사용하지 않고 사내 라이브러리의 버전을 고정했다.
