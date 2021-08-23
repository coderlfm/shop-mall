<template lang="">
  <div>
    <n-card :title="`账号信息`" size="huge">
      <n-form :model="model" :rules="rules" ref="formRef" label-placement="left" :label-width="80">
        <n-form-item label="用户头像" path="avatar">
          <label for="avatar">
            <img class="object-cover rounded-full h-16 w-16 cursor-pointer" v-if="model" :src="model.avatar" />
          </label>
        </n-form-item>
        <n-form-item label="用户ID" path="id"><n-input v-model:value="model.id" disabled /></n-form-item>
        <n-form-item label="账号" path="username"><n-input v-model:value="model.username" disabled /></n-form-item>
        <n-form-item label="昵称" path="nickName"><n-input v-model:value="model.nickName" /></n-form-item>
        <n-form-item label="手机号码" path="mobile"><n-input v-model:value="model.mobile" /></n-form-item>
      </n-form>
      <div class="text-center">
        <n-button type="primary" @click="handleOk">保存</n-button>
      </div>

      <input
        class="absolute invisible"
        id="avatar"
        type="file"
        accept="image/jpg,image/png,image/jpeg,image/gif,image/svg,image/webp,image/bmp"
        name="avatar"
        @change="handleUploadAvatar"
      />
    </n-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui';
import { uploadAvatarApi, editUserInoApi } from '@/service';

const store = useStore();
const message = useMessage();

console.log('store.state.userAddress', store.state.userAddress);

const defaultFrom = (dafaultData?: any) => dafaultData ?? { ...store.state.userInfo };

const model = ref<any>(defaultFrom());

const rules = {
  nickName: {
    required: true,
    message: '请输入昵称',
    trigger: 'blur',
  },
  mobile: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input'],
  },
};

// 上传头像
const handleUploadAvatar = async (e: any) => {
  if (!e.target.files) return;
  const file = new FormData();
  file.append('avatar', e.target.files[0]);

  const { code, data } = await uploadAvatarApi(file);
  if (code) return;
  model.value.avatar = data.avatar;
};

// 保存信息
const handleOk = async () => {
  const { code, msg } = await editUserInoApi({
    nickName: model.value.nickName,
    mobile: model.value.mobile,
    avatar: model.value.avatar,
  } as any);
  if (code) return message.warning(msg ?? '请求超时');
  message.success('保存成功');
  await store.dispatch('changeUserInfoAction');
};
</script>
<style lang="less" scoped></style>
