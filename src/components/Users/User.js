import React from 'react';
import classes from './Users.module.css';
import { NavLink } from 'react-router-dom';
import defaultPhoto from '../../assets/img/noAvatar.jpg';

let User = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div className={classes.userWrapper}>
            <div className={classes.content}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : defaultPhoto} className={classes.usersPhoto} alt="userPhoto"/>
                    </NavLink>
                </div>

                <div className={classes.userInfo}>{user.name}</div>
                
                <div>
                    {user.followed
                        ? <button className={classes.btn} disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>unfollow</button>
                        : <button className={classes.btn} disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>Follow</button>}
                </div>
            </div>
        </div >
    );
}

export default User;
