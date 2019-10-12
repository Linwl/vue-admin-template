const state = {
  buttonList: [],
  btnEvent: null,
  btnDisabled: null
}

const mutations = {
  SET_BTN_DISABELD(state, item) {
    if (state.btnDisabled != null) {
      state.btnDisabled = Object.assign(state.btnDisabled, item)
    } else {
      state.btnDisabled = Object.assign({}, item)
    }
  },
  SET_BTN_EVENT(state, item) {
    if (state.btnEvent != null) {
      state.btnEvent = Object.assign(state.btnEvent, item)
    } else {
      state.btnEvent = Object.assign({}, item)
    }
  },
  SET_BTN_LIST(state, items) {
    state.buttonList = [...items]
  }
}

const actions = {
  setBtnDisabled({
    commit
  }, item) {
    commit('SET_BTN_DISABELD', item)
  },
  setBtnEvent({
    commit
  }, item) {
    commit('SET_BTN_EVENT', item)
  },
  setBtnList({
    commit
  }, items) {
    commit('SET_BTN_LIST', items)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}