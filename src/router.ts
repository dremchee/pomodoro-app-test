import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./components/home/pages/Home.vue')
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('./components/stats/pages/Stats.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./components/settings/pages/Settings.vue')
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('./components/work/pages/Work.vue')
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
