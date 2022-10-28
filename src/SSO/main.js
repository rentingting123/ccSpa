// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '@@/vue'
import App from './App'
import ElementUI from '@@/element'
import i18n from '@@/i18n'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import "@/SSO/common/common.css"

Vue.use(ElementUI);

  new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>',
})





