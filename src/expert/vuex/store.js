import Vue from 'vue'
import Vuex from 'vuex'

import judge from './modules/judge'
import result from './modules/result'
import detail from './modules/detail'
import common from './modules/common'

Vue.use(Vuex)

// const debug=process.env.NODE_ENV;

export default new Vuex.Store({
    modules:{
        judge,
        result,
        common,
        detail
    },
    // strict:debug
})
