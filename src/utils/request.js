import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp, removeTimeStamp } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

const TimeOut = 10000

service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout() || getTimeStamp() === undefined) {
      removeTimeStamp()
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    } else {
      config.headers.authorization = 'Bearer ' + store.getters.token
    }
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
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  Message.error(err.message)
  return Promise.reject(new Error(err.message))
})

export default service

function isCheckTimeout() {
  return Date.now() - getTimeStamp() > TimeOut * 1000
}
