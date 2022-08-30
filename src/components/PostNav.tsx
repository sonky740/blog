import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const PostNav = ({ children }: Props) => {
  return <PostNavStyle>{children}</PostNavStyle>;
};

const PostNavStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 3.2rem 0 0 0;

  > div {
    flex: 1;
    + div {
      text-align: right;
    }
  }
`;

export default PostNav;
