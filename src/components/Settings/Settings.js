import React from 'react';
import classes from './Settings.module.css';
import ProfileDataForm from '../Profile/ProfileInfo/ProfileDataForm';
import Preloader from '../common/Preloader/Preloader';
import { ProfileType } from '../../Types/Types';

// type PropsType = {
//     profile: ProfileType
//     saveProfile: (userId: number) => void
// }

const Settings = ({ profile, saveProfile }) => {

    const onSubmit = (formData) => {
        saveProfile(formData)
    }

    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={classes.wrapper}>
            <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} />
        </div>
    )
}

export default Settings;
