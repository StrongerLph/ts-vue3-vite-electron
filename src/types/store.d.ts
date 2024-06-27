/* 
  store 声明文件
*/

export interface UserInfo {
  name: string;
  roles: string[];
}

export interface UserState {
  token: string;
  userInfo: UserInfo;
}
