<script setup>
import { RouterView, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import { API_SERVER } from '../config';

import { ref, onMounted } from 'vue';

const props = defineProps(['username']);
const router = useRouter();

// 查询用户信息
const role = ref('');
const reservations = ref([]);
const activeIndex = ref('reservation'); // 默认选中的菜单

const queryUserInfo = async () => {
  const res = await fetch(`${API_SERVER}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: props.username }),
  });
  const data = await res.json();
  console.log(data);
  if (data.status === 'success') {
    role.value = data.userInfo.role;
    reservations.value = data.userReservation.reservation;
    // username存入localStorage
    localStorage.setItem('username', props.username);
  } else {
    alert('获取用户信息失败');
  }
};

onMounted(async () => {
  queryUserInfo();
  // 默认跳转到预定场馆
  router.push({ name: 'reservation', params: { username: props.username } });
});

const handleSelect = (index) => {
  console.log(index);
  if (index === 'reservation') {
    router.push({ name: 'reservation', params: { username: props.username } });
  } else if (index === 'order') {
    router.push({ name: 'order', params: { username: props.username } });
  }
};

const logout = () => {
  localStorage.removeItem('username');
  router.push({ name: 'login' });
};
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item>体育馆预约系统</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="reservation">预定场馆</el-menu-item>
    <el-menu-item index="order">查看订单</el-menu-item>
    <el-sub-menu index="2">
      <template #title>用户 {{ username }} (身份 {{ role }})</template>
      <el-menu-item @click="logout">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <router-view />
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
