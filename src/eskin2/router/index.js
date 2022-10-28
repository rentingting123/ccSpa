import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/eskin2/components'


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
            path: '/helpcenter',
            name: 'helpcenter',
            component: resolve => require(['@/eskin/components/helpcenter'], resolve)
        },
        {
            path: '/expendingServices',
            name: 'expendingServices',
            component: resolve => require(['@/eskin/components/expendingServices'], resolve)
        },
        {
            path: '/introductionPlatform',
            name: 'introductionPlatform',
            component: resolve => require(['@/eskin/components/introductionPlatform'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            component: resolve => require(['@/eskin2/components/newslist'], resolve)
        },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: resolve => require(['@/eskin2/components/newsdetail'], resolve)
        },
        {
            path: '/competition',
            name: 'competition',
            component: resolve => require(['@/eskin2/components/competition'], resolve)
        },
        {
            path: '/train',
            name: 'train',
            component: resolve => require(['@/eskin2/components/training'], resolve)
        },
        {
            path: '/meetingdetail/:id',
            name: 'meetingdetail',
            component: resolve => require(['@/eskin/components/meetingdetail'], resolve)
        },
        {
            path: '/schooldetail/:id',
            name: 'schooldetail',
            component: resolve => require(['@/eskin/components/school'], resolve)
        },
        {
            path: '/search/:name',
            name: 'search',
            component: resolve => require(['@/eskin/components/search'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/eskin/view/login/login'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/eskin/view/login/register'], resolve)
        },
        {
            path: '/reviewdetail',
            name: 'reviewdetail',
            component: resolve => require(['@/eskin/components/reviewdetail'], resolve)
        },
        {
            path: '/person',
            name: 'person',
            component: resolve => require(['@/eskin/view/person'], resolve),
            children:[
                {
                    path: '/',
                    name: 'train',
                    component: resolve => require(['@/eskin/view/person/common'], resolve)
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
