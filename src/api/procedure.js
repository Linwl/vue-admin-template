import request from '@/utils/request'

/**
 * 增加工号信息
 * @param {Object} params 
 */
export function addProcedure(data) {
  return request({
    url: '/mrp/procedure/add',
    method: 'post',
    data
  })
}

/**
 * 修改工号信息
 * @param {Object} data 
 */
export function updateProcedure(data) {
  return request({
    url: '/mrp/procedure/update',
    method: 'post',
    data
  })
}

/**
 * 删除工号信息
 * @param {Object} params 
 */
export function deleteProcedure(params) {
  return request({
    url: '/mrp/procedure/delete',
    method: 'get',
    params:params
  })
}

/**
 * 获取工号信息列表
 * @param {Object} params 
 */
export function getProcedures(params) {
  return request({
    url: '/mrp/procedure/getProcedures',
    method: 'get',
    params:params
  })
}