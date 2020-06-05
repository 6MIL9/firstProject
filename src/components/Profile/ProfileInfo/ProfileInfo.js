import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defaultPhoto from '../../../assets/img/noAvatar.jpg';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false);

  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    )
    console.log(formData)
  }

  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={classes.description}>
      <img src={profile.photos.large || defaultPhoto} alt='фото отсутсвует' className={classes.userPhoto} />
      {isOwner && <input type='file' onChange={onPhotoSelected} />}

      {editMode
        ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} />
        : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={() => setEditMode(true)} />}

      <ProfileStatusWithHook status={status} updateStatus={updateStatus} />
    </div>
  );
}

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
  return <div>
    <div>
      {isOwner && <button onClick={activateEditMode}>Edit</button>}
    </div>
    <div>
      Full name: {profile.fullName}
    </div>
    <div>
      About me: {profile.aboutMe}
    </div>
    <div>
      Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
    </div>
    {profile.lookingForAJob && <div>
      My skills: {profile.lookingForAJobDescription}
    </div>}
    <div>
      Contacts: {Object.keys(profile.contacts).map(key => {
      return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key} />
    })}
    </div>
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={classes.contact}>
    {contactTitle}: {!contactValue ? "not stated" : contactValue}
  </div>
}

export default ProfileInfo;