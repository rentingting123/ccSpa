import network from "./utils";
import { getSkinInfo } from "@/common/common.js";

//params={data:data}
export default {
    // 黄昭  新增留言
    addMessage: params => (network.post(`web/huaCan/resourcePool/addMessage`, params)),
    // 黄昭 作品上下ye
    getResourcePoolForNextAndPrev: params => (network.get(`web/huaCan/resourcePool/getResourcePoolForNextAndPrev`, params)),
    // 访问量
    statistics: params => (network.get(`web/competition/statistics`, params)),
    // 黄昭 获取历届作品
    getPreviousYearsResourcePool: params => (network.get(`web/huaCan/resourcePool/getPreviousYearsResourcePool`, params)),
    // 黄昭 根据id获取作品详情
    getPreviousYearsResourcePoolDetail: params => (network.get(`web/huaCan/resourcePool/getPreviousYearsResourcePoolDetail`, params)),
    // 黄昭 获取历届作品时间
    getYearListForHuaCan: params => (network.get(`web/huaCan/resourcePool/getYearListForHuaCan`, params)),
    // 黄昭 根据竞赛id获取竞赛的所有参赛类型
    getCompetitionType: params => (network.get(`web/huaCan/resourcePool/getCompetitionType`, params)),
    // 查询竞赛时间
    npgetTimes: params => (network.get(`web/competition/skinTimeline`, params)),
    npgetTimesLine: params => (network.get(`web/competition/timeline`, params)),
    // 获取访问量
    npgetStatistics: params => (network.get(`web/competition/statistics`, params)),
    // 投稿
    npsendcontribute: params => (network.post(`skin/structureCompetitionSkin/contribute`, params)),
    // 获取新闻详情
    getNewsList: params => (network.get(`web/competition/news`, params)),
    // 获取新闻列表
    npgetNewsList: (params = {}) => {
        let skinInfo = getSkinInfo() || {}
        params.data.competitionType = skinInfo.theme == 'npskin1' ? 1 : 2
            // competitionNewsRange 默认为2显示上下级新闻 1为不显示上下级新闻，结构赛用
        params.data.competitionNewsRange = skinInfo.competitionNewsRange ? skinInfo.competitionNewsRange : 2
        return network.post(`web/competition/skinNews`, params)
    },
    // 省市区分赛
    npqueryProvince: params => (network.get(`web/competition/queryProvince`, params)),
    //系列赛
    npqueryContest: params => (network.get(`web/competition/querySeries`, params)),
    // 获取省赛相关信息
    npqueryProvinceInfo: params => (network.get(`web/competition/queryProvinceInfo`, params)),
    //抛出node请求
    node: (url, params) => (network.node(url, params)),
    setLoginOut: params => (network.post(`usercenter/logout`, params)),
    //组织Id获取当前竞赛Id
    getCIdByGId: params => (network.get('web/competition/queryCompetitionId', params))
}