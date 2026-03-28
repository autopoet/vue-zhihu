import { createRouter, createWebHistory } from 'vue-router'
import { useDetailStore } from '../stores/detail'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', // 重定向到登录页
    },
    {
      path: '/login', // 登录页
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
    },
    {
      path: '/home', // 布局页
      name: 'home',
      component: () => import('../components/layout/MainLayout.vue'),
      meta: { requiresAuth: true }, 
      children: [
        {
          path: 'index', // 首页
          name: 'index',
          redirect: '/home/index/recruit', // 默认跳招募大厅
          component: () => import('../views/home/HomeView.vue'),
          children: [
            {
              path: 'recruit',
              name: 'recruit',
              component: () => import('../views/recruit/RecruitList.vue'),
            },
            {
              path: 'share',
              name: 'share',
              component: () => import('../views/share/ShareList.vue'),
            }
          ]
        },
        {
          path: 'explore', // 竞赛大厅(日历)页
          name: 'explore',
          component: () => import('../views/explore/CompetitionCalendar.vue'),
        },
        {
          path: 'detail/:type/:id',
          name: 'detail',
          component: () => import('../views/detail/PostDetail.vue'),
        },
        {
          path: 'profile', // 个人大满贯主页
          name: 'profile',
          component: () => import('../views/profile/UserProfile.vue'),
        },
        {
          path: 'favorites', // 我的收藏夹
          name: 'favorites',
          component: () => import('../views/profile/FavoritesList.vue'),
        }
      ]
    },
  ],
})

// ============================================================
// 全局前置路由守卫
// 职责 1: 鉴权拦截（Token 校验）
// 职责 2: 详情页状态隔离（联动 Pinia 缓存池强制重置）
// ============================================================
router.beforeEach((to, from, next) => {

  // ---------- 1. 鉴权拦截 ----------
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = 'fake-jwt-token-for-test' 
    if (!token) {
      console.warn('🚧 路由守卫拦截：无 Token，访问受限')
      next({
        path: '/login',
        query: { redirect: to.fullPath } 
      })
      return
    }
  }

  // ---------- 2. 详情页 Pinia 状态隔离拦截 ----------
  // 构建模块 ID：用 "type_id" 唯一标识每个详情页的数据空间
  const isFromDetail = from.name === 'detail'
  const isToDetail = to.name === 'detail'

  if (isFromDetail) {
    const fromModuleId = `${from.params.type}_${from.params.id}`
    const toModuleId = isToDetail ? `${to.params.type}_${to.params.id}` : null

    // 场景 A: 详情页之间就地复用切换，且模块 ID 不同 → 强制重置
    // 场景 B: 从详情页离开到其他页面 → 清空缓存池，防止下次进入闪现旧数据
    if (!toModuleId || fromModuleId !== toModuleId) {
      const detailStore = useDetailStore()
      detailStore.forceReset()
      console.log(
        `🛡️ [Router Guard] 状态隔离拦截 | ${fromModuleId} → ${toModuleId || '非详情页'}`
      )
    }
  }

  next()
})

export default router
