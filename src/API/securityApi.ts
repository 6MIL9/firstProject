import { instance } from './Api'

export const securityAPI = {
    getCaptcha() {
        return instance.get('/security/get-captcha-url');
    }
};