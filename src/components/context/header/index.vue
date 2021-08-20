<template lang="">
  <header class="bg-gray-500 text-sm">
    <section class="flex main-w mx-auto justify-between h-full items-center">
      <div class="underline text-yellow-500">因事件（疫情、特大暴雨）影响，部分地区无法配送公告</div>
      <div class="flex px-10">
        <div class="relative inline-block text-left mr-3">
          <div>
            <button type="button" class="text-sm font-medium text-gray-700 hover:underline" id="options-menu">
              我的
            </button>
          </div>
          <div
            class="
              origin-top-right
              absolute
              right-0
              mt-2
              w-40
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
            "
          >
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a
                href="#"
                class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                v-for="item in menus"
                :key="item.title"
              >
                <span class="flex flex-col">
                  <span> {{ item.title }} </span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div>APP</div>
      </div>
    </section>
  </header>
</template>
<script lang="ts" setup>
const menus = [{ title: '我的订单' }, { title: '我的资料' }, { title: '收货地址' }];
</script>
<style lang="less" scoped>
header {
  height: 36px;
}
</style>
