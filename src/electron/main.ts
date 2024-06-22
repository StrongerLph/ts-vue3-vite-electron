// main.js

// Modules to control application life and create native browser window
import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";

import { initShortCut, unInstallShortCut } from "./shortcut/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "/modules/preload/index.js"),
    },
  });

  if (app.isPackaged) {
    // 加载 index.html
    mainWindow.loadFile("index.html");
  } else {
    mainWindow.loadURL("http://localhost:4000");
    // 打开开发工具
    // mainWindow.webContents.openDevTools()
  }
};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // 初始化快捷键
  initShortCut();
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 客户端聚焦
app.on("browser-window-focus", () => {
  // 初始化快捷键
  initShortCut();
  console.log("browser-window-focus");
});

// 客户端失去焦点
app.on("browser-window-blur", () => {
  // 初始化快捷键
  unInstallShortCut();
  console.log("browser-window-blur");
});

app.on("will-quit", () => {
  // 注销快捷键
  unInstallShortCut();
});
