import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  >li {
    position: relative;
    padding-left: 1.2rem;
    list-style: none;

    &:before {
      content: "";
      position: absolute;
      top: 0.6em;
      left: 0;
      width: 0.6rem;
      height: 0.6rem;
      background: var(--color);
      border-radius: 50%;
    }
  }
`;

const List = ({ children }: { children: React.ReactNode }) => {
  return <Ul>{children}</Ul>;
};

export default List;
