<template>
  <el-table :data="allUsers" style="width: 100%" v-loading="loadingStatus">
    <el-table-column label="用户名">
      <template #default="{ row }">
        <el-input v-model="row.username" placeholder="请输入用户名"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="密码">
      <template #default="{ row }">
        <el-input
          v-model="row.password"
          placeholder="请输入密码"
          type="password"
          show-password
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column label="角色">
      <template #default="{ row }">
        <el-input v-model="row.role" placeholder="请输入角色"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="余额">
      <template #default="{ row }">
        <el-input v-model="row.balance" placeholder="请输入余额"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button @click="updateUser(row)">更新</el-button>
        <el-button type="danger" @click="deleteUser(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { API_SERVER } from '../config';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const allUsers = ref([]);
const loadingStatus = ref(false);

const getAllUsers = async () => {
  loadingStatus.value = true;
  const res = await fetch(`${API_SERVER}/manage/user/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    allUsers.value = data.allUser;
  } else {
    ElMessage.error(data.message);
  }
  loadingStatus.value = false;
};

const updateUser = async (row) => {
  loadingStatus.value = true;
  const res = await fetch(`${API_SERVER}/manage/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: row.username,
      password: row.password,
      role: row.role,
      balance: parseInt(row.balance),
    }),
  });
  await getAllUsers();
  if (res.status === 200) {
    ElMessage.success('更新成功');
  } else {
    ElMessage.error('更新失败');
  }
  loadingStatus.value = false;
};

const deleteUser = async (row) => {
  loadingStatus.value = true;
  const res = await fetch(`${API_SERVER}/manage/user/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: row.username,
    }),
  });
  await getAllUsers();
  if (res.status === 200) {
    ElMessage.success('删除成功');
  } else {
    ElMessage.error('删除失败');
  }
  loadingStatus.value = false;
};

onMounted(async () => {
  await getAllUsers();
});
</script>
