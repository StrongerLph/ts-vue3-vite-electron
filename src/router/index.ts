import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';
import { mapModuleRouterList } from '@/utils/route';

// 导入homepage相关固定路由模块
const homePageModules = import.meta.glob('./modules/**/homepage.ts', { eager: true });
export const homePageRoutes: Array<RouteRecordRaw> = mapModuleRouterList(homePageModules);

// 导入modules非homepage相关固定路由
const otherFixedModules = import.meta.glob('./modules/**/!(homepage).ts', { eager: true });
export const otherFixedRoutes: Array<RouteRecordRaw> = mapModuleRouterList(otherFixedModules);

// 默认路由
const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
  },
];

const allRoutes: RouteRecordRaw[] = [...defaultRoutes, ...homePageRoutes, ...otherFixedRoutes];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: allRoutes,
  scrollBehavior: () => ({
    el: '#app',
    top: 0,
    behavior: 'smooth',
  }),
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
