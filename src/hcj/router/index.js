import Vue from '@@/vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'datacenter',
            component: resolve => require(['@/hcj/components/datacenter'], resolve),
            children: [{
                path: '/',
                name: 'mainpage',
                component: resolve => require(['@/hcj/view/datacenter/mainpage'], resolve)
            }, ]
        },
        {
            path: '/datacenter',
            name: 'datacenterHome',
            component: resolve => require(['@/hcj/components/datacenter'], resolve),
            children: [{
                    path: '/',
                    name: 'mainpage',
                    component: resolve => require(['@/hcj/view/datacenter/mainpage'], resolve)
                },
                {
                    path: 'news',
                    component: resolve => require(['@/hcj/view/datacenter/news'], resolve),
                    children: [
                        // 组织机构
                        {
                            path: 'organization',
                            name: 'organization',
                            component: resolve => require(['@/hcj/view/datacenter/news/organization'], resolve)
                        },
                        // 制度文件
                        {
                            path: 'filesystem/:id',
                            name: 'filesystem/:id',
                            component: resolve => require(['@/hcj/view/datacenter/news/filesystem'], resolve)
                        },
                        // 赛事动态
                        {
                            path: 'dynamicevents',
                            name: 'dynamicevents',
                            component: resolve => require(['@/hcj/view/datacenter/news/dynamicevents'], resolve)
                        },
                        // 媒体社评
                        {
                            path: 'mediaeditorial',
                            name: 'mediaeditorial',
                            component: resolve => require(['@/hcj/view/datacenter/news/mediaeditorial'], resolve)
                        },
                        // 新闻详情
                        {
                            path: 'detail',
                            name: 'detail',
                            component: resolve => require(['@/hcj/view/datacenter/news/detail'], resolve)
                        },

                    ]
                },
                {
                    path: 'half',
                    component: resolve => require(['@/hcj/view/datacenter'], resolve),
                    children: [
                        // 赛事回顾
                        {
                            path: 'eventreview',
                            name: 'eventreview',
                            component: resolve => require(['@/hcj/view/datacenter/eventreview'], resolve)
                        },
                        // 成果展示
                        {
                            path: 'filesystem/:id',
                            name: 'filesystem/:id',
                            component: resolve => require(['@/hcj/view/datacenter/news/filesystem'], resolve)
                        },
                        // 赛事简讯
                        {
                            path: 'communication',
                            name: 'communication',
                            component: resolve => require(['@/hcj/view/datacenter/news/communication'], resolve)
                        },
                        // 历届作品
                        {
                            path: 'previousworks',
                            name: 'harfpreviousworks',
                            component: resolve => require(['@/hcj/view/datacenter/previousworks'], resolve)
                        },
                        // 优秀作品集
                        {
                            path: 'excellenceworks',
                            name: 'excellenceworks',
                            component: resolve => require(['@/hcj/view/datacenter/excellenceworks'], resolve)
                        },
                    ]
                },
                // 历届作品
                {
                    path: 'previousworks',
                    name: 'harfpreviousworks',
                    component: resolve => require(['@/hcj/view/datacenter/previousworks'], resolve)
                },
                // 赛事回顾
                {
                    path: 'eventreview',
                    name: 'eventreview',
                    component: resolve => require(['@/hcj/view/datacenter/eventreview'], resolve)
                },
                // 指导培训 
                {
                    path: 'trainingsession',
                    name: 'trainingsession',
                    component: resolve => require(['@/hcj/view/datacenter/trainingsession'], resolve)
                },
                // 培训详情
                {
                    path: 'trainingsessiondetail/:id',
                    name: 'trainingsessiondetail',
                    component: resolve => require(['@/hcj/components/meetingdetail'], resolve)
                },
                // 省市分区赛
                {
                    path: 'divisionseries',
                    name: 'divisionseries',
                    component: resolve => require(['@/hcj/view/datacenter/divisionseries'], resolve)
                },
                // 我要投稿
                {
                    path: 'contribute/:id',
                    name: 'contribute',
                    component: resolve => require(['@/hcj/view/datacenter/contribute'], resolve)
                },
                // 新闻详情
                {
                    path: 'newsdetail',
                    name: 'newsdetail',
                    component: resolve => require(['@/hcj/view/datacenter/newsdetail'], resolve)
                },
                // 历届作品详情
                {
                    path: 'preworkDatails',
                    name: 'preworkDatails',
                    component: resolve => require(['@/hcj/view/datacenter/preworkDatails'], resolve)
                },
                // 搜索页面
                {
                    path: 'searchlist',
                    name: 'searchlist',
                    component: resolve => require(['@/hcj/view/datacenter/searchlist'], resolve)
                },
                // 联系我们
                {
                    path: 'contact',
                    name: 'contact',
                    component: resolve => require(['@/hcj/view/datacenter/contact'], resolve)
                },
                // 常见问答
                {
                    path: 'helpcenter',
                    name: 'helpcenter',
                    component: resolve => require(['@/hcj/view/datacenter/helpcenter'], resolve)
                },
            ]
        },
        {
            path: '/apply',
            name: 'apply',
            meta: { noBanner: true ,noFooter: true },
            component: resolve => require(['@/template/apply'], resolve)
        },
        {
            path: '/competition/team/:teamId/:competitionId',
            name: 'groupDetail',
            meta: { noBanner: true ,noFooter: true },
            component: resolve=>require(['@@/views/details/team/teamDetails'],resolve)
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