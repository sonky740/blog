import React, { useEffect } from 'react';
import styled from 'styled-components';

const SideBar = () => {
  useEffect(() => {}, []);
  return <SideBarStyle></SideBarStyle>;
};

const SideBarStyle = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
`;

export default SideBar;
