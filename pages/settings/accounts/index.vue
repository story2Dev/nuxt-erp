<template>
  <div>
    <n-card>
      <ul class="divide-y">
        <li class="flex justify-between py-2">
          <span>
            {{ $t('language') }}
          </span>
          <div class="w-full max-w-[150px]">
            <n-select
              v-model:value="locale"
              :options="languages"
              @update:value="setLocale"
            />
          </div>
        </li>
        <li class="py-2">
          <h4>{{ $t('theme') }}</h4>
          <ol class="mt-2 flex gap-4">
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
              <Icon :name="item.icon" size="24" />
              <span>{{ $t(item.label) }}</span>
            </li>
          </ol>
        </li>
      </ul>
    </n-card>
    <article class="mt-4 flex justify-end">
      <n-button @click="signOut">{{ $t('sign_out') }}</n-button>
    </article>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const { title } = useApp();
const { t } = useI18n();
const { signOut } = useAuth();
const { colorModePreference } = useNaiveColorMode();

title.value = 'Your Account';

const languages = locales.value.map((item: any) => ({
  label: item.name,
  value: item.code,
}));

const themeItems = [
  {
    label: t('system'),
    value: 'system',
    icon: 'system-uicons:laptop',
  },
  {
    label: t('light'),
    value: 'light',
    icon: 'system-uicons:lightbulb-on',
  },
  {
    label: t('dark'),
    value: 'dark',
    icon: 'system-uicons:moon',
  },
];

const setTheme = (theme: any) => {
  colorModePreference.set(theme);
};
</script>
