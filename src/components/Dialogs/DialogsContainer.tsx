import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
  dialogsPage: any
}

type MapDispatchPropsType = {
  addMessage: (newMessage: string) => void
}

type OwnPropsType = {
  
}

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    addMessage: (newMessage: string) => {
      dispatch(actions.addMessageCreator(newMessage));
    }
  }
}

const DialogsContainer = compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;