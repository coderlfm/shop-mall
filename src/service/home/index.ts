import Request from '../request';

import { IDataType, ISearchData } from './type';

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
export function getProductsApi(searchData: ISearchData): Promise<IDataType<any>> {
  let url = `${HomeApi.products}?`;

  type keyType = keyof ISearchData;
  let key: keyType;

  for (key in searchData) {
    const value = searchData[key];
    if (!value) continue;
    url += `${key}=${value}&`;
  }
  url = url.slice(0, -1);

  return Request.get<IDataType>({ url });
}
