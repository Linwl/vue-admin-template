import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
}, {
    path: '/',
    redirect: '/home'
}]

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router