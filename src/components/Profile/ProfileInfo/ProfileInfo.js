import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import defaultPhoto from '../../../assets/img/noAvatar.jpg';
import { NavLink } from 'react-router-dom';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  // const onSubmit = (formData) => {
  //   saveProfile(formData);
  //   console.log(formData)
  // }

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
        {/* <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} /> */}
        <ProfileData profile={profile} isOwner={isOwner} status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

const ProfileData = ({ profile, isOwner, status, updateStatus }) => {

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
        <ProfileStatusWithHook status={status} updateStatus={updateStatus} />
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
          {/* {isOwner && <button onClick={activateEditMode} className={classes.btn}>Edit</button>} */}
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
                return <Contact contactTitle={key} contactValue={profile.contacts[key]} key={key} />
              })}
            </div>
          </div>
        }
      </div>
    </div>
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={classes.contact}>
    {contactTitle}: {!contactValue ? "not stated" : contactValue}
  </div>
}

export default ProfileInfo;