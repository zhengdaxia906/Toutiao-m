
import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    methods: 'GET',
    // url: '/app/v1_0/suggestion',
    url: '/v1_0/suggestion',
    params: {
      q // 联想建议关键词
    }
  })
}
// 获取搜索结果
export const getSearchResult = params => {
  return request({
    methods: 'GET',
    // url: '/app/v1_0/search',
    url: '/v1_0/search',
    params
  })
}
// 获取搜索历史记录
export const getSearchHistroies = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/search/histories'
    url: '/v1_0/search/histories'
  })
}
