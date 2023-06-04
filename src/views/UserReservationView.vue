<template>
  <el-timeline class="reservation-timeline">
    <el-timeline-item placement="top" timestamp="选择场馆和日期" style="width: 100%">
      <!-- 预定的form表单,element plus -->
      <el-form class="reservation-form" label-width="80px">
        <el-form-item label="场馆">
          <el-select v-model="room" placeholder="请选择场馆" style="width: 100%">
            <el-option v-for="item in allRooms" :key="item" :label="item" :value="item"></el-option>
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
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRounds">查询</el-button>
        </el-form-item>
      </el-form>
    </el-timeline-item>
    <el-timeline-item placement="top" timestamp="选择场次">
      <el-form class="reservation-form" label-width="80px">
        <el-form-item label="场次">
          <el-select
            v-model="time"
            placeholder="请选择场次"
            @change="price = allPrices[time][role]"
            style="width: 100%"
          >
            <el-option
              v-for="item in allRounds"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-timeline-item>
    <el-timeline-item placement="top" timestamp="确认价格">
      <el-form class="reservation-form" label-width="80px">
        <div class="price">
          <el-label>消费 </el-label>
          <el-label style="font-size: 40px; color: orange">{{ price }}</el-label>
          <el-label>元</el-label>
          <el-button type="primary" @click="reserve" style="margin-left: 10px" color="orange"
            >支付并预定</el-button
          >
        </div>
        <el-form-item> </el-form-item>
      </el-form>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { API_SERVER } from '../config';
import { onMounted, ref } from 'vue';

import { ElMessage, ElMessageBox, ElLoadingService } from 'element-plus';

const room = ref('');
const date = ref('');
const time = ref('');
const price = ref(0);
const allRooms = ref([]);
const allRounds = ref([]);
const allPrices = ref({});

const roleOpenForMap = {
  student: '学生',
  teacher: '教师',
  outsider: '校外',
};

const emit = defineEmits(['updateBalance']);

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

const getRounds = async () => {
  const loading = ElLoadingService();
  const res = await fetch(`${API_SERVER}/round`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room: room.value,
    }),
  });
  const data = await res.json();
  console.log(data);
  allRounds.value = [];
  allPrices.value = {};
  data.rounds.round.map((item) => {
    if (item.date === date.value && item.reserver === 'none') {
      item.openFor.map((roleItem) => {
        console.log(roleItem);
        console.log(roleOpenForMap[role]);
        if (roleItem === roleOpenForMap[role]) {
          allRounds.value.push(`${item.startTime}-${item.endTime}`);
          allPrices.value[`${item.startTime}-${item.endTime}`] = item.price;
        }
      });
    }
  });
  loading.close();
};

const username = localStorage.getItem('username');
const role = localStorage.getItem('role');

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
  const loading = ElLoadingService();
  // 支付 todo
  const payRes = await fetch(`${API_SERVER}/user/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      price: price.value,
    }),
  });
  loading.close();
  const payData = await payRes.json();
  if (payRes.status === 200) {
    ElMessage.success('支付成功');
  } else {
    ElMessage.error('支付失败: ' + payData['msg']);
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
  emit('updateBalance');
  // reset v-model
  room.value = '';
  date.value = '';
  time.value = '';
  allRounds.value = [];

  if (data.status === 'success') {
    ElMessage.success('预定成功');
  } else {
    ElMessage.error('预定失败');
  }
  loading.close();
};

onMounted(async () => {
  await getRooms();
});
</script>

<style scoped>
.reservation-timeline {
  padding: 40px;
  max-width: 500px;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-left: 40px;
}
</style>
