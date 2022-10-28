import network from "./utils";

export default {
    //登录
    login: params => network.node('login', params),

    selectPlatformNews: params => network.get('/web/selectPlatformNews', params),
    //获取用户信息
    userInfo: () => network.get('/usercenter/user')
}