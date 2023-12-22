<template>
  <div class="flex cursor-pointer items-center gap-1" @click="toggleSort">
    <slot>
      {{ label }}
    </slot>
    <Icon :name="sortIcon" />
  </div>
</template>

<script setup lang="ts">
import { SORT_MODE } from '~/constants';
import type { SortKey } from '~/types';

interface Props {
  label?: string;
  field: string;
  modelValue: SortKey;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

function toggleSort() {
  const { mode } = props.modelValue;
  const newMode = mode === SORT_MODE.ASC ? SORT_MODE.DESC : SORT_MODE.ASC;
  emit('update:modelValue', { key: props.field, mode: newMode });
}

const sortIcon = computed(() => {
  const { key, mode } = props.modelValue;
  if (key === props.field) {
    return mode === SORT_MODE.ASC
      ? 'system-uicons:arrow-up'
      : 'system-uicons:arrow-down';
  }
  return 'system-uicons:question-circle';
});
</script>
