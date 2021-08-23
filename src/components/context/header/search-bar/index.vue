<template lang="">
  <div class="main-w mx-auto flex justify-between mt-10">
    <div class="search-logo"></div>
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
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { SearchIcon } from '@heroicons/vue/outline';
import router from '@/router';

const message = useMessage();
const searchVal = ref(''); // 搜索框内容

const handleSearch = () => {
  if (!searchVal.value) return message.warning('请输入内容后再进行搜索');
  router.push('/search?search=' + searchVal.value);
};
</script>
<style lang="less" scoped>
.search-bar-wrap {
  width: 532px;
}
.search-logo {
  background-position: 0 -298px;
  height: 60px;
  width: 212px;
  background-image: url(../../../../assets/images/icons.webp);
  background-size: 100%;
  // background: url(../../../assets/images/login-bg.png) 0px 0px no-repeat;
}
</style>
