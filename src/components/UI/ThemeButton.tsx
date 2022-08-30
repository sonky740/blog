import React from 'react';
import styled from 'styled-components';
import lightImg from '../../resources/images/light.svg';
import darkImg from '../../resources/images/dark.svg';

interface Props {
  theme: string | null;
  onClick: () => void;
  title: string;
}

const ThemeButton = ({ theme, onClick, title }: Props) => {
  return <Button type="button" theme={theme} onClick={onClick} title={title} />;
};

const Button = styled.button`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  background: url(${({ theme }) => (theme === 'dark' ? darkImg : lightImg)})
    no-repeat 50% 50%/2.4rem;
`;

export default ThemeButton;
