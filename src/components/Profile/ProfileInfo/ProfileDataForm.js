import React from 'react';
import { createField, Input, TextArea } from '../../common/FormsControls/FormsControls';
import classes from './ProfileInfo.module.css';
import { reduxForm } from 'redux-form';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit} className={classes.formWrapper}>
            {(error) && <div className={classes.formSummaryError}>
                {error}
            </div>}
            <div>
                Full name: {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                Looking for a job: {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                My skills: {createField("Your skill", "lookingForAJobDescription", [], TextArea)}
            </div>
            <div>
                Contacts: {Object.keys(profile.contacts).map(key => {
                return <div className={classes.contact} key={key}>
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

const ProfileDataFormRedux = reduxForm({ form: 'editProfile' })(ProfileDataForm);

export default ProfileDataFormRedux;
