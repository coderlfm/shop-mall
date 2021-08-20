<template>
  <LoginHeader />
  <LoginMain />
</template>
<script lang="ts" setup>
import { ref, defineComponent } from 'vue';
import LoginHeader from './header/index.vue';
import LoginMain from './main/index.vue';

// defineComponent([LoginHeader, LoginMain]);
const color = ref('red');
</script>
<style>
/* set */
</style>
