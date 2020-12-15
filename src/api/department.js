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

export const addDepartments = function(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

export const getDepartmentsDetail = function(id) {
  return request({
    url: '/company/department/' + id
  })
}
