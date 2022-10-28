import api from '../../api/index.js'
import network from '../../api/network.js'

const state={
    attachId:'',//附件id
}

const getters={
    // getAsideShow: state => {
    //     return state.asideShow
    // },
}

const mutations={
    //全部角色数据
    attachIdDetail(state,data){
        state.attachId=data;
    },
}

const actions={
    //全部角色数据
    roleAllSystem({commit},data){
        // const parmas={
        //     id:data.value
        // }
        return new Promise((resolve,reject)=>{
            api.get('/usercenter/role/all',null).then((res)=>{
                if (res.code === 0){
                    // _this.alldata = res.data
                    commit('roleAllSystem',res.data)
                    resolve(res.data)
                }else{
                    network.getApiCode(res)
                }
            })
        })
    },
}

export default ({
    state,
    getters,
    mutations,
    actions
})
