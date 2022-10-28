import network from "@/api/utils";
console.log('环境',process.env.NODE_ENV)
var urls=""
if(process.env.NODE_ENV == 'production'||process.env.NODE_ENV=='test'){
    urls="api"
}else if(process.env.NODE_ENV == 'testing'){
    urls='cnuo'
}else{
    urls='api'
}
function Axios(method,url,params,headers){
    return network[method](urls+url,{data:params,headers}).then(data=>({code:data=='error'?1:0,data}))
}
function exportAxios(method,url,params){
    return network[method](urls+url,{data:params,config:{
        responseType:'arraybuffer'
    }})
}
export function getUserInfo(){
    return localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo'))
  }

export default {
    get: function (url, params) {
		return Axios('get', url, params)
	},
	post: function (url, params) {
		return Axios('post', url, params)
	},
	exportPost: function (url, params) {
		return exportAxios('post', url, params)
	},
	exportGet: function (url, params) {
		return exportAxios('get', url, params)
	},
	smsGet: function (url, params,deviceId) {
		return Axios('get', url, params,{deviceId})
	},
	smsPost: function (url, params,deviceId) {
		return Axios('post', url, params,{deviceId})
	},
	userGet: function (url, params) {
		return Axios('get', url, params)
	},
	userPost: function (url, params) {
		return Axios('post', url, params)
	},
	put: function (url, params) {
		return Axios('put', url, params)
	},
	delete: function (url, params) {
		return Axios('delete', url, params)
	},
	root: urls
}
