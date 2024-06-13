import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from "axios";

import qs from "qs";

import { ElMessage } from "element-plus";

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEPATH, // api 的 base_url
  timeout: 60000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    (config.headers as AxiosRequestHeaders)["Token"] = "test test";
    if (
      config.method === "post" &&
      (config.headers as AxiosRequestHeaders)["Content-Type"] ===
        "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }
    // get参数编码
    if (config.method === "get" && config.params) {
      let url = config.url as string;
      url += "?";
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === "blob") {
      // 如果是文件流，直接过
      return response;
    } else if (response.data.code === 200) {
      return response.data;
    } else {
      ElMessage.error(response.data.message);
    }
  },
  (error: AxiosError) => {
    console.log("err" + error); // for debug
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export { service };
