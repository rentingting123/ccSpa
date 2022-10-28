import network from "./utils";

//params={data:data}
export default {
    //登录
    operateLogin: params => (network.node('nodeforoperate/login', params)),
    // 验证是否登录
    operatecheckLogin: params => (network.node('nodeforoperate/checkLogin', params)),
    // 回去皮肤开通列表
    operateDomainList: params => (network.node('nodeforoperate/skin/domainList', params)),
    // 皮肤开通 id:{type:'id'},    aviliable:{type:'id'},    competitionId:{type:'id'},
    operateSwitch: params => (network.node('nodeforoperate/skin/switch', params)),
    // 皮肤创建 id: { type: 'id' },adminToken: { type: 'string' }, domain: { type: 'string' }, url: { type: 'string' },name: { type: 'string' }, skin: { type: 'id' }
    operateCreate: params => (network.node('nodeforoperate/skin/create', params)),
    // 皮肤修改 id: { type: 'id' },adminToken: { type: 'string' }, domain: { type: 'string' }, url: { type: 'string' },name: { type: 'string' }, skin: { type: 'id' }
    operateEdit: params => (network.node('nodeforoperate/skin/edit', params)),
    // 删除皮肤
    operateDel: params => (network.node('nodeforoperate/skin/del', params)),
    // 获取皮肤类型
    getSkinList: params => (network.node(`skin/list/get`, params)),
    // 学校列表
    school: params => (network.get(`Admin/school/getSchoolDetail`, params)),
    // 查询学校列表
    schools: function (params) { return network.get(`usercenter/search/school`, params) },
    // 查询学校列表 之前的老接口，查的数量较少
    // schools: function(params) { return network.get(`web/ranking/school`, params) },
    //添加域名指向
    addDomain: params => (network.node(`domain/add`, params)),
    //查询域名指向
    getDomain: params => (network.node(`domain/get`, params)),
    //修改域名指向
    setDomain: params => (network.node(`domain/set`, params)),
    // 获取竞赛列表
    getCompetitionList: params => (network.node(`nodeforoperate/competition/list`, params)),
    //省份列表
    getProvinceList: params => (network.node(`nodeforoperate/province/list`, params)),
    getProvinceList1: params => (network.get(`skin/provinceSkin/getProvinceList`, params)),

    // 
    checkDomain: params => (network.node(`nodeforoperate/domian/check`, params)),

    // 获取管理平台接口
    manageOnlineResourceList: params => (network.get(`web/contract/user/onlineResourceList`, params)),
    // 数据服务协议列表
    dataServiceList: params => (network.get(`web/contract/dataService/list`, params)),
   
    // 审核管理员上传
    manageVerifyOnline: params => (network.get(`web/contract/user/verifyOnline`, params)),
    // 更新数据服务协议
    dataServiceStatus: params => (
        network.post('web/contract/dataService/updateStatus', params)
    ),
    updateSchoolList: params => (
      network.post('/web/contract/dataService/updateSchoolList', params)
  ),
    // 学校列表
    selectSchoolName: params => (network.get(`dataService/competitionCompare/selectSchoolName`, params)),
      // 一键生成报告
      getExportList: params => (network.get(`dataService/report/export`, params)),
    getUserContract: params => (
      network.get('/web/contract/dataService/getUserContract', params)
  ),
    // 添加学校列表
   
    // 更新数据服务协议文件
    dataServiceFile: params => (network.post(`web/contract/dataService/updateFile`, params)),

    // 获取执行平台机构接口
    groupOnlineResourceList: params => (network.get(`web/contract/group/onlineResourceList`, params)),
    // 审核执行平台机构上传
    groupVerifyOnline: params => (network.get(`web/contract/group/verifyOnline`, params)),

    // 获取累计高校数据
    getAllschoolLogin: params => (network.get(`Admin/statisticsPerson/superSchool`, params)),
    expertAllschoolLogin: params => (network.getdownload(`Admin/statisticsPerson/exportSuperSchool`, params)),
    
    // 获取省份数据
    getAllprovincial: params => (network.get(`Admin/statisticsPerson/provinceSchool`, params)),
    getprovinceSumSchool: params => (network.get(`Admin/statisticsPerson/provinceSumSchool`, params)),
    expertAllprovincial: params => (network.getdownload(`Admin/statisticsPerson/exportProvinceSchool`, params)),
    // 获取高校覆盖
    getSchoolCoverage: params => (network.get(`Admin/statisticsPerson/provinceSuperSchool`, params)),
    getprovinceSumSuperSchool: params => (network.get(`Admin/statisticsPerson/provinceSumSuperSchool`, params)),
    expertSchoolCoverage: params => (network.getdownload(`Admin/statisticsPerson/exportProvinceSuperSchool`, params)),
    // 获取高校清单
    getAllschoolList: params => (network.get(`Admin/statisticsPerson/loginSchoolList`, params)),
    expertAllschoolList: params => (network.getdownload(`Admin/statisticsPerson/exportLoginSchoolList`, params)),


    // 获取school-apply表中数据
    setSchoolApply: params => (network.node(`school/apply/set`, params)),
    getSchoolApply: params => (network.node(`school/apply/get`, params)),
    getSchoolApplylist: params => (network.node(`school/apply/getlist`, params)),
    //获取学校总数
    getTotalSchoolNum: params => (network.get('Admin/statisticsPerson/superAllSchoolNum', params)),

    // 证书部分
    // 查询有申请记录的竞赛id
    selectApplyCompetitionList: params => (network.get('web/selectApplyCompetitionList', params)),
    // 查询申请列表
    selectApplyCertificateList: params => (network.get('web/selectApplyCertificateList', params)),
    // 证书审核
    updateApplyCertificate: params => (network.get('web/updateApplyCertificate', params)),
    // 导出证书
    applyCertificateList: params => (network.getdownload('web/export/applyCertificateList', params)),


    // 获取申请试用列表
    getApplyList: params => (network.get('usercenter/apply/selectTrial', params)),
    // 修改申请试用
    setApplyList: params => (network.get('usercenter/apply/updateTrial', params)),
    // 发送体验中心
    setApplySendEmail: params => (network.get('usercenter/apply/sendEmail', params)),


    // 学校管理
    // 专业管理 新增专业
    insertMajor: params => (network.post('Admin/insertMajor', params)),
    // 删除专业
    delMajor: params => (network.get('Admin/delMajor', params)),
    // 根据学院查专业
    getMajorBySchool: params => (network.get(`Admin/selectMajor`, params)),




    // 客服中心管理
    getServiceList: params => (network.node(`videoOperate/list`, params)),
    getService: params => (network.node(`videoOperate/get`, params)),
    setService: params => (network.node(`videoDemo/update`, params)),
    delService: params => (network.node(`videoDemo/delete`, params)),
    addService: params => (network.node(`videoDemo/create`, params)),
    sortService: params => (network.node(`videoOperate/sort`, params)),

    // 客服操作
    updateStatus: params => (network.get('web/api/competition/updateStatus', params)),
    synchrodata: params => (network.get('Admin/api/competitionIndex/synchrodata', params)),
    // 根据登录账号修改竞赛名称
    updateCompetitionName: params => (network.get('web/updateCompetitionName', params)),
    // 发送邮件
    sendEmails: params => (network.post('review/import/email', params)),



    // 新闻模块
    // 发布新闻
    savePlatformNews: params => (network.post('web/savePlatformNews', params)),
    // 查询列表
    selectPlatformNews: params => (network.get('web/selectPlatformNews', params)),
    // 获取类型列表
    selectPlatformNewsType: params => (network.get('web/selectPlatformNewsType', params)),
    // 新增类型列表
    addPlatformNewsType: params => (network.get('web/addPlatformNewsType', params)),
    // 修改类型
    updatePlatformNewsType: params => (network.post('web/updatePlatformNewsType', params)),
    // 获取新闻详情
    getNewsDetails: params => (network.get(`data/dataCenter/getNewsDetails`, params)),
    // 设置为排行榜竞赛（竞赛赋能）
    saveCompetitionRank: params => (network.get(`web/saveCompetitionRank`, params)),
    // 设置竞赛的金额，为竞赛赋能排序
    saveCompetitionContractPrice: params => (network.get(`web/saveCompetitionContractPrice`, params)),

    //竞赛征集
    applyResourcePage: params => (network.get(`web/contract/group/applyResourcePage`, params)),
    //竞赛征集页面状态字典值
    dictStatus: params => (network.get(`web/contract/dict/status`, params)),
    //竞赛征集下载 
    downloadFileZip: params => (network.get(`web/contract/zip/download/url`, params)),
    // downloadFileZip: params => (network.getdownload(`Admin/statisticsPerson/post/zip/download`, params)),
    // downloadFileZip: params => (network.getdownload(`web/contract/zip/download`, params)),
    // downloadFileZip: params => (network.get("Admin/statisticsPerson/zip/download", params)),
}
