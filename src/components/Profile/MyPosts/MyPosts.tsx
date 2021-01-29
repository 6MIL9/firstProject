import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControls/FormsControls';

const maxLength100 = maxLengthCreator(100);

type PropsType = {
  postsData: any
  formData: any
  img: any
  addPost: any
}

const MyPosts: React.FC<PropsType> = (props) => {

  let postsElem = props.postsData.map((post) => <Post msg={post.post} key={post.id} img={props.img}/>);

  let onAddPost = (formData: any) => {
    props.addPost(formData.newPostText)
  }

  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.title}>My posts</h3>
      <div className={classes.postsWrapper}>
        <AddNewFormRedux onSubmit={onAddPost}/>
        <div className={classes.posts}>
          {postsElem}
        </div>
      </div>
    </div >

  );
}

type AddNewFormOwnProps = {
  handleSubmit: any
}

type AddNewFormValuesType = {
  newPostText: string
}

const AddNewForm: React.FC<InjectedFormProps<AddNewFormValuesType, AddNewFormOwnProps> & AddNewFormOwnProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} className={classes.textArea} name='newPostText' placeholder='Enter your post' validate={[requiredField, maxLength100]}></Field>
      </div>
      <div className={classes.btnWrapper}>
        <button className={classes.btn}>Add post</button>
      </div>
    </form>
  );
}

const AddNewFormRedux = reduxForm<AddNewFormValuesType, AddNewFormOwnProps>({ form: 'AddPostForm' })(AddNewForm);

export default MyPosts;