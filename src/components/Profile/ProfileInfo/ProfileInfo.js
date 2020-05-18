import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={classes.description}>
        <img src={props.profile.photos.small} alt='фото отсутсвует' />

        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>

  );
}

export default ProfileInfo;