import React from 'react';
import classes from './Users.module.css';
import defaultPhoto from '../../assets/img/noAvatar.jpg';
import { NavLink } from 'react-router-dom';

let Users = (props) => {

    console.log(props.toogleFollowingProgress)

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={classes.content}>
            <div className={classes.pages}>
                {pages.map(p => {
                    return <span id={classes.item} className={props.currentPage === p && classes.selectedPage}
                        onClick={(e) => { props.onPageChanged(p) }}
                    >{p}</span>
                })}
            </div>

            {props.users.map((u) => <div key={u.id}>

                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : defaultPhoto} className={classes.usersphoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => { props.follow(u.id) }}>Follow</button>}
                    </div>
                </span>


                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>

                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
            }
        </div >
    );
}



export default Users;

