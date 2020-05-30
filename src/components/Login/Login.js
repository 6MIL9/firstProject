import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { login } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import classes from "../common/FormsControls/FormsControls.module.css";

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>

                {createField('Email', 'email', [requiredField], Input)}
                {createField('Password', 'password', [requiredField], Input, { type: "password" })}
                {createField(null, 'rememberMe', [], Input, { type: "checkbox" }, 'remember me')}

                {(error) && <div className={classes.formSummaryError}>
                    {error}
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