<template>
  <div class="loading" v-loading="loadingStatus">
    <div v-for="room in allRooms" class="dashboard-wrapper">
      <div class="room-title">
        {{ room.name }}
      </div>
      <el-row class="statistic">
        <el-col :span="8">
          <el-statistic title="总场次" :value="room.total"></el-statistic>
        </el-col>
        <el-col :span="8">
          <el-statistic title="空闲场次" :value="room.free"></el-statistic>
        </el-col>
        <el-col :span="8">
          <el-statistic title="已预约场次" :value="room.reserved"></el-statistic>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { API_SERVER } from '../config';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const allRooms = ref([]);
const loadingStatus = ref(false);

const getInfo = async () => {
  loadingStatus.value = true;
  const res = await fetch(`${API_SERVER}/roomrounds`, {
    method: 'POST',
  });
  const data = await res.json();
  console.log(data);
  if (res.status === 200) {
    data.roomrounds.forEach((roomround) => {
      // cal total, free, reserved
      const total = roomround['round'].length;
      const free = roomround['round'].filter((round) => round['reserver'] === 'none').length;
      const reserved = total - free;

      allRooms.value.push({
        name: roomround['room'],
        total,
        free,
        reserved,
      });
    });
    console.log(allRooms.value);
  } else {
    ElMessage.error('获取场次信息失败');
  }
  loadingStatus.value = false;
};

onMounted(async () => {
  await getInfo();
});
</script>

<style scoped>
.room-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.statistic {
  text-align: left;
}

.dashboard-wrapper {
  margin: 40px;
  width: 600px;
}

.loading {
  margin-top: 60px;
}
</style>
