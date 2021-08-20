<template lang="">
  <div class="search-bar-wrap my-10">
    <div class="relative flex items-center w-full lg:w-64 h-full group">
      <SearchIcon class="absolute left-0 z-20 w-4 h-4 ml-4 sm:block" />
      <input
        type="text"
        class="
          block
          w-full
          py-1.5
          pl-10
          pr-4
          leading-normal
          rounded-2xl
          focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500
          ring-opacity-90
          bg-gray-100
          dark:bg-gray-800
          text-gray-400
          aa-input
        "
        placeholder="搜索"
      />
      <div
        class="
          absolute
          cursor-pointer
          right-0
          h-auto
          px-2
          py-1
          mr-2
          text-xs text-white
          border
          bg-yellow-600
          rounded-2xl
          md:block
        "
      >
        搜索
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SearchIcon } from '@heroicons/vue/outline';
</script>
<style lang="less" scoped>
.search-bar-wrap {
  width: 532px;
}
</style>
