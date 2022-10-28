
import network from "./utils";

//params={data:data}
export default {
    // 根据名称查询竞赛
    searchprovinceSkinold:params=>(network.get(`skin/provinceSkin/search`,params)),
    // 获取竞赛列表接口
    getCompetition:params=>(network.get(`skin/provinceSkin/getCompetitionA`,params)),
    // 获取轮播图
    getPagesSetting: params =>(network.get(`web/index/setting`, params)),
    // 竞赛头条咨询接口文档 
    getNewsHeadlineold: params =>(network.get(`skin/provinceSkin/getNewsHeadline`,params)),
    // 新闻详情接口文档
    getNewsDetailsold: params =>(network.get(`skin/provinceSkin/getNewsDetails`,params)),


    // 竞赛日历接口文档
    getCompetitionByCalendarold: params =>(network.get(`skin/provinceSkin/getCompetitionByCalendar`,params)),
    // 获取学校列表
    getAllSchoolsold: params =>(network.get(`skin/provinceSkin/getSchool`,params)),
    // 学校列表
    school: params =>(network.get(`api/web/ranking/school`, params)),
    // 获取学校详情
    getSchoolDetailold: params =>(network.get(`skin/provinceSkin/getSchoolDetails`,params)),
    // 人气竞赛榜
    rankingtopListold: params =>(network.get(`skin/provinceSkin/rankingList`,params)),
    // 二级页面猜你喜欢接口
    guessLikeold: params =>(network.get(`skin/provinceSkin/guessLike`,params)),
    // 根据条件查询竞赛
    getCompetitionByRequirementold: params =>(network.get(`skin/provinceSkin/secondPageSearch`,params)),



    // 获取培训列表 
    getTrainList: params =>(network.get(`api/training/selectTraining`,params)),
    // 获取培训列表详情
    getTrainDetail:  params =>(network.get(`api/training/selectTrainingDetail`,params)),
    // 会议回顾详情
    selectTrainingMetting: params =>(network.get(`api/training/selectTrainingMetting`,params)),
    // 竞赛头条咨询接口文档 
    getNewsHeadline: params =>(network.get(`api/data/dataCenter/getNewsHeadline`,params)),

    getHeadline2020: params =>(network.get(`api/data/dataCenter/headline`,params)),

    // 新闻详情接口文档
    getNewsDetails: params =>(network.get(`api/data/dataCenter/getNewsDetails`,params)),
    // 竞赛日历接口文档
    getCompetitionByCalendar: params =>(network.get(`api/data/dataCenter/getCompetitionByCalendar`,params)),
    // 人气竞赛榜
    rankingtopList: params =>(network.get(`api/data/dataCenter/rankingList`,params)),
    // 竞赛列表
    getCompetitionA:params =>(network.get(`api/data/dataCenter/getCompetitionA`,params)),
    // 直通国赛
    throughNationalCompetition:params =>(network.get(`api/data/dataCenter/throughNationalCompetition`,params)),
    // 二级页面猜你喜欢接口
    guessLike: params =>(network.get(`api/data/dataCenter/guessLike`,params)),
    // 是否纳入竞赛
    getRankingCompetition:params =>(network.get(`api/data/dataCenter/getRankingCompetition`,params)),
    // 根据名称查询竞赛
    searchprovinceSkin:params=>(network.get(`api/data/dataCenter/search`,params)),
    // 获取学校列表
    getAllSchools: params =>(network.get(`api/data/dataCenter/getSchool`,params)),
    // 获取学校详情
    getSchoolDetail: params =>(network.get(`api/data/dataCenter/getSchoolDetails`,params)),
    // 根据条件查询竞赛
    getCompetitionByRequirement: params =>(network.get(`api/data/dataCenter/secondPageSearch`,params)),
    // 竞赛点击次数
    updateClickCount:params =>(network.get(`api/data/dataCenter/updateClickCount`,params)),

    // 执行平台接口
    wechatLogin:params =>(network.post(`usercenter/authentication/code`,params)),
    //找回密码
    resetPassword:params =>(network.post(`usercenter/user/resetPassword`,params)),
    // 手机号登录
    authenticationMobile:params =>(network.form(`usercenter/authentication/mobile`,params)),
    // 帐号密码
    authenticationForm:params =>(network.form(`usercenter/authentication/form`,params)),
    // 发送短信
    sendSmsCode:params =>(network.get(`usercenter/code/sms`,params)),
    // 消息未读
    unRedaNum:params =>(network.get(`usercenter/user/unRedaNum`,params)),
    // 验证号码是否已存在
    registerCheck:params =>(network.get(`usercenter/user/register/check`,params)),

    sendSmsCodenode:params =>(network.node(`get/register/sms`,params)),
    // 注册
    register:params =>(network.post(`usercenter/user/register`,params)),
    //机构注册
    groupRegister:params =>(network.post(`usercenter/group/register`,params)),
    // 微信绑定手机号
    weixinModifyMobile: function (params) { return network.post(`/usercenter/user/insertOrUpdateMobile`, params) },

    // 判断是否为普通用户登录
    loginCommon: function (params) { return network.get(`usercenter/loginCommon`, params) },
    // 扩容申请加注册
    capacityApply:params =>(network.post(`api/data/dataCenter/capacityApply`,params)),




    // 培训
    // 获取培训报名表
    selectSignupFieldList: params =>(network.get(`api/training/selectSignupFieldList`,params)),
    // 培训报名
    trainingSignUp: params =>(network.post(`api/training/signUp`,params)),
    // 线上支付接口 todo*
    teamPay:params =>(network.post(`web/pay/trainingPay`,params)),
    // 查询线下支付详情
    queryUserPay:params =>(network.get(`api/training/pay/queryUserPay`,params)),
    // 线下支付提交
    saveTrainingPay:params =>(network.post(`api/training/pay/saveTrainingPay`,params)),
    // 设置发票信息
    setIovice:params =>(network.post(`api/training/pay/applyInvoice`,params)),
    // 获取发票信息
    getIovice:params =>(network.get(`api/training/pay/queryInvoice`,params)),
    // 我的培训列表
    queryMyTraining: params =>(network.get(`api/training/queryMyTraining`,params)),

    // 国赛
    // 新闻快讯接口
    getNewsFlash: params =>(network.get(`api/data/dataCenter/getNewsFlash`,params)),
    // 获取赛事数据
    getEventData: params =>(network.get(`api/data/dataCenter/eventData`,params)),
    // 获取6+1
    getStatisticsTeacherDevelopment: params =>(network.get(`api/data/dataCenter/statisticsTeacherDevelopment`,params)),
    // 获取教发指数
    getHomepageTeachersDevelopment: params =>(network.get(`api/data/dataCenter/homepageTeachersDevelopment`,params)),
    // 省级中心
    provincialCenter: params =>(network.get(`api/data/dataCenter/provincialCenter`,params)),
    // 省级排行
    provincialRanking: params =>(network.get(`api/data/dataCenter/provincialRanking`,params)),
    // 指标体系
    getTeachersDevelopment: params =>(network.get(`api/data/dataCenter/getTeachersDevelopment`,params)),
    // 获取省份
    getProvinceList: params =>(network.get(`api/data/dataCenter/getProvinceList`,params)),
    // 学生竞赛
    getCompetitionEvaluation: params =>(network.get(`api/data/dataCenter/getCompetitionEvaluation`,params)),
    // 学生竞赛新
    getEvaluationWhiteBook: params =>(network.get(`api/data/dataCenter/getEvaluationWhiteBook`,params)),
    // 学生竞赛专业
    majorStudentCompetition: params =>(network.get(`api/data/dataCenter/majorStudentCompetition`,params)),

    //申请扩容
    addCompetitionApply: params =>(network.post(`api/Admin//apply/addCompetitionApply`,params)),

    // 学校信息
    getschoolskin: params =>(network.node(`nodeforrank/website/getSkin`,params)),
    // 获取校赛
    getschoolcompetition: params =>(network.get(`api/data/dataCenter/getSchoolCompetition`,params)),


    // data/dataCenter/getProbinceYearList?provinceId=330000  查询省年份
    getProbinceYearList: params =>(network.get(`api/data/dataCenter/getProbinceYearList`,params)),
    // data/dataCenter/throughNationalCompetitionYearList  国赛年份
    throughNationalCompetitionYearList: params =>(network.get(`api/data/dataCenter/throughNationalCompetitionYearList`,params)),

   

}
