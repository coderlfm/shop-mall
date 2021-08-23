import Request from '../request';

import { IDataType } from '../type';

enum OrderApi {
  order = 'order',
}

/**
 * 获取订单列表
 */
export const getOrderListApi: (params: { page: number; pageSize: number; orderStatus: string }) => Promise<IDataType> =
  ({ page, pageSize, orderStatus }) =>
    Request.get({ url: `${OrderApi.order}?page=${page}&pageSize=${pageSize}&orderStatus=${orderStatus}` });

/**
 * 下单
 * @param data
 */
export const createOrderByProductIdsApi: (data: { addressId: number }) => Promise<IDataType> = (data) =>
  Request.post({ url: OrderApi.order, data });
// export const createOrderByProductIdsApi: (data: { productIds: number[] }) => Promise<IDataType> = (data) =>
//   Request.post({ url: OrderApi.order, data });
