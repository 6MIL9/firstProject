import * as axios from 'axios';

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
            .then(responce => responce.data);
    },
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
};

export const userProfileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(responce => responce.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    }
};

export const authAPI = {
    getAuthUserData() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    sentLoginData(email, password, rememberMe) {
        return instance.post('/auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe
        }
        )
    }
};

export const loginAPI = {
    sentLoginData(email, password, rememberMe) {
        return instance.post('/auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe
        }
        )
    }
}