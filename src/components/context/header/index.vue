<template lang="">
  <NarBar />
  <SearchBar />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useMessage } from 'naive-ui';
import NarBar from './nav-bar/index.vue';
import SearchBar from './search-bar/index.vue';

onMounted(()=>{
  (window as any).$message = useMessage();
})
</script>
<style lang="less" scoped></style>
