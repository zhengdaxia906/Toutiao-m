<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- tip：在外层包裹一层form且active不为空，即可在ios输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        shape="round"
        background="#4fc08d"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggestion>

    <!-- 历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    ></search-history>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { getSearchHistroies } from '@/api/search.js'
import { getItem, setItem } from '../../utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    'search-suggestion': SearchSuggestion,
    'search-history': SearchHistory,
    'search-result': SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 输入框文本
      isResultShow: false,
      searchHistories: getItem('search-histories') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 通过父组件监听，避免子组件的设置
    searchHistories (searchHistories) {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () {},
  methods: {
    onSearch (q) {
      // q来自三种情况：文本框文本本身。联想建议文本。历史记录文本

      // 将输入框文本设置为你要搜索的文本，：为后俩种情况
      this.searchText = q
      // 将搜索过的内容保存为历史记录,且不重复
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
      // 历史记录持久化-本地
      setItem('search-histories', this.searchHistories)
      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 如果已登录，将后端返回的历史数据与本地数据合并
      let searchHistroies = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getSearchHistroies()
        searchHistroies = [
          ...new Set([...searchHistroies, ...data.data.keywords])
        ]
      }
      return searchHistroies
    }
  }
}
</script>

<style lang="less" scoped>
</style>
