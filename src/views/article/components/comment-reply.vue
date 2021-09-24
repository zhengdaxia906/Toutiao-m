<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${ comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- /当前评论项 -->

    <!-- 评论的回复列表 -->
    <van-cell title="全部回复"></van-cell>
    <comment-list :source="comment.com_id" type="c" :list="commentList"></comment-list>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="article-bottom">
        <van-button
        class="comment-btn"
        type="default"

        size="small"
        @click="isPostShow=true"
        >写评论</van-button>
    </div>
    <!-- /底部 -->

    <!-- 发布评论 -->
     <van-popup v-model="isPostShow" position="bottom">
      <post-comment :target="comment.com_id" :articleId="articleId" @post-success="onPostSuccess"></post-comment>
    </van-popup>
    <!-- 发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'
export default {
  name: 'CommentReply',
  components: {
    'comment-item': CommentItem,
    'comment-list': CommentList,
    'post-comment': PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess (comment) {
      //   将发布成功的评论放到列表顶部
      //   更新评论回复数量
      //   关闭发布回复的弹出层

      this.commentList.unshift(comment)
      this.comment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment-btn{
    width:100%;
}
</style>
