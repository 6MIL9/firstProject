import React, { useEffect } from 'react';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatus, } from '../../redux/profileReducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

type PathParamsType = {
  userId: string,
}

type PropsType = RouteComponentProps<PathParamsType>

const ProfilePage: React.FC<PropsType> = (props) => {

  useEffect(() => {
    refreshProfile()
  }, [])

  useEffect(() => {
    refreshProfile();
  }, [props.match.params.userId])

  const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
  const dispatch = useDispatch()
  const getProfileCB = (userId: number) => {
    dispatch(getProfile(userId))
  }
  const getStatusCB = (userId: number) => {
    dispatch(getStatus(userId))
  }

  const refreshProfile = () => {
    let userId: number | null = +props.match.params.userId;

    if (!userId) {
      userId = authorizedUserId;

      if (!userId) {
        props.history.push('/login');
      }
    }

    if (!userId) {
      // throw new Error('ID should exist')
      console.log('ID should exist')
    } else {
      getProfileCB(userId);
      getStatusCB(userId);
    }
  }

  return (
    <>
      <Profile isOwner={!props.match.params.userId} />
    </>
  );
}

export default withRouter(ProfilePage);

