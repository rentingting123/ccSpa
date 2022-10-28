import Vue from '@@/vue'
import Router from 'vue-router'
import mainpage from '@/npskin2/components'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: mainpage
        },
        {
            path: '/home',
            name: 'datacenter',
            component: resolve => require(['@/npskin2/components/datacenter'], resolve),
            children: [{
                path: '/',
                name: 'mainpage',
                component: resolve => require(['@/npskin2/view/datacenter/mainpage'], resolve)
            }, ]
        },

        {
            path: '/datacenter',
            name: 'datacenterHome',
            component: resolve => require(['@/npskin2/components/datacenter'], resolve),
            children: [{
                    path: '/',
                    name: 'mainpage',
                    component: resolve => require(['@/npskin2/view/datacenter/mainpage'], resolve)
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
                            name: 'filesystem/:id',
                            component: resolve => require(['@/npskin/view/datacenter/news/filesystem'], resolve)
                        },
                        {
                            path: 'dynamicevents',
                            name: 'dynamicevents',
                            component: resolve => require(['@/npskin/view/datacenter/news/dynamicevents'], resolve)
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
                    component: resolve => require(['@/npskin/view/datacenter/divisionseries'], resolve),
                    props: { npskin2: true }
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
                {
                    path: 'searchlist',
                    name: 'searchlist',
                    component: resolve => require(['@/npskin/view/datacenter/searchlist'], resolve)
                },


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