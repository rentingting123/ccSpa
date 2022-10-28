import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/ant/components'


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
            path: '/detail',
            name: 'detail',
            component: resolve => require(['@/ant/components/detail'], resolve)
        },
        {
            path: '/jxws',
            name: 'jxws',
            component: resolve => require(['@/ant/components/jxws'], resolve)
        },
    ]
})
