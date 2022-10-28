import axios from "axios";
import qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { message } from 'ant-design-vue';
let server = ""//"/api";
import { isLogin } from '@/common/common.js'

// export async function http(url, method = "get", params) {
//   const { data } = await axios({
//     method,
//     url: `${server}/${url}`,
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json"
//     },
//     data: params
//   });
//   return data;
// }

function isEmpty(obj) {
  for (const el in obj) {
    return false
  }

  return true
}

function getTokenHeader() {
  let Authorization
  let token = isLogin()
  if (token) {
    Authorization = `Bearer ${token}`
  } else {
    Authorization = 'Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5'
  }
  return { Authorization }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300||response.status==422) {
    fileDown(response)
    try { JSON.parse(response.data) }
    catch (e) { return response.data }
    return JSON.parse(response.data)
  } else {
    var errorText = ''
    switch (response.status) {
      case 404:
        errorText = '服务器走丢了'
        break
      case 401:
        errorText = '登陆过期'
        localStorage.clear()
        location.href = location.pathname
        break
      default:
        errorText = response.statusText
    }
    var error = new Error(errorText)
    error.response = response
    throw error
  }
}
function fileDown(response) {

  if (response.config && (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer')) {
    const blob = new Blob([response.data])
    const downloadElement = document.createElement('a')
    //const href = window.URL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
    const href = window.URL.createObjectURL(blob)
    const dis = response.headers['content-disposition']
    const filenameKey = 'filename='
    const indexOf = dis.indexOf(filenameKey)
    const filename = indexOf ? decodeURI(dis.substring(indexOf + filenameKey.length)) : '未知文件名'
    downloadElement.href = href
    downloadElement.download = decodeURIComponent(escape(filename))
    //downloadElement.download = filename
    document.body.appendChild(downloadElement)
    downloadElement.click()
    //if (window.URL) {
    window.URL.revokeObjectURL(href)
    //} else {
    //  window.webkitURL.revokeObjectURL(href)
    //}
    document.body.removeChild(downloadElement)
    response.data={code:0,data:'',message:'下载中'}
  }
}

const fetch = (options) => {
  let {
    method = 'get',
    data = {},
    url,
    config,
    headers,
  } = options

  url = `${server}/${url}`;
  //data.domain = document.domain;
  const _headers = getTokenHeader();
  if (options.form) {
    data = qs.stringify(data)
    _headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  else { _headers["Content-Type"] = "application/json"; }

  for (let el in headers) {
    _headers[el] = headers[el]
  }

  const instance = axios.create({
    baseURL: '/',
    headers: _headers,
    withCredentials: true,
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  instance.interceptors.response.use(checkStatus, err => {
    return  checkStatus(err.response)
    //return Promise.reject(err)
  })

  switch (method.toLowerCase()) {
    case 'get':
      return instance.get(`${url}${!isEmpty(data) ? `?${qs.stringify(data)}` : ''}`, config)
    case 'delete':
      return instance.delete(url, { data })
    case 'head':
      return instance.head(url, data)
    case 'post':
      return instance.post(url, data)
    case 'put':
      return instance.put(url, data)
    case 'patch':
      return instance.patch(url, data)
    default:
      return instance(options)
  }
}

function createFetch(options) {
  NProgress.start()
  options.url = options.url.indexOf('api/') == -1 ? 'api/'+options.url :options.url
  return fetch(options).then((res) => {
    if (res.code == 0) {
      NProgress.done();
      return res.data
    } else {
      if (res.code == 401){
        res.message = '登陆过期'
        localStorage.clear()
        location.href = location.pathname
      }
      throw res
    }
  }).catch((error) => {
    message.error(error.message)
    NProgress.done();
    return 'error'
  })
}

function createNodeFetch(options) {
  NProgress.start()
  return fetch(options).then((res) => {
    if (res.code == 20000) {
      NProgress.done();
      return res.data
    } else {
      // if (res.code == 401){
      //   localStorage.clear()
      //   res.message = '登陆过期'
      // }
      throw res
    }
  }).catch((error) => {
    message.error(error.message)
    NProgress.done();
    return 'error'
  })
}
// module.exports.randomChar = function (l, seed) {
//   var x = seed || "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM-"
//   var tmp = ""
//   for (var i = 0; i < l; i++) {
//     tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
//   }
//   return tmp
// }

export default {
  post: (url, o = {}) => { o.method = 'post'; o.url = url; return createFetch(o) },
  get: (url, o = {}) => { o.method = 'get'; o.url = url; return createFetch(o) },
  node: (url, o = {}) => {
    o.method = 'post';
    o.url = 'nodeapi/' + url;
    o.data = o.data ? o.data : {};
    o.data.id ? '' : o.data.id = localStorage.getItem('competitionId');
    return createNodeFetch(o)
  },
  form: (url, o = {}) => { o.method = 'post'; o.form = true; o.url = url; return createFetch(o) },
}
