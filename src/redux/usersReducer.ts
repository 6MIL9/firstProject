import { usersAPI } from '../API/Api';
import { PhotosType, UserType } from '../Types/Types';
import { updateObjectInArray } from '../utils/objectHelpers'

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOOGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOOGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [1, 2] as Array<number>
};

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {

        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            };
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };
        }

        case SET_USERS: {
            return { ...state, users: action.users };
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }

        case SET_TOTAL_COUNT: {
            return { ...state, totalUsersCount: action.totalCount };
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        }

        default:
            return state;
    }
}

type FollowSuccessAT = {
    type: typeof FOLLOW,
    userId: number
}
type UnfollowSuccessAT = {
    type: typeof UNFOLLOW,
    userId: number
}
type SetUsersAT = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
type SetCurrentPageAT = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type SetUsersTotalCountAT = {
    type: typeof SET_TOTAL_COUNT,
    totalCount: number
}
type ToggleIsFetchingAT = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
type ToggleFollowingProgressAT = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number

}

export const followSuccess = (userId: number): FollowSuccessAT => {
    return {
        type: FOLLOW,
        userId
    }
}

export const unfollowSuccess = (userId: number): UnfollowSuccessAT => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsers = (users: Array<UserType>): SetUsersAT => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage: number): SetCurrentPageAT => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountAT => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount
    }
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAT => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressAT => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setUsersTotalCount(response.data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(toggleFollowingProgress(false, userId));
}


export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}


export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);

    }
}

export default usersReducer;

