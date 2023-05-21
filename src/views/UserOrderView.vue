<template>
  <div class="user-order-view">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="room" label="场馆"></el-table-column>
      <el-table-column prop="action" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleClick(scope.row)"
            >取消预约</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { API_SERVER } from '../config';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

const username = localStorage.getItem('username');

const tableData = ref([]);

const handleClick = async (row) => {
  const res = await fetch(`${API_SERVER}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, date: row.date, time: row.time, room: row.room }),
  });
  const data = await res;
  console.log(data);
  if (data.status === 200) {
    ElMessage.success('取消成功');
    await fetchData();
  } else {
    ElMessage.error('取消失败');
  }
};

const fetchData = async () => {
  const res = await fetch(`${API_SERVER}/userorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username }),
  });
  const data = await res.json();
  console.log(data);
  tableData.value = [];
  data.userReservation.reservation.forEach((item) => {
    tableData.value.push({
      date: item.date,
      time: item.time,
      room: item.room,
    });
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.user-order-view {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
