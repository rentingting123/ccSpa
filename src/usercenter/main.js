// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import './assets/css/reset.css'
import './css/common.css'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store.js'
import api from './api/api.js'
import network from './api/network.js'
import webapi from './api/webapi.js'
import * as filter from './filter/filter.js' //筛选器

Vue.config.productionTip = false


import iview from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(iview);

Object.keys(filter).forEach(key=>{
    Vue.filter(key,filter[key])
})

Vue.prototype.$api = api
Vue.prototype.$netcode = network
Vue.prototype.$webapi = webapi
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
