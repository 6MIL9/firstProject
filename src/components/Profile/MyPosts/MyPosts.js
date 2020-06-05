import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

function MyPosts(props) {

  let postsElem = props.postsData.map((post) => <Post msg={post.post} key={post.id} likesCnt={post.likesCnt} />);

  let onAddPost = (formData) => {
    props.addPost(formData.newPostText)
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddNewFormRedux onSubmit={onAddPost} />
      <div className={classes.posts}>
        {postsElem}
      </div>
    </div >

  );
}

const AddNewForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name='newPostText' placeholder='Enter your post' validate={[requiredField, maxLength10]}></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
}

const AddNewFormRedux = reduxForm({ form: 'AddPostForm' })(AddNewForm);

export default MyPosts;