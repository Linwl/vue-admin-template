// 将菜单信息转成对应的路由信息 动态添加
import store from '@/store'
import {
    getUserButtons
} from '@/api/menus.js'
import {
    async
} from 'q'

export function menusToRoutes(data) {
    const result = []
    const children = []
    const menus = []
    result.push({
        path: '/',
        component: () => import('@/components/Index.vue'),
        children,
    })
    data.forEach(item => {
        menus.push(generateMenus(item))
        generateRoutes(children, item)
    })
    store.dispatch('menuview/setMenus', menus);
    children.push({
        path: 'error',
        name: 'error',
        component: () => import('@/components/Error.vue')
    })

    // 最后添加404页面 否则会在登陆成功后跳到404页面
    result.push({
        path: '*',
        redirect: '/error'
    }, )

    return result
}

function generateMenus(item) {
    let menu = {
        name: item.menuName,
        text: item.menuText,
        type: item.menuType,
        path: item.menuPath,
        size: item.menuTypeSize,
        children: generateChildren(item.children)
    }
    return menu
}

function generateChildren(item) {
    if (item.length == 0) {
        return null;
    } else {
        let childrens = []
        item.forEach(ch => {
            let children = {
                name: ch.menuName,
                text: ch.menuText,
                type: ch.menuType,
                path: ch.menuPath,
                size: ch.menuTypeSize,
                children: generateChildren(ch.children)
            }
            childrens.push(children)
        })
        return childrens
    }

}

function generateRoutes(children, item) {
    if (item.children.length == 0) {
        let router = {
            name: item.menuName,
            text: item.menuText,
            type: item.menuType,
            path: item.menuPath,
            size: item.menuTypeSize,
            component: () => import(`@/${item.menuComponentUrl}`)
        }
        children.push(router)
    } else {
        item.children.forEach(e => {
            generateRoutes(children, e)
        })
    }
}

/**
 * 初始化菜单按钮
 * @param {*} menuName 
 * @param {*} userNum 
 */
export async function initButton(menuName, userNum) {
    let res = await getUserButtons({
        userNum: userNum,
        menuName: menuName
    })
    if (res.data.length > 0) {
        let btnList = []
        let data = res.data
        data.forEach(b => {
            if (b.buttonName == "刷新") {
                btnList.unshift(generateButton(b))
            } else {
                btnList.push(generateButton(b))
            }
        })
        store.dispatch('btnsetting/setBtnList', btnList);
    } else {
        store.dispatch('btnsetting/setBtnList', []);
    }
}

/**
 * 生成按钮对象
 * @param {*} item 
 */
function generateButton(item) {
    let btnEvent = store.getters.btnEvent
    let btnDisabled = store.getters.btnDisabled
    let btn = {
        id: item.id,
        name: item.buttonName,
        type: item.buttonType,
        disabled: false,
        ghost: item.buttonGhost == 1 ? true : false,
        click: () => {}
    }
    if (btnEvent != null && btnEvent[btn.id] != null) {
        btn.click = btnEvent[btn.id]
    }
    if (btnDisabled != null && btnDisabled[btn.id] != null) {
        btn.disabled = btnDisabled[btn.id]
    }
    return btn
}