import { createRouter, createWebHistory } from "vue-router";
import { useSessionStore } from "@/components/work/useSessionStore";
import { useTimerStore } from "@/components/work/useTimerStore";

const routes = [
 {
  path: "/",
  name: "home",
  component: () => import("./components/home/pages/Home.vue"),
  meta: { title: "Pomodoro" },
  beforeEnter: () => {
   const timerStore = useTimerStore();

   if(timerStore.isRunning) {
    return {
     name: "work",
    };
   }
  },
 },
 {
  path: "/stats",
  name: "stats",
  component: () => import("./components/stats/pages/Stats.vue"),
  meta: { title: "Statistics" },
 },
 {
  path: "/settings",
  name: "settings",
  component: () => import("./components/settings/pages/Settings.vue"),
  meta: { title: "Settings" },
 },
 {
  path: "/work",
  name: "work",
  component: () => import("./components/work/pages/Work.vue"),
  meta: { title: "Pomodoro" },
 },
];

export const router = createRouter({
 history: createWebHistory(),
 routes,
});

router.beforeEach((to, from, next) => {
 const timerStore = useTimerStore();
 timerStore.saveState();
 next();
});

export default router;
