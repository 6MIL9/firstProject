import React from 'react';
import styled from 'styled-components';
import HamburgerButton from './HamburgerButton';
import { SideMenu } from './SideMenu';

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  box-sizing: border-box;
  outline: currentcolor none medium;
  max-width: 20%;
  margin: 0;
  color: #FFF;
  min-width: 0px;
  min-height: 0px;
  padding-left: 1rem;
  z-index: 500;
`;

const MenuText = styled.h3`
  font-weight: 400;
`;

const MainMenu: React.FC = () => {
  return (
    <header>
      <Navbar>
        <HamburgerButton />
        <MenuText>Menu</MenuText>
      </Navbar>
      <SideMenu />
    </header>
  );
};
export default MainMenu;