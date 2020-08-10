import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControls/FormsControls';

const maxLength100 = maxLengthCreator(100);

function MyPosts(props) {

  let postsElem = props.postsData.map((post) => <Post msg={post.post} key={post.id} img={props.img}/>);

  let onAddPost = (formData) => {
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

const AddNewForm = (props) => {
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

const AddNewFormRedux = reduxForm({ form: 'AddPostForm' })(AddNewForm);

export default MyPosts;