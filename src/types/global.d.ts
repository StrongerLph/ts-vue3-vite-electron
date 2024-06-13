export {};
declare global {
  interface Window {
    electronAPI?: any; //全局变量名
  }

  interface Fn<T = any> {
    (...arg: T[]): T;
  }

  type Nullable<T> = T | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type Recordable<T = any, K = string> = Record<
    K extends null | undefined ? string : K,
    T
  >;

  type ComponentRef<T> = InstanceType<T>;

  type LocaleType = "zh-CN" | "en";

  type AxiosHeaders =
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data";

  type AxiosMethod =
    | "get"
    | "post"
    | "delete"
    | "put"
    | "GET"
    | "POST"
    | "DELETE"
    | "PUT";

  type AxiosResponseType =
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";

  interface AxiosConfig {
    params?: any;
    data?: any;
    url?: string;
    method?: AxiosMethod;
    headersType?: string;
    responseType?: AxiosResponseType;
  }

  interface IResponse<T = any> {
    code: string;
    data: T extends any ? T : T & any;
  }

  interface PageParam {
    pageSize?: number;
    pageNum?: number;
  }

  interface Tree {
    menuId: number;
    menuName: string;
    children?: Tree[] | any[];
  }
}
