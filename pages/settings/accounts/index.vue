<template>
  <div>
    <n-card>
      <ul>
        <li class="flex justify-between">
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
      </ul>
    </n-card>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const { title } = useApp();
title.value = 'Your Account';

const languages = locales.value.map((item: any) => ({
  label: item.name,
  value: item.code,
}));
</script>
