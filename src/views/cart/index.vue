<template lang="">
  <main class="main-w mx-auto overflow-hidden py-20">
    <!-- <n-data-table
      ref="table"
      :columns="columns"
      :data="cartList.list"
      :row-key="(row) => row.productId"
      @update:checked-row-keys="handleCheck"
    /> -->
    <n-table>
      <thead>
        <tr>
          <th v-for="item in columns" :key="item.title">{{ item.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartList.list" :key="item.productId">
          <td class="flex">
            <n-checkbox
              :checked="item.checked === '1'"
              @update:checked="handleCheckedChange(item.productId, $event)"
            ></n-checkbox>
            <img :src="item.coverUrl" /> {{ item.title }}
          </td>
          <td>
            ￥{{ item.discountPrice }} <span class="text-gray-400 line-through">￥{{ item.marketPrice }}</span>
          </td>
          <td>
            <n-button size="tiny">－</n-button>{{ item.count }}
            <n-button size="tiny"> ＋ </n-button>
          </td>
          <td>
            <span class="text-yellow-600">￥{{ item.totalPrice }}</span>
          </td>
          <td>删除</td>
        </tr>
      </tbody>
    </n-table>

    <div class="flex justify-between h-16 items-center bg-white border border-gray-200 mt-5">
      <div class="ml-5">
        <span>继续购物</span>
        <span
          >共 <span class="text-yellow-500 font-bold">{{ cartList.list.length }}</span> 件商品，已选择
          <span class="text-yellow-500 font-bold">{{ checkedRowKeys }}</span> 件
        </span>
      </div>
      <div class="flex h-full">
        <div class="flex flex-col justify-center text-gray-400">
          <p>商品合计：￥{{ cartList.summation.totalMarketPrice }}</p>
          <p>已优惠： -￥{{ cartList.summation.discount }}</p>
        </div>
        <div class="mx-5 flex items-center">
          应付总额
          <span class="text-yellow-500 font-bold text-lg mx-2"> ￥{{ cartList.summation.totalDiscountPrice }}</span>
        </div>
        <div
          class="
            w-20
            h-full
            flex
            justify-center
            text-white text-lg
            items-center
            bg-main
            cursor-pointer
            hover:bg-yellow-600
          "
          @click="handleCreateOrder"
        >
          下单
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useMessage, useDialog } from 'naive-ui';
import { getCartListApi, changeCartCheckApi, createOrderByProductIdsApi } from '@/service';

const message = useMessage();
const dialog = useDialog();

const cartList = ref<any>({ list: [], summation: {} }); //购物车列表
const checkedRowKeys = computed(() => cartList.value.list.filter((item: any) => item.checked === '1').length); // 已经勾选的商品

const columns = [
  {
    title: '商品信息',
  },
  {
    title: '单价',
  },
  {
    title: '数量',
  },
  {
    title: '小计',
  },
  {
    title: '操作',
  },
];

onMounted(() => getCartList());

// 获取购物车列表
const getCartList = async () => {
  const { data } = await getCartListApi();
  cartList.value = data;
  console.log(cartList.value);
};

// 商品勾选
const handleCheckedChange = async (productId: number, val: any) => {
  const type = val === true ? '1' : '0';
  await changeCartCheckApi(productId, { type });
  await getCartList();
};

// 下单
const handleCreateOrder = async () => {
  dialog.info({
    title: '确认下单吗',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { code } = await createOrderByProductIdsApi();
      if (code) return;
      message.success('下单成功');
      await getCartList();
    },
    onNegativeClick: () => {
      // message.error('不确定');
    },
  });
};
</script>

<style lang="less" scoped>
tbody {
  img {
    width: 90px;
    height: 90px;
  }
}
</style>
