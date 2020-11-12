import React, { ReactNode } from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import NavState from '../../context/navState';
import MainMenu from './HamburgerMenu/MainMenu';

// type PropsType = {
//   children?: ReactNode
//   login: string
//   isAuth: boolean
//   logout: () => (dispatch: any) => Promise<void> 
// }

let Header = (props) => {
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