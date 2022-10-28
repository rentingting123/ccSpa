// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '@@/vue'
import App from './App'
import router from './router'
import store from '@@/vuex/store';
import i18n from '@@/i18n'
import '@babel/polyfill'; // es6 shim

// 公公样式
import './common/common.css'
// element-ui导入
import ElementUI from '@@/element';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(iView);
import 'animate.css'

import "../common/rem.js"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
