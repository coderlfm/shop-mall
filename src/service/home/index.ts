import Request from '../index';

import { IDataType } from './type';

enum HomeApi {
  banner = '/banner',
}

export function bannerApi(): Promise<IDataType<any>> {
  return Request.get<IDataType>({ url: HomeApi.banner });
}
