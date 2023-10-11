import { RequestConfig } from '@/types';
import axios, { type AxiosInstance } from 'axios';
class Request {
  instance: AxiosInstance;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    // 每个instance实例都添加拦截器（全局）可以不写
    this.instance.interceptors.request.use(
      (config) => config,
      (err) => err
    );
    this.instance.interceptors.response.use(
      (config) => config,
      (err) => err
    );
    // 针对特定的Request实例添加拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors?.requestSuccessFn,
        config.interceptors?.requestFailureFn
      );
      this.instance.interceptors.response.use(
        config.interceptors?.responseSuccessFn,
        config.interceptors?.responseFailureFn
      );
    }
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    // 如果又请求成功的特例拦截，就先执行
    if (config.interceptors?.requestSuccessFn) {
      config.interceptors.requestSuccessFn(<any>config);
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<T, any>(config)
        .then((res) => {
          // 如果事先做了特例的响应拦截，就执行特例
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'get' });
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'post' });
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'delete' });
  }
  put<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'put' });
  }
}

export default Request;
