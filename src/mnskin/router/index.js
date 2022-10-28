import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/mnskin/view/mainpage'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: mainpage
        },
        {
            path: '/development',
            name: 'development',
            component: resolve => require(['@/mnskin/view/development'], resolve)
        },
        {
            path: '/assessment',
            name: 'assessment',
            component: resolve => require(['@/mnskin/view/assessment'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            component: resolve => require(['@/mnskin/view/newslist'], resolve)
        },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: resolve => require(['@/mnskin/view/newsdetail'], resolve)
        },
         // 竞赛博览会
         {
            path: '/competitionExpo',
            name: 'competitionExpo',
            component: resolve => require(['@/mnskin/view/competitionExpo'], resolve),
        },
        {
            path: '/competitionExpo/detail/:id',
            name: 'competitionExpoDetail',
            component: resolve => require(['@/mnskin/view/empowerment/detail'], resolve),
        },
        {
            path: '/empowerment',
            name: 'empowerment',
            component: resolve => require(['@/mnskin/view/empowerment'], resolve),
        },
        {
            path: '/empowerment/detail/:id',
            name: 'empowermentDetail',
            component: resolve => require(['@/mnskin/view/empowerment/detail'], resolve),
        },
        // 竞赛赋能-竞赛征集
        {
            path: '/empowerment/solicitation',
            name: 'empowermentSolicitation',
            component: resolve => require(['@/mnskin/view/empowerment/solicitation'], resolve)
        },
        // 第一版竞赛赋能 h5 已弃用
        {
            path: '/compdetail',
            name: 'compdetail',
            component: resolve => require(['@/mnskin/view/compdetail'], resolve)
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if(savedPosition) return
        return { x: 0, y: 0 }
    }
})
