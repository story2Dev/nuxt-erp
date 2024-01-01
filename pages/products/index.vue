<template>
  <div>
    <section>
      <n-card>
        <div class="flex justify-between">
          <article>
            <n-input
              v-model:value="search"
              :placeholder="$t('search')"
              @keyup.enter="handleSearch"
            >
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
            <nuxt-link to="/products/add">
              <n-button type="primary">
                <template #icon>
                  <Icon name="system-uicons:plus" />
                </template>
                {{ $t('add') }}
              </n-button>
            </nuxt-link>
          </article>
        </div>
      </n-card>

      <n-card class="mt-4">
        <table class="w-full">
          <thead class="border-b">
            <tr>
              <td class="w-12">{{ $t('image') }}</td>
              <td class="py-1">
                <SortKey
                  v-model="orderBy"
                  :label="$t('name')"
                  field="name"
                  @update:model-value="handleSearch"
                />
              </td>
              <td class="py-1">
                <SortKey
                  v-model="orderBy"
                  :label="$t('category')"
                  field="category_id"
                  @update:model-value="handleSearch"
                />
              </td>
              <td>
                <SortKey
                  v-model="orderBy"
                  :label="$t('products.price')"
                  field="unit_price"
                  @update:model-value="handleSearch"
                />
              </td>
              <td>
                <SortKey
                  v-model="orderBy"
                  :label="$t('products.cost')"
                  field="cost"
                  @update:model-value="handleSearch"
                />
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(item, index) in products" :key="index" class="group">
              <td class="py-1">
                <div class="h-10 w-10 rounded-md bg-slate-100">
                  <nuxt-link :to="`/products/${item.id}`">
                    <n-image
                      :src="item.thumbnail"
                      class="h-10 w-10 rounded-md object-cover"
                    />
                  </nuxt-link>
                </div>
              </td>
              <td class="py-1">
                <nuxt-link
                  :to="`/products/${item.id}`"
                  class="text-primary-500 hover:underline"
                >
                  {{ item.name }}
                </nuxt-link>
              </td>
              <td>{{ item.category?.name }}</td>
              <td>{{ $n(item.unitPrice || 0) }}</td>
              <td>{{ $n(item.cost || 0) }}</td>
              <td>
                <div class="invisible flex justify-end group-hover:visible">
                  <nuxt-link :to="`/products/${item.id}/edit`">
                    <n-button circle quaternary type="primary">
                      <template #icon>
                        <Icon name="system-uicons:pen" />
                      </template>
                    </n-button>
                  </nuxt-link>
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

        <n-empty
          v-if="!products.length"
          class="my-4"
          :description="$t('no_data')"
        >
          <template #extra>
            <NuxtLink to="/products/add">
              <n-button size="small">
                <template #icon>
                  <Icon name="system-uicons:plus" />
                </template>
                {{ $t('add') }}
              </n-button>
            </NuxtLink>
          </template>
        </n-empty>

        <div class="mt-4 flex justify-end">
          <n-pagination
            v-model:page="page"
            :page-count="pageCount"
            @update:page="handleSearch"
          />
        </div>
      </n-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

useHead({
  title: 'Products',
});

const { products, fetchProducts, count } = useProduct();

const { page, limit, orderBy, search, getOrderBy } = useApp();
const pageCount = computed(() => Math.ceil(count.value / limit));

function handleSearch() {
  const { value } = search;
  const where = value ? { name: { _ilike: `%${value}%` } } : null;

  fetchProducts({
    where,
    limit,
    offset: (page.value - 1) * limit,
    orderBy: getOrderBy(),
  });
}

handleSearch();

function setEdit(item: Product) {}

function setDelete(item: Product) {}
</script>
