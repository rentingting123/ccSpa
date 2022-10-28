import api from '../../api/index.js'
import network from '../../api/network.js'

const state={
    selComptition:0,
}

const getters={
    
}

const mutations={
    // 选择赛项
    selComptitionResult(state,data){
        state.selComptition=data;
    },
}

const actions={

}

export default ({
    state,
    getters,
    mutations,
    actions
})
