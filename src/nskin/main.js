// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import '@babel/polyfill'; // es6 shim

// 公公样式
import './common/common.css'
// element-ui导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import 'animate.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.less'
Vue.use(VueAwesomeSwiper);
// 官方已经将autoplay单独的分离了出来，需要单独引入
import Swiper2, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper'
Swiper2.use([Navigation, Pagination, EffectFade, Autoplay])

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
