const getters = {
  menuItems: state => state.menuview.menuItems,
  showLoading: state => state.menuview.showLoading,
  token: state => state.user.token,
  userInfo: state => {
    let userInfo = state.user.userInfo
    if (userInfo != null) {
      userInfo = JSON.parse(userInfo)
    }
    return userInfo
  },
  buttonList: state => state.btnsetting.buttonList,
  btnEvent: state => state.btnsetting.btnEvent,
  btnDisabled: state => state.btnsetting.btnDisabled,
  roleList: state => {
    let roleList = state.user.roleList
    if (roleList != null && !(roleList instanceof Array)) {
      roleList = JSON.parse(roleList)
    }
    return roleList
  },
}
export default getters