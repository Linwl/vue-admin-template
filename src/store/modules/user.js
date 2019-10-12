import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  getUserRoles,
  setUserRoles,
  removeUserRoles
} from '@/utils/auth'
import {
  login,
  getRolesByUser
} from '@/api/user'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  userInfo: getUser(),
  roleList: getUserRoles()
}


const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.userInfo = user
  },
  SET_ROLES: (state, roles) => {
    state.roleList = [...roles]
  },
}

const actions = {
  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        userNum: username.trim(),
        userPasswd: password
      }).
      then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        let userData = {
          userName: data.name,
          userLevel: data.userLevel,
          userNum: username.trim(),
        }
        commit('SET_USER', JSON.stringify(userData))
        setUser(JSON.stringify(userData))
        getRolesByUser({
          userNum: userData.userNum
        }).then(res => {
          //设置角色列表
          if (res.data != null) {
            let roleArr = []
            res.data.forEach(element => {
              roleArr.push(element.roleName)
            });
            let roles = JSON.stringify(roleArr)
            commit('SET_ROLES', roleArr)
            setUserRoles(roles)
          }
        })
        resolve(data)
      }).
      catch(error => {
        reject(error)
      })
    })
  },
  logout({
    commit
  }) {
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
    commit('SET_ROLES', [])
    removeToken()
    removeUser()
    removeUserRoles()
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}