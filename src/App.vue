<template>
  <Header />
  <div class="main-content">
    <main class="main-w mx-auto">
      <router-view />
    </main>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/context/header/index.vue';
</script>
<style lang="less" scoped>
.main-content {
  background-color: #f5f5f5;
}
</style>
