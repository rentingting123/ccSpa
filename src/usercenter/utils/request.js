import axios from 'axios'
import qs from 'qs'
import { isEmpty, getTokenHeader } from './commons'
import { MessageBox } from 'element-ui'

function handleResponse (response, options) {
  // store.dispatch('loading/closeLoading')

  if (response.status === 200) {
    const contentType = response.headers['content-type']

    if (contentType && contentType.indexOf('json') !== -1) {
      /* eslint no-eval: 0 */
      const data = eval(response.data)
      const { code, message } = data
      if (code !== 0 && !options.noAlert) {
        //MessageBox.alert(message || '未知异常', '提示')
      }
    } else if (response.config && (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer')) {
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
    }
  } else if (response.status === 401) {
    localStorage.removeItem('login')
    MessageBox.alert('Token 不存在，请重新登录', '登录异常', {
      confirmButtonText: '确定',
      callback: action => {
        //location.href = `#`
      }
    })
  } else if (response.status > 400) {
    if(!options.noAlert) {
      MessageBox.alert(`异常编号：${response.status}，异常信息：${response.statusText}`, '服务器异常')
    }
  }
}


const fetch = (options) => {
  let {
    method = 'post',
    data,
    url,
    config,
    headers
  } = options


  const _headers = getTokenHeader()
  for (let el in headers) {
    _headers[el] = headers[el]
  }

  const instance = axios.create({
    baseURL: '/',
    headers: _headers
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  instance.interceptors.response.use(response => {
    try {
      handleResponse(response, options)
    } catch (err) {
      console.error(err)
    }
    return response
  }, err => {
    handleResponse(err.response, options)
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

/*
*(response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      code: 0,
      status,
      message: statusText,
      ...data
    }
  }
 */

 function createFetch(options){
  return fetch(options)
  .then(checkStatus)
  .then(errorFilter)
  .catch(errorCatch)
 }

export default {
  post:()=>{
    options.method='post';
    return createFetch(options)
  },
  get:()=>{
    options.method='get';
    return createFetch(options)
  }
}

/**
 * 网络层状态校验
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else {
    var errorText = ''
    switch (response.status) {
      case 404:
        errorText = '服务器错误'
        break
      default:
        errorText = response.statusText
    }
    var error = new Error(errorText)
    error.response = response
    throw error
  }
}

// /**
//  * 转换json
//  * @param response
//  */
// function parseJSON(response) {
//   return response.json()
// }

/**
 * 业务层状态校验
 * @param res
 * @returns {*}
 */
function errorFilter(res) {
  if (res.code == 0) {
    return res.data
  } else {
    throw new Error(res.message)
  }
}

/**
 * 错误捕捉
 * @param err
 */
function errorCatch(err) {
  err.message = err.message.replace('Failed to fetch', '糟糕,网络好像在开小差')
  throw err
}
