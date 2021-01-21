import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { TextArea } from '../common/FormsControls/FormsControls';
import { InitialStateType } from '../../redux/dialogsReducer';

const maxLength = maxLengthCreator(150);

const AddDialogsForm: React.FC<InjectedFormProps<{newMessageText: string}, {}> > = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name='newMessageText' placeholder='Enter your message' validate={[requiredField, maxLength]}></Field>
      </div>
      <div><button className={classes.btn}>Send</button></div>
    </form>
  );
}

const AddDialogsFormRedux = reduxForm({ form: 'AddDialogsForm' })(AddDialogsForm);

type OwnPropsDialogs = {
  dialogsPage: InitialStateType
  addMessage: (newMessage: string) => void
}

const Dialogs: React.FC<OwnPropsDialogs> = (props) => {

  let dialogsElem = props.dialogsPage.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} message={dialog.message} />);

  const addNewMessage = (formData: any) => {
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