<template lang="">
  <div class="main-w mx-auto flex justify-between mt-10">
    <router-link to="/">
      <div class="search-logo">
        <img src="@/assets/images/logo.png" />
      </div>
    </router-link>
    <div class="search-bar-wrap">
      <div class="relative flex items-center w-full h-full group">
        <SearchIcon class="absolute left-0 z-20 w-4 h-4 ml-4 sm:block" />
        <input
          v-model="searchVal"
          type="text"
          class="
            block
            w-full
            py-1.5
            pl-10
            pr-4
            leading-relaxed
            rounded-2xl
            focus:border-transparent focus:outline-none focus:ring-1 focus:ring-yellow-500
            ring-opacity-90
            bg-gray-100
            dark:bg-gray-800
            text-gray-400
          "
          placeholder="搜索"
          @keyup.enter="handleSearch"
        />
        <div
          class="absolute cursor-pointer right-0 h-auto px-2 py-1 mr-2 text-xs text-white bg-yellow-600 rounded-2xl"
          @click="handleSearch"
        >
          搜索
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

import { SearchIcon } from '@heroicons/vue/outline';
import router from '@/router';

const localtion = useRoute();
const message = useMessage();

const searchVal = ref<string>(''); // 搜索框内容

watch(
  localtion,
  () => {
    if (localtion.path !== '/search') {
      return (searchVal.value = '');
    }

    const { keyword } = localtion.query;
    if (keyword) searchVal.value = keyword as string;
  },
  {
    immediate: true,
  },
);

const handleSearch = () => {
  if (!searchVal.value) return message.warning('请输入内容后再进行搜索');
  router.push('/search?keyword=' + searchVal.value);
};
</script>
<style lang="less" scoped>
.search-bar-wrap {
  width: 532px;
}
.search-logo {
  height: 60px;
  width: 212px;
  img {
    height: 100%;
  }
}
</style>
