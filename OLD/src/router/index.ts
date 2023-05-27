import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    mainHeader: string
    type: string
  }
}

const routes = [
  {
    path: '/',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Полный список', type: 'all' }
  },
  {
    path: '/movies',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список фильмов', type: 'movie' }
  },
  {
    path: '/series',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список сериалов', type: 'series' }
  },
  {
    path: '/games',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список игр', type: 'game' }
  },
  {
    path: '/books',
    component: () => import('../views/MainView.vue'),
    meta: { mainHeader: 'Список книг', type: 'book' }
  },

  {
    path: '/:login',
    component: () => import('../views/DisplayUserView.vue'),
    meta: { mainHeader: 'Полный список', type: 'all' }
  },
  {
    path: '/:login/movies',
    component: () => import('../views/DisplayUserView.vue'),
    meta: { mainHeader: 'Список фильмов', type: 'movie' }
  },
  {
    path: '/:login/series',
    component: () => import('../views/DisplayUserView.vue'),
    meta: { mainHeader: 'Список сериалов', type: 'series' }
  },
  {
    path: '/:login/games',
    component: () => import('../views/DisplayUserView.vue'),
    meta: { mainHeader: 'Список игр', type: 'game' }
  },
  {
    path: '/:login/books',
    component: () => import('../views/DisplayUserView.vue'),
    meta: { mainHeader: 'Список книг', type: 'book' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
