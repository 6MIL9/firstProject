import { instance, ResultCodes, ResultCodesForCaptcha, ResponseType } from './Api'

export const authAPI = {
    getAuthUserData() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`).then(res => res.data);
    },
    sentLoginData(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<ResponseType<{ userId: number}, ResultCodes | ResultCodesForCaptcha>>('/auth/login', {
            email, password, rememberMe, captcha
        }).then(res => res.data);
    },
    logout() {
        return instance.delete('/auth/login');
    }
};