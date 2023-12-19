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
          <thead>
            <tr>
              <td>{{ $t('name') }}</td>
              <td>{{ $t('products.price') }}</td>
              <td>{{ $t('products.cost') }}</td>
              <td></td>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="(item, index) in products" :key="index">
              <td>
                <nuxt-link :to="`/products/${item.id}`">
                  {{ item.name }}
                </nuxt-link>
              </td>
              <td>{{ $n(item.unitPrice || 0) }}</td>
              <td>{{ $n(item.cost || 0) }}</td>
              <td></td>
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
const search = ref('');

useHead({
  title: 'Products',
});

const { products, fetchProducts, count } = useProduct();

const { page, limit } = useApp();
const pageCount = computed(() => Math.ceil(count.value / limit));

function handleSearch() {
  const { value } = search;
  const where = value ? { name: { _ilike: `%${value}%` } } : null;

  fetchProducts({
    where,
    limit,
    offset: (page.value - 1) * limit,
  });
}

handleSearch();
</script>
