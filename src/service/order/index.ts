import Request from '../reqeust';

import { IDataType } from '../type';

enum OrderApi {
  order = 'order',
}

/**
 * 下单
 * @param data
 */
export const createOrderByProductIdsApi: () => Promise<IDataType> = () => Request.post({ url: OrderApi.order });
// export const createOrderByProductIdsApi: (data: { productIds: number[] }) => Promise<IDataType> = (data) =>
//   Request.post({ url: OrderApi.order, data });
