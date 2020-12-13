import request from '@/utils/request'

export const getDepartments = function() {
  return request({
    url: '/company/department'
  })
}

export const delDepartments = function(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}