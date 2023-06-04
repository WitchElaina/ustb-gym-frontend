<template>
  <div>
    <!-- 基于element plus的登录界面 -->
    <el-form class="login-form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="router.push({ name: 'register' })">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { API_SERVER } from '../config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
  const res = await fetch(`${API_SERVER}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username.value, password: password.value }),
  });
  if (res.status === 200) {
    router.push('/user/' + username.value);
  } else {
    ElMessage.error('登录失败');
  }
};
</script>

<style scoped>
.login-form {
  /* center */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 60px;
  padding-top: 80px;
  border-radius: 20px;
  border: 2px solid #eee;
  box-shadow: 0 5px 20px -10px rgb(0, 0, 0);
  min-width: 400px;
}
</style>
