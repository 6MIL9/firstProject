import { AxiosPromise } from 'axios';
import { instance, getItemsType, ResponseType } from './Api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow<ResponseType>(userId: number) { 
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`) as AxiosPromise<ResponseType>
    }
};