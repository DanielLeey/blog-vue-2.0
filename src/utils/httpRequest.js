import axios from 'axios'
import qs from 'qs' // 字符串处理
import merge from 'lodash/merge' // 合并对象工具
import { getToken } from '@/utils/auth'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true // 当前请求为跨域类型时是否在请求中协带cookie
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get 请求参数处理
 * @param params
 * @param openDefaultParams
 * @returns {*}
 */
http.adornParams = (params = {}, openDefaultParams = true) => {
  var defaluts = {
    't': new Date().getTime()
  }
  return openDefaultParams ? merge(defaluts, params) : params
}
/**
 * post请求参数处理
 * @param data
 * @param openDefaultdata
 * @param contentType
 * @returns {string}
 */
http.adornDatas = (data = {}) => {
  return qs.stringify(data)
}

http.adornData = (data = {}, openDefaultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefaultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

// request拦截器
http.interceptors.request.use(config => {
  // 是否需要设置 token
  // 登录 config.headers.isToken 设置为undefined/false => isToken = false => getToken() && !isToken  ==  undefined && false => false
  // 退出 config.headers.isToken true  => isToken = true => getToken() && isToken  ==  value && true => true
  const isToken = (config.headers || {}).isToken === true
  if (getToken() && isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  // if (config.method === 'get' && config.params) {
  //   let url = config.url + '?'
  //   for (const propName of Object.keys(config.params)) {
  //     const value = config.params[propName]
  //     var part = encodeURIComponent(propName) + '='
  //     if (value !== null && typeof (value) !== 'undefined') {
  //       if (typeof value === 'object') {
  //         for (const key of Object.keys(value)) {
  //           if (value[key] !== null && typeof (value[key]) !== 'undefined') {
  //             const params = propName + '[' + key + ']'
  //             const subPart = encodeURIComponent(params) + '='
  //             url += subPart + encodeURIComponent(value[key]) + '&'
  //           }
  //         }
  //       } else {
  //         url += part + encodeURIComponent(value) + '&'
  //       }
  //     }
  //   }
  //   url = url.slice(0, -1)
  //   config.params = {}
  //   config.url = url
  // }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

export default http
