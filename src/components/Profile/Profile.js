import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from './../common/Preloader/Preloader';

function Profile(props) {
  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <div className={classes.content}>
      <ProfileInfo profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile} />
      <MyPostsContainer img={props.profile.photos.small} />
    </div>
  )
}

export default Profile;