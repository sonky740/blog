import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface HeaderStyleProps {
  scrollOn: boolean;
}

interface Props {
  children: React.ReactNode;
  scrollOn: boolean;
}

const Header = forwardRef<HTMLElement, Props>(({ children, scrollOn }, ref) => {
  return (
    <HeaderStyle ref={ref} scrollOn={scrollOn}>
      {children}
    </HeaderStyle>
  );
});

const HeaderStyle = styled.header<HeaderStyleProps>`
  position: sticky;
  top: 0;
  background-color: rgba(var(--bg), 0.3);
  backdrop-filter: blur(5px);
  margin: 0 0 3.6rem;
  z-index: 1000;
  box-shadow: ${({ scrollOn }) =>
    scrollOn && '0 0.2rem 2rem rgba(0, 0, 0, 0.2)'};
  transition: box-shadow 0.3s, background 0.3s;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: var(--scrollPercent);
    height: 2px;
    background: var(--color);
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
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

  @media screen and (max-width: 640px) {
    > div {
      padding: 0.8rem 1.2rem;
    }

    h1 {
      font-size: 2.4rem;
    }
  }
`;

export default Header;
