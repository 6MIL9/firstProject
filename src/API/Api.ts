import axios from 'axios';
import { UserType } from '../Types/Types';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4ba5285f-3df6-4c4d-979e-c5b6e9b6437e'
    }
});

export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export type getItemsType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

