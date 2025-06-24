import axios, { type AxiosInstance, type AxiosError, type CreateAxiosDefaults } from 'axios';
import axiosRetry from 'axios-retry';
import qs from 'qs';

/**
 * @interface CreateApiOptions
 * @description 创建 API 实例的配置选项
 */
export interface CreateApiOptions {
  /**
   * @property {string} baseURL - API 的基础 URL
   */
  baseURL: string;
  /**
   * @property {() => string | null} [getToken] - 获取认证令牌的函数
   */
  getToken?: () => string | null;
  /**
   * @property {() => void} [onUnauthorized] - 当收到 401 未授权响应时的回调函数
   */
  onUnauthorized?: () => void;
}

/**
 * 创建一个配置好的 Axios 实例
 * @param {CreateApiOptions} options - API 客户端的配置选项
 * @returns {AxiosInstance} 返回一个集成了请求重试、请求头注入和响应拦截的 Axios 实例
 */
export function createApi(options: CreateApiOptions): AxiosInstance {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.getToken && {
      Authorization: `Bearer ${options.getToken()}`,
    }),
  };

  const axiosConfig: CreateAxiosDefaults = {
    baseURL: options.baseURL,
    headers,
    timeout: 10000, // 10秒超时
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    },
  };

  const api = axios.create(axiosConfig);

  axiosRetry(api, {
    retries: 3, // 设置重试次数
    retryDelay: (retryCount: number) => {
      // 设置重试延迟
      return retryCount * 1000;
    },
    retryCondition: (error: AxiosError) => {
      // 默认情况下，网络错误和 5xx 状态码会触发重试
      return axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
  });

  // 响应拦截器
  api.interceptors.response.use(
    (response) => {
      if (response.data.code === 401) {
        options.onUnauthorized?.();
      }
      return response;
    },
    (error) => Promise.reject(error),
  );

  return api;
}
