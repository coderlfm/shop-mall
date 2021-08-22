<template lang="">
  <div class="detail-card mt-10 flex">
    <img :src="product.coverUrl" />
    <section class="flex-1 ml-10 p-5 bg-white">
      <h3 class="text-lg font-bold">{{ product.title }}</h3>
      <div class="bg-yellow-100 p-3 my-3 text-sm text-gray-600">
        <p>
          <span>价格</span> <span class="text-lg text-red-500 font-bold mr-3">￥{{ product.discountPrice }}</span>
          <span class="text-gray-600 line-through text-opacity-50">￥{{ product.marketPrice }}</span>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-10 text-white text-center">
        <button
          type="button"
          class="
            py-2
            px-4
            flex
            justify-center
            bg-white
            text-main
            border border-yellow-500
            hover:bg-yellow-50
            transition
            ease-in
            duration-200
            font-semibold
            shadow-md
            rounded-lg
          "
        >
          立即购买
        </button>
        <button
          type="button"
          class="
            py-2
            px-4
            bg-main
            hover:bg-yellow-600
            transition
            ease-in
            duration-200
            font-semibold
            shadow-md
            rounded-lg
          "
          @click="handleAddCart"
        >
          加入购物车
        </button>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { useMessage } from 'naive-ui';
import { addCardByIdApi } from '@/service';
const props = defineProps<{
  product: { [name: string]: string };
}>();

const message = useMessage();

const handleAddCart = async () => {
  const { code, msg } = await addCardByIdApi({ productId: props.product.id as any });
  if (code) return message.warning(msg);
  message.success('加入购物车成功');
};
</script>
<style lang="less" scoped>
.detail-card {
  img {
    width: 428px;
    height: 428px;
  }
}
</style>
