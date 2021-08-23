/* eslint-disable */
<template lang="">
  <n-card title="收货地址" style="margin-bottom: 16px">
    <template v-slot:header-extra>
      <n-button class="px-8 rounded-none" type="warning" @click="addressVisibile.visibile = true" width="200">添加地址</n-button>
    </template>
    <n-table>
      <thead><tr><th v-for="item in thead" :key="item">{{ item }}</th></tr></thead>
      <tbody>
        <tr v-for="item in addresss" :key="item.id">
          <td class="p-5">{{ item.name }}</td>
          <td class="p-5">{{ item.address }}</td>
          <td class="p-5">{{ item.mobile }}</td>
          <td>
            <a href="#" class="text-indigo-600 hover:text-indigo-700" @click="hdanldePreEdit(item)"> 编辑 </a>
            <a href="#" class="text-indigo-600 hover:text-indigo-700 mr-3" @click="handleRemoveAddress(item.id)">
              删除
            </a>
            <n-tag type="warning" size="small" v-if="item.isDefault === '1'" round> 默认地址 </n-tag>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <!-- 新增/编辑地址弹出框 -->
  <n-modal v-model:show="addressVisibile.visibile">
    <n-card style="width: 500px;" :title="`${addressVisibile.type === 'crate' ? '新增' : '编辑' }地址`" :bordered="false" size="huge">
      <n-form
      :model="model"
      :rules="rules"
      ref="formRef"
      label-placement="left"
      :label-width="80"
      :style="{
        maxWidth: '640px'
      }"
    >
      <n-form-item label="收货人" path="name"> <n-input placeholder="请输入收货人" v-model:value="model.name" /></n-form-item>
      <n-form-item label="联系方式" path="mobile"> <n-input placeholder="请输入联系方式" v-model:value="model.mobile" /></n-form-item>
      <n-form-item label="收货地址" path="address"> <n-input placeholder="请输入收货地址" v-model:value="model.address" /></n-form-item>
      
      <n-form-item label="默认地址" path="isDefault">
        <n-radio-group v-model:value="model.isDefault" name="isDefault">
          <n-radio value="1">是</n-radio>
          <n-radio value="0">否</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>

      <template #footer>
        <div class="flex flex-row-reverse">
          <n-space>
            <n-button @click="addressVisibile.visibile = false">取消</n-button>
            <n-button type="primary" @click="handleOk"> {{addressVisibile.type === 'crate' ? '新增' : '保存'}} </n-button>
          </n-space>
        </div>
      </template>
    </n-card>
  </n-modal>

</template>
<script lang="ts" setup>
import { ref,reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { NForm } from 'naive-ui'; 
import { useMessage, useDialog } from 'naive-ui';
import { addUserAddressApi, removeUserAddressByIdApi, editUserAddressApi } from '@/service';

import { IAddress } from '@/service/user/type'


const store = useStore();
const message = useMessage();
const dialog = useDialog();

const addressVisibile = reactive({ visibile: false, type: 'creat', addressId: 0 });  // 添加地址弹出框
const formRef = ref<InstanceType<typeof NForm>>();    // formRef 
const addresss = computed(() => store.state.userAddress);

const defaultFrom = (dafaultData?:any) => dafaultData ?? ({
  name: '',     // 收货人姓名
  mobile: '',   // 手机号
  address: '',    // 收货地址
  isDefault: '0', // 设置为默认地址
});

const model = ref<IAddress>(defaultFrom())

const thead = ['收货人', '地址', '联系方式', '操作'];

const rules = {
  name: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  mobile: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input']
  },
  address: {
    required: true,
    message: '请输入收货地址',
    trigger: ['input']
  },
};

// 添加地址
const handleOk = async () => {

  formRef.value?.validate(async (errors) => {
    let code
    const typeMsg = addressVisibile.type === 'create' ? '添加' : '保存';
    
    if (errors)  return  message.error('请输入正确后再进行提交')

    if(addressVisibile.type === 'create'){
       code = (await addUserAddressApi(model.value)).code;
    } else {
       code = (await editUserAddressApi(addressVisibile.addressId, model.value)).code;
    }

    if (code) return;
    addressVisibile.visibile = false;
    model.value = defaultFrom();
    message.success( `${typeMsg}成功`);
    await store.dispatch('changeUserAddressAction');

  })
  
};

// 编辑按钮
const hdanldePreEdit = (defatultData:any)=>{
  model.value = defaultFrom(defatultData);
  addressVisibile.visibile = true;
  addressVisibile.type = 'edit';
  addressVisibile.addressId = defatultData.id;
}

// 删除地址
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
