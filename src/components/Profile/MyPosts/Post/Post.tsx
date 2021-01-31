import React from 'react';
import classes from './Post.module.css';

type PropsType = {
  img: string | null
  msg: string
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <img src={props.img!} alt='user'></img>
      <div className={classes.bar}></div>
      <p className={classes.msg}>{props.msg}</p>
    </div>
  );
}

export default Post;