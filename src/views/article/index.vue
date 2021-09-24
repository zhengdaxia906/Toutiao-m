<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="article-wrap">
      <!-- 标题 -->
      <h3 class="title">{{ article.title }}</h3>
      <!-- 作者信息 -->
      <van-cell center class="user-info">
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="article.aut_photo"
        ></van-image>
        <div slot="title" class="user-name">黑马头条号</div>
        <div slot="label" class="publish-date">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          size="small"
          round
          @click="onFollw"
          >{{ article.is_followed ? "已关注" : "关注" }}</van-button
        >
      </van-cell>
      <div
        class="markdown-body article-content"
        v-html="article.content"
        ref="article-content"
      >
        文章正文
      </div>
      <!-- 评论组件 -->
      <comment-list
        :source="articleId"
        :list="commentList"
        @update-total-count="totalCommentCount = $event"
        @click-reply ="onReplyClick"
      />
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude === 1 ? 'orange' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>

    <!-- 发布评论区 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :articleId="articleId" @post-success="onPostSuccess" />
    </van-popup>
    <!-- 评论的回复区 -->
    <van-popup v-model="isReplyShow" position="bottom" >
      <comment-reply v-if="isReplyShow"  :comment="replyComment" :articleId="articleId" />
    </van-popup>
  </div>
</template>

<script>
import CommentList from './components/comment-list.vue'
import PostComment from './components/post-comment.vue'
import CommentReply from './components/comment-reply.vue'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article.js'
import { addFollow, deleteFollow } from '@/api/user.js'
import './github-markdown.css'
import { ImagePreview } from 'vant'

// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 1
// })

// 在组件中获取动态路由参数方式：
//   方式一： this.$route.params.xxx
//   方式二： props传参，推荐
export default {
  name: 'ArticleIndex',
  components: {
    'comment-list': CommentList,
    'post-comment': PostComment,
    'comment-reply': CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章内容对象
      isPostShow: false, // 发布评论弹出层的显示
      isReplyShow: false, // 评论回复弹出层的显示
      commentList: [], // 文章评论列表数组
      totalCommentCount: 0, // 评论总数量
      replyComment: {} // 回复的评论项
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data

      this.$nextTick(() => {
        this.handlePreviewImag()
      })
    },

    // 图片预览
    handlePreviewImag () {
      // vue中数据改变影响视图更新(dom数据)不是立即的
      // 所以需要改变数据之后立马操作被该数据影响的视图dom，需要把这部分代码放到$this.$nextTick中
      //   获取文章内容部分的dom容器
      const articleContent = this.$refs['article-content']

      // 拿到所有img标签，注册点击事件，在事件处理函数中循环调用ImagePreview方法
      const imgs = articleContent.querySelectorAll('img')

      const imgPaths = [] // 用来收集所有图片路径
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    // 关注用户
    async onFollw () {
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
    },
    // 收藏文章
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 点赞文章
    async onLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 接受子组件评论发布的处理函数
    onPostSuccess (comment) {
      // 把发布成功的数据放到评论列表顶部
      this.commentList.unshift(comment)

      this.totalCommentCount++
      this.isPostShow = false
    },
    onReplyClick (comment) {
      // console.log('onReplyClick', comment)
      this.replyComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  overflow-y: auto;
  bottom: 44px;
}
.user-info {
  /deep/.avatar {
    margin-right: 10px;
    width: 45px;
    height: 45px;
  }
  .follow-btn {
    width: 85px;
    height: 30px;
  }
}
.article-bottom {
  position: fixed;
  height: 44px;
  left: 0px;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #d8d8d8;
  box-sizing: border-box;

  .comment-btn {
    width: 150px;
  }
}
</style>
