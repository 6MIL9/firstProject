import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHook from './ProfileStatusWithHook';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={classes.description}>
        <img src={props.profile.photos.small} alt='фото отсутсвует' />

        <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>

  );
}

export default ProfileInfo;