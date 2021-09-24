<template>
<div>
  <van-nav-bar
    title="编辑昵称"
    left-text="返回"
    right-text="完成"
    left-arrow
    @click-left="$emit('close')"
    @click-right="onConfirm"
  />
  <div>
      <van-field v-model="localName"  placeholder="请输入用户名" />
  </div>

</div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true

      })
      try {
        await updateUserProfile({
          name: this.localName
        })

        this.$toast.success('保存成功')
        // this.$emit('update-name', this.localName)
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
