import { AxiosPromise } from 'axios';
import { instance, getItemsType, ResponseType } from './Api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5, term: string, friend: null | boolean = null) {
        return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
    },
    follow<ResponseType>(userId: number) { 
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(res => res.data) 
    }
};