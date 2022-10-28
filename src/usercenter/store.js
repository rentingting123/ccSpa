import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    asideShow: false,
    
  },
  getters: {
    getAsideShow: state => {
      return state.asideShow
    },
    
  },
  // state里面的数据 只能由mutations里面的方法 改变
  mutations: {
    asideShow (state, asideShow) {
      state.asideShow = asideShow
    },
    
  },
  // actions 处理好数据 再存调用mutations 把处理好的数据储存
  actions: {
    asideShow ({ commit }, asideShow) {
      commit('asideShow', asideShow)
    },
    
  }

})

export default store