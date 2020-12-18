import request from '@/utils/request'

export const getEmployeeSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}

export const getUserList = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

export const delEmployee = (id) => {
  return request({
    method: 'delete',
    url: '/sys/user/' + id
  })
}
