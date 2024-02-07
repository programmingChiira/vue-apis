import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Home Page' }
  },
  {
    path: '/bettingTips',
    name: 'bettingTips',
    component: () => import('../views/BettingTips.vue'),
    meta: { title: 'Betting Tips' }
  },
  {
    path: '/memeGenerator',
    name: 'memeGenerator',
    component: () => import('../views/MemeGenerator.vue'),
    meta: { title: 'Meme Generator' }
  },
  {
    path: '/taxCalculator',
    name: 'taxCalculator',
    component: () => import('../views/TaxCalculator.vue'),
    meta: { title: 'Tax Calculator' }
  },
  {
    path: '/worldAirports',
    name: 'worldAirports',
    component: () => import('../views/WorldAirports.vue'),
    meta: { title: 'World Airports' }
  },
  {
    path: '/nutrition',
    name: 'nutrition',
    component: () => import('../views/Nutrition.vue'),
    meta: { title: 'Nutrition' }
  },
  {
    path: '/chuckNorris',
    name: 'chuckNorris',
    component: () => import('../views/ChickNorris.vue'),
    meta: { title: 'Chick Norris' }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard to update page title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue wab app';
  next();
});

export default router;