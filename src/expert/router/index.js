import Vue from 'vue'
import Router from 'vue-router'
import webapi from '../api/webapi.js'
import {isLogin} from "@/common/common"
Vue.use(Router)

let router =  new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          redirect: '/expert/judge',
          meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              title: "竞赛评审"
          },
        },
        {
			path: '/expert/login',
			name: 'Login',
			component: (resolve)=>require(['@/expert/views/login/login'],resolve),
            meta: {
                requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
                title: "登录"
            },
        },
        {
			path: '/expert',
			name: 'Expert',
			component: (resolve)=>require(['@/expert/views/index'],resolve),
            meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
            children:[
                {
                    path: 'setting',
                    name: 'setting',
                    meta: {title: "评审设置"},
                    component: (resolve)=>require(['@/expert/views/setting'],resolve),
                },
                {
                    path: 'works',
        			name: 'works',
                    meta:{title: "分配作品"},
        			component: (resolve)=>require(['@/expert/views/works'],resolve)
                },
                {
                    path: 'judge',
        			name: 'Judge',
                    meta:{title: "竞赛评审"},
        			component: (resolve)=>require(['@/expert/views/judge/index'],resolve)
                },
                {
                    path: 'record',
        			name: 'Record',
                    meta:{title: "分配记录"},
        			component: (resolve)=>require(['@/expert/views/record/record'],resolve)
                },
                {
                    path: 'worksrecord',
        			name: 'worksrecord',
                    meta:{title: "作品分配记录"},
        			component: (resolve)=>require(['@/expert/views/worksrecord/worksrecord'],resolve)
                },
                {
                    path: 'statistics',
        			name: 'Statistics',
                    meta:{title: "分配统计"},
        			component: (resolve)=>require(['@/expert/views/statistics/statistics'],resolve)
                },
                {
                    path: 'filtrate',
        			name: 'Filtrate',
                    meta:{title: "晋级淘汰"},
        			component: (resolve)=>require(['@/expert/views/filtrate/filtrate'],resolve)
                },
                {
                    path: 'result',
        			name: 'Result',
                    meta:{title: "结果查看"},
        			component: (resolve)=>require(['@/expert/views/result/result'],resolve)
                },
                {
                    path: 'public',
        			name: 'public',
                    meta:{title: "颁奖发布"},
        			component: (resolve)=>require(['@/expert/views/public/public'],resolve)
                },
            ]
		},
        {
			path: '/expert/detail',
			name: 'Detail',
			component: (resolve)=>require(['@/expert/views/detail/detail'],resolve),
            meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                title: "作品详情"
	        },
        },
        {
			path: '/expert/user',
			name: 'User',
            component: (resolve)=>require(['@/expert/views/user/index'],resolve),
            meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                title: "个人中心"
	        },
		},
    ]
})

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


// 判断页面是否需要登录
router.beforeEach((to, from , next) => {

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }

    // console.log(to.matched.some(record => record.meta.requireAuth));
    // console.log(to.matched);
    /*判断下一个路由是否需要登录，对其进行验证*/
    if(to.matched.some(record => record.meta.requireAuth)) {
        let hasAuth=isLogin() //判断用户是否登录
        if(!Boolean(hasAuth)) next("/expert/login")
    }
    next()
})

export default router
