
import network from "./utils";

//params={data:data}
export default {
    //查询皮肤是否购买
    skinGet:params=>(network.node('website/getSkin',params)),

    // 学校列表
    school: params =>(network.get(`api/web/ranking/school`, params)),
    // 竞赛头条咨询接口文档
    getNewsHeadline: params =>(network.get(`api/data/dataCenter/getNewsHeadline`,params)),
    // 新闻详情接口文档
    getNewsDetails: params =>(network.get(`api/data/dataCenter/getNewsDetails`,params)),
    // 国赛
    // 新闻快讯接口
    getNewsFlash: params =>(network.get(`api/data/dataCenter/getNewsFlash`,params)),
    // 获取6+1
    getStatisticsTeacherDevelopment: params =>(network.get(`api/data/dataCenter/statisticsTeacherDevelopment`,params)),
    // 获取教发指数
    getHomepageTeachersDevelopment: params =>(network.get(`api/data/dataCenter/homepageTeachersDevelopment`,params)),
    // 省级排行
    provincialRanking: params =>(network.get(`api/data/dataCenter/provincialRanking`,params)),
    // 指标体系
    getTeachersDevelopment: params =>(network.get(`api/data/dataCenter/getTeachersDevelopment`,params)),
    // 获取省份
    getProvinceList: params =>(network.get(`api/data/dataCenter/getProvinceList`,params)),
    // 学生竞赛新
    getEvaluationWhiteBook: params =>(network.get(`api/data/dataCenter/getEvaluationWhiteBook`,params)),
    // 学生竞赛专业
    majorStudentCompetition: params =>(network.get(`api/data/dataCenter/majorStudentCompetition`,params)),

    // 竞赛详情
    selectCompetitionEnergize: params => (network.get(`api/web/selectCompetitionEnergize`, params)),
    selectCompetitionActivity: params => (network.get(`api/web/selectCompetitionActivity`, params)),
    
    // 竞赛赋能
    selectCompetitionActivityList: params => (network.get(`api/web/selectCompetitionActivityList`, params)),
    selectRankCompetitions: params => (network.get(`api/web/selectRankCompetitions`, params))
    
}
