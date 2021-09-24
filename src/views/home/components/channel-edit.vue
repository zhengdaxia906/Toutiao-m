<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannel
} from '../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    // 展示的推荐频道列表  ： 所有频道-我的频道=剩余的便是推荐频道
    recommendChannels () {
      // 数据方法filter遍历判断是否属于我的频道
      // return this.allChannels.filter((item) => {
      //   if (!this.userChannels.includes(item)) { return true }
      //   return false
      // })

      return this.allChannels.filter((channel) => {
        return !this.userChannels.find((userChannel) => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    // 加载所有频道列表
    async loadAllChannels () {
      const { data } = await getAllChannels()

      this.allChannels = data.data.channels
    },

    // 添加用户频道
    async onAdd (channel) {
      this.userChannels.push(channel)

      // 数据持久化
      if (this.user) {
        // 如果登录持久化到线上
        await addUserChannels({
          channels: [{ id: channel.id, seq: this.userChannels.length }]
        })
      } else {
        // 没登陆持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 操作用户频道
    onUserChannelClick (channel, index) {
      // 判断是否处于编辑状态，是则删除，不是则切换到该频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    // 删除选中的用户频道
    async deleteChannel (channel, index) {
      // 如果删除时当前激活频道之前的频道导致其索引变化，
      // 我们还需给激活频道更新索引
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      // 数据持久化
      if (this.user) {
        // 如果已登录则持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 没登陆则持久化到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // 切换到选中的用户频道
    switchChannel (index) {
      console.log('switch')

      // 子组件通过发布自定义事件与父组件通信

      // 切换频道
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .van-button--danger {
    width: 44px;
  }
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    border: none;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;

      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/.van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
