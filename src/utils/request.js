import axios from 'axios'
import {
  Message
} from 'iview';
import store from '@/store'
import router from '@/router'


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    store.dispatch('menuview/setshowLoading', true);
    if (store.getters.token) {
      config.headers['API-Token'] = store.getters.token
    }
    return config
  },
  error => {

    store.dispatch('menuview/setshowLoading', false)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    store.dispatch('menuview/setshowLoading', false)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 0) {
      return res
    } else if (res.code == 106 || res.code == 104) {
      //登录过期
      Message.error("登录过期!")
      store.dispatch('user/logout', false)
      router.replace('/login');
      return Promise.reject(new Error("登录过期!"))
    } else {
      Message.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    Message.error(error.message)
    store.dispatch('menuview/setshowLoading', false)
    return Promise.reject(error)
  }
)

export default service