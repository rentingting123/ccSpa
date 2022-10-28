import Vue from '@@/vue'
import Router from 'vue-router'
import home from '@/operate/view/home'

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
    // 皮肤管理
    {
      path: '/tool',
      name: 'tool',
      component: home,
      children:[
          {
              path: '',
              redirect: '/tool/skin'
          },
          {
              path: 'skin',
              name: 'skin',
              component: resolve => require(['@/operate/view/tool/skin'],resolve)
          },
          {
            path: 'pskin',
            name: 'pskin',
            component: resolve => require(['@/operate/view/tool/pskin'],resolve)
          },
          {
            path: 'eskin',
            name: 'eskin',
            component: resolve => require(['@/operate/view/tool/eskin'],resolve)
          },
          {
            path: 'seriesskin',
            name: 'seriesskin',
            component: resolve => require(['@/operate/view/tool/seriesskin'],resolve)
          },
          {
            path: 'customizeskin',
            name: 'customizeskin',
            component: resolve => require(['@/operate/view/tool/customizeskin'],resolve)
          },
      ]
    },
    // 审核管理
    {
      path: '/manage',
      name: 'manage',
      component: home,
      children:[
          {
            path: 'manage',
            name: 'manage',
            component: resolve => require(['@/operate/view/manage/manage'],resolve)
          },
          {
            path: 'resource',
            name: 'resource',
            component: resolve => require(['@/operate/view/manage/resource'],resolve)
          },
          {
            path: 'universitieSettled',
            name: 'universitieSettled',
            component: resolve => require(['@/operate/view/manage/universitieSettled'],resolve)
          },
          {
            path: 'apply',
            name: 'apply',
            component: resolve => require(['@/operate/view/manage/apply'],resolve)
          },
          {
            path: 'competition',
            name: 'competition',
            component: resolve => require(['@/operate/view/manage/competition'],resolve)
          },
      ]
    },
    // 高校数据统计
    {
      path: '/data',
      name: 'data',
      component: home,
      children:[
          {
              path: '/',
              name: 'cumulative',
              component: resolve => require(['@/operate/view/dataStatistical/cumulative'],resolve)
          },
          {
              path: 'provincialCoverage',
              name: 'provincialCoverage',
              component: resolve => require(['@/operate/view/dataStatistical/provincialCoverage'],resolve)
          },
          {
              path: 'schoolCoverage',
              name: 'schoolCoverage',
              component: resolve => require(['@/operate/view/dataStatistical/schoolCoverage'],resolve)
          },
          {
              path: 'schoolList',
              name: 'schoolList',
              component: resolve => require(['@/operate/view/dataStatistical/schoolList'],resolve)
          },
          {
            path: 'service',
            name: 'service',
            component: resolve => require(['@/operate/view/data/service'],resolve)
          },
          
      ]
    },
    // 证书
    {
      path: '/cert',
      name: 'cert',
      component: home,
      children:[
          {
              path: '/',
              name: 'cert',
              component: resolve => require(['@/operate/view/cert/manage'],resolve)
          },
          {
              path: 'manage',
              name: 'manage',
              component: resolve => require(['@/operate/view/cert/manage'],resolve)
          }
      ]
    },
    // 登录
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/operate/view/login'],resolve)
    },
    // 发线上
    {
      path: '/service',
      name: 'service',
      component: home,
      children:[
        {
            path: 'type',
            name: 'servicetype',
            component: resolve => require(['@/operate/view/service/type'],resolve)
        },
        {
            path: 'lists',
            name: 'servicelists',
            component: resolve => require(['@/operate/view/service/lists'],resolve)
        },
        {
          path: 'download',
          name: 'servicelists',
          component: resolve => require(['@/operate/view/service/download'],resolve)
        },
        {
            path: 'detail',
            name: 'servicedetail',
            component: resolve => require(['@/operate/view/service/detail'],resolve)
        },
      ]
    },
    // 学校管理
    {
      path: '/school',
      name: 'school',
      component: home,
      children:[
        {
            path: '/',
            name: 'school',
            component: resolve => require(['@/operate/view/school'],resolve)
        },
      ]
    },
    // 客服操作
    {
      path: '/operate',
      name: 'operate',
      component: home,
      children:[
        {
            path: '/',
            name: 'operate',
            component: resolve => require(['@/operate/view/operate'],resolve)
        },
      ]
    },
    // 特殊新闻发布
    {
      path: '/news',
      name: 'news',
      component: home,
      children:[
        {
            path: '/',
            name: 'news',
            component: resolve => require(['@/operate/view/news'],resolve)
        },
        {
            path: 'issue',
            name: 'issue',
            component: resolve => require(['@/operate/view/news/issue'],resolve)
        },
        {
          path: 'types',
          name: 'types',
          component: resolve => require(['@/operate/view/news/types'],resolve)
        },
      ]
    },
    // 权限控制
    {
      path: '/roles',
      name: 'roles',
      component: home,
      children:[
        {
            path: '/',
            name: 'rolesUser',
            component: resolve => require(['@/operate/view/roles/user'],resolve)
        },
        {
            path: 'persission',
            name: 'rolesPersission',
            component: resolve => require(['@/operate/view/roles/persission'],resolve)
        },
        {
          path: 'role',
          name: 'rolesRole',
          component: resolve => require(['@/operate/view/roles/role'],resolve)
        },
      ]
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

router.beforeEach((to, from, next)=>{
  let white_url = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).white_url || []
  white_url.push('/')
  white_url.push('/home')

  if(white_url.includes(to.path)){
    next()
  }else{
    next('/')
  }
})

export default router
