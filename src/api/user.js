import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data 
 */
export function login(data) {
  return request({
    url: '/authentication/verify/login',
    method: 'post',
    data
  })
}

/**
 * 增加用户角色
 * @param {Object} data 
 */
export function addRole(data) {
  return request({
    url: '/usercenter/roleinfo/add',
    method: 'post',
    data
  })
}

/**
 * 获取角色列表
 * @param {Objest} params 
 */
export function getRoles(params) {
  return request({
    url: '/usercenter/roleinfo/getRole',
    method: 'get',
    params:params
  })
}

/**
 * 更新用户角色
 * @param {Object} data 
 */
export function updateRole(data) {
  return request({
    url: '/usercenter/roleinfo/update',
    method: 'post',
    data
  })
}

/**
 * 删除用户角色
 * @param {Object} params 
 */
export function deleteRole(params) {
  return request({
    url: '/usercenter/roleinfo/delete',
    method: 'get',
    params: params
  })
}

/**
 * 增加用户
 * @param {Object} params 
 */
export function addUser(data) {
  return request({
    url: '/usercenter/userinfo/add',
    method: 'post',
    data
  })
}


/**
 * 更新用户
 * @param {Object} params 
 */
export function updateUserRole(data) {
  return request({
    url: '/usercenter/userinfo/updateUserRole',
    method: 'post',
    data
  })
}


/**
 * 删除用户
 * @param {Object} params 
 */
export function deleteUser(params) {
  return request({
    url: '/usercenter/userinfo/delete',
    method: 'get',
    params: params
  })
}

/**
 * 修改密码
 * @param {Object} data 
 */
export function changePasswd(data) {
  return request({
    url: '/usercenter/userinfo/changePassword',
    method: 'post',
    data
  })
}

/**
 * 获取用户角色列表
 * @param {Object} params 
 */
export function getUserRoles(params) {
  return request({
    url: '/usercenter/userRoleInfo/getUserRoleInfos',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户角色列表
 * @param {Object} params 
 */
export function getRolesByUser(params) {
  return request({
    url: '/usercenter/userRoleInfo/getRolesByUser',
    method: 'get',
    params: params
  })
}