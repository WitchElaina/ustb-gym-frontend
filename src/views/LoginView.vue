<template>
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
      <el-button @click="router.push('/register')">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { API_SERVER } from '../config';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
  const data = await res;
  console.log(data);
  if (data.status === 200) {
    alert('登录成功');
    router.push('/user/' + username.value);
  } else {
    alert('登录失败');
  }
};
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 200px auto;
}
</style>
