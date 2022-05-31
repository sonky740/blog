import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'gatsby';
import '../resources/style/fonts.css';
import GlobalStyle from '../resources/style/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import useTheme from '../hooks/useTheme';
import { lightTheme, darkTheme } from '../resources/style/theme';

import lightImg from '../resources/images/light.svg';
import darkImg from '../resources/images/dark.svg';

interface HeaderProps {
  scrollOn: boolean;
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--bg);
  color: var(--color);
  transition: background 0.3s, color 0.3s;
`;

const Header = styled.header<HeaderProps>`
  position: sticky;
  top: 0;
  background: var(--bg);
  margin: 0 0 3.6rem;
  z-index: 1000;
  box-shadow: ${({ scrollOn }) =>
    scrollOn && '0 0.2rem 2rem rgba(0, 0, 0, 0.2)'};
  transition: box-shadow 0.3s, background 0.3s;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: var(--scrollPercent);
    height: 2px;
    background: var(--reverseBg);
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    padding: 1rem 1.2rem;
    max-width: 82rem;
  }

  h1 {
    position: relative;
    margin: 0;
  }

  nav {
    display: flex;
    column-gap: 0.8rem;
    position: relative;
  }
`;

const Main = styled.main`
  max-width: 82rem;
  margin: 0 auto;
  padding: 0 1.2rem 8rem;

  > ol {
    list-style: none;

    > li {
      padding-left: 0;

      &:before {
        content: none;
      }

      > a {
        display: block;
        border-radius: 1.6rem;
        transition: all 0.3s;

        &:hover,
        &:focus {
          transform: translateY(-0.2rem);
          outline: none;
        }
      }

      + li {
        margin-top: 3.2rem;
      }
    }
  }
`;

const ThemeButton = styled.button`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  background: url(${({ theme }) => (theme === 'dark' ? darkImg : lightImg)})
    no-repeat 50% 50%/2.4rem;
`;

const Layout = ({ location, children }: LayoutType) => {
  const { theme, themeHandler } = useTheme();
  const [isScroll, setIsScroll] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location?.pathname === rootPath;

  const header = (
    <div>
      <h1>
        <Link to="/">Sonky's Blog</Link>
      </h1>
      <nav>
        <ThemeButton
          type="button"
          theme={theme}
          onClick={themeHandler as () => {}}
          title={theme === 'light' ? '현재: 화이트모드' : '현재: 다크모드'}
        />
        <Link to="/About">About</Link>
      </nav>
    </div>
  );

  useEffect(() => {
    const scrollYHandler = () => {
      const scrollY = window.scrollY;
      if (scrollY > 25) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }

      const clientHeight = document.body.clientHeight;
      const scrollHeight = document.body.scrollHeight;
      const realHeight = scrollHeight - clientHeight;
      const scrollPercent = (scrollY / realHeight) * 100;

      headerRef.current?.style.setProperty(
        '--scrollPercent',
        `${scrollPercent}%`
      );
    };
    scrollYHandler();

    window.addEventListener('scroll', scrollYHandler);
    window.addEventListener('resize', scrollYHandler);

    return () => {
      window.removeEventListener('scroll', scrollYHandler);
      window.removeEventListener('resize', scrollYHandler);
    };
  }, []);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Wrapper data-is-root-path={isRootPath}>
        <Header ref={headerRef} scrollOn={isScroll}>
          {header}
        </Header>
        <Main role="main">{children}</Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
