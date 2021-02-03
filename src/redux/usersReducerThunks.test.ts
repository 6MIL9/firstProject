import { actions, follow, } from "./usersReducer"
import { usersAPI } from './../API/usersApi';
import { ResultCodes, ResponseType } from "../API/Api";

jest.mock('./../API/usersApi')
const usersAPIMock = usersAPI

const result: ResponseType = {
   resultCode: ResultCodes.Success,
   messages: [],
   data: {},
}

//@ts-ignore
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

test("", async () => {

   const thunk = follow(1)
   const dispatchMock = jest.fn();

   //@ts-ignore
   await thunk(dispatchMock)


   expect(dispatchMock).toBeCalledTimes(3)
})

