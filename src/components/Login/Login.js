import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { login } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { Input } from '../common/FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import classes from "../common/FormsControls/FormsControls.module.css";

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} name={'email'} component={Input} validate={[requiredField]} />
                </div>

                <div>
                    <Field placeholder={'Password'} name={'password'} component={Input} type="password" validate={[requiredField]} />
                </div>

                <div>
                    <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
                </div>

                {(props.error) && <div className={classes.formSummaryError}>
                    {props.error}
                </div>}

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
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;