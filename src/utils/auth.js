import Cookies from 'js-cookie'

const TokenKey = 'API-Token'
const UserKey = 'Tong-Run'
const UserRoles = 'USER-Roles'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 获取登录用户信息
 */
export function getUser() {
  return Cookies.get(UserKey)
}

/**
 * 设置登录用户信息
 * @param {*} user 
 */
export function setUser(user) {
  return Cookies.set(UserKey, user)
}

/**
 * 移除用户信息
 */
export function removeUser() {
  return Cookies.remove(UserKey)
}

/**
 * 获取用户角色列表
 */
export function getUserRoles() {
  return Cookies.get(UserRoles)
}

/**
 * 设置用户角色列表
 * @param {*} roles 
 */
export function setUserRoles(roles) {
  return Cookies.set(UserRoles, roles)
}

/**
 * 移除用户角色列表
 */
export function removeUserRoles() {
  return Cookies.remove(UserRoles)
}