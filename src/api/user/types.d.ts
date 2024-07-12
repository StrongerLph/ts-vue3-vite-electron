export type UserRegisterType = {
  email: string;
  username: string;
  password: string;
};

export type UserLoginType = {
  username: string;
  password: string;
};

export type UserType = {
  username: string;
  password: string;
  role: string;
  roleId: string;
  permissions: string | string[];
};

export type UserMenu = {
  name: string;
  path: string;
  icon: string;
  parentId: string;
  orderNo: number;
  componentPath: string;
  hidden: boolean;
};
