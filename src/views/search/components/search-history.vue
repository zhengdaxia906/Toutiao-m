<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onDelete(history,index)"
    >
       <van-icon
        v-show="isDeleteShow"
        name="close"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '../../../utils/storage'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onDelete (history, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)

        // // 持久化处理
        // setItem('search-histories', this.searchHistories)
        return
      }
      // 若是非删除状态则触发搜索
      this.$emit('search', history)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
