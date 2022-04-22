import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

const Comments = ({ id }: { id: string }) => {
  const { dark } = useContext(ThemeContext);
  const themeMode = dark ? 'github-dark' : 'github-light';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createUtterancesEl = () => {
      const container = containerRef.current;
      if (container) {
        // add utteranc comment
        const script = document.createElement('script');
        script.setAttribute('src', 'https://utteranc.es/client.js');
        script.setAttribute('repo', 'sonky740/comment');
        script.setAttribute('issue-term', id);
        script.setAttribute('label', 'comment');
        script.setAttribute('theme', themeMode);
        script.setAttribute('crossorigin', 'anonymous');
        script.setAttribute('async', 'true');
        container.appendChild(script);
        return () => {
          container.innerHTML = '';
        };
      }
    };

    const utterancesEl = containerRef.current?.querySelector('iframe.utterances-frame') as HTMLIFrameElement;
    const postThemeMessage = () => {
      const message = {
        type: 'set-theme',
        theme: themeMode,
      };
      utterancesEl.contentWindow?.postMessage(message, 'https://utteranc.es/client.js');
    };
    utterancesEl ? postThemeMessage() : createUtterancesEl();
  }, [id, themeMode]);

  return <div ref={containerRef} style={{ minHeight: 269 }} />;
};

export default Comments;
