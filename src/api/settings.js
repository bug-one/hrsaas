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
