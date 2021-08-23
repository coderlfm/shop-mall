<template lang="">
  <div
    class="
      product-item
      shadow
      bg-white
      rounded-lg
      cursor-pointer
      hover:shadow-xl
      duration-500
      transform
      hover:-translate-y-1
    "
    v-for="item in products"
    :key="item.id"
    @click="handleToDatail(item.id)"
  >
    <img class="rounded-t-lg" :src="item.coverUrl" />
    <div class="p-3">
      <p>{{ item.title }}</p>
      <p class="font-bold">
        <span class="text-red-500 mr-5">￥{{ item.discountPrice }}</span>
        <span class="text-gray-600 line-through text-opacity-50">￥{{ item.marketPrice }}</span>
      </p>
      <p class="text-right text-sm text-gray-500">已售 {{ item.sum }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import router from '@/router';

defineProps<{
  products: any;
}>();

const handleToDatail = (productId: string) => router.push('/detail?id=' + productId);
</script>
<style lang=""></style>
