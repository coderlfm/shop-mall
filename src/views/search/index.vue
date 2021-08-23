<template lang="">
  <div class="bg-gray-100 overflow-hidden">
    <main class="main-w mx-auto overflow-hidden my-10 px-10 py-5 bg-white">
      <div class="search-filter flex flex-col text-sm">
        <div class="flex py-3">
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
        <!-- <div class="flex py-3">
          <div class="text-gray-500 w-10 mr-10">排序:</div>
          <div>默认</div>
          <div>价格升序</div>
          <div>价格降序</div>
          <div><input type="text" /> - <input type="text" /></div>
        </div> -->
      </div>
      <section class="grid grid-cols-4 gap-4 mt-10"><ProductItem :products="products.list" /></section>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ProductItem } from '@/components/context';
import { categoriesApi, getProductsApi } from '@/service';

const localtion = useRoute();
const categories = ref<any>([]); // 分类数组
const currentCategoryId = ref<null | number>(null); // 当前选中分类
const products = reactive<{ total: number; page: number; pageSize: number; list: any[] }>({
  total: 0,
  page: 1,
  pageSize: 16,
  list: [],
}); // 商品列表

// 获取分类下的商品
const getProductsList = async ({
  categoryId,
  keyword = localtion.query.keyword as string,
}: {
  categoryId?: number;
  keyword?: string;
}) => {
  const {
    data: { list, page, pageSize, total },
  } = await getProductsApi({ categoryId, keyword, page: 1, pageSize: 16 });

  products.list = list;
  products.page = page;
  products.pageSize = pageSize;
  products.total = total;
};

watch(
  localtion,
  () => {
    const { keyword, categoryId } = localtion.query;
    if (keyword) getProductsList({});
    if (categoryId) currentCategoryId.value = Number(categoryId);
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  const { code, data } = await categoriesApi();
  if (code) return;
  categories.value = data;
});

watch(currentCategoryId, () => getProductsList({ categoryId: currentCategoryId.value as number }), {
  immediate: true,
});

// 选择分类
const handleCategoryClick = (categoryId: number) => {
  currentCategoryId.value = categoryId;
};
</script>
<style lang="less" scoped>
.search-filter {
  > div {
    border-bottom: 1px dashed #ccc;
  }
}
</style>
