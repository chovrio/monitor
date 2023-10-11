import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface Interceptors<T = AxiosResponse> {
  // 请求拦截
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestFailureFn?: (error: any) => any;
  // 响应拦截
  responseSuccessFn?: (response: T) => T;
  responseFailureFn?: (error: any) => any;
}

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;

type NewAxiosRequestConfig = SetOptional<AxiosRequestConfig, 'headers'>;

export interface RequestConfig<T = AxiosResponse>
  extends NewAxiosRequestConfig {
  interceptors?: Interceptors<T>;
  successMsg?: string;
  errorMsg?: string;
}
