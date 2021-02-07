import { usersAPI } from './../API/usersApi';
import { UserType } from '../Types/Types';
import { updateObjectInArray } from '../utils/objectHelpers'
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { Dispatch } from 'redux';
import { ResponseType } from '../API/Api';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [1, 2] as Array<number>,
    filter: {
        term: '',
        friend: null as boolean | null
    }
};

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>

export const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {

        case 'users/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            };
        }

        case 'users/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };
        }

        case 'users/SET_USERS': {
            return { ...state, users: action.users };
        }

        case 'users/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage };
        }

        case 'users/SET_FILTER': {
            return { ...state, filter: action.payload};
        }

        case 'users/SET_TOTAL_COUNT': {
            return { ...state, totalUsersCount: action.totalCount };
        }

        case 'users/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };
        }

        case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {
    followSuccess: (userId: number) => {
        return {
            type: 'users/FOLLOW',
            userId
        } as const
    },

    unfollowSuccess: (userId: number) => {
        return {
            type: 'users/UNFOLLOW',
            userId
        } as const
    },

    setUsers: (users: Array<UserType>) => {
        return {
            type: 'users/SET_USERS',
            users
        } as const
    },

    setCurrentPage: (currentPage: number) => {
        return {
            type: 'users/SET_CURRENT_PAGE',
            currentPage
        } as const
    },

    setFilter: (filter: FilterType) => {
        return {
            type: 'users/SET_FILTER',
            payload: filter
        } as const
    },


    setUsersTotalCount: (totalCount: number) => {
        return {
            type: 'users/SET_TOTAL_COUNT',
            totalCount
        } as const
    },

    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: 'users/TOGGLE_IS_FETCHING',
            isFetching
        } as const
    },
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {
            type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const
    }
}

type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));

        let response = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.data.items));
        dispatch(actions.setUsersTotalCount(response.data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<ResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}

export default usersReducer;

