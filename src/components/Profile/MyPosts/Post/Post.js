import React from 'react';
import classes from './Post.module.css';

function Post(props) {
  return (
    <div className={classes.item}>
      <img src={props.img} alt='user'></img>
      <div className={classes.bar}></div>
      <p className={classes.msg}>{props.msg}</p>
    </div>
  );
}

export default Post;