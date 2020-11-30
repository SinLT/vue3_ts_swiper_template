import { AxiosRequestConfig } from 'axios'
// 声明全局属性类型
declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number
  }
}