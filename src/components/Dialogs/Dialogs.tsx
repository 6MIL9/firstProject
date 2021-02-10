import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { TextArea } from '../common/FormsControls/FormsControls';
import { actions } from '../../redux/dialogsReducer';
import { createField } from './../common/FormsControls/FormsControls';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';

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

const Dialogs: React.FC = () => {

  const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)
  const dispatch = useDispatch()
  const addMessage = (newMessage: string) => {
    dispatch(actions.addMessage(newMessage))
  }
  let dialogsElem = dialogsPage.dialogsData.map((dialog) => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} message={dialog.message} />);

  const addNewMessage = (formData: AddDialogsFormValuesType) => {
    addMessage(formData.newMessageText);
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

const DialogsContainer = withAuthRedirect(Dialogs);

export default DialogsContainer;

