import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import request from './utils/request'
import 'iview/dist/styles/iview.css'
import './permission'
import './assets/icon/iconfont.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(iView)

Vue.prototype.$axios = request
Vue.prototype.$moment = moment

Vue.prototype.$Message.config({
  top: 24,
  duration:2
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})