import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { AuthUserData } from '../../redux/authReducer';


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.AuthUserData();
  }

  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  isLogin: state.auth.isLogin
});

export default connect(mapStateToProps, { AuthUserData })(HeaderContainer);