<template>
  <div>
    <n-card :title="$t('products.add')">
      <div class="grid gap-4 md:grid-cols-2">
        <article>
          <n-form-item path="name" :label="$t('name')">
            <n-input v-model:value="frm.name" :placeholder="$t('name')" />
          </n-form-item>

          <div class="grid grid-cols-2 gap-4">
            <n-form-item path="price" :label="$t('products.price')">
              <n-input-number
                v-model:value="frm.unitPrice"
                :parse="inputParse"
                :format="inputFormat"
                :show-button="false"
                :placeholder="$t('products.price')"
                class="w-full"
              />
            </n-form-item>
            <n-form-item path="cost" :label="$t('products.cost')">
              <n-input-number
                v-model:value="frm.cost"
                :parse="inputParse"
                :format="inputFormat"
                :show-button="false"
                :placeholder="$t('products.cost')"
                class="w-full"
              />
            </n-form-item>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <n-form-item path="category" :label="$t('category')">
              <TermInput
                v-model:value="frm.categoryId"
                :placeholder="$t('category')"
                :group-id="TermGroupID.category"
              />
            </n-form-item>
            <n-form-item path="type" :label="$t('type')">
              <TermInput
                v-model:value="frm.typeId"
                :group-id="TermGroupID.productType"
                :placeholder="$t('type')"
              />
            </n-form-item>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <n-form-item path="stock" :label="$t('products.stock')">
              <n-input-number
                v-model:value="frm.stockQuantity"
                :placeholder="$t('products.stock')"
                :show-button="false"
              />
            </n-form-item>
            <n-form-item
              path="stock_trackable"
              :label="$t('products.stock_trackable')"
            >
              <n-switch v-model:value="frm.stockTrackable" />
            </n-form-item>
          </div>

          <n-form-item path="description" :label="$t('description')">
            <n-input
              v-model:value="frm.description"
              :placeholder="$t('description')"
              type="textarea"
              rows="2"
            />
          </n-form-item>
          <n-form-item path="tag" :label="$t('tag')">
            <TermInput :group-id="TermGroupID.tag" type="checkbox" />
          </n-form-item>
          <n-button text icon-placement="right">
            <template #icon>
              <Icon name="system-uicons:chevron-down" />
            </template>
            {{ $t('more') }}
          </n-button>
        </article>
        <article>
          <h3 class="mb-2">{{ $t('image') }}</h3>
          <ul class="flex gap-4">
            <li
              class="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100"
            >
              <label for="file">
                <icon
                  name="material-symbols-light:add-photo-alternate-outline-sharp"
                  size="30"
                />
              </label>
            </li>
            <input id="file" type="file" class="hidden" accept="image/*" />
          </ul>
        </article>
      </div>
      <div class="mt-6 flex gap-2">
        <n-button @click="$router.back()">{{ $t('cancel') }}</n-button>
        <n-button type="primary" @click.prevent="handleAdd">
          {{ $t('add') }}
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { TermGroupID } from '~/constants';

useHead({
  title: 'Add Product',
});
const { frm, insert } = useProduct();

async function handleAdd() {
  const {
    categoryId,
    typeId,
    unitPrice = 0,
    sku = '',
    barcode = '',
    description = '',
    stockQuantity = 0,
    stockTrackable = false,
    name = '',
    cost = 0,
  } = frm.value;
  const { errors, product } = await insert({
    categoryId,
    typeId,
    unitPrice,
    name,
    sku,
    barcode,
    description,
    stockQuantity,
    stockTrackable,
    cost,
  });

  console.log({ errors, product });

  if (!errors) {
    useRouter().push(`/products/${product.id}`);
  }
}
</script>
