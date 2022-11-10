import type { GatsbySSR } from 'gatsby';
const React = require('react');

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([
    React.createElement('script', {
      dangerouslySetInnerHTML: {
        __html: `
          window.__onThemeChange = function() {};
          
          let preferredTheme

          function setTheme(newTheme) {
            window.__theme = newTheme;
            preferredTheme = newTheme;
            document.body.className = newTheme;
            document.body.dataset.theme = newTheme;
            window.__onThemeChange(newTheme);
          }

          preferredTheme = localStorage.getItem('theme')

          window.__setPreferredTheme = newTheme => {
            setTheme(newTheme)

            localStorage.setItem('theme', newTheme)
          }

          let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

          darkQuery.addEventListener('change', e => {
            window.__setPreferredTheme(e.matches ? 'dark' : 'light')
          })

          setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
        `,
      },
      key: 'sonky-ssr',
    }),
  ]);
};
