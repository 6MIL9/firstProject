import React from 'react';
import classes from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div className={classes.wrapper}>
                {
                    users.map((u) => <User user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow} />)
                }
            </div>
        </div >
    );
}



export default Users;

