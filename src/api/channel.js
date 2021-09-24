//                        频道请求相关模块

import request from '../utils/request'

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/channels'
    url: '/v1_0/channels'
  })
}
// 登录状态下添加指定用户频道和删除指定频道
export const addUserChannels = (data) => {
  return request({
    method: 'patch',
    // url: '/app/v1_0/user/channels',
    url: '/v1_0/user/channels',
    data
  })
}
export const deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    // url: `/app/v1_0/user/channels/${channelId}`
    url: `/v1_0/user/channels/${channelId}`
  })
}
