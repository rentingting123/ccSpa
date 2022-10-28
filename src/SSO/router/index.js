import Vue from '@@/vue'
import Router from 'vue-router'
import home from '@/SSO/App'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

const router= new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: home,
      children:[
          {
            path: '',
            component: resolve => require(['@/SSO/views/login/login'],resolve)
          },
          // 登录
          {
            path: 'login',
            component: resolve => require(['@/SSO/views/login/login'],resolve)
          },
          // 注册
          {
              path: 'register',
              name: 'register',
              component: resolve => require(['@/SSO/views/register'],resolve)
          },
          // 绑定手机号
          {
            path: 'bind',
            name: 'bind',
            component: resolve => require(['@/SSO/views/bind/bindphone'],resolve)
          },
          // 找回密码
          {
            path: 'retrieve',
            name: 'retrieve',
            component: resolve => require(['@/SSO/views/retrieve'],resolve)
          },
           // 修改密码
           {
            path: 'modify',
            name: 'modify',
            component: resolve => require(['@/SSO/views/modify'],resolve)
          },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.query.service){
    next()
  }
  else if(from.query.service){
    next(`${to.path}?service=${from.query.service}`)
  }else{
      next()
  }

})

export default router