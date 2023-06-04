<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
