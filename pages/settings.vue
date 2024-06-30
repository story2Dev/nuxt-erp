<template>
  <div class="h-full pt-4">
    <section
      class="mx-auto flex h-full max-w-3xl divide-x divide-slate-100 rounded-xl border border-slate-100 bg-white dark:divide-slate-700 dark:border-slate-800 dark:bg-slate-900"
    >
      <article class="w-64 p-4">
        <div>
          <n-input v-model:value="search" :placeholder="$t('search')">
            <template #prefix>
              <Icon name="system-uicons:search" />
            </template>
          </n-input>
        </div>

        <div class="my-2">
          <nuxt-link
            v-show="!search.length"
            to="/settings/accounts"
            class="block p-2"
            active-class="bg-primary-100 rounded-xl dark:bg-primary-500"
          >
            <n-thing title="Mark AI">
              <template #avatar>
                <n-avatar class="bg-primary-400" :size="45" circle> </n-avatar>
              </template>
              <template #description> mark@email.com </template>
            </n-thing>
          </nuxt-link>

          <article
            v-if="!filteredLinks.length"
            class="flex flex-col items-center justify-end rounded-lg bg-slate-50 p-4 text-slate-500 dark:bg-slate-800"
          >
            <Icon name="system-uicons:search" size="30" />
            <span>{{ $t('no_result') }}</span>
          </article>
        </div>

        <!-- link setting -->
        <nav class="flex flex-col space-y-0.5">
          <nuxt-link
            v-for="(item, index) in filteredLinks"
            :key="index"
            :to="item.to"
            class="flex items-center gap-2 rounded-md px-2 py-1"
            active-class="bg-primary-100 text-primary-500 dark:bg-primary-500 dark:text-white"
          >
            <Icon :name="item.icon" size="18" />
            <span>{{ item.title }}</span>
          </nuxt-link>
        </nav>
      </article>

      <article class="flex-grow p-4">
        <div class="mb-4 flex items-center gap-2">
          <button @click="$router.back()">
            <Icon name="system-uicons:chevron-left" size="20" />
          </button>
          <button @click="$router.forward()">
            <Icon name="system-uicons:chevron-right" size="20" />
          </button>
          <h2 class="text-base">{{ title }}</h2>
        </div>
        <NuxtPage />
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
const { title } = useApp();
title.value = 'Settings';
const search = ref('');
const links = [
  {
    title: 'General',
    icon: 'system-uicons:settings',
    to: '/settings/general',
  },
  {
    title: 'Notification',
    icon: 'system-uicons:bell',
    to: '/settings/notification',
  },
];

const filteredLinks = computed(() => {
  return links.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>
