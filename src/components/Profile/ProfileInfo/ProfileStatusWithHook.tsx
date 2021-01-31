import React, { useState, useEffect, ChangeEvent } from 'react';
import classes from './ProfileStatusWithHook.module.css';


type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatusWithHook: React.FC<PropsType> = (props) => {

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setstatus(e.currentTarget.value);
    }

    return (
        <div>
            {props.isOwner &&
                <div>
                    {!editMode &&
                        <div onDoubleClick={activateEditMode} className={classes.wrapper}>
                            <span>{props.status || 'set a status'}</span>
                        </div>

                    }
                    {editMode &&
                        <div>
                            <input onBlur={deactivateEditMode} autoFocus={true} onChange={onStatusChange} value={status} className={classes.wrapper} spellCheck="false"></input>
                        </div>
                    }
                </div>
            }

            {!props.isOwner &&
                <div>
                    <span>{props.status || 'not stated'}</span>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHook;