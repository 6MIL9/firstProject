import React from 'react';
import classes from './Users.module.css';
import User from './User';
import { UserType } from '../../Types/Types';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType } from '../../redux/usersReducer';

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (page: number) => void
  onFilterChanged: (filter: FilterType) => void
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({ currentPage, onPageChanged, onFilterChanged, totalUsersCount, pageSize, users, ...props }) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
      <div className={classes.wrapper}>
        {
          users.map((u) => <User user={u}
            key={u.id}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow} />)
        }
      </div>
    </div >
  );
}

export default Users;

