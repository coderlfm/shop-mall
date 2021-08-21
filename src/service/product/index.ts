import Request from '../reqeust';

import { IDataType } from '../type';

enum HomeApi {
  product = 'product',
}

/**
 * 获取商品详情
 * @param categoryId 商品id
 */
export function getProductDetailByIdApi(productId: number): Promise<IDataType<any>> {
  return Request.get<IDataType>({ url: `${HomeApi.product}/${productId}` });
}
