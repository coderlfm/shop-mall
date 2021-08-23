import Request from '../request';
import { IDataType } from '../type';
import { IAddress } from './type';

enum UserApi {
  userInfo = 'user',
  address = 'user/address/',
}

// 获取用户基本信息
export const getUserInfoApi: () => Promise<IDataType> = () => Request.get({ url: UserApi.userInfo });

// 获取收货地址
export const getUserAddressApi: () => Promise<IDataType> = () => Request.get({ url: UserApi.address });

// 添加收货地址
export const addUserAddressApi: (data: IAddress) => Promise<IDataType> = (data) =>
  Request.post({ url: UserApi.address, data });

// 编辑收货地址
export const editUserAddressApi: (addressId: number, data: IAddress) => Promise<IDataType> = (addressId, data) =>
  Request.patch({ url: UserApi.address + addressId, data });

// 删除收货地址
export const removeUserAddressByIdApi: (addressId: number) => Promise<IDataType> = (addressId) =>
  Request.delete({ url: UserApi.address + addressId });
