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

// 修改商品勾选状态
export const changeCartCheckApi: (productId: number, data: { type: string }) => Promise<IDataType> = (
  productId,
  data,
) => Request.patch({ url: `${CartApi.cartChecked}${productId}`, data });

// 修改商品数量
export const changeCartCountApi: (productId: number, data: { type: 'increment' | 'decrement' }) => Promise<IDataType> =
  (productId, data) => Request.patch({ url: `${CartApi.cart}${productId}`, data });

// 删除商品
export const removeCartApi: (productId: number) => Promise<IDataType> = (productId) =>
  Request.delete({ url: `${CartApi.cart}${productId}` });
