<template>
  <div>
    <n-descriptions label-placement="top">
      <template #header>
        <div class="flex justify-between">
          <span>{{ $t('detail') }}</span>
          <nav>
            <nuxt-link :to="`/products/${id}/edit`">
              <n-button circle quaternary type="primary">
                <template #icon>
                  <Icon name="system-uicons:pen" />
                </template>
              </n-button>
            </nuxt-link>
            <n-button circle quaternary type="error">
              <template #icon>
                <Icon name="system-uicons:trash" />
              </template>
            </n-button>
          </nav>
        </div>
      </template>
      <n-descriptions-item>
        <n-avatar size="large" :src="frm.thumbnail" />
      </n-descriptions-item>
      <n-descriptions-item :label="$t('name')" :span="2">
        {{ frm.name }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('category')">
        {{ frm.category?.name }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('type')">
        {{ frm.type?.name }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('unit')">
        {{ frm.unit?.name }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('products.price')">
        {{ $n(frm.unitPrice || 0) }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('products.cost')">
        {{ $n(frm.cost || 0) }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('products.stock')">
        {{ $n(frm.stockQuantity || 0) }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('products.stock_trackable')">
        {{ frm.stockTrackable ? $t('yes') : $t('no') }}
      </n-descriptions-item>

      <n-descriptions-item :label="$t('description')" :span="3">
        {{ frm.description || '-' }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('products.sku')">
        {{ frm.sku || '-' }}
      </n-descriptions-item>
      <n-descriptions-item :label="$t('products.barcode')">
        {{ frm.sku || '-' }}
      </n-descriptions-item>
    </n-descriptions>

    <n-space>
      <n-tag
        v-for="(item, index) in frm?.tags"
        :key="index"
        closable
        @close="handleRemoveTag(item)"
      >
        {{ item.term?.name }}
      </n-tag>
      <n-dynamic-tags />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import type { TermObject } from '~/types';

const { frm, fetchProduct } = useProduct();

const { id } = useRoute().params;

const { errors, product } = await fetchProduct(`${id}`);
if (!errors) {
  frm.value = {
    ...product,
  };

  useHead({
    title: `${product.name}`,
  });
}

function handleRemoveTag(item: TermObject) {
  console.log(item);
}
</script>
