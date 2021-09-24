import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('../views/layout/'),
    children: [
      {
        path: '', // 默认首页
        name: 'home',
        component: () => import('../views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/layout/qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/layout/video.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/layout/my.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/search.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    // 将动态路由参数映射到组件的props中，无论是访问还是维护性都方便，对应组件野要通过props接受
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user) {
    // 校验登陆状态
    Dialog.confirm({
      title: '访问提示',
      message: '需要登陆才能访问，是否要登录？'
    })
      .then(() => {
        // on confirm
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // on cancel
        next(false)
      })
  } else {
    next()
  }
})
export default router
