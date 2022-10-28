import network from "./utils";

//params={data:data}
export default {
    //查询皮肤是否购买
    checkSkinEnable: params => (network.node('checkSkin', params)),
    checkSkinEnableByUrl: params => (network.node('', params)),
    checkSkinEnableById: params => (network.node('domain/get', params)),
    skinGet: params => (network.node('website/getSkin', params)),
    skinSet: params => (network.node('website/setSkin', params)),
    //查询adminRole
    checkAdmin: params => (network.node('check/admin', params)),
    bannerAdd: params => (network.node('banner/add', params)),
    bannerDel: params => (network.node('banner/delete', params)),
    bannerList: params => (network.node('banner/list', params)),
    reviewAdd: params => (network.node('review/add', params)),
    reviewDel: params => (network.node('review/delete', params)),
    reviewList: params => (network.node('review/list', params)),
    websiteName: params => (network.node('website/name', params)),
    getRegister: params => (network.node('website/register/html', params)),
    setWebsiteHtml: params => (network.node('website/register/html/set', params)),

    setFooter: params => (network.node(`website/setFooter`, params)),
    getFooter: params => (network.node(`website/getFooter`, params)),


    //todo:所有执行平台的接口全部直接调用执行平台的jxapi，这边只发送执行平台没有的接口请求。
    homeAllData: params => (network.get(`web/competition/detail/${params.id}`, params)),
    // 获取id  //1：个人，2：团体；3：学校统一报名；4：不限（可个人也可团队也可学校统一报），默认是不限。
    getCompetitionId: params => (network.get('web/page/getCompetitionIdByUrl', params)),
    // 获取头部信息
    getTop: params => (network.get(`web/competition/skin`, params)),
    // 竞赛规程
    getRules: params => (network.get(`web/competition/childRules`, params)),
    // 获取详情
    getdetail: params => (network.get(`web/competition/infos`, params)),
    //登陆
    login: params => (network.form('usercenter/authentication/form', params)),
    tellogin: params => (network.form(`usercenter/authentication/mobile`, params)),

    // 获取用户信息
    getUserInfo: function (params) { return network.get(`usercenter/user`, params) },
    signUpGroupApi: params => (network.post('web/competition/signup/group', params)),

    // 注册
    register: params => (network.form(`usercenter/user/register`, params)),

    sendSmsCode: params => (network.get(`usercenter/code/sms`, params)),
    // 修改密码
    changePwd:params =>(network.get(`usercenter/user/updataPassword`,params)),

    // 绑定手机号码修改
    modifyMobile: function(params) { return network.form(`usercenter/user/modifyMobile`, params) },
    // 获取验证码
    sms: function(params) { return network.get(`usercenter/code/sms`, params) },
    //获取学历列表
    getDegreeInfo: function(params) { return network.get(`usercenter/user/getDegreeInfo`, params) },
    // 保存个人信息
    setUserInfo: function(params) { return network.post(`usercenter/user`, params) },

    // 创建竞赛  获取选手
    //           competitionId: sessionStorage.getItem('competitionId'),
    //           keyword: entity.keyword,
    //           childCompetitionId: entity.childCompetitionId,
    getTeamsApi: function(params) { return network.get(`api/competition/getTeams`, params) },
    //添加团队成员
    addMemberApi: function(params) { return network.post(`web/competition/addMember`, params) },
    //添加团队成员
    passMemberApi: function(params) { return network.post(`web/competition/passGroup`, params) },
    //团队详情
    groupInfoApi: function(params) { return network.get(`web/competition/groupInfo/${params.id}`) },
    //更新团队成员
    updateGroupRole: function(params) { return network.post(`web/competition/updateGroupRole`, params) },

    getDetail: function(params) { return network.get(`web/competition/detail/${params.id}`) },
    //退出团队
    outGroup: function(params) { return network.post(`web/competition/outGroup`, params) },
    //删除团队
    delGroup: function(params) { return network.post(`web/competition/delGroup`, params) },
    //申请加入团队
    applyInTeamApi: function(params) { return network.post(`web/competition/apply/group/${params.id}`) },
    //团队报名
    signUpGroupApi: function(params) { return network.post(`web/competition/signup/group`, params) },
    //config: {    responseType: 'arraybuffer'  }
    downloadGroupApplyFile: function(params) { return network.get(`web/doc/competition/group`, params) },
    downloadUserApplyFile: function(params) { return network.get(`web/doc/competition/member`, params) },
    findLineCompetition: function(params) { return network.get(`web/competition/list/line/${params.id}`) },

    getCompetitionDetail: function(params) { return network.get(`web/competition/detail/${params.competitionId}`) },

    //
    getUserAlready: function(params) { return network.post(`usercenter/user/perfect`, params) },

    getListApi: function(params) { return network.get(`web/competition/${params.id}/childs`) },

    // 获取竞赛直通车
    getSkinCompetitions: params => (network.get(`web/competition/getSkinCompetitions`, params)),
    school: function(params) { return network.get(`web/ranking/school`, params) },
    // 学校列表 usercenter
    schools: function (params) { return network.get(`Admin/search/school`, params) },
    getDomain: params => (network.node(`findSkin/byId`, params)),


    // 浙江省皮肤接口
    // 获取新闻列表
    getProvinceCompetitionNews: params => (network.get(`web/competition/getProvinceCompetitionNews`, params)),
    // 获取新闻详情
    getDynamicsDetail: params => (network.get(`web/competition/news/detail`, params)),
    // 获取省赛事
    getProvinceCompetitions: params => (network.get(`web/competition/getProvinceCompetitions`, params)),
    // 国赛直通车
    getCountryCompetitions: params => (network.get(`web/competition/getCountryCompetitions`, params)),
    // 获取院校频道
    getSchoolDetails: params => (network.get(`web/ranking/schoolDetails`, params)),

    //skin3
    setSchoolApply: params => (network.node(`school/apply/set`, params)),
    getSchoolApply: params => (network.node(`school/apply/get`, params)),
    downloadLogin: params => (network.get(`web/skin/export`, params)),

    // 注册接口
    qrCodeRegister:params =>(network.node(`java/admin/qrcode/register`,params)),
    // 查询是否为校赛
    checkSchool:params=>(network.get('api/usercenter/group/isSchoolCompetition',params)),
    // 查询校赛的院系列表
    getProfessional:params=>(network.get('api/web/academy/get',params)),


    //省赛直通车
    provinceThroughTrain: params => (network.get(`skin/structureCompetitionSkin/provinceThroughTrain`, params)),
    // 获取历年回顾
    getOverTheYears: params => (network.get(`skin/structureCompetitionSkin/getOverTheYears`, params)),
    //获取国数据中心热力图数据
    getMapData: params => (network.get(`api/data/dataCenter/provincialHotMap`, params)),


}