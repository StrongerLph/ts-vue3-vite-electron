import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import type { App } from "vue";

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: "",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
