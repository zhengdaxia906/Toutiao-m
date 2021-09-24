<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment = "comment"
        @click-reply="$emit('click-reply',$event)"
      />
    </van-list>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import { getComments } from '@/api/comment.js'
export default {
  name: 'CommentList',
  components: {
    'comment-item': CommentItem

  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      const { data } = await getComments({
        type: this.type, // 查看文章评论：a，查看评论回复：c
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.$emit('update-total-count', data.data.total_count)

      const { results } = data.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
