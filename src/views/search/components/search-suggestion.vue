<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(str, index) in suggestions" :key="index"
    @click = "$emit('search',str)">
      <div v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
// 防抖函数

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  computed: {
  },
  watch: {
    // 简写：属性名，要监视的数据的名称
    // searchText () {
    //   console.log('hello')
    // }
    // 完整写法
    searchText: {
      handler: debounce(async function () {
        const { data: res } = await getSearchSuggestions(this.searchText)
        this.suggestions = res.data.options
      }, 200),
      immediate: true // 设置后，回调handler会在侦听开始之后立即调用。
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (str) {
      const replaceText = `<span style="color:red">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, replaceText)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
