import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useSiteMetadata from '../hooks/useSiteMetadata';

const Comments: React.FC<{ id: string }> = ({ id }) => {
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
      utterancesEl?.contentWindow?.postMessage(
        message,
        'https://utteranc.es/client.js'
      );
    };

    isUtterancesCreated.current ? postThemeMessage() : createUtterancesEl();
  }, [id, repo, theme.dark]);

  return <div ref={containerRef} style={{ minHeight: '269px' }} />;
};

export default Comments;
