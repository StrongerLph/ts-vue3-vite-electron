// stores/app.ts
import { defineStore } from 'pinia';
import { useCache } from '@/hooks/useCache';
import { UserState } from '@/types/store';

const { wsCache } = useCache();

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: {
      name: '',
      roles: [],
    },
  }),
  actions: {
    login() {
      wsCache.set('token', '');
    },
    logout() {
      wsCache.delete('token');
    },
  },
});
