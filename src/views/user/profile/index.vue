<template lang="">
  <div class="flex border border-gray-200 p-10 bg-gradient-to-t from-yellow-50 to-white">
    <label for="avatar">
      <img class="object-cover rounded-full h-16 w-16 cursor-pointer" v-if="user" :src="user.avatar" />
    </label>

    <input
      class="absolute invisible"
      id="avatar"
      type="file"
      accept="image/jpg,image/png,image/jpeg,image/gif,image/svg,image/webp,image/bmp"
      name="avatar"
      @change="handleUploadAvatar"
    />

    <div class="ml-10 text-gray-600">
      <p>昵称：{{ user.nickName }}</p>
      <p>账号：{{ user.username }}</p>
      <p>手机号：{{ user.mobile }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui';

const message = useMessage();
import { uploadAvatarApi } from '@/service';

const store = useStore();
const user = computed(() => store.state.userInfo);

// 上传头像
const handleUploadAvatar = async (e: any) => {
  if (!e.target.files) return;
  const file = new FormData();
  file.append('avatar', e.target.files[0]);

  const { code } = await uploadAvatarApi(file);
  if (code) return;
  message.success('修改头像成功');
  await store.dispatch('changeUserInfoAction');
};
</script>
<style lang="less" scoped></style>
