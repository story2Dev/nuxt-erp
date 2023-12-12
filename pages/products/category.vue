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
              <th class="text-right">{{ $t('action') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(item, index) in terms" :key="index">
              <td class="py-1">{{ item.name }}</td>
              <td class="text-right">
                <n-button
                  circle
                  quaternary
                  type="primary"
                  @click="setEdit(item)"
                >
                  <template #icon>
                    <Icon name="system-uicons:pen" />
                  </template>
                </n-button>
                <n-button
                  circle
                  quaternary
                  type="error"
                  @click="setDelete(item)"
                >
                  <template #icon>
                    <Icon name="system-uicons:trash" />
                  </template>
                </n-button>
              </td>
            </tr>
          </tbody>
        </table>

        <n-empty v-if="!terms.length" class="my-4" :description="$t('no_data')">
          <template #extra>
            <n-button size="small" @click="showModal = true">
              <template #icon>
                <Icon name="system-uicons:plus" />
              </template>
              {{ $t('add') }}
            </n-button>
          </template>
        </n-empty>

        <div class="mt-4 flex justify-end">
          <n-pagination v-model:page="page" :page-count="100" />
        </div>
      </n-card>
    </section>

    <TermAdd v-model="showModal" :group-id="TermGroupID.category" />
    <TermEdit v-model="isEdit" />
    <CommonConfirm
      v-model="isDelete"
      :data="`Delete '${frm.name}'`"
      @ok="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';
import type { Term } from '~/types';

useHead({
  title: 'Category',
});

const { terms, getTerms, frm, remove } = useTerm();
const search = ref('');
const showModal = ref(false);
const isEdit = ref(false);
const page = ref(1);
const isDelete = ref(false);

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

function setEdit(item: Term) {
  frm.value = {
    ...item,
  };
  isEdit.value = true;
}

function setDelete(item: Term) {
  frm.value = {
    ...item,
  };
  isDelete.value = true;
}

function handleRemove() {
  remove(frm.value.id as string);
  isDelete.value = false;
}
</script>
