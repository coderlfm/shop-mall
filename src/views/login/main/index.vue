<template lang="">
  <main class="login-main">
    <div class="login-content h-full flex flex-row-reverse items-center mr-28">
      <div class="login-form-warp bg-white">
        <section class="flex-col">
          <div class="bg-yellow-100 text-sm py-2 px-6">茶叶严选不会以任何理由要求您转账汇款，谨防诈骗。</div>
          <div
            class="
              grid grid-cols-2
              divide-x divide-black divide-opacity-25
              h-14
              items-center
              text-lg text-center
              font-black
            "
          >
            <div
              :class="{ 'hover:text-main': true, 'cursor-pointer': true, 'text-main': formType === 'login' }"
              @click="formType = 'login'"
            >
              账户登陆
            </div>
            <div
              :class="{ 'hover:text-main': true, 'cursor-pointer': true, 'text-main': formType === 'register' }"
              @click="formType = 'register'"
            >
              账户注册
            </div>
          </div>
        </section>

        <section class="w-full mt-4">
          <div
            class="
              flex
              w-full
              flex-col
              px-4
              py-4
              w-m
              bg-white
              rounded-lg
              shadow
              dark:bg-gray-800
              sm:px-6
              md:px-8
              lg:px-10
            "
          >
            <div class="">
              <div v-for="(item, key) in formList" :key="item.name" class="flex flex-col mb-4">
                <div class="flex relative">
                  <span class="rounded-l-md inline-flex items-center px-3 border-t border-l border-b border-gray-300">
                    <LockClosedIcon
                      v-if="item.name === 'password' || item.name === 'repeatPassword'"
                      class="w-5 h-5 text-gray-500"
                    />
                    <UserIcon v-else-if="item.name === 'username'" class="w-5 h-5 text-gray-500" />
                    <PhoneIcon v-else-if="item.name === 'mobile'" class="w-5 h-5 text-gray-500" />
                    <UserCircleIcon v-else-if="item.name === 'nickName'" class="w-5 h-5 text-gray-500" />
                  </span>
                  <input
                    v-model="formList[key].value"
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
              <div v-if="formType === 'login'" class="flex items-center mb-6">
                <div class="flex ml-auto">
                  <a href="#" class="inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700">
                    忘记密码？
                  </a>
                </div>
              </div>
              <div class="flex w-full">
                <button
                  type="submit"
                  class="
                    py-2
                    mb-4
                    bg-main
                    houver:bg-main
                    focus:ring-main focus:ring-offset-red-200
                    text-white
                    w-full
                    transition
                    ease-in
                    duration-200
                    text-center text-base
                    font-semibold
                    shadow-md
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    rounded-lg
                  "
                  @click="handleSubmit"
                >
                  {{ formType === 'login' ? '登陆' : '注册' }}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>

</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';

import { setupStore } from '@/store';
import { UserIcon, UserCircleIcon, LockClosedIcon, PhoneIcon } from '@heroicons/vue/outline';
import { loginApi, registerApi } from '@/service/login/index';

import { loginFormType, registerFormType, formListType } from './types';

const message = useMessage();
const history = useRouter();

const formType = ref<'login' | 'register'>('login'); // 表单类型

const loginForm = reactive<loginFormType>([
  { name: 'username', type: 'text', value: '', hint: '请输入用户名' },
  { name: 'password', type: 'password', value: '', hint: '请输入密码' },
]); // 登陆表单

const registerForm = reactive<registerFormType>([
  { name: 'username', type: 'text', value: '', hint: '请输入用户名' },
  { name: 'nickName', type: 'text', value: '', hint: '请输入昵称' },
  { name: 'mobile', type: 'text', value: '', hint: '请输入手机号' },
  { name: 'password', type: 'password', value: '', hint: '请输入密码' },
  { name: 'repeatPassword', type: 'password', value: '', hint: '请再次输入密码' },
]); // 注册表单

let formList = ref<formListType>(loginForm); // 注册表单

watch(formType, (newVal) => (formList.value = newVal === 'login' ? loginForm : registerForm));

// 前置
const handleSubmit = () => {
  const values: { [name: string]: string } = {};
  formList.value.forEach((item) => (values[item.name] = item.value));

  if (formType.value === 'login') {
    handleLogin(values);
  } else {
    if (values.password !== values.repeatPassword) return message.warning('两次密码不一致');
    delete values.repeatPassword;
    handleRegister(values);
  }
};

// 登录
const handleLogin = async (values: any) => {
  const { code, data } = await loginApi(values as any);
  if (code) return;
  successfully(data.token);
};

// 注册
const handleRegister = async (values: any) => {
  const { code, data } = await registerApi(values as any);
  if (code) return;
  successfully(data.token);
};

// 后置
const successfully = async (token: string) => {
  localStorage.setItem('token', token);
  await setupStore();
  history.push('/');
};
</script>

<style lang="less" scoped>
.login-main {
  height: 575px;
  // background: #e93854;
  // background: #ccc;
  .login-content {
    background: url(../../../assets/images/login-bg.jpg) 0px 0px no-repeat;
    background-size: cover;
    width: 100%;

  }
    .login-form-warp {
      // width: 346px;
      margin-right: 200px;
    }
}
</style>
