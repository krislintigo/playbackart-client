import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Полный список', type: 'all' }
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список фильмов', type: 'movie' }
  },
  {
    path: '/series',
    name: 'series',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список сериалов', type: 'series' }
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список игр', type: 'game' }
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список книг', type: 'book' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
