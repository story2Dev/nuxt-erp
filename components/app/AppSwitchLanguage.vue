<template>
  <div>
    <n-select
      v-if="mode == 'select'"
      v-model:value="locale"
      :options="languages"
      @update:value="setLocale"
    />

    <n-dropdown
      v-if="mode == 'dropdown'"
      :options="languages"
      trigger="hover"
      key-field="value"
      @select="handleSelect"
    >
      <n-button text icon-placement="right">
        {{ current?.label }}
        <template #icon>
          <Icon name="system-uicons:chevron-down" />
        </template>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
interface Props {
  mode?: 'select' | 'link' | 'dropdown';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'select',
});

const { locale, locales, setLocale } = useI18n();

const languages = locales.value.map((item: any) => ({
  label: item.name,
  value: item.code,
}));

const current = computed(() => {
  return languages.find((item) => item.value === locale.value);
});

function handleSelect(code: string) {
  setLocale(code);
}
</script>
