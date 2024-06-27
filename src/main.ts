import { createApp } from 'vue';
// 引入全局样式
import './styles/index.scss';

// 引入全局状态管理pinia
import { setupStore } from '@/store';

// 引入vue路由
import { setupRouter } from '@/router';

import App from './App.vue';

const bootstrap = () => {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  app.mount('#app');
};
bootstrap();
