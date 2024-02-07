import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bettingTips',
      name: 'bettingTips',
      component: () => import('../views/BettingTips.vue')
    },
    {
      path: '/memeGenerator',
      name: 'memeGenerator',
      component: () => import('../views/MemeGenerator.vue')
    },
    {
      path: '/taxCalculator',
      name: 'taxCalculator',
      component: () => import('../views/TaxCalculator.vue')
    },
    {
      path: '/worldAirports',
      name: 'worldAirports',
      component: () => import('../views/WorldAirports.vue')
    },
    {
      path: '/nutrition',
      name: 'nutrition',
      component: () => import('../views/Nutrition.vue')
    },
    {
      path: '/chuckNorris',
      name: 'chuckNorris',
      component: () => import('../views/ChickNorris.vue')
    },
  ]
})

export default router
