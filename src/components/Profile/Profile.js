import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

function Profile(props) {
  return (
    <div className={classes.content}>
      <ProfileInfo profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;