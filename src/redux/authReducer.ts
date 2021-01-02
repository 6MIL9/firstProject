import { ResultCodes, ResultCodesForCaptcha } from '../API/Api';
import { authAPI } from '../API/authApi'
import { securityAPI } from './../API/securityApi';
import { stopSubmit } from 'redux-form';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }

        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessType

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: { userId, email, login, isAuth }
    };
}

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    };
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const AuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.getAuthUserData();

        if (response.resultCode === ResultCodes.Success) {
            let { id, email, login } = response.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => { // ошибка почему-то падает
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

        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;