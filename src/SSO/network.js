import network from "@/api/utils";

export default{
    //账号密码登录
    login:params=>(network.node('sso/up/login',params)),
    //微信登录
    wxLogin:params=>(network.node('sso/wx/login',params)),
    //短信验证码
    smsCode:params=>(network.node('sso/sms/code',params)),
    //短信登录
    smsLogin:parmas=>(network.node('sso/sms/login',parmas)),
    //修改密码
    modifyPass:params=>(network.node('sso/modify/password',params)),
    //验证登录状态是否有效
    check:params=>(network.node('sso/check/login',params)),
    //消费ticket
    exchange:params=>(network.node('sso/login/info',params)),
    //退出
    quit:params=>(network.node('sso/login/out',params)),
    //校竞赛管理跳转免密登录
    loginByUserName:params=> network.node('sso/login/schooladmin',params)
}