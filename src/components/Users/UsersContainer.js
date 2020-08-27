import React from 'react';
import { followSuccess, setCurrentPage, unfollowSuccess, requestUsers, follow, unfollow, toggleFollowingProgress } from '../../redux/usersReducer';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/userSelectors'


class UsersAPIComponent extends React.Component {

  componentDidMount() {
    let {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNum) => {
    let {pageSize} = this.props;
    this.props.requestUsers(pageNum, pageSize);
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

const UsersContainer = compose(
  connect(mapStateToProps, { followSuccess, unfollowSuccess, setCurrentPage, requestUsers, follow, unfollow, toggleFollowingProgress }),
)(UsersAPIComponent);

export default UsersContainer;  
