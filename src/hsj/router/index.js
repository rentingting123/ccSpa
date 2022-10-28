import Vue from '@@/vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: resolve => require(['@/hsj/view/mainpage'], resolve)
        },
        {
            path: '/datacenter',
            name: 'datacenterHome',
            component: resolve => require(['@/hsj/view/datacenter'], resolve),
            children: [
                {
                    path: 'mainpage',
                    name: 'mainpage',
                    component: resolve => require(['@/hsj/view/mainpage'], resolve)
                },
                {
                    path: 'about',
                    name: 'about',
                    component: resolve => require(['@/hsj/view/datacenter/about'], resolve)
                },
                {
                    path: 'organizational',
                    name: 'organizational',
                    component: resolve => require(['@/hsj/view/datacenter/organizational'], resolve)
                },
                {
                    path: 'training',
                    name: 'training',
                    component: resolve => require(['@/hsj/view/datacenter/training'], resolve)
                },
                {
                    path: 'forum',
                    name: 'forum',
                    component: resolve => require(['@/hsj/view/datacenter/forum'], resolve)
                },
                {
                    path: 'award',
                    name: 'award',
                    component: resolve => require(['@/hsj/view/datacenter/award'], resolve)
                },
                {
                    path: 'participate',
                    name: 'participate',
                    component: resolve => require(['@/hsj/view/datacenter/participate'], resolve)
                },
                {
                    path: 'choose',
                    name: 'choose',
                    component: resolve => require(['@/hsj/view/datacenter/choose'], resolve)
                },
                
            ]
        },
    ]
})