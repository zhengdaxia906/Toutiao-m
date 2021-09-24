<template>
  <div class="login-container">
    <div>
      <van-nav-bar
        class="app-nav-bar"
        title="注册/登录 "
        left-arrow
        @click-left="$router.back()"
      />
    </div>

    <!-- 登录表单 -->
    <van-form @submit="onLogin"
    @failed="onFailed"
    :show-error="false"
    :show-error-message="false"
    ref="login-form"
    validate>
      <van-field
        v-model="user.mobile"

        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable

        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down v-if='isCountDownShow' :time="1000*60" format="ss s"  @finish="isCountDownShow=false"/>
          <!-- 表单里按钮有默认提交表单行为，使用vue里@click.prevent阻止默认提交行为，否则发送验证码会同提交整个表单一样 -->
          <van-button v-else class="send-btn" @click.prevent="  " size="small" round  :loading="isSendSmsLoading">发送验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13611111111', // 手机号
        code: '246810' // 验证码
      },
      formRules: {
        mobile: [
          { require: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { require: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {

    async onLogin () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        during: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)

        this.$toast.success('登陆成功')

        // 将后端返回的token存放进Vuex中
        this.$store.commit('setUser', res.data.data)

        // 清除layout缓存，让他重新渲染
        this.$store.commit('removeCachePage', 'LayoutIndex')

        // 登陆成功
        // this.$router.back()
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败，手机号或者验证码错误')
      }
    },
    // 表单验证失败
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        // 校验手机号
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        const res = await sendSms(this.user.mobile)
        console.log(res)
        this.$toast.message('发送成功！')
        // 短信发送后，隐藏发送按钮
        this.isCountDownShow = true
      } catch (err) {
        // try里任何代码错误都会进入catch
        // 不同错误设置不同的提示 需要判断

        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁，稍后重试！'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送失败还是成功，都要关闭发送按钮的loading状态
      this.isSendSmsLoading = true
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
