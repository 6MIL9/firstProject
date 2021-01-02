import { ResultCodes } from '../API/Api';
import { stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../Types/Types';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { userProfileAPI } from './../API/userProfileAPI';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    postsData: [
        { id: 1, post: 'Hi, how are you?', likesCnt: 3 },
        { id: 2, post: 'Nice day to walk', likesCnt: 2 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST: {
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

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo }
            }
        }

        default:
            return state;
    }
}

type AddPostCreatorAT = {
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileAT = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType | null
}
type SetStatusAT = {
    type: typeof SET_STATUS
    status: string
}
type DeletePostAT = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessAT = {
    type: typeof SAVE_PHOTO_SUCCESS
    photo: PhotosType
}

type ActionsTypes = AddPostCreatorAT | SetUserProfileAT | SetStatusAT | DeletePostAT | SavePhotoSuccessAT

export const addPostCreator = (newPostText: string): AddPostCreatorAT => {
    return {
        type: ADD_POST,
        newPostText
    }
}

export const setUserProfile = (profile: ProfileType | null): SetUserProfileAT => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setStatus = (status: string): SetStatusAT => {
    return {
        type: SET_STATUS,
        status
    }
}

export const deletePost = (postId: number): DeletePostAT => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const savePhotoSuccess = (photo: PhotosType): SavePhotoSuccessAT => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photo
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfile = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let response = await userProfileAPI.getUserProfile(userId);
        dispatch(setUserProfile(response.data));
    }
}


export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let response = await userProfileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}


export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: any) => {
        try {
            let response = await userProfileAPI.updateStatus(status)

            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setStatus(status));
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const savePhoto = (photo: any): ThunkType => {
    return async (dispatch: any) => {
        let response = await userProfileAPI.savePhoto(photo)

        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId;
        let response = await userProfileAPI.saveProfile(profile)

        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(getProfile(userId));
        } else {
            dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));
            return Promise.reject(response.data.messages[0]);
        }
    }
}

export default profileReducer;