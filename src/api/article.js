
import request from '../utils/request'
// 加载文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    // url: '/app/v1_1/articles',
    url: '/v1_1/articles',
    params
  })
}
// 加载具体文章（详情）
export const getArticleById = (articleId) => {
  return request({
    method: 'GET',
    // url: `/app/v1_0/articles/${articleId}`
    url: `/v1_0/articles/${articleId}`
  })
}
/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    // url: '/app/v1_0/article/collections',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    // url: `/app/v1_0/article/collections/${target}`
    url: `/v1_0/article/collections/${target}`
  })
}

// 点赞
export const addLike = articleId => {
  return request({
    method: 'POST',
    // url: '/app/v1_0/article/likings',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 取消点赞
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    // url: `/app/v1_0/article/likings/${articleId}`
    url: `/v1_0/article/likings/${articleId}`

  })
}
