<template>
  <template v-if="localtion.path !== '/login'">
    <Header />
    <div class="main-content">
      <main class="main-w mx-auto overflow-hidden">
        <router-view />
      </main>
    </div>
  </template>
  <router-view />
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Header from '@/components/context/header/index.vue';

const localtion = useRoute();
console.log('localtion:', localtion);
</script>
<style lang="less" scoped>
.main-content {
  background-color: #f5f5f5;
}
</style>
