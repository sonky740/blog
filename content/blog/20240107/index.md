---
title: webpack => vite 마이그레이션
date: '2024-01-07'
# description: ''
keywords: [webpack, vite, vue]
---

빌드 시간이 너무 길고 레거시 환경을 개선하고자 webpack을 vite로 마이그레이션하는 작업을 23년 10월쯤에 진행했었는데, 업무가 너무 바쁘다는 핑계로 지금에야 정리를해본다.

### 차이점

- webpack은 빌드 시점에 모든 것을 번들링하지만, vite는 빌드 시점에는 번들링하지 않고 브라우저에서 필요한 파일을 요청할 때 번들링한다.
- webpack은 HMR을 위해 빌드 시점에 번들링된 파일을 메모리에 올려두고, 변경사항이 발생하면 메모리에 올려둔 파일을 교체한다. 반면, vite는 변경사항이 발생하면 변경된 파일만 번들링하여 교체한다.
- webpack은 빌드 시점에 번들링을 하므로 빌드 시간이 오래 걸리지만, vite는 빌드 시점에 번들링을 하지 않기 때문에 빌드 시간이 짧다.

### 초기 설정

vue-cli도 vite로 설정돼있지만, 기존의 설정들을 많이 들고가야해서 `npm create vite@latest`로 새로운 프로젝트를 생성하여 마이그레이션을 진행했다.

### 환경 변수

webpack에서는 환경변수를 가져올 때 `process.env.~~`로 가져왔는데, vite에서는 `import.meta.~~`로 가져온다. 이때, vite에서 접근 가능한 환경변수는 `VITE_`로 시작하는 환경변수들이다. 그래서 환경변수들을 `VITE_`로 변경해주었다.

### Stylelint, Eslint, Prettier, Typescript, ...

webpack은 이미 모든 페이지를 번들링한 상태에서 lint를 진행했기 때문에 모든 페이지에 대해 lint를 진행할 수 있었다. 하지만, vite는 빌드 시점에 번들링을 하지 않기 때문에 모든 페이지에 대해 lint를 진행할 수 없었다. 이를 해결하기 위해 `vite-plugin-checker`를 사용하려 하였으나, 레거시 코드가 너무 문제가 많아서 어쩔 수 없이 현재 보고 있는 파일만 lint를 하도록 설정하였다.

### etc

- vue version을 3.3.4로 변경하면서 structuredClone으로 proxy 객체를 복사할 경우 에러가 발생하여 lodash의 `cloneDeep`을 사용하도록 변경
- image src 경로를 `require`로 가져오던 것을 `import`로 가져오도록 변경 (vite에서는 `require`를 지원하지 않는다.)
