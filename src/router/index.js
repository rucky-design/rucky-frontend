import { createRouter, createWebHistory } from 'vue-router'

import PortfolioView from '../views/PortfolioView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: PortfolioView,
  },

  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      guest: true,
    },
  },

  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next('/admin-login')
  }

  if (to.meta.guest && token) {
    return next('/admin-dashboard')
  }

  next()
})

export default router