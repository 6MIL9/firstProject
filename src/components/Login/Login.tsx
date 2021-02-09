import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Input, createField, GetStringKeys } from '../common/FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import classes from "../common/FormsControls/FormsControls.module.css";
import { AppStateType } from '../../redux/reduxStore';

const style = {
    display: 'inline-block'
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.loginWrapper}>
                <h1>Login</h1>
                <form className={classes.loginForm} onSubmit={handleSubmit}>

                    {createField<LoginFormValuesTypeKeys>('Email', 'email', [requiredField], Input)}
                    {createField<LoginFormValuesTypeKeys>('Password', 'password', [requiredField], Input, { type: "password" })}
                    {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: "checkbox" }, style)}

                    {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                    {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [requiredField], Input)}

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

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);



const Login: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </>
}

export default Login;