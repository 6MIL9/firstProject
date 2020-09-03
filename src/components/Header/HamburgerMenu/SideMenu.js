import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { MenuContext } from '../../../context/navState';
import { NavLink } from 'react-router-dom';
import classes from './SideMenu.module.css';

const Menu = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 293;
  display: block;
  margin-top: 0px;
  padding: 4rem 2rem 0 1rem;
  align-items: stretch;
  background-color: #00a3ff;
  transform: translateX(-120%);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${props =>
    props.open &&
    css`
      transform: translateX(0%);
    `}
`;


export const SideMenu = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext);

  return <Menu open={isMenuOpen}>{children}</Menu>;
};



SideMenu.defaultProps = {
  children: (
      <nav className={classes.nav}>
        <div className={classes.item}>
          <NavLink to="/profile" className={classes.link} activeClassName={classes.activeLink}>Profile</NavLink>
        </div>

        <div className={classes.item}>
          <NavLink to="/dialogs" className={classes.link} activeClassName={classes.activeLink}>Messages</NavLink>
        </div>

        <div className={classes.item}>
          <NavLink to="/Users" className={classes.link} activeClassName={classes.activeLink}>Users</NavLink>
        </div>

        <div className={classes.item}>
          <NavLink to="/Settings" className={classes.link} activeClassName={classes.activeLink}>Settings</NavLink>
        </div>
      </nav>
  ),
};