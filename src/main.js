import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant组件库
import Vant from 'vant'

// 引入Vant的css文件
import 'vant/lib/index.css'

// 全局样式              最好放在第三方样式后面 起到覆盖全局作用
import './styles/index.less'

// 引入自动设置rem基准值插件
import 'amfe-flexible'

import './utils/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
