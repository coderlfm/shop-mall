import Request from '../reqeust';
import { IDataType } from '../type';
// import { IAddress } from './type';

enum CartApi {
  cart = 'cart/',
  cartChecked = 'cart/checked/',
}

// 添加购物车
export const addCardByIdApi: (data: { productId: number }) => Promise<IDataType> = (data) =>
  Request.post({ url: CartApi.cart, data });

// 获取购物车
export const getCartListApi: () => Promise<IDataType> = () =>
  Request.get({ url: `${CartApi.cart}?page=1&pageSize=120` });

export const changeCartCheckApi: (produchId: number, data: { type: string }) => Promise<IDataType> = (
  produchId,
  data,
) => Request.post({ url: `${CartApi.cartChecked}${produchId}`, data });

// // 获取用户地址
// export const getUserAddressApi: () => Promise<IDataType> = () => Request.get({ url: CartApi.address });

// // 添加用户地址
// export const addUserAddressApi: (data: IAddress) => Promise<IDataType> = (data) =>
//   Request.post({ url: CartApi.address, data });

// export const removeUserAddressByIdApi: (addressId: number) => Promise<IDataType> = (addressId) =>
//   Request.delete({ url: CartApi.address + addressId });
