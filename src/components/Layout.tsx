import React, { useEffect } from "react";
import { Link } from "gatsby";
import GlobalStyle from "../resources/style/globalStyle";
import styled from "styled-components";

const Wrapper = styled.div``;

const Header = styled.header`
  position: sticky;
  top: 0;
  background: #fff;
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
        margin: -1.2rem;
        padding: 1.2rem;
        border-radius: 1.6rem;
        transition: all 0.3s;

        &:hover,
        &:focus {
          box-shadow: 0 0rem 0.6rem rgba(0, 0, 0, 0.2);
          transform: translateY(-0.2rem);
          outline: none;
        }
      }

      + li {
        margin-top: 2.4rem;
      }
    }
  }
`;

const Layout = ({ location, children }: LayoutType) => {
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

  useEffect(() => {});

  return (
    <>
      <GlobalStyle />
      <Wrapper data-is-root-path={isRootPath}>
        <Header>{header}</Header>
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
};

export default Layout;
