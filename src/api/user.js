import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getUserInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function getUserInfoById(id) {
  return request({
    url: '/sys/user/' + id
  })
}
