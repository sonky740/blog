import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  min-height: 100vh;
  background: rgb(var(--bg));
  color: var(--color);
  transition: background 0.3s, color 0.3s;
`;

export default Wrapper;
