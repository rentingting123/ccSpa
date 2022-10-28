import network from '@@/utils/network'


export default {
    getUserInfo: function (params) { return network.get(`/usercenter/user`, params) },
    getOssKey: params => (network.node('/nodeapi/3.0.1/common/upload/getOssUploadPolicy')),
    // 页面配置信息
    getPagesSetting: params => (network.get(`web/index/setting`, params)),
    fileImport: {
        "1": {
            enrol : params =>(network.get('web/report/uploadEnrol',params)),
            search: params => (network.get('web/report/searchSys', params)),
            submit: params => (network.post('web/report/exportCompetitionSignUp', params)),
            titleRow: params => (network.get('web/report/uploadEnrol', params)),
            downTemp:'https://web.moocollege.com/mooc/竞赛结果模板.xlsx',
        },
        "2": {
            enrol : params =>(network.get('web/report/uploadEnrol',params)),
            search: params => (network.get('web/report/searchSys', params)),
            submit: params => (network.post('web/report/exportCompetitionSignUp', params)),
            titleRow: params => (network.get('web/report/uploadEnrol', params)),
            downTemp:'https://web.moocollege.com/webFile/%E6%8C%91%E6%88%98%E8%B5%9B.xls',
        },
        upload:params=>(network.post('',params))
    }
}
