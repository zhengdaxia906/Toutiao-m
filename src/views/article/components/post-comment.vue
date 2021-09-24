<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="300"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onAddComment">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  components: {},
  props: {
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onAddComment () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const message = this.message.trim()
      if (!message.length) {
      } else {
        const { data } = await addComment({
          target: this.articleId, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message // 评论内容
          // art_id // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data)
        this.$emit('post-success', data.data.new_obj)
        this.$toast.success('发布成功')
        this.message = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    border: none;
    padding: 0;
    color: #6ba3d8;
    text-align: center;
  }
}
</style>
