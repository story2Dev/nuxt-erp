<template>
  <div>
    <section>
      <n-card>
        <div class="flex justify-between">
          <article>
            <n-input
              v-model:value="search"
              :placeholder="$t('search')"
              @keyup.enter="handleSearch(props.groupId)"
            >
              <template #prefix>
                <Icon name="system-uicons:search" />
              </template>
            </n-input>
          </article>
          <article class="flex justify-end gap-2">
            <n-button type="primary" @click="isAdd = true">
              <template #icon>
                <Icon name="system-uicons:plus" />
              </template>
              {{ $t('add') }}
            </n-button>
          </article>
        </div>
      </n-card>
    </section>

    <n-card class="mt-4">
      <table class="w-full">
        <thead class="border-b-2 text-left">
          <tr>
            <th class="py-1">
              <SortKey
                v-model="orderBy"
                label="name"
                field="name"
                @update:model-value="handleSort"
              />
            </th>
            <th class="text-right">{{ $t('action') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="(item, index) in terms" :key="index" class="group">
            <td class="py-1">{{ item.name }}</td>
            <td class="text-right">
              <div class="invisible flex justify-end group-hover:visible">
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
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <n-empty v-if="!terms.length" class="my-4" :description="$t('no_data')">
        <template #extra>
          <n-button size="small" @click="isAdd = true">
            <template #icon>
              <Icon name="system-uicons:plus" />
            </template>
            {{ $t('add') }}
          </n-button>
        </template>
      </n-empty>

      <div class="mt-4 flex justify-end">
        <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          @update:page="handleSearch(groupId)"
        />
      </div>
    </n-card>

    <TermAdd v-model="isAdd" :group-id="groupId" />
    <TermEdit v-model="isEdit" />
    <CommonConfirm
      v-model="isDelete"
      :data="`Delete '${frm.name}'`"
      @ok="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  groupId: number;
}

const props = defineProps<Props>();
const { orderBy } = useApp();
orderBy.value.key = 'name';
const {
  frm,
  isDelete,
  isEdit,
  handleRemove,
  handleSearch,
  page,
  search,
  isAdd,
  pageCount,
  terms,
  setEdit,
  setDelete,
} = useTerm();

handleSearch(props.groupId);

function handleSort() {
  handleSearch(props.groupId, orderBy.value.mode);
}
</script>
