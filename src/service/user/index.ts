import Request from '../reqeust';
import { IDataType } from '../type';

enum UserApi {
  userInfo = 'user',
}

export const getUserInfoApi: () => Promise<IDataType> = () => Request.get({ url: UserApi.userInfo });
