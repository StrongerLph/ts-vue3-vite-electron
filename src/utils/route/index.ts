/*
 * 路由处理工具
 */
import { uniq } from 'lodash';
import { RouteRecordRaw } from 'vue-router';
import { UserMenu } from '@/api/user';
import { EXCEPTION_COMPONENT } from './constant';

/**
 * 将模块对象映射为路由记录列表
 * @param modules - 要映射的模块对象。
 * @returns 一个由模块默认导出组成的路由记录列表。
 */
export function mapModuleRouterList(modules: Record<string, any>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routerList.push(...modList);
  });
  return routerList;
}

export function transformMenuToRoute(
  menus: Array<UserMenu>,
  asyncRouteModules: Record<string, () => Promise<Recordable>>,
): Array<RouteRecordRaw> {
  const routes: RouteRecordRaw[] = [];
  menus.forEach(async (menu) => {
    let route: RouteRecordRaw;
    if (menu.path && menu.componentPath) {
      route = {
        path: menu.path,
        name: menu.name,
        component: dynamicImport(asyncRouteModules, menu.componentPath),
        meta: {
          title: menu.name,
          icon: menu.icon,
          orderNo: menu.orderNo,
          hidden: menu.hidden,
          parentId: menu.parentId,
        },
        children: [],
      };

      routes.push(route);
    } else {
      throw new Error('menu must have a route path and component path');
    }
  });
  return routes;
}

/**
 * 从预定义的对象中动态导入相应的模块
 */
function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    throw new Error(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
  } else {
    console.warn(`Can't find ${component} in pages folder`);
  }
  return EXCEPTION_COMPONENT;
}

/**
 * 获取展开的路由路径数组
 * @param routes - 要检查的路由记录数组
 * @returns 一个字符串数组，包含所有展开的路由路径
 */
export function getRoutesExpanded(routes: Array<RouteRecordRaw>): Array<string> {
  const expandedRoutes: Array<string> = [];

  routes.forEach((item) => {
    if (item.meta && item.meta.expanded) {
      expandedRoutes.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      item.children
        .filter((child) => child.meta && child.meta.expanded)
        .forEach((child: RouteRecordRaw) => {
          expandedRoutes.push(item.path);
          expandedRoutes.push(`${item.path}/${child.path}`);
        });
    }
  });
  return uniq(expandedRoutes);
}
