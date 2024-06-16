<template>
  <div>
    <ol v-if="mode == 'box'" class="mt-2 flex gap-4">
      <li
        v-for="(item, index) in themeItems"
        :key="index"
        class="flex cursor-pointer flex-col items-center rounded-xl border p-4 px-8 dark:border-slate-800"
        :class="{
          'bg-primary-500 text-white ':
            colorModePreference.get() === item.value,
        }"
        @click="setTheme(item.value)"
      >
        <Icon :name="item.iconName" size="24" />
        <span>{{ $t(item.label) }}</span>
      </li>
    </ol>

    <n-dropdown
      v-if="mode == 'dropdown'"
      :options="themeItems"
      trigger="hover"
      key-field="value"
      @select="setTheme"
    >
      <n-button text icon-placement="right">
        {{ $t(colorModePreference.get()) }}
        <template #icon>
          <Icon name="system-uicons:chevron-down" />
        </template>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Icon } from '#components';
interface Props {
  mode?: 'box' | 'dropdown';
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'box',
});

const { colorModePreference } = useNaiveColorMode();
const { t } = useI18n();

const themeItems: any[] = [
  {
    label: t('system'),
    value: 'system',
    iconName: 'system-uicons:laptop',
    icon: () => h(Icon, { name: 'system-uicons:laptop' }),
  },
  {
    label: t('light'),
    value: 'light',
    iconName: 'system-uicons:lightbulb-on',
    icon: () => h(Icon, { name: 'system-uicons:lightbulb-on' }),
  },
  {
    label: t('dark'),
    value: 'dark',
    iconName: 'system-uicons:moon',
    icon: () => h(Icon, { name: 'system-uicons:moon' }),
  },
];

const setTheme = (theme: any) => {
  colorModePreference.set(theme);
};
</script>
