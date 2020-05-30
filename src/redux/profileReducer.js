import { userProfileAPI } from '../API/Api';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';


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
        let response = await userProfileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export default profileReducer;