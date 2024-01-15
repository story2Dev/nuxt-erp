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

    <div class="mt-4">
      <h3>{{ $t('tag') }}</h3>
      <n-space>
        <n-tag
          v-for="(item, index) in frm?.tags"
          :key="index"
          closable
          @close="handleRemoveTag(item)"
        >
          {{ item.term?.name }}
        </n-tag>
        <!-- <n-dynamic-tags /> -->
      </n-space>

      <n-button class="mt-2" @click="isAddTag = true">
        <Icon name="system-uicons:plus" />
      </n-button>
    </div>

    <n-modal v-model:show="isAddTag">
      <n-card class="max-w-md" :title="$t('add_tag')">
        <TermInput
          v-model:value="tagIds"
          :group-id="TermGroupID.tag"
          type="checkbox"
        />

        <template #footer>
          <div class="flex gap-2">
            <n-button @click="isAddTag = false">
              {{ $t('close') }}
            </n-button>
            <n-button
              type="primary"
              :disabled="!tagIds.length"
              @click="handleAddTag"
            >
              {{ $t('add') }}
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';
import type { TermObject } from '~/types';

const { frm, fetchProduct } = useProduct();
const { remove: removeTag, insert: insertTags } = useTermObjects();

const { id } = useRoute().params;
const isAddTag = ref(false);
const tagIds = ref<string[]>([]);

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
  const { tags = [] } = frm.value;
  removeTag(item.id);
  const items = tags.filter((tag) => tag.id !== item.id) as TermObject[];
  frm.value.tags = items;
}

async function handleAddTag() {
  try {
    // remove duplicate
    const { tags = [] } = frm.value;
    const inputId = [];
    for (const tagId of tagIds.value) {
      const hasId = tags.some((tag) => tag.termId === tagId);
      if (!hasId) {
        inputId.push({
          termId: tagId,
          objectId: id as string,
        });
      }
    }

    if (!inputId.length) {
      isAddTag.value = false;
      return;
    }

    const { errors, termObjects } = await insertTags(inputId);
    if (termObjects.length) {
      const { tags = [] } = frm.value;
      frm.value.tags = [...tags, ...termObjects];
    }
    isAddTag.value = false;
  } catch (error) {
    isAddTag.value = false;
    throw new Error(`[handleAddTag] ${error}`);
  }
}
</script>
