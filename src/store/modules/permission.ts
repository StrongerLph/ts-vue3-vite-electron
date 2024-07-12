import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { getUserMenus, UserMenu } from '@/api/user';
import router, { homePageRoutes, otherFixedRoutes } from '@/router';
import { store } from '@/store';
import { transformMenuToRoute } from '@/utils/route';

// 导入异步路由组件模块
const asyncRouteComponentModules: Record<string, () => Promise<Recordable>> = import.meta.glob('../../views/**/*.vue');

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login', '/register'], // 路由白名单
    routers: [] as RouteRecordRaw[], // 路由列表
    removeRoutes: [] as RouteRecordRaw[], // 移除的路由
    asyncRoutes: [] as RouteRecordRaw[], // 异步路由
  }),
  actions: {
    /**
     * 初始化路由配置的异步函数
     */
    async initRoutes() {
      const accessedRouters = this.asyncRoutes;

      // 在菜单展示全部路由
      this.routers = [...homePageRoutes, ...accessedRouters, ...otherFixedRoutes];
      // 在菜单只展示动态路由和首页
      // this.routers = [...homepageRouterList, ...accessedRouters];
      // 在菜单只展示动态路由
      // this.routers = [...accessedRouters];
    },

    /**
     * 构建异步路由的函数
     */
    async buildAsyncRoutes() {
      try {
        // 发起菜单权限请求 获取菜单列表
        const asyncMenus: Array<UserMenu> = await getUserMenus();
        this.asyncRoutes = transformMenuToRoute(asyncMenus, asyncRouteComponentModules);
        await this.initRoutes();
        return this.asyncRoutes;
      } catch (error) {
        throw new Error("Can't build routes");
      }
    },

    /**
     * 恢复原始路由配置的异步函数
     */
    async restoreRoutes() {
      this.asyncRoutes.forEach((item: RouteRecordRaw) => {
        if (item.name) {
          router.removeRoute(item.name);
        }
      });
      this.asyncRoutes = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
