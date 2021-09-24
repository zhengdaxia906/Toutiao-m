<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayjs from '../../../utils/dayjs'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2021, 10, 1),
      currentDate: new Date(this.value)
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
        forbidClick: true
      })
      //   const data = `${this.currentDate.getFullYear()}-${
      //     this.currentDate.getMonth() + 1
      //   }-${this.currentDate.getDate()}}`
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: date
      })
      this.$emit('input', date)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
