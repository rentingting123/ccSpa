import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/zjskin/components'


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
            path: '/newsdetail',
            name: 'newsdetail',
            component: resolve => require(['@/zjskin/components/newsdetail'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/zjskin/view/login/login'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/zjskin/view/login/register'], resolve)
        },
        {
            path: '/meetingdetail/:id',
            name: 'meetingdetail',
            component: resolve => require(['@/zjskin/components/meetingdetail'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            component: resolve => require(['@/zjskin/components/newslist'], resolve)
        },
        {
            path: '/introductionPlatform',
            name: 'introductionPlatform',
            component: resolve => require(['@/zjskin/components/introductionPlatform'], resolve)
        },
        {
            path: '/helpcenter',
            name: 'helpcenter',
            component: resolve => require(['@/zjskin/components/helpcenter'], resolve)
        },
        {
            path: '/expendingServices',
            name: 'expendingServices',
            component: resolve => require(['@/zjskin/components/expendingServices'], resolve)
        },
        {
            path: '/competition',
            name: 'competition',
            component: resolve => require(['@/zjskin/components/competition'], resolve)
        },
        {
            path: '/person',
            name: 'person',
            component: resolve => require(['@/zjskin/view/person'], resolve),
            children:[
                {
                    path: '/',
                    name: 'training',
                    component: resolve => require(['@/zjskin/view/person/common'], resolve)
                },
                {
                    path: 'credential',
                    name: 'credential',
                    component: resolve => require(['@@/views/personalCenter/credential/index'], resolve)
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: resolve => require(['@@/views/personalCenter/profile/user'], resolve)
                }
            ]
        }
    ],
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) return
    return { x: 0, y: 0 }
  }
})
