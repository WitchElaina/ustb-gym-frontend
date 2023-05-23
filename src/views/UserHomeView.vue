<script setup>
import { RouterView, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import { API_SERVER } from '../config';
import { ElLoadingService } from 'element-plus';

import { ref, onMounted } from 'vue';

const props = defineProps(['username']);
const router = useRouter();

// 查询用户信息
const role = ref('');
const reservations = ref([]);
const balance = ref(0);
const activeIndex = ref('reservation'); // 默认选中的菜单

const rechargeDialogVisible = ref(false);
const rechargeCDKey = ref('');

const rechargeConfirm = async () => {
  const res = await fetch(`${API_SERVER}/user/recharge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: props.username, cdkey: rechargeCDKey.value }),
  });
  const data = await res.json();
  if (data.status === 'success') {
    alert('充值成功');
    rechargeDialogVisible.value = false;
    await queryUserInfo();
  } else {
    alert('充值失败');
  }
};

const queryUserInfo = async () => {
  console.log('uname', props.username);
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
    balance.value = data.userInfo.balance;
    // 存入localStorage
    localStorage.setItem('username', props.username);
    localStorage.setItem('role', role.value);
  } else {
    alert('获取用户信息失败');
  }
};

onMounted(async () => {
  // loading
  const loading = ElLoadingService();
  await queryUserInfo();
  loading.close();
  // 默认跳转到预定场馆
  router.push({ name: 'reservation', params: { username: props.username } });
});

const handleSelect = (index) => {
  router.push({ name: index, params: { username: props.username } });
};

const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('role');
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
    style="height: 60px; line-height: 60px"
  >
    <!-- <el-menu-item class="logo">
      <el-image
        src="https://upload.wikimedia.org/wikipedia/en/f/f8/Logo_University_of_Science_and_Technology_Beijing.png"
        fit="scale-down"
        style="height: 60px; width: 60px"
      />
    </el-menu-item> -->
    <el-menu-item style="font-size: 20px; font-weight: bold">体育馆预约系统</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="reservation">预定场馆</el-menu-item>
    <el-menu-item index="order">查看订单</el-menu-item>
    <el-menu-item index="manage" v-if="role === 'admin'">场馆管理</el-menu-item>
    <el-menu-item index="cdkey" v-if="role === 'admin'">CDKey管理</el-menu-item>
    <el-sub-menu index="2">
      <template #title>用户 {{ username }} (身份 {{ role }})</template>
      <el-menu-item @click="rechargeDialogVisible = true">
        余额: {{ balance }}元 (点击充值)
      </el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <router-view />

  <!-- 充值对话框 -->
  <el-dialog title="充值" v-model="rechargeDialogVisible">
    <el-form label-width="80px">
      <el-form-item label="CDKEY">
        <el-input v-model="rechargeCDKey" placeholder="请输入CDKEY"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="rechargeConfirm">确认充值</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
