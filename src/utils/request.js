import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use()

service.interceptors.response.use(res => {
  const { data, message, success } = res.data
  if (success) {
    Message.success(message)
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  Message.error(err.message)
  return Promise.reject(new Error(err.message))
})

export default service
