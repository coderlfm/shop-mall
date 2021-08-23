<template>
  <main class="main-w mx-auto overflow-hidden">
    <DetailCard :product="product" v-if="product" />
    <DetailContent :product="product" v-if="product" />
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProductDetailByIdApi } from '@/service';
import DetailCard from './detail-card/index.vue';
import DetailContent from './detail-content/index.vue';

const { query } = useRoute();
const product = ref<any>(null);


onMounted(async () => {
  const { data } = await getProductDetailByIdApi(Number(query.id));
  product.value = data;
  // console.log('result :', result);
});
</script>
<style lang="less" scoped></style>
