---
title: 간단할줄 알았던 블로그 만들기
date: '2022-05-16'
# description: ''
keywords: [gatsbyjs, gastby-starter-blog, 다크 모드, utterances]
---

난 2년 전에 포트폴리오를 만들 때 gatsbyJS를 썼다.  
gatsby 경험자니까 무난할 줄 알았다. 하지만 오산이었다. 포트폴리오를 만들 때는 기능이 단순했을 뿐이었다.

처음에 <a href="https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog" target="_blank" rel="noreferrer">gatsby-starter-blog</a>를 받고 타입스크립트로 바꾸고 내 스타일에 맞게 바꾸는 것까지는 무난하였는데... 난 평소 PC나 모바일이나 어두운 테마를 쓰기에 다크 모드를 만들려고 하였는데 이 과정에서 생각지 못한 문제를 겪었다.

일단 내가 하고자 한 다크 모드의 기능은 이러하다.

1. 첫 진입 시엔 시스템 테마를 따라 알아서 테마를 설정하게끔.
2. 테마 변경 버튼을 눌렀을 때 localStorage를 활용하여 나중에 다시 진입 시에도 설정한 테마 유지.
3. 테마 변경 버튼을 눌렀을 때 댓글 기능인 utterances의 테마 실시간 변경.
4. 새로 고침 시에도 자연스럽게 설정한 테마로 보이게.

그리고 내가 겪은 문제는 이러하다.

1. 새로 고침할때 깜빡임.
2. utterances의 테마 실시간 변경 안 됨.

처음엔 다크 모드 만드는데 굳이 구글링할 필요가 있을까 싶어 혼자서 이것저것 시도해봤다.  
이 블로그는 <a href="https://styled-components.com/" target="_blank" rel="noreferrer">styled-components</a>를 사용하였기에 ThemeProvider와 React의 useContext로 해결하려 하였으나, 다크 상태에서 새로 고침을하면 하얀색에서 검은색으로 깜빡이는 현상이 나타났었다.  
이유는 처음에 화면을 불러올 때, DOM을 그리고 나서 다크 모드에 해당하는 스타일이 붙어서 그렇다.

이곳 저곳 구글링하다가 이 <a href="https://github.com/sungik-choi/gatsby-starter-apple" target="_blank" rel="noreferrer">소스</a>를 통해서 알게 된 건데, 이걸 해결하려면 DOM을 다 불러오기전에 다크 모드를 설정하는 스크립트가 먼저 불러와 져 있어야 한다. 그러려면 <a href="https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr" target="_blank" rel="noreferrer">gatsby-ssr</a> 파일이 있어야 한다.

```js
// gatsby-ssr.js
const React = require('react');

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      dangerouslySetInnerHTML: {
        __html: `
          (() => {
            window.__onThemeChange = function() {};

            function setTheme(newTheme) {
              window.__theme = newTheme;
              preferredTheme = newTheme;
              document.body.className = newTheme;
              document.body.dataset.theme = newTheme;
              window.__onThemeChange(newTheme);
            }

            let preferredTheme

            try {
              preferredTheme = localStorage.getItem('theme')
            } catch (err) {}

            window.__setPreferredTheme = newTheme => {
              setTheme(newTheme)

              try {
                localStorage.setItem('theme', newTheme)
              } catch (err) {}
            }

            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

            darkQuery.addEventListener('change', e => {
              window.__setPreferredTheme(e.matches ? 'dark' : 'light')
            })

            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
          })()
        `,
      },
      key: 'sonky-ssr',
    }),
  ]);
};
```

그리고 테마를 설정하는 커스텀 hook을 작성하였고,

```tsx
// useTheme.tsx
import { useState, useEffect, useCallback } from 'react';

// global로 선언한 타입은 gatsby-ssr.js에 있다.
declare global {
  interface Window {
    __theme: string;
    __setPreferredTheme: (theme: string) => void;
    __onThemeChange: (theme: string) => void;
  }
}

const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(window.__theme);
    }

    window.__onThemeChange = newTheme => {
      setTheme(newTheme);
    };
  }, []);

  const themeHandler = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, [theme]);

  return { theme, themeHandler };
};

export default useTheme;
```

그리고 ThemeProvider를 넣는 컴포넌트인 Layout.tsx에는 커스텀훅인 useTheme를 불러오고

```tsx
// Layout.tsx
import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import useTheme from '../hooks/useTheme';
import { lightTheme, darkTheme } from '../resources/style/theme';

// 중략...

const { theme, themeHandler } = useTheme();
const themeMode = theme === 'light' ? lightTheme : darkTheme;
```

ThemeProvider로 감싸는 곳에 theme를 Object 형태로 넣어야 해서 아래의 theme.tsx를 따로 작성하여 호출하였다.

```tsx
// theme.tsx
export const lightTheme = {
  dark: false,
};

export const darkTheme = {
  dark: true,
};
```

그렇게 Layout.tsx가 return하는 소스는

```tsx
//  Layout.tsx
return (
  <ThemeProvider theme={themeMode}>
    <GlobalStyle /> // 글로벌 스타일
    <Wrapper data-is-root-path={isRootPath}>
      <Header>{header}</Header>
      <Main>{children}</Main>
    </Wrapper>
  </ThemeProvider>
);
```

여기까지만하면 댓글(utterances)을 제외한 다크 테마는 완성된다.  
아래는 댓글 컴포넌트 설정 파일이다.

```tsx
// Comments.tsx
import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useSiteMetadata from '../hooks/useSiteMetadata'; // 사이트 메타데이터가 들어있는 파일이다.

// id는 이 블로그의 상세페이지의 blog-post.tsx에서 전달해준다.
const Comments = ({ id }: { id: string }) => {
  const site = useSiteMetadata();
  const { repo } = site.utterances ?? { repo: undefined };
  const theme = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUtterancesCreated = useRef(false);

  useEffect(() => {
    if (!repo) return;
    let themeMode: any;

    if (!isUtterancesCreated.current) {
      themeMode =
        document.body.dataset.theme === 'dark' ? 'github-dark' : 'github-light';
    } else {
      themeMode = theme.dark ? 'github-dark' : 'github-light';
    }

    // utterances를 만드는 함수를 작성하여야한다. 테마 설정에 따라 재 렌더링 해줘야하기 때문.
    const createUtterancesEl = () => {
      const comment = document.createElement('script');
      const attributes = {
        src: 'https://utteranc.es/client.js',
        repo,
        'issue-term': id,
        label: 'comment',
        theme: themeMode,
        crossorigin: 'anonymous',
        async: 'true',
      };
      Object.entries(attributes).forEach(([key, value]) => {
        comment.setAttribute(key, value);
      });
      containerRef.current?.appendChild(comment);
      isUtterancesCreated.current = true;
    };

    const utterancesEl = containerRef.current?.querySelector(
      'iframe.utterances-frame'
    ) as HTMLIFrameElement;

    const postThemeMessage = () => {
      if (!utterancesEl) return;
      const message = {
        type: 'set-theme',
        theme: themeMode,
      };
      // iframe 간의 통신에 사용하는 함수 postMessage
      utterancesEl?.contentWindow?.postMessage(
        message,
        'https://utteranc.es/client.js'
      );
    };

    isUtterancesCreated.current ? postThemeMessage() : createUtterancesEl();
  }, [id, repo, theme.dark]);

  return <div ref={containerRef} />;
};

export default Comments;
```

이렇게 다크 테마를 완성하였다.  
이번엔 다른 개발자들이 만들어둔 소스를 많이 참고하였지만, 다음엔 스스로 만들 수 있기를 바라며 이 글을 남긴다.