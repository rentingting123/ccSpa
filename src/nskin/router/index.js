import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/nskin/view/mainpage'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: mainpage
        },
        // 平台简介
        {
            path: '/introductionPlatform',
            name: 'introductionPlatform',
            component: (resolve) => require(['@@/views/introduction/platform/index.vue'], resolve)
        },
        // 拓展服务
        {
            path: '/expendingServices',
            name: 'expendingServices',
            component: (resolve) => require(['@@/views/introduction/expendingServices/index.vue'], resolve)
        },
        // 帮助中心
        {
            path: '/helpcenter',
            name: 'helpcenter',
            component: (resolve) => require(['@@/views/introduction/helpcenter/index.vue'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            component: resolve => require(['@/nskin/view/newslist'], resolve)
        },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: resolve => require(['@/nskin/view/newsdetail'], resolve)
        },

        {
            path: '/assessment',
            name: 'assessment',
            component: resolve => require(['@/nskin/view/competition'], resolve)
        },
        {
            path: '/development',
            name: 'development',
            component: resolve => require(['@/nskin/view/development'], resolve)
        },
        {
            path: '/hotmap',
            name: 'hotmap',
            component: resolve => require(['@/nskin/view/hotmap'], resolve)
        },
        {
            path: '/competition',
            name: 'competition',
            component: resolve => require(['@/nskin/view/assessment'], resolve)
        },
        // 竞赛博览会
        {
            path: '/competitionExpo',
            name: 'competitionExpo',
            component: resolve => require(['@/nskin/view/competitionExpo'], resolve),
        },
        {
            path: '/competitionExpo/detail/:id',
            name: 'competitionExpodetail',
            component: resolve => require(['@/nskin/view/competitionExpo/detail'], resolve)
        },
        // 竟赛赋能
        {
            path: '/empowerment',
            name: 'empowerment',
            component: resolve => require(['@/nskin/view/empowerment'], resolve)
        },
        // 竞赛赋能-赛事宣传
        {
            path: '/empowerment/detail/:id',
            name: 'empowermentdetail',
            component: resolve => require(['@/nskin/view/empowerment/detail'], resolve)
        },
        // 竞赛赋能-竞赛征集
        {
            path: '/empowerment/solicitation',
            name: 'empowermentSolicitation',
            component: resolve => require(['@/nskin/view/empowerment/solicitation'], resolve)
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return
        return { x: 0, y: 0 }
    }
})

// 解决elementui中的vue-router在3.0版本以上重复点击报错问题 start
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// end

export default router;
