<template lang="">
  <div class="flex border border-gray-200 p-10 bg-gradient-to-t from-yellow-50 to-white">
    <img :src="user.avatar" v-if="user" class="object-cover rounded-full h-16 w-16" />
    <div class="ml-10 text-gray-600">
      <p>昵称：{{ user.nickName }}</p>
      <p>账号：{{ user.username }}</p>
      <p>手机号：{{ user.mobile }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.state.userInfo);
</script>
<style lang="less" scoped></style>
