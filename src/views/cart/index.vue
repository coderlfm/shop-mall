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
          <td class="w-20">
            <div class="flex">
              <n-button size="tiny" @click="hadleChangeCount(item.productId, 'decrement', item.count)"
                ><MinusIcon class="w-3 h-3" />
              </n-button>
              <p class="w-8 text-center">{{ item.count }}</p>
              <n-button size="tiny" @click="hadleChangeCount(item.productId, 'increment', item.count)"
                ><PlusIcon class="w-3 h-3"
              /></n-button>
            </div>
          </td>
          <td>
            <span class="text-yellow-600">￥{{ item.totalPrice }}</span>
          </td>
          <td class="cursor-pointer hover:text-gray-500" @click="handleRemoveCart(item.productId)">删除</td>
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
          @click="handlePreCreateOrder"
        >
          下单
        </div>
      </div>
    </div>

    <n-modal v-model:show="addressVisibile" title="选择收货地址" preset="card" size="huge" :style="{ width: '600px' }">
      <div v-if="addresss && addresss.length">
        <div
          :class="[
            `border  mb-5 p-5 cursor-pointer hover:border-yellow-500`,
            currentAddress === item.id ? 'border-yellow-500' : 'border-gray-300',
          ]"
          v-for="item in addresss"
          :key="item.id"
          @click="handleAddressSelect(item.id)"
        >
          <h3 class="flex items-center mb-2" v-if="item.isDefault === '1'">
            <LocationMarkerIcon class="h-6 w-6 text-yellow-600 mr-2" />默认地址
          </h3>
          <div class="flex">
            <div class="w-20 text-justify text-gray-500">收货人：</div>
            {{ item.name }}
          </div>
          <div class="flex">
            <div class="w-20 text-justify text-gray-500">联系方式：</div>
            {{ item.mobile }}
          </div>
          <div class="flex">
            <div class="w-20 text-justify text-gray-500">收货地址：</div>
            {{ item.address }}
          </div>
        </div>
        <div class="flex flex-row-reverse"><n-button type="primary" @click="handleCreateOrder">确认</n-button></div>
      </div>
      <div v-else class="border mb-5 p-5 cursor-pointer hover:border-yellow-500" @click="handleToAddress">
        <div class="flex justify-center items-center">添加地址 <PlusIcon class="h-5 w-5 text-gray-600" /></div>
      </div>
    </n-modal>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { LocationMarkerIcon, PlusIcon, MinusIcon } from '@heroicons/vue/outline';
import { useMessage, useDialog } from 'naive-ui';
import router from '@/router';
import {
  getCartListApi,
  changeCartCheckApi,
  createOrderByProductIdsApi,
  changeCartCountApi,
  removeCartApi,
} from '@/service';

const message = useMessage();
const dialog = useDialog();
const store = useStore();

const cartList = ref<any>({ list: [], summation: {} }); //购物车列表
const addressVisibile = ref<any>(false); // 收货地址弹出框
const addresss = computed(() => store.state.userAddress); //地址列表
const currentAddress = ref<any>(null); // 当前选择的地址id

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
watch(addresss, () => (currentAddress.value = addresss.value?.find((item: any) => item.isDefault === '1')?.id), {
  immediate: true,
});

// 获取购物车列表
const getCartList = async () => {
  const { data } = await getCartListApi();
  cartList.value = data;
};

// 商品勾选
const handleCheckedChange = async (productId: number, val: any) => {
  const type = val === true ? '1' : '0';
  await changeCartCheckApi(productId, { type });
  await getCartList();
};

// 修改数量
const hadleChangeCount = async (productId: number, type: 'increment' | 'decrement', count: number) => {
  if (type === 'decrement' && count <= 1) return message.warning('至少保留一件');
  const { code } = await changeCartCountApi(productId, { type });
  if (code) return;
  await getCartList();
};

// 商品商品
const handleRemoveCart = async (productId: number) => {
  dialog.info({
    title: '确认将该商品从购物车中删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { code } = await removeCartApi(productId);
      if (code) return;
      message.success('删除成功');
      await getCartList();
    },
  });
};

// 选择收货地址
const handleAddressSelect = (addreddId: number) => (currentAddress.value = addreddId);

// 跳转到收货地址
const handleToAddress = () => router.push('/user/address');

// 下单前确认地址
const handlePreCreateOrder = async () => {
  if (!cartList.value.list.length || !cartList.value.list.some((item: any) => item.checked === '1')) {
    return message.warning('请先勾选商品');
  }
  addressVisibile.value = true;
};

// 确认下单
const handleCreateOrder = async () => {
  dialog.info({
    title: '确认下单吗',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { code } = await createOrderByProductIdsApi({ addressId: currentAddress.value });
      if (code) return;
      message.success('下单成功');
      addressVisibile.value = false;
      router.push('/user/order');
      // await getCartList();
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
