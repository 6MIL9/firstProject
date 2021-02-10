import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../common/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import MyPosts from './MyPosts/MyPosts';

type PropsType = {
  isOwner: boolean
}

const Profile: React.FC<PropsType> = (props) => {

  const profile = useSelector((state: AppStateType) => state.profilePage.profile)

  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={classes.content}>
      <ProfileInfo profile={profile} isOwner={props.isOwner}/>
      {props.isOwner ? <MyPosts img={profile.photos.small}/> : null}
    </div>
  )
}

export default Profile;