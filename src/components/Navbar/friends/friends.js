import React from 'react';
import classes from './friends.module.css';

function Friends(props) {
    return (
        <div>
            <div className={classes.avatar}></div>
            <div className={classes.name}>{props.name}</div>
        </div>
    );
}

export default Friends;
