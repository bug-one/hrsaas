import request from '@/utils/request'

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export const getCompanyDetail = (id) => {
  return request({
    url: '/company/' + id
  })
}

export const delRoleById = (id) => {
  return request({
    method: 'delete',
    url: '/sys/role/' + id
  })
}

export const addRole = (data) => {
  return request({
    method: 'post',
    url: '/sys/role',
    data
  })
}
