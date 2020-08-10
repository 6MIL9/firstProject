import React from 'react';
import classes from './Post.module.css';

function Post(props) {
  return (
    <div className={classes.item}>
      <img src={props.img}></img>
      <div className={classes.bar}></div>
      <div className={classes.msgWrapper}>
        <div className={classes.msg}>{props.msg}</div>
      </div>
    </div>
  );
}

export default Post;