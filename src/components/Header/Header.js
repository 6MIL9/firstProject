import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

let Header = (props) => {
  return (
    <header className={classes.header}>
      <img src='https://avatars.mds.yandex.net/get-pdb/2978932/0b12af51-bf52-47ad-89b3-431f0f0fc4ff/s1200?webp=false' />
      <div className={classes.loginContainer}>
        {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div> : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;