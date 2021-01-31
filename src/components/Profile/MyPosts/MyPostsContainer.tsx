import MyPosts from './MyPosts';
import { actions } from '../../../redux/profileReducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { PostType } from '../../../Types/Types';

type MapStatePropsType = {
  postsData: Array<PostType>
}

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    postsData: state.profilePage.postsData
  }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostCreator
})(MyPosts);

export default MyPostsContainer;  