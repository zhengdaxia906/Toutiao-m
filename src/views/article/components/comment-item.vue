<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onCommentlike"
      >
        {{ comment.like_count || "赞" }}
      </van-button>
    </div>
    <div slot="label" class="comment-cneter">
      <div class="comment-content">{{ comment.content }}</div>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round @click="$emit('click-reply',comment)"
          >{{ comment.reply_count }} 回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
// http://localhost:8080/#/article/1322810995122372608
import { addCommentLike, deleteCommentLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    onCommentlike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        addCommentLike(commentId)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  height: 90px;
  .avatar {
    width: 32px;
    height: 32px;
    margin-right: 7px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    .like-btn {
      border: none;
    }
    .user-name {
      color: #406599;
      font-size: 16px;
    }
  }
  .comment-content{
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    // text-align: justify;

  }
  .bottom-info {
    display: flex;
    align-items: center;
    .reply-btn {
      height: 20px;
      width: 68spx;
      font-size: 10px;
      text-align: center;
      margin-left: 10px;
      line-height: 30px;
    }
  }
}
</style>
