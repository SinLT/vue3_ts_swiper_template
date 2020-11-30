import api from './api/index'
// 声明全局属性类型
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: typeof api
  }
}