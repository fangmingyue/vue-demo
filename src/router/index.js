import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
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

export default router
