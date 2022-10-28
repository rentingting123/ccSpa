import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/provinceSkin/components'


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
            component: resolve => require(['@/provinceSkin/components/newsdetail'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/provinceSkin/view/login/login'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/provinceSkin/view/login/register'], resolve)
        },
        {
            path: '/meetingdetail/:id',
            name: 'meetingdetail',
            component: resolve => require(['@/provinceSkin/components/meetingdetail'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            component: resolve => require(['@/provinceSkin/components/newslist'], resolve)
        },
        {
            path: '/introductionPlatform',
            name: 'introductionPlatform',
            component: resolve => require(['@/provinceSkin/components/introductionPlatform'], resolve)
        },
        {
            path: '/helpcenter',
            name: 'helpcenter',
            component: resolve => require(['@/provinceSkin/components/helpcenter'], resolve)
        },
        {
            path: '/expendingServices',
            name: 'expendingServices',
            component: resolve => require(['@/provinceSkin/components/expendingServices'], resolve)
        },
        {
            path: '/competition',
            name: 'competition',
            component: resolve => require(['@/provinceSkin/components/competition'], resolve)
        },
        {
            path: '/reviewdetail',
            name: 'reviewdetail',
            component: resolve => require(['@/provinceSkin/components/reviewdetail'], resolve)
        },
        {
            path: '/person',
            name: 'person',
            component: resolve => require(['@/provinceSkin/view/person'], resolve),
            children:[
                {
                    path: '/',
                    name: 'training',
                    component: resolve => require(['@/provinceSkin/view/person/common'], resolve)
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
