<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title = item.title />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: '',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 10// 每页数据
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data: res } = await getSearchResult({
        page: this.page, // 页数，不传默认为1
        per_page: this.perPage, // 每页数量，不传每页数量由后端决定
        q: this.searchText // 搜索关键词
      })

      const { results } = res.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.page++
      } else {
        this.finshed = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  top: 54px;
  bottom: 0;
  right: 0;
  left: 0;
  overflow-y: auto;
}
</style>
