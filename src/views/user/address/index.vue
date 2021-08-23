/* eslint-disable */
<template lang="">
  <n-card title="收货地址" style="margin-bottom: 16px">
    <template v-slot:header-extra>
      <n-button class="px-10 rounded-none" type="warning" @click="visibile = true" width="200">添加地址</n-button>
    </template>
    <n-table>
      <thead>
        <tr>
          <th v-for="item in thead" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in addresss" :key="item.id">
          <td class="p-5">{{ item.name }}</td>
          <td class="p-5">{{ item.address }}</td>
          <td class="p-5">{{ item.mobile }}</td>
        
          
          <td>
            <a href="#" class="text-indigo-600 hover:text-indigo-700"> 编辑 </a>
            <a href="#" class="text-indigo-600 hover:text-indigo-700" @click="handleRemoveAddress(item.id)">
              删除
            </a>
            <span
              v-if="item.isDefault === '1'"
              class="
                inline-block
                px-3
                py-1
                ml-5
                font-semibold
                text-yellow-900
                bg-yellow-200
                rounded-full
                leading-tight
              "
              >默认地址</span
            >
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
  <n-modal v-model:show="visibile">
    <n-card style="width: 600px;" title="模态框" :bordered="false" size="huge">
      <template #header-extra> 噢！ </template>
      内容
      <template #footer> 尾部 </template>
    </n-card>
  </n-modal>


  <!-- <div>
    <div class="container">
      <div>
        <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 class="text-2xl leading-tight">收货地址</h2>
          <div class="text-end">
            <n-button class="px-10 rounded-none" type="warning" @click="visibile = true" width="200">添加地址</n-button>
          </div>
        </div>
        <div class="py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal text-sm">
              <thead>
                <tr class="border-b border-gray-200">
                  <th scope="col" class="px-5 py-3 text-left font-medium" v-for="item in thead" :key="item">
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-gray-900 border-b border-gray-200" v-for="item in addresss" :key="item.id">
                  <td class="p-5">{{ item.name }}</td>
                  <td class="p-5">{{ item.address }}</td>
                  <td class="p-5">{{ item.mobile }}</td>

                  <td class="p-5">
            
                    <a href="#" class="text-indigo-600 hover:text-indigo-700"> 编辑 </a>
                    <a href="#" class="text-indigo-600 hover:text-indigo-700" @click="handleRemoveAddress(item.id)">
                      删除
                    </a>
                    <span
                      v-if="item.isDefault === '1'"
                      class="
                        inline-block
                        px-3
                        py-1
                        ml-5
                        font-semibold
                        text-yellow-900
                        bg-yellow-200
                        rounded-full
                        leading-tight
                      "
                      >默认地址</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Modal :show="visibile" @onOk="handleOk" @onCancel="handleCancel" v-if="form.length">
      <div class="flex flex-col w-full">
        <div v-for="(item, key) in form" :key="item.name" class="flex flex-col mb-4">
          <div class="flex relative">
            <span class="rounded-l-md inline-flex items-center px-3 border-t border-l border-b border-gray-300">
              <UserIcon v-if="item.name === 'name'" class="w-5 h-5 text-gray-500" />
              <PhoneIcon v-else-if="item.name === 'mobile'" class="w-5 h-5 text-gray-500" />
              <LocationMarkerIcon v-else class="w-5 h-5 text-gray-500" />
            </span>
            <input
              v-model="form[key].value"
              :type="item.type"
              class="
                rounded-r-lg
                flex-1
                appearance-none
                border border-gray-300
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-sm
                text-base
                focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent
              "
              :placeholder="item.hint"
            />
          </div>
        </div>
        <div>
          <p class="flex items-center">
            是否默认地址
            <label class="ml-2 inline-flex items-center cursor-pointer">
              <input type="radio" name="isDefault" v-model="isDefault" value="0" class="h-5 w-5 text-main" />
              <span class="ml-2 text-gray-700"> 否 </span>
            </label>
            <label class="ml-2 inline-flex items-center cursor-pointer">
              <input type="radio" name="isDefault" v-model="isDefault" value="1" class="h-5 w-5 text-main" />
              <span class="ml-2 text-gray-700"> 是 </span>
            </label>
          </p>
        </div>
      </div>
    </Modal>
  </div> -->
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { UserIcon, PhoneIcon, LocationMarkerIcon } from '@heroicons/vue/outline';
import { useMessage, useDialog } from 'naive-ui';
import { addUserAddressApi, removeUserAddressByIdApi } from '@/service';

import { Modal } from '@/components/common';

const store = useStore();
const message = useMessage();
const dialog = useDialog();

const visibile = ref(false); //添加地址弹出框
const isDefault = ref('0'); // 是否默认地址
const addresss = computed(() => store.state.userAddress);

const defaultFrom = () => [
  { name: 'name', type: 'text', value: '', hint: '请输入收货人' },
  { name: 'mobile', type: 'text', value: '', hint: '请输入手机号' },
  { name: 'address', type: 'text', value: '', hint: '请输入详细地址' },
];

const form = ref(defaultFrom()); // 注册表单

const thead = ['收货人', '地址', '联系方式', '操作'];

// 添加地址
const handleOk = async () => {
  const values: { [name: string]: string } = {};
  form.value.forEach((item) => (values[item.name] = item.value));
  values.isDefault = isDefault.value;

  console.log('handleOk', values);
  const { code } = await addUserAddressApi(values as any);
  if (code) return;
  console.log('添加成功');
  form.value = defaultFrom();
  visibile.value = false;
  await store.dispatch('changeUserAddressAction');
};

const handleCancel = () => {
  console.log('handleCancel');
  visibile.value = false;
};

const handleRemoveAddress = (id: number) => {
  dialog.warning({
    title: '确认删除地址吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { code } = await removeUserAddressByIdApi(id);
      if (code) return;
      message.success('删除成功');
      await store.dispatch('changeUserAddressAction');
    },
    onNegativeClick: () => {
      // message.error('取消');
    },
  });
};
</script>
<style lang="less" scoped></style>
