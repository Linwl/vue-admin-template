import store from '@/store'

/**
 * 判断数组是否包含另一个数组
 * @param {*} source 源数组
 * @param {*} target 比较数组
 * @param {String} condition 数组比较对象条件
 * @param {Boolean} isContain 是包含比较
 * @returns
 */
function isContained(source, target, condition, isContain) {
  if (!(source instanceof Array) || !(target instanceof Array)) {
    return false;
  }
  condition = condition || null;
  isContain = isContain || false;
  for (let i = 0; i < target.length; i++) {
    let flag = false;
    for (let j = 0; j < source.length; j++) {
      if (condition != null) {
        if (isContain) {
          if (target[i][condition].indexOf(source[j][condition]) != -1) {
            flag = true;
            break;
          }
        } else {

          if (source[j][condition] == target[i][condition]) {
            flag = true;
            break;
          }
        }
      } else {
        if (isContain) {
          if (target[i].indexOf(source[j]) != -1) {
            flag = true;
            break;
          }
        } else {
          if (source[j] == target[i]) {
            flag = true;
            break;
          }
        }
      }

    }
    if (flag == false) {
      return flag;
    }
  }
  return true;
}

/**
 * 导出(WinOpen方式)
 * @param {Object} params 参数对象
 * @param {String} url
 */
function exportWinOpen(params, url) {
  if (params == null) {
    let openUrl = process.env.VUE_APP_BASE_API.concat(url, '?')
    openUrl = openUrl.concat('API-Token', '=', store.getters.token)
    window.open(openUrl)
  } else {
    if (params instanceof Object) {
      let openUrl = process.env.VUE_APP_BASE_API.concat(url, '?')
      for (let [key, value] of Object.entries(params)) {
        if (value != null) {
          openUrl = openUrl.concat(key, '=', value, '&')
        }
      }
      openUrl = openUrl.concat('API-Token', '=', store.getters.token)
      window.open(openUrl)
    } else {
      throw '参数列表必须为对象!'
    }
  }
}


export {
  isContained,
  exportWinOpen
}