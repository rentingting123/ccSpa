import Vue from 'vue'
import Vuex from 'vuex'

import system from './modules/system'
import expert from './modules/expert'
import common from './modules/common'

Vue.use(Vuex)

// const debug=process.env.NODE_ENV;

export default new Vuex.Store({
    modules:{
        system,
        expert,
        common
    },
    // strict:debug
})
