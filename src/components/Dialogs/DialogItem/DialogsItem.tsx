import React from 'react';
import classes from './../Dialogs.module.css';
import defaultPhoto from '../../../assets/img/noAvatar.jpg';

type PropsType = {
  name: string | undefined
  message: string
  id: number
}

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <img src={defaultPhoto} alt='фото отсутсвует' className={classes.avatar} />

      <div className={classes.name}>{props.name}</div>

      <div className={classes.message}>{props.message}</div>
    </div>
  );
}

export default DialogItem;