import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//console.log(process.env.NODE_ENV)
export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/system/home',
          redirect: '/system/homenew/rolesManage'
        },
        {
          path: '/',
          redirect: process.env.NODE_ENV=="development"?'/system/login':'/system/homenew/rolesManage'
        },
        {
			path: '/system/login',
			name: 'Login',
			component: (resolve)=>require(['@/usercenter/views/login'],resolve),
        },
         //临时路由
         {
            path: '/system/onair',
            name: 'onair',
            component: (resolve)=>require(['@/usercenter/views/common/onair/index'],resolve),
        },
        {
			path: '/system',
			name: 'System',
			component: (resolve)=>require(['@/usercenter/views/index'],resolve),
            children: [
                // home
                {
                    path: 'home/rolesManage',
                    name: 'rolesManage',
                    component: (resolve)=>require(['@/usercenter/views/home/rolesManage/index'],resolve),
                },
                {
                    path: 'home/role',
                    name: 'Role',
                    component: (resolve)=>require(['@/usercenter/views/home/role/index'],resolve),
                },
                {
                    path: 'home/menu',
                    name: 'Menu',
                    component: (resolve)=>require(['@/usercenter/views/home/menu/index'],resolve),
                },
                {
                    path: 'home/messageCheck',
                    name: 'messageCheck',
                    component: (resolve)=>require(['@/usercenter/views/home/messageCheck/index'],resolve),
                    children: [
                        {
                            path: 'checked',
                            name: 'checked',
                            component: (resolve)=>require(['@/usercenter/views/home/messageCheck/checkedMessage/index'],resolve),
                        },
                        {
                            path: 'unchecked',
                            name: 'unchecked',
                            component: (resolve)=>require(['@/usercenter/views/home/messageCheck/uncheckedMessage/index'],resolve),
                        }
                    ]
                },
                {
                    path: 'home/organizationManage',
                    // component: organizationManage,
                    component: (resolve)=>require(['@/usercenter/views/home/organizationManage/index'],resolve),
                    children: [
                        {
                            path: 'list',
                            name: 'rolesManageList',
                            component: (resolve)=>require(['@/usercenter/views/home/organizationManage/common/origanizationList/index'],resolve),
                        },
                        {
                            path: 'out',
                            name: 'rolesManageOut',
                            component: (resolve)=>require(['@/usercenter/views/home/organizationManage/common/origanizationOut/index'],resolve),
                        },
                        {
                            path: 'inner',
                            name: 'rolesManageInner',
                            component: (resolve)=>require(['@/usercenter/views/home/organizationManage/common/origanizationInner/index'],resolve),
                        },
                    ]
                },
                //homenew
                {
                    path: 'homenew/rolesManage',
                    name: 'newrolesManage',
                    component: (resolve)=>require(['@/usercenter/views/homenew/rolesManage/index'],resolve),
                },
                {
                    path: 'homenew/role',
                    name: 'newRole',
                    component: (resolve)=>require(['@/usercenter/views/homenew/role/index'],resolve),
                },
                {
                    path: 'homenew/menu',
                    name: 'newMenu',
                    component: (resolve)=>require(['@/usercenter/views/homenew/menu/index'],resolve),
                },
                {
                    path: 'homenew/collegeManagement',
                    name: 'collegeManagement',
                    component: (resolve)=>require(['@/usercenter/views/homenew/collegeManagement'],resolve),
                },
                {
                    path: 'homenew/publickey',
                    name: 'publickey',
                    component: (resolve)=>require(['@/usercenter/views/homenew/publickey/index'],resolve),
                },
                {
                    path: 'homenew/messageCheck',
                    name: 'newmessageCheck',
                    component: (resolve)=>require(['@/usercenter/views/homenew/messageCheck/index'],resolve),
                    children: [
                        {
                            path: 'checked',
                            name: 'newchecked',
                            component: (resolve)=>require(['@/usercenter/views/homenew/messageCheck/checkedMessage/index'],resolve),
                        },
                        {
                            path: 'unchecked',
                            name: 'newunchecked',
                            component: (resolve)=>require(['@/usercenter/views/homenew/messageCheck/uncheckedMessage/index'],resolve),
                        }
                    ]
                },
                {
                    path: 'homenew/organizationManage',
                    // component: organizationManage,
                    component: (resolve)=>require(['@/usercenter/views/homenew/organizationManage/index'],resolve),
                    children: [
                        {
                            path: 'out',
                            name: 'newrolesManageOut',
                            component: (resolve)=>require(['@/usercenter/views/homenew/organizationManage/common/origanizationOut/index'],resolve),
                        },
                        {
                            path: 'list',
                            name: 'newrolesManageList',
                            component: (resolve)=>require(['@/usercenter/views/homenew/organizationManage/common/origanizationList/index'],resolve),
                        }
                    ]
                },
                
                // expert
                {
                    path: 'expert',
                    // component: organizationManage,
                    component: (resolve)=>require(['@/usercenter/views/expert/index'],resolve),
                    children: [
                        {
                            path: 'expertAccount',
                            name: 'expertAccount',
                            component: (resolve)=>require(['@/usercenter/views/expert/expertAccount/index'],resolve),
                        },
                        {
                            path: 'expertDatabase',
                            name: 'expertDatabase',
                            component: (resolve)=>require(['@/usercenter/views/expert/expertDatabase/index'],resolve),
                        },
                        {
                            path: 'expertTemporary',
                            name: 'expertTemporary',
                            component: (resolve)=>require(['@/usercenter/views/expert/expertTemporary/index'],resolve),
                        },

                    ]
                },
              
                {
                    path: 'expert/message',
                    name: 'message',
                    component: (resolve)=>require(['@/usercenter/views/expert/message/index'],resolve),
                },
            ]
		},
    ]
})
