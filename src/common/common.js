import network from "@/api/index";
import { tologin } from "@@/utils/util";
import {setToken,getToken,setReflashToken} from "@@/utils/oauth"
var LS = window.localStorage
export function isLogin ()
{
    return getToken()
}

export function getCId() {
    return localStorage.getItem('competitionId')
}

export function getSkinInfo() {
    return localStorage.getItem('skinInfo') && JSON.parse(localStorage.getItem('skinInfo'))
}

export async function SSOLogin(auto) {
    let ticket = getParameterByName("ticket");

    if (!ticket){
      if(auto) tologin()
      else return 'error';
    } 
    let data = {
      ticket: ticket
    };
    let login = await network.node("sso/login/info", { data: data });
    if(login=='error') return 'error'
      setToken(login.access_token)
      setReflashToken(login.refresh_token)
      setItem('userInfo',JSON.stringify(login.userInfo))
      //todo把“？”结尾的 “？”去掉
      window.history.replaceState({},"",location.href.split('ticket')[0])
     return login
}

export function getUserInfo ()
{
    return localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"));
}

export function getGroupId ()
{   //用户groupId
    let groupId = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).groupId
    return groupId || "-1"
}

export async function logout (cb) {
            let res = await network.setLoginOut();
            if(res=='error'){
                cb&&cb('error')
            }else{
            localStorage.clear()
            cb&&cb()
            }
        }

export function getCompetitionId ()
{
    return localStorage.getItem('competition') && JSON.parse(localStorage.getItem('competition')).competitionId
}
export function getCompetitionApplyType ()
{
    return localStorage.getItem('competition') && JSON.parse(localStorage.getItem('competition')).applyType
}
export function setItem (key, v)
{
    localStorage.setItem(key, v)
}
export function getItem(key) {
  return (LS && JSON.parse(decodeURIComponent(LS.getItem(key))))
}

export function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.href);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function getWebInfo ()
{
    return localStorage.getItem('webInfo') && JSON.parse(localStorage.getItem('webInfo'))
}
export function getBaseInfo ()
{
    return localStorage.getItem('baseInfo') && JSON.parse(localStorage.getItem('baseInfo'))
}
export function downloadFile(content, fileName) { //下载base64图片
    var base64ToBlob = function(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for(let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
    };
    let aLink = document.createElement('a');
    let blob = base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
}

//写cookies
export function setCookie(name,value){ 
    console.log(rootUrl);
    // document.cookie = name + "="+ escape (value)+";Domian:http://127.0.0.1;path:/";
    document.cookie = name + "="+ escape (value)+";domian=.moocollege.com;path=/";
}
// 读取cookie
export function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
} 