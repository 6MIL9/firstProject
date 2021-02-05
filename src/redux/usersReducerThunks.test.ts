import { actions, follow, unfollow, } from "./usersReducer"
import { usersAPI } from './../API/usersApi';
import { ResultCodes, ResponseType } from "../API/Api";

jest.mock('./../API/usersApi')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
   resultCode: ResultCodes.Success,
   messages: [],
   data: {},
}

const dispatchMock = jest.fn();
const getStateMock = jest.fn()

beforeEach(() => {
   dispatchMock.mockClear()
   getStateMock.mockClear()
   usersAPIMock.follow.mockClear()
   usersAPIMock.unfollow.mockClear()
})

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test("success follow thunk", async () => {

   const thunk = follow(1)

   await thunk(dispatchMock, getStateMock, {})

   expect(dispatchMock).toBeCalledTimes(3)
   expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
   expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
   expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))

})

test("success unfollow thunk", async () => {

   const thunk = unfollow(1)

   await thunk(dispatchMock, getStateMock, {})

   expect(dispatchMock).toBeCalledTimes(3)
   expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
   expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
   expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))

})

