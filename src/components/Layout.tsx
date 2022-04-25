import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import GlobalStyle from '../resources/style/globalStyle';
import styled from 'styled-components';

interface HeaderProps {
  scrollOn: boolean;
}

const Wrapper = styled.div``;

const Header = styled.header<HeaderProps>`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1000;
  transition: box-shadow 0.3s;
  box-shadow: ${({scrollOn}) => scrollOn && '0 0.2rem 2rem rgba(0, 0, 0, 0.2)'};
  
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 3.6rem;
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
  padding: 0 1.2rem;

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

const Layout = ({ location, children }: LayoutType) => {
  const [isScroll, setIsScroll] = useState(false);
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
        <Link to="/About">About</Link>
      </nav>
    </div>
  );

  useEffect(() => {
    function scrollY() {
      if (window.scrollY > 25) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }

    window.addEventListener('scroll', scrollY);

    return () => {
      window.removeEventListener('scroll', scrollY);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper data-is-root-path={isRootPath}>
        <Header scrollOn={isScroll}>{header}</Header>
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
};

export default Layout;
