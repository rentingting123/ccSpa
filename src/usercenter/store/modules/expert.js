import api from '../../api/api.js'
import network from '../../api/network.js'

const state={
    tabNum:'0-0',//aside点击侧边栏name
    tabName:'name1',//点击专家管理的tab name
}

const getters={
    // getAsideShow: state => {
    //     return state.asideShow
    // },
}

const mutations={
    //全部角色数据
    roleAllExpert(state,data){
        state.roleAll=data;
    },
    tabNumExpert(state,data){
        if (data=="1-0") {
            state.tabName="name1"
        }
        if (data=="1-1") {
            state.tabName="name2"
        }
        if (data=="1-2") {
            state.tabName="name3"
        }
        state.tabNum=data;
    }
}

const actions={
    //全部角色数据
    // roleAllSystem({commit},data){
    //     // const parmas={
    //     //     id:data.value
    //     // }
    //     return new Promise((resolve,reject)=>{
    //         api.get('/usercenter/role/all',null).then((res)=>{
    //             if (res.code === 0){
    //                 // _this.alldata = res.data
    //                 commit('roleAllSystem',res.data)
    //                 resolve(res.data)
    //             }else{
    //                 network.getApiCode(res)
    //             }
    //         })
    //     })
    // },
}

export default ({
    state,
    getters,
    mutations,
    actions
})
