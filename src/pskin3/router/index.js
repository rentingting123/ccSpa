import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/pskin3/view/mainpage'


Vue.use(Router)

let router = new Router({
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
            component: resolve => require(['@/provinceSkin/components/helpcenter'], resolve)
        },
        {
            path: '/expendingServices',
            name: 'expendingServices',
            component: resolve => require(['@/provinceSkin/components/expendingServices'], resolve)
        },
        {
            path: '/introductionPlatform',
            name: 'introductionPlatform',
            component: resolve => require(['@/provinceSkin/components/introductionPlatform'], resolve)
        },
        {
            path: '/newslist',
            name: 'newslist',
            component: resolve => require(['@/pskin3/view/newslist'], resolve)
        },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: resolve => require(['@/pskin3/view/newsdetail'], resolve)
        },
        {
            path: '/competition',
            name: 'competition',
            component: resolve => require(['@/pskin3/view/competition'], resolve)
        },
        {
            path: '/train',
            name: 'train',
            component: resolve => require(['@/pskin/components/training'], resolve)
        },
        {
            path: '/meetingdetail/:id',
            name: 'meetingdetail',
            component: resolve => require(['@/provinceSkin/components/meetingdetail'], resolve)
        },
        {
            path: '/reviewdetail',
            name: 'reviewdetail',
            component: resolve => require(['@/provinceSkin/components/reviewdetail'], resolve)
        },
        {
            path: '/search/:name',
            name: 'search',
            component: resolve => require(['@/pskin/components/search'], resolve)
        },
        {
            path: '/person',
            name: 'person',
            component: resolve => require(['@/provinceSkin/view/person'], resolve),
            children:[
                {
                    path: '/',
                    name: 'train',
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

// 解决elementui中的vue-router在3.0版本以上重复点击报错问题 start
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}
// end

export default router;
