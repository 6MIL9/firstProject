import React, { useEffect } from 'react';
import classes from './Users.module.css';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, follow, unfollow, requestUsers } from '../../redux/usersReducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsers, getFilter, getFollowingInProgress } from './../../redux/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring'

type URLParamsType = {
  term?: string,
  page?: string,
  friend?: string
}

const Users: React.FC = () => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsers)
  const filter = useSelector(getFilter)
  const followingInProgress = useSelector(getFollowingInProgress)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as URLParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null }
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true }
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false }
        break;
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {

    const quary: URLParamsType = {}

    if (!!filter.term) quary.term = filter.term
    if (filter.friend !== null) quary.friend = String(filter.friend)
    if (currentPage !== 1) quary.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(quary)
    })
  }, [filter, currentPage])

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const onPageChanged = (pageNum: number) => {
    dispatch(requestUsers(pageNum, pageSize, filter))
  }
  const followCB = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowCB = (userId: number) => {
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
            unfollow={unfollowCB}
            follow={followCB} />)
        }
      </div>
    </div >
  );
}

export default Users;

