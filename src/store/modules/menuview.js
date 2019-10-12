const state = {
  menuItems: [],
  showLoading: false
}

const mutations = {
  SET_MENUS(state, items) {
    state.menuItems = [...items]
  },
  SET_SHOWLOADING(state, showLoading) {
    state.showLoading = showLoading
  }
}

const actions = {
  setMenus({
    commit
  }, items) {
    commit('SET_MENUS', items)
  },
  setshowLoading({
    commit
  }, showLoading) {
    commit('SET_SHOWLOADING', showLoading)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}