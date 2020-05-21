import { authAPI } from '../API/Api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_LOGIN = 'SET_LOGIN';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isLogin: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.data,
            };
        }

        case SET_LOGIN: {
            return {
                ...state,
                isLogin: true
            };
        }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => {
    return {
        type: SET_AUTH_USER_DATA,
        data: { userId, email, login }
    };
}

export const AuthUserData = () => {
    return (dispatch) => {
        authAPI.getAuthUserData().then(data => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
    }
}

export const setLogin = () => {
    return {
        type: SET_LOGIN
    };
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.sentLoginData(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setLogin());
            } else {
                console.log('error');
                alert('Вы ввели неверные данные');
            }
        });
    }
}

export default authReducer;