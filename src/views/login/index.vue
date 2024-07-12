<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密　码" prop="password">
          <el-input type="password" v-model="loginForm.password" @keyup.enter="submitForm"></el-input>
        </el-form-item>
      </el-form>

      <div class="login-form-btns">
        <el-button class="login" type="primary" @click="submitForm">登录</el-button>
        <el-button class="register" type="text" size="small" @click="goRegister">没有账号？去注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import type { FormInstance, FormRules } from 'element-plus';
import type { UserLoginType } from '@/api/user';

// 表单引用
const loginFormRef = ref<FormInstance>();
// 表单数据
const loginForm = ref<UserLoginType>({
  username: '',
  password: '',
});

// 表单验证规则
const loginRules: FormRules<UserLoginType> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
};

const submitForm = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      // 表单验证通过，执行登录逻辑
      console.log('登录信息:', loginForm.value);
      // 这里可以添加登录的业务逻辑，如调用 API
    } else {
      console.error('表单验证失败');
    }
  });
};

const goRegister = () => {
  router.replace({ path: '/register' });
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
}

.login-form-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .login {
    margin-bottom: 20px;
  }

  .register {
    margin: 0;
    padding: 0;
  }
}
</style>
