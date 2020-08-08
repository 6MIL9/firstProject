import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

function Navbar(props) {

    return (
        <div className={classes.main}>
            <nav className={classes.nav}>
                <div className={classes.item}>
                    <NavLink to="/profile" className={classes.link} activeClassName={classes.activeLink}>Profile</NavLink>
                </div>

                <div className={classes.item}>
                    <NavLink to="/dialogs" className={classes.link} activeClassName={classes.activeLink}>Messages</NavLink>
                </div>

                <div className={classes.item}>
                    <NavLink to="/News" className={classes.link} activeClassName={classes.activeLink}>News</NavLink>
                </div>

                <div className={classes.item}>
                    <NavLink to="/Users" className={classes.link} activeClassName={classes.activeLink}>Users</NavLink>
                </div>

                <div className={classes.item}>
                    <NavLink to="/Music" className={classes.link} activeClassName={classes.activeLink}>Music</NavLink>
                </div>

                <div className={classes.item}>
                    <NavLink to="/Settings" className={classes.link} activeClassName={classes.activeLink}>Settings</NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;