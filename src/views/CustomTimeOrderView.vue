<template>
  <div class="wrapper">
    <div class="filter">
      <el-form :inline="true" :model="filter">
        <el-form-item label="场馆名称">
          <el-select v-model="filterRoom" placeholder="请选择场馆">
            <el-option v-for="item in allRooms" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="filterFromDate"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="filterEndDate"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterRounds">生成报表</el-button>
          <el-button @click="getRounds">查询全部报表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="rounds" style="width: 100%">
      <el-table-column prop="room" label="场馆名称"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="openFor" label="开放对象"></el-table-column>
      <el-table-column prop="studentPrice" label="学生价"></el-table-column>
      <el-table-column prop="teacherPrice" label="教工价"></el-table-column>
      <el-table-column prop="outsiderPrice" label="校外价"></el-table-column>
      <el-table-column prop="reserver" label="预约者"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { API_SERVER } from '../config';
import { onMounted, ref } from 'vue';
import { ElMessage, ElLoadingService } from 'element-plus';

const allRooms = ref([]);
const rounds = ref([]);

const filterRoom = ref('');
const filterFromDate = ref('');
const filterEndDate = ref('');

const getRooms = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  allRooms.value = data.rooms;
  loading.close();
};

const filterRounds = () => {
  if (!filterRoom.value) {
    ElMessage.error('请选择场馆');
    return;
  }
  if (!filterFromDate.value) {
    ElMessage.error('请选择开始日期');
    return;
  }
  if (!filterEndDate.value) {
    ElMessage.error('请选择结束日期');
    return;
  }
  const loading = ElLoadingService();
  const roundsFilted = [];
  rounds.value.map((round) => {
    if (round.room === filterRoom.value) {
      if (
        new Date(round.date) >= new Date(filterFromDate.value) &&
        new Date(round.date) <= new Date(filterEndDate.value)
      ) {
        roundsFilted.push(round);
      }
    }
  });
  rounds.value = roundsFilted;
  loading.close();
};

const getRounds = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/round/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  console.log(data);
  rounds.value = [];
  data.rounds.map((round) => {
    rounds.value.push({
      room: round.room,
      date: round.date,
      startTime: round.startTime,
      endTime: round.endTime,
      openFor: round.openFor,
      studentPrice: round.price.student,
      teacherPrice: round.price.teacher,
      outsiderPrice: round.price.outsider,
      reserver: round.reserver,
    });
  });
  loading.close();
};

onMounted(async () => {
  await getRooms();
  await getRounds();
});
</script>

<style scoped>
.wrapper {
  margin: 40px;
}
</style>
