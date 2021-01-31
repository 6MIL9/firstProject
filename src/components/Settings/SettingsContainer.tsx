import React from 'react';
import Settings from './Settings';
import { connect } from 'react-redux';
import { getProfile, saveProfile } from '../../redux/profileReducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileType } from '../../Types/Types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
  profile: ProfileType
  userId: number | null
}

type MapDispatchPropsType = {
  saveProfile:(profile: ProfileType) => void
  getProfile: (userId: number) => void
}

type PathParamsType = {
  userId: string,
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class SettingsContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId = this.props.userId;

    if (!userId) {
      this.props.history.push('/login');
    }
    if (!userId) {
      throw new Error('ID should exist')
    } else {
      this.props.getProfile(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  render() {
    return (
      <>
        <Settings profile={this.props.profile} saveProfile={this.props.saveProfile}/>
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    userId: state.auth.userId
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, { saveProfile, getProfile }),
  withRouter,
)(SettingsContainer);
