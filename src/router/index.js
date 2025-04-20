import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/class',
      name: 'class',
      component: () => import('../views/Class/index.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart/index.vue'),
    },
    // {
    //   path: '/class/:id',
    //   name: 'class-detail',
    //   component: () => import('../views/Class/_id.vue'),
    // },
  ],
})

// 導航守衛
router.beforeEach((to, from) => {
  const isLogin = localStorage.getItem('isLogin') === 'true'

  // 未登入，禁止進入需要登入的頁面
  if (!isLogin && to.path !== '/login') {
    ElMessage({
      message: '請先登入會員',
      type: 'warning',
    })
    return { path: '/login' }
  }

  // 已登入，不允許進入 login 頁
  if (isLogin && to.path === '/login') {
    ElMessage({
      message: '您已登入',
      type: 'warning',
    })
    return { path: '/' }
  }

  // 其他狀況通過
  return true
})

export default router
