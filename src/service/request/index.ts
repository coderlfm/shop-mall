import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { RequestInterceptors, RequestConfig } from './type';

const DEAFULT_LOADING = true;

class Request {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  // showLoading: boolean;

  constructor(config: RequestConfig) {

    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    // this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // if (this.showLoading) {
        //   // this.loading = ElLoading.service({
        //   //   lock: true,
        //   //   text: '正在请求数据....',
        //   //   background: 'rgba(0, 0, 0, 0.5)',
        //   // });
        // }
        return config;
      },
      (err) => {
        return err;
      },
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        // this.loading?.close();

        const data = res.data;
        if (!data || data.code) {
          const error = (res as unknown as AxiosError).response?.data;
          console.log('请求失败~, 错误信息', error);
          if(error.code === 401) {
            localStorage.clear()
            window.location.href = '/login';
          }
          (window as any).$message && (window as any).$message.warning(error.message ?? '请求超时')
          return Promise.reject(error);
        } else {
          return data;
        }
      },
      (err) => {
        // 将loading移除
        // this.loading?.close();

        console.log('err:', err.message);

        // ElMessage.warning(err.message ?? '请求超时');

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~');
        }
        return Promise.reject(err);
      },
    );
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      // if (config.showLoading === false) {
      //   this.showLoading = config.showLoading;
      // }

      // console.log(JSON.stringify(JSON.parse(config)));

      if (config.data) {
        for (const key in config.data) {
          if (config.data[key] === '') config.data[key] = undefined;
        }
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          // this.showLoading = DEAFULT_LOADING;
          // console.log('then_res', res);

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          // this.showLoading = DEAFULT_LOADING;
          // console.log('rejevt_res', err);
          // reject(err);
          return err;
        });
    });
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default Request;
