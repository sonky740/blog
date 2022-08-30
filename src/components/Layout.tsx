import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'gatsby';
import '../resources/style/fonts.css';
import GlobalStyle from '../resources/style/globalStyle';
import { ThemeProvider } from 'styled-components';
import useTheme from '../hooks/useTheme';
import { lightTheme, darkTheme } from '../resources/style/theme';
import ThemeButton from './UI/ThemeButton';
import Wrapper from './Layout/Wrapper';
import Header from './Layout/Header';
import Main from './Layout/Main';

interface LayoutType {
  location?: { pathname?: string };
  title: string;
  children: React.ReactNode;
}

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
          theme={theme}
          onClick={themeHandler}
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
        <Main>{children}</Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
