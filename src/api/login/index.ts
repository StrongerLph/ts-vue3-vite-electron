import request from "../index";
import type { UserType } from "./type";
export const loginApi = (
  data: Partial<UserType>
): Promise<IResponse<UserType>> => {
  return request.post({ url: "/auth/manage/login/pwd", data });
};
