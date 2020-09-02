import React, { useContext } from 'react';
import styled from 'styled-components';
import { MenuContext } from '../../../context/navState';

const MenuButton = styled.button`
  display: block;
  transform-origin: 16px 11px;
  float: left;
  outline: 0;
  border: 0;
  padding: 10px;
  background: none;
  height: 45px;
  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  :hover {
    span:nth-of-type(1) {
      width: 27px;
    }
    span:nth-of-type(2) {
      width: 35px;
    }
    span:nth-of-type(3) {
      width: 27px;
    }
    cursor: pointer;
  }
&.active {
    span:nth-of-type(1) {
      transform: rotate(45deg) translate(10px, 9px);
      width: 35px;
    }
    span:nth-of-type(2) {
      opacity: 0;
      pointer-events: none;
    }
    span:nth-of-type(3) {
      transform: rotate(-45deg) translate(7px, -6px);
      width: 35px;
    }
  }
`;

const Bar = styled.span`
  display: block;
  width: 35px;
  height: 4px;
  margin-bottom: 7px;
  background-color: #fff;
`;

const HamburgerButton = () => {
  const { isMenuOpen, toggleMenuMode } = useContext(MenuContext);

  const clickHandler = () => {
    toggleMenuMode();
  };

  return (
    <MenuButton
      className={isMenuOpen ? 'active' : ''}
      aria-label="Открыть главное меню"
      onClick={clickHandler}
    >
      <Bar />
      <Bar />
      <Bar />
    </MenuButton>
  );
};


export default HamburgerButton;