import Vue from '@@/vue'
import Router from 'vue-router'
import home from '@/pps/view/home'
import Layout from '@/pps/components/Layout'
Vue.use(Router)

// 解决elementui中的vue-router在3.0版本以上重复点击报错问题 start
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// end


let router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/pps',
      name:'推送系统',
      component: Layout,
      children:[
        {
          path:'/',
          name:'手动推送消息',
          component: resolve => require(['@/pps/view/pps'],resolve),
        },
        {
          path:'scenetemplate',
          name:'场景模板推送',
          component: resolve => require(['@/pps/view/pps/scenetemplate'],resolve),
        },
        {
          path:'createconttemplate',
          name:'创建场景模板',
          component: resolve => require(['@/pps/view/pps/createconttemplate'],resolve),
        },
        {
          path:'contenttmplate',
          name:'内容模板设置',
          component: resolve => require(['@/pps/view/pps/contenttmplate'],resolve),
        },
        {
          path:'addnewtemplate',
          name:'新增内容模板',
          component: resolve => require(['@/pps/view/pps/addnewtemplate'],resolve),
        },
        {
          path:'messagepush',
          name:'消息推送审核',
          component: resolve => require(['@/pps/view/pps/messagepush'],resolve),
        },
        {
          path:'messagesimulation',
          name:'消息模拟推送',
          component: resolve => require(['@/pps/view/pps/messagesimulation'],resolve),
        },
        {
          path:'messagestatistics',
          name:'消息推送统计',
          component: resolve => require(['@/pps/view/pps/messagestatistics'],resolve),
        },
      ]
    },
    {
      path:'/tab',
      name:'推送系统',
      component: Layout,
      children:[
        {
          path:'index',
          name:'用户标签库',
          component: resolve => require(['@/pps/view/tab'],resolve),
        },
        {
          path:'setclass',
          name:'设置分类',
          component: resolve => require(['@/pps/view/tab/setclass'],resolve),
        },
        {
          path:'addtab',
          name:'创建用户标签',
          component: resolve => require(['@/pps/view/tab/addtab'],resolve),
        },
        {
          path:'contentaddtab',
          name:'创建内容标签',
          component: resolve => require(['@/pps/view/tab/contentaddtab'],resolve),
        },
        {
          path:'dataaddtab',
          name:'创建数据标签',
          component: resolve => require(['@/pps/view/tab/dataaddtab'],resolve),
        },
        {
          path:'contenttab',
          name:'内容标签库',
          component: resolve => require(['@/pps/view/tab/contenttab'],resolve),
        },
        {
          path:'datatab',
          name:'数据标签库',
          component: resolve => require(['@/pps/view/tab/datatab'],resolve),
        }
      ]
    },
    {
      path:'/contents',
      name:'内容库',
      component: Layout,
      children:[
        {
          path:'index',
          name:'用户标签库',
          component: resolve => require(['@/pps/view/contents'],resolve),
        },
        // {
        //   path:'innovate',
        //   name:'创新成果系统',
        //   component: resolve => require(['@/pps/view/contents/innovate'],resolve),
        // },{
        //   path:'scientificResearch',
        //   name:'科研训练系统',
        //   component: resolve => require(['@/pps/view/contents/scientificResearch'],resolve),
        // },{
        //   path:'dateInnovate',
        //   name:'创新成果系统',
        //   component: resolve => require(['@/pps/view/contents/dateInnovate'],resolve),
        // },
      ]
    },
   
    // 登录
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/pps/view/login'],resolve)
    },
    {
      path: '/onepush',
      name: '个推空间',
      component: resolve => require(['@/pps/view/onepush/index'],resolve)
    },
    {
      path: '/details',
      name: '个推空间详情',
      component: resolve => require(['@/pps/view/onepush/details'],resolve)
    },
    // 登录
    {
      path: '/home',
      name: 'home',
      component: home
    },
  ]
})
// 白名单控制

// router.beforeEach((to, from, next)=>{
//   let white_url = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).white_url || []
//   white_url.push('/')
//   white_url.push('/home')
//   white_url.push('/pps')

//   if(white_url.includes(to.path)){
//     next()
//   }else{
//     next('/')
//   }
// })

export default router
