<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="register-container">
    <el-card class="register-card">
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密　码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮　箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div class="register-form-btns">
        <el-button type="primary" @click="submitForm">注　册</el-button>
        <el-button @click="backToLogin">返回登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { UserRegisterType, register } from '@/api/user';
import type { FormInstance, FormRules } from 'element-plus';

const registerFormRef = ref<FormInstance>();

const registerForm = ref<UserRegisterType>({
  username: '',
  password: '',
  email: '',
});

const registerFormRules: FormRules<UserRegisterType> = {
  email: [
    { required: true, message: '请输入邮箱账号', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
};

const submitForm = async () => {
  registerFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    await register(registerForm.value);
  });
};

const backToLogin = () => {
  router.replace('/login');
};
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .register-card {
    width: 400px;

    .register-form-btns {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;

      .el-button {
        width: 100px;
      }

      .el-button:last-child {
        margin-top: 10px;
        margin-left: 0;
      }
    }
  }
}
</style>
