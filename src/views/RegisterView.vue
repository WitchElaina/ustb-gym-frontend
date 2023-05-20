<template>
  <!-- 基于element plus的注册界面 -->
  <el-form class="register-form" label-width="80px">
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
    <!-- 选择role -->
    <el-form-item label="角色">
      <el-select v-model="role" placeholder="请选择角色">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="普通用户" value="user"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">注册</el-button>
      <el-button @click="router.push('/login')">返回登录</el-button>
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
const role = ref('');

const register = async () => {
  // 校验数据
  if (!username.value || !password.value || !role.value) {
    alert('请填写完整信息');
    return;
  }
  const res = await fetch(`${API_SERVER}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username.value, password: password.value, role: role.value }),
  });
  const data = await res;
  console.log(data);
  if (data.status === 200) {
    alert('注册成功');
  } else {
    alert('注册失败');
  }
};
</script>

<style scoped>
.register-form {
  width: 400px;
  margin: 200px auto;
}
</style>
