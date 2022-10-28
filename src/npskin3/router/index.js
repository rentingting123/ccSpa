import Vue from '@@/vue'
import Router from 'vue-router'
import mainpage from '@/npskin3/view/mainpage'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'mainpage',
            component: mainpage
        },
        {
            path: '/news',
            name: 'news',
            component: resolve => require(['@/npskin3/view/news'], resolve)
        },
        {
            path: '/details/:id',
            name: 'details',
            component: resolve => require(['@/npskin3/view/newsdetails'], resolve)
        },
        {
            path: '/zhsq',
            name: 'zhsq',
            meta: { noBanner: true ,noFooter: true },
            component: resolve => require(['@/template/zhsq/zhsq'], resolve)
        },
        {
            path: '/submit',
            name: 'submit',
            meta: { noBanner: true ,noFooter: true },
            component: resolve => require(['@/template/zhsq/submit'], resolve)
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return
        return { x: 0, y: 0 }
    }
})
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};