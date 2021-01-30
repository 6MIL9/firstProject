import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { GetStringKeys, TextArea } from '../../common/FormsControls/FormsControls';
import { PostType } from '../../../Types/Types';
import { createField } from './../../common/FormsControls/FormsControls';

const maxLength100 = maxLengthCreator(100);

type PropsType = {
  postsData: Array<PostType>
  img: string | null
  addPost: (newPostText: string) => void 
}

const MyPosts: React.FC<PropsType> = (props) => {

  let postsElem = props.postsData.map((post: PostType) => <Post msg={post.post} key={post.id} img={props.img}/>);
  const onSubmit = (formData: AddNewFormValuesType) => {
    props.addPost(formData.newPostText)
  }

  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.title}>My posts</h3>
      <div className={classes.postsWrapper}>
        <AddNewFormRedux onSubmit={onSubmit}/>
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
    <form onSubmit={props.onSubmit}>
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