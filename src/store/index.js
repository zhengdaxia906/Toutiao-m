import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), // 当前用户登录状态（token等），读取首先从本地拿

    cachePages: ['LayoutIndex'] // 需要缓存页面的数组
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失，还需把数据放到本地存储中，实现持久化数据
      setItem(USER_KEY, state.user)
    },

    // 添加缓存页面
    addCachePage (state, pageName) {
      if (state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
