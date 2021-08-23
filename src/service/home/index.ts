import Request from '../request';

import { IDataType } from './type';

enum HomeApi {
  banner = '/banner',
  categories = '/product/categories',
  products = 'product/list',
}

/**
 * 获取 banner
 */
export function bannerApi(): Promise<IDataType<any>> {
  return Request.get<IDataType>({ url: HomeApi.banner });
}

// 获取分类列表
export function categoriesApi(): Promise<IDataType<any>> {
  return Request.get<IDataType>({ url: HomeApi.categories });
}

/**
 * 获取商品列表
 * @param categoryId 分类id
 * @returns
 */
export function getProductsByCategoryIdApi({
  categoryId,
  page,
  pageSize,
}: {
  categoryId: number;
  page: number;
  pageSize: number;
}): Promise<IDataType<any>> {
  return Request.get<IDataType>({ url: `${HomeApi.products}/${categoryId}?page=${page}&pageSize=${pageSize}` });
}
