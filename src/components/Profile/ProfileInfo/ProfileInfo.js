import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defaultPhoto from '../../../assets/img/noAvatar.jpg';

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={classes.description}>
        <img src={profile.photos.large } alt='фото отсутсвует' className={classes.userPhoto}/>

        <ProfileStatusWithHook status={status} updateStatus={updateStatus}/>
      </div>
    </div>

  );
}

export default ProfileInfo;