import request from './axios'

const api = {
  // 获取授权码
  getAuthCheck: () => request.get(`/license`)
}

export default api
