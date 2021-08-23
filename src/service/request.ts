// service统一出口
import BaseRequest from './request/index';
import { BASE_URL, TIME_OUT } from './request/config';

const Request = new BaseRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  responseType: 'json',
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default Request;
