import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// electron
import electron from "vite-plugin-electron";

const root = process.cwd();
function pathResolve(dir: string) {
  return resolve(root, ".", dir);
}

function isDev() {
  return process.env.NODE_ENV === "development";
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 4000,
    proxy: {
      // 选项写法
      "/dev-api": {
        target: "https://xxx/api",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dev-api/, ""),
      },
    },
    hmr: {
      overlay: false,
    },
    host: "0.0.0.0",
  },
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".scss",
      ".css",
    ],
    alias: [
      {
        find: /\@\//,
        replacement: `${pathResolve("src")}/`,
      },
    ],
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      // 输出自动导入函数等的声明
      dts: resolve(__dirname, "src/types/auto-imports.d.ts"),
    }),
    Components({
      // 输出自动注册的组件的声明
      dts: resolve(__dirname, "src/types/components.d.ts"),
      resolvers: [
        // 自动注册 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件 使用icon-ep-[iconName]
        IconsResolver({
          prefix: "icon",
          enabledCollections: ["ep"], // ep -> element-plus icon
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    electron([
      {
        entry: "src/electron/main.ts", // 主进程文件
        vite: { build: { outDir: "dist-electron" } },
      },
      {
        entry: "src/electron/modules/preload/index.ts", // preload
        vite: { build: { outDir: "dist-electron/modules/preload" } }, // 输出目录
      },
    ]),
  ],
});
