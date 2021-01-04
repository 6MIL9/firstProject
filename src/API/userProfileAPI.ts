import { instance, ResponseType } from './Api'
import { PhotosType, ProfileType } from '../Types/Types';

export const userProfileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { status: status })
    },
    savePhoto(photo: any) {
        let formData = new FormData();
        formData.append('image', photo)

        return instance.put<ResponseType<{photos: PhotosType}>>(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
    }
};
