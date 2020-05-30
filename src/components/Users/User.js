import React from 'react';
import classes from './Users.module.css';
import { NavLink } from 'react-router-dom';
import defaultPhoto from '../../assets/img/noAvatar.jpg';

let User = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : defaultPhoto} className={classes.usersPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>Follow</button>}
                </div>
            </span>


            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>

                </span>
                <span>
                    <div>{'user.location.couserntry'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div >
    );
}

export default User;
