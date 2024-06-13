import { service } from "./service";

const request = (option: any) => {
  const { url, method, params, data, headersType, responseType } = option;
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      "Content-Type": headersType,
    },
  });
};
export default {
  get: <T = any>(option: any) => {
    return request({ method: "get", ...option }) as unknown as T;
  },
  post: <T = any>(option: any) => {
    return request({ method: "post", ...option }) as unknown as T;
  },
  delete: <T = any>(option: any) => {
    return request({ method: "delete", ...option }) as unknown as T;
  },
  put: <T = any>(option: any) => {
    return request({ method: "put", ...option }) as unknown as T;
  },
};
