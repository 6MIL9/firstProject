import { AuthUserData } from './authReducer';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

let initialState = {
    initialized: false
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const ) 
}

type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = (): ThunkType => {
    return async (dispatch) => {
        let promise = dispatch(AuthUserData());
        promise.then(() => {
            dispatch(actions.initializedSuccess());
        })
    }
}

export default appReducer;