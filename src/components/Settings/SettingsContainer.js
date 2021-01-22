import React from 'react';
import Settings from './Settings';
import { connect } from 'react-redux';
import { getProfile, saveProfile } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// type MapStatePropsType = {
//   profile: ProfileType
//   userId: number | null
// }

// type MapDispatchPropsType = {
//   saveProfile:(userId: number) => void
//   getProfile: (userId: number) => void
// }

// type OwnPropsType = {}

// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class SettingsContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.userId;

    if (!userId) {
      this.props.history.push('/login');
    }

    this.props.getProfile(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  render() {
    return (
      <>
        <Settings {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    userId: state.auth.userId
  }
}

export default compose(
  connect(mapStateToProps, { saveProfile, getProfile }),
  withRouter,
)(SettingsContainer);
