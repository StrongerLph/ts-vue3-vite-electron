// stores/app.ts
import { defineStore } from "pinia";
import { useCache } from "@/hooks/useCache";

const { wsCache } = useCache();

interface AppState {
  count: number;
}
export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return { count: 0 };
  },
  actions: {
    login() {
      wsCache.set('token', '')
    },
    logout() {
      wsCache.delete('token')
    }
  },
});
