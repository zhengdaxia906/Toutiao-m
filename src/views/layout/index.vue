<template>
  <div class="layout-container">
    <router-view />

    <!-- 底部导航栏 -->
    <van-tabbar >
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to='/qa'>问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to='/video'>视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {

    }
  },
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  methods: {}
}
</script>

<style type="text/css" scoped>
</style>
