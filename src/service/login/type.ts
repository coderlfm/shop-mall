export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  nickName: string;
  mobile: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

export interface IDataType<T = any> {
  code: number;
  data: T;
  msg: string;
}
