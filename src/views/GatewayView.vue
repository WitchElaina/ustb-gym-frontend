<template>
  <div>
    <el-image
      src="https://gym.ustb.edu.cn/images/content/2022-04/20220420091714719859.jpg"
      class="background-img"
      fit="cover"
    ></el-image>
    <router-view v-slot="{ Component, route }" class="router-view">
      <transition
        :enter-active-class="route.meta.enterClass"
        :leave-active-class="route.meta.leaveClass"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>

<style scoped>
.router-view {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.background-img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  filter: blur(20px);
  background: none;
  transform: scale(1.1);
}

.animate__animated {
  animation-duration: 0.8s;
  animation-fill-mode: both;
}
</style>
