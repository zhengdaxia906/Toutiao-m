//                                                   axios的请求模块

import axios from 'axios'
import jsonbig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router'
// 在非组件模块中获取store必须通过这种方式
// 这里单独加载store，和在组件中this.$store一个东西
import store from '../store/'

const refreshTokenReq = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net', // 设置基础路径

  // 使用jsonbig插件解析大数字问题
  // 如果后端返回的不是json格式字符串，JSON.parse调用便会报错，用try catch格式捕获异常
  // Axios 提供了自定义处理原始后端返回数据的 API：transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      return jsonbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已登录，统一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 处理完成后要返回config不然回卡在这里
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 401) {
    // token无效，如果没有user,或者user.token，直接去登录。
    // 如果有refresh_token，则请求获取新的token，拿到新的token之后把他更新到容器中，把失败的请求重新出发出去

    const { user } = store.state
    if (!user || !user.token) {
      return redirectLogin()
    }
    // 使用refresh_token请求获取新的token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        // url: '/app/v1_0/authorizations',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user)
    } catch (err) {
      // 跳转登录页
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常')
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.replace({
    name: 'login', // 传递查询参数，会以？作为分隔符放到url后面
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出
export default request
