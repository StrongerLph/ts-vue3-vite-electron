import { globalShortcut } from "electron";

export const initShortCut = () => {
  // globalShortcut.register('CommandOrControl+X', () => {
  //     console.log('CommandOrControl+X is pressed')
  // })
  globalShortcut.register("g", () => {
    if ((global as any).mainWindow) {
      (global as any).mainWindow.webContents.send("on-shortcut-event", "g");
    }
  });
};
export const unInstallShortCut = () => {
  // 注销快捷键
  globalShortcut.unregister("CommandOrControl+X");
  globalShortcut.unregister("g");
  // 注销所有快捷键
  globalShortcut.unregisterAll();
};
