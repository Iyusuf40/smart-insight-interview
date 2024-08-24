import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/api_documentaion',
      name: 'api_documentation',
      component: () => import('../views/API_DOC.vue')
    }
  ]
})

export default router
