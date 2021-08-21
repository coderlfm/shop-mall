<template lang="">
  <nav v-if="bannerList.length" class="overflow-hidden w-screen relative">
    <img class="absolute w-full transition duration-500" :src="bannerList[currentIndex].url" />

    <div class="absolute top-1/2 translate-y-1/2 slick-wrap flex w-full justify-between px-16 text-white">
      <div class="bg-main rounded-full w-10 h-10 flex items-center justify-center cursor-pointer" @click="handlePre">
        左
      </div>
      <div class="bg-main rounded-full w-10 h-10 flex items-center justify-center cursor-pointer" @click="handleNext">
        右
      </div>
    </div>

    <ul class="slick-dots absolute left-1/2 translate-x-1/2 bottom-3 z-10 flex">
      <li
        v-for="(item, index) in bannerList"
        :key="item.id"
        :class="[
          'w-2 h-2 mx-2',
          'border-1 cursor-pointer ring-4 ring-transparent ring-opacity-50',
          'hover:ring-yellow-300',
          'hover:border-yellow-500',
          'hover:bg-yellow-500',
          'rounded-full',
          index === currentIndex ? 'bg-yellow-500 ring-yellow-400 border-yellow-500' : 'bg-white border-gring-gray-600',
        ]"
        class=""
        @mousemove="changeCurrentIndex(index)"
      ></li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps<{
  bannerList: any[];
}>();

const currentIndex = ref(1);
const handlePre = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = props.bannerList.length - 1;
  } else {
    currentIndex.value--;
  }
};

const handleNext = () => {
  if (currentIndex.value === props.bannerList.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

const changeCurrentIndex = (index: number) => {
  currentIndex.value = index;
  console.log(index);
};

onMounted(() => {
  setInterval(() => handleNext(), 5000);
});
</script>
<style lang="less" scoped>
nav {
  height: 420px;

  img {
    width: 1920px;
    min-width: 1920px;
    max-width: 1920px;
    min-height: 420px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
