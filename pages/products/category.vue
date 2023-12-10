<template>
  <div>
    <section>
      <n-card>
        <div class="flex justify-between">
          <article>
            <n-input v-model:value="search" :placeholder="$t('search')">
              <template #prefix>
                <Icon name="system-uicons:search" />
              </template>
            </n-input>
          </article>
          <article class="flex justify-end gap-2">
            <n-button>
              <template #icon>
                <Icon name="system-uicons:filter" />
              </template>
              {{ $t('filter') }}
            </n-button>

            <n-button type="primary" @click="showModal = true">
              <template #icon>
                <Icon name="system-uicons:plus" />
              </template>
              {{ $t('add') }}
            </n-button>
          </article>
        </div>
      </n-card>
    </section>
    <section class="mt-4">
      <n-card>
        <table class="w-full">
          <thead class="border-b-2 text-left">
            <tr>
              <th class="py-1">{{ $t('name') }}</th>
              <th>{{ $t('action') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(item, index) in terms" :key="index">
              <td class="py-1">{{ item.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </n-card>
    </section>

    <TermAdd v-model="showModal" :group-id="TermGroupID.category" />
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';

const { terms, getTerms } = useTerm();
const search = ref('');
const showModal = ref(false);

async function handleSearch() {
  const { items } = await getTerms({
    where: {
      group_id: {
        _eq: TermGroupID.category,
      },
    },
  });
  terms.value = items;
}

handleSearch();
</script>
