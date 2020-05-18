import React from 'react';
import { followSuccess, setCurrentPage, unfollowSuccess, getUsers, follow, unfollow, toggleFollowingProgress} from '../../redux/usersReducer';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class UsersAPIComponent extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNum) => {
    this.props.getUsers(pageNum, this.props.pageSize);
  }
  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      < Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        unfollowSuccess={this.props.unfollowSuccess}
        followSuccess={this.props.followSuccess}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

const UsersContainer = compose(
  connect(mapStateToProps, { followSuccess, unfollowSuccess, setCurrentPage, getUsers, follow, unfollow, toggleFollowingProgress }),
  withAuthRedirect
)(UsersAPIComponent);

export default UsersContainer;  
