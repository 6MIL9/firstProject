import { instance, ResultCodes } from './Api'
import { ProfileType } from '../Types/Types';

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
