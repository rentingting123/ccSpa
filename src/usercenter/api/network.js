// import {
//     Message,
//     MessageBox
// } from 'element-ui'
let iView = require('view-design')

import {removeToken,removeReflashToken} from '@@/utils/oauth'
import {selectGroup} from '@@/utils/commons'

// 网络状态错误
function netstatus(err) {
  var str = ''
  switch (err.request.status) {
    case 400:
        str = '请求错误'
        break

    case 401:
        str = '未授权，请登录'
        break
    
    case 402:
        str = '没有身份，请选择'
        selectGroup()
        break

    case 403:
        str = '拒绝访问'
        break

    case 404:
        str = `请求地址出错: ${err.response.config.url}`
        break

    case 408:
        str = '请求超时'
        break

    case 500:
        str = '服务器内部错误'
        break

    case 501:
        str = '服务未实现'
        break

    case 502:
        str = '网关错误'
        break

    case 503:
        str = '服务不可用'
        break

    case 504:
        str = '网关超时'
        break

    case 505:
        str = 'HTTP版本不受支持'
        break
  }
    if (str) {
        iView.Message.warning(str)
        // iView.message.warning(str)
        return
    }
}
// 接口返回来的状态
function ApiCode(res) {
    // if () {}
    // 返回状态逻辑
    // iView.Message.warning(res.message)
    if (res.code == 401) {
        iView.Message.warning("token无效,请重新登录!")
        setTimeout(()=>{
            tologin();
        },1500)
    }else{
        iView.Message.warning(res.message)
    }
    return
}
function tologin(){
    //登录信息
    removeToken()
    removeReflashToken()
  //用户组织id
  localStorage.removeItem('groupId')
  //用户信息
  localStorage.removeItem('userInfo')
//   let url = location.href.includes('moocollege') ? 'moocollege.com' : 'mycloudedu.net'
//   let path = location.href.includes('moocollege') ? 'cc.moocollege.com' : '192.168.100.254'
  
  location.href = location.origin;

}
//验证
function reg(e) {
    var str = ""
    var v = /^[0-9]\.[0-9]\.[0-9]{3}$/
    if(e=="v"){
        str = v
    }
    return str
}
// 接口返回code状态
export default {
    getCode: function(err) {
    //return netstatus(err)
    },
    getApiCode: function(res) {
    //return ApiCode(res)
    }
}
