<template lang="">
  <div>
    <n-card title="我的订单" style="margin-bottom: 16px">
      <n-tabs type="line" @update:value="tabChange">
        <n-tab-pane :name="item" :tab="tabs[index]" v-for="(item, index) in Object.keys(tabs)" :key="item" />
      </n-tabs>
      <div class="mb-5" v-for="item in orderList.list" :key="item.id">
        <n-card :title="tabs[item.orderStatus]">
          <header class="mb-3 flex justify-between">
            <div class="text-gray-500">
              {{ new Date(item.createdAt).toLocaleString() }} | {{ item.snapshoot.address.name }} |
              {{ item.snapshoot.address.mobile }} |
              {{ item.snapshoot.address.address }}
            </div>
            <div>
              应付金额： <span class="font-bold text-lg mx-2"> {{ item.totalPrice }}</span> 元
            </div>
          </header>
          <main class="flex justify-between">
            <section>
              <div class="flex mb-3" v-for="product in item.snapshoot.products" :key="product.id">
                <img class="w-20 h-20" :src="product.coverUrl" />
                <div class="ml-8 flex flex-col justify-center">
                  <p>{{ product.title }}</p>
                  <p>{{ product.discountPrice }}元 * {{ product.count }}</p>
                </div>
              </div>
            </section>
            <aside class="pt-5">
              <n-button
                class="px-10 rounded-none"
                type="warning"
                v-if="item.orderStatus === '1'"
                @click="handlePrePayment(item.orderNumber)"
                width="200"
                >立即付款</n-button
              >
            </aside>
          </main>
        </n-card>
      </div>
    </n-card>

    <n-modal
      v-model:show="paymentVisibile.visibile"
      title="确认支付"
      preset="card"
      size="huge"
      :style="{ width: '500px' }"
    >
      确认支付
      <div class="flex flex-row-reverse"><n-button type="primary" @click="handlePayment">确认</n-button></div>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useMessage, useDialog } from 'naive-ui';
import { getOrderListApi, orderPayMentApi } from '@/service';

const message = useMessage();
const dialog = useDialog();

const orderList = ref<any>({ list: [] }); // 订单列表
const paymentVisibile = reactive<{ visibile: boolean; orderNumber: string }>({ visibile: false, orderNumber: '' }); // 付款弹窗
const currentTabIndex = ref<any>('0'); //当前 tab

onMounted(() => getOrderList());

watch(currentTabIndex, () => getOrderList());

// 获取购物车列表
const getOrderList = async () => {
  const { data } = await getOrderListApi({ page: 1, pageSize: 10, orderStatus: currentTabIndex.value });
  orderList.value = data;
};

const tabs = {
  '0': '全部订单',
  '1': '待付款',
  '2': '待发货',
  '3': '已发货',
  '4': '已取消',
  '5': '已完成(待评价)',
  '6': '已完成',
} as any;

// 切换订单列表
const tabChange = (value: any) => {
  currentTabIndex.value = value;
};

// 立即支付按钮
const handlePrePayment = (orderNumber: string) => {
  paymentVisibile.visibile = true;
  paymentVisibile.orderNumber = orderNumber;
};

// 订单支付
const handlePayment = async () => {
  const { code } = await orderPayMentApi({ orderNumber: paymentVisibile.orderNumber });
  if (code) return;
  message.success('订单支付成功');
  paymentVisibile.visibile = false;
  await getOrderList();
};
</script>
<style lang="less" scoped></style>
