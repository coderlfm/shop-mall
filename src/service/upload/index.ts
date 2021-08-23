import { RequestFile } from '../request';

enum UplodaApi {
  avatar = 'upload/avatar',
}

// 头像上传
export const uploadAvatarApi: (data: any) => Promise<any> = (data) => RequestFile.post({ url: UplodaApi.avatar, data });
