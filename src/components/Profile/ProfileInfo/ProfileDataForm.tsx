import React from 'react';
import { createField, GetStringKeys, Input, TextArea } from '../../common/FormsControls/FormsControls';
import classes from './ProfileInfo.module.css';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { ProfileType } from '../../../Types/Types';

type PropsType = {
    profile: ProfileType
    initialValues: ProfileType
    onSubmit: any
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={classes.formWrapper}>
            {(error) && <div className={classes.formSummaryError}>
                {error}
            </div>}
            <div>
                Full name: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
            </div>
            <div>
                Looking for a job: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                My skills: {createField<ProfileTypeKeys>("Your skill", "lookingForAJobDescription", [], TextArea)}
            </div>
            <div>
                Contacts: {Object.keys(profile.contacts).map(key => {
                return <div className={classes.contact} key={key}>
                    {/* create solution for type createField */}
                    {key}: {createField(key, "contacts." + key, [], Input)} 
                </div>
            })}
            </div>
            <div className={classes.btnWrapper}>
                <button className={classes.btn}>Save</button>
            </div>
        </form>
    );
}

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileDataForm);

export default ProfileDataFormRedux;
