import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import NavState from '../../context/navState';
import MainMenu from './HamburgerMenu/MainMenu';

export type MapStateType = {
  login: string | null
  isAuth: boolean
}

export type MapDispatchType = {
  logout: () => void
}

let Header: React.FC<MapStateType & MapDispatchType> = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.block}>
        <NavState>
          <MainMenu />
        </NavState>
      </div>
      <div className={classes.loginContainer}>
        {props.isAuth ? <div> <span className={classes.userName}>{props.login}</span> -
        <button className={classes.btn} onClick={props.logout}>Logout</button></div> : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;