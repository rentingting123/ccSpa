// import axios from "axios";
// import qs from 'qs';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
// import { Message } from 'element-ui';
// // import store from '@/expert/vuex/store'
// let server = ""//"/api";
// import { getTokenHeader } from "@@/utils/commons";

// //axios 请求拦截 以及取消
// let pending = new Map()

// const addPending = (config) => {
//   const url = [
//     config.url,
//     config.method,
//   ].join('&')
//   //添加请求到pendingmap
//   config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
//     if (!pending.has(url)) {
//       pending.set(url, cancel)
//     }
//   })
// }

// const removePending = config => {
//   const url = [config.url, config.method].join('&')
//   if (pending.has(url)) {
//     const cancel = pending.get(url)
//     cancel(url)
//     pending.delete(url)
//   }
// }


// function isEmpty(obj) {
//   for (const el in obj) {
//     return false
//   }

//   return true
// }

// function checkStatus(response) {
//   removePending(response?.config || {})
//   // console.log('store', store)
//   if (pending.size < 1) {
//     // store.commit('cancelLoading')
//     NProgress.done()
//   }
//   if (!response) {
//     var error = new Error('服务器获取数据失败，请稍后重试')
//     error.response = response
//     throw error
//   } else if (response.status >= 200 && response.status < 300 || response.status == 422) {
//     fileDown(response)
//     try { JSON.parse(response.data) }
//     catch (e) { return response.data }
//     return JSON.parse(response.data)
//   } else {
//     var errorText = ''
//     switch (response.status) {
//       case 404:
//         errorText = '服务器走丢了'
//         break
//       case 401:
//         errorText = '登陆过期'
//         localStorage.clear()
//         location.href = location.pathname
//         break
//       default:
//         errorText = response.statusText
//     }
//     var error = new Error(errorText)
//     error.response = response
//     throw error
//   }
// }
// function fileDown(response) {
//   // console.log(response)
//   if (response.config && (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer')) {
//     const blob = new Blob([response.data])
//     const downloadElement = document.createElement('a')
//     //const href = window.URL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
//     const href = window.URL.createObjectURL(blob)
//     const dis = response.headers['content-disposition']
//     const filenameKey = 'filename='
//     const indexOf = dis.indexOf(filenameKey)
//     const filename = indexOf ? decodeURI(dis.substring(indexOf + filenameKey.length)) : '未知文件名'
//     downloadElement.href = href
//     downloadElement.download = decodeURIComponent(escape(filename))
//     //downloadElement.download = filename
//     document.body.appendChild(downloadElement)
//     downloadElement.click()
//     //if (window.URL) {
//     window.URL.revokeObjectURL(href)
//     //} else {
//     //  window.webkitURL.revokeObjectURL(href)
//     //}
//     document.body.removeChild(downloadElement)
//     response.data = { code: 0, data: '', message: '下载中' }
//   }
// }

// const fetch = (options) => {
//   let {
//     method = 'get',
//     data = {},
//     url,
//     config={},
//     headers,
//   } = options

//   url = `${server}/${url}`;
//   //data.domain = document.domain;
//   const _headers = getTokenHeader();
//   if (options.form) {
//     data = qs.stringify(data)
//     _headers["Content-Type"] = "application/x-www-form-urlencoded";
//   }
//   else { _headers["Content-Type"] = "application/json"; }

//   for (let el in headers) {
//     _headers[el] = headers[el]
//   }

//   const instance = axios.create({
//     baseURL: '/',
//     headers: _headers,
//     withCredentials: true,
//   })

//   instance.interceptors.request.use(c => {
//     NProgress.start()

//     //console.log('store',store.common.loading)
//     // store.commit('loading')
//     //需要被截断的 传参pipe：true
//     // console.log("check:",config)
//     if(config.pipe){
//       removePending(c) // 在请求开始前，对之前的请求做检查取消操作
//       addPending(c) // 将当前请求添加到 pending 中
//     }
    
//     for (let key in config) {
//       c[key] = config[key]
//     }
//     return c
//   }, err => {
//     return Promise.reject(err)
//   })

//   instance.interceptors.response.use(checkStatus, err => {
//     if (axios.isCancel(err)) {
//       console.log('repeated request: ' + err.message)
//       options.noLog = true
//     } else {
//       return checkStatus(err.response)
//     }

//     //return Promise.reject(err)
//   })

//   switch (method.toLowerCase()) {
//     case 'get':
//       return instance.get(`${url}${!isEmpty(data) ? `?${qs.stringify(data)}` : ''}`, config)
//     case 'delete':
//       return instance.delete(url, { data })
//     case 'head':
//       return instance.head(url, data)
//     case 'post':
//       return instance.post(url, data)
//     case 'put':
//       return instance.put(url, data)
//     case 'patch':
//       return instance.patch(url, data)
//     default:
//       return instance(options)
//   }
// }

// function createFetch(options) {
//   options.url = options.url.indexOf('api/') == -1 ? 'api/' + options.url : options.url
//   return fetch(options).then((res) => {
//     if (res.code == 0) {

//       return res.data
//     } else {
//       if (res.code == 401) {
//         res.message = '登陆过期'
//         localStorage.clear()
//         location.href = location.pathname
//       }
//       throw res
//     }
//   }).catch((error) => {
//     if (!options.noLog) {
//       Message.error(error.message)
//     }

//     return 'error'
//   })
// }

// function createNodeFetch(options) {
//   return fetch(options).then((res) => {
//     if (res.code == 20000) {

//       return res.data
//     } else {
//       throw res
//     }
//   }).catch((error) => {
//     if (!options.noLog) Message.error(error.message)

//     return 'error'
//   })
// }

// export default {
//   post: (url, o = {}) => { o.method = 'post'; o.url = url; return createFetch(o) },
//   put: (url, o = {}) => { o.method = 'put'; o.url = url; return createFetch(o) },
//   delete: (url, o = {}) => { o.method = 'delete'; o.url = url; return createFetch(o) },
//   get: (url, o = {}) => { o.method = 'get'; o.url = url; return createFetch(o) },
//   node: (url, o = {}) => {
//     o.method = 'post';
//     o.url = 'nodeapi/' + url;
//     o.data = o.data ? o.data : {};
//     o.data.id ? '' : o.data.id = localStorage.getItem('competitionId');
//     return createNodeFetch(o)
//   },
//   form: (url, o = {}) => { o.method = 'post'; o.form = true; o.url = url; return createFetch(o) },
//   clearPending: () => {
//     for (const [url, cancel] of pending) {
//       cancel(url)
//     }
//     pending.clear()
//   }
// }

import network from '@@/utils/network'

  let node=(url, o = {}) => {
    o.data = o.data ? o.data : {};
    o.data.id ? '' : o.data.id = localStorage.getItem('competitionId');
    return network.node(url,o)
  }
export default {
    ...network,
    node,
}