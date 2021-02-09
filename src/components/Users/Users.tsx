import React, { useEffect } from 'react';
import classes from './Users.module.css';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, requestUsers } from '../../redux/usersReducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsers, getFilter, getFollowingInProgress } from './../../redux/userSelectors';
import { useDispatch, useSelector } from 'react-redux';

const Users: React.FC = () => {

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsers)
  const filter = useSelector(getFilter)
  const followingInProgress = useSelector(getFollowingInProgress)
  const dispatch = useDispatch()
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const onPageChanged = (pageNum: number) => {
    dispatch(requestUsers(pageNum, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
      <div className={classes.wrapper}>
        {
          users.map((u) => <User user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow} />)
        }
      </div>
    </div >
  );
}

export default Users;

