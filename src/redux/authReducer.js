import { authAPI } from '../API/Api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: { userId, email, login, isAuth }
    };
}

export const AuthUserData = () => {
    return async (dispatch) => {
        let response = await authAPI.getAuthUserData();

        if (response.data.resultCode === 0) {
            let { id, email, login } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.sentLoginData(email, password, rememberMe);

        if (response.data.resultCode === 0) {
            dispatch(AuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Email or password is wrong';
            dispatch(stopSubmit("login", { _error: message }));
        }
    }
}


export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;