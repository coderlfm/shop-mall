<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <router-view v-if="localtion.path === '/login'" />
        <template v-else>
          <Header />
          <div class="main-content">
            <!-- <main class="main-w mx-auto overflow-hidden"> -->
            <router-view />
            <!-- </main> -->
          </div>
        </template>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { setupStore } from '@/store';
import { useRoute } from 'vue-router';
import { themeOverrides } from '@/common/naive';
import Header from '@/components/context/header/index.vue';

const localtion = useRoute();
setupStore();
</script>
<style lang="less" scoped>
.main-content {
  // background-color: #f5f5f5;
}
</style>
