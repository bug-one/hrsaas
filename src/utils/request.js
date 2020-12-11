import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.authorization = 'Bearer ' + store.getters.token
  }
  return config
})

service.interceptors.response.use(res => {
  const { data, message, success } = res.data
  if (success) {
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
