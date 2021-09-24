<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nv-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell :title="item.msg" v-for="(item,index) in messages" :key="index" />
    </van-cell-group>

    <!-- 发送消息 -->
    <van-cell-group class="send-message=wrap">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      ></van-field>
      <button type="primary" size="small">send</button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'
import { List } from 'vant'

// 发送消息     socket.emit('消息类型',消息内容)
// scoket.on('消息类型',function(data){ data消息 })
export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: null, // websocket通信对象
      messages: getItem('chat-messages') || [] // 消息列表
    }
  },
  computed: {},
  watch: {
    // 如果需要操作数据之后立即操作数据影响的视图dom，那么最好把代码放到nextTick中
    messages () {
      setItem('chat-message', this.messages)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', function () {
      console.log('建立连接成功')
    })

    socket.on('disconnect', function () {
      console.log('断开连接')
    })

    // 监听message事件，接收服务端消息
    socket.on('message', function (data) {
      console.log(data)
    })
  },
  mounted () {},
  methods: {
    onSend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)

      // 把用户发出去的消息存储到数组中
      this.messages.push(data)
    },
    scrollToBottom () {
      const list = this.$refs['message-list']
      list.scrollTo = List.scrollHeight
    }
  }
}
</script>

<style lang="less" scoped>
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
</style>
