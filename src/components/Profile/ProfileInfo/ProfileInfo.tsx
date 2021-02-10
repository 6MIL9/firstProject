import React, { ChangeEvent, useState } from 'react';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defaultPhoto from '../../../assets/img/noAvatar.jpg';
import { NavLink } from 'react-router-dom';
import { ContactsType, ProfileType } from '../../../Types/Types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import {updateStatus, savePhoto} from '../../../redux/profileReducer'

type PropsTypeProfileInfo = {
  profile: ProfileType
  isOwner: boolean
}

const ProfileInfo: React.FC<PropsTypeProfileInfo> = ({ profile, isOwner }) => {

  const status = useSelector((state: AppStateType) => state.profilePage.status)
  
  const dispatch = useDispatch()

  const updateStatusCB = (status: string) => {
    dispatch(updateStatus(status))
  }
  const savePhotoCB = (photo: any) => {
    dispatch(savePhoto(photo))
  }

  const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhotoCB(e.target.files[0])
    }
  }

  return (
    <div className={classes.description}>
      <div className={classes.imgWrapper}>
        <img src={profile.photos.large || defaultPhoto} alt='фото отсутсвует' className={classes.userPhoto} />
        {isOwner &&
          <>
            <input type="file" name="file" id="file" className={classes.inputfile} onChange={onPhotoSelected} />
            <label htmlFor="file">
              <p>Edit</p>
            </label>
          </>
        }
      </div>
      <div className={classes.dataWrapper}>
        <ProfileData profile={profile} isOwner={isOwner} status={status} updateStatus={updateStatusCB} />
      </div>
    </div>
  );
}

type ProfileDataPropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, status, updateStatus }) => {

  let [showInfo, setShowInfo] = useState(false);

  const showMoreInfo = () => {
    setShowInfo(true);
  }

  const hideInfo = () => {
    setShowInfo(false);
  }
  return <div className={classes.profileDataWrapper}>
    <div className={classes.dataTop}>
      <h3>
        {profile.fullName}
      </h3>
      <div>
        <ProfileStatusWithHook status={status} updateStatus={updateStatus} isOwner={isOwner} />
      </div>
    </div>

    <div className={classes.dataBottom}>
      <div className={classes.mainInfoWrapper}>
        <div>
          Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob && <div>
          My skills: {profile.lookingForAJobDescription}
        </div>}
        <div className={classes.editBtnWrapper}>
          {isOwner && <NavLink to="/settings" className={classes.btn}>Edit</NavLink>}
        </div>
      </div>

      <div className={classes.moreInfoWrapper}>
        {!showInfo &&
          <button onClick={showMoreInfo} className={classes.btn}>Show contacts</button>
        }

        {showInfo &&
          <div className={classes.hideInfoWrapper}>
            <div className={classes.contactsWrapper} onClick={hideInfo}>
              {Object.keys(profile.contacts).map(key => {
                return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} key={key} />
              })}
            </div>
          </div>
        }
      </div>
    </div>
  </div>
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return <div className={classes.contact}>
    {contactTitle}: {!contactValue ? "not stated" : contactValue}
  </div>
}

export default ProfileInfo;