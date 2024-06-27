import { request } from '@/utils/request';
import { UserLoginType, UserType } from './types';

export function login(data: UserLoginType) {
  return request.post<UserType>({
    url: '/auth/login',
    data,
  });
}
