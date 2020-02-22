import React from 'react' //为了支持错误提示换行
import axios from 'axios'
import { notification } from 'antd'
import store from 'app/store'
import Config from 'settings'

//对服务器返回的错误进行提示，不能直接读取response中的错误进行显示
const responseErrorCodeMessage: any = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '所请求的服务不存在，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  baseURL: 'http://localhost:8888/', //ldg 暂时设置这个
  timeout: Config.timeout // 请求超时时间
})
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// request拦截器
service.interceptors.request.use(
  config => {
    //ldg 不使用Cookie
    const token = store.getState().login.token
    if (token) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // ldg:这个一般应该不会触发
    console.log('request error:' + error) // for debug
    Promise.reject(error)
  }
)



// response 拦截器
//这个比较重要，对一些通用问题进行处理
service.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  error => {
    if (!error || !error.response) {
      const msg = error ? error.toString() : '网络请求发生异常。'
      notification.error({
        message: '网络请求错误',
        description: msg,
        duration: 6
      })
      return Promise.reject(error)
    }

    //必须用const
    // console.log(error.response)
    const { status, config, data } = error.response
    let errorDescription = responseErrorCodeMessage[status] || '网络请求异常'
    if (data &&data.message)//原始信息有用,要换行,JSX语法很奇特
      errorDescription =<div>{errorDescription} <br /><br />详细信息：{data.message}</div>
    
    notification.error({
      message: `网络请求错误 ${status}: ${config.url}`,
      description: errorDescription,
      duration: 6
    })

    return Promise.reject(error)
  }
)

export default service
