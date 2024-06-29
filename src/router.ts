import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./components/home/pages/Home.vue'),
    meta: { title: 'Pomodoro' },
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('./components/stats/pages/Stats.vue'),
    meta: { title: 'Statistics' },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./components/settings/pages/Settings.vue'),
    meta: { title: 'Settings' },
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('./components/work/pages/Work.vue'),
    meta: { title: 'Pomodoro' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
