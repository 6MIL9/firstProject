import React from 'react';
import { useSelector } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { getIsFetching } from '../../redux/userSelectors'

const UsersPage: React.FC = () => {
  const isFetching = useSelector(getIsFetching)
  return <>
    {isFetching ? <Preloader /> : null}
    <Users />
  </>
}

export default UsersPage