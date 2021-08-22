<template lang="">
  <div>
    <n-card title="我的订单" style="margin-bottom: 16px">
      <n-tabs type="line" @update:value="tabChange">
        <n-tab-pane :name="item" :tab="tabs[index]" v-for="(item, index) in Object.keys(tabs)" :key="item" />
      </n-tabs>
      <div class="mb-5" v-for="item in orderList.list" :key="item.id">
        <n-card :title="tabs[item.orderStatus]">
          <header class="mb-3 flex justify-between">
            <div>{{ new Date(item.createdAt).toLocaleString() }} | 刘丰茂 | 1779286189 | 四川省成都市</div>
            <div>
              应付金额： <span class="font-bold text-lg mx-2"> {{ item.totalPrice }}</span> 元
            </div>
          </header>
          <main class="flex justify-between">
            <section>
              <div class="flex mb-3" v-for="product in item.snapshoot" :key="product.id">
                <img class="w-20 h-20" :src="product.coverUrl" />
                <div class="ml-8 flex flex-col justify-center">
                  <p>{{ product.title }}</p>
                  <p>{{ product.discountPrice }}元 * {{ product.count }}</p>
                </div>
              </div>
            </section>
            <aside class="pt-5">
              <n-button type="warning" v-if="item.orderStatus === '1'">立即付款</n-button>
            </aside>
          </main>
        </n-card>
      </div>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { getOrderListApi } from '@/service';

const orderList = ref<any>({ list: [] }); //订单列表
const currentTabIndex = ref<any>('0'); //当前 tab

onMounted(() => getOrderList());

watch(currentTabIndex, () => getOrderList());

// 获取购物车列表
const getOrderList = async () => {
  const { data } = await getOrderListApi({ page: 1, pageSize: 10, orderStatus: currentTabIndex.value });
  orderList.value = data;
  console.log(orderList.value);
};

const tabs = {
  '0': '全部订单',
  '1': '待付款',
  '2': '待发货',
  '3': '已发货',
  '4': '已取消',
  '5': '已完成(待评价)',
  '6': '已完成',
};

const tabChange = (value: any) => {
  console.log(value);
  currentTabIndex.value = value;
};
</script>
<style lang="less" scoped></style>
