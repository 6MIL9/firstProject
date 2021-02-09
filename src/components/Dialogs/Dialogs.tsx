import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { TextArea } from '../common/FormsControls/FormsControls';
import { InitialStateType } from '../../redux/dialogsReducer';
import { createField } from './../common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(150);

type AddDialogsFormValuesType = {
  newMessageText: string
}

type PropsType = {}

type AddDialogsFormValuesTypeKeys = Extract<keyof AddDialogsFormValuesType, string>

const AddDialogsForm: React.FC<InjectedFormProps<AddDialogsFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddDialogsFormValuesTypeKeys>('Enter your message', 'newMessageText', [requiredField, maxLength], TextArea)}
      </div>
      <div><button className={classes.btn}>Send</button></div>
    </form>
  );
}

const AddDialogsFormRedux = reduxForm<AddDialogsFormValuesType, PropsType>({ form: 'AddDialogsForm' })(AddDialogsForm);

type OwnPropsDialogs = {
  dialogsPage: InitialStateType
  addMessage: (newMessage: string) => void
}

const Dialogs: React.FC<OwnPropsDialogs> = (props) => {

  let dialogsElem = props.dialogsPage.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} message={dialog.message} />);

  const addNewMessage = (formData: AddDialogsFormValuesType) => {
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