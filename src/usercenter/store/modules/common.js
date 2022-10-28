import api from '../../api/api.js'
import network from '../../api/network.js'

const state={
    schoolData:[],//学校数据
    majorData:[],// 专业数据
}

const getters={
    // getAsideShow: state => {
    //     return state.asideShow
    // },
}

const mutations={
    //全部学校数据
    schoolDataCommon(state,data){
        state.schoolData=data;
    },
    //全部专业数据
    majorDataCommon(state,data){
        state.majorData=data;
    },
}

const actions={
    // 获取组学校列表
    schoolDataCommon({commit},data){
        return new Promise((relove,reject)=>{
            api.get('/web/specialist/querySchool',null).then(reset => {
                if (reset.code == 0) {
                    var datas=[]
                    reset.data.forEach(value=>{
                        datas.push({
                            key:value.id,
                            label:value.groupName
                        })
                    })
                    commit("schoolDataCommon",datas)
                    relove(datas)
                    // this.accessDialog=true;
                }else {
                    network.getApiCode(reset)
                }
            })
        })
    },
    // 获取组专业数据
    majorDataCommon({commit},data){
        return new Promise((relove,reject)=>{
            api.get('/web/specialist/queryCourseMajor',null).then(reset => {
                if (reset.code == 0) {
                    commit("majorDataCommon",reset.data)
                    relove(reset.data)
                    // this.accessDialog=true;
                }else {
                    network.getApiCode(reset)
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
