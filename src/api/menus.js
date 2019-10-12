import request from '@/utils/request'

/**
 * 获取用户树状菜单
 * @param {Object} params 
 */
export function getUserTreeMenus(params) {
  return request({
    url: '/usercenter/roleMenu/getUserTreeMenus',
    method: 'get',
    params:params
  })
}

/**
 * 获取用户按钮列表
 * @param {Objext} params 
 */
export function getUserButtons(params) {
  return request({
    url: '/usercenter/roleButton/getUserButtons',
    method: 'get',
    params:params
  })
}