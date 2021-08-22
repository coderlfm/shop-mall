<template lang="">
  <header class="bg-gray-500 text-sm">
    <section class="flex main-w mx-auto justify-between h-full items-center">
      <div class="underline text-yellow-500">因事件（疫情、特大暴雨）影响，部分地区无法配送公告</div>
      <div class="flex px-10 text-white h-full items-center">
        <div v-if="!user" class="cursor-pointer hover:underline" @click="handleTologin">你好，请登录</div>
        <div
          v-if="user"
          class="group relative h-full inline-block ml-3"
          @mousemove="changeMenuVisibile(true)"
          @mouseleave="changeMenuVisibile(false)"
        >
          <div class="h-full flex items-center">
            <button id="options-menu" type="button" class="text-sm font-medium hover:underline">
              {{ user.nickName }}
            </button>
          </div>
          <div
            :class="[
              `group-hover:visible
              origin-top-right
              absolute
              right-0
               top-7
              mt-2
              w-40
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
              z-10`,
              menusVisbile ? 'visible' : 'invisible',
            ]"
          >
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a
                v-for="item in menus"
                :key="item.title"
                href="#"
                class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <span class="flex flex-col">
                  <router-link :to="item.url"> {{ item.title }} </router-link>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="ml-3 hover:underline">
          <router-link to="/user/order">我的订单</router-link>
        </div>
      </div>
    </section>
  </header>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

const store = useStore();

const menusVisbile = ref<true | false>(false);

const user = computed(() => store.state.userInfo);

const changeMenuVisibile = (visibile: true | false) => {
  menusVisbile.value = visibile;
};

const handleTologin = () => router.push('/login');

console.log('user:', user.value);

const menus = [
  { title: '我的资料', url: '/user/profile' },
  { title: '我的订单', url: '/user/order' },
  { title: '收货地址', url: '/user/address' },
];
</script>
<style lang="less" scoped>
header {
  height: 36px;
}
</style>
