import usersReducer, { actions, InitialState } from "./usersReducer"

let state: InitialState = {
    users: [
        {
            id: 1, name: "Emil 1", followed: true,
            photos: { small: null, large: null }, status: "1"
        },
        {
            id: 2, name: "Emil 2", followed: false,
            photos: { small: null, large: null }, status: "2"
        },
        {
            id: 3, name: "Emil 3", followed: false,
            photos: { small: null, large: null }, status: "3"
        }
    ],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

beforeEach(() => {
    state = {
        users: [
            {
                id: 1, name: "Emil 1", followed: true,
                photos: { small: null, large: null }, status: "1"
            },
            {
                id: 2, name: "Emil 2", followed: false,
                photos: { small: null, large: null }, status: "2"
            },
            {
                id: 3, name: "Emil 3", followed: false,
                photos: { small: null, large: null }, status: "3"
            },
            {
                id: 4, name: "Emil 4", followed: true,
                photos: { small: null, large: null }, status: "4"
            }
        ],
        pageSize: 12,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: []
    }
})

test("follow success", () => {
    
    const newState = usersReducer(state, actions.followSuccess(3))

    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()

})

test("unfollow success", () => {
    
    const newState = usersReducer(state, actions.unfollowSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()

})