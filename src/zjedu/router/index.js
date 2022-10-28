import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: resolve=>require(['@/zjedu/view/mainpage'],resolve)
        },
        {
            path: '/course',
            name: 'course',
            component: resolve=>require(['@/zjedu/view/course'],resolve)
        },
        {
            path: '/training/:id',
            name: 'trainingdetails',
            component: resolve=>require(['@/zjedu/view/training/detail'],resolve)
        },
        {
            path: '/training',
            name: 'training',
            component: resolve=>require(['@/zjedu/view/training'],resolve)
        },
        // {
        //     path: '/newslist',
        //     name: 'newslist',
        //     component: resolve => require(['@/nskin/view/newslist'], resolve)
        // },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: resolve => require(['@/nskin/view/newsdetail'], resolve)
        },
        {
            path: '/trainingdetail',
            name: 'trainingdetail',
            component: resolve=>require(['@/zjedu/view/trainingdetail'],resolve)
        },
        {
            path: '/online',
            name: 'online',
            component: resolve=>require(['@/zjedu/view/online'],resolve)
        },
        
    ],
    scrollBehavior (to, from, savedPosition) {
        if(savedPosition) return
        return { x: 0, y: 0 }
    }
})
