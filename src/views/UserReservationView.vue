<template>
  <!-- 预定的form表单,element plus -->
  <el-form class="reservation-form" label-width="80px">
    <el-form-item label="场馆">
      <el-select v-model="room" placeholder="请选择场馆">
        <el-option label="羽毛球馆" value="badminton"></el-option>
        <el-option label="乒乓球馆" value="pingpong"></el-option>
        <el-option label="篮球馆" value="basketball"></el-option>
        <el-option label="足球馆" value="football"></el-option>
      </el-select>
    </el-form-item>
    <!-- 格式为2020-01-01形式 -->
    <el-form-item label="日期">
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        value-format="YYYY-MM-DD"
        :disabledDate="disabledDate"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="场次">
      <el-select v-model="time" placeholder="请选择场次">
        <el-option label="8:00-9:00" value="8:00-9:00"></el-option>
        <el-option label="9:00-10:00" value="9:00-10:00"></el-option>
        <el-option label="10:00-11:00" value="10:00-11:00"></el-option>
        <el-option label="11:00-12:00" value="11:00-12:00"></el-option>
        <el-option label="12:00-13:00" value="12:00-13:00"></el-option>
        <el-option label="13:00-14:00" value="13:00-14:00"></el-option>
        <el-option label="14:00-15:00" value="14:00-15:00"></el-option>
        <el-option label="15:00-16:00" value="15:00-16:00"></el-option>
        <el-option label="16:00-17:00" value="16:00-17:00"></el-option>
        <el-option label="17:00-18:00" value="17:00-18:00"></el-option>
        <el-option label="18:00-19:00" value="18:00-19:00"></el-option>
        <el-option label="19:00-20:00" value="19:00-20:00"></el-option>
        <el-option label="20:00-21:00" value="20:00-21:00"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reserve">预定</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { API_SERVER } from '../config';
import { ref } from 'vue';

import { ElMessage, ElMessageBox } from 'element-plus';

const room = ref('');
const date = ref('');
const time = ref('');

const username = localStorage.getItem('username');

const disabledDate = (time) => {
  const today = new Date();
  return time.getTime() < today.getTime() - 8.64e7;
};

const reserve = async () => {
  // 校验数据
  if (!room.value || !date.value || !time.value) {
    ElMessage.error('请填写完整信息');
    return;
  }

  // 展示所选信息并使用ElMessageBox询问是否继续
  const msg = `场馆：${room.value}，日期：${date.value}，场次：${time.value}`;
  const confirm = await ElMessageBox.confirm(`请确认预定信息：${msg}`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch((err) => {
    console.log(err);
  });
  if (confirm !== 'confirm') {
    return;
  }

  const res = await fetch(`${API_SERVER}/reservation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room: room.value,
      date: date.value,
      time: time.value,
      username: username,
    }),
  });

  const data = await res.json();
  console.log(data);
  if (data.status === 'success') {
    ElMessage.success('预定成功');
  } else {
    ElMessage.error('预定失败');
  }
};
</script>

<style scoped>
.reservation-form {
  margin: 0 auto;
  width: 400px;
  margin-top: 100px;
}
</style>
