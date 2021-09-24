<template>
  <div class="uer-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      accept="image/*"
      hidden
      ref="file"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      ></van-image>
    </van-cell>
    <van-cell
      @click="isEditNameShow = true"
      title="昵称"
      is-link
      :value="user.name"
    ></van-cell>
    <van-cell
      @click="isEditGenderShow = true"
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>

    <!-- 修改昵称弹出框 -->
    <van-popup v-model="isEditNameShow" position="bottom">
      <!-- :name="user.name"
      @update-name="user.name = $event" -->
      <!-- 当需要传递给子组件值又要修改该值时，可以在子组件标签上v-model="user.name"，
      相当于  :value = "user.name" 和默认监听input事件@input="user.name=$event" -->
      <update-name
        v-if="isEditNameShow"
        @close="isEditNameShow = false"
        v-model="user.name"
      />
    </van-popup>

    <!-- 修改性别弹出框 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender
        v-if="isEditGenderShow"
        @close="isEditGenderShow = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 修改生日弹出框 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <update-birthday
        v-if="isEditBirthdayShow"
        @close="isEditBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>

    <!-- 修改头像弹出框 -->
    <van-popup v-model="isEditPhotoShow" position="bottom" style="height: 100%">
      <update-photo
        v-if="isEditPhotoShow"
        :image="previewImage"
        @close="isEditPhotoShow"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: '',
  components: {
    'update-name': UpdateName,
    'update-gender': UpdateGender,
    'update-birthday': UpdateBirthday,
    'update-photo': UpdatePhoto
  },
  props: {},
  data () {
    return {
      user: {}, // 用户个人信息
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      previewImage: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      console.log(data)
      this.user = data.data
    },

    onFileChange () {
      // 在弹出层里预览图片
      const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(blob)
      this.previewImage = blob
      this.isEditPhotoShow = true

      // 为了解决相同文件不触发change事件，所以在这里手动 清空file的value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
