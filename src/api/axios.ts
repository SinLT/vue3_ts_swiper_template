import Axios from 'axios'
import { message } from 'ant-design-vue'
import axiosRetry from 'axios-retry'

// 公共Axios实例
const axios = Axios.create({
  baseURL: `http://${process.env.VUE_APP_URL}`,
  timeout: 10000
})

axiosRetry(axios, { retries: 4, retryDelay: () => {
  return 2000
} })

// Request 过滤器
axios.interceptors.request.use((request: any) => {
  const { params } = request

  // 过滤空参数
  if (params) {
    const keys = Object.keys(params)
    for (let key of keys) {
      const value = params[key]
      switch (value) {
        case undefined:
        case null:
        case '':
          delete params[key]
          break
      }
    }
  }

  return request
})

// Response 过滤器
axios.interceptors.response.use(
  (response: any) => {
    const { data } = response
    return data
  },
  (error: any) => {
    if (error.response) {
      const { config, data, status } = error.response
      const show = config.message?.show ?? true

      if (show) {
        const callback = config.message?.callback

        // 处理各种状态下的消息
        let content: string
        switch (status) {
          case 401:
            content = '登录已过期，请重新登录'
            break
          case 403:
            content = '您没有权限，无法访问'
            break
          case 404:
            content = 'Not Found 404'
            break
          case 500:
            content = '服务端异常'
            break
          default:
            content = data?.message ?? '未知异常'
            break
        }
        message.error(content, undefined, callback)
      }
    } else if (error.message) {
      const msg = error.message
      switch (msg) {
        case 'Network Error':
          message.error('网络错误, 无法连接服务器')
          break
        default:
          message.error(msg)
          break
      }
    }

    // 继续向上传递异常
    throw error
  }
)

export default axios
