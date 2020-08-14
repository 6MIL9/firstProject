import { userProfileAPI } from '../API/Api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    postsData: [
        { id: 1, post: 'Hi, how are you?', likesCnt: 3 },
        { id: 2, post: 'Nice day to walk', likesCnt: 2 },
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
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
                postsData: state.postsData.filter(p => p.id != action.postId)
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

export const addPostCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const savePhotoSuccess = (photo) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photo
    }
}

export const getProfile = (userId) => {
    return async (dispatch) => {
        let response = await userProfileAPI.getUserProfile(userId);
        dispatch(setUserProfile(response.data));
    }
}


export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await userProfileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}


export const updateStatus = (status) => {
    return async (dispatch) => {
        try {
            let response = await userProfileAPI.updateStatus(status)

            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const savePhoto = (photo) => {
    return async (dispatch) => {
        let response = await userProfileAPI.savePhoto(photo)

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await userProfileAPI.saveProfile(profile)

        if (response.data.resultCode === 0) {
            dispatch(getProfile(userId));
        } else {
            dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }));
            return Promise.reject(response.data.messages[0]);
        }
    }
}

export default profileReducer;