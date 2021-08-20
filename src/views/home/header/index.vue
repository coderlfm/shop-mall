<template lang="">
  <div>
    <Header />
    <SearchBar />
    <Swiper />
  </div>
</template>
<script lang="ts" setup>
import { Header } from '@/components/context';
import SearchBar from './search-bar/index.vue';
import Swiper from './swiper/index.vue';
</script>
<style lang="less" scoped></style>
