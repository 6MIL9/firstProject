import { ResultCodes } from '../API/Api';
import { FormAction, stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../Types/Types';
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { userProfileAPI } from './../API/userProfileAPI';

let initialState = {
    postsData: [
        { id: 1, post: 'Hi, how are you?', likesCnt: 3 },
        { id: 2, post: 'Nice day to walk', likesCnt: 2 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

export type InitialState = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'profile/ADD-POST': {
            let newPost = {
                id: 6,
                post: action.newPostText,
                likesCnt: 0
            };

            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }

        case 'profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }

        case 'profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }

        case 'profile/DELETE_POST': {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }

        case 'profile/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as ProfileType
            }
        }

        default:
            return state;
    }
}

export const actions = {
    addPostCreator: (newPostText: string) => ({
        type: 'profile/ADD-POST',
        newPostText
    } as const),
    setUserProfile: (profile: ProfileType | null) => ({
        type: 'profile/SET_USER_PROFILE',
        profile
    } as const),
    setStatus: (status: string) => ({
        type: 'profile/SET_STATUS',
        status
    } as const),
    deletePost: (postId: number) => ({
        type: 'profile/DELETE_POST',
        postId
    } as const),
    savePhotoSuccess: (photo: PhotosType) => ({
        type: 'profile/SAVE_PHOTO_SUCCESS',
        photo
    } as const),

}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const getProfile = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let response = await userProfileAPI.getUserProfile(userId);
        dispatch(actions.setUserProfile(response.data));
    }
}


export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let response = await userProfileAPI.getStatus(userId)
        dispatch(actions.setStatus(response.data));
    }
}


export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: any) => {
        try {
            let response = await userProfileAPI.updateStatus(status)

            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(actions.setStatus(status));
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const savePhoto = (photo: File): ThunkType => {
    return async (dispatch) => {
        let response = await userProfileAPI.savePhoto(photo)

        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await userProfileAPI.saveProfile(profile)

        if (response.data.resultCode === ResultCodes.Success) {
            if (userId != null) {
                dispatch(getProfile(userId));
            } else {
                throw new Error('user ID can`t be null')
            }
        } else {
            dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));
            return Promise.reject(response.data.messages[0]);
        }
    }
}

export default profileReducer;