import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';

function Dialogs(props) {

  let dialogsElem = props.dialogsPage.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);

  let messagesElem = props.dialogsPage.messagesData.map((message) => <Message message={message.message} key={message.id} />);

  let addDialog = () => {
    props.addMessage();
  }

  let onMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogItems}>
        {dialogsElem}
      </div>

      <div className={classes.messages}>
        {messagesElem}
      </div>

      <div className={classes.newDialog}>
        <div>
          <textarea 
          onChange={onMessageChange} 
          value={props.newMessageText}
          placeholder="Enter your message"></textarea>
        </div>
        <div>
          <button onClick={addDialog}>Send</button>
        </div>
      </div>

    </div >

  );
}

export default Dialogs;