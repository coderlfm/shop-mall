<template>
  <LoginHeader />
  <LoginMain />
</template>
<script lang="ts" setup>
// import { ref, defineComponent } from 'vue';
import { onMounted } from 'vue'
import { useMessage } from 'naive-ui';
import LoginHeader from './header/index.vue';
import LoginMain from './main/index.vue';

onMounted(()=>{
  (window as any).$message = useMessage();
})
</script>
<style>
/* set */
</style>
