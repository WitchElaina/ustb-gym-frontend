<template>
  <h3>添加CDKEY</h3>
  <el-form label-width="80px">
    <el-form-item label="CDKEY">
      <el-input v-model="cdkeyAdd" placeholder="请输入cdkey"></el-input>
    </el-form-item>
    <el-form-item label="金额">
      <el-input v-model="cdkeyAddBalance" placeholder="请输入金额"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addCDKey">添加</el-button>
    </el-form-item>
  </el-form>

  <el-divider></el-divider>

  <h3>删除CDKEY</h3>
  <el-table :data="cdkeyList" style="width: 100%">
    <el-table-column prop="cdkey" label="CDKEY"></el-table-column>
    <el-table-column prop="balance" label="金额"></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="danger" @click="deleteCDKey(row.cdkey)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { API_SERVER } from '../config';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const cdkeyAdd = ref('');
const cdkeyAddBalance = ref('');
const cdkeyList = ref([]);

const addCDKey = async () => {
  const res = await fetch(`${API_SERVER}/cdkey/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cdkey: cdkeyAdd.value,
      balance: parseInt(cdkeyAddBalance.value),
    }),
  });
  if (res.status === 200) {
    ElMessage.success('添加成功');
    cdkeyAdd.value = '';
    cdkeyAddBalance.value = '';
    await getAllCDKeys();
  } else {
    ElMessage.error('添加失败');
  }
};

const deleteCDKey = async (cdkey) => {
  const res = await fetch(`${API_SERVER}/cdkey/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cdkey,
    }),
  });
  if (res.status === 200) {
    ElMessage.success('删除成功');
    await getAllCDKeys();
  } else {
    ElMessage.error('删除失败');
  }
};

const getAllCDKeys = async () => {
  const res = await fetch(`${API_SERVER}/cdkey/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  console.log(data);
  cdkeyList.value = data.cdkeys;
};

onMounted(async () => {
  await getAllCDKeys();
});
</script>
