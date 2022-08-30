import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return <MainStyle role="main">{children}</MainStyle>;
};

const MainStyle = styled.main`
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

export default Main;
