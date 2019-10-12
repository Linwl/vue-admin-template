import request from '@/utils/request'

/**
 * 创建售后跟踪单信息
 * @export
 * @param {Object} data
 * @returns
 */
export function addAfterSaleOrder(data) {
  return request({
    url: '/mrp/afterSaleOrder/add',
    method: 'post',
    data
  })
}


/**
 *更新售后跟踪单信息
 * @export
 * @param {*} data
 * @returns
 */
export function updateAfterSaleOrder(data) {
  return request({
    url: '/mrp/afterSaleOrder/update',
    method: 'post',
    data
  })
}


/**
 * 删除售后跟踪单
 * @param {Object} params 
 */
export function deleteAfterSaleOrder(params) {
  return request({
    url: '/mrp/afterSaleOrder/delete',
    method: 'get',
    params:params
  })
}