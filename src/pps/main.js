import Vue from '@@/vue'
import App from './App'
import router from './router'

import ElementUI from '@@/element'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.component('remote-script', {
  render: function (createElement) {
      var self = this;
      return createElement('script', {
          attrs: {
              type: 'text/javascript',
              src: this.src
          },
          on: {
              load: function (event) {
                  self.$emit('load', event);
              },
              error: function (event) {
                  self.$emit('error', event);
              },
              readystatechange: function (event) {
                  if (this.readyState == 'complete') {
                      self.$emit('load', event);
                  }
              }
          }
      });
  },
  props: {
      src: {
          type: String,
          required: true
      }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})