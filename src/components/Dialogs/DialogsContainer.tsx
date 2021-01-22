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

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

const DialogsContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;