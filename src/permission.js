import router from './router'
import store from './store'
import {
    menusToRoutes,initButton
} from './utils'
import {
    LoadingBar
} from 'iview'
import {
    getUserTreeMenus
} from '@/api/menus'

// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
    LoadingBar.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            let user = store.getters.userInfo
            let menuName = to.path.replace("/", "");
            //TODO:动态生成按钮
            initButton(menuName,user.userNum)
            if (hasMenus) {
                next()
            } else {
                try {                 
                    let res = await getUserTreeMenus({
                        userNum: user.userNum
                    })                             
                    //TODO: 动态生成路由
                    const routes = menusToRoutes(res.data)
                    // 动态添加路由
                    router.addRoutes(routes)
                    hasMenus = true
                    next({
                        path: to.path || '/'
                    })
                } catch (error) {
                    store.dispatch('user/logout');
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        hasMenus = false
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})


router.afterEach(() => {
    LoadingBar.finish()
})