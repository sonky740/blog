import React from 'react';
import styled from 'styled-components';

interface Props {
  theme: string | null;
  onClick: () => void;
  title: string;
}

const ThemeButton = ({ theme, onClick, title }: Props) => {
  return <Button theme={theme} onClick={onClick} title={title} />;
};

const Button = styled.button`
  position: relative;
  width: 3rem;
  height: 3rem;
  display: inline-block;

  &:before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    ${({ theme }) => {
      if (theme === 'dark') {
        return `
            box-shadow: inset -3px -2px 5px -2px #8983f7, inset -9px -4px 0 0 #a3dafb;
        `;
      } else {
        return `
            background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
        `;
      }
    }}
  }
`;

export default ThemeButton;
