<template>
  <div class="my-container">
    <div class="user-info">
      <!-- 第一栏 -->
      <van-cell-group v-if="user" class="my-info">
        <van-cell
          class="base-info"
          center
          :border="false"
        >
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="currentUser.photo"
          />
          <div class="name" slot="title">{{currentUser.name}}</div>
          <van-button class="update-btn" size="small" round to="/user/profile"
            >编辑资料</van-button
          >
        </van-cell>
        <van-cell>
          <van-grid :column-num="4" class="data-info" :border="false">
            <van-grid-item class="data-info-item">
              <div slot="text" class="text-wrap">
                <div class="count">{{currentUser.art_count}}</div>
                <div class="text">头条</div>
              </div>
            </van-grid-item>
            <van-grid-item class="data-info-item">
              <div slot="text" class="text-wrap">
                <div class="count">{{currentUser.follow_count}}</div>
                <div class="text">关注</div>
              </div>
            </van-grid-item>

            <van-grid-item class="data-info-item">
              <div slot="text" class="text-wrap">
                <div class="count">{{currentUser.fans_count}}</div>
                <div class="text">粉丝</div>
              </div>
            </van-grid-item>

            <van-grid-item class="data-info-item">
              <div slot="text" class="text-wrap">
                <div class="count">{{currentUser.like_count}}</div>
                <div class="text">获赞</div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-cell-group>

      <!-- 未登录显示的 -->
      <div v-else class="not-login">
        <div @click="$router.push({
          name:'login',
          query:{
            redirect:'/my'
          }
        })">
          <img class="mobile" src="" />
        </div>
        <div class="text">登录 / 注册</div>
      </div>

      <!-- 第二栏 -->
      <van-cell-group>
        <van-grid class="nav-grid" :column-num="2">
          <van-grid-item
            class="nav-grid-item"
            icon-prefix="icon"
            icon="shoucang1"
            text="收藏"
          />
          <van-grid-item
            class="nav-grid-item"
            icon-prefix="icon"
            icon="lishi"
            text="历史"
          />
        </van-grid>
      </van-cell-group>

      <!-- 第三栏 -->
      <van-cell title="消息通知" is-link to="/"></van-cell>
      <van-cell title="小智同学" is-link to="/"></van-cell>
      <van-cell
        v-if="user"
        class="logout-cell"
        title="退出登录"
        @click="onLogout"
      >
      </van-cell>
    </div>
  </div>
</template>

<script>
// 映射加载vuex
import { mapState } from 'vuex'
import { getCurrentUser } from '../../api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()

      this.currentUser = data.data
      console.log(this.currentUser)
    },
    onLogout () {
      // 提示用户确认退出
      // 确认 -> 处理退出
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗？'
        })
        .then(() => {
          // 确认执行这里
          // 清除用户登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 退出执行这里
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("../../assets/01.jpg") no-repeat;
    .van-cell {
      background-color: unset;
    }
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
    .avatar {
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
      margin-right: 11px;
    }
    .name {
      color: #fff;
      font-size: 15px;
    }
    .update-btn {
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .count {
          font-size: 18px;
        }
      }
    }
  }

  .not-login {
    height: 180px;
    background: url("../../assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang1 {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>
