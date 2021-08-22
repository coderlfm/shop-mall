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
          <th v-for="item in columns" :key="item.key">{{ item.title }}</th>
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
          <span class="text-yellow-500 font-bold">{{ checkedRowKeys.length }}</span> 件
        </span>
      </div>
      <div class="flex h-full">
        <div class="flex flex-col justify-center text-gray-400">
          <p>商品合计：￥1100.00</p>
          <p>已优惠： -￥100.00</p>
        </div>
        <div class="mx-5 flex items-center">
          应付总额 <span class="text-yellow-500 font-bold text-lg mx-2"> ￥{{ 999.99 }}</span>
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
        >
          下单
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { h, ref, onMounted } from 'vue';
import { getCartListApi, changeCartCheckApi } from '@/service';

const cartList = ref<any>({ list: [] }); //购物车列表
const checkedRowKeys = ref<any[]>([]); // 已经勾选的商品

const columns = [
  // {
  //   type: 'selection',
  //   disabled(row: any, index: any) {
  //     return row.name === 'Edward King 3';
  //   },
  // },
  {
    title: '商品信息',
    key: 'product',
    render(row: any) {
      return h('div', { className: 'flex' }, [
        h('img', { src: row.coverUrl, width: 98, height: 98 }),
        h('p', null, row.title),
      ]);
    },
  },
  {
    title: '单价',
    key: 'discountPrice',
  },
  {
    title: '数量',
    key: 'count',
  },
  {
    title: '小计',
    key: 'totalPrice',
  },
  {
    title: '操作',
    key: '',
    render(row: any) {
      return h('div', { className: 'flex' }, '删除');
    },
  },
];

onMounted(() => getCartList());

const getCartList = async () => {
  const { data } = await getCartListApi();
  cartList.value = data;
};

// const handleCheck = (rowKeys: any) => {
//   checkedRowKeys.value = rowKeys;
// };

const handleCheckedChange = async (productId: number, val: any) => {
  console.log(productId, val);
  const type = val === true ? '1' : '0';
  await changeCartCheckApi(productId, { type });
  await getCartList();
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
