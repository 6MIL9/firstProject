import React from 'react';
import Header, { MapStateType, MapDispatchType } from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

class HeaderContainer extends React.Component<MapStateType & MapDispatchType> {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer);