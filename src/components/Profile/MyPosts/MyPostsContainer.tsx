import MyPosts from './MyPosts';
import { actions } from '../../../redux/profileReducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { PostType } from '../../../Types/Types';

type MapStatePropsType = {
  postsData: Array<PostType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    postsData: state.profilePage.postsData
  }
}

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    addPost: (newPostText) => {
      dispatch(actions.addPostCreator(newPostText));
    }
  }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;  