import api from '../../api/index.js'
import network from '../../api/network.js'
import webapi from '../../api/webapi.js'

const state={
    schoolData:[],//学校数据
    majorData:[],// 专业数据
    pattern:0,//评审类型
    patternData:{},//规则数据
    tabName:0,//左侧侧边栏记录
    loading:false,
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
    //全部规则数据
    patternDataCommon(state,data){
        state.patternData=data;
        state.pattern=data&&data.pattern;
    },
    //全部规则数据
    tabNameCommon(state,data){
        state.tabName=data;
    },
    //进入loading
    loading(state){
        state.loading = true
    },
    //取消loading
    cancelLoading(state){
        state.loading = false
    }
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
    // 获取评审类型
    // pattern;  0 按作品评审 1 按附件评审
    getPattern({commit},data){
        var data={
            competitionId: data && data.competitionId || webapi.getlocal("competitionId"),
            rowId: data && data.rowId || webapi.getlocal("rowId")
        }
        return new Promise((relove,reject)=>{
            api.get('review/review/rule/get',data).then(reset => {
                if (reset.code == 0) {
                    if(reset.data){
                        webapi.savelocal("pattern",reset.data.pattern)
                        if(reset.data.reviewType){
                            webapi.savelocal("reviewType",JSON.stringify(reset.data.reviewType))
                        }else{
                            webapi.savelocal("reviewType",reset.data.reviewType)
                        }

                        webapi.savelocal("patternData",JSON.stringify(reset.data.reviewStandardListDto.reviewStandardList))
                        commit("patternDataCommon",reset.data)
                    }else{
                        commit("patternDataCommon",{})
                    }
                    relove(reset.data)
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
