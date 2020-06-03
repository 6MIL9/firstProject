import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defaultPhoto from '../../../assets/img/noAvatar.jpg';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />
  }

  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={classes.description}>
        <img src={profile.photos.large || defaultPhoto} alt='фото отсутсвует' className={classes.userPhoto} />
        {isOwner && <input type='file' onChange={onPhotoSelected} />}
        <ProfileStatusWithHook status={status} updateStatus={updateStatus} />
      </div>
    </div>

  );
}

export default ProfileInfo;