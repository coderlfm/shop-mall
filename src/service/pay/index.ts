import Request from '../request';
import { IDataType } from '../type';

enum PayApi {
  order = 'pay/order',
}

// 订单支付
export const orderPayMentApi: (data: { orderNumber: string }) => Promise<IDataType> = (data) =>
  Request.post({ url: PayApi.order, data });
