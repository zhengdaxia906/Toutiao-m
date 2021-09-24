<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
         to="/search"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <!-- 标签页组件有一功能，只有你第一次查看到标签页的时候才会渲染里面内容 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
      </van-tab>

      <!-- 弹出层按钮 会把最后的位置挡住，通过给这里添加一个占位元素来解决-->
      <div slot="nav-right" class="wap-nav-placeholder">
        <!-- 汉堡按钮按钮  -->
        <div
          slot="nav-right"
          class="wap-nav-wrap"
          @click="isChannelEditShow = true"
        >
          <van-icon name="wap-nav" />
        </div>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      class="channel-edit-popup"
      closeable
      get-container="body"
      style="height: 100%; width: 100%"
      >
      <!-- //模板中$event表示事件的参数，这里表示接受子组件自定义事件的参数 -->
      <channel-edit :userChannels="channels"
      :active="active"
      @close="isChannelEditShow = false"
      @update-active="active = $event"/>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserChannels } from '../../api/user'
import { getItem } from '../../utils/storage'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  components: {
    'article-list': ArticleList,
    'channel-edit': ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制激活的标签索引
      channels: [], // 频道的数组
      isChannelEditShow: false // 编辑频道的弹出层
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 加载显示的频道列表
    async loadChannels () {
      let channels = []
      if (this.user) {
        // 已登录则请求后台线上列表数据
        const { data } = await getUserChannels()

        channels = data.data.channels
      } else {
        // 未登录则判断是否由本地存储频道列表数据
        const loadChannels = getItem('user-channels')

        if (loadChannels) {
          channels = loadChannels
        } else {
          // 没有则请求获取默认频道列表数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    }
    // onUpdateActive (index) {
    //   console.log(index)
    // }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .van-button {
    width: 277px;
    height: 32px;
    background: #5babfb;
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    // &:before{
    //   content: '';
    //   width: 1px;
    //   height: 29px;
    //   background: url("./line.png") no-repeat;
    //   background-size: contain;
    //   position: absolute;
    //   left: 0;
    //   top:0
    // }
  }
}
</style>
