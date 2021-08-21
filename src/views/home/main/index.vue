<template lang="">
  <CategorySection :category="item" v-for="item in categories" :key="item.id" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { CategorySection } from '@/components/context';
import { categoriesApi, getProductsByCateryIdApi } from '@/service/home';

const categories = ref<any>([]);

/**
 * 获取分类商品
 */
const getProductsByCateryId = async (categoryId: number) => {
  const {
    data: { list },
  } = await getProductsByCateryIdApi({ categoryId, page: 1, pageSize: 8 });
  const category = categories.value.find((item: any) => item.id === categoryId);
  category.products = list;
};

onMounted(async () => {
  const { code, data } = await categoriesApi();
  if (code) return;
  categories.value = data;
  data.forEach((item: any) => getProductsByCateryId(item.id));
});
</script>
<style lang="less" scoped></style>
