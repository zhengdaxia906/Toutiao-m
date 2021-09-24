//                                                用户相关请求模块
import request from '../utils/request'

// // 在非组件模块中获取store必须通过这种方式
// // 这里单独加载store，和在组件中this.$store一个东西
// import store from '../store/'

// login/register
export const login = data => {
  return request({
    method: 'POST',
    // url: '/app/v1_0/authorizations',
    url: '/v1_0/authorizations',
    data: data
  })
}

// 发送短信验证码

export const sendSms = mobile => {
  return request({
    method: 'GET',
    // url: `/app/v1_0/sms/codes/${mobile}`
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取当前用户登录信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/user'
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`

  })
}

// 获取用户首页频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/user/channels'
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const addFollow = (userId) => {
  return request({
    method: 'POST',
    // url: '/app/v1_0/user/followings',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注
export const deleteFollow = (userId) => {
  return request({
    method: 'DELETE',
    // url: `/app/v1_0/user/followings/${userId}`
    url: `/v1_0/user/followings/${userId}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/user/profile'
    url: '/v1_0/user/profile'
  })
}
// 修改个人信息
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    // url: '/app/v1_0/user/profile',
    url: '/v1_0/user/profile',
    data
  })
}
// 更新用户头像
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    // url: '/app/v1_0/user/photo',
    url: '/v1_0/user/photo',
    data
  })
}
