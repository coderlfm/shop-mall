<template lang="">
  <!-- <block > -->
  <section class="mt-10" v-if="category?.products?.length !== 0">
    <h3 class="flex justify-between items-center mb-5">
      <div class="text-xl font-bold text-gray-700">{{ category.title }}</div>
      <div class="flex text-sm text-gray-700 cursor-pointer hover:text-main">
        查看更多 <ArrowCircleRightIcon class="w-5 h-5" />
      </div>
    </h3>
    <div class="grid grid-cols-4 gap-4">
      <div
        class="
          product-item
          bg-white
          rounded-lg
          cursor-pointer
          hover:shadow-xl
          duration-200
          transform
          hover:-translate-y-1
        "
        v-for="item in category.products"
        :key="item.id"
        @click="handleToDatail(item.id)"
      >
        <img class="rounded-t-lg" :src="item.coverUrl" />
        <div class="p-3">
          <p>{{ item.title }}</p>
          <p class="font-bold">
            <span class="text-red-500 mr-5">￥{{ item.marketPrice }}</span>
            <span class="text-gray-600 line-through text-opacity-50">￥{{ item.discountPrice }}</span>
          </p>
          <p class="text-right text-sm text-gray-500">已售 {{ item.sum }}</p>
        </div>
      </div>
    </div>
  </section>
  <!-- </block> -->
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowCircleRightIcon } from '@heroicons/vue/outline';

const history = useRouter();

const props = defineProps<{
  category: { title: string; products: null | any };
}>();

const handleToDatail = (productId: string) => {
  console.log(productId);
  history.push('/detail?id=' + productId);
};
</script>
<style lang="less" scoped>
.product-item {
  img {
    width: 260px;
    height: 260px;
  }
}
</style>
