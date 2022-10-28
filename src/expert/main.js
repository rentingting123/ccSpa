// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from '@@/i18n'


// 公公样式
import './css/common.css'
import api from './api/index.js'
import network from './api/network.js'
import webapi from './api/webapi.js'

import store from './vuex/store';
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
// import '@babel/polyfill'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(iView)


Vue.prototype.$api = api
Vue.prototype.$netcode = network
Vue.prototype.$webapi = webapi

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
