import Vue from '@@/vue'
import Router from 'vue-router'
import home from '@/skin/view/home'
import rulesDetail from '@/skin/view/rulesDetail'
import code from '@/template/training/code'
import sxjmcode from '@/template/sxjm/common/code'
import zhsq from '@/template/zhsq/zhsq'
import submit from '@/template/zhsq/submit'
import pdf from '@/template/sxjm/common/pdf'
// const{Vue} = cvue
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/code',
      name: 'code',
      component: code,
    },
    // 数学建模培训
    {
      path: '/sxjmcode',
      name: 'sxjmcode',
      component: sxjmcode,
    },
    {
      path: '/zhsq',
      name: 'zhsq',
      component: zhsq,
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit,
    },
    {
      path: '/edit',
      name: 'edit',
      component: resolve => require(['@/skin/view/edit'],resolve),
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: resolve => require(['@/template/newsDetail'],resolve)
    },
    {
      path: '/news',
      name: 'news',
      component: resolve => require(['@/template/newsDetail/news'],resolve)
    },
    {
      path: '/rulesDetail/:id',
      name: 'rulesDetail',
      component: rulesDetail
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: pdf,
    },
    {
      path: '/manual',
      name: 'manual',
      component: resolve => require(['@/template/manual/index'],resolve)
    },
    {
      path: '/details/entryGuide',
      name: 'entryGuide',
      component: resolve => require(['@/template/entryGuide/index'],resolve)
    },
    {
      path: '/competition/team/:teamId/:competitionId',
      name: 'groupDetail',
      component: resolve=>require(['@@/views/details/team/teamDetails'],resolve)
    },
    {
      path: '/apply',
      name: 'apply',
      component: resolve => require([`@/template/apply/index`], resolve)
    }
  ]
})

// 解决elementui中的vue-router在3.0版本以上重复点击报错问题 start
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// end

export default  router