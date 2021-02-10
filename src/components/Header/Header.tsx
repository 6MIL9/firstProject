import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import NavState from '../../context/navState';
import MainMenu from './HamburgerMenu/MainMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { logout } from './../../redux/authReducer';

const Header: React.FC = () => {
  const login = useSelector((state: AppStateType) => state.auth.login)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()
  const logoutCB = () => {
    dispatch(logout())
  }

  return (
    <header className={classes.header}>
      <div className={classes.block}>
        <NavState>
          <MainMenu />
        </NavState>
      </div>
      <div className={classes.loginContainer}>
        {isAuth ? <div> <span className={classes.userName}>{login}</span> -
        <button className={classes.btn} onClick={logoutCB}>Logout</button></div> : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;