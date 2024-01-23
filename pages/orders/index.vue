<template>
  <div>
    <nav class="flex justify-between px-4">
      <span class="text-xl font-bold">Order</span>
      <ul class="flex gap-2">
        <li>
          <n-button secondary>{{ $t('export') }}</n-button>
        </li>
        <li>
          <nuxt-link to="/orders/create">
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

    <section class="mt-4">
      <table class="w-full">
        <thead class="border-b">
          <tr class="text-left">
            <th class="px-4 py-2">#</th>
            <th>Customer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="(item, index) in 10"
            :key="index"
            class="hover:bg-slate-100"
          >
            <td class="px-4 py-1.5">{{ item }}</td>
            <td> Customer {{ item }} </td>
            <td>{{ new Date() }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts"></script>
