export {};
declare global {
  interface Window {
    electronAPI?: any; // 全局变量名
  }

  interface Fn<T = any> {
    (...arg: T[]): T;
  }

  type Nullable<T> = T | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type ComponentRef<T> = InstanceType<T>;
}
