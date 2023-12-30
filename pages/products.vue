<template>
  <div>
    <n-tabs type="line" animated>
      <n-tab-pane v-for="(item, index) in links" :key="index" :name="item.name">
        <template #tab>
          <NuxtLink :to="item.to">
            {{ $t(item.name) }}
          </NuxtLink>
        </template>
      </n-tab-pane>
    </n-tabs>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const links = [
  {
    to: '/products',
    name: 'product',
  },
  {
    to: '/products/stock',
    name: 'products.stock',
  },
  {
    to: '/products/category',
    name: 'category',
  },
  {
    to: '/products/type',
    name: 'type',
  },
  {
    to: '/products/unit',
    name: 'unit',
  },
  {
    to: '/products/tag',
    name: 'tag',
  },
];
</script>
