<template lang="">
  <header class="bg-gray-500 text-sm">
    <section class="flex main-w mx-auto justify-between h-full items-center">
      <div class="underline text-yellow-500">因事件（疫情、特大暴雨）影响，部分地区无法配送公告</div>
      <div class="flex px-10 text-white">
        <div
          class="group relative inline-block text-left mr-3"
          @mousemove="changeMenuVisibile(true)"
          @mouseleave="changeMenuVisibile(false)"
        >
          <div>
            <button id="options-menu" type="button" class="text-sm font-medium hover:underline">我的</button>
          </div>
          <div
            :class="[
              `group-hover:visible
              origin-top-right
              absolute
              right-0
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
                  <span> {{ item.title }} </span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div>我的订单</div>
      </div>
    </section>
  </header>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const menusVisbile = ref<true | false>(false);

const changeMenuVisibile = (visibile: true | false) => {
  console.log('visibile', visibile);
  menusVisbile.value = visibile;
};

const menus = [{ title: '我的订单' }, { title: '我的资料' }, { title: '收货地址' }];
</script>
<style lang="less" scoped>
header {
  height: 36px;
}
</style>
