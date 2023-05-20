<script setup>
import { RouterView } from 'vue-router';
import Header from '../components/Header.vue';
import { API_SERVER } from '../config';

import { ref, onMounted } from 'vue';

const props = defineProps(['username']);

// 查询用户信息
const role = ref('');
const reservations = ref([]);

// 从router path中获取用户名

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
  } else {
    alert('获取用户信息失败');
  }
};

onMounted(async () => {
  queryUserInfo();
});
</script>

<template>
  <Header :username="username" :role="role" />
</template>

<style scoped></style>
