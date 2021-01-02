import { usersAPI } from './../API/usersApi';
import { UserType } from '../Types/Types';
import { updateObjectInArray } from '../utils/objectHelpers'
import { AppStateType, InferActionsTypes } from './reduxStore';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [1, 2] as Array<number>
};

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {

        case 'FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            };
        }

        case 'UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };
        }

        case 'SET_USERS': {
            return { ...state, users: action.users };
        }

        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage };
        }

        case 'SET_TOTAL_COUNT': {
            return { ...state, totalUsersCount: action.totalCount };
        }

        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };
        }

        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => {
        return {
            type: 'FOLLOW',
            userId
        } as const
    },

    unfollowSuccess: (userId: number) => {
        return {
            type: 'UNFOLLOW',
            userId
        } as const
    },

    setUsers: (users: Array<UserType>) => {
        return {
            type: 'SET_USERS',
            users
        } as const
    },

    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage
        } as const
    },

    setUsersTotalCount: (totalCount: number) => {
        return {
            type: 'SET_TOTAL_COUNT',
            totalCount
        } as const
    },

    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_IS_FETCHING',
            isFetching
        } as const
    },
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const
    }
}

type DispatchType = Dispatch<ActionsTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.data.items));
        dispatch(actions.setUsersTotalCount(response.data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}


export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}

export default usersReducer;

