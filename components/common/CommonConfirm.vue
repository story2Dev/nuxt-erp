<template>
  <n-modal v-model:show="showModal">
    <n-card :title="title" :bordered="false" class="max-w-xs" aria-modal="true">
      <div class="mt-4 flex items-center justify-center">
        <slot name="icon">
          <NAvatar class="rounded-2xl bg-slate-100 text-red-500" :size="64">
            <Icon name="system-uicons:trash" size="35" />
          </NAvatar>
        </slot>
      </div>
      <div class="pt-4 text-center">
        <slot> {{ data }} </slot>
      </div>
      <template #footer>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <n-button @click="showModal = false">{{ $t(cancelText) }}</n-button>
          <n-button type="error" @click="handleOk">{{ $t(okText) }}</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  data?: string;
  okText?: string;
  cancelText?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  okText: 'delete',
  cancelText: 'cancel',
});
const emit = defineEmits(['update:modelValue', 'ok']);

const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function handleOk() {
  emit('ok');
  showModal.value = false;
}
</script>
