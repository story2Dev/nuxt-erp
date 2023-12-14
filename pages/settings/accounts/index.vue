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
    <article class="mt-4 flex justify-end">
      <n-button @click="signOut">{{ $t('sign_out') }}</n-button>
    </article>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const { title } = useApp();
const { signOut } = useAuth();
title.value = 'Your Account';

const languages = locales.value.map((item: any) => ({
  label: item.name,
  value: item.code,
}));
</script>
