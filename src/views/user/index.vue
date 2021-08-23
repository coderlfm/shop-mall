<template lang="">
  <main class="main-w mx-auto overflow-hidden pt-20">
    <section class="">
      <aside class="user-menus float-left border text-sm text-gray-600 border-gray-200 bg-white text-center">
        <router-link
          :to="item.url"
          :class="[
            'w-full my-4 cursor-pointer hover:text-main block',
            currentItem === item.url ? 'text-main' : 'text-gray-600',
          ]"
          v-for="item in menus"
          :key="item.url"
        >
          {{ item.title }}
        </router-link>
      </aside>
      <main class="user-content-wrap flex-1 float-left">
        <router-view />
      </main>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const localtion = useRoute();
console.log(localtion);

const currentItem = ref(localtion.path);
const menus = [
  { url: '/user/profile', title: '个人中心' },
  { url: '/user/address', title: '地址管理' },
  { url: '/user/order', title: '订单管理' },
];

watch(localtion, () => {
  currentItem.value = localtion.path;
});
</script>
<style lang="less" scoped>
.user-menus {
  width: 178px;
}

.user-content-wrap {
  width: calc(100% - 200px);
  margin-left: 20px;
}
</style>
