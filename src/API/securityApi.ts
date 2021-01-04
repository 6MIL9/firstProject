import { instance } from './Api'

export const securityAPI = {
    getCaptcha() {
        return instance.get<{url: string}>('/security/get-captcha-url');
    }
};