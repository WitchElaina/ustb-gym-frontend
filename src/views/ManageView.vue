<template>
  <div class="wrapper">
    <!-- 添加room -->
    <h3 class="item-title">添加场馆</h3>
    <el-form label-width="80px" style="width: 60%; max-width: 400px">
      <el-form-item label="场馆名称">
        <el-input v-model="roomAdd" placeholder="请输入场馆名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRoom">添加</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <!-- 删除room -->
    <h3 class="item-title">删除场馆</h3>
    <el-form label-width="80px" style="width: 60%; max-width: 400px">
      <el-form-item label="场馆名称">
        <el-select v-model="roomDelete" placeholder="请选择场馆名称" style="width: 100%">
          <el-option v-for="item in allRooms" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="deleteRoom">删除</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <!-- 添加场地 -->
    <h3 class="item-title">添加场次</h3>
    <el-form label-width="80px" style="width: 60%; max-width: 400px">
      <el-form-item label="选择场馆">
        <el-select v-model="room" placeholder="请选择场馆名称" style="width: 100%">
          <el-option v-for="item in allRooms" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-time-select
          v-model="startTime"
          start="08:00"
          end="22:00"
          step="00:30"
          placeholder="开始时间"
          style="width: 100%"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-time-select
          v-model="endTime"
          start="08:00"
          end="22:00"
          step="00:30"
          placeholder="结束时间"
          style="width: 100%"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="开放对象">
        <!-- 多选 -->
        <el-checkbox-group v-model="openFor">
          <el-checkbox label="学生"> </el-checkbox>
          <el-checkbox label="教工"></el-checkbox>
          <el-checkbox label="校外"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="学生价" v-if="openFor.includes('学生')">
        <el-input v-model="studentPrice" placeholder="请输入学生价"></el-input>
      </el-form-item>
      <el-form-item label="教工价" v-if="openFor.includes('教工')">
        <el-input v-model="teacherPrice" placeholder="请输入教工价"></el-input>
      </el-form-item>
      <el-form-item label="校外价" v-if="openFor.includes('校外')">
        <el-input v-model="outsiderPrice" placeholder="请输入校外价"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRound">添加</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <!-- 删除场地 -->
    <h3 class="item-title">删除场次</h3>
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
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="danger" @click="deleteRound(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { API_SERVER } from '../config';
import { onMounted, ref } from 'vue';
import { ElMessage, ElLoadingService } from 'element-plus';

const room = ref('');
const roomAdd = ref('');
const roomDelete = ref('');
const date = ref('');
const startTime = ref('');
const endTime = ref('');
const openFor = ref([]);
const studentPrice = ref('');
const teacherPrice = ref('');
const outsiderPrice = ref('');

const allRooms = ref([]);
const rounds = ref([]);

const getRooms = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  allRooms.value = data.rooms;
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

const addRoom = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/room/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room: roomAdd.value,
    }),
  });
  console.log(res);
  if (res.status === 200) {
    ElMessage.success('添加成功');
    await getRooms();
  } else {
    ElMessage.error('添加失败');
  }
  roomAdd.value = '';
  loading.close();
};

const deleteRoom = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/room/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room: roomDelete.value,
    }),
  });
  if (res.status === 200) {
    ElMessage.success('删除成功');
    await getRooms();
  } else {
    ElMessage.error('删除失败');
  }
  roomDelete.value = '';
  loading.close();
};

const addRound = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/round/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room: room.value,
      date: date.value,
      startTime: startTime.value,
      endTime: endTime.value,
      openFor: openFor.value,
      price: {
        student: studentPrice.value,
        teacher: teacherPrice.value,
        outsider: outsiderPrice.value,
      },
      reserver: 'none',
    }),
  });
  if (res.status === 200) {
    ElMessage.success('添加成功');
    await getRounds();
  } else {
    ElMessage.error('添加失败');
  }
  room.value = '';
  date.value = '';
  startTime.value = '';
  endTime.value = '';
  openFor.value = [];
  studentPrice.value = '';
  teacherPrice.value = '';
  outsiderPrice.value = '';
  loading.close();
};

const deleteRound = async (row) => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/round/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room: row.room,
      date: row.date,
      startTime: row.startTime,
      endTime: row.endTime,
    }),
  });
  if (res.status === 200) {
    ElMessage.success('删除成功');
    await getRounds();
  } else {
    ElMessage.error('删除失败');
  }
  loading.close();
};

onMounted(async () => {
  await getRooms();
  await getRounds();
});
</script>

<style scoped>
.wrapper {
  margin: 30px;
}

.item-title {
  margin: 20px 10px;
}
</style>
