import api from '../../api/index.js'
import network from '../../api/network.js'

const state={
    tabNum:'0-0',//aside点击侧边栏name
    tabName:'name1',//点击专家管理的tab name
    selComptition:0,
    compChild:[],//赛项数据
    titleNamme:'',
    expertArr:[],//专家库数据
    statisticsDataNet:[],//网评统计缓存数据
    // statisticsDataRate:[],//会评统计缓存数据
    statisticsType:0
}

const getters={
    getCompChilds: state => {
        return state.compChild
    },
}

const mutations={
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
    },
    // 赛项总数据
    compChildJudge(state,data){
        // let tempData = [];
        // // extend(true, tempData, data);
        // tempData=[...data]
        state.compChild=data.concat();
    },
    // 选择赛项
    selComptitionJudge(state,data,name){
        state.selComptition=data;
    },
    selComptitionName(state,name){
        state.titleNamme=name;
    },
    selExpertArr(state,data){
        state.expertArr=data;
    },
    // 统计数据
    getStatisticsData(state,data){
        state.statisticsData=data;
    },
    getStatisticsType(state,data){
        state.statisticsType=data;
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
