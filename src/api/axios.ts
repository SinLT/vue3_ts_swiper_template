import Axios from 'axios'
import { ElMessage } from 'element-plus'

// 公共Axios实例
const axios = Axios.create({
  baseURL: `http://${process.env.VUE_APP_URL}`,
  timeout: 10000,
})

axios.defaults.retry = 5
axios.defaults.retryDelay = 3000

function axiosRetryInterceptor(err: any) {
  let message, config: any
  if (Axios.isCancel(err)) {
    message = err.message.message
    config = err.message.config
  } else {
    message = err.message
    config = err.config
  }
  config.__retryCount = config.__retryCount || 0
  if (config.__retryCount >= config.retry) {
    if (err.response) {
      const { config, data, status } = err.response
      const show = config.message?.show ?? true

      if (show) {
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
        ElMessage.error(content)
      }
    } else if (err.message) {
      const msg = err.message
      switch (msg) {
        case 'Network Error':
          ElMessage.error('网络错误, 无法连接服务器')
          break
        default:
          ElMessage.error(msg)
          break
      }
    }
    return Promise.reject(new Error(message))
  }
  config.__retryCount += 1
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay || 1)
  })
  return backoff.then(() => {
    ElMessage.error(`请求失败，重试中：${config.url}`)
    return axios(config)
  })
}

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
  axiosRetryInterceptor
)

export default axios
