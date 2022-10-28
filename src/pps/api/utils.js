import axios from "axios";
import qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
let server = ""
let crossToJava = 'acrossToJava'

function isEmpty(obj) {
  for (const el in obj) {
    return false
  }

  return true
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
    
    response.data={code:20000,data:'',message:'下载中'}
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
  var _headers={}
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

  instance.interceptors.request.use(c => {
    for(let key in config){
      c[key]=config[key]
    }
    return c
  }, err => {
    return Promise.reject(err)
  })

  instance.interceptors.response.use(checkStatus, err => {

    return Promise.reject(err)
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

function createNodeFetch(options) {
  NProgress.start()
  return fetch(options).then((res) => {
    if (res.code == 20000) {
      NProgress.done();
      return res.data
    } else {
      throw res
    }
  }).catch((error) => {
    Message.error(error.message)
    NProgress.done();
    return 'error'
  })
}

export default {
  node: (url, o = {}) => {
    o.method = 'post';
    o.url = 'nodeapi/pps/' + url;
    o.data = o.data ? o.data : {};
    return createNodeFetch(o)
  },
  nodeGet: (url, o = {}) => {
    o.method = 'get';
    o.url = 'nodeapi/pps/' + url;
    o.data = o.data ? o.data : {};
    return createNodeFetch(o)
  },
  get:(url,o={})=>{
      o.method = 'post'
      o.url = 'nodeapi/' + crossToJava;
      o.data = o.data ? o.data : {}
      let _jparams={
        javaUrl:url,
        method:'get',
      }
      o.data.nodeParams = _jparams
      return createNodeFetch(o)
  },
  post:(url,o={})=>{
    o.method = 'post'
    o.url = 'nodeapi/' + crossToJava;
    o.data = o.data ? o.data : {}
    let _jparams={
      javaUrl:url,
      method:'post',
    }
    o.data.nodeParams = _jparams
    return createNodeFetch(o)
},
}
