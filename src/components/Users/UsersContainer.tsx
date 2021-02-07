import React from 'react';
import { requestUsers, follow, unfollow, FilterType } from '../../redux/usersReducer';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/userSelectors'
import { UserType } from '../../Types/Types';
import { AppStateType } from '../../redux/reduxStore';
import { getFilter } from './../../redux/userSelectors';

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>,
  filter: FilterType
}

type MapDispatchPropsType = {
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  requestUsers: (pageNum: number, pageSize: number, filter: FilterType) => void
}

type OwnPropsType = {
  
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersAPIComponent extends React.Component<PropsType> {

  componentDidMount() {
    let { currentPage, pageSize, filter } = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNum: number) => {
    let {filter, pageSize } = this.props;
    this.props.requestUsers(pageNum, pageSize, filter);
  }

  onFilterChanged = (filter: FilterType) => {
    let { pageSize } = this.props;
    this.props.requestUsers(1, pageSize, filter);
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      < Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        onFilterChanged={this.onFilterChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getFilter(state)
  }
}

const UsersContainer = compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { requestUsers, follow, unfollow }),
)(UsersAPIComponent);

export default UsersContainer;  
