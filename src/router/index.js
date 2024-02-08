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
    path: '/jokes',
    name: 'jokes',
    component: () => import('../views/Jokes.vue'),
    meta: { title: 'Jokes' }
  },
  {
    path: '/kenyanews',
    name: 'kenyanews',
    component: () => import('../views/KenyanNews.vue'),
    meta: { title: 'Kenyan news' }
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('../views/AiWeather.vue'),
    meta: { title: 'City Weather' }
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
  {
    path: '/memes',
    name: 'memes',
    component: () => import('../views/ProgrammingMeme.vue'),
    meta: { title: 'Programming Memes' }
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