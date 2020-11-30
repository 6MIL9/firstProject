import { AuthUserData } from './authReducer';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes> // void ?

export const initializeApp = (): ThunkType => {
    return (dispatch) => {
        let promise = dispatch(AuthUserData());
        promise.then(() => {
            dispatch(initializedSuccess());
        })
    }
}

export default appReducer;