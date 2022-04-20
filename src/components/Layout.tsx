import React from "react";
import { Link } from "gatsby";
import GlobalStyle from "../resources/style/globalStyle";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 82rem;
  padding: 4rem 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.8rem;

  h1 {
    margin: 0;
  }
`;

const Main = styled.main`
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
          transform: translateY(-0.8rem);
          outline: none;
        }
      }
    }
  }
`;

const Layout = ({ location, children }: LayoutType) => {
  // @ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location?.pathname === rootPath;
  const header = (
    <>
      <h1>
        {/* <Link to="/">{title}</Link> */}
        <Link to="/">Sonky</Link>
      </h1>
      <nav>
        <Link to="/About">About</Link>
      </nav>
    </>
  );

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
