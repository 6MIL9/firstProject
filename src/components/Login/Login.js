import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
// import { setLogin, login } from '../../redux/loginReducer';
import { login } from '../../redux/authReducer';
import { loginAPI } from '../../API/Api';

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'login'} name={'login'} component={'input'} />
                </div>

                <div>
                    <Field placeholder={'Password'} name={'Password'} component={'input'} type="password" />
                </div>

                <div>
                    <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
                </div>

                <div>
                    <button>Login</button>
                </div>
            </form>

            <button onClick={loginAPI.sentLoginData}>test</button>
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
        <LoginReduxForm onSubmit={onSubmit} />
    </>
}

const mapStateToProps = (state) => {
    return {

    }
}

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;