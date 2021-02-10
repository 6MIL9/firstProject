import { ResultCodes, ResultCodesForCaptcha } from '../API/Api';
import { authAPI } from '../API/authApi'
import { securityAPI } from './../API/securityApi';
import { stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_AUTH_USER_DATA': {
            return {
                ...state,
                ...action.payload
            };
        }

        case 'auth/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
}

const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_AUTH_USER_DATA', payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
    } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const AuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.getAuthUserData();

        if (response.resultCode === ResultCodes.Success) {
            let { id, email, login } = response.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => { 
    return async (dispatch: any) => {
        let response = await authAPI.sentLoginData(email, password, rememberMe, captcha);

        if (response.resultCode === ResultCodes.Success) {
            dispatch(AuthUserData());
        } else {
            if (response.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = response.messages.length > 0 ? response.messages[0] : 'Email or password is wrong';
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptcha();
        const captchaUrl = response.data.url;

        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        debugger
        let response = await authAPI.logout();
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;