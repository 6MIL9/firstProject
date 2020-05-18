import React from 'react';
import classes from './dialog.module.css';
import DialogItem from '../DialogItem/DialogsItem';
import Message from '../Message/Message';

function Dialog(props) {

    let dialogsElem = props.dialogsData.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} />);
  
    let messagesElem = props.messagesData.map((message) => <Message message={message.message} />);
  
    return (
      <div className={classes.dialogs}>
        {/* <div className={classes.dialogItems}>
          {dialogsElem}
        </div>
  
        <div className={classes.messages}>
          {messagesElem}
        </div> */}
        {dialogsElem}

        {messagesElem}

        
      </div >
  
    );
  }
  
  export default Dialog;