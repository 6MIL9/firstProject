import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import { Field, reduxForm } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { TextArea } from '../common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(150);

const AddDialogsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name='newMessageText' placeholder='Enter your message' validate={[requiredField, maxLength]}></Field>
      </div>
      <div><button>Send</button></div>
    </form>
  );
}

const AddDialogsFormRedux = reduxForm({ form: 'AddDialogsForm' })(AddDialogsForm);


function Dialogs(props) {

  let dialogsElem = props.dialogsPage.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} message={dialog.message}/>);

  const addNewMessage = (formData) => {
    props.addMessage(formData.newMessageText);
  }

  return (
    <div className={classes.dialogs}>
      <div>
        {dialogsElem}
      </div>

      <div className={classes.newDialog}>
        <AddDialogsFormRedux onSubmit={addNewMessage} />
      </div>
    </div >
  );
}

export default Dialogs;