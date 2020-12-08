import axios, { AxiosResponse } from 'axios';
import { ProfileType, UserType } from '../Types/Types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4ba5285f-3df6-4c4d-979e-c5b6e9b6437e'
    }
});

type getUsersResponseType = {
    items: Array<UserType>
    totalCount: number 
    error: null | string
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    }, 
    follow(userId: number) { // не ясно что делать
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
};

type updateStatusResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

type saveProfileResponseType = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}

export const userProfileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<updateStatusResponseType>(`profile/status`, { status: status })
    },
    savePhoto(photo: any) {
        let formData = new FormData();
        formData.append('image', photo)

        return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<saveProfileResponseType>(`profile`, profile)
    }
};

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

type getAuthUserDataResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodes 
    messages: Array<string>
}

type sentLoginDataResponseType = {
    data: { userId: number }
    resultCode: ResultCodes | ResultCodesForCaptcha
    messages: Array<string>
}

export const authAPI = {
    getAuthUserData() {
        return instance.get<getAuthUserDataResponseType>(`auth/me`).then(res => res.data);
    },
    sentLoginData(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<sentLoginDataResponseType>('/auth/login', {
            email, password, rememberMe, captcha
        }).then(res => res.data);
    },
    logout() {
        return instance.delete('/auth/login');
    }
};

export const securityAPI = {
    getCaptcha() {
        return instance.get('/security/get-captcha-url');
    }
};

