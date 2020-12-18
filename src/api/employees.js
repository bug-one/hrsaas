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

export const addEmployee = (data) => {
  return request({
    method: 'post',
    url: '/sys/user',
    data

  })
}

export const importEmployees = (data) => {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
