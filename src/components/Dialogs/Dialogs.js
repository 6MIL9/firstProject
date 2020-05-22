import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import {TextArea} from '../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const AddDialogsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name='newMessageText' placeholder='Enter your message' validate={[requiredField, maxLength10]}></Field>
      </div>
      <div><button>Send</button></div>
    </form>
  );
}

const AddDialogsFormRedux = reduxForm({ form: 'AddDialogsForm' })(AddDialogsForm);


function Dialogs(props) {

  let dialogsElem = props.dialogsPage.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);

  let messagesElem = props.dialogsPage.messagesData.map((message) => <Message message={message.message} key={message.id} />);

  const addNewMessage = (formData) => {
    props.addMessage(formData.newMessageText);
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
        <AddDialogsFormRedux onSubmit={addNewMessage} />
      </div>
    </div >
  );
}

export default Dialogs;