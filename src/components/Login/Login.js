import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { login } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { Input } from '../common/FormsControls/FormsControls';
import { requiredField} from '../../utils/validators/validators';

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'login'} name={'login'} component={Input} validate={[requiredField]}/>
                </div>

                <div>
                    <Field placeholder={'Password'} name={'Password'} component={Input} type="password" validate={[requiredField]}/>
                </div>

                <div>
                    <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
                </div>

                <div>
                    <button>Login</button>
                </div>
            </form>
        </div >
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
        let email = formData.login;
        let password = formData.Password;
        let rememberMe = formData.rememberMe;
        props.login(email, password, rememberMe);

    }

    return <>
        <h1>Login</h1>
        {props.isLogin ? <h2>You are logged in to your profile</h2> : <LoginReduxForm onSubmit={onSubmit} />}
    </>
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin
    }
}

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;