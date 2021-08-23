<template lang="">
  <div class="bg-gray-100 overflow-hidden">
    <main class="main-w mx-auto overflow-hidden my-10 p-10 bg-white">
      <div class="flex flex-col text-sm">
        <div class="flex py-3 border-dashed border-b-2 border-fuchsia-600">
          <div class="text-gray-500 w-10 mr-10 pt-1">分类:</div>
          <section class="flex-1 flex text-gray-700">
            <div v-for="item in categories" :key="item.id">
              <div
                :class="[
                  `inline-block cursor-pointer px-3 py-1 mr-10`,
                  currentCategoryId === item.id ? 'text-white bg-main rounded-full' : '',
                ]"
                @click="handleCategoryClick(item.id)"
              >
                {{ item.title }}
              </div>
            </div>
          </section>
        </div>
        <div class="flex py-3 border-dashed border-b-2 border-fuchsia-600">
          <div class="text-gray-500 w-10 mr-10">排序:</div>
          <div>默认</div>
          <div>价格升序</div>
          <div>价格降序</div>
          <div><input type="text" /> - <input type="text" /></div>
        </div>
      </div>
      <section class="grid grid-cols-4 gap-4 mt-10"><ProductItem :products="products.list" /></section>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { ProductItem } from '@/components/context';
import { categoriesApi, getProductsByCategoryIdApi } from '@/service';

const categories = ref<any>([]); // 分类数组
const currentCategoryId = ref<null | number>(null); // 当前选中分类
const products = reactive<{ total: number; page: number; pageSize: number; list: any[] }>({
  total: 0,
  page: 1,
  pageSize: 16,
  list: [],
}); // 商品列表

onMounted(async () => {
  const { code, data } = await categoriesApi();
  if (code) return;
  categories.value = data;
});

watch(currentCategoryId, () => getProductsByCateryId(currentCategoryId.value as number));

// 选择分类
const handleCategoryClick = (categoryId: number) => {
  currentCategoryId.value = categoryId;
};

// 获取分类下的商品
const getProductsByCateryId = async (categoryId: number) => {
  const {
    data: { list, page, pageSize, total },
  } = await getProductsByCategoryIdApi({ categoryId, page: 1, pageSize: 16 });

  products.list = list;
  products.page = page;
  products.pageSize = pageSize;
  products.total = total;
};
</script>
<style lang="less"></style>
