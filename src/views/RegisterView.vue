<template>
  <div>
    <!-- <el-image
      src="https://gym.ustb.edu.cn/images/content/2022-04/20220420091714719859.jpg"
      class="background-img"
      fit="cover"
    ></el-image> -->
    <!-- 基于element plus的注册界面 -->
    <el-form class="register-form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          type="password"
          show-password
          style="width: 100%"
        ></el-input>
      </el-form-item>
      <!-- 选择role -->
      <el-form-item label="角色">
        <el-select v-model="role" placeholder="请选择角色" style="width: 100%">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="学生" value="student"></el-option>
          <el-option label="教工" value="teacher"></el-option>
          <el-option label="校外" value="outsider"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="router.push({ name: 'login' })">返回登录</el-button>
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
const role = ref('');

const register = async () => {
  // 校验数据
  if (!username.value || !password.value || !role.value) {
    ElMessage.error('请填写完整信息');
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
    ElMessage.success('注册成功');
  } else {
    ElMessage.error('注册失败');
  }
};
</script>

<style scoped>
.background-img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  filter: blur(20px);
  background: none;
  transform: scale(1.1);
}

.register-form {
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
}
</style>
