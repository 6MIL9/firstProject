import {AuthUserData} from './authReducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
}

export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    };
}

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(AuthUserData());
        promise.then( () => {
            dispatch(initializedSuccess());
        })
    }
}

export default appReducer;