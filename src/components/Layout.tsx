import React from 'react';
import { Link } from 'gatsby';
import GlobalStyle from '../resources/style/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import useTheme from '../hooks/UseTheme';
import { lightTheme, darkTheme } from '../resources/style/theme';

import lightImg from '../resources/images/light.svg';
import darkImg from '../resources/images/dark.svg';

const Wrapper = styled.div`
  padding: 0 1.2rem;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background: ${props => props.theme.bg};
  z-index: 1000;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 3.6rem;
    padding: 1rem 0;
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
  > ol {
    list-style: none;

    > li {
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

const ThemeToggleButton = styled.button`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  background: ${props => props.theme.bg} url(${props => props.theme.dark ? darkImg : lightImg}) no-repeat 50% 50%/2.4rem;
  color: ${props => props.theme.color};
`;

const Layout = ({ location, children }: LayoutType) => {
  const [theme, themeHandler] = useTheme();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  // @ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location?.pathname === rootPath;

  const header = (
    <div>
      <h1>
        {/* <Link to="/">{title}</Link> */}
        <Link to="/">Sonky</Link>
      </h1>
      <nav>
        <ThemeToggleButton type="button" onClick={themeHandler as () => {}} title={theme === 'light' ? '다크모드로' : '화이트모드로'}></ThemeToggleButton>
        <Link to="/About">About</Link>
      </nav>
    </div>
  );

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Wrapper data-is-root-path={isRootPath}>
        <Header>{header}</Header>
        <Main>{children}</Main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
