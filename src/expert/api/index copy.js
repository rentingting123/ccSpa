let axios=require('axios');
let qs=require('qs');
import { getTokenHeader } from "@@/utils/commons";

import networkcode from './network'

axios.defaults.timeout = 600000;

let root='';
console.log('环境',process.env.NODE_ENV)
if(process.env.NODE_ENV == 'production'||process.env.NODE_ENV=='test'){
    root=''
}else if(process.env.NODE_ENV == 'testing'){
    root='/cnuo'
}else{
    root='/api'
}
function Axios(method,url,params){
    const _headers = getTokenHeader()

    var urls=""
    if(process.env.NODE_ENV == 'production'||process.env.NODE_ENV=='test'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls='/cnuo'+url
    }else{
        urls='/api' + url
    }
    // var urls=process.env.NODE_ENV == 'production' ? url : '/api' + url
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            headers: _headers,
            // data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            // baseURL:root,
            // withCredentials: true
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
    		console.log(err)
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}
function exportAxios(method,url,params){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls='/cnuo'+url
    }else{
        urls='/api' + url
    }
    // var urls=process.env.NODE_ENV == 'production' ? url : '/api' + url
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            // data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            // baseURL:root,
            // withCredentials: true
            responseType:'arraybuffer'
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}
// 获取验证码
function smsAxios(method,url,params,deviceId){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls='/cnuo'+url
    }else{
        urls='/api' + url
    }
    // var urls=process.env.NODE_ENV == 'production' ? url : '/api' + url
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            // data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
            headers: {
                deviceId: deviceId,
            }
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}
// user
function userAxios(method,url,params){
    var urls=""
    if(process.env.NODE_ENV == 'production'){
        urls=url
    }else if(process.env.NODE_ENV == 'testing'){
        urls='/cnuo'+url
    }else{
        urls='/api' + url
    }
    // var urls=process.env.NODE_ENV == 'production' ? url : '/api' + url
    return new Promise((resolve,reject)=>{
        axios({
            method:method,
            url:urls,
            data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
            // data:method === 'POST' || method === 'PUT' ? params:null,
            params:method==='GET' || method === 'DELETE' ? params:null,
        })
        .then(function(res){
            if (res.status==200) {
                resolve(res.data)
            }else {
                networkcode.getApiCode(res.message)
            }
        })
        .catch(function (err) {
    		let res = err.response
    		if (err) {
    			networkcode.getCode(err)
    			return
    		}
        })
    })
}
export function getUserInfo(){
    return localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo'))
  }

export default {
    get: function (url, params) {
		return Axios('GET', url, params)
	},
	post: function (url, params) {
		return Axios('POST', url, params)
	},
	exportPost: function (url, params) {
		return exportAxios('POST', url, params)
	},
	exportGet: function (url, params) {
		return exportAxios('GET', url, params)
	},
	smsGet: function (url, params,deviceId) {
		return smsAxios('GET', url, params,deviceId)
	},
	smsPost: function (url, params,deviceId) {
		return smsAxios('POST', url, params,deviceId)
	},
	userGet: function (url, params) {
		return userAxios('GET', url, params)
	},
	userPost: function (url, params) {
		return userAxios('POST', url, params)
	},
	put: function (url, params) {
		return Axios('PUT', url, params)
	},
	delete: function (url, params) {
		return Axios('DELETE', url, params)
	},
    root:root,
}
