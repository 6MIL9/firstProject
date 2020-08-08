import React, { useState, useEffect } from 'react';
import classes from './ProfileStatusWithHook.module.css';

const ProfileStatusWithHook = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setstatus] = useState(props.status);

    useEffect(() => {
        setstatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setstatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div onDoubleClick={activateEditMode} className={classes.wrapper}>
                    <span>{props.status || 'set a status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onBlur={deactivateEditMode} autoFocus={true} onChange={onStatusChange} value={status} className={classes.wrapper}></input>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHook;