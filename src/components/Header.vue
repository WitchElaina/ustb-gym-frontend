<template>
  <!-- 展示用户信息的Header,包含用户名 角色 -->
  <el-header class="header">
    <el-row>
      <el-col :span="12">
        <span class="header-title">体育馆预约系统</span>
      </el-col>
      <el-col :span="12">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ username }}({{ role }})<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup>
defineProps({
  username: String,
  role: String,
});
</script>
