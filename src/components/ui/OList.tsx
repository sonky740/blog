import React from 'react';
import styled from 'styled-components';

const Ol = styled.ol`
  counter-reset: ol-list;

  > li {
    counter-increment: ol-list;
    position: relative;
    padding-left: 2rem;
    list-style: none;

    &:before {
      content: counter(ol-list) '.';
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const OList = ({ children }: { children: React.ReactNode }) => {
  return <Ol>{children}</Ol>;
};

export default OList;
