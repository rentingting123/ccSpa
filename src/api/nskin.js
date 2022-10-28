
import network from "./utils";

export default {
    // 获取竞赛分析
    getRankingList: params => (network.post(`Admin/Competition/getRankingList`, params)),
    // 模糊搜索竞赛
    selectCompetitions: params => network.get('web/selectCompetitions', params),
    // 设置竞赛活动
    saveCompetitionActivity: params => network.post('web/saveCompetitionActivity', params),
    // 查询竞赛活动（单竞赛）
    selectCompetitionActivity: params => network.get('web/selectCompetitionActivity', params),
    // 查询竞赛活动（全部）
    selectCompetitionActivityList: params => network.get('web/selectCompetitionActivityList', params),
    // 排行榜竞赛
    selectRankCompetitions: params => network.get('web/selectRankCompetitions', params),
    // 排行榜竞赛分页
    selectRankCompetitionsPage: params => network.get('web/selectRankCompetitionsPage', params),
    // 推荐查询竞赛列表
    selectAssignCompetition: params => network.get('web/selectAssignCompetition', params),
    // 排行榜内竞赛链接 数据
    selectRankCompetitionNum: params => network.get('web/selectRankCompetitionNum', params),
    // 查询列表
    selectPlatformNews: params => (network.get('web/selectPlatformNews', params)),
    // 竞赛详情
    selectCompetitionEnergize: params => (network.get(`web/selectCompetitionEnergize`, params)),
    //申请排行榜扩容竞赛
    getApplyRankingList: params => (network.get(`web/selectCompetitionIndex`, params)),

    // new 2022-09-27
    // 扩容申请
    capacityApplyNew: params => network.post('data/dataCenter/capacityApply', params),
    //短信验证码认证
    checkMobile: params => (network.get(`data/dataCenter/check/mobile`, params)),
    //发送短信验证码
    codeSms: params => (network.get(`usercenter/code/mobile/sms`, params)),
    // 文件上传记录保存
    logInsert: params => network.post('data/dataCenter/file/log/insert', params),
    // 文件上传记录删除
    logDelete: params => network.post('data/dataCenter/file/log/delete', params),
       // 文件上传记录删除
    checkApply: params => network.get('/data/dataCenter/check/apply', params),
    //获取竞赛名片
    competitionCard: params => network.get('web/competition/info/competitionCard', params),
    cardPage: params => network.get('web/competition/info/cardPage', params),
}