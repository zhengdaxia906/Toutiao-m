// 文章评论相关请求

import request from '../utils/request'
// 获取评论列表
export function getComments (params) {
  return request({
    method: 'GET',
    // url: '/app/v1_0/comments',
    url: '/v1_0/comments',
    params
  })
}
// 添加评论点赞
export const addCommentLike = (commentId) => {
  return request({
    method: 'POST',
    // url: '/app/v1_0/comment/likings',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消评论点赞
export const deleteCommentLike = (commentId) => {
  return request({
    method: 'DELETE',
    // url: `/app/v1_0/comment/likings/${commentId}`
    url: `/v1_0/comment/likings/${commentId}`
  })
}
/**
 * 添加评论或评论回复
 */
export function addComment (data) {
  return request({
    method: 'POST',
    // url: '/app/v1_0/comments',
    url: '/v1_0/comments',
    data
  })
}
