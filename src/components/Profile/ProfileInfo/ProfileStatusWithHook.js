import React, { useState, useEffect } from 'react';

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
                <div onDoubleClick={activateEditMode}>
                    <span >Status: {props.status || '-------'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onBlur={deactivateEditMode} autoFocus={true} onChange={onStatusChange} value={status}></input>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHook;