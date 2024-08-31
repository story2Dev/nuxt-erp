<template>
  <div>
    <nav
      class="grid h-full grid-cols-3 items-center justify-between border-b border-slate-100 border-s-teal-100 bg-white dark:border-slate-900 dark:bg-primary-500"
    >
      <ul class="flex h-full">
        <li>
          <div
            class="flex h-full w-14 items-center justify-center bg-slate-100 transition-all hover:bg-primary-400 hover:text-white dark:bg-primary-500"
          >
            <Icon name="iconamoon:apps" size="18" />
          </div>
        </li>
        <li
          v-show="$route.fullPath !== '/'"
          class="flex items-center justify-center px-2"
        >
          <span text="Go Back">
            <button @click="$router.back()">
              <Icon
                name="fluent:arrow-left-12-regular"
                class="text-xl text-primary-500"
              />
            </button>
          </span>
        </li>
        <li
          class="flex items-center justify-center"
          :class="{
            'px-3': $route.fullPath == '/',
          }"
        >
          <nuxt-link to="/" class="text-base font-bold text-primary-500">
            <span class="hidden md:block">{{ title }}</span>
            <span class="md:hidden">NA</span>
          </nuxt-link>
        </li>
      </ul>

      <div class="flex h-full w-full max-w-md items-center justify-center">
        <AppBarSearch />
      </div>

      <ul class="flex h-full items-center justify-end">
        <li>
          <n-popover trigger="click">
            <template #trigger>
              <n-button circle quaternary type="primary">
                <Icon name="system-uicons:plus" size="30" />
              </n-button>
            </template>

            <template #header>
              <div class="text-base font-bold"> {{ $t('create') }} </div>
            </template>

            <ul class="grid grid-cols-2">
              <li
                v-for="(item, index) in menuListCreate"
                :key="index"
                class="rounded-xl px-4 py-2 hover:bg-slate-50"
              >
                <nuxt-link-locale :to="item.to" class="flex items-center gap-2">
                  <Icon :name="item.icon" size="24" />
                  <span>{{ item.name }}</span>
                </nuxt-link-locale>
              </li>
            </ul>
          </n-popover>
        </li>
        <li
          class="flex h-full w-12 items-center justify-center rounded-xl p-2 transition-all duration-200"
        >
          <AppNotification />
        </li>
        <li
          class="flex h-full w-12 items-center justify-center rounded-xl p-2 transition-colors duration-500"
        >
          <Icon name="system-uicons:question-circle" />
        </li>
        <li class="rounded-xl p-2 transition-colors duration-500">
          <AppBarProfile />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { title } = useApp();

const menuListCreate = [
  {
    name: 'Product',
    icon: 'system-uicons:box',
    to: '/products/add',
  },
  {
    name: 'Order',
    icon: 'system-uicons:cart',
    to: '/orders/add',
  },
  {
    name: 'Project',
    icon: 'solar:document-add-line-duotone',
    to: '/projects/create',
  },
];
</script>
