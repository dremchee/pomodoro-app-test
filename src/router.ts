import { createRouter, createWebHistory } from "vue-router";
import { useSessionStore } from "@/components/work/useSessionStore";

const routes = [
 {
  path: "/",
  name: "home",
  component: () => import("./components/home/pages/Home.vue"),
  meta: { title: "Pomodoro" },
  beforeEnter: () => {
   const sessionStore = useSessionStore();

   if (sessionStore.isRunning) {
    return { name: "work" };
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
