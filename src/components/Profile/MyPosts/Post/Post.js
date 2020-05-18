import React from 'react';
import classes from './Post.module.css';

function Post(props) {
  return (
    <div className={classes.item}>
      <img src="https://avatars.mds.yandex.net/get-pdb/1751508/6ab1874b-761a-4641-9586-8a242d22b828/s1200"></img>
      {props.msg}
      <div>
        <span>Like {props.likesCnt}</span>
      </div>

    </div>
  );
}

export default Post;