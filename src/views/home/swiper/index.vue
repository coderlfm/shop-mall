<template lang="">
  <div class="mt-10">
    <Swiper :banner-list="bannerList" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Swiper } from '@/components/common';
import { bannerApi } from '@/service/home/index';

const bannerList = ref<any>([]); // banner 列表

onMounted(async () => {
  const result = await bannerApi();
  bannerList.value = result.data;
});
</script>
<style lang=""></style>
