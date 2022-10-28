// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '@@/vue'
import App from './App'
import router from './router'
import store from './vuex/store';
import '@/common/css/reset.css';
import ElementUI from '@@/element';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor-hzq'
import 'quill-hzq/dist/quill.core.css'
import 'quill-hzq/dist/quill.snow.css'
import 'quill-hzq/dist/quill.bubble.css'
import '@babel/polyfill'
import VuePreview from 'vue-preview'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'

import "../common/rem.js"
import "@/zhsq/assets/common/common.css"
import i18n from '@@/i18n'

Vue.use(iView)
Vue.use(ElementUI);
Vue.use(VuePreview)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})