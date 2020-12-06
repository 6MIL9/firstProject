import axios from 'axios';
import { ProfileType } from '../Types/Types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4ba5285f-3df6-4c4d-979e-c5b6e9b6437e'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
};

export const userProfileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photo: any) { 
        let formData = new FormData();
        formData.append('image', photo)

        return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
};

export const authAPI = {
    getAuthUserData() {
        return instance.get(`auth/me`);
    },
    sentLoginData(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post('/auth/login', {
            email, password, rememberMe, captcha
        });
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


