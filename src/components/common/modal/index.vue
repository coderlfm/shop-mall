<template lang="">
  <div
    :class="[`fixed  inset-0 overflow-y-auto `, show ? 'visible' : 'invisible']"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="handleCancel"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start w-full">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <slot name="title">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">{{ title }}</h3>
              </slot>
              <div class="mt-2">
                <slot name="content">
                  <p class="text-sm text-gray-500">
                    <slot></slot>
                  </p>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <slot name="footer">
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-transparent
                shadow-sm
                px-4
                py-2
                bg-yellow-600
                text-base
                font-medium
                text-white
                hover:bg-yellow-700
                sm:ml-3 sm:w-auto sm:text-sm
              "
              @click="handleOk"
            >
              {{ onText }}
            </button>
            <button
              type="button"
              class="
                mt-3
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-gray-300
                shadow-sm
                px-4
                py-2
                bg-white
                text-base
                font-medium
                text-gray-700
                hover:bg-gray-50
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
              "
              @click="handleCancel"
            >
              {{ cancelText }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from 'vue';

interface Props {
  show: boolean;
  title?: string;
  onText?: string;
  cancelText?: string;
}

const emit = defineEmits(['onOk', 'onCancel']);

// props 默认值
const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: ' ',
  onText: '确认',
  cancelText: '取消',
});

const handleOk = () => emit('onOk');

const handleCancel = () => emit('onCancel');
</script>
<style lang="less" scoped></style>
