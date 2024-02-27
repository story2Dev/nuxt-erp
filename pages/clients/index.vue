<template>
  <div class="flex h-full flex-col">
    <nav class="flex justify-between p-4">
      <div>
        <n-input class="hidden w-full md:block" placeholder="Search">
          <template #prefix>
            <Icon name="fluent:search-20-regular" />
          </template>
        </n-input>
      </div>
      <ul class="flex gap-2">
        <li>
          <n-button secondary>{{ $t('export') }}</n-button>
        </li>
        <li>
          <nuxt-link to="/clients/create">
            <n-button type="primary">
              <template #icon>
                <Icon name="system-uicons:plus" />
              </template>
              {{ $t('create') }}
            </n-button>
          </nuxt-link>
        </li>
      </ul>
    </nav>

    <section class="flex-grow overflow-y-auto">
      <table class="w-full">
        <thead class="sticky -top-1 border-y border-slate-100 bg-gray-50">
          <tr class="text-left">
            <th class="w-8 px-4 py-2">#</th>
            <th>Name</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="(item, index) in 100"
            :key="index"
            class="group hover:bg-slate-100"
          >
            <td class="px-4 py-1.5">{{ item }}</td>
            <td>
              <nuxt-link
                :to="`/clients/${item}`"
                class="text-primary-500 hover:underline"
              >
                Customer {{ item }}
              </nuxt-link>
            </td>
            <td>{{ new Date().toDateString() }}</td>
            <td>
              <div class="invisible group-hover:visible">
                <n-button type="primary" circle quaternary>
                  <template #icon>
                    <Icon name="system-uicons:pen" />
                  </template>
                </n-button>
                <n-button type="error" circle quaternary>
                  <template #icon>
                    <Icon name="system-uicons:trash" />
                  </template>
                </n-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="flex justify-center p-2">
      <n-pagination :page-count="100" />
    </footer>
  </div>
</template>

<script setup lang="ts">
const { title } = useApp();
title.value = 'Clients';
</script>
