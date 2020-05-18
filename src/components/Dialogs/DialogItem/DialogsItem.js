import React from 'react';
import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {

  let path = "/dialogs/" + props.id;

  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <div className={classes.avatar}></div>
      <NavLink to={path} className={classes.link}>{props.name}</NavLink>
    </div>
  );
}

export default DialogItem;