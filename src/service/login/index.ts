import Request from '../index';

import { ILogin, IRegister, IDataType, ILoginResult } from './type';

enum LoginAPI {
  Login = '/login',
  Register = '/login/register',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/', // 用法: role/1/menu
}

export function loginApi(account: ILogin): Promise<IDataType<ILoginResult>> {
  return Request.post<IDataType<ILoginResult>>({
    url: LoginAPI.Login,
    data: account,
  });
}
export function registerApi(account: IRegister): Promise<IDataType<ILoginResult>> {
  return Request.post<IDataType<ILoginResult>>({
    url: LoginAPI.Register,
    data: account,
  });
}

export function requestUserInfoById(id: number): Promise<IDataType> {
  return Request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number): Promise<IDataType> {
  return Request.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false,
  });
}
