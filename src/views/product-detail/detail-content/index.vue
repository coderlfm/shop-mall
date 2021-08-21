<template lang="">
  <div class="detail-content-wrap mt-10 flex bg-white">
    <section>
      <img v-for="item in product.images" :src="item.url" :key="item.id" />
    </section>
    <aside class="flex-1 ml-10">
      <div class="border border-gray-300">
        <div class="w-full bg-gray-200 py-2 text-center font-bold">推荐商品</div>
      </div>
    </aside>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
  product: { [name: string]: any };
}>();
</script>
<style lang="less" scoped>
.detail-content-wrap {
  > section {
    width: 750px;
  }
}
</style>
