<template>
  <div>
    <img :src="image" ref="image" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user.js'
// 加载cropperjs的样式跟js
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: '',
  components: {},
  props: {
    file: {
      // type: String,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file)
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.image
    const cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxrResizeable: false,
      background: false,
      movable: true

    })

    console.log(cropper)
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },

    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      const file = await this.getCroppedCanvas()

      // 如果要求Content-Type是multipart/form-data,则一定要提交FormData数据对象，专门用用于文件上传，不能提交{}，没用
      const fd = new FormData()
      fd.append('photo', file)

      await updateUserPhoto(fd)

      this.$toast.success = '保存成功'

      // 更新父组件中的用户头像
      this.$emit('updata-photo', this.image)

      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar {
  background-color: #000;
}
</style>
