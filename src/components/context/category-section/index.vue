<template lang="">
  <!-- <block > -->
  <section class="mt-10" v-if="category?.products?.length !== 0">
    <h3 class="flex justify-between items-center mb-5">
      <div class="text-xl font-bold text-gray-700">{{ category.title }}</div>
      <div class="flex text-sm text-gray-700 cursor-pointer hover:text-main">
        查看更多 <ArrowCircleRightIcon class="w-5 h-5" />
      </div>
    </h3>
    <div class="grid grid-cols-4 gap-4"><ProductItem :products="category.products" /></div>
  </section>
  <!-- </block> -->
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { ArrowCircleRightIcon } from '@heroicons/vue/outline';
import ProductItem from '../product-item/index.vue';

const props = defineProps<{
  category: { title: string; products: null | any };
}>();
</script>
<style lang="less" scoped>
.product-item {
  img {
    width: 260px;
    height: 260px;
  }
}
</style>
