<template>
  <div>
    <ul class="flex flex-wrap gap-2">
      <li class="relative h-6 w-6 overflow-hidden rounded-full">
        <input
          v-model="color"
          type="color"
          class="absolute -left-2 -top-2 h-10 w-10 overflow-hidden"
          @change="handleChange"
        />
        <Icon
          v-if="isCustomColor"
          name="heroicons:check"
          class="absolute right-1 top-1 h-4 w-4 text-white"
        />
      </li>
      <li
        v-for="c in colors"
        :key="c"
        :style="{ 'background-color': c }"
        class="relative h-6 w-6 rounded-full"
        @click="handleSelect(c)"
      >
        <Icon
          v-if="color === c"
          name="heroicons:check"
          class="absolute right-1 top-1 h-4 w-4 text-white"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '#000',
});

const colors = [
  '#888',
  '#ccc',
  '#7fffd4',
  '#00ffff',
  '#008b8b',
  '#483d8b',
  '#2f4f4f',
  '#00bfff',
  '#1e90ff',
];

const emit = defineEmits(['update:modelValue']);

const color = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});

const isCustomColor = ref(false);

function handleChange(e: any) {
  isCustomColor.value = true;
  emit('update:modelValue', color.value);
}

function handleSelect(c: string) {
  isCustomColor.value = false;
  color.value = c;
  emit('update:modelValue', c);
}
</script>
