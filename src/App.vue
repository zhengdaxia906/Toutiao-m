<template>
  <div id="app">
    <!-- 一级路由的出口，路由表中所有顶层路由都是一级路由 -->
    <!-- 因为router-view是一级路由出口，这里设置 keep-alive -->
    <keep-alive ：include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less"></style>
