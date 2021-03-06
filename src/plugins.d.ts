import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import api from '@/api'
// 声明全局属性类型
declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api?: typeof api
    $message?: typeof ElMessage
  }
}