import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AllView.vue')
  },
  {
    path: '/movies',
    name: 'films',
    component: () => import('../views/FilmsView.vue')
  },
  {
    path: '/series',
    name: 'series',
    component: () => import('../views/SeriesView.vue')
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('../views/GamesView.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/BooksView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
