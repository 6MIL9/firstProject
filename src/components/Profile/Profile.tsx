import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';
import { PhotosType, ProfileType } from '../../Types/Types';

type PropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (photo: PhotosType) => void
  saveProfile: (profile: ProfileType) => void
}

const Profile: React.FC<PropsType> = (props) => {
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