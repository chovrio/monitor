import { message } from 'antd';
import { RequestConfig } from '#/axios';
import { BASE_URL, TIME_OUT } from './config';
import Request from './request';

let reqConfig: RequestConfig;

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 全局拦截器
  interceptors: {
    requestSuccessFn(config) {
      const token = localStorage.getItem('token');
      reqConfig = config;
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestFailureFn(error) {
      return error;
    },
    responseSuccessFn(response) {
      if (response.status !== 200) {
        reqConfig.errorMsg && message.error(reqConfig.errorMsg);
      } else {
        reqConfig.successMsg && message.success(reqConfig.successMsg);
      }
      return response;
    },
  },
});

export default request;
