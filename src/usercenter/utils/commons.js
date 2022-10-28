import {getToken} from '@@/utils/oauth'
export const isEmpty = (argEl, obj) => {
  for (let el in obj) {
    if (el === argEl) {
      return true
    }
  }

  return false
}

export const getTokenHeader = () => {
  let Authorization
  let token = getToken()
  if (token) {
    Authorization = `Bearer ${token}`
  } else {
    Authorization = 'Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5'
  }
  return { Authorization }
}

export const getGroupId = () => {
  return localStorage.getItem('groupId')
}

// 获取URL中的参数
export const getParameterByName = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.href)
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

// 操作localstorage
export const mystorage = {
  set (key, value) {
    window.localStorage.setItem(key, value)
  },
  get (key) {
    return window.localStorage.getItem(key)
  },
  remove (key) {
    window.localStorage.removeItem(key)
  }
}

