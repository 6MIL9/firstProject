import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={classes.description}>
        <img src={profile.photos.small} alt='фото отсутсвует' />

        <ProfileStatusWithHook status={status} updateStatus={updateStatus}/>
      </div>
    </div>

  );
}

export default ProfileInfo;