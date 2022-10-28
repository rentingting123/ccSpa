import Vue from '@@/vue'
import Router from 'vue-router'
import mainpage from '@/npskin/components'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'datacenter',
            component: resolve => require(['@/pnskin/components/datacenter'], resolve),
            children: [{
                path: '/',
                name: 'mainpage',
                component: resolve => require(['@/pnskin/view/datacenter/mainpage'], resolve)
            }, ]
        },
        {
            path: '/datacenter',
            name: 'datacenterHome',
            component: resolve => require(['@/pnskin/components/datacenter'], resolve),
            children: [{
                    path: '/',
                    name: 'mainpage',
                    component: resolve => require(['@/pnskin/view/datacenter/mainpage'], resolve)
                },
                {
                    path: 'news',
                    component: resolve => require(['@/npskin/view/datacenter/news'], resolve),
                    children: [{
                            path: 'organization',
                            name: 'organization',
                            component: resolve => require(['@/npskin/view/datacenter/news/organization'], resolve)
                        },
                        {
                            path: 'filesystem/:id',
                            name: 'filesystem',
                            component: resolve => require(['@/npskin/view/datacenter/news/filesystem'], resolve)
                        },
                        {
                            path: 'dynamicevents',
                            name: 'dynamicevents',
                            component: resolve => require(['@/npskin/view/datacenter/news/dynamicevents'], resolve)
                        },
                        {
                            path: 'communication',
                            name: 'communication',
                            component: resolve => require(['@/npskin/view/datacenter/news/communication'], resolve)
                        },
                        {
                            path: 'mediaeditorial',
                            name: 'mediaeditorial',
                            component: resolve => require(['@/npskin/view/datacenter/news/mediaeditorial'], resolve)
                        },
                        {
                            path: 'detail',
                            name: 'detail',
                            component: resolve => require(['@/npskin/view/datacenter/news/detail'], resolve)
                        },
                    ]
                },
                {
                    path: 'half',
                    component: resolve => require(['@/npskin/view/datacenter'], resolve),
                    children: [{
                            path: 'eventreview',
                            name: 'eventreview',
                            component: resolve => require(['@/npskin/view/datacenter/eventreview'], resolve)
                        },
                        {
                            path: 'filesystem/:id',
                            name: 'filesystem/:id',
                            component: resolve => require(['@/npskin/view/datacenter/news/filesystem'], resolve)
                        },
                        {
                            path: 'communication',
                            name: 'communication',
                            component: resolve => require(['@/npskin/view/datacenter/news/communication'], resolve)
                        },
                        {
                            path: 'worksresult',
                            name: 'worksresult',
                            component: resolve => require(['@/npskin/view/datacenter/worksresult'], resolve)
                        },
                        {
                            path: 'previousworks',
                            name: 'previousworks',
                            component: resolve => require(['@/npskin/view/datacenter/previousworks'], resolve)
                        },
                    ]
                },

                {
                    path: 'previousworks',
                    name: 'previousworks',
                    component: resolve => require(['@/npskin/view/datacenter/previousworks'], resolve)
                },
                {
                    path: 'worksresult',
                    name: 'worksresult',
                    component: resolve => require(['@/npskin/view/datacenter/worksresult'], resolve)
                },
                {
                    path: 'eventreview',
                    name: 'eventreview',
                    component: resolve => require(['@/npskin/view/datacenter/eventreview'], resolve)
                },
                {
                    path: 'trainingsession',
                    name: 'trainingsession',
                    component: resolve => require(['@/npskin/view/datacenter/trainingsession'], resolve)
                },
                {
                    path: 'trainingsessiondetail/:id',
                    name: 'trainingsessiondetail',
                    component: resolve => require(['@/npskin/components/meetingdetail'], resolve)
                },
                {
                    path: 'divisionseries',
                    name: 'divisionseries',
                    redirect: '/datacenter',
                    //component: resolve => require(['@/npskin/view/datacenter/divisionseries'], resolve)
                },
                {
                    path: 'contribute/:id',
                    name: 'contribute',
                    component: resolve => require(['@/npskin/view/datacenter/contribute'], resolve)
                },
                {
                    path: 'newsdetail',
                    name: 'newsdetail',
                    component: resolve => require(['@/npskin/view/datacenter/newsdetail'], resolve)
                },



            ]
        },
        {
            path: '/competition/team/:teamId/:competitionId',
            name: 'groupDetail',
            component: resolve => require(['@@/views/details/team/teamDetails'], resolve)
        },
        {
            path: '/apply',
            name: 'apply',
            component: resolve => require([`@/template/apply/index`], resolve),
            children: [{
                    path: '',
                    name: 'user',
                    component: resolve => require([`@/template/apply/common/user.vue`], resolve)
                },
                {
                    path: 'signup',
                    name: 'signup',
                    //[`@/view/apply/common/signup`]
                    component: resolve => require([`@/template/apply/common/signup.vue`], resolve)
                },
                {
                    path: '/details/team',
                    name: 'teamList',
                    component: resolve => require(['@@/views/details/team/team'], resolve)
                },
                {
                    path: 'upload',
                    name: 'upload',
                    component: resolve => require([`@/template/apply/common/upload`], resolve)
                }
            ]
        },
        {
            path: '/details/entryGuide',
            name: 'entryGuide',
            meta: { noBanner: true },
            component: resolve => require(['@/template/entryGuide/index'], resolve)
        },
        {
            path: '/manual',
            name: 'manual',
            meta: { noBanner: true },
            component: resolve => require(['@/template/manual/index'], resolve)
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