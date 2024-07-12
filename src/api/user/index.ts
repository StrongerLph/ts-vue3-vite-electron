import { request } from '@/utils/request';
import { UserLoginType, UserType, UserMenu, UserRegisterType } from './types';

// 导出所有此模块相关的类型声明以供使用
export type * from './types';

// 用户注册
export function register(data: UserRegisterType) {
  return request.post({
    url: '/auth/register',
    data,
  });
}

export function login(data: UserLoginType) {
  return request.post<UserType>({
    url: '/auth/login',
    data,
  });
}

export function logout() {
  return request.post({
    url: '/auth/logout',
  });
}

export function getUserMenus(): Promise<UserMenu[]> {
  return request.get<UserMenu[]>({
    url: '/auth/menus',
  });
}
