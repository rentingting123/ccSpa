import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '../views/index.vue'
import submit from '../views/submit.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'mainpage',
          component: mainpage
        },
        {
          path: '/submit',
          name: 'submit',
          component: submit
        }
    ]
})
