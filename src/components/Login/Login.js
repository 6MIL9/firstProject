import React from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import classes from "../common/FormsControls/FormsControls.module.css";

const style = {
    display: 'inline-block'
}

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.loginWrapper}>
                <h1>Login</h1>
                <form className={classes.loginForm} onSubmit={handleSubmit}>

                    {createField('Email', 'email', [requiredField], Input)}
                    {createField('Password', 'password', [requiredField], Input, { type: "password" })}
                    {createField(null, 'rememberMe', [], Input, { type: "checkbox" }, style)}

                    {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                    {captchaUrl && createField('Symbols from image', 'captcha', [requiredField], Input)}

                    {(error) && <div className={classes.formSummaryError}>
                        {error}
                    </div>}

                    <div>
                        <button className={classes.btn}>Login</button>
                    </div>
                </form>
            </div >
        </div>
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;