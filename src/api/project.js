import request from '@/utils/request'

/**
 * 增加项目信息
 * @param {Object} params 
 */
export function addProject(data) {
  return request({
    url: '/mrp/project/add',
    method: 'post',
    data
  })
}

/**
 * 修改项目信息
 * @param {Object} data 
 */
export function updateProject(data) {
  return request({
    url: '/mrp/project/update',
    method: 'post',
    data
  })
}

/**
 * 删除项目信息
 * @param {Object} params 
 */
export function deleteProject(params) {
  return request({
    url: '/mrp/project/delete',
    method: 'get',
    params:params
  })
}

/**
 * 获取项目信息列表
 * @param {Object} params 
 */
export function getProjects(params) {
  return request({
    url: '/mrp/project/getProjects',
    method: 'get',
    params:params
  })
}