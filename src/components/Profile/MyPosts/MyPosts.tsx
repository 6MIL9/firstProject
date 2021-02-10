import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { GetStringKeys, TextArea } from '../../common/FormsControls/FormsControls';
import { PostType } from '../../../Types/Types';
import { createField } from './../../common/FormsControls/FormsControls';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { actions } from '../../../redux/profileReducer';

const maxLength100 = maxLengthCreator(100);

type PropsType = {
  img: string | null
}

const MyPosts: React.FC<PropsType> = (props) => {

  const postsData = useSelector((state: AppStateType) => state.profilePage.postsData)
  const dispatch = useDispatch()
  const addPost = (newPostText: string) => {
    dispatch(actions.addPostCreator(newPostText))
  }

  let postsElem = postsData.map((post: PostType) => <Post msg={post.post} key={post.id} img={props.img} />);

  const onSubmit = (formData: AddNewFormValuesType) => {
    addPost(formData.newPostText)
    console.log(formData)
  }

  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.title}>My posts</h3>
      <div className={classes.postsWrapper}>
        <AddNewFormRedux onSubmit={onSubmit} />
        <div className={classes.posts}>
          {postsElem}
        </div>
      </div>
    </div >

  );
}

type AddNewFormOwnProps = {
  onSubmit: any
}

type AddNewFormValuesType = {
  newPostText: string
}

type LoginFormValuesTypeKeys = GetStringKeys<AddNewFormValuesType>

const AddNewForm: React.FC<InjectedFormProps<AddNewFormValuesType, AddNewFormOwnProps> & AddNewFormOwnProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<LoginFormValuesTypeKeys>('Enter your post', 'newPostText', [requiredField, maxLength100], TextArea)}
      </div>
      <div className={classes.btnWrapper}>
        <button className={classes.btn}>Add post</button>
      </div>
    </form>
  );
}

const AddNewFormRedux = reduxForm<AddNewFormValuesType, AddNewFormOwnProps>({ form: 'AddPostForm' })(AddNewForm);

export default MyPosts;